declare const router: import("express-serve-static-core").Router;
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
//# sourceMappingURL=delivery-persons.d.ts.map