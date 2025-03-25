import { Location, LocationType } from '@prisma/client';
interface CreateLocationInput {
    placeId: string;
    address: string;
    name?: string;
    type: LocationType;
    latitude: number;
    longitude: number;
}
export declare const locationService: {
    /**
     * Create or retrieve a location
     */
    createOrGetLocation: (input: CreateLocationInput) => Promise<Location>;
    /**
     * Add location history entry
     */
    addLocationHistory: (packageId: string, locationId: string, status: LocationStatus, currentCoords?: {
        lat: number;
        lng: number;
    }) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        packageId: string;
        timestamp: Date;
        locationId: string;
        currentLat: number | null;
        currentLng: number | null;
    }>;
    /**
     * Get location history for a package
     */
    getPackageLocationHistory: (packageId: string) => Promise<({
        location: {
            name: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.LocationType;
            placeId: string;
            latitude: number;
            longitude: number;
            address: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        packageId: string;
        timestamp: Date;
        locationId: string;
        currentLat: number | null;
        currentLng: number | null;
    })[]>;
    /**
     * Validate and format a Google Place ID
     */
    validateLocation: (placeId: string) => Promise<Omit<CreateLocationInput, "type">>;
    /**
     * Get frequently used locations
     */
    getFrequentLocations: (limit?: number) => Promise<{
        useCount: number;
        _count: {
            packagesDelivery: number;
            packagesPickup: number;
        };
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.LocationType;
        placeId: string;
        latitude: number;
        longitude: number;
        address: string;
    }[]>;
};
export declare const LocationStatus: {
    readonly PICKED_UP: "PICKED_UP";
    readonly IN_TRANSIT: "IN_TRANSIT";
    readonly DELIVERED: "DELIVERED";
};
export type LocationStatus = typeof LocationStatus[keyof typeof LocationStatus];
export {};
//# sourceMappingURL=location.d.ts.map