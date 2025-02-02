import { Request, Response } from 'express';
import { db } from "@utils/db";
import { locationService, LocationStatus } from "@utils/location";
import calculateDistances from "@utils/distanceMatrix";
import { DeliveryStatus } from '@prisma/client';

// Get all packages
export const getPackages = async (req: Request, res: Response): Promise<void> => {
    try {
        const packages = await db.package.findMany({
            where: {
                deleted: false
            },
            include: {
                pickupLocation: true,
                deliveryLocation: true,
                delivery: {
                    include: {
                        deliveryPerson: true,
                        vehicle: true
                    }
                },
                labels: true,
            },
        });

        // Fetch latest location history for each package
        const packagesWithHistory = await Promise.all(
            packages.map(async (pkg) => {
                const history = await locationService.getPackageLocationHistory(pkg.id);
                return {
                    ...pkg,
                    currentLocation: history[0] || null
                };
            })
        );

        res.status(200).json({ success: true, packages: packagesWithHistory });
    } catch (error: any) {
        console.error('Error fetching packages:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get a single package by ID
export const getPackageById = async (req: Request, res: Response): Promise<void> => {
    try {
        const pkg = await db.package.findFirst({
            where: { 
                id: req.params.id,
                deleted: false
            },
            include: {
                pickupLocation: true,
                deliveryLocation: true,
                delivery: {
                    include: {
                        deliveryPerson: true,
                        vehicle: true
                    }
                },
                labels: true,
            },
        });

        if (!pkg) {
            res.status(404).json({ success: false, error: 'Package not found' });
            return;
        }

        // Fetch location history
        const locationHistory = await locationService.getPackageLocationHistory(pkg.id);

        res.status(200).json({
            success: true,
            package: {
                ...pkg,
                locationHistory
            }
        });
    } catch (error: any) {
        console.error('Error fetching package:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Create a new package
export const createPackage = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('[Package Creation Started]', {
            timestamp: new Date().toISOString(),
            body: {
                ...req.body,
                customerId: req.body.customerId ? '[PRESENT]' : '[MISSING]'
            }
        });

        const {
            customerId,
            description,
            weight,
            pickup,
            delivery,
            labels
        } = req.body;

        // Validate required fields
        if (!customerId || !description || !weight || !pickup || !delivery) {
            console.log('[Package Creation Failed] Missing required fields:', {
                hasCustomerId: !!customerId,
                hasDescription: !!description,
                hasWeight: !!weight,
                hasPickup: !!pickup,
                hasDelivery: !!delivery
            });
            res.status(400).json({ success: false, error: 'All fields are required' });
            return;
        }

        // Validate weight
        if (weight <= 0) {
            console.log('[Package Creation Failed] Invalid weight:', { weight });
            res.status(400).json({ success: false, error: 'Weight must be greater than 0' });
            return;
        }

        console.log('[Package Creation] Validating locations');

        // Validate and create/get locations
        try {
            // Validate locations
            const [validatedPickup, validatedDelivery] = await Promise.all([
                locationService.validateLocation(pickup.placeId),
                locationService.validateLocation(delivery.placeId)
            ]);

            console.log('[Package Creation] Locations validated successfully:', {
                pickup: {
                    placeId: validatedPickup.placeId,
                    address: validatedPickup.address
                },
                delivery: {
                    placeId: validatedDelivery.placeId,
                    address: validatedDelivery.address
                }
            });

            // Create or get locations
            const [pickupLocation, deliveryLocation] = await Promise.all([
                locationService.createOrGetLocation({
                    ...validatedPickup,
                    type: 'PICKUP'
                }),
                locationService.createOrGetLocation({
                    ...validatedDelivery,
                    type: 'DELIVERY'
                })
            ]);

            console.log('[Package Creation] Locations created/retrieved successfully:', {
                pickupId: pickupLocation.id,
                deliveryId: deliveryLocation.id
            });

            // Create package with locations
            const newPackage = await db.package.create({
                data: {
                    customerId,
                    description,
                    weight,
                    pickupLocationId: pickupLocation.id,
                    deliveryLocationId: deliveryLocation.id,
                    labels: labels ? {
                        create: labels.map((label: { value: string; label: string }) => ({
                            value: label.value,
                            label: label.label
                        }))
                    } : undefined
                },
                include: {
                    pickupLocation: true,
                    deliveryLocation: true,
                    labels: true
                }
            });

            console.log('[Package Creation] Package created successfully:', {
                packageId: newPackage.id,
                hasLabels: labels ? labels.length : 0
            });

            // Initialize location history
            await locationService.addLocationHistory(
                newPackage.id,
                pickupLocation.id,
                LocationStatus.PICKED_UP
            );

            console.log('[Package Creation] Location history initialized');

            res.status(201).json({ success: true, package: newPackage });
        } catch (error: any) {
            console.error('[Package Creation] Location validation/creation failed:', {
                error: error.message,
                stack: error.stack,
                pickupPlaceId: pickup?.placeId,
                deliveryPlaceId: delivery?.placeId
            });
            throw error;
        }
    } catch (error: any) {
        console.error('[Package Creation] Failed:', {
            error: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });
        res.status(400).json({ success: false, error: error.message });
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

// Delete a package (soft delete)
export const deletePackage = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('[Package Deletion] Attempting to delete package:', req.params.id);

        const existingPackage = await db.package.findFirst({
            where: { 
                id: req.params.id,
                deleted: false
            },
            include: {
                delivery: true
            }
        });

        if (!existingPackage) {
            console.log('[Package Deletion] Package not found or already deleted:', req.params.id);
            res.status(404).json({ success: false, error: 'Package not found' });
            return;
        }

        // Check if package can be deleted (e.g., not in active delivery)
        if (existingPackage.delivery?.status === DeliveryStatus.IN_PROGRESS) {
            console.log('[Package Deletion] Cannot delete package in active delivery:', req.params.id);
            res.status(400).json({ 
                success: false, 
                error: 'Cannot delete package that is in active delivery' 
            });
            return;
        }

        // Perform soft delete
        const deletedPackage = await db.package.update({
            where: { id: req.params.id },
            data: {
                deleted: true,
                deletedAt: new Date()
            },
            include: {
                delivery: true,
                pickupLocation: true,
                deliveryLocation: true,
                labels: true
            }
        });

        console.log('[Package Deletion] Successfully soft deleted package:', {
            packageId: deletedPackage.id,
            deletedAt: deletedPackage.deletedAt
        });

        res.status(200).json({ 
            success: true, 
            message: 'Package deleted successfully',
            package: deletedPackage
        });
    } catch (error: any) {
        console.error('[Package Deletion] Error:', {
            packageId: req.params.id,
            error: error.message,
            stack: error.stack
        });
        res.status(500).json({ success: false, error: error.message });
    }
};

// Restore a deleted package
export const restorePackage = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('[Package Restoration] Attempting to restore package:', req.params.id);

        const existingPackage = await db.package.findFirst({
            where: { 
                id: req.params.id,
                deleted: true
            },
            include: {
                delivery: true,
                pickupLocation: true,
                deliveryLocation: true,
                labels: true
            }
        });

        if (!existingPackage) {
            console.log('[Package Restoration] Package not found or not deleted:', req.params.id);
            res.status(404).json({ success: false, error: 'Deleted package not found' });
            return;
        }

        // Restore package
        const restoredPackage = await db.package.update({
            where: { id: req.params.id },
            data: {
                deleted: false,
                deletedAt: null
            },
            include: {
                delivery: true,
                pickupLocation: true,
                deliveryLocation: true,
                labels: true
            }
        });

        console.log('[Package Restoration] Successfully restored package:', restoredPackage.id);

        res.status(200).json({ 
            success: true, 
            message: 'Package restored successfully',
            package: restoredPackage
        });
    } catch (error: any) {
        console.error('[Package Restoration] Error:', {
            packageId: req.params.id,
            error: error.message,
            stack: error.stack
        });
        res.status(500).json({ success: false, error: error.message });
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

// Update package location
export const updatePackageLocation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { locationId, status, currentCoords } = req.body;

        // Add new location history entry
        const locationHistory = await locationService.addLocationHistory(
            id,
            locationId,
            status,
            currentCoords
        );

        res.status(200).json({ success: true, locationHistory });
    } catch (error: any) {
        console.error('Error updating package location:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all deleted packages
export const getDeletedPackages = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('[Deleted Packages] Fetching all deleted packages');
        
        const deletedPackages = await db.package.findMany({
            where: {
                deleted: true
            },
            include: {
                pickupLocation: true,
                deliveryLocation: true,
                delivery: {
                    include: {
                        deliveryPerson: true,
                        vehicle: true
                    }
                },
                labels: true,
            },
        });

        // Fetch latest location history for each package
        const packagesWithHistory = await Promise.all(
            deletedPackages.map(async (pkg) => {
                const history = await locationService.getPackageLocationHistory(pkg.id);
                return {
                    ...pkg,
                    currentLocation: history[0] || null
                };
            })
        );

        console.log('[Deleted Packages] Found', deletedPackages.length, 'deleted packages');

        res.status(200).json({ 
            success: true, 
            packages: packagesWithHistory,
            count: deletedPackages.length
        });
    } catch (error: any) {
        console.error('[Deleted Packages] Error fetching deleted packages:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

