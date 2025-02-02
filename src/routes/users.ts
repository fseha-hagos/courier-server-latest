import { Router } from "express";
import {
  searchUsers,
  getUserStats,
  getBannedUsers,
} from "@controllers/users.controller";

const router = Router();

// Search users across all roles with optional role filter
router.get("/search", searchUsers);

// Get user statistics for dashboard
router.get("/stats", getUserStats);

// Get all banned users across roles
router.get("/banned", getBannedUsers);

export default router;
