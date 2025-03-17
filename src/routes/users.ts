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
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
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
 *                       description: Total number of users
 *                     activeUsers:
 *                       type: integer
 *                       description: Number of active (non-banned) users
 *                     bannedUsers:
 *                       type: integer
 *                       description: Number of banned users
 *                     roleDistribution:
 *                       type: object
 *                       properties:
 *                         customers:
 *                           type: integer
 *                           description: Number of customers
 *                         deliveryPersons:
 *                           type: integer
 *                           description: Number of delivery persons
 *                         admins:
 *                           type: integer
 *                           description: Number of administrators
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
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
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
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
 *           description: Unique user ID
 *         name:
 *           type: string
 *           description: User's full name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         emailVerified:
 *           type: boolean
 *           description: Whether the email is verified
 *         phoneNumber:
 *           type: string
 *           description: User's phone number
 *         phoneNumberVerified:
 *           type: boolean
 *           description: Whether the phone number is verified
 *         role:
 *           type: string
 *           enum: [CUSTOMER, DELIVERY_PERSON, ADMIN]
 *           description: User's role in the system
 *         status:
 *           type: string
 *           enum: [ONLINE, OFFLINE]
 *           description: User's current online status
 *         banned:
 *           type: boolean
 *           description: Whether the user is banned
 *         banReason:
 *           type: string
 *           description: Reason for the ban (if banned)
 *         banExpires:
 *           type: string
 *           format: date-time
 *           description: When the ban expires (if temporary)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the user account was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the user account was last updated
 */

export default router;
