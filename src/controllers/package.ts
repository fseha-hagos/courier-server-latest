import { Request, Response } from 'express';
import { db } from "src/utils/db";

// Get all packages
export const getPackages = async (req: Request, res: Response): Promise<void> => {
    try {
        const packages = await db.package.findMany({
            include: {
                pickupLocation: true,
                deliveryLocation: true,
                delivery: true,
            },
        });
        res.status(200).json(packages);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single package by ID
export const getPackageById = async (req: Request, res: Response): Promise<void> => {
    try {
        const pkg = await db.package.findUnique({
            where: { id: req.params.id },
            include: {
                pickupLocation: true,
                deliveryLocation: true,
                delivery: true,
            },
        });
        if (!pkg) {
            res.status(404).json({ message: 'Package not found' });
            return;
        }
        res.status(200).json(pkg);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new package
export const createPackage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { customerId, description, weight, pickupLocationId, deliveryLocationId } = req.body;

        if (!customerId || !description || !weight || !pickupLocationId || !deliveryLocationId) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        const newPackage = await db.package.create({
            data: {
                customerId,
                description,
                weight,
                pickupLocationId,
                deliveryLocationId,
                status: 'PENDING',
            },
        });

        res.status(201).json(newPackage);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing package
export const updatePackage = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedPackage = await db.package.update({
            where: { id: req.params.id },
            data: req.body,
        });

        if (!updatedPackage) {
            res.status(404).json({ message: 'Package not found' });
            return;
        }

        res.status(200).json(updatedPackage);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a package
export const deletePackage = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedPackage = await db.package.delete({
            where: { id: req.params.id },
        });

        if (!deletedPackage) {
            res.status(404).json({ message: 'Package not found' });
            return;
        }

        res.status(200).json({ message: 'Package deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Assign the closest delivery person
export const assignDeliveryPerson = async (req: Request<{ packageId: string }>, res: Response): Promise<void> => {
    try {
        const { packageId } = req.params;

        const packageData = await db.package.findUnique({
            where: { id: packageId },
            include: { pickupLocation: true, deliveryLocation: true },
        });

        if (!packageData) {
            res.status(404).json({ error: 'Package not found' });
            return;
        }

        const deliveryPersons = await db.users.findMany({
            where: {
                role: 'DELIVERY_PERSON',
                banned: false,
                vehicles: {
                    some: {
                        maxWeight: { gte: packageData.weight },
                    },
                },
            },
            include: { vehicles: true },
        });

        if (!deliveryPersons.length) {
            res.status(404).json({ error: 'No delivery persons available' });
            return;
        }

        const matchedDeliveryPerson = deliveryPersons[0];

        const delivery = await db.delivery.create({
            data: {
                packageId,
                deliveryPersonId: matchedDeliveryPerson.id,
                vehicleId: matchedDeliveryPerson.vehicles[0].id,
                status: 'ASSIGNED',
            },
        });

        res.status(201).json({ message: 'Delivery assigned', delivery });
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to assign delivery person' });
    }
};

