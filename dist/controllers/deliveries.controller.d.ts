import { Request, Response } from "express";
/**
 * Fetch a paginated list of deliveries with related data.
 */
export declare const getDeliveries: (req: Request, res: Response) => Promise<void>;
/**
 * Fetch a single delivery by ID with detailed information.
 */
export declare const getDeliveryById: (req: Request, res: Response) => Promise<void>;
/**
 * Update the status of a delivery.
 */
export declare const updateDeliveryStatus: (req: Request, res: Response) => Promise<void>;
/**
 * Assign a vehicle and delivery person to a package.
 */
export declare const assignDelivery: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=deliveries.controller.d.ts.map