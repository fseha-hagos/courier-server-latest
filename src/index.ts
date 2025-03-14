import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from 'http';
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import swaggerUi from 'swagger-ui-express';
import { auth } from "@utils/auth";
import { initializeWebSocket } from "@utils/websocket";
import { config } from "@utils/config";
import { swaggerSpec, swaggerUiOptions } from "@utils/swagger";
import packagesRouter from "@routes/packages";
import usersRouter from "@routes/users"; // User routes
import deliveriesRouter from "@routes/deliveries"; // Deliveries routes
import deliveryPersonsRouter from "@routes/delivery-persons"; // Delivery Persons routes
import adminRouter from "@routes/admin";
import customersRouter from "@routes/customers";

const app = express();
const server = createServer(app);

// Initialize WebSocket
initializeWebSocket(server);

// =========================================
// Middleware Configuration
// =========================================

// CORS Configuration
const corsOptions = {
  origin: function (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) {
    // Allow all origins in development
    if (config.nodeEnv === 'development') {
      callback(null, true);
      return;
    }
    
    // In production, check against allowed origins
    if (!origin) {
      callback(null, true);
      return;
    }

    // Allow both http and https versions of localhost:5173
    const allowedOrigins = [
      'http://localhost:5173',
      'https://localhost:5173'
    ];
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
};
app.use(cors(corsOptions));

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));
app.get('/api-docs.json', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Better-Auth routes (must come before parsers)
app.all("/api/auth/*", toNodeHandler(auth));

// Basic middleware
app.use(express.json());
app.use(cookieParser());

// =========================================
// API Routes Configuration
// =========================================

// User Management Routes
app.use("/api/users", usersRouter);
app.use("/api/admin", adminRouter);
app.use("/api/customers", customersRouter);
app.use("/api/delivery-persons", deliveryPersonsRouter);

// Business Logic Routes
app.use("/api/packages", packagesRouter);
app.use("/api/deliveries", deliveriesRouter);

// =========================================
// Authentication Routes
// =========================================

// Get current user session
app.get("/me", async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    res.json(session);
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ success: false, message: "Failed to fetch session" });
  }
});

// Set user password and update profile
app.post("/api/set-password", async (req: Request, res: Response): Promise<void> => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    
    if (!session) {
      res.status(401).json({ success: false, message: "Unauthorized: No session found" });
      return;
    }

    const { newPassword, newName } = req.body;
    
    if (!newPassword) {
      res.status(400).json({ success: false, message: "New password is required" });
      return;
    }

    await Promise.all([
      auth.api.setPassword({
        body: { newPassword },
        headers: fromNodeHeaders(req.headers),
      }),
      auth.api.updateUser({
        body: { name: newName },
        headers: fromNodeHeaders(req.headers),
      }),
    ]);

    res.status(200).json({
      success: true,
      message: "Password and profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ success: false, message: "Failed to update user profile" });
  }
});

// =========================================
// Development Routes
// =========================================

// List all available routes (development only)
if (process.env.NODE_ENV !== 'production') {
  app.get('/api/routes', (req: Request, res: Response) => {
    const routes: Array<{ method: string; path: string }> = [];
    
    app._router.stack.forEach((middleware: any) => {
      if (middleware.route) {
        routes.push({
          method: Object.keys(middleware.route.methods)[0].toUpperCase(),
          path: middleware.route.path,
        });
      }
    });
    
    res.json(routes);
  });
}

// =========================================
// Error Handling
// =========================================

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Global error:', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =========================================
// Server Startup
// =========================================

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`
🚀 Server is running on port ${PORT}
📱 Frontend URL: ${config.frontendUrl || "http://localhost:5173"}
🔒 Environment: ${process.env.NODE_ENV || "development"}
  `);
});
