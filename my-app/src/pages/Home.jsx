// import React, { useEffect, useState } from "react";
// import API from "../api";
// import BuyCourseButton from "./BuyCourseButton";
// import BannerList from "./getbanner";

// export default function Home() {
//   const [courses, setCourses] = useState([]);
//   const [purchasedCourses, setPurchasedCourses] = useState([]);

//   useEffect(() => {
//     // Fetch all courses
//     API.get("api/courses")
//       .then((res) => setCourses(res.data))
//       .catch((err) => console.error("Error fetching courses:", err));

//     // Fetch purchased courses of logged-in user
//     API.get("api/orders/purchased") // Adjust path if needed, based on your router
//       .then((res) => {
//         if (res.data.success) {
//           // res.data.courses is an array of purchased course objects
//           // We store only course IDs for easy checking
//           const purchasedCourseIds = res.data.courses.map((c) => c._id);
//           setPurchasedCourses(purchasedCourseIds);
//         } else {
//           setPurchasedCourses([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching purchased courses:", err);
//         setPurchasedCourses([]);
//       });
//   }, []);

//   return (
//     <>
//       <BannerList />
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold text-center mb-10">Our Courses</h1>

//         {courses.length === 0 ? (
//           <p className="text-center text-gray-500">No courses available.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {courses.map((course) => {
//               const isPurchased = purchasedCourses.includes(course._id);

//               return (
//                 <div
//                   key={course._id}
//                   className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
//                 >
//                   <img
//                     src={course.thumbnail}
//                     alt={course.title}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-4 flex flex-col justify-between h-[180px]">
//                     <h2 className="text-xl font-semibold mb-2 truncate">
//                       {course.title}
//                     </h2>
//                     <p className="text-lg font-medium text-green-600 mb-4">
//                       ₹{course.price}
//                     </p>

//                     {isPurchased ? (
//                       <div className="text-center text-white bg-green-600 py-2 rounded font-semibold">
//                         Purchased
//                       </div>
//                     ) : (
//                       <BuyCourseButton course={course} />
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import API from "../api";
import BuyCourseButton from "./BuyCourseButton";
import BannerList from "./getbanner";
import { Link } from "react-router-dom";

// export default function Home() {
//   const [courses, setCourses] = useState([]);
//   const [purchasedCourses, setPurchasedCourses] = useState([]);

//   useEffect(() => {
//     // Fetch all courses
//     API.get("api/courses")
//       .then((res) => setCourses(res.data))
//       .catch((err) => console.error("Error fetching courses:", err));

//     // Fetch purchased courses of logged-in user
//     API.get("api/orders/purchased")
//       .then((res) => {
//         if (res.data.success) {
//           const purchasedCourseIds = res.data.courses.map((c) => c._id);
//           setPurchasedCourses(purchasedCourseIds);
//         } else {
//           setPurchasedCourses([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching purchased courses:", err);
//         setPurchasedCourses([]);
//       });
//   }, []);

//   return (
//     <>
//       <BannerList />
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <h1 className="text-5xl font-extrabold text-center mb-12 text-indigo-700 drop-shadow-md">
//           Our Courses
//         </h1>

//         {courses.length === 0 ? (
//           <p className="text-center text-gray-500">No courses available.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {courses.map((course) => {
//               const isPurchased = purchasedCourses.includes(course._id);

//               return (
//                 <Link
//                   to={`/courses/${course._id}`}
//                   className="no-underline"
//                   key={course._id}
//                 >
//                   <div
//                     key={course._id}
//                     className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
//                   >
//                     <img
//                       src={course.thumbnail}
//                       alt={course.title}
//                       className="w-full h-48 object-container"
//                     />
//                     <div className="p-4 flex flex-col justify-between h-[180px]">
//                       <h2 className="text-xl font-semibold mb-2 text-gray-800 truncate">
//                         {course.title}
//                       </h2>
//                       <p className="text-lg font-medium text-green-600 mb-4">
//                         ₹{course.price}
//                       </p>

//                       {isPurchased ? (
//                         <div className="text-center text-white bg-green-600 py-2 rounded font-semibold">
//                           Purchased
//                         </div>
//                       ) : (
//                         <BuyCourseButton course={course} />
//                       )}
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

import { FaWhatsapp } from "react-icons/fa"; // 👈 Import WhatsApp icon

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    API.get("api/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching courses:", err));

    API.get("api/orders/purchased")
      .then((res) => {
        if (res.data.success) {
          const purchasedCourseIds = res.data.courses.map((c) => c._id);
          setPurchasedCourses(purchasedCourseIds);
        } else {
          setPurchasedCourses([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching purchased courses:", err);
        setPurchasedCourses([]);
      });
  }, []);

  return (
    <>
      <BannerList />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-indigo-700 drop-shadow-md">
          Our Courses
        </h1>

        {courses.length === 0 ? (
          <p className="text-center text-gray-500">No courses available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {courses.map((course) => {
              const isPurchased = purchasedCourses.includes(course._id);

              return (
                <Link
                  to={`/courses/${course._id}`}
                  className="no-underline"
                  key={course._id}
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-container"
                    />
                    <div className="p-4 flex flex-col justify-between h-[180px]">
                      <h2 className="text-xl font-semibold mb-2 text-gray-800 truncate">
                        {course.title}
                      </h2>
                      <p className="text-lg font-medium text-green-600 mb-4">
                        ₹{course.price}
                      </p>

                      {isPurchased ? (
                        <div className="text-center text-white bg-green-600 py-2 rounded font-semibold">
                          Purchased
                        </div>
                      ) : (
                        <BuyCourseButton course={course} />
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* ✅ WhatsApp Floating Button */}
      <a
        href="https://wa.me/919131520933" // Replace with your number
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg z-50 transition-transform duration-300 hover:scale-110"
      >
        <FaWhatsapp className="text-2xl" />
      </a>
    </>
  );
}
