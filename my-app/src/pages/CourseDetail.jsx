// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API from "../api";

// export default function CourseDetail() {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     API.get(`/api/courses/${id}`)
//       .then((res) => {
//         setCourse(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Failed to load course details");
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <p className="text-center mt-8">Loading...</p>;
//   if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
//   if (!course) return null;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10">
//       <h1 className="text-4xl font-bold mb-6">{course.title}</h1>
//       <img
//         src={course.thumbnail}
//         alt={course.title}
//         className="w-full h-64 object-cover rounded-lg mb-6"
//       />
//       <p className="text-lg mb-4">{course.description}</p>
//       <p className="text-2xl font-semibold text-green-600 mb-6">
//         ₹{course.price}
//       </p>

//       {/* You can add Buy button or other info here */}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get(`/api/courses/${id}`)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load course details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (!course) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center text-indigo-700 drop-shadow">
        {course.title}
      </h1>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-auto max-h-[400px] object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Description Section */}
        <div className="w-full md:w-1/2">
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            {course.description}
          </p>
          <p className="text-2xl font-semibold text-green-600 mb-6">
            ₹{course.price}
          </p>

          {/* Buy Button can go here */}
          {/* <BuyCourseButton course={course} /> */}
        </div>
      </div>
    </div>
  );
}
