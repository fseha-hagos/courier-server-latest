import { Router } from "express";
import {
  getDeliveries,
  getDeliveryById,
  updateDeliveryStatus,
  assignDelivery,
} from "../controllers/deliveries.controller";

const router = Router();

// Route to fetch all deliveries (with pagination)
router.get("/", getDeliveries);

// Route to fetch a single delivery by ID
router.get("/:id", getDeliveryById);

// Route to update the status of a delivery
router.put("/:id/status", updateDeliveryStatus);

// Route to assign a delivery
router.post("/assign", assignDelivery);

export default router;
