import express from "express";
import { getUsers } from "@controllers/users.controller";

const router = express.Router();

router.get("/", getUsers); // GET /api/users to fetch users

export default router;
