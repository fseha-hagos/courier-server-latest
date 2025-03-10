interface Coordinates {
    lat: number;
    lng: number;
}
interface DistanceMatrixResponse {
    distance: number | null;
    duration: number | null;
}
declare const calculateDistances: (origins: Coordinates[], destinations: Coordinates[]) => Promise<DistanceMatrixResponse[][]>;
export default calculateDistances;
//# sourceMappingURL=distanceMatrix.d.ts.map