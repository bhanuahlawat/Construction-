import React, { useState } from "react";
import { FaBell, FaSearch, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added Link import

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // 🔹 Logout handler
  const handleLogout = (e) => {
    e.preventDefault();

    // Clear the user's session data
    sessionStorage.removeItem("auth");

    // Redirect to login
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between bg-white shadow-lg px-2 sm:px-4 lg:px-6 xl:px-8 p-2 sm:p-4 lg:p-6 rounded-b-2xl">
      {/* 🔍 Search Box */}
      <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-gray-100 to-gray-200 px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-sm w-full  max-w-xs sm:max-w-sm lg:max-w-md">
        <FaSearch className="text-gray-500 text-sm sm:text-base lg:text-lg" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-xs sm:text-sm font-medium text-gray-700 placeholder-gray-500 flex-1"
        />
      </div>

      {/* 🔔 Notification + Profile */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-6">
        <FaBell className="text-gray-600 text-base sm:text-lg lg:text-2xl cursor-pointer hover:text-indigo-600 transition-colors duration-200" />

        <div className="relative">
          {/* Profile Image */}
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-6 sm:w-8 lg:w-10 xl:w-12 h-6 sm:h-8 lg:h-10 xl:h-12 rounded-full cursor-pointer border-2 border-indigo-200 hover:border-indigo-400 transition-colors duration-200"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 animate-fadeIn">
              {/* Profile Link */}
              <Link
                to="/admin/AdminProfile"
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 hover:bg-indigo-50 transition-colors duration-200"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FaUser className="text-indigo-600" />
                Profile
              </Link>

              {/* Settings Link */}
              <Link
                to="/settings"
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 hover:bg-indigo-50 transition-colors duration-200"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FaCog className="text-indigo-600" />
                Settings
              </Link>

              <hr className="my-2" />

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 sm:gap-3 w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <FaSignOutAlt className="text-red-600" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
