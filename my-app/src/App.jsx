import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import Layout from "./Layout";
import AdminDashboard from "./pages/AdminDashBorad";
import Header from "./pages/Header";
import { ToastContainer } from "react-toastify";
import CourseDetail from "./pages/CourseDetail";
import { useEffect, useState } from "react";
import Footer from "./pages/Footer";
// import AdminPurchasedCourses from "./pages/AdminPurchasedCourses";
import AdminPurchasedCourse from "./pages/AdminPurchsedCourses.jsx";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);
  }, []);

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        {/* All pages using the same Header */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses/:id" element={<CourseDetail />} />

          <Route
            path="/student-dashboard"
            element={<StudentDashboard setIsLoggedIn={setIsLoggedIn} />}
          />

          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Pages without Header (optional) */}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/admin/purchased-courses"
          element={<AdminPurchasedCourse />}
        />

        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
