import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/Courses.js";
import orderRoutes from "./routes/Order.js";
import resumeroutes from "./routes/resume.js";
import banner from "./routes/banner.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(
    "mongodb+srv://singhchandrapal13:Singh1234@cluster0.bknnepj.mongodb.net/lms?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/resume", resumeroutes);

app.use("/api/banner", banner);

app.use("/uploads", express.static("uploads"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
