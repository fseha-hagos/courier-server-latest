import { Request, Response } from "express";
import { db } from "src/utils/db";

/**
 * Fetch a paginated list of deliveries with related data.
 */
export const getDeliveries = async (req: Request, res: Response): Promise<void> => {
    try {
        const { limit = 10, page = 1 } = req.query;
        const take = Number(limit);
        const skip = (Number(page) - 1) * take;

        const deliveries = await db.delivery.findMany({
            take,
            skip,
            include: {
                package: {
                    include: {
                        pickupLocation: true,
                        deliveryLocation: true,
                    },
                },
                vehicle: true,
                deliveryPerson: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        res.status(200).json({ success: true, deliveries });
    } catch (error) {
        console.error("Error fetching deliveries:", error);
        res.status(500).json({ success: false, message: "Failed to fetch deliveries" });
    }
};

/**
 * Fetch a single delivery by ID with detailed information.
 */
export const getDeliveryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const delivery = await db.delivery.findUnique({
            where: { id: id },
            include: {
                package: {
                    include: {
                        pickupLocation: true,
                        deliveryLocation: true,
                    },
                },
                vehicle: true,
                deliveryPerson: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        if (!delivery) {
            res.status(404).json({ success: false, message: "Delivery not found" });
            return
        }

        res.status(200).json({ success: true, delivery });
    } catch (error) {
        console.error("Error fetching delivery:", error);
        res.status(500).json({ success: false, message: "Failed to fetch delivery" });
    }
    return
};

/**
 * Update the status of a delivery.
 */
export const updateDeliveryStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            res.status(400).json({ success: false, message: "Status is required" });
            return
        }

        const updatedDelivery = await db.delivery.update({
            where: { id: id },
            data: { status },
        });

        res.status(200).json({ success: true, delivery: updatedDelivery });
    } catch (error) {
        console.error("Error updating delivery status:", error);
        res.status(500).json({ success: false, message: "Failed to update delivery status" });
    }
};

/**
 * Assign a vehicle and delivery person to a package.
 */
export const assignDelivery = async (req: Request, res: Response): Promise<void> => {
    try {
        const { packageId, deliveryPersonId, vehicleId } = req.body;

        if (!packageId || !deliveryPersonId || !vehicleId) {
            res.status(400).json({ success: false, message: "Missing required fields" });
            return
        }

        const delivery = await db.delivery.create({
            data: {
                packageId,
                deliveryPersonId,
                vehicleId,
                status: "ASSIGNED",
            },
        });

        res.status(201).json({ success: true, delivery });
    } catch (error) {
        console.error("Error assigning delivery:", error);
        res.status(500).json({ success: false, message: "Failed to assign delivery" });
    }
    return
};
