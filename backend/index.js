import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./src/routes/auth.route.js";
import userRoutes from "./src/routes/user.route.js";
import chatRoutes from "./src/routes/chat.route.js";
import chatbotRoutes from "./src/routes/chatbot.route.js"; 
import paymentRoutes from "./src/routes/payment.route.js";
import groupRoutes from "./src/routes/group.route.js";

import { connectDB } from "./src/lib/db.js";

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// 1️⃣ CORS MUST BE FIRST
app.use(
  cors({
    origin: [
      "https://chat-two-eta-68.vercel.app", // production
      "http://localhost:5173",              // local dev
    ],
    credentials: true,
  })
);

// 2️⃣ Required for Render cookies
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// 3️⃣ JSON + Cookies
app.use(express.json());
app.use(cookieParser());

// 4️⃣ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api", chatbotRoutes);
app.use("/api/groups", groupRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
