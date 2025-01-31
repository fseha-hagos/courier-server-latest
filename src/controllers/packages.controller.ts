import { Request, Response } from 'express';
import { db } from "src/utils/db";
import calculateDistances from "@utils/distanceMatrix";


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
// Assign the closest delivery person
export const assignDeliveryPerson = async (req: Request, res: Response): Promise<void> => {
    try {
        const { packageId } = req.params;

        // Fetch the package data with its pickup and delivery locations
        const packageData = await db.package.findUnique({
            where: { id: packageId },
            include: { pickupLocation: true, deliveryLocation: true },
        });

        if (!packageData) {
            res.status(404).json({ error: 'Package not found' });
            return;
        }

        // Fetch available delivery persons who can carry the package
        const deliveryPersons = await db.users.findMany({
            where: {
                role: 'DELIVERY_PERSON',
                banned: false,
                status: 'ONLINE', // Only include online delivery persons
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

        // Prepare the coordinates for the pickup location
        const pickupLocation = packageData.pickupLocation;

        // Filter out delivery persons who have valid vehicle locations
        const deliveryPersonsLocations = deliveryPersons
            .map(person => {
                const vehicle = person.vehicles[0];
                // Check if the vehicle has valid lat and lng
                if (vehicle.currentLatitude !== null && vehicle.currentLongitude !== null) {
                    return {
                        lat: vehicle.currentLatitude,
                        lng: vehicle.currentLongitude,
                    };
                }
                return null; // If no valid location, return null to skip this person
            })
            .filter(location => location !== null); // Remove null entries from the array

        if (deliveryPersonsLocations.length === 0) {
            res.status(404).json({ error: 'No delivery persons with valid locations' });
            return;
        }

        // Calculate distances between the pickup location and all valid delivery persons
        const distances = await calculateDistances(
            [{ lat: pickupLocation.latitude, lng: pickupLocation.longitude }],  // Origins: Pickup location
            deliveryPersonsLocations  // Destinations: Delivery persons' locations
        );

        // Find the closest delivery person by selecting the one with the smallest distance
        let closestPersonIndex = 0;
        let minDistance = Number.MAX_VALUE;
        distances[0].forEach((distance, index) => {
            if (distance.distance !== null && distance.distance < minDistance) {
                minDistance = distance.distance;
                closestPersonIndex = index;
            }
        });

        // Select the closest delivery person
        const closestDeliveryPerson = deliveryPersons[closestPersonIndex];

        // Assign the delivery to the closest delivery person
        const delivery = await db.delivery.create({
            data: {
                packageId,
                deliveryPersonId: closestDeliveryPerson.id,
                vehicleId: closestDeliveryPerson.vehicles[0].id,
                status: 'ASSIGNED',
            },
        });

        res.status(201).json({ message: 'Delivery assigned', delivery });
    } catch (error: any) {
        console.error('Error assigning delivery person:', error.message);
        res.status(500).json({ error: 'Failed to assign delivery person' });
    }
};

