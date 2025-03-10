declare const router: import("express-serve-static-core").Router;
/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - latitude
 *         - longitude
 *       properties:
 *         placeId:
 *           type: string
 *         address:
 *           type: string
 *         latitude:
 *           type: number
 *         longitude:
 *           type: number
 *
 *     PackageHistory:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         timestamp:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *         location:
 *           $ref: '#/components/schemas/Location'
 *         note:
 *           type: string
 *         actor:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             type:
 *               type: string
 *               enum: [CUSTOMER, DELIVERY_PERSON, ADMIN]
 *
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
 */
export default router;
//# sourceMappingURL=packages.d.ts.map