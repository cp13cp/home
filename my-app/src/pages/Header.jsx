// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import { Link } from "react-router-dom";

// // // // // // export default function Header() {
// // // // // //   const [isLoggedIn, setIsLoggedIn] = useState(false);

// // // // // //   useEffect(() => {
// // // // // //     const loginStatus = localStorage.getItem("isLoggedIn") === "true";
// // // // // //     // const user = localStorage.getItem("token");
// // // // // //     console.log(loginStatus);

// // // // // //     setIsLoggedIn(loginStatus);
// // // // // //   }, []);

// // // // // //   const navLinks = [
// // // // // //     { to: "/", label: "Home" },
// // // // // //     { to: "/student-dashboard", label: "Student" },
// // // // // //     { to: "/admin-dashboard", label: "Admin" },
// // // // // //     // Login link always shown (optional)
// // // // // //     // { to: "/login", label: "Login" },
// // // // // //     // Register link only if not logged in
// // // // // //     ...(!isLoggedIn ? [{ to: "/register", label: "Register" }] : []),
// // // // // //   ];

// // // // // //   return (
// // // // // //     <header className="bg-white shadow-md sticky top-0 z-50">
// // // // // //       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
// // // // // //         <Link to="/" className="text-xl font-bold text-blue-600">
// // // // // //           🎓 LMS
// // // // // //         </Link>

// // // // // //         <nav className="space-x-4">
// // // // // //           {navLinks.map((link) => (
// // // // // //             <Link
// // // // // //               key={link.to}
// // // // // //               to={link.to}
// // // // // //               className="text-gray-700 hover:text-blue-600 font-medium"
// // // // // //             >
// // // // // //               {link.label}
// // // // // //             </Link>
// // // // // //           ))}
// // // // // //         </nav>
// // // // // //       </div>
// // // // // //     </header>
// // // // // //   );
// // // // // // }
// // // // // import React from "react";
// // // // // import { Link } from "react-router-dom";

// // // // // export default function Header({ isLoggedIn }) {
// // // // //   const navLinks = [
// // // // //     { to: "/", label: "Home" },
// // // // //     { to: "/student-dashboard", label: "Student" },
// // // // //     { to: "/admin-dashboard", label: "Admin" },
// // // // //     ...(!isLoggedIn ? [{ to: "/register", label: "Register" }] : []),
// // // // //   ];

// // // // //   return (
// // // // //     <header className="bg-white shadow-md sticky top-0 z-50">
// // // // //       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
// // // // //         <Link to="/" className="text-xl font-bold text-blue-600">
// // // // //           🎓 LMS
// // // // //         </Link>

// // // // //         <nav className="space-x-4">
// // // // //           {navLinks.map((link) => (
// // // // //             <Link
// // // // //               key={link.to}
// // // // //               to={link.to}
// // // // //               className="text-gray-700 hover:text-blue-600 font-medium"
// // // // //             >
// // // // //               {link.label}
// // // // //             </Link>
// // // // //           ))}
// // // // //         </nav>
// // // // //       </div>
// // // // //     </header>
// // // // //   );
// // // // // }
// // // import React, { useEffect, useState } from "react";
// // // import { Link } from "react-router-dom";

// // // // export default function Header({ isLoggedIn }) {
// // // //   const [userRole, setUserRole] = useState("");

// // // //   useEffect(() => {
// // // //     const user = JSON.parse(localStorage.getItem("user"));
// // // //     if (user && user.role) {
// // // //       setUserRole(user.role);
// // // //     }
// // // //   }, [isLoggedIn]); // Update jab login/logout ho

// // // //   const navLinks = [
// // // //     { to: "/", label: "Home" },
// // // //     { to: "/student-dashboard", label: "Student" },
// // // //     ...(userRole === "admin" || userRole === "superadmin"
// // // //       ? [{ to: "/admin-dashboard", label: "Admin" }]
// // // //       : []),
// // // //     ...(!isLoggedIn ? [{ to: "/register", label: "Register" }] : []),
// // // //   ];

// // // //   return (
// // // //     <header className="bg-white shadow-md sticky top-0 z-50">
// // // //       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
// // // //         <Link to="/" className="text-xl font-bold text-blue-600">
// // // //           🎓 LMS
// // // //         </Link>

// // // //         <nav className="space-x-4">
// // // //           {navLinks.map((link) => (
// // // //             <Link
// // // //               key={link.to}
// // // //               to={link.to}
// // // //               className="text-gray-700 hover:text-blue-600 font-medium"
// // // //             >
// // // //               {link.label}
// // // //             </Link>
// // // //           ))}
// // // //         </nav>
// // // //       </div>
// // // //     </header>
// // // //   );
// // // // }
// // // import React, { useEffect, useState } from "react";
// // // import { Link } from "react-router-dom";

// // // export default function Header({ isLoggedIn }) {
// // //   const [userRole, setUserRole] = useState("");

// // //   useEffect(() => {
// // //     const user = JSON.parse(localStorage.getItem("user"));
// // //     if (user && user.role) {
// // //       setUserRole(user.role);
// // //     } else {
// // //       setUserRole("");
// // //     }
// // //   }, [isLoggedIn]);

// // //   const navLinks = [
// // //     { to: "/", label: "Home" },
// // //     { to: "/student-dashboard", label: "Student" },
// // //     ...(userRole === "admin" || userRole === "superadmin"
// // //       ? [{ to: "/admin-dashboard", label: "Admin" }]
// // //       : []),
// // //     // Agar user logged out hai to Login aur Register dono dikhai denge
// // //     ...(!isLoggedIn
// // //       ? [
// // //           { to: "/login", label: "Login" },
// // //           { to: "/register", label: "Register" },
// // //         ]
// // //       : []),
// // //   ];

// // //   return (
// // //     <header className="bg-white shadow-md sticky top-0 z-50">
// // //       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
// // //         <Link to="/" className="text-xl font-bold text-blue-600">
// // //           🎓 CodersWay
// // //         </Link>

// // //         <nav className="space-x-4">
// // //           {navLinks.map((link) => (
// // //             <Link
// // //               key={link.to}
// // //               to={link.to}
// // //               className="text-gray-700 hover:text-blue-600 font-medium"
// // //             >
// // //               {link.label}
// // //             </Link>
// // //           ))}
// // //         </nav>
// // //       </div>
// // //     </header>
// // //   );
// // // }
// // // import React, { useEffect, useState } from "react";
// // // import { Link } from "react-router-dom";
// // // import { FaBars, FaTimes } from "react-icons/fa";

// // // export default function Header({ isLoggedIn }) {
// // //   const [userRole, setUserRole] = useState("");
// // //   const [isMenuOpen, setIsMenuOpen] = useState(false);

// // //   useEffect(() => {
// // //     const user = JSON.parse(localStorage.getItem("user"));
// // //     if (user && user.role) {
// // //       setUserRole(user.role);
// // //     } else {
// // //       setUserRole("");
// // //     }
// // //   }, [isLoggedIn]);

// // //   const navLinks = [
// // //     { to: "/", label: "Home" },
// // //     { to: "/student-dashboard", label: "Student" },
// // //     ...(userRole === "admin" || userRole === "superadmin"
// // //       ? [{ to: "/admin-dashboard", label: "Admin" }]
// // //       : []),
// // //     ...(!isLoggedIn
// // //       ? [
// // //           { to: "/login", label: "Login" },
// // //           { to: "/register", label: "Register" },
// // //         ]
// // //       : []),
// // //   ];

// // //   return (
// // //     <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
// // //       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
// // //         <Link to="/" className="text-2xl font-bold">
// // //           🎓 CodersWay
// // //         </Link>

// // //         <div className="lg:hidden">
// // //           <button
// // //             onClick={() => setIsMenuOpen(!isMenuOpen)}
// // //             className="text-white"
// // //           >
// // //             {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
// // //           </button>
// // //         </div>

// // //         <nav
// // //           className={`${
// // //             isMenuOpen ? "block" : "hidden"
// // //           } lg:flex space-x-6 items-center`}
// // //         >
// // //           {navLinks.map((link) => (
// // //             <Link
// // //               key={link.to}
// // //               to={link.to}
// // //               className="text-white hover:text-yellow-300 font-medium"
// // //             >
// // //               {link.label}
// // //             </Link>
// // //           ))}
// // //         </nav>
// // //       </div>
// // //     </header>
// // //   );
// // // }
// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import { FaBars, FaTimes } from "react-icons/fa";

// // export default function Header({ isLoggedIn }) {
// //   const [userRole, setUserRole] = useState("");
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);

// //   useEffect(() => {
// //     const user = JSON.parse(localStorage.getItem("user"));
// //     if (user && user.role) {
// //       setUserRole(user.role);
// //     } else {
// //       setUserRole("");
// //     }
// //   }, [isLoggedIn]);

// //   const navLinks = [
// //     { to: "/", label: "Home" },
// //     { to: "/student-dashboard", label: "Student" },
// //     ...(userRole === "admin" || userRole === "superadmin"
// //       ? [{ to: "/admin-dashboard", label: "Admin" }]
// //       : []),
// //     ...(!isLoggedIn
// //       ? [
// //           { to: "/login", label: "Login" },
// //           { to: "/register", label: "Register" },
// //         ]
// //       : []),
// //   ];

// //   return (
// //     <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg sticky top-0 z-50">
// //       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
// //         <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
// //           <span role="img" aria-label="Graduation Cap">
// //             🎓
// //           </span>
// //           <span>CodersWay</span>
// //         </Link>

// //         {/* Mobile menu button */}
// //         <div className="lg:hidden">
// //           <button
// //             onClick={() => setIsMenuOpen(!isMenuOpen)}
// //             className="text-white focus:outline-none"
// //           >
// //             {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
// //           </button>
// //         </div>

// //         {/* Navigation links */}
// //         <nav
// //           className={`${
// //             isMenuOpen ? "block" : "hidden"
// //           } lg:flex space-x-6 items-center`}
// //         >
// //           {navLinks.map((link) => (
// //             <Link
// //               key={link.to}
// //               to={link.to}
// //               className="text-white hover:text-yellow-300 font-medium transition-colors duration-200"
// //             >
// //               {link.label}
// //             </Link>
// //           ))}
// //         </nav>
// //       </div>
// //     </header>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";

// export default function Header({ isLoggedIn }) {
//   const [userRole, setUserRole] = useState("");
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user && user.role) {
//       setUserRole(user.role);
//     } else {
//       setUserRole("");
//     }
//   }, [isLoggedIn]);

//   const navLinks = [
//     { to: "/", label: "Home" },
//     { to: "/student-dashboard", label: "Student" },
//     ...(userRole === "admin" || userRole === "superadmin"
//       ? [{ to: "/admin-dashboard", label: "Admin" }]
//       : []),
//     ...(!isLoggedIn
//       ? [
//           { to: "/login", label: "Login" },
//           { to: "/register", label: "Register" },
//         ]
//       : []),
//   ];

//   return (
//     <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//         <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
//           <span role="img" aria-label="Graduation Cap">
//             🎓
//           </span>
//           <span>CodersWay</span>
//         </Link>

//         {/* Mobile menu button */}
//         <div className="lg:hidden">
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="text-white focus:outline-none"
//           >
//             {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//           </button>
//         </div>

//         {/* Desktop nav */}
//         <nav className="hidden lg:flex space-x-6 items-center">
//           {navLinks.map((link) => (
//             <Link
//               key={link.to}
//               to={link.to}
//               className="text-white hover:text-yellow-300 font-medium transition-colors duration-200"
//             >
//               {link.label}
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* Mobile dropdown nav */}
//       {isMenuOpen && (
//         <div className="lg:hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 space-y-2">
//           {navLinks.map((link) => (
//             <Link
//               key={link.to}
//               to={link.to}
//               onClick={() => setIsMenuOpen(false)} // Close on click
//               className="block text-white hover:text-yellow-300 font-medium transition-colors duration-200"
//             >
//               {link.label}
//             </Link>
//           ))}
//         </div>
//       )}
//     </header>
//   );
// }
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header({ isLoggedIn }) {
  const [userRole, setUserRole] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      setUserRole(user.role);
    } else {
      setUserRole("");
    }
  }, [isLoggedIn]);
  console.log("userRole:", userRole);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/student-dashboard", label: "Student" },
    ...(userRole === "admin" || userRole === "superadmin"
      ? [{ to: "/admin-dashboard", label: "Admin" }]
      : []),
    ...(!isLoggedIn
      ? [
          { to: "/login", label: "Login" },
          { to: "/register", label: "Register" },
        ]
      : []),
  ];

  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
        <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
          <span role="img" aria-label="Graduation Cap">
            🎓
          </span>
          <span>CodersWay</span>
        </Link>

        {/* Mobile menu button */}
        <div className="">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navigation links */}
        <nav
          className={`lg:flex flex-col lg:flex-row lg:items-center lg:space-x-6 absolute top-full left-0 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg z-40 transform transition-all duration-500 ease-in-out overflow-hidden ${
            isMenuOpen
              ? "translate-y-0 opacity-100 max-h-screen"
              : "-translate-y-full opacity-0 max-h-0"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-4 py-2 text-white hover:text-yellow-300 font-medium transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
