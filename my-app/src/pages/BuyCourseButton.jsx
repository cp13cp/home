// import React from "react";
// import axios from "axios";

// const BuyCourseButton = ({ course }) => {
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handleBuyNow = async () => {
//     const res = await loadRazorpayScript();
//     if (!res) {
//       alert("Razorpay SDK failed to load. Check your connection.");
//       return;
//     }

//     // Get the Razorpay key from environment
//     const razorpayKey = "rzp_test_NfrgmHib9auGMx";

//     if (!razorpayKey) {
//       alert(
//         "Razorpay key is missing. Please check your environment variables."
//       );
//       console.error("Missing Razorpay key in environment variables.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token"); // JWT token for authMiddleware

//       const { data } = await axios.post(
//         "http://localhost:5000/api/orders/create",
//         { courseId: course._id },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const options = {
//         key: razorpayKey, // Your Razorpay public key here
//         amount: data.amount,
//         currency: data.currency,
//         name: "LMS by Chandrapal",
//         description: `Purchase for ${course.title}`,
//         order_id: data.id,
//         handler: function (response) {
//           alert("Payment successful!");
//           // TODO: Call backend API to verify payment & enroll student here
//           console.log("Payment Response:", response);
//         },
//         prefill: {
//           name: "Student Name", // Ideally from user profile
//           email: "student@example.com", // Ideally from user profile
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Payment error:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <button
//       onClick={handleBuyNow}
//       className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//     >
//       Buy Now ₹{course.price}
//     </button>
//   );
// };

// export default BuyCourseButton;

import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import toastify from "react-toastify";
// const BuyCourseButton = ({ course }) => {
//   const navigate = useNavigate();

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handleBuyNow = async () => {
//     const res = await loadRazorpayScript();
//     if (!res) {
//       alert("Razorpay SDK failed to load.");
//       return;
//     }

//     const razorpayKey = "rzp_test_NfrgmHib9auGMx"; // Public key

//     try {
//       const token = localStorage.getItem("token");

//       const { data: order } = await axios.post(
//         "http://localhost:5000/api/orders/create",
//         { courseId: course._id },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const options = {
//         key: razorpayKey,
//         amount: order.amount,
//         currency: order.currency,
//         name: "LMS by Chandrapal",
//         description: `Purchase for ${course.title}`,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             await axios.post(
//               "http://localhost:5000/api/orders/verify",
//               {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 courseId: course._id,
//               },
//               {
//                 headers: { Authorization: `Bearer ${token}` },
//               }
//             );
//             console.log("http://localhost:5000/api/orders/verify");

//             alert("Payment successful! Redirecting to dashboard.");
//             navigate("/student-dashboard");
//           } catch (error) {
//             console.error("Payment verification failed", error);
//             alert("Payment verification failed. Try again.");
//           }
//         },
//         prefill: {
//           name: "Student Name",
//           email: "student@example.com",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("Payment error:", err);
//       toast.error("Something went wrong.");
//     }
//   };

//   return (
//     <button
//       onClick={handleBuyNow}
//       className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//     >
//       Buy Now ₹{course.price}
//     </button>
//   );
// };

const BuyCourseButton = ({ course }) => {
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBuyNow = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load.");
      return;
    }

    const razorpayKey = "rzp_test_NfrgmHib9auGMx"; // Replace with your live/public key in production

    try {
      const token = localStorage.getItem("token");

      const { data: order } = await axios.post(
        "http://localhost:5000/api/orders/create",
        { courseId: course._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: "LMS by Chandrapal",
        description: `Purchase for ${course.title}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            await axios.post(
              "http://localhost:5000/api/orders/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courseId: course._id,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            toast.success("Payment successful! Redirecting to dashboard...");
            setTimeout(() => {
              navigate("/student-dashboard");
            }, 1500);
          } catch (error) {
            console.error("Payment verification failed", error);
            toast.error("Payment verification failed. Try again.");
          }
        },
        prefill: {
          name: "Student Name",
          email: "student@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Please Login to buy the course.");
    }
  };

  return (
    <button
      onClick={handleBuyNow}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Buy Now ₹{course.price}
    </button>
  );
};

export default BuyCourseButton;
