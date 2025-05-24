import multer from "multer";
import path from "path";

// // Set storage location and filename
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/resumes"); // Create this folder
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext);
//   },
// });

// // Filter for PDF/DOC files
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "application/pdf" ||
//     file.mimetype ===
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only PDF or DOCX files are allowed"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// export default upload;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const bannerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/banners"); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, "banner" + path.extname(file.originalname));
  },
});

// ✅ FIXED THIS LINE:
const uploadbanner = multer({ storage: bannerStorage });

const upload = multer({ storage });
export { upload, uploadbanner };
