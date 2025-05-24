import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  videoUrl: String,
});

export default mongoose.model("Course", courseSchema);
