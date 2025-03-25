import { Request, Response } from 'express';
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}
export declare const getPackages: (req: Request, res: Response) => Promise<void>;
export declare const getPackageById: (req: Request, res: Response) => Promise<void>;
export declare const createPackage: (req: Request, res: Response) => Promise<void>;
export declare const updatePackage: (req: Request, res: Response) => Promise<void>;
export declare const deletePackage: (req: Request, res: Response) => Promise<void>;
export declare const restorePackage: (req: Request, res: Response) => Promise<void>;
export declare const assignDeliveryPerson: (req: Request, res: Response) => Promise<void>;
export declare const updatePackageLocation: (req: Request, res: Response) => Promise<void>;
export declare const getDeletedPackages: (req: Request, res: Response) => Promise<void>;
export declare const getAvailableDeliveryPersons: (req: Request, res: Response) => Promise<void>;
export declare const getPackageHistory: (req: Request, res: Response) => Promise<void>;
export declare const getEstimatedDeliveryTime: (req: Request, res: Response) => Promise<void>;
export declare const getNearbyDeliveryPersons: (req: Request, res: Response) => Promise<void>;
export declare const validateDeliveryPerson: (req: Request, res: Response) => Promise<void>;
export declare const rateDelivery: (req: Request, res: Response) => Promise<void>;
export declare const addDeliveryNote: (req: Request, res: Response) => Promise<void>;
export declare enum PackageErrorCodes {
    INVALID_STATUS_TRANSITION = "INVALID_STATUS_TRANSITION",
    CANCELLATION_NOT_ALLOWED = "CANCELLATION_NOT_ALLOWED",
    INVALID_ASSIGNMENT = "INVALID_ASSIGNMENT",
    DELIVERY_PERSON_UNAVAILABLE = "DELIVERY_PERSON_UNAVAILABLE",
    VEHICLE_WEIGHT_EXCEEDED = "VEHICLE_WEIGHT_EXCEEDED"
}
export declare const updatePackageStatus: (req: Request, res: Response) => Promise<void>;
export declare const assignPackage: (req: Request, res: Response) => Promise<void>;
export declare const cancelPackage: (req: Request, res: Response) => Promise<void>;
export declare const requestDelivery: (req: Request, res: Response) => Promise<void>;
export declare const handleDeliveryResponse: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=packages.controller.d.ts.map