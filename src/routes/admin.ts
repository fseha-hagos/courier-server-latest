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
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
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
 *               banReason:
 *                 type: string
 *               banExpires:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Ban status updated successfully
 *       404:
 *         description: Admin not found
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
 *       404:
 *         description: Admin not found
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
 *               phoneNumber:
 *                 type: string
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
 *                   licensePlate:
 *                     type: string
 *                   maxWeight:
 *                     type: number
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
 *                 deliveryPerson:
 *                   $ref: '#/components/schemas/DeliveryPerson'
 *       400:
 *         description: Invalid registration data
 */
router.post('/delivery-persons', registerDeliveryPerson);

export default router; 