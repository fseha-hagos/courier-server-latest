import { Router } from 'express';
import {
  getAllDeliveryPersons,
  getDeliveryPersonById,
  updateStatus,
  updateLocation,
  getCurrentDeliveries,
  getDeliveryHistory,
  initiatePhoneVerification,
  setDeliveryPersonPassword,
  verifyOTP,
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
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
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
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Status updated successfully
 *       404:
 *         description: Delivery person not found
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid status value
 *       500:
 *         description: Server error
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
 *             type: object
 *             required:
 *               - latitude
 *               - longitude
 *             properties:
 *               latitude:
 *                 type: number
 *                 description: Latitude coordinate
 *               longitude:
 *                 type: number
 *                 description: Longitude coordinate
 *               placeId:
 *                 type: string
 *                 description: Google Places ID
 *               address:
 *                 type: string
 *                 description: Human-readable address
 *     responses:
 *       200:
 *         description: Location updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Location updated successfully
 *       404:
 *         description: Delivery person not found
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid location data
 *       500:
 *         description: Server error
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
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
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
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/:id/delivery-history', getDeliveryHistory);

/**
 * @swagger
 * /api/delivery-persons/verify-phone:
 *   post:
 *     summary: Initiate phone verification for courier
 *     tags: [Delivery Persons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: Courier's phone number
 *     responses:
 *       200:
 *         description: Verification code sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Verification code sent successfully
 *       400:
 *         description: Invalid phone number or user not found
 *       500:
 *         description: Server error
 */
router.post('/verify-phone', initiatePhoneVerification);

/**
 * @swagger
 * /api/delivery-persons/set-password:
 *   post:
 *     summary: Set password for delivery person after phone verification
 *     tags: [Delivery Persons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: New password to set
 *     responses:
 *       200:
 *         description: Password set successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Password set successfully
 *       401:
 *         description: Unauthorized or no valid session
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */
router.post('/set-password', setDeliveryPersonPassword);

/**
 * @swagger
 * /api/delivery-persons/verify-otp:
 *   post:
 *     summary: Verify OTP for courier phone verification
 *     tags: [Delivery Persons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - code
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: Courier's phone number
 *               code:
 *                 type: string
 *                 description: OTP code received via SMS
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Phone number verified successfully
 *       400:
 *         description: Invalid phone number, code, or user not found
 *       500:
 *         description: Server error
 */
router.post('/verify-otp', verifyOTP);

/**
 * @swagger
 * components:
 *   schemas:
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
 *         completedDeliveries:
 *           type: integer
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
 * 
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