import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaWallet,
  FaChartBar,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const PMCSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menus = [
    { title: "Dashboard", icon: <FaTachometerAlt />, path: "/PMC" },
    { title: "Project", icon: <FaProjectDiagram />, path: "/PMC/Project" },
    { title: "Tasks", icon: <FaTasks />, path: "/PMC/tasks" },
    { title: "Team", icon: <FaUsers />, path: "/PMC/team" },
    { title: "Budget", icon: <FaWallet />, path: "/PMC/budget" },
    { title: "Reports", icon: <FaChartBar />, path: "/PMC/reports" },
    { title: "Notifications", icon: <FaBell />, path: "/PMC/notification" },
    { title: "Settings", icon: <FaCog />, path: "/PMC/settings" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gradient-to-b from-blue-900 to-blue-800 text-gray-200 transition-all duration-300 flex flex-col h-screen shadow-2xl`}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between p-6 border-b border-blue-700">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <FaProjectDiagram size={22} />
          </div>
          <h1
            className={`text-xl font-extrabold tracking-wide ${
              !isOpen && "hidden"
            }`}
          >
            PMC Console
          </h1>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-300 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-blue-700"
        >
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      {/* Menu */}
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menus.map((menu, i) => {
          const active = location.pathname === menu.path;
          return (
            <Link
              key={i}
              to={menu.path}
              className={`flex items-center gap-4 p-3 text-lg rounded-xl transition-all duration-200 group
                ${
                  active
                    ? "bg-blue-700 text-white shadow-lg"
                    : "hover:bg-blue-700/60 hover:shadow-md text-gray-200"
                }`}
              title={menu.title}
            >
              <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                {menu.icon}
              </span>
              <span
                className={`${
                  !isOpen && "hidden"
                } group-hover:text-white font-medium`}
              >
                {menu.title}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-blue-700">
        <Link
          to="/"
          className="flex items-center gap-3 p-3 text-lg rounded-xl hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 transition-all duration-200 text-red-400 hover:text-white hover:shadow-lg"
        >
          <FaSignOutAlt className="text-xl" />
          <span className={`${!isOpen && "hidden"}`}>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default PMCSidebar;
