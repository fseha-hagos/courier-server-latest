import { Client } from '@googlemaps/google-maps-services-js';
import { db } from './db';
import { Prisma, Location, LocationType } from '@prisma/client';
import { config } from './config';

const client = new Client({});

// Get API key from config
const GOOGLE_MAPS_API_KEY = config.googleMapsApiKey;

if (!GOOGLE_MAPS_API_KEY) {
  console.error('GOOGLE_MAPS_API_KEY is not set in environment variables');
  process.exit(1);
}

interface CreateLocationInput {
  placeId: string;
  address: string;
  name?: string;
  type: LocationType;
  latitude: number;
  longitude: number;
}

export const locationService = {
  /**
   * Create or retrieve a location
   */
  createOrGetLocation: async (input: CreateLocationInput): Promise<Location> => {
    // Check if location with placeId exists
    const existingLocation = await db.location.findUnique({
      where: { placeId: input.placeId },
    });

    if (existingLocation) {
      return existingLocation;
    }

    // Create new location
    return db.location.create({
      data: {
        placeId: input.placeId,
        address: input.address,
        name: input.name,
        type: input.type,
        latitude: input.latitude,
        longitude: input.longitude,
      },
    });
  },

  /**
   * Add location history entry
   */
  addLocationHistory: async (
    packageId: string,
    locationId: string,
    status: LocationStatus,
    currentCoords?: { lat: number; lng: number }
  ) => {
    return db.locationHistory.create({
      data: {
        packageId,
        locationId,
        status,
        currentLat: currentCoords?.lat,
        currentLng: currentCoords?.lng,
      },
    });
  },

  /**
   * Get location history for a package
   */
  getPackageLocationHistory: async (packageId: string) => {
    return db.locationHistory.findMany({
      where: { packageId },
      include: {
        location: true,
      },
      orderBy: {
        timestamp: 'desc',
      },
    });
  },

  /**
   * Validate and format a Google Place ID
   */
  validateLocation: async (placeId: string): Promise<Omit<CreateLocationInput, 'type'>> => {
    try {
      console.log('[Location Validation] Validating place ID:', placeId);
      
      const response = await client.placeDetails({
        params: {
          place_id: placeId,
          key: GOOGLE_MAPS_API_KEY,
          fields: ['place_id', 'formatted_address', 'name', 'geometry']
        },
      });

      console.log('[Location Validation] Google Places API response:', {
        status: response.data.status,
        hasResult: !!response.data.result
      });

      const place = response.data.result;
      
      if (!place.geometry?.location || !place.formatted_address || !place.place_id) {
        console.error('[Location Validation] Invalid place data:', {
          hasGeometry: !!place.geometry,
          hasLocation: !!place.geometry?.location,
          hasFormattedAddress: !!place.formatted_address,
          hasPlaceId: !!place.place_id
        });
        throw new Error('Invalid location data from Google Places API');
      }

      return {
        placeId: place.place_id,
        address: place.formatted_address,
        name: place.name || undefined,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      };
    } catch (error: any) {
      console.error('[Location Validation] Error:', {
        error: error.message || 'Unknown error',
        placeId,
        stack: error.stack
      });
      throw new Error(`Failed to validate location: ${error.message || 'Unknown error'}`);
    }
  },

  /**
   * Get frequently used locations
   */
  getFrequentLocations: async (limit = 10) => {
    const locations = await db.location.findMany({
      take: limit,
      include: {
        _count: {
          select: {
            packagesPickup: true,
            packagesDelivery: true,
          },
        },
      },
      orderBy: {
        packagesPickup: {
          _count: 'desc',
        },
      },
    });

    return locations.map(loc => ({
      ...loc,
      useCount: loc._count.packagesPickup + loc._count.packagesDelivery,
    }));
  },
};

// Types for location status
export const LocationStatus = {
  PICKED_UP: 'PICKED_UP',
  IN_TRANSIT: 'IN_TRANSIT',
  DELIVERED: 'DELIVERED',
} as const;

export type LocationStatus = typeof LocationStatus[keyof typeof LocationStatus]; 