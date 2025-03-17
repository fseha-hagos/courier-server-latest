import { Router } from 'express';
import {
  getAdminWorkers,
  getAdminWorkerById,
  updateAdminWorker,
  toggleAdminBan,
  deleteAdminWorker,
  registerDeliveryPerson
} from '@controllers/admin.controller';

const router = Router();

/**
 * @swagger
 * /api/admin:
 *   get:
 *     summary: Get all admin workers
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of admin workers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 admins:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', getAdminWorkers);

/**
 * @swagger
 * /api/admin/{id}:
 *   get:
 *     summary: Get specific admin worker
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin ID
 *     responses:
 *       200:
 *         description: Admin worker details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 admin:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Admin not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/:id', getAdminWorkerById);

/**
 * @swagger
 * /api/admin/{id}:
 *   put:
 *     summary: Update admin worker
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Admin's full name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Admin's email address
 *               phoneNumber:
 *                 type: string
 *                 description: Admin's phone number
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 admin:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Admin not found
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */
router.put('/:id', updateAdminWorker);

/**
 * @swagger
 * /api/admin/{id}/ban:
 *   put:
 *     summary: Ban/Unban admin worker
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - banned
 *             properties:
 *               banned:
 *                 type: boolean
 *                 description: Whether to ban or unban the admin
 *               banReason:
 *                 type: string
 *                 description: Reason for banning the admin
 *               banExpires:
 *                 type: string
 *                 format: date-time
 *                 description: When the ban expires (optional)
 *     responses:
 *       200:
 *         description: Ban status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Admin ban status updated successfully
 *                 admin:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Admin not found
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */
router.put('/:id/ban', toggleAdminBan);

/**
 * @swagger
 * /api/admin/{id}:
 *   delete:
 *     summary: Delete admin worker
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin ID
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Admin deleted successfully
 *       404:
 *         description: Admin not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteAdminWorker);

/**
 * @swagger
 * /api/admin/delivery-persons:
 *   post:
 *     summary: Register new delivery person
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phoneNumber
 *               - vehicle
 *             properties:
 *               name:
 *                 type: string
 *                 description: Delivery person's full name
 *               phoneNumber:
 *                 type: string
 *                 description: Delivery person's phone number
 *               vehicle:
 *                 type: object
 *                 required:
 *                   - type
 *                   - licensePlate
 *                   - maxWeight
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [VAN, BIKE, MOTORCYCLE, CAR]
 *                     description: Type of vehicle
 *                   licensePlate:
 *                     type: string
 *                     description: Vehicle's license plate number
 *                   maxWeight:
 *                     type: number
 *                     description: Maximum weight capacity in kilograms
 *     responses:
 *       201:
 *         description: Delivery person registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Delivery person registered successfully
 *                 deliveryPerson:
 *                   $ref: '#/components/schemas/DeliveryPerson'
 *       400:
 *         description: Invalid registration data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/delivery-persons', registerDeliveryPerson);

export default router; 