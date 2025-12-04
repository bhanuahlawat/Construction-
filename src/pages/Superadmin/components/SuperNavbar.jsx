import React, { useState } from "react";
import { FaBell, FaSearch, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex items-center justify-between bg-white shadow-lg p-6 rounded-b-2xl">
      {/* Search */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-3 rounded-xl shadow-sm">
        <FaSearch className="text-gray-500 text-lg" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-sm font-medium"
        />
      </div>
      {/* Right Side */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-12 h-12 rounded-full cursor-pointer border-2 border-indigo-200 hover:border-indigo-400 transition-colors duration-200"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-colors duration-200"
              >
                <FaUser className="text-indigo-600" />
                Profile
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-colors duration-200"
              >
                <FaCog className="text-indigo-600" />
                Settings
              </a>
              <hr className="my-2" />
              <a
                href="../../login"
                className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <FaSignOutAlt className="text-red-600" />
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
