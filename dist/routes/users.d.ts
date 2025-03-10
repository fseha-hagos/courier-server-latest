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
//# sourceMappingURL=users.d.ts.map