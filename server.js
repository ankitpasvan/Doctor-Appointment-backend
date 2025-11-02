import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import connectDB from "./config/db.js";
connectDB();

dotenv.config();
const app = express();

// middlewares to parse JSON requests
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctors", doctorRoutes);

// server running
const PORT = 5000;
app.get("/", (req, res) => {
  res.send("server is running");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
