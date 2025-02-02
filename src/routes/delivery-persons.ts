import { Router } from 'express';
import {
  getAllDeliveryPersons,
  getDeliveryPersonById,
  updateStatus,
  updateLocation,
  getCurrentDeliveries,
  getDeliveryHistory,
} from '@controllers/delivery-person.controller';

const router = Router();

// Get all delivery persons
router.get('/', getAllDeliveryPersons);

// Get a specific delivery person
router.get('/:id', getDeliveryPersonById);

// Update delivery person's online/offline status
router.put('/:id/status', updateStatus);

// Update delivery person's current location
router.put('/:id/location', updateLocation);

// Get delivery person's current active deliveries
router.get('/:id/current-deliveries', getCurrentDeliveries);

// Get delivery person's delivery history
router.get('/:id/delivery-history', getDeliveryHistory);

export default router; 