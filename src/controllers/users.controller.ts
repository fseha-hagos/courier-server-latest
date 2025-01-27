import { Request, Response } from "express";
import {db} from "@utils/db"; 

/**
 * Controller to fetch users with related data.
 */
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      // Query parameters for optional pagination or filtering
      const { limit = 10, page = 1 } = req.query;
      const take = Number(limit);
      const skip = (Number(page) - 1) * take;
  
      const users = await db.users.findMany({
        take,
        skip,
        include: {
          vehicles: true, // Include vehicles related to the user
          // Uncomment to include additional relations
          // sessions: true,
          // accounts: true,
          // deliveries: {
          //   include: {
          //     package: {
          //       include: {
          //         pickupLocation: true,
          //         deliveryLocation: true,
          //       },
          //     },
          //   },
          // },
          // Package: {
          //   include: {
          //     pickupLocation: true,
          //     deliveryLocation: true,
          //   },
          // },
        },
      });
  
      res.status(200).json({ success: true, users });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ success: false, message: "Failed to fetch users" });
    }
  };
