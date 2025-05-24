import React, { useEffect, useState } from "react";
import API from "../api";

export default function AdminPurchasedCourse() {
  const [purchases, setPurchases] = useState([]);
  const [user, setuser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/orders/purchasedcourse")
      .then((res) => {
        console.log("Response from API:", res.data);
        if (res.data.success) {
          setPurchases(res.data.courses);
          setuser(res.data.user);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch purchases", err.message);
        setLoading(false);
      });
  }, []);
  console.log(purchases);

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        All Purchased Courses (Admin View)
      </h1>
      {purchases.length === 0 ? (
        <p className="text-center text-gray-500">No purchases found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-indigo-100">
              <tr>
                <th className="py-2 px-4 border">Username</th>
                <th className="py-2 px-4 border">User email</th>
                <th className="py-2 px-4 border">Course</th>
                <th className="py-2 px-4 border">Price</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((p, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{p.user.name}</td>
                  <td className="py-2 px-4 border">{p.user.email}</td>
                  <td className="py-2 px-4 border">{p.course.title}</td>
                  <td className="py-2 px-4 border">₹{p.course.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
