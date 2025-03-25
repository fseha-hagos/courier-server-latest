declare const router: import("express-serve-static-core").Router;
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
//# sourceMappingURL=users.d.ts.map