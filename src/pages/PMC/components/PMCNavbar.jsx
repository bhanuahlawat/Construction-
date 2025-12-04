import React from "react";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

export default function PMCNavbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 border-b">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen((s) => !s)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
        >
          {/* small hamburger for mobile */}
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M3 6h14M3 10h14M3 14h14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="relative">
          <input
            type="search"
            placeholder="Search projects, tasks..."
            className="pl-10 pr-4 py-2 rounded-md border text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <FaSearch />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-md hover:bg-gray-100 relative">
          <FaBell />
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            3
          </span>
        </button>

        <div className="flex items-center gap-2">
          <div className="text-gray-700 text-sm text-right">
            <div className="font-medium">Priya Sharma</div>
            <div className="text-xs text-gray-500">Project Manager</div>
          </div>
          <FaUserCircle className="text-3xl text-gray-600" />
        </div>
      </div>
    </header>
  );
}
