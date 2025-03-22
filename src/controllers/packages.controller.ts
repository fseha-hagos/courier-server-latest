import { Request, Response } from 'express';
import { db } from "@utils/db";
import { locationService, LocationStatus } from "@utils/location";
import calculateDistances from "@utils/distanceMatrix";
import { DeliveryStatus, PackageStatus, Users, Vehicle, Location, UserStatus } from '@prisma/client';
import calculateEstimatedDeliveryTime from "@utils/distanceMatrix";
import { emitPackageUpdate, emitPackageCancelled, STATUS_TRANSITIONS } from '@utils/websocket';
import { emitDashboardStatsUpdate } from '@utils/websocket';

// Status mapping between package and delivery
const PACKAGE_DELIVERY_STATUS_MAP: Record<PackageStatus, DeliveryStatus | null> = {
    PENDING: null, // No delivery exists yet
    ASSIGNED: DeliveryStatus.ASSIGNED,
    IN_PROGRESS: DeliveryStatus.IN_PROGRESS,
    COMPLETED: DeliveryStatus.COMPLETED,
    FAILED: DeliveryStatus.FAILED,
    CANCELLED: null // Delivery is cancelled/deleted
};

// Helper function to validate status transition
const validateStatusTransition = (currentStatus: PackageStatus, newStatus: PackageStatus): boolean => {
    const allowedTransitions = STATUS_TRANSITIONS[currentStatus];
    return allowedTransitions.includes(newStatus);
};

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

            // Emit dashboard stats update
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const [
              activeDeliveries,
              todayPackages,
              onlineDeliveryPersons,
              completedDeliveries,
              totalDeliveries
            ] = await Promise.all([
              // Total active deliveries
              db.delivery.count({
                where: {
                  status: {
                    in: [DeliveryStatus.ASSIGNED, DeliveryStatus.IN_PROGRESS]
                  }
                }
              }),
              // Total packages created today
              db.package.count({
                where: {
                  createdAt: {
                    gte: today
                  }
                }
              }),
              // Active delivery persons
              db.users.count({
                where: {
                  role: 'DELIVERY_PERSON',
                  status: UserStatus.ONLINE
                }
              }),
              // Completed deliveries (for success rate)
              db.delivery.count({
                where: {
                  status: DeliveryStatus.COMPLETED
                }
              }),
              // Total deliveries (for success rate)
              db.delivery.count({
                where: {
                  status: {
                    in: [DeliveryStatus.COMPLETED, DeliveryStatus.FAILED]
                  }
                }
              })
            ]);

            // Calculate success rate
            const successRate = totalDeliveries > 0 
              ? (completedDeliveries / totalDeliveries) * 100 
              : 0;

            // Emit dashboard stats update
            emitDashboardStatsUpdate({
              totalActiveDeliveries: activeDeliveries,
              totalPackagesToday: todayPackages,
              activeDeliveryPersons: onlineDeliveryPersons,
              successRate
            });

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

// Get available delivery persons for a package
export const getAvailableDeliveryPersons = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: packageId } = req.params;

        // Get package to check weight
        const pkg = await db.package.findUnique({
            where: { id: packageId }
        });

        if (!pkg) {
            res.status(404).json({
                success: false,
                error: {
                    code: 'PACKAGE_NOT_FOUND',
                    message: 'Package not found'
                }
            });
            return;
        }

        // Get available delivery persons
        const deliveryPersons = await db.users.findMany({
            where: {
                role: 'DELIVERY_PERSON',
                status: 'ONLINE',
                OR: [
                    { banned: false },
                    { banned: null }
                ],
                vehicles: {
                    some: {
                        maxWeight: {
                            gte: pkg.weight
                        }
                    }
                }
            },
            include: {
                vehicles: true
            }
        });

        // Format response
        const formattedDeliveryPersons = deliveryPersons.map(dp => ({
            id: dp.id,
            name: dp.name,
            phoneNumber: dp.phoneNumber,
            status: dp.status,
            rating: dp.averageRating || 0,
            currentLocation: dp.vehicles[0] ? {
                latitude: dp.vehicles[0].currentLatitude || 0,
                longitude: dp.vehicles[0].currentLongitude || 0
            } : null,
            vehicle: dp.vehicles[0] ? {
                id: dp.vehicles[0].id,
                type: dp.vehicles[0].type,
                plateNumber: dp.vehicles[0].licensePlate,
                maxWeight: dp.vehicles[0].maxWeight
            } : null
        }));

        res.status(200).json({
            success: true,
            deliveryPersons: formattedDeliveryPersons
        });
    } catch (error: any) {
        console.error('Error getting available delivery persons:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'FETCH_FAILED',
                message: error.message
            }
        });
    }
};

// Get package history with details
export const getPackageHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: packageId } = req.params;

        // Get package with delivery info
        const packageData = await db.package.findUnique({
            where: { id: packageId },
            include: {
                delivery: {
                    include: {
                        notes: {
                            include: {
                                actor: true,
                                location: true
                            }
                        }
                    }
                },
                locationHistory: {
                    include: {
                        location: true
                    },
                    orderBy: {
                        timestamp: 'desc'
                    }
                }
            }
        });

        if (!packageData) {
            res.status(404).json({ success: false, error: 'Package not found' });
            return;
        }

        // Combine and format history entries
        const history = [
            // Location history entries
            ...packageData.locationHistory.map(entry => ({
                id: entry.id,
                timestamp: entry.timestamp,
                status: entry.status,
                location: {
                    latitude: entry.currentLat || entry.location.latitude,
                    longitude: entry.currentLng || entry.location.longitude,
                    address: entry.location.address
                },
                actor: {
                    id: packageData.delivery?.deliveryPersonId || 'system',
                    name: 'System',
                    type: 'SYSTEM' as const
                }
            })),
            // Delivery notes as history entries
            ...(packageData.delivery?.notes.map(note => ({
                id: note.id,
                timestamp: note.timestamp,
                status: 'NOTE',
                location: note.location ? {
                    latitude: note.location.latitude,
                    longitude: note.location.longitude,
                    address: note.location.address
                } : null,
                actor: {
                    id: note.actor.id,
                    name: note.actor.name,
                    type: note.actorType as 'CUSTOMER' | 'DELIVERY_PERSON' | 'ADMIN'
                },
                note: note.note
            })) || [])
        ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

        res.status(200).json({
            success: true,
            history
        });
    } catch (error: any) {
        console.error('Error fetching package history:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Calculate estimated delivery time
export const getEstimatedDeliveryTime = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: packageId } = req.params;

        const packageData = await db.package.findUnique({
            where: { id: packageId },
            include: {
                pickupLocation: true,
                deliveryLocation: true,
                delivery: {
                    include: {
                        vehicle: true
                    }
                }
            }
        });

        if (!packageData) {
            res.status(404).json({ success: false, error: 'Package not found' });
            return;
        }

        const pickupLocation = {
            lat: packageData.pickupLocation.latitude,
            lng: packageData.pickupLocation.longitude
        };

        const deliveryLocation = {
            lat: packageData.deliveryLocation.latitude,
            lng: packageData.deliveryLocation.longitude
        };

        const distances = await calculateDistances([pickupLocation], [deliveryLocation]);
        const distance = distances?.[0]?.[0];

        if (!distance) {
            throw new Error('Failed to calculate distance');
        }

        // Calculate estimated delivery time based on distance and vehicle type
        const vehicleType = packageData.delivery?.vehicle?.type || 'CAR'; // Default to CAR if no vehicle assigned
        const estimatedTime = new Date();
        estimatedTime.setSeconds(estimatedTime.getSeconds() + (distance.duration || 0));

        res.status(200).json({
            success: true,
            estimatedDeliveryTime: estimatedTime,
            distance: distance.distance,
            duration: distance.duration
        });
    } catch (error: any) {
        console.error('Error calculating estimated delivery time:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get nearby delivery persons
export const getNearbyDeliveryPersons = async (req: Request, res: Response): Promise<void> => {
    try {
        const { latitude, longitude, radius = 10000 } = req.query; // radius in meters, default 10km
        const packageId = req.params.id;

        // Validate coordinates
        if (!latitude || !longitude) {
            res.status(400).json({ success: false, error: 'Latitude and longitude are required' });
            return;
        }

        // Get package for weight validation
        const packageData = await db.package.findUnique({
            where: { id: packageId },
            select: { weight: true }
        });

        if (!packageData) {
            res.status(404).json({ success: false, error: 'Package not found' });
            return;
        }

        // Find delivery persons who:
        // 1. Are online
        // 2. Have vehicles that can handle the package weight
        // 3. Are not banned
        // 4. Are within the specified radius
        const nearbyDeliveryPersons = await db.users.findMany({
            where: {
                role: 'DELIVERY_PERSON',
                status: 'ONLINE',
                banned: false,
                vehicles: {
                    some: {
                        maxWeight: { gte: packageData.weight },
                        currentLatitude: { not: null },
                        currentLongitude: { not: null }
                    }
                }
            },
            select: {
                id: true,
                name: true,
                phoneNumber: true,
                averageRating: true,
                completedDeliveries: true,
                failedDeliveries: true,
                vehicles: {
                    select: {
                        id: true,
                        type: true,
                        licensePlate: true,
                        currentLatitude: true,
                        currentLongitude: true,
                        maxWeight: true
                    }
                }
            }
        });

        // Calculate distances and filter by radius
        const deliveryPersonsWithDistance = await Promise.all(
            nearbyDeliveryPersons.map(async (dp) => {
                const vehicle = dp.vehicles[0];
                if (!vehicle?.currentLatitude || !vehicle?.currentLongitude) return null;

                const origin = { lat: Number(latitude), lng: Number(longitude) };
                const destination = { lat: vehicle.currentLatitude, lng: vehicle.currentLongitude };
                
                const distances = await calculateDistances([origin], [destination]);
                const distance = distances?.[0]?.[0];

                if (!distance || !distance.distance || distance.distance > Number(radius)) {
                    return null;
                }

                return {
                    id: dp.id,
                    name: dp.name,
                    phoneNumber: dp.phoneNumber,
                    rating: dp.averageRating || 0,
                    currentLocation: {
                        latitude: vehicle.currentLatitude,
                        longitude: vehicle.currentLongitude
                    },
                    distance: distance.distance,
                    estimatedArrivalTime: distance.duration || null,
                    vehicle: {
                        id: vehicle.id,
                        type: vehicle.type,
                        plateNumber: vehicle.licensePlate,
                        maxWeight: vehicle.maxWeight
                    },
                    stats: {
                        completedDeliveries: dp.completedDeliveries,
                        failedDeliveries: dp.failedDeliveries
                    }
                };
            })
        );

        // Filter out null values and sort by distance
        const validDeliveryPersons = deliveryPersonsWithDistance
            .filter((dp): dp is NonNullable<typeof dp> => dp !== null)
            .sort((a, b) => a.distance - b.distance);

        res.status(200).json({
            success: true,
            deliveryPersons: validDeliveryPersons,
            count: validDeliveryPersons.length
        });
    } catch (error: any) {
        console.error('Error fetching nearby delivery persons:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Validate delivery person for package
export const validateDeliveryPerson = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: packageId } = req.params;
        const { deliveryPersonId } = req.query;

        if (!deliveryPersonId) {
            res.status(400).json({ success: false, error: 'Delivery person ID is required' });
            return;
        }

        // Get package details
        const packageData = await db.package.findUnique({
            where: { id: packageId },
            select: { weight: true }
        });

        if (!packageData) {
            res.status(404).json({ success: false, error: 'Package not found' });
            return;
        }

        // Check delivery person's status and vehicle
        const deliveryPerson = await db.users.findFirst({
            where: {
                id: deliveryPersonId as string,
                role: 'DELIVERY_PERSON',
                banned: false,
                status: 'ONLINE'
            },
            include: {
                vehicles: true
            }
        });

        if (!deliveryPerson) {
            res.status(404).json({ success: false, error: 'Delivery person not found or not available' });
            return;
        }

        // Check if any vehicle can handle the package
        const suitableVehicle = deliveryPerson.vehicles.find(
            vehicle => vehicle.maxWeight >= packageData.weight
        );

        const isValid = Boolean(suitableVehicle);
        const reason = isValid ? null : 'No suitable vehicle available for package weight';

        res.status(200).json({
            success: true,
            isValid,
            reason,
            vehicle: suitableVehicle || undefined
        });
    } catch (error: any) {
        console.error('Error validating delivery person:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Rate delivery
export const rateDelivery = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: packageId } = req.params;
        const { rating, comment } = req.body;

        if (rating < 1 || rating > 5) {
            res.status(400).json({ success: false, error: 'Rating must be between 1 and 5' });
            return;
        }

        // Get delivery details
        const delivery = await db.delivery.findUnique({
            where: { packageId },
            include: {
                deliveryPerson: true
            }
        });

        if (!delivery) {
            res.status(404).json({ success: false, error: 'Delivery not found' });
            return;
        }

        if (delivery.status !== DeliveryStatus.COMPLETED) {
            res.status(400).json({ success: false, error: 'Can only rate completed deliveries' });
            return;
        }

        // Update delivery with rating
        const updatedDelivery = await db.delivery.update({
            where: { id: delivery.id },
            data: {
                deliveryRating: rating
            }
        });

        // Add rating comment if provided
        if (comment) {
            await db.deliveryNote.create({
                data: {
                    deliveryId: delivery.id,
                    actorId: delivery.deliveryPersonId,
                    note: comment,
                    actorType: 'CUSTOMER'
                }
            });
        }

        // Update delivery person's average rating
        const deliveryPersonRatings = await db.delivery.findMany({
            where: {
                deliveryPersonId: delivery.deliveryPersonId,
                deliveryRating: { not: null }
            },
            select: {
                deliveryRating: true
            }
        });

        const totalRatings = deliveryPersonRatings.reduce(
            (acc, curr) => acc + (curr.deliveryRating || 0), 
            0
        );
        const averageRating = totalRatings / (deliveryPersonRatings.length || 1);

        await db.users.update({
            where: { id: delivery.deliveryPersonId },
            data: { 
                averageRating: averageRating
            }
        });

        res.status(200).json({
            success: true,
            delivery: updatedDelivery,
            deliveryPerson: {
                id: delivery.deliveryPersonId,
                averageRating: averageRating
            }
        });
    } catch (error: any) {
        console.error('Error rating delivery:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Add note to delivery
export const addDeliveryNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: packageId } = req.params;
        const { note, actorId, actorType, locationId } = req.body;

        if (!note || !actorId || !actorType) {
            res.status(400).json({ success: false, error: 'Note, actorId, and actorType are required' });
            return;
        }

        const delivery = await db.delivery.findUnique({
            where: { packageId }
        });

        if (!delivery) {
            res.status(404).json({ success: false, error: 'Delivery not found' });
            return;
        }

        const deliveryNote = await db.deliveryNote.create({
            data: {
                deliveryId: delivery.id,
                actorId,
                note,
                actorType,
                locationId
            },
            include: {
                actor: {
                    select: {
                        id: true,
                        name: true,
                        role: true
                    }
                },
                location: locationId ? true : false
            }
        });

        res.status(201).json({
            success: true,
            note: deliveryNote
        });
    } catch (error: any) {
        console.error('Error adding delivery note:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Types for cancellation rules
type CancellationType = 'CUSTOMER' | 'DELIVERY_PERSON' | 'ADMIN';

interface BaseCancellationRule {
    allowedBy: CancellationType[];
    refund: number;
}

interface SimpleCancellationRule extends BaseCancellationRule {
    penalty: number;
    type: 'simple';
}

interface TimedCancellationRule extends BaseCancellationRule {
    penalty: {
        CUSTOMER: number;
        DELIVERY_PERSON: number;
    };
    timeLimit: number;
    type: 'timed';
}

interface ApprovalCancellationRule extends BaseCancellationRule {
    penalty: number;
    requiresApproval: boolean;
    type: 'approval';
}

type CancellationRule = SimpleCancellationRule | TimedCancellationRule | ApprovalCancellationRule;

// Cancellation rules
const CANCELLATION_RULES: Record<PackageStatus, CancellationRule> = {
    PENDING: {
        allowedBy: ['CUSTOMER', 'ADMIN'],
        refund: 100, // 100% refund
        penalty: 0,
        type: 'simple'
    },
    ASSIGNED: {
        allowedBy: ['CUSTOMER', 'DELIVERY_PERSON', 'ADMIN'],
        refund: 80, // 80% refund
        penalty: {
            CUSTOMER: 20, // 20% penalty for customer cancellation
            DELIVERY_PERSON: 50 // 50% penalty for delivery person cancellation
        },
        timeLimit: 15, // minutes after assignment
        type: 'timed'
    },
    IN_PROGRESS: {
        allowedBy: ['ADMIN'],
        refund: 50,
        penalty: 50,
        type: 'simple'
    },
    COMPLETED: {
        allowedBy: ['ADMIN'],
        refund: 0,
        penalty: 100,
        type: 'simple'
    },
    FAILED: {
        allowedBy: ['ADMIN'],
        refund: 100,
        penalty: 0,
        type: 'simple'
    },
    CANCELLED: {
        allowedBy: [],
        refund: 0,
        penalty: 0,
        type: 'simple'
    }
};

// Error codes
export enum PackageErrorCodes {
    INVALID_STATUS_TRANSITION = 'INVALID_STATUS_TRANSITION',
    CANCELLATION_NOT_ALLOWED = 'CANCELLATION_NOT_ALLOWED',
    INVALID_ASSIGNMENT = 'INVALID_ASSIGNMENT',
    DELIVERY_PERSON_UNAVAILABLE = 'DELIVERY_PERSON_UNAVAILABLE',
    VEHICLE_WEIGHT_EXCEEDED = 'VEHICLE_WEIGHT_EXCEEDED'
}

// Update package status
export const updatePackageStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: packageId } = req.params;
        const { status: newStatus } = req.body;

        const pkg = await db.package.findUnique({
            where: { id: packageId },
            include: {
                delivery: true
            }
        });

        if (!pkg) {
            res.status(404).json({
                success: false,
                error: {
                    code: 'PACKAGE_NOT_FOUND',
                    message: 'Package not found'
                }
            });
            return;
        }

        if (!validateStatusTransition(pkg.status, newStatus)) {
            res.status(400).json({
                success: false,
                error: {
                    code: PackageErrorCodes.INVALID_STATUS_TRANSITION,
                    message: `Cannot transition from ${pkg.status} to ${newStatus}`
                }
            });
            return;
        }

        // Get the corresponding delivery status
        const deliveryStatus = PACKAGE_DELIVERY_STATUS_MAP[newStatus as keyof typeof PACKAGE_DELIVERY_STATUS_MAP];

        // Use a transaction to update both package and delivery status
        const result = await db.$transaction([
            db.package.update({
                where: { id: packageId },
                data: {
                    status: newStatus,
                    timeline: {
                        upsert: {
                            create: {
                                [newStatus.toLowerCase()]: new Date()
                            },
                            update: {
                                [newStatus.toLowerCase()]: new Date()
                            }
                        }
                    }
                },
                include: {
                    timeline: true,
                    delivery: {
                        include: {
                            deliveryPerson: true,
                            vehicle: true
                        }
                    }
                }
            }),
            // Only update delivery if it exists and new status is not null
            ...(pkg.delivery && deliveryStatus ? [
                db.delivery.update({
                    where: { packageId },
                    data: { status: deliveryStatus }
                })
            ] : [])
        ]) as [any, any]; // Type assertion for transaction result

        const updatedPackage = result[0];
        const updatedDelivery = pkg.delivery && deliveryStatus ? result[1] : null;

        // Emit real-time update
        emitPackageUpdate(packageId, {
            status: newStatus,
            timestamp: new Date()
        });

        res.status(200).json({
            success: true,
            package: updatedPackage,
            delivery: updatedDelivery
        });
    } catch (error: any) {
        console.error('Error updating package status:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'UPDATE_FAILED',
                message: error.message
            }
        });
    }
};

// Assign package to delivery person
export const assignPackage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: packageId } = req.params;
        const { deliveryPersonId, vehicleId } = req.body;

        const pkg = await db.package.findUnique({
            where: { id: packageId }
        });

        if (!pkg) {
            res.status(404).json({
                success: false,
                error: {
                    code: 'PACKAGE_NOT_FOUND',
                    message: 'Package not found'
                }
            });
            return;
        }

        if (pkg.status !== PackageStatus.PENDING) {
            res.status(400).json({
                success: false,
                error: {
                    code: PackageErrorCodes.INVALID_ASSIGNMENT,
                    message: 'Package can only be assigned when in PENDING status'
                }
            });
            return;
        }

        const deliveryPerson = await db.users.findFirst({
            where: {
                id: deliveryPersonId,
                role: 'DELIVERY_PERSON',
                status: 'ONLINE',
                banned: false
            },
            include: {
                vehicles: {
                    where: { id: vehicleId }
                }
            }
        });

        if (!deliveryPerson || !deliveryPerson.vehicles.length) {
            res.status(400).json({
                success: false,
                error: {
                    code: PackageErrorCodes.DELIVERY_PERSON_UNAVAILABLE,
                    message: 'Delivery person not available or vehicle not found'
                }
            });
            return;
        }

        const vehicle = deliveryPerson.vehicles[0];
        if (vehicle.maxWeight < pkg.weight) {
            res.status(400).json({
                success: false,
                error: {
                    code: PackageErrorCodes.VEHICLE_WEIGHT_EXCEEDED,
                    message: 'Package weight exceeds vehicle capacity'
                }
            });
            return;
        }

        const [updatedPackage, delivery] = await db.$transaction([
            db.package.update({
                where: { id: packageId },
                data: {
                    status: PackageStatus.ASSIGNED,
                    timeline: {
                        upsert: {
                            create: {
                                assigned: new Date()
                            },
                            update: {
                                assigned: new Date()
                            }
                        }
                    }
                },
                include: {
                    timeline: true
                }
            }),
            db.delivery.create({
                data: {
                    packageId,
                    deliveryPersonId,
                    vehicleId,
                    status: 'ASSIGNED'
                },
                include: {
                    deliveryPerson: {
                        select: {
                            id: true,
                            name: true,
                            phoneNumber: true
                        }
                    },
                    vehicle: true
                }
            })
        ]);

        // Emit real-time update
        emitPackageUpdate(packageId, {
            status: PackageStatus.ASSIGNED,
            timestamp: new Date()
        });

        res.status(200).json({
            success: true,
            package: updatedPackage,
            assignment: {
                id: delivery.id,
                timestamp: delivery.createdAt,
                deliveryPerson: {
                    id: delivery.deliveryPerson.id,
                    name: delivery.deliveryPerson.name,
                    vehicle: {
                        type: delivery.vehicle.type,
                        plateNumber: delivery.vehicle.licensePlate
                    }
                }
            }
        });
    } catch (error: any) {
        console.error('Error assigning package:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'ASSIGNMENT_FAILED',
                message: error.message
            }
        });
    }
};

// Cancel package
export const cancelPackage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id: packageId } = req.params;
        const { reason, canceledBy, note } = req.body;

        // Validate package exists
        const pkg = await db.package.findUnique({
            where: { id: packageId },
            include: {
                delivery: true,
                pricing: true,
                timeline: true
            }
        });

        if (!pkg) {
            res.status(404).json({
                success: false,
                error: {
                    code: 'PACKAGE_NOT_FOUND',
                    message: 'Package not found'
                }
            });
            return;
        }

        // Validate cancellation rules
        const rules = CANCELLATION_RULES[pkg.status];
        if (!rules) {
            res.status(400).json({
                success: false,
                error: {
                    code: 'CANCELLATION_NOT_ALLOWED',
                    message: `Cancellation not allowed for packages in ${pkg.status} status`
                }
            });
            return;
        }

        if (!rules.allowedBy.includes(canceledBy.type as CancellationType)) {
            res.status(403).json({
                success: false,
                error: {
                    code: 'UNAUTHORIZED_CANCELLATION',
                    message: `Cancellation not allowed by ${canceledBy.type}`
                }
            });
            return;
        }

        // Check time limit for assigned packages
        if (pkg.status === PackageStatus.ASSIGNED && rules.type === 'timed') {
            const assignmentTime = pkg.timeline?.assigned;
            if (assignmentTime && rules.timeLimit) {
                const minutesSinceAssignment = (Date.now() - assignmentTime.getTime()) / (1000 * 60);
                if (minutesSinceAssignment > rules.timeLimit) {
                    res.status(400).json({
                        success: false,
                        error: {
                            code: 'CANCELLATION_TIME_EXPIRED',
                            message: `Cancellation time limit (${rules.timeLimit} minutes) has expired`
                        }
                    });
                    return;
                }
            }
        }

        // Calculate refund and penalty
        const totalPrice = pkg.pricing?.totalPrice || 0;
        const refundPercentage = rules.refund;
        const penaltyPercentage = rules.type === 'timed'
            ? rules.penalty[canceledBy.type as keyof typeof rules.penalty]
            : rules.penalty;

        const refundAmount = (totalPrice * refundPercentage) / 100;
        const penaltyFee = (totalPrice * penaltyPercentage) / 100;

        // Create cancellation record and update package
        const [cancellation, updatedPackage] = await db.$transaction([
            db.cancellation.create({
                data: {
                    packageId,
                    reason,
                    canceledById: canceledBy.id,
                    canceledByType: canceledBy.type,
                    refundAmount,
                    penaltyFee,
                    note
                }
            }),
            db.package.update({
                where: { id: packageId },
                data: {
                    status: PackageStatus.CANCELLED,
                    timeline: {
                        upsert: {
                            create: {
                                cancelled: new Date()
                            },
                            update: {
                                cancelled: new Date()
                            }
                        }
                    }
                },
                include: {
                    pricing: true,
                    timeline: true,
                    cancellation: true
                }
            })
        ]);

        // Emit real-time updates
        emitPackageUpdate(packageId, {
            status: PackageStatus.CANCELLED
        });

        emitPackageCancelled(packageId, {
            reason: cancellation.reason,
            by: {
                id: canceledBy.id,
                type: canceledBy.type
            },
            refundAmount: cancellation.refundAmount,
            timestamp: cancellation.timestamp
        });

        res.status(200).json({
            success: true,
            package: updatedPackage,
            cancellation: {
                id: cancellation.id,
                timestamp: cancellation.timestamp,
                reason: cancellation.reason,
                refundAmount: cancellation.refundAmount,
                penaltyFee: cancellation.penaltyFee
            }
        });
    } catch (error: any) {
        console.error('Error cancelling package:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'CANCELLATION_FAILED',
                message: error.message
            }
        });
    }
};

