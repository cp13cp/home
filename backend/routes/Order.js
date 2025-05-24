import express from "express";
import Razorpay from "razorpay";
import Order from "../model/Order.js";
import Course from "../model/Courses.js";
import User from "../model/Usermodel.js";
import authMiddleware from "../middleware/auth.js";
import PurchasedCourse from "../model/purchasedmodel.js";
import crypto from "crypto";
import sendEmail from "../middleware/email.js";
const router = express.Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_NfrgmHib9auGMx",
  key_secret: "rw93wGAw2junMXdIfZCyH81T",
});

// Create order
router.post("/create", authMiddleware, async (req, res) => {
  // const { userId } = req.body;
  const { courseId } = req.body;
  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });
  // const user = await User.findById(userId);
  // if (!user) {
  //   return res.status(404).json({ success: false, message: "User not found" });
  // }

  // const alreadyPurchased = user.purchasedCourses.some(
  //   (id) => id.toString() === courseId
  // );

  // if (alreadyPurchased) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "You have already purchased this course.",
  //   });
  // }

  const options = {
    amount: course.price * 100,
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Payment error" });
  }
});

//

// router.post("/create", authMiddleware, async (req, res) => {
//   try {
//     const { courseId } = req.body;
//     console.log("Course ID received:", courseId);
//     if (!courseId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Course ID is required" });
//     }

//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Course not found" });
//     }

//     const user = await User.findById(req.user.id);
//     // if (!user) {
//     //   return res
//     //     .status(404)
//     //     .json({ success: false, message: "User not found" });
//     // }

//     // const alreadyPurchased = user.purchasedCourses.some(
//     //   (id) => id.toString() === courseId
//     // );
//     // console.log("Already purchased:", alreadyPurchased);

//     // if (alreadyPurchased) {
//     //   return res.status(400).json({
//     //     success: false,
//     //     message: "You have already purchased this course.",
//     //   });
//     // }

//     const options = {
//       amount: course.price * 100,
//       currency: "INR",
//       receipt: crypto.randomBytes(10).toString("hex"),
//     };

//     const order = await razorpay.orders.create(options);
//     res.json({ success: true, order });
//   } catch (error) {
//     console.error("Error in /create order:", error);
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

router.get("/:courseId/check", authMiddleware, async (req, res) => {
  const { courseId } = req.params;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadyPurchased = user.purchasedCourses.includes(courseId);

    res.json({ purchased: alreadyPurchased });
  } catch (error) {
    console.error("Error checking course purchase:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Verify payment and save order
// router.post("/verify", authMiddleware, async (req, res) => {
//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     courseId,
//   } = req.body;

//   const generated_signature = crypto
//     .createHmac("sha256", "rw93wGAw2junMXdIfZCyH81T")
//     .update(razorpay_order_id + "|" + razorpay_payment_id)
//     .digest("hex");

//   if (generated_signature !== razorpay_signature) {
//     return res.status(400).json({ message: "Invalid signature" });
//   }

//   try {
//     const order = new Order({
//       user: req.user.id,
//       course: courseId,
//       paymentId: razorpay_payment_id,
//       orderId: razorpay_order_id,
//       status: "paid",
//     });
//     await order.save();

//     const user = await User.findById(req.user.id);
//     user.purchasedCourses.push(courseId);
//     await user.save();

//     res.json({ message: "Payment verified and course purchased" });
//   } catch (err) {
//     console.error("Verification error:", err.message);
//     console.error(err.stack); // Add this
//     res.status(500).json({
//       success: false,
//       message: "Server error during payment verification",
//       error: err.message,
//     });
//   }
// });
router.get("/purchased", authMiddleware, async (req, res) => {
  try {
    const purchasedCourses = await PurchasedCourse.find({
      user: req.user.id,
    }).populate("course");

    if (purchasedCourses.length === 0) {
      return res.status(404).json({ message: "No purchased courses found" });
    }

    res.json({
      success: true,
      courses: purchasedCourses.map((pc) => pc.course),
    });
  } catch (error) {
    console.error("Error fetching purchased courses:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
router.post("/verify", authMiddleware, async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    courseId,
  } = req.body;

  // Signature verification yahan karein...

  try {
    const order = new Order({
      user: req.user.id,
      course: courseId,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: "paid",
    });
    await order.save();

    // PurchasedCourse entry create karna
    const alreadyPurchased = await PurchasedCourse.findOne({
      user: req.user.id,
      course: courseId,
    });

    if (!alreadyPurchased) {
      await PurchasedCourse.create({
        user: req.user.id,
        course: courseId,
      });
    }
    const user = await User.findById(req.user.id);
    const course = await Course.findById(courseId);
    console.log("User found:", user);

    if (!user || !course) {
      return res.status(404).json({ message: "User or Course not found" });
    }

    const html = `
      <h2>Thank you for your purchase!</h2>
      <p>You have successfully purchased the course:</p>
      <ul>
        <li><strong>Course:</strong> ${course.title}</li>
        <li><strong>Course ID:</strong> ${course._id}</li>
      </ul>
      <p>Enjoy learning!</p>
      <br />
      <p>- Team LMS by Chandrapal</p>
    `;

    console.log("Sending email to:", user.email);
    console.log("Email content:", html);

    await sendEmail(user.email, `Course Purchased: ${course.title}`, html);

    res.json({ message: "Payment verified and course purchased" });
  } catch (err) {
    console.error("Verification error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error during payment verification",
      error: err.message,
    });
  }
});

router.get("/purchasedcourse", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("course");

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
