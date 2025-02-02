import { Request, Response } from 'express';
import { db } from '@utils/db';

// Get all customers with pagination
export const getCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    // Build where clause
    const whereClause: any = {
      role: 'customer',
    };

    // Add search functionality
    if (search) {
      whereClause.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
        { phoneNumber: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [customers, totalCount] = await Promise.all([
      db.users.findMany({
        where: whereClause,
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          createdAt: true,
          banned: true,
          banReason: true,
          banExpires: true,
          Package: {
            select: {
              id: true,
              createdAt: true,
              delivery: {
                select: {
                  status: true,
                  createdAt: true,
                }
              }
            },
          },
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
      customers,
      pagination: {
        total: totalCount,
        pages: Math.ceil(totalCount / Number(limit)),
        currentPage: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch customers' });
  }
};

// Get customer by ID with their packages and delivery history
export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const customer = await db.users.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        createdAt: true,
        banned: true,
        banReason: true,
        banExpires: true,
        Package: {
          include: {
            pickupLocation: true,
            deliveryLocation: true,
            delivery: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!customer) {
      res.status(404).json({ success: false, error: 'Customer not found' });
      return;
    }

    res.status(200).json({ success: true, customer });
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch customer' });
  }
};

// Update customer information
export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber } = req.body;

    const updatedCustomer = await db.users.update({
      where: { id },
      data: {
        name,
        email,
        phoneNumber,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
      },
    });

    res.status(200).json({ success: true, customer: updatedCustomer });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ success: false, error: 'Failed to update customer' });
  }
};

// Ban/Unban customer
export const toggleCustomerBan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { banned, banReason, banExpires } = req.body;

    const updatedCustomer = await db.users.update({
      where: { id },
      data: {
        banned,
        banReason: banned ? banReason : null,
        banExpires: banned ? banExpires : null,
      },
    });

    res.status(200).json({ success: true, customer: updatedCustomer });
  } catch (error) {
    console.error('Error toggling customer ban status:', error);
    res.status(500).json({ success: false, error: 'Failed to update customer ban status' });
  }
};

// Get customer's package history
export const getCustomerPackages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [packages, totalCount] = await Promise.all([
      db.package.findMany({
        where: { customerId: id },
        include: {
          pickupLocation: true,
          deliveryLocation: true,
          delivery: true,
        },
        skip,
        take: Number(limit),
        orderBy: {
          createdAt: 'desc',
        },
      }),
      db.package.count({
        where: { customerId: id },
      }),
    ]);

    res.status(200).json({
      success: true,
      packages,
      pagination: {
        total: totalCount,
        pages: Math.ceil(totalCount / Number(limit)),
        currentPage: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error('Error fetching customer packages:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch customer packages' });
  }
}; 