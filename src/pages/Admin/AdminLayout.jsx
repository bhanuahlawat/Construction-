import React, { useState } from "react";
import Sidebar from "./sidebar"; // Assuming 'sidebar' is in the same directory or adjust path
import Navbar from "./Navbar"; // Assuming 'Navbar' is in the same directory or adjust path
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";


const AdminLayout = () => {
  // State to control the mobile sidebar visibility
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
      
      {/* 1. Sidebar (Pass mobile state) */}
      <div className="h-full overflow-y-auto no-scrollbar">
        {/* The Sidebar component manages its own large-screen collapse state (isOpen) 
            and uses mobileOpen prop for the mobile view (off-canvas). */}
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col h-full">
        
        {/* 3. Mobile Menu Button (Fixed position outside Navbar for better access) */}
        {/* This button is only visible on screens smaller than large (lg:hidden) */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden fixed top-15 right-4 z-20 p-2 text-gray-800 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
          aria-label="Open menu"
        >
          <FaBars size={20} />
        </button>

        {/* Navbar stays fixed above Outlet */}
        <Navbar />

        {/* Dashboard scrolls independently */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 lg:p-6 xl:p-8 pt-16 sm:pt-20 lg:pt-24 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;