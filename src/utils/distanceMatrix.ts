import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({});
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

interface Coordinates {
  lat: number;
  lng: number;
}

interface DistanceMatrixResponse {
  distance: number | null;
  duration: number | null;
}

const calculateDistances = async (
  origins: Coordinates[],
  destinations: Coordinates[]
): Promise<DistanceMatrixResponse[][]> => {
  try {
    // Map coordinates to strings for the API
    const originStrings = origins.map(o => `${o.lat},${o.lng}`);
    const destinationStrings = destinations.map(d => `${d.lat},${d.lng}`);

    const response = await client.distancematrix({
      params: {
        origins: originStrings,
        destinations: destinationStrings,
        key: GOOGLE_MAPS_API_KEY!,
      },
    });

    return response.data.rows.map(row =>
      row.elements.map(element => ({
        distance: element.distance?.value ?? null, // Distance in meters
        duration: element.duration?.value ?? null, // Duration in seconds
      }))
    );
  } catch (error: any) {
    console.error('Error fetching distances:', error.response?.data?.error_message || error.message);
    throw new Error('Failed to calculate distances');
  }
};

export default calculateDistances;
