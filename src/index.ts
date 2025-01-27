import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
// import path from "path";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "@utils/auth";
import packageRoutes from "./routes/packages";
import usersRouter from "@routes/users"; // User routes
import deliveryRoutes from "./routes/deliveries"; // Deliveries routes

dotenv.config();

const app = express();

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies and authorization headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  })
);

// Better-Auth routes (must come first)
app.all("/api/auth/*", toNodeHandler(auth));

// Core middlewares
app.use(express.json()); // Parse JSON requests
app.use(cookieParser()); // Parse cookies

// Route handlers
app.use("/packages", packageRoutes); // Package routes
app.use("/users", usersRouter); // Users API
app.use("/deliveries", deliveryRoutes); // Deliveries API

// API endpoints
app.get("/me", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    res.json(session);
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ message: "Failed to fetch session" });
  }
});

app.post("/api/set-password", async (req: Request, res: Response): Promise<void> => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      res.status(401).json({ message: "Unauthorized: No session found" });
      return;
    }

    const { newPassword, newName } = req.body;
    if (!newPassword) {
      res.status(400).json({ message: "New password is required" });
      return;
    }

    await auth.api.setPassword({
      body: { newPassword },
      headers: fromNodeHeaders(req.headers),
    });

    await auth.api.updateUser({
      body: { name: newName },
      headers: fromNodeHeaders(req.headers),
    });

    res.status(200).json({
      success: true,
      message: "Password set successfully",
    });
  } catch (error) {
    console.error("Error setting password:", error);
    res.status(500).json({ message: "Failed to set password" });
  }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
