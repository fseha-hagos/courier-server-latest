import { Request, Response } from 'express';
import { updateDeliveryPersonStatus, getDeliveryPersons } from '@services/deliveryPerson';

export const updateStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    const updatedPerson = await updateDeliveryPersonStatus(userId, status);

    res.status(200).json({ message: 'Status updated', deliveryPerson: updatedPerson });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update delivery person status' });
  }
};

export const getAllDeliveryPersons = async (req: Request, res: Response): Promise<void> => {
  try {
    const deliveryPersons = await getDeliveryPersons();
    res.status(200).json(deliveryPersons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch delivery persons' });
  }
};
