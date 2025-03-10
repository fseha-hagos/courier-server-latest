import { Request, Response } from "express";
/**
 * Controller to fetch users with related data.
 */
export declare const getUsers: (req: Request, res: Response) => Promise<void>;
/**
 * Search users across all roles
 */
export declare const searchUsers: (req: Request, res: Response) => Promise<void>;
/**
 * Get user statistics
 */
export declare const getUserStats: (req: Request, res: Response) => Promise<void>;
/**
 * Get banned users across all roles
 */
export declare const getBannedUsers: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=users.controller.d.ts.map