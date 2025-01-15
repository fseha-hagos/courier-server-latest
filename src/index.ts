import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
// import userRoutes from "./routes/user.route.js";
// import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "@utils/auth";
import cors from "cors";

dotenv.config();

const __dirname = path.resolve();

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true, // Allow cookies and authorization headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
}))
app.all("/api/auth/*", toNodeHandler(auth)); //Better-Auth Routes

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

// app.use("/api/user", userRoutes);
// app.use("/api/auth", authRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  console.log("Hello");
  res.json(session);
});

app.post("/api/set-password", async (req, res): Promise<any> => {
  console.log("Setting password");
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session) {
    console.error("No valid session found");
    return res.status(401).json({ message: "Unauthorized: No session found" });
  }
  console.log("SET-PASSWORD: Session:", session);

  try {
    const { newPassword } = req.body;
    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    await auth.api.setPassword({ body: { newPassword } });

    console.log("Password successfully set");
    return res.status(200).json({ message: "Password set successfully" });
  } catch (error) {
    console.error("Error setting password:", error);
    return res.status(500).json({ message: "Failed to set password" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});





