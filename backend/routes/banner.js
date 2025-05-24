// backend/routes/bannerRoutes.js

import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Storage config for banner
const bannerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/banners";
    fs.mkdirSync(dir, { recursive: true }); // create directory if it doesn't exist
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage: bannerStorage });

// Route to upload banner
router.post("/uploadbanner", upload.single("banner"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileUrl = `/uploads/banners/${req.file.filename}`;
    res.json({ message: "Banner uploaded successfully", fileUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/getbanners", (req, res) => {
  const dir = path.join("uploads/banners");
  fs.readdir(dir, (err, files) => {
    if (err)
      return res.status(500).json({ error: "Failed to read banner directory" });

    const fileUrls = files.map((file) => `/uploads/banners/${file}`);
    res.json(fileUrls);
  });
});

export default router;
