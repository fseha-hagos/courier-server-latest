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

/**
 * @swagger
 * /api/delivery-persons:
 *   get:
 *     summary: Get all delivery persons
 *     tags: [Delivery Persons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [ONLINE, OFFLINE]
 *         description: Filter by delivery person status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of delivery persons
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
router.get('/', getAllDeliveryPersons);

/**
 * @swagger
 * /api/delivery-persons/{id}:
 *   get:
 *     summary: Get a specific delivery person
 *     tags: [Delivery Persons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery person ID
 *     responses:
 *       200:
 *         description: Delivery person details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 deliveryPerson:
 *                   $ref: '#/components/schemas/DeliveryPerson'
 *       404:
 *         description: Delivery person not found
 */
router.get('/:id', getDeliveryPersonById);

/**
 * @swagger
 * /api/delivery-persons/{id}/status:
 *   put:
 *     summary: Update delivery person's online/offline status
 *     tags: [Delivery Persons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery person ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [ONLINE, OFFLINE]
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       404:
 *         description: Delivery person not found
 */
router.put('/:id/status', updateStatus);

/**
 * @swagger
 * /api/delivery-persons/{id}/location:
 *   put:
 *     summary: Update delivery person's current location
 *     tags: [Delivery Persons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery person ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Location updated successfully
 *       404:
 *         description: Delivery person not found
 */
router.put('/:id/location', updateLocation);

/**
 * @swagger
 * /api/delivery-persons/{id}/current-deliveries:
 *   get:
 *     summary: Get delivery person's current active deliveries
 *     tags: [Delivery Persons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery person ID
 *     responses:
 *       200:
 *         description: List of current deliveries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 deliveries:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Delivery'
 *       404:
 *         description: Delivery person not found
 */
router.get('/:id/current-deliveries', getCurrentDeliveries);

/**
 * @swagger
 * /api/delivery-persons/{id}/delivery-history:
 *   get:
 *     summary: Get delivery person's delivery history
 *     tags: [Delivery Persons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery person ID
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [COMPLETED, FAILED, CANCELLED]
 *         description: Filter by delivery status
 *     responses:
 *       200:
 *         description: Delivery history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 deliveries:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Delivery'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *       404:
 *         description: Delivery person not found
 */
router.get('/:id/delivery-history', getDeliveryHistory);

/**
 * @swagger
 * components:
 *   schemas:
 *     Delivery:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         packageId:
 *           type: string
 *         deliveryPersonId:
 *           type: string
 *         vehicleId:
 *           type: string
 *         status:
 *           type: string
 *           enum: [ASSIGNED, IN_PROGRESS, COMPLETED, FAILED, CANCELLED]
 *         pickupTime:
 *           type: string
 *           format: date-time
 *         deliveryTime:
 *           type: string
 *           format: date-time
 *         estimatedDeliveryTime:
 *           type: string
 *           format: date-time
 *         package:
 *           $ref: '#/components/schemas/Package'
 *         notes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               note:
 *                 type: string
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 $ref: '#/components/schemas/Location'
 */

export default router; 