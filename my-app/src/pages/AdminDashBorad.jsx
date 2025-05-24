// // import React, { useEffect, useState } from "react";
// // import API from "../api";
// // import PromoteUser from "./Promoteuser";

// // export default function AdminDashboard() {
// //   const [courses, setCourses] = useState([]);
// //   const [title, setTitle] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [price, setPrice] = useState("");
// //   const [thumbnail, setThumbnail] = useState("");
// //   const [videoUrl, setVideoUrl] = useState("");

// //   const fetchCourses = async () => {
// //     try {
// //       const res = await API.get("/api/courses");
// //       setCourses(res.data);
// //     } catch (error) {
// //       console.error("Error fetching courses:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCourses();
// //   }, []);

// //   const handleAddCourse = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const token = localStorage.getItem("token");
// //       const res = await API.post(
// //         "/api/courses/addcourse",
// //         {
// //           title,
// //           description,
// //           price,
// //           thumbnail,
// //           videoUrl,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       alert("Course added successfully!");
// //       setCourses([...courses, res.data]);
// //       setTitle("");
// //       setDescription("");
// //       setPrice("");
// //       setThumbnail("");
// //       setVideoUrl("");
// //     } catch (error) {
// //       console.error("Error adding course:", error);
// //       alert("Failed to add course. Check console for details.");
// //     }
// //   };

// //   return (
// //     <div className="p-6 max-w-5xl mx-auto">
// //       <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

// //       {/* Add Course Form */}
// //       <form
// //         onSubmit={handleAddCourse}
// //         className="mb-8 bg-white p-6 rounded shadow space-y-4"
// //       >
// //         <div>
// //           <label className="block font-medium">Title</label>
// //           <input
// //             type="text"
// //             className="w-full border p-2 rounded"
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label className="block font-medium">Description</label>
// //           <textarea
// //             className="w-full border p-2 rounded"
// //             value={description}
// //             onChange={(e) => setDescription(e.target.value)}
// //             required
// //           ></textarea>
// //         </div>

// //         <div>
// //           <label className="block font-medium">Price (₹)</label>
// //           <input
// //             type="number"
// //             className="w-full border p-2 rounded"
// //             value={price}
// //             onChange={(e) => setPrice(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label className="block font-medium">Thumbnail URL</label>
// //           <input
// //             type="text"
// //             className="w-full border p-2 rounded"
// //             value={thumbnail}
// //             onChange={(e) => setThumbnail(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label className="block font-medium">Video URL</label>
// //           <input
// //             type="text"
// //             className="w-full border p-2 rounded"
// //             value={videoUrl}
// //             onChange={(e) => setVideoUrl(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <button
// //           type="submit"
// //           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
// //         >
// //           Add Course
// //         </button>
// //       </form>

// //       {/* List of Courses */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         {courses.map((course) => (
// //           <div
// //             key={course._id}
// //             className="border rounded p-4 bg-gray-50 shadow-sm"
// //           >
// //             <img
// //               src={course.thumbnail}
// //               alt={course.title}
// //               className="h-40 w-full object-cover rounded mb-2"
// //             />
// //             <h2 className="text-xl font-semibold">{course.title}</h2>
// //             <p className="text-gray-600 mb-2">{course.description}</p>
// //             <p className="text-green-700 font-semibold">₹{course.price}</p>
// //           </div>
// //         ))}
// //       </div>

// //       <PromoteUser />
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import API from "../api";
// import PromoteUser from "./Promoteuser";
// import UploadBanner from "./UploadBanner";
// import UpdateCourseForm from "./updteCourses";

// export default function AdminDashboard() {
//   const [courses, setCourses] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [thumbnail, setThumbnail] = useState("");
//   const [videoUrl, setVideoUrl] = useState("");

//   const fetchCourses = async () => {
//     try {
//       const res = await API.get("/api/courses");
//       setCourses(res.data);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const handleAddCourse = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");
//       const res = await API.post(
//         "/api/courses/addcourse",
//         {
//           title,
//           description,
//           price,
//           thumbnail,
//           videoUrl,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Course added successfully!");
//       setCourses([...courses, res.data]);
//       setTitle("");
//       setDescription("");
//       setPrice("");
//       setThumbnail("");
//       setVideoUrl("");
//     } catch (error) {
//       console.error("Error adding course:", error);
//       alert("Failed to add course. Check console for details.");
//     }
//   };

//   const handleDeleteCourse = async (courseId) => {
//     if (window.confirm("Are you sure you want to delete this course?")) {
//       try {
//         const token = localStorage.getItem("token");
//         await API.delete(`/api/courses/delete/${courseId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setCourses((prev) => prev.filter((c) => c._id !== courseId));
//         alert("Course deleted successfully!");
//       } catch (error) {
//         console.error("Error deleting course:", error);
//         alert(error.response?.data?.message || "Failed to delete course");
//       }
//     }
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
//       {/* Add Course Form */}
//       <form
//         onSubmit={handleAddCourse}
//         className="mb-8 bg-white p-6 rounded shadow space-y-4"
//       >
//         <div>
//           <label className="block font-medium">Title</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Description</label>
//           <textarea
//             className="w-full border p-2 rounded"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           ></textarea>
//         </div>

//         <div>
//           <label className="block font-medium">Price (₹)</label>
//           <input
//             type="number"
//             className="w-full border p-2 rounded"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Thumbnail URL</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             value={thumbnail}
//             onChange={(e) => setThumbnail(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Video URL</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             value={videoUrl}
//             onChange={(e) => setVideoUrl(e.target.value)}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           Add Course
//         </button>
//       </form>
//       {/* List of Courses */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {courses.map((course) => (
//           <div
//             key={course._id}
//             className="border rounded p-4 bg-gray-50 shadow-sm relative"
//           >
//             <img
//               src={course.thumbnail}
//               alt={course.title}
//               className="h-40 w-full object-cover rounded mb-2"
//             />
//             <h2 className="text-xl font-semibold">{course.title}</h2>
//             <p className="text-gray-600 mb-2">{course.description}</p>
//             <p className="text-green-700 font-semibold">₹{course.price}</p>

//             <button
//               onClick={() => handleDeleteCourse(course._id)}
//               className="absolute top-2 right-2 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//       {/* Promote Users Section */}
//       <div className="mt-10">
//         <PromoteUser />
//       </div>
//       <UploadBanner />
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import API from "../api";
import PromoteUser from "./Promoteuser";
import UploadBanner from "./UploadBanner";
import UpdateCourseForm from "./UpdateCourse";
import { Link } from "react-router-dom";
export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/api/courses");
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddCourse = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await API.post(
        "/api/courses/addcourse",
        {
          title,
          description,
          price,
          thumbnail,
          videoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Course added successfully!");
      setCourses([...courses, res.data]);
      setTitle("");
      setDescription("");
      setPrice("");
      setThumbnail("");
      setVideoUrl("");
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Failed to add course. Check console for details.");
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const token = localStorage.getItem("token");
        await API.delete(`/api/courses/delete/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses((prev) => prev.filter((c) => c._id !== courseId));
        alert("Course deleted successfully!");
      } catch (error) {
        console.error("Error deleting course:", error);
        alert(error.response?.data?.message || "Failed to delete course");
      }
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
  };

  const handleUpdateCourse = async (updatedCourse) => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.put(
        `/api/courses/update/${updatedCourse._id}`,
        updatedCourse,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === updatedCourse._id ? res.data : course
        )
      );
      setEditingCourse(null);
      alert("Course updated successfully!");
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course. Check console for details.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add Course Form */}
      <form
        onSubmit={handleAddCourse}
        className="mb-8 bg-white p-6 rounded shadow space-y-4"
      >
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Price (₹)</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Thumbnail URL</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Video URL</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Course
        </button>
      </form>

      {/* List of Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="border rounded p-4 bg-gray-50 shadow-sm relative"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-40 w-full object-cover rounded mb-2"
            />
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-600 mb-2">{course.description}</p>
            <p className="text-green-700 font-semibold">₹{course.price}</p>

            <div className="absolute top-2 right-2 space-x-2">
              <button
                onClick={() => handleEditCourse(course)}
                className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCourse(course._id)}
                className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Course Modal */}
      {editingCourse && (
        <UpdateCourseForm
          course={editingCourse}
          onUpdate={handleUpdateCourse}
          onCancel={() => setEditingCourse(null)}
        />
      )}

      {/* Promote Users Section */}
      <div className="mt-10">
        <PromoteUser />
      </div>

      {/* Upload Banner Section */}
      <UploadBanner />

      <Link to="/admin/purchased-courses" className="text-indigo-600">
        View All Purchases
      </Link>
    </div>
  );
}
