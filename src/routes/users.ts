import { Router } from "express";
import {
  searchUsers,
  getUserStats,
  getBannedUsers,
} from "@controllers/users.controller";

const router = Router();

/**
 * @swagger
 * /api/users/search:
 *   get:
 *     summary: Search users across all roles
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search query (name, email, phone)
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [CUSTOMER, DELIVERY_PERSON, ADMIN]
 *         description: Filter by user role
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
 *         description: List of users matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
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
router.get("/search", searchUsers);

/**
 * @swagger
 * /api/users/stats:
 *   get:
 *     summary: Get user statistics for dashboard
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User statistics
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
 *                     totalUsers:
 *                       type: integer
 *                     activeUsers:
 *                       type: integer
 *                     bannedUsers:
 *                       type: integer
 *                     roleDistribution:
 *                       type: object
 *                       properties:
 *                         customers:
 *                           type: integer
 *                         deliveryPersons:
 *                           type: integer
 *                         admins:
 *                           type: integer
 */
router.get("/stats", getUserStats);

/**
 * @swagger
 * /api/users/banned:
 *   get:
 *     summary: Get all banned users across roles
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [CUSTOMER, DELIVERY_PERSON, ADMIN]
 *         description: Filter by user role
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
 *         description: List of banned users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
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
router.get("/banned", getBannedUsers);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         emailVerified:
 *           type: boolean
 *         phoneNumber:
 *           type: string
 *         phoneNumberVerified:
 *           type: boolean
 *         role:
 *           type: string
 *           enum: [CUSTOMER, DELIVERY_PERSON, ADMIN]
 *         status:
 *           type: string
 *           enum: [ONLINE, OFFLINE]
 *         banned:
 *           type: boolean
 *         banReason:
 *           type: string
 *         banExpires:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export default router;
