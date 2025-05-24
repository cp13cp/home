// import React, { useEffect, useState } from "react";
// import API from "../api";
// import { useNavigate } from "react-router-dom";

// export default function StudentDashboard() {
//   const [user, setUser] = useState(null);
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem("user"));
//     if (!userData) {
//       navigate("/login");
//       return;
//     }
//     setUser(userData);

//     // fetch courses user purchased
//     API.get("api/courses/purchased").then((res) => {
//       // Filter courses by purchasedCourses from user - assuming backend sends purchasedCourses populated
//       // But since we don't have full backend route, here just fetch all for demo
//       setCourses(res.data.courses);
//     });
//   }, [navigate]);

//   console.log("User data:", courses);
//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="container mx-auto p-5">
//       <div className="flex justify-between items-center mb-5">
//         <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 text-white px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       </div>
//       <h2 className="text-2xl mb-4">Your Courses</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//         {courses.length === 0 ? (
//           <p>You have not purchased any courses yet.</p>
//         ) : (
//           courses.map((course) => (
//             <div key={course._id} className="border p-3 rounded shadow">
//               <img
//                 src={course.thumbnail}
//                 alt={course.title}
//                 className="w-full h-48 object-cover"
//               />
//               <h3 className="text-xl font-semibold mt-2">{course.title}</h3>
//               <a
//                 href={course.videoUrl}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-blue-600 mt-2 block"
//               >
//                 Watch Video
//               </a>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import ResumeUpload from "./resumeuploads";
import MyResume from "./Myresume";
import LogoutButton from "./LogOut";

export default function StudentDashboard({ setIsLoggedIn }) {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(userData);

    // Fetch courses user purchased
    API.get("api/orders/purchased").then((res) => {
      // Deduplicate courses by _id
      const uniqueCourses = Array.from(
        new Map(res.data.courses.map((course) => [course._id, course])).values()
      );
      setCourses(uniqueCourses);
    });
  }, [navigate]);

  // const handleLogout = () => {
  //   localStorage.clear();
  //   navigate("/login");
  // };

  return (
    <div className="container mx-auto p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <LogoutButton setIsLoggedIn={setIsLoggedIn} />
      </div>

      <h2 className="text-2xl mb-4">Your Courses</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {courses.length === 0 ? (
          <p>You have not purchased any courses yet.</p>
        ) : (
          courses.map((course) => (
            <div key={course._id} className="border p-3 rounded shadow">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold mt-2">{course.title}</h3>
              <a
                href={course.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 mt-2 block"
              >
                Watch Video
              </a>
            </div>
          ))
        )}
      </div>
      <ResumeUpload />
      {/* <MyResume /> */}
    </div>
  );
}
