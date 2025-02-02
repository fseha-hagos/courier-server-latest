import { Request, Response } from "express";
import { db } from "@utils/db";

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

/**
 * Search users across all roles
 */
export const searchUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query, role, page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const whereClause: any = {};

    // Add role filter if specified
    if (role) {
      whereClause.role = role;
    }

    // Add search functionality
    if (query) {
      whereClause.OR = [
        { name: { contains: query as string, mode: 'insensitive' } },
        { email: { contains: query as string, mode: 'insensitive' } },
        { phoneNumber: { contains: query as string, mode: 'insensitive' } },
      ];
    }

    const [users, totalCount] = await Promise.all([
      db.users.findMany({
        where: whereClause,
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          role: true,
          createdAt: true,
          banned: true,
        },
        skip,
        take: Number(limit),
        orderBy: {
          createdAt: 'desc',
        },
      }),
      db.users.count({ where: whereClause }),
    ]);

    res.status(200).json({
      success: true,
      users,
      pagination: {
        total: totalCount,
        pages: Math.ceil(totalCount / Number(limit)),
        currentPage: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ success: false, error: "Failed to search users" });
  }
};

/**
 * Get user statistics
 */
export const getUserStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const [
      totalUsers,
      totalCustomers,
      totalDeliveryPersons,
      totalAdmins,
      activeDeliveryPersons,
      bannedUsers,
      recentUsers,
    ] = await Promise.all([
      // Total users
      db.users.count(),
      // Total customers
      db.users.count({ where: { role: 'customer' } }),
      // Total delivery persons
      db.users.count({ where: { role: 'DELIVERY_PERSON' } }),
      // Total admins
      db.users.count({ where: { role: { in: ['admin', 'superAdmin'] } } }),
      // Active delivery persons
      db.users.count({ where: { role: 'DELIVERY_PERSON', status: 'ONLINE' } }),
      // Banned users
      db.users.count({ where: { banned: true } }),
      // Recent users (last 30 days)
      db.users.findMany({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
        select: {
          id: true,
          name: true,
          role: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 10,
      }),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalCustomers,
        totalDeliveryPersons,
        totalAdmins,
        activeDeliveryPersons,
        bannedUsers,
        recentUsers,
      },
    });
  } catch (error) {
    console.error("Error fetching user statistics:", error);
    res.status(500).json({ success: false, error: "Failed to fetch user statistics" });
  }
};

/**
 * Get banned users across all roles
 */
export const getBannedUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [bannedUsers, totalCount] = await Promise.all([
      db.users.findMany({
        where: {
          banned: true,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          role: true,
          banReason: true,
          banExpires: true,
          createdAt: true,
        },
        skip,
        take: Number(limit),
        orderBy: {
          createdAt: 'desc',
        },
      }),
      db.users.count({
        where: {
          banned: true,
        },
      }),
    ]);

    res.status(200).json({
      success: true,
      bannedUsers,
      pagination: {
        total: totalCount,
        pages: Math.ceil(totalCount / Number(limit)),
        currentPage: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching banned users:", error);
    res.status(500).json({ success: false, error: "Failed to fetch banned users" });
  }
};
