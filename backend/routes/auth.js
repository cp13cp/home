import express from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
import User from "../model/Usermodel.js";
import authMiddleware from "../middleware/auth.js";
import superAdminMiddleware from "../middleware/superadmin.js";
import adminMiddleware from "../middleware/adminmiddleware.js";
import sendEmail from "../middleware/email.js";
import Resume from "../model/resume.js";
// middleware/upload.js
import multer from "multer";
import path from "path";
import fs from "fs";
import Banner from "../model/Banner.js";
import { uploadbanner } from "../middleware/upload.js";
// Ensure uploads folder exists

// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const existing = await User.findOne({ email });
//     if (existing)
//       return res.status(400).json({ message: "User already exists" });

//     const hashed = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashed });
//     await user.save();

//     const token = jwt.sign({ id: user._id, role: user.role }, "cp123456");
//     res.json({ token, user: { id: user._id, name, email, role: user.role } });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ email });
    if (exist)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    await sendEmail(
      email,
      "CodersWay LMS - OTP Verification",
      `<p>Your OTP is <strong>${otp}</strong>. It is valid for 10 minutes.</p>`
    );

    res.json({ userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/verify-otp
router.post("/verify-otp", async (req, res) => {
  try {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
      return res.status(400).json({ message: "Missing userId or OTP" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Incorrect OTP" });
    }

    if (Date.now() > user.otpExpires) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.otp = null;
    user.otpExpires = null;
    user.isVerified = true;
    await user.save();

    const token = jwt.sign({ id: user._id }, "cp123456", {
      expiresIn: "7d",
    });

    res.json({ token, user });
  } catch (err) {
    console.error("OTP verification error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, "cp123456", {});
    res.json({
      token,
      user: { id: user._id, name: user.name, email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

//
// router.get(
//   "/allusers",
//   authMiddleware,
//   superAdminMiddleware,
//   async (req, res) => {
//     try {
//       const users = await User.find({}, "_id name email role createdAt");
//       res.json(users);
//       const resumes = await Resume.find();

//       const usersWithResumes = users.map((user) => {
//         const resume = resumes.find(
//           (r) => r.user.toString() === user._id.toString()
//         );
//         return {
//           ...user,
//           resume,
//         };
//       });

//       res.json(usersWithResumes);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//       res.status(500).json({ message: "Server error" });
//     }
//   }
// );
router.get("/allusers", async (req, res) => {
  try {
    const users = await User.find().lean();
    const resumes = await Resume.find().lean();

    const usersWithResumes = users.map((user) => {
      const userResume = resumes.find(
        (resume) => resume.user.toString() === user._id.toString()
      );
      return {
        ...user,
        resume: userResume || null,
      };
    });

    return res.json(usersWithResumes); // ✅ Only send response once and return
  } catch (error) {
    console.error("Failed to fetch users with resumes:", error);
    return res.status(500).json({ message: "Server error" }); // ✅ Return here too
  }
});

router.put(
  "/promote/:id",
  authMiddleware,
  superAdminMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      user.role = "admin";
      await user.save();

      res.json({ message: `${user.name} has been promoted to admin.` });
    } catch (error) {
      console.error("Promote error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// routes/auth.js or wherever you manage roles

// router.put("/demote/:id", async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { role: "student" },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ message: "User demoted to student", user: updatedUser });
//   } catch (error) {
//     res.status(500).json({ message: "Error demoting user", error });
//   }
// });

router.put("/demote/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const requesterId = req.user.id; // Comes from authMiddleware
    const requester = await User.findById(requesterId);

    // Only superadmin can demote
    if (requester.role !== "superadmin") {
      return res
        .status(403)
        .json({ message: "Only superadmin can demote users" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent demotion of superadmin
    if (user.role === "superadmin") {
      return res.status(403).json({ message: "Cannot demote a superadmin" });
    }

    // Only admin can be demoted to student
    if (user.role !== "admin") {
      return res
        .status(400)
        .json({ message: "Only admin can be demoted to student" });
    }

    user.role = "user";
    await user.save();

    res.json({ message: "User successfully demoted to student", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const courseId = req.params.id;
    const requesterId = req.user.id;

    const requester = await User.findById(requesterId);

    if (
      !requester ||
      (requester.role !== "admin" && requester.role !== "superadmin")
    ) {
      return res
        .status(403)
        .json({ message: "Only admin or superadmin can delete courses" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await Course.findByIdAndDelete(courseId);

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error });
  }
});

export default router;
