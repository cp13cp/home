// src/components/Layout.jsx
import React from "react";
import Header from "./pages/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}
