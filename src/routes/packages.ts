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

/**
 * @swagger
 * /api/packages:
 *   get:
 *     summary: Get all packages
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of packages to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of packages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 packages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Package'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', getPackages);

/**
 * @swagger
 * /api/packages/{id}:
 *   get:
 *     summary: Get a package by ID
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     responses:
 *       200:
 *         description: Package details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 package:
 *                   $ref: '#/components/schemas/Package'
 *       404:
 *         description: Package not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getPackageById);

/**
 * @swagger
 * components:
 *   schemas:
 *     Package:
 *       type: object
 *       required:
 *         - customerId
 *         - description
 *         - weight
 *         - pickup
 *         - delivery
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated package ID
 *         customerId:
 *           type: string
 *           description: ID of the customer who created the package
 *         description:
 *           type: string
 *           description: Package description
 *         weight:
 *           type: number
 *           description: Package weight in kilograms
 *         status:
 *           type: string
 *           enum: [PENDING, ASSIGNED, IN_PROGRESS, COMPLETED, FAILED, CANCELLED]
 *           description: Current status of the package
 *         pickup:
 *           type: object
 *           properties:
 *             placeId:
 *               type: string
 *             address:
 *               type: string
 *             latitude:
 *               type: number
 *             longitude:
 *               type: number
 *         delivery:
 *           type: object
 *           properties:
 *             placeId:
 *               type: string
 *             address:
 *               type: string
 *             latitude:
 *               type: number
 *             longitude:
 *               type: number
 */

/**
 * @swagger
 * /api/packages/deleted:
 *   get:
 *     summary: Get all deleted packages
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of deleted packages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 packages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Package'
 */
router.get('/deleted', getDeletedPackages);

/**
 * @swagger
 * /api/packages/{id}/history:
 *   get:
 *     summary: Get package history
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     responses:
 *       200:
 *         description: Package history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 history:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PackageHistory'
 */
router.get('/:id/history', getPackageHistory);

/**
 * @swagger
 * /api/packages/{id}/available-delivery-persons:
 *   get:
 *     summary: Get available delivery persons for a package
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     responses:
 *       200:
 *         description: List of available delivery persons
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 deliveryPersons:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DeliveryPerson'
 */
router.get('/:id/available-delivery-persons', getAvailableDeliveryPersons);

/**
 * @swagger
 * /api/packages/{id}/nearby-delivery-persons:
 *   get:
 *     summary: Get nearby delivery persons
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *       - in: query
 *         name: radius
 *         schema:
 *           type: number
 *         description: Search radius in meters (default: 5000)
 *     responses:
 *       200:
 *         description: List of nearby delivery persons
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 deliveryPersons:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DeliveryPerson'
 */
router.get('/:id/nearby-delivery-persons', getNearbyDeliveryPersons);

/**
 * @swagger
 * /api/packages/{id}/estimated-time:
 *   get:
 *     summary: Get estimated delivery time
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     responses:
 *       200:
 *         description: Estimated delivery time
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 estimatedTime:
 *                   type: string
 *                   format: date-time
 */
router.get('/:id/estimated-time', getEstimatedDeliveryTime);

/**
 * @swagger
 * /api/packages/create:
 *   post:
 *     summary: Create a new package
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - description
 *               - weight
 *               - pickup
 *               - delivery
 *             properties:
 *               customerId:
 *                 type: string
 *               description:
 *                 type: string
 *               weight:
 *                 type: number
 *               pickup:
 *                 $ref: '#/components/schemas/Location'
 *               delivery:
 *                 $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: Package created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 package:
 *                   $ref: '#/components/schemas/Package'
 */
router.post('/create', createPackage);

/**
 * @swagger
 * /api/packages/{id}/notes:
 *   post:
 *     summary: Add note to delivery
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - note
 *             properties:
 *               note:
 *                 type: string
 *               location:
 *                 $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Note added successfully
 */
router.post('/:id/notes', addDeliveryNote);

/**
 * @swagger
 * /api/packages/{id}/rate:
 *   post:
 *     summary: Rate delivery
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rating submitted successfully
 */
router.post('/:id/rate', rateDelivery);

/**
 * @swagger
 * /api/packages/{id}/assign:
 *   post:
 *     summary: Assign package to delivery person
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - deliveryPersonId
 *             properties:
 *               deliveryPersonId:
 *                 type: string
 *               vehicleId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Package assigned successfully
 */
router.post('/:id/assign', assignPackage);

/**
 * @swagger
 * /api/packages/{id}/cancel:
 *   post:
 *     summary: Cancel package
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason
 *             properties:
 *               reason:
 *                 type: string
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: Package cancelled successfully
 */
router.post('/:id/cancel', cancelPackage);

/**
 * @swagger
 * /api/packages/{id}/location:
 *   post:
 *     summary: Update package location
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Location updated successfully
 */
router.post('/:id/location', updatePackageLocation);

/**
 * @swagger
 * /api/packages/{id}:
 *   put:
 *     summary: Update an existing package
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Package'
 *     responses:
 *       200:
 *         description: Package updated successfully
 */
router.put('/:id', updatePackage);

/**
 * @swagger
 * /api/packages/{id}:
 *   delete:
 *     summary: Soft delete a package
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     responses:
 *       200:
 *         description: Package deleted successfully
 */
router.delete('/:id', deletePackage);

/**
 * @swagger
 * /api/packages/{id}/restore:
 *   post:
 *     summary: Restore a deleted package
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     responses:
 *       200:
 *         description: Package restored successfully
 */
router.post('/:id/restore', restorePackage);

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - latitude
 *         - longitude
 *       properties:
 *         placeId:
 *           type: string
 *         address:
 *           type: string
 *         latitude:
 *           type: number
 *         longitude:
 *           type: number
 * 
 *     PackageHistory:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         timestamp:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *         location:
 *           $ref: '#/components/schemas/Location'
 *         note:
 *           type: string
 *         actor:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             type:
 *               type: string
 *               enum: [CUSTOMER, DELIVERY_PERSON, ADMIN]
 * 
 *     DeliveryPerson:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         status:
 *           type: string
 *           enum: [ONLINE, OFFLINE]
 *         currentLocation:
 *           $ref: '#/components/schemas/Location'
 *         averageRating:
 *           type: number
 *         vehicle:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             type:
 *               type: string
 *             licensePlate:
 *               type: string
 *             maxWeight:
 *               type: number
 */

export default router;
