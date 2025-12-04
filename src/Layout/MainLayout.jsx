import React from "react";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Admin/Navbar";

const MainLayout = ({ children, role }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Section */}
      <Sidebar role={role} />

      {/* Main Section (Navbar + Page content) */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <div className="sticky top-0 z-50 bg-white shadow">
          <Navbar />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
