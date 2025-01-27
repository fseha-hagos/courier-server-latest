import { Router } from 'express';
import { createPackage, assignDeliveryPerson, getPackages, getPackageById, updatePackage, deletePackage } from '@controllers/package';

const router = Router();

// Create a new package
router.post('/create', createPackage);

// Match package to the closest delivery person
router.post('/assign/:packageId', assignDeliveryPerson);

// Get all packages
router.get('/', getPackages);

// Get a single package by ID
router.get('/:id', getPackageById);

// Update an existing package
router.put('/:id', updatePackage);

// Delete a package
router.delete('/:id', deletePackage);

export default router;
