// import React, { useEffect, useState } from "react";
// import API from "../api"; // your axios instance with token headers
// // import User from "../models/Usermodel";
// const PromoteUser = () => {
//   const [users, setUsers] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     API.get("/api/auth/allusers") // Assume you have a route to fetch all users
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.error("Failed to fetch users:", err));
//   }, []);

//   const promoteToAdmin = async (userId) => {
//     try {
//       const res = await API.put(`/api/auth/promote/${userId}`);
//       setMessage(res.data.message);

//       // Update the role in local state (React)
//       setUsers((prevUsers) =>
//         prevUsers.map((user) =>
//           user._id === userId ? { ...user, role: "admin" } : user
//         )
//       );
//     } catch (err) {
//       console.error("Promotion failed:", err);
//       setMessage(err.response?.data?.message || "Promotion failed");
//     }
//   };

//   const demoteToUser = async (userId) => {
//     try {
//       const res = await API.put(`/api/auth/demote/${userId}`);
//       setMessage(res.data.message);

//       setUsers((prevUsers) =>
//         prevUsers.map((user) =>
//           user._id === userId ? { ...user, role: "student" } : user
//         )
//       );
//     } catch (err) {
//       console.error("Demotion failed:", err);
//       setMessage(err.response?.data?.message || "Demotion failed");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Promote Users to Admin</h1>
//       {message && <p className="mb-4 text-green-600">{message}</p>}

//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Email</th>
//             <th className="p-2 border">Role</th>
//             <th className="p-2 border">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id} className="border-t">
//               <td className="p-2 border">{user.name}</td>
//               <td className="p-2 border">{user.email}</td>
//               <td className="p-2 border capitalize">{user.role}</td>
//               {/* <td className="p-2 border text-center">
//                 {resume ? (
//                   <a
//                     href={`http://localhost:5000${resume.filePath}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     View Resume
//                   </a>
//                 ) : (
//                   <span className="text-gray-400">No Resume</span>
//                 )}
//               </td> */}
//               <td className="p-2 border text-center">
//                 {user.resume?.filePath ? (
//                   <a
//                     href={`http://localhost:5000${user.resume.filePath}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     View Resume
//                   </a>
//                 ) : (
//                   <span className="text-gray-400">No Resume</span>
//                 )}
//               </td>

//               {/* <td className="p-2 border">
//                 {user.role === "admin" || user.role === "superadmin" ? (
//                   <span className="text-gray-400">Already Admin</span>
//                 ) : (
//                   <button
//                     className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//                     onClick={() => promoteToAdmin(user._id)}
//                   >
//                     Promote
//                   </button>
//                 )}
//               </td> */}
//               <td className="p-2 border">
//                 {user.role === "student" ? (
//                   <button
//                     className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//                     onClick={() => promoteToAdmin(user._id)}
//                   >
//                     Promote
//                   </button>
//                 ) : (
//                   <button
//                     className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                     onClick={() => demoteToUser(user._id)}
//                   >
//                     Demote
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PromoteUser;

import React, { useEffect, useState } from "react";
import API from "../api";

const PromoteUser = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get("/api/auth/allusers")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  const promoteToAdmin = async (userId) => {
    try {
      const res = await API.put(`/api/auth/promote/${userId}`);
      setMessage(res.data.message);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: "admin" } : user
        )
      );
    } catch (err) {
      console.error("Promotion failed:", err);
      setMessage(err.response?.data?.message || "Promotion failed");
    }
  };

  const demoteToUser = async (userId) => {
    try {
      const res = await API.put(`/api/auth/demote/${userId}`);
      setMessage(res.data.message);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: "student" } : user
        )
      );
    } catch (err) {
      console.error("Demotion failed:", err);
      setMessage(err.response?.data?.message || "Demotion failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Promote Users to Admin</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}

      {/* Responsive wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full border border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border text-left">Name</th>
              <th className="p-2 border text-left">Email</th>
              <th className="p-2 border text-left">Role</th>
              <th className="p-2 border text-left">Resume</th>
              <th className="p-2 border text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border break-words">{user.email}</td>
                <td className="p-2 border capitalize">{user.role}</td>
                <td className="p-2 border text-center">
                  {user.resume?.filePath ? (
                    <a
                      href={`http://localhost:5000${user.resume.filePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-words"
                    >
                      View Resume
                    </a>
                  ) : (
                    <span className="text-gray-400">No Resume</span>
                  )}
                </td>
                <td className="p-2 border text-center">
                  {user.role === "student" ? (
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={() => promoteToAdmin(user._id)}
                    >
                      Promote
                    </button>
                  ) : (
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      onClick={() => demoteToUser(user._id)}
                    >
                      Demote
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PromoteUser;
