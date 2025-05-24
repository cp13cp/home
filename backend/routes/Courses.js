import express from "express";
import Course from "../model/Courses.js";
import authMiddleware from "../middleware/auth.js";
import User from "../model/Usermodel.js";
import PurchasedCourse from "../model/purchasedmodel.js";
import isAdmin from "../model/isadmin.js";
import Order from "../model/Order.js";
const router = express.Router();

// Get all courses
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Add course (admin only)
router.post("/addcourse", async (req, res) => {
  const { title, description, price, thumbnail, videoUrl } = req.body;
  const course = new Course({ title, description, price, thumbnail, videoUrl });
  await course.save();
  res.json(course);
});

// purchased courses

// router.get("/purchased", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).populate("purchasedCourses");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     if (user.purchasedCourses.length === 0)
//       return res.status(404).json({ message: "No purchased courses found" });
//     // not purchase same course
//     // const alreadyPurchased = user.purchasedCourses.includes(Course._id);
//     // if (alreadyPurchased) {
//     //   return res.status(400).json({
//     //     success: false,
//     //     message: "You already purchased this course.",
//     //   });
//     // }

//     res.json({ success: true, courses: user.purchasedCourses });
//   } catch (error) {
//     console.error("Error fetching purchased courses:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// router.post("/purchased", authMiddleware, async (req, res) => {
//   const { courseId } = req.body;

//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // ✅ Check if course is already purchased
//     const alreadyPurchased = user.purchasedCourses.includes(courseId);
//     if (alreadyPurchased) {
//       return res.status(400).json({
//         success: false,
//         message: "You already purchased this course.",
//       });
//     }

//     // ✅ Add course to user's purchased list
//     user.purchasedCourses.push(courseId);
//     await user.save();

//     res.json({ success: true, message: "Course purchased successfully." });
//   } catch (error) {
//     console.error("Error in purchase:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// Update course (admin only)
import checkRole from "../middleware/checkRoles.js";

router.put("/update/:id", authMiddleware, checkRole, async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedData = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updatedData,
      { new: true }
    );
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Error updating course." });
  }
});

// Example route in backend
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
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

// GET /api/orders/purchased
// // router.get("/purchased", async (req, res) => {
//   try {
//     // const userRole = req.user.role; // assuming role is in JWT token or user object

//     // if (userRole !== "admin" && userRole !== "superadmin") {
//     //   return res.status(403).json({ success: false, message: "Access denied" });
//     // }

//     const orders = await Order.find().populate("user").populate("course");

//     const result = orders.map((order) => ({
//       course: order.course,
//       user: order.user,
//     }));

//     res.json({ success: true, courses: result });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// // });
router.get("/purchased", async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("course");

    if (!orders) {
      console.log("No orders found");
      return res.json({ success: true, courses: [] });
    }

    console.log("Orders fetched:", orders);

    const result = orders.map((order) => ({
      user: order.user,
      course: order.course,
      purchasedAt: order.purchasedAt,
    }));

    res.json({ success: true, courses: result });
  } catch (error) {
    console.log("Error in /purchased route:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
