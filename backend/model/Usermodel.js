import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  otp: String,
  otpExpires: Date,
  isVerified: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ["student", "user", "admin", "superadmin"],
    default: "student",
  },

  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

export default mongoose.model("User", userSchema);
