import { Request, Response } from 'express';
import { UserStatus } from '@prisma/client';
import { db } from '@utils/db';
import { updateDeliveryPersonStatus, getDeliveryPersons } from '@services/deliveryPerson';

// Get all delivery persons with their current status and vehicle info
export const getAllDeliveryPersons = async (req: Request, res: Response): Promise<void> => {
  try {
    const deliveryPersons = await db.users.findMany({
      where: {
        role: 'DELIVERY_PERSON',
      },
      include: {
        vehicles: true,
        deliveries: {
          include: {
            package: true,
          },
        },
      },
    });
    res.status(200).json({ success: true, deliveryPersons });
  } catch (error) {
    console.error('Error fetching delivery persons:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch delivery persons' });
  }
};

// Get a single delivery person by ID
export const getDeliveryPersonById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deliveryPerson = await db.users.findUnique({
      where: { id },
      include: {
        vehicles: true,
        deliveries: {
          include: {
            package: true,
          },
        },
      },
    });

    if (!deliveryPerson) {
      res.status(404).json({ success: false, error: 'Delivery person not found' });
      return;
    }

    res.status(200).json({ success: true, deliveryPerson });
  } catch (error) {
    console.error('Error fetching delivery person:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch delivery person' });
  }
};

// Update delivery person status (ONLINE/OFFLINE)
export const updateStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!Object.values(UserStatus).includes(status)) {
      res.status(400).json({ success: false, error: 'Invalid status value' });
      return;
    }

    const updatedPerson = await updateDeliveryPersonStatus(id, status);
    res.status(200).json({ success: true, deliveryPerson: updatedPerson });
  } catch (error) {
    console.error('Error updating delivery person status:', error);
    res.status(500).json({ success: false, error: 'Failed to update delivery person status' });
  }
};

// Update delivery person's current location
export const updateLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { latitude, longitude, vehicleId } = req.body;

    if (!latitude || !longitude || !vehicleId) {
      res.status(400).json({ success: false, error: 'Latitude, longitude and vehicleId are required' });
      return;
    }

    const updatedVehicle = await db.vehicle.update({
      where: { id: vehicleId },
      data: {
        currentLatitude: latitude,
        currentLongitude: longitude,
      },
    });

    res.status(200).json({ success: true, vehicle: updatedVehicle });
  } catch (error) {
    console.error('Error updating delivery person location:', error);
    res.status(500).json({ success: false, error: 'Failed to update location' });
  }
};

// Get delivery person's current deliveries
export const getCurrentDeliveries = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deliveries = await db.delivery.findMany({
      where: {
        deliveryPersonId: id,
        status: {
          in: ['ASSIGNED', 'IN_PROGRESS'],
        },
      },
      include: {
        package: {
          include: {
            pickupLocation: true,
            deliveryLocation: true,
          },
        },
      },
    });

    res.status(200).json({ success: true, deliveries });
  } catch (error) {
    console.error('Error fetching current deliveries:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch current deliveries' });
  }
};

// Get delivery person's delivery history
export const getDeliveryHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const deliveries = await db.delivery.findMany({
      where: {
        deliveryPersonId: id,
        status: {
          in: ['COMPLETED', 'FAILED', 'DECLINED'],
        },
      },
      include: {
        package: {
          include: {
            pickupLocation: true,
            deliveryLocation: true,
          },
        },
      },
      skip,
      take: Number(limit),
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalCount = await db.delivery.count({
      where: {
        deliveryPersonId: id,
        status: {
          in: ['COMPLETED', 'FAILED', 'DECLINED'],
        },
      },
    });

    res.status(200).json({
      success: true,
      deliveries,
      pagination: {
        total: totalCount,
        pages: Math.ceil(totalCount / Number(limit)),
        currentPage: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error('Error fetching delivery history:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch delivery history' });
  }
};
