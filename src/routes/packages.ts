import { Router } from 'express';
import {
    createPackage,
    assignDeliveryPerson,
    getPackages,
    getPackageById,
    updatePackage,
    deletePackage,
    updatePackageLocation,
    restorePackage,
    getDeletedPackages
} from '@controllers/packages.controller';

const router = Router();

// Get all packages
router.get('/', getPackages);

// Get all deleted packages
router.get('/deleted', getDeletedPackages);

// Get a single package by ID
router.get('/:id', getPackageById);

// Create a new package
router.post('/create', createPackage);

// Match package to the closest delivery person
router.post('/assign/:packageId', assignDeliveryPerson);

// Update package location
router.post('/:id/location', updatePackageLocation);

// Update an existing package
router.put('/:id', updatePackage);

// Soft delete a package
router.delete('/:id', deletePackage);

// Restore a deleted package
router.post('/:id/restore', restorePackage);

export default router;
