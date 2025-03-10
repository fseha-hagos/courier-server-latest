import { Router } from "express";
import {
  getDeliveries,
  getDeliveryById,
  updateDeliveryStatus,
  assignDelivery,
} from "../controllers/deliveries.controller";

const router = Router();

/**
 * @swagger
 * /api/deliveries:
 *   get:
 *     summary: Get all deliveries
 *     tags: [Deliveries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *           enum: [ASSIGNED, IN_PROGRESS, COMPLETED, FAILED, CANCELLED]
 *         description: Filter by delivery status
 *     responses:
 *       200:
 *         description: List of deliveries
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
 */
router.get("/", getDeliveries);

/**
 * @swagger
 * /api/deliveries/{id}:
 *   get:
 *     summary: Get a delivery by ID
 *     tags: [Deliveries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery ID
 *     responses:
 *       200:
 *         description: Delivery details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 delivery:
 *                   $ref: '#/components/schemas/Delivery'
 *       404:
 *         description: Delivery not found
 */
router.get("/:id", getDeliveryById);

/**
 * @swagger
 * /api/deliveries/{id}/status:
 *   put:
 *     summary: Update delivery status
 *     tags: [Deliveries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery ID
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
 *                 enum: [ASSIGNED, IN_PROGRESS, COMPLETED, FAILED, CANCELLED]
 *               note:
 *                 type: string
 *               location:
 *                 $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       404:
 *         description: Delivery not found
 *       400:
 *         description: Invalid status transition
 */
router.put("/:id/status", updateDeliveryStatus);

/**
 * @swagger
 * /api/deliveries/assign:
 *   post:
 *     summary: Assign a delivery
 *     tags: [Deliveries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - packageId
 *               - deliveryPersonId
 *             properties:
 *               packageId:
 *                 type: string
 *               deliveryPersonId:
 *                 type: string
 *               vehicleId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Delivery assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 delivery:
 *                   $ref: '#/components/schemas/Delivery'
 *       400:
 *         description: Invalid assignment request
 *       404:
 *         description: Package or delivery person not found
 */
router.post("/assign", assignDelivery);

export default router;
