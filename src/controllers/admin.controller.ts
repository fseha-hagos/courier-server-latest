import { Request, Response } from 'express';
import { db } from '@utils/db';
import { auth } from '@utils/auth';
import { fromNodeHeaders } from 'better-auth/node';
import { formatPhoneNumberForStorage, isValidPhoneNumber } from '@utils/phone';

// Get all admin workers
export const getAdminWorkers = async (req: Request, res: Response): Promise<void> => {
  try {
    const admins = await db.users.findMany({
      where: {
        role: {
          in: ['admin', 'superAdmin']
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        phoneNumber: true,
        banned: true,
        banReason: true,
        banExpires: true,
      }
    });

    res.status(200).json({ success: true, admins });
  } catch (error) {
    console.error('Error fetching admin workers:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch admin workers' });
  }
};

// Get specific admin worker
export const getAdminWorkerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const admin = await db.users.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        phoneNumber: true,
        banned: true,
        banReason: true,
        banExpires: true,
      }
    });

    if (!admin) {
      res.status(404).json({ success: false, error: 'Admin worker not found' });
      return;
    }

    res.status(200).json({ success: true, admin });
  } catch (error) {
    console.error('Error fetching admin worker:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch admin worker' });
  }
};

// Update admin worker
export const updateAdminWorker = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, role, phoneNumber } = req.body;

    // Validate role
    if (role && !['admin', 'superAdmin'].includes(role)) {
      res.status(400).json({ success: false, error: 'Invalid role specified' });
      return;
    }

    const updatedAdmin = await db.users.update({
      where: { id },
      data: {
        name,
        email,
        role,
        phoneNumber,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phoneNumber: true,
      }
    });

    res.status(200).json({ success: true, admin: updatedAdmin });
  } catch (error) {
    console.error('Error updating admin worker:', error);
    res.status(500).json({ success: false, error: 'Failed to update admin worker' });
  }
};

// Ban/Unban admin worker
export const toggleAdminBan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { banned, banReason, banExpires } = req.body;

    const updatedAdmin = await db.users.update({
      where: { id },
      data: {
        banned,
        banReason: banned ? banReason : null,
        banExpires: banned ? banExpires : null,
      },
    });

    res.status(200).json({ success: true, admin: updatedAdmin });
  } catch (error) {
    console.error('Error toggling admin ban status:', error);
    res.status(500).json({ success: false, error: 'Failed to update admin ban status' });
  }
};

// Delete admin worker
export const deleteAdminWorker = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await db.users.delete({
      where: { id },
    });

    res.status(200).json({ success: true, message: 'Admin worker deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin worker:', error);
    res.status(500).json({ success: false, error: 'Failed to delete admin worker' });
  }
};

// Register a new delivery person
export const registerDeliveryPerson = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      phoneNumber,
      vehicle // { type, licensePlate, maxWeight }
    } = req.body;

    // Validate required fields
    if (!name || !phoneNumber || !vehicle) {
      res.status(400).json({
        success: false,
        error: 'Name, phone number, and vehicle details are required'
      });
      return;
    }

    // Validate phone number format
    if (!isValidPhoneNumber(phoneNumber)) {
      res.status(400).json({
        success: false,
        error: 'Invalid phone number format'
      });
      return;
    }

    // Format phone number for storage
    const formattedPhoneNumber = formatPhoneNumberForStorage(phoneNumber);

    // Check if phone number is already registered
    const existingUser = await db.users.findUnique({
      where: { phoneNumber: formattedPhoneNumber }
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        error: 'Phone number already registered'
      });
      return;
    }

    // Get the current session to verify admin authentication
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers)
    });

    if (!session) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized: No valid session found'
      });
      return;
    }

    // Verify admin role
    const userRole = session.user.role || '';
    if (!['admin', 'superAdmin'].includes(userRole)) {
      res.status(403).json({
        success: false,
        error: 'Forbidden: Only admins can register delivery persons'
      });
      return;
    }

    // Create user with phone verification pending
    const createUserResponse = await auth.api.createUser({
      body: {
        name,
        email: `${formattedPhoneNumber}@temp.courier-app.com`,
        password: Math.random().toString(36).slice(-8), // Temporary password
        role: 'DELIVERY_PERSON',
        data: {
          phoneNumber: formattedPhoneNumber,
          requirePasswordChange: true,
          phoneNumberVerified: false // Explicitly set as unverified
        }
      },
      headers: fromNodeHeaders(req.headers)
    });

    // Create associated vehicle
    const newVehicle = await db.vehicle.create({
      data: {
        deliveryPersonId: createUserResponse.user.id,
        type: vehicle.type,
        licensePlate: vehicle.licensePlate,
        maxWeight: vehicle.maxWeight
      }
    });

    res.status(201).json({
      success: true,
      message: 'Delivery person registered successfully. They will need to verify their phone number through the courier app.',
      deliveryPerson: {
        id: createUserResponse.user.id,
        name,
        phoneNumber,
        vehicle: newVehicle
      }
    });
  } catch (error: any) {
    console.error('Error registering delivery person:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to register delivery person'
    });
  }
}; 