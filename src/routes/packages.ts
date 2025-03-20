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
 *         description: List of packages with their current locations
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       pickupLocation:
 *                         $ref: '#/components/schemas/Location'
 *                       deliveryLocation:
 *                         $ref: '#/components/schemas/Location'
 *                       delivery:
 *                         type: object
 *                         properties:
 *                           deliveryPerson:
 *                             $ref: '#/components/schemas/User'
 *                           vehicle:
 *                             $ref: '#/components/schemas/Vehicle'
 *                       labels:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Label'
 *                       currentLocation:
 *                         $ref: '#/components/schemas/Location'
 *                       deleted:
 *                         type: boolean
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
 *     summary: Get a package by ID with location history
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
 *         description: Package details with location history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 package:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     pickupLocation:
 *                       $ref: '#/components/schemas/Location'
 *                     deliveryLocation:
 *                       $ref: '#/components/schemas/Location'
 *                     delivery:
 *                       type: object
 *                       properties:
 *                         deliveryPerson:
 *                           $ref: '#/components/schemas/User'
 *                         vehicle:
 *                           $ref: '#/components/schemas/Vehicle'
 *                     labels:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Label'
 *                     locationHistory:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Location'
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
 *     summary: Get package location and delivery history
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
 *         description: Package history retrieved successfully
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                       status:
 *                         type: string
 *                         enum: [PENDING, ASSIGNED, IN_PROGRESS, COMPLETED, FAILED, CANCELLED, NOTE]
 *                       location:
 *                         $ref: '#/components/schemas/Location'
 *                       actor:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           type:
 *                             type: string
 *                             enum: [CUSTOMER, DELIVERY_PERSON, ADMIN, SYSTEM]
 *                       note:
 *                         type: string
 *       404:
 *         description: Package not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
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
 *     summary: Get nearby delivery persons for a package
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
 *           type: integer
 *         description: Search radius in meters (default: 5000)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of delivery persons to return (default: 10)
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       phoneNumber:
 *                         type: string
 *                       averageRating:
 *                         type: number
 *                       vehicle:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           type:
 *                             type: string
 *                           licensePlate:
 *                             type: string
 *                           maxWeight:
 *                             type: number
 *                           currentLatitude:
 *                             type: number
 *                           currentLongitude:
 *                             type: number
 *       404:
 *         description: Package not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
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
 *         description: Estimated delivery time retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 estimatedTime:
 *                   type: object
 *                   properties:
 *                     duration:
 *                       type: number
 *                       description: Estimated duration in seconds
 *                     distance:
 *                       type: number
 *                       description: Distance in meters
 *                     traffic:
 *                       type: string
 *                       enum: [LOW, MEDIUM, HIGH]
 *                     eta:
 *                       type: string
 *                       format: date-time
 *                       description: Estimated time of arrival
 *       404:
 *         description: Package not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/:id/estimated-time', getEstimatedDeliveryTime);

/**
 * @swagger
 * /api/packages:
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
 *               - pickupLocation
 *               - deliveryLocation
 *               - weight
 *               - dimensions
 *             properties:
 *               customerId:
 *                 type: string
 *                 description: ID of the customer creating the package
 *               pickupLocation:
 *                 $ref: '#/components/schemas/Location'
 *               deliveryLocation:
 *                 $ref: '#/components/schemas/Location'
 *               weight:
 *                 type: number
 *                 description: Weight of the package in kilograms
 *               dimensions:
 *                 type: object
 *                 properties:
 *                   length:
 *                     type: number
 *                   width:
 *                     type: number
 *                   height:
 *                     type: number
 *               description:
 *                 type: string
 *                 description: Optional description of the package
 *               specialInstructions:
 *                 type: string
 *                 description: Special handling instructions
 *               labels:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Label'
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     pickupLocation:
 *                       $ref: '#/components/schemas/Location'
 *                     deliveryLocation:
 *                       $ref: '#/components/schemas/Location'
 *                     weight:
 *                       type: number
 *                     dimensions:
 *                       type: object
 *                       properties:
 *                         length:
 *                           type: number
 *                         width:
 *                           type: number
 *                         height:
 *                           type: number
 *                     description:
 *                       type: string
 *                     specialInstructions:
 *                       type: string
 *                     labels:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Label'
 *                     status:
 *                       type: string
 *                       enum: [PENDING, ASSIGNED, IN_PROGRESS, COMPLETED, FAILED, CANCELLED]
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', createPackage);

/**
 * @swagger
 * /api/packages/{id}/notes:
 *   post:
 *     summary: Add a delivery note
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
 *                 description: The note text
 *               location:
 *                 $ref: '#/components/schemas/Location'
 *                 description: Optional location where the note was added
 *     responses:
 *       200:
 *         description: Note added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 note:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     note:
 *                       type: string
 *                     location:
 *                       $ref: '#/components/schemas/Location'
 *                     actor:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         type:
 *                           type: string
 *                           enum: [CUSTOMER, DELIVERY_PERSON, ADMIN]
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Package not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/:id/notes', addDeliveryNote);

/**
 * @swagger
 * /api/packages/{id}/rate:
 *   post:
 *     summary: Rate a delivery
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
 *                 description: Rating from 1 to 5
 *               comment:
 *                 type: string
 *                 description: Optional comment about the delivery
 *     responses:
 *       200:
 *         description: Delivery rated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Delivery rated successfully
 *                 rating:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     rating:
 *                       type: number
 *                     comment:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Package not found
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid rating value
 *       500:
 *         description: Server error
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
 *     summary: Cancel a package delivery
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
 *                 description: Reason for cancellation
 *               type:
 *                 type: string
 *                 enum: [CUSTOMER, DELIVERY_PERSON, ADMIN]
 *                 description: Who is requesting the cancellation
 *     responses:
 *       200:
 *         description: Package cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Package cancelled successfully
 *                 cancellation:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     packageId:
 *                       type: string
 *                     reason:
 *                       type: string
 *                     type:
 *                       type: string
 *                       enum: [CUSTOMER, DELIVERY_PERSON, ADMIN]
 *                     penalty:
 *                       type: number
 *                       description: Cancellation penalty amount
 *                     refund:
 *                       type: number
 *                       description: Refund amount
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Package not found
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid cancellation request
 *       500:
 *         description: Server error
 */
router.post('/:id/cancel', cancelPackage);

/**
 * @swagger
 * /api/packages/{id}/location:
 *   put:
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
 *             type: object
 *             required:
 *               - location
 *             properties:
 *               location:
 *                 $ref: '#/components/schemas/Location'
 *               status:
 *                 type: string
 *                 enum: [PENDING, ASSIGNED, IN_PROGRESS, COMPLETED, FAILED, CANCELLED]
 *     responses:
 *       200:
 *         description: Package location updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Package location updated successfully
 *       404:
 *         description: Package not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put('/:id/location', updatePackageLocation);

/**
 * @swagger
 * /api/packages/{id}:
 *   put:
 *     summary: Update a package
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
 *             properties:
 *               pickupLocation:
 *                 $ref: '#/components/schemas/Location'
 *               deliveryLocation:
 *                 $ref: '#/components/schemas/Location'
 *               weight:
 *                 type: number
 *                 description: Weight of the package in kilograms
 *               dimensions:
 *                 type: object
 *                 properties:
 *                   length:
 *                     type: number
 *                   width:
 *                     type: number
 *                   height:
 *                     type: number
 *               description:
 *                 type: string
 *               specialInstructions:
 *                 type: string
 *               labels:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Label'
 *     responses:
 *       200:
 *         description: Package updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 package:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     pickupLocation:
 *                       $ref: '#/components/schemas/Location'
 *                     deliveryLocation:
 *                       $ref: '#/components/schemas/Location'
 *                     weight:
 *                       type: number
 *                     dimensions:
 *                       type: object
 *                       properties:
 *                         length:
 *                           type: number
 *                         width:
 *                           type: number
 *                         height:
 *                           type: number
 *                     description:
 *                       type: string
 *                     specialInstructions:
 *                       type: string
 *                     labels:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Label'
 *                     status:
 *                       type: string
 *                       enum: [PENDING, ASSIGNED, IN_PROGRESS, COMPLETED, FAILED, CANCELLED]
 *       404:
 *         description: Package not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Package deleted successfully
 *       404:
 *         description: Package not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete('/:id', deletePackage);

/**
 * @swagger
 * /api/packages/{id}/restore:
 *   post:
 *     summary: Restore a soft-deleted package
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 package:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     pickupLocation:
 *                       $ref: '#/components/schemas/Location'
 *                     deliveryLocation:
 *                       $ref: '#/components/schemas/Location'
 *                     weight:
 *                       type: number
 *                     dimensions:
 *                       type: object
 *                       properties:
 *                         length:
 *                           type: number
 *                         width:
 *                           type: number
 *                         height:
 *                           type: number
 *                     description:
 *                       type: string
 *                     specialInstructions:
 *                       type: string
 *                     labels:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Label'
 *                     status:
 *                       type: string
 *                       enum: [PENDING, ASSIGNED, IN_PROGRESS, COMPLETED, FAILED, CANCELLED]
 *                     deleted:
 *                       type: boolean
 *       404:
 *         description: Package not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
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

/**
 * @swagger
 * /api/packages/{id}/validate-delivery-person:
 *   post:
 *     summary: Validate if a delivery person can handle the package
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
 *                 description: ID of the delivery person to validate
 *     responses:
 *       200:
 *         description: Delivery person validation result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 valid:
 *                   type: boolean
 *                   description: Whether the delivery person can handle the package
 *                 reasons:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of reasons if validation failed
 *                 details:
 *                   type: object
 *                   properties:
 *                     distance:
 *                       type: number
 *                       description: Distance to package in meters
 *                     eta:
 *                       type: number
 *                       description: Estimated time of arrival in seconds
 *                     vehicleCapacity:
 *                       type: number
 *                       description: Vehicle's maximum weight capacity
 *                     packageWeight:
 *                       type: number
 *                       description: Package weight
 *       404:
 *         description: Package or delivery person not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/:id/validate-delivery-person', validateDeliveryPerson);

export default router;
