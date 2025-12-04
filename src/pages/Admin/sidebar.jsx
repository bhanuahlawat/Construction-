
import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaUsers,
  FaTruck,
  FaUserTie,
  FaFileInvoice,
  FaChartLine,
  FaCog,
  FaChevronDown,
  FaChevronRight,
  FaTimes,
  FaShoppingCart,
  FaHandshake,
  FaClipboardList,
  FaTools,
  FaFolderOpen,
  FaHeartbeat,
  FaUsersCog,
  FaCheckCircle,
  FaDollarSign,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaSignOutAlt,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  // 🔥 Detect current route
  const location = useLocation();

  // 🔥 Sidebar menu list
  const menus = [
    { title: "Dashboard", icon: <FaTachometerAlt />, path: "/" },
    { title: "CRM", icon: <FaProjectDiagram />, path: "/CRMPage" },
    {
      title: "Project Management",
      icon: <FaChartLine />,
      path: "/projectmanagement",
    },
    { title: "Users", icon: <FaUserTie />, path: "/userassignment" },

    {
      title: "Sales & Billing",
      icon: <FaUsers />,
      path: "/SalesandBilling",
    },
    {
      title: "Client & Vendor Portal",
      icon: <FaUsersCog />,
      path: "/Client&Vendor",
    },
    {
      title: "HR & Payroll",
      icon: <FaUsers />,
      path: "/hr-payroll",
    },
    {
      title: "Purchase Management",
      icon: <FaTruck />,
      path: "/purchasemanagement",
    },

    {
      title: "Inventory Management",
      icon: <FaShoppingCart />,
      path: "/InventoryManager",
    },
    // {
    //   title: "Contract Management",
    //   icon: <FaClipboardList />,
    //   path: "/contract-management",
    // },
    {
      title: "Document Management",
      icon: <FaFolderOpen />,
      path: "/DocumentManagement",
    },
    
    // {
    //   title: "Health & Safety",
    //   icon: <FaHeartbeat />,
    //   path: "/health-safety",
    // },
    {
      title: "Quality Control",
      icon: <FaCheckCircle />,
      path: "/quality-control",
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } fixed lg:relative top-0 left-0 h-full z-40 
          ${isOpen ? "w-64 lg:w-64" : "w-20 lg:w-20"}
          lg:translate-x-0 transition-all duration-300 flex flex-col shadow-2xl
          bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200`}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
          <h1
            className={`text-xl sm:text-2xl font-extrabold text-white ${
              !isOpen && "lg:hidden"
            } ${!mobileOpen && "hidden lg:block"}`}
          >
            Company
          </h1>

          {/* Close on mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-700 lg:hidden"
          >
            <FaTimes size={16} />
          </button>

          {/* Collapse toggle on desktop */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-700 hidden lg:block"
          >
            {isOpen ? "<" : ">"}
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 p-2 space-y-2 overflow-y-auto no-scrollbar">
          {menus.map((menu, i) => {
            const isActive = location.pathname === menu.path;

            return (
              <Link
                key={i}
                to={menu.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-4 p-3 text-lg rounded-xl transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-gray-700 text-white font-semibold shadow-md"
                      : "hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600"
                  }`}
              >
                {/* Icon */}
                <span
                  className={`text-xl group-hover:scale-110 transition-transform duration-200
                    ${isActive ? "text-white" : ""}`}
                >
                  {menu.icon}
                </span>

                {/* Title */}
                <span
                  className={`${
                    !isOpen && "lg:hidden"
                  } group-hover:text-white`}
                >
                  {menu.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
