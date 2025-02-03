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
    getDeletedPackages,
    getAvailableDeliveryPersons,
    getPackageHistory,
    getEstimatedDeliveryTime,
    getNearbyDeliveryPersons,
    validateDeliveryPerson,
    rateDelivery,
    addDeliveryNote,
    assignPackage,
    cancelPackage
} from '@controllers/packages.controller';

const router = Router();

// Get all packages
router.get('/', getPackages);

// Get all deleted packages
router.get('/deleted', getDeletedPackages);

// Get a single package by ID
router.get('/:id', getPackageById);

// Get package history
router.get('/:id/history', getPackageHistory);

// Get available delivery persons for a package
router.get('/:id/available-delivery-persons', getAvailableDeliveryPersons);

// Get nearby delivery persons
router.get('/:id/nearby-delivery-persons', getNearbyDeliveryPersons);

// Get estimated delivery time
router.get('/:id/estimated-time', getEstimatedDeliveryTime);

// Validate delivery person for package
router.get('/:id/validate-delivery-person', validateDeliveryPerson);

// Create a new package
router.post('/create', createPackage);

// Add note to delivery
router.post('/:id/notes', addDeliveryNote);

// Rate delivery
router.post('/:id/rate', rateDelivery);

// Assign package to delivery person (new endpoint)
router.post('/:id/assign', assignPackage);

// Cancel package (new endpoint)
router.post('/:id/cancel', cancelPackage);

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
