import express from "express";
import multer from "multer";
import path from "path";
import Resume from "../model/resume.js";
import authMiddleware from "../middleware/auth.js";
import fs from "fs";
const router = express.Router();
import { upload } from "../middleware/upload.js";
// Multer config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/resumes/");
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });
// const upload = multer({ storage });

// Upload route
router.post(
  "/upload-resume",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      const filePath = `/uploads/resumes/${req.file.filename}`;

      // Check if already uploaded
      const existing = await Resume.findOne({ user: req.user.id });
      if (existing) {
        existing.filePath = filePath;
        existing.uploadedAt = new Date();
        await existing.save();
        return res.json({
          message: "Resume updated successfully",
          resume: existing,
        });
      }

      // Save new
      const resume = await Resume.create({
        user: req.user.id,
        filePath,
      });

      res.json({ message: "Resume uploaded successfully", resume });
    } catch (err) {
      console.error("Upload Error:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.get("/my-resume", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id });
    if (!resume) return res.status(404).json({ message: "No resume found" });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/delete", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id });
    if (!resume)
      return res.status(404).json({ message: "No resume to delete" });

    const localPath = `.${resume.filePath}`;
    if (fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
    }

    await Resume.deleteOne({ _id: resume._id });
    res.json({ message: "Resume deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
