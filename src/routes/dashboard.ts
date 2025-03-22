import { Router } from 'express';
import { getDashboardStats, getDeliveryStatusBreakdown } from '../controllers/dashboard.controller';

const router = Router();

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 stats:
 *                   type: object
 *                   properties:
 *                     totalActiveDeliveries:
 *                       type: number
 *                     totalPackagesToday:
 *                       type: number
 *                     activeDeliveryPersons:
 *                       type: number
 *                     successRate:
 *                       type: number
 *                     recentDeliveries:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           customerName:
 *                             type: string
 *                           customerPhone:
 *                             type: string
 *                           deliveryStatus:
 *                             type: string
 *                           updatedAt:
 *                             type: string
 *                     topDeliveryPersons:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/DeliveryPerson'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/stats', getDashboardStats);

/**
 * @swagger
 * /api/dashboard/delivery-status:
 *   get:
 *     summary: Get delivery status breakdown
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: timeRange
 *         schema:
 *           type: string
 *           enum: [today, week, month]
 *         description: Time range for the breakdown
 *     responses:
 *       200:
 *         description: Delivery status breakdown
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 breakdown:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       status:
 *                         type: string
 *                       count:
 *                         type: number
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/delivery-status', getDeliveryStatusBreakdown);

export default router; 