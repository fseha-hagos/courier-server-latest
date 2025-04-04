import { Request, Response } from "express";
import { UserStatus } from "@prisma/client";
import { db } from "@utils/db";
import {
  updateDeliveryPersonStatus,
  getDeliveryPersons,
} from "@services/deliveryPerson";
import { isValidPhoneNumber, formatPhoneNumberForStorage } from "@utils/phone";
import { auth } from "@utils/auth";
import { fromNodeHeaders } from "better-auth/node";

// Get all delivery persons with their current status and vehicle info
export const getAllDeliveryPersons = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deliveryPersons = await db.users.findMany({
      where: {
        role: "DELIVERY_PERSON",
      },
      include: {
        vehicles: true,
        deliveries: {
          include: {
            package: true,
          },
        },
      },
    });
    res.status(200).json({ success: true, deliveryPersons });
  } catch (error) {
    console.error("Error fetching delivery persons:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch delivery persons" });
  }
};

// Get a single delivery person by ID
export const getDeliveryPersonById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deliveryPerson = await db.users.findUnique({
      where: { id },
      include: {
        vehicles: true,
        deliveries: {
          include: {
            package: true,
          },
        },
      },
    });

    if (!deliveryPerson) {
      res
        .status(404)
        .json({ success: false, error: "Delivery person not found" });
      return;
    }

    res.status(200).json({ success: true, deliveryPerson });
  } catch (error) {
    console.error("Error fetching delivery person:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch delivery person" });
  }
};

// Update delivery person status (ONLINE/OFFLINE)
export const updateStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!Object.values(UserStatus).includes(status)) {
      res.status(400).json({ success: false, error: "Invalid status value" });
      return;
    }

    const updatedPerson = await updateDeliveryPersonStatus(id, status);
    res.status(200).json({ success: true, deliveryPerson: updatedPerson });
  } catch (error) {
    console.error("Error updating delivery person status:", error);
    res
      .status(500)
      .json({
        success: false,
        error: "Failed to update delivery person status",
      });
  }
};

// Update delivery person's current location
export const updateLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { latitude, longitude, vehicleId } = req.body;

    if (!latitude || !longitude || !vehicleId) {
      res
        .status(400)
        .json({
          success: false,
          error: "Latitude, longitude and vehicleId are required",
        });
      return;
    }

    const updatedVehicle = await db.vehicle.update({
      where: { id: vehicleId },
      data: {
        currentLatitude: latitude,
        currentLongitude: longitude,
      },
    });

    res.status(200).json({ success: true, vehicle: updatedVehicle });
  } catch (error) {
    console.error("Error updating delivery person location:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to update location" });
  }
};

// Get delivery person's current deliveries
export const getCurrentDeliveries = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deliveries = await db.delivery.findMany({
      where: {
        deliveryPersonId: id,
        status: {
          in: ["ASSIGNED", "IN_PROGRESS"],
        },
      },
      include: {
        package: {
          include: {
            pickupLocation: true,
            deliveryLocation: true,
          },
        },
      },
    });

    res.status(200).json({ success: true, deliveries });
  } catch (error) {
    console.error("Error fetching current deliveries:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch current deliveries" });
  }
};

// Get delivery person's delivery history
export const getDeliveryHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const deliveries = await db.delivery.findMany({
      where: {
        deliveryPersonId: id,
        status: {
          in: ["COMPLETED", "FAILED", "DECLINED"],
        },
      },
      include: {
        package: {
          include: {
            pickupLocation: true,
            deliveryLocation: true,
          },
        },
      },
      skip,
      take: Number(limit),
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalCount = await db.delivery.count({
      where: {
        deliveryPersonId: id,
        status: {
          in: ["COMPLETED", "FAILED", "DECLINED"],
        },
      },
    });

    res.status(200).json({
      success: true,
      deliveries,
      pagination: {
        total: totalCount,
        pages: Math.ceil(totalCount / Number(limit)),
        currentPage: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching delivery history:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch delivery history" });
  }
};

/**
 * Initiate phone verification for courier
 */
export const initiatePhoneVerification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { phoneNumber } = req.body;

    // Validate phone number format
    if (!isValidPhoneNumber(phoneNumber)) {
      res.status(400).json({
        success: false,
        error: "Invalid phone number format",
      });
      return;
    }

    // Format phone number for storage
    const formattedPhoneNumber = formatPhoneNumberForStorage(phoneNumber);

    // Check if user exists and is a delivery person
    const user = await db.users.findUnique({
      where: {
        phoneNumber: formattedPhoneNumber,
        role: "DELIVERY_PERSON",
      },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        error: "No delivery person found with this phone number",
      });
      return;
    }

    // Check if user is banned
    if (user.banned) {
      res.status(403).json({
        success: false,
        error: "This account has been banned",
      });
      return;
    }

    // Check if phone is already verified
    if (user.phoneNumberVerified) {
      res.status(400).json({
        success: false,
        error: "Phone number is already verified",
      });
      return;
    }

    // Forward the request to Better-Auth's phone verification endpoint
    const response = await auth.api.sendPhoneNumberOTP({
      headers: fromNodeHeaders(req.headers),
      body: { phoneNumber: formattedPhoneNumber },
    });

    if (!response.code) {
      throw new Error("Failed to send verification code");
    }
    console.log("Delivery Person Controller, response: ", response);
    res.status(200).json({
      success: true,
      message: "Verification code sent successfully",
    });
  } catch (error) {
    console.error("Error initiating phone verification:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send verification code",
    });
  }
};

/**
 * Verify OTP for courier phone verification
 */
export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phoneNumber, code } = req.body;

    // Validate phone number format
    if (!isValidPhoneNumber(phoneNumber)) {
      res.status(400).json({
        success: false,
        error: "Invalid phone number format",
      });
      return;
    }

    // Format phone number for storage
    const formattedPhoneNumber = formatPhoneNumberForStorage(phoneNumber);

    // Check if user exists and is a delivery person
    const user = await db.users.findUnique({
      where: {
        phoneNumber: formattedPhoneNumber,
        role: "DELIVERY_PERSON",
      },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        error: "No delivery person found with this phone number",
      });
      return;
    }

    // Check if user is banned
    if (user.banned) {
      res.status(403).json({
        success: false,
        error: "This account has been banned",
      });
      return;
    }

    // Forward the verification request to Better-Auth
    const response = await auth.api.verifyPhoneNumber({
      headers: fromNodeHeaders(req.headers),
      body: { phoneNumber: formattedPhoneNumber, code },
    });

    if (!response?.token) {
      res.status(500).json({
        success: false,
        error: "Failed to verify code",
      });
      return;
    }
    console.log("user's phone verification response: ", response);

    // Update user's phone verification status
    await db.users.update({
      where: { id: user.id },
      data: { phoneNumberVerified: true },
    });
    res.status(200).json(response);
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({
      success: false,
      error: "Failed to verify code",
    });
  }
};

/**
 * Set password for delivery person after phone verification
 */
export const setDeliveryPersonPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { newPassword } = req.body;

    if (!newPassword) {
      res.status(400).json({
        success: false,
        error: "New password is required",
      });
      return;
    }

    // Get the current session
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      res.status(401).json({
        success: false,
        error: "Unauthorized: No valid session found",
      });
      return;
    }

    // Verify user is a delivery person
    if (session.user.role !== "DELIVERY_PERSON") {
      res.status(403).json({
        success: false,
        error: "Forbidden: Only delivery persons can set their password",
      });
      return;
    }

    // Set the new password
    await auth.api.setPassword({
      body: { newPassword },
      headers: fromNodeHeaders(req.headers),
    });

    res.status(200).json({
      success: true,
      message: "Password set successfully",
    });
  } catch (error) {
    console.error("Error setting delivery person password:", error);
    res.status(500).json({
      success: false,
      error: "Failed to set password",
    });
  }
};
