// models/BannerModel.js
import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  imagePath: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Banner", bannerSchema);
