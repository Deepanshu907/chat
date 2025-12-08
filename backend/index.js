import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./src/routes/auth.route.js";
import userRoutes from "./src/routes/user.route.js";
import chatRoutes from "./src/routes/chat.route.js";
import chatbotRoutes from "./src/routes/chatbot.route.js"; 
import paymentRoutes from "./src/routes/payment.route.js"; // Add this import
import groupRoutes from "./src/routes/group.route.js";

import { connectDB } from "./src/lib/db.js";

const app = express();
const PORT = process.env.PORT || 5001; // Change to 5001 to match frontend

const __dirname = path.resolve();



// const allowedOrigins = [
//   "http://localhost:5173",                     // Vite dev
//   "http://localhost:3000",                     // CRA (if ever)
//   "http://chat-two-eta-68.vercel.app",
//   "https://chat-4w0uqhw6r-deepanshu-kumar-jindals-projects.vercel.app"  // deployed frontend
// ];

// app.use(
//   cors({
//     origin: "https://chat-backend-h4jy.onrender.com/",
//     credentials: true, // allow frontend to send cookies
//   })
// );

app.use(
  cors({
    origin: [
      "https://chat-two-eta-68.vercel.app",      // your current frontend
      "http://localhost:5173",                   // local dev
    ],
    credentials: true,
  })
);


// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // allow requests with no origin (like mobile apps, curl)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }
//       return callback(new Error("Not allowed by CORS"));
//     },
//     credentials: true,
//   })
// );


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/payment", paymentRoutes); // Add this line
app.use("/api", chatbotRoutes);
app.use("/api/groups", groupRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
