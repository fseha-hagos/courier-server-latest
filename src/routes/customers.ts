import { Router } from 'express';
import {
  getCustomers,
  getCustomerById,
  updateCustomer,
  toggleCustomerBan,
  getCustomerPackages,
} from '@controllers/customers.controller';

const router = Router();

// Get all customers (with pagination and search)
router.get('/', getCustomers);

// Get specific customer
router.get('/:id', getCustomerById);

// Update customer information
router.put('/:id', updateCustomer);

// Ban/Unban customer
router.put('/:id/ban', toggleCustomerBan);

// Get customer's package history
router.get('/:id/packages', getCustomerPackages);

export default router; 