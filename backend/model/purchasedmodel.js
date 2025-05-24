// models/PurchasedCourse.js
import mongoose from "mongoose";

const PurchasedCourseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  purchasedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("PurchasedCourse", PurchasedCourseSchema);
