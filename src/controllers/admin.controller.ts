import { Request, Response } from 'express';
import { db } from '@utils/db';

// Get all admin workers
export const getAdminWorkers = async (req: Request, res: Response): Promise<void> => {
  try {
    const admins = await db.users.findMany({
      where: {
        role: {
          in: ['admin', 'superAdmin']
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        phoneNumber: true,
        banned: true,
        banReason: true,
        banExpires: true,
      }
    });

    res.status(200).json({ success: true, admins });
  } catch (error) {
    console.error('Error fetching admin workers:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch admin workers' });
  }
};

// Get specific admin worker
export const getAdminWorkerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const admin = await db.users.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        phoneNumber: true,
        banned: true,
        banReason: true,
        banExpires: true,
      }
    });

    if (!admin) {
      res.status(404).json({ success: false, error: 'Admin worker not found' });
      return;
    }

    res.status(200).json({ success: true, admin });
  } catch (error) {
    console.error('Error fetching admin worker:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch admin worker' });
  }
};

// Update admin worker
export const updateAdminWorker = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, role, phoneNumber } = req.body;

    // Validate role
    if (role && !['admin', 'superAdmin'].includes(role)) {
      res.status(400).json({ success: false, error: 'Invalid role specified' });
      return;
    }

    const updatedAdmin = await db.users.update({
      where: { id },
      data: {
        name,
        email,
        role,
        phoneNumber,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phoneNumber: true,
      }
    });

    res.status(200).json({ success: true, admin: updatedAdmin });
  } catch (error) {
    console.error('Error updating admin worker:', error);
    res.status(500).json({ success: false, error: 'Failed to update admin worker' });
  }
};

// Ban/Unban admin worker
export const toggleAdminBan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { banned, banReason, banExpires } = req.body;

    const updatedAdmin = await db.users.update({
      where: { id },
      data: {
        banned,
        banReason: banned ? banReason : null,
        banExpires: banned ? banExpires : null,
      },
    });

    res.status(200).json({ success: true, admin: updatedAdmin });
  } catch (error) {
    console.error('Error toggling admin ban status:', error);
    res.status(500).json({ success: false, error: 'Failed to update admin ban status' });
  }
};

// Delete admin worker
export const deleteAdminWorker = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await db.users.delete({
      where: { id },
    });

    res.status(200).json({ success: true, message: 'Admin worker deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin worker:', error);
    res.status(500).json({ success: false, error: 'Failed to delete admin worker' });
  }
}; 