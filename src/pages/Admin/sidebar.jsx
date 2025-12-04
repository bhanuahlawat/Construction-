import React, { useState } from "react";
import {
  FaTachometerAlt, // Dashboard
  FaProjectDiagram, // CRM/Projects
  FaUsers, // Sales & Billing / Users / Employee List
  FaTruck, // Purchase Management
  FaUserTie, // Inventory Management / Users
  FaFileInvoice, // Bidding / Finance & Account Report
  FaChartLine, // Project Management
  FaCog, // Settings/General
  FaChevronDown,
  FaChevronRight,
  FaTimes,
  FaShoppingCart, // Updated for Inventory
  FaHandshake, // Updated for Bidding
  FaClipboardList, // Updated for Contract Management
  FaTools, // Updated for Equipment Management
  FaFolderOpen, // Updated for Document Management
  FaHeartbeat, // Updated for Health & Safety
  FaUsersCog, // Updated for Client & Vendor Portal
  FaCheckCircle, // Updated for Quality Control
  FaDollarSign, // Updated for Finance & Account Report
  FaCalendarAlt, // Updated for Attendance
  FaMoneyBillWave, // Updated for Payroll
  FaSignOutAlt, // Updated for Leave Requests (Using an icon that represents leaving/request)
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Accept mobile state props
const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  // Local state for large-screen collapse/expand
  const [isOpen, setIsOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  const menus = [
    { title: "Dashboard", icon: <FaTachometerAlt />, path: "/" },
    { title: "CRM", icon: <FaProjectDiagram />, path: "/CRMPage" },

    {
      title: "Project Management",
      icon: <FaChartLine />,
      path: "/projectmanagement",
    },

    { title: "Users", icon: <FaUserTie />, path: "/userassignment" },
    // { title: "Bidding", icon: <FaHandshake />, path: "/Bidding" },

    {
      title: "Inventory Management",
      icon: <FaShoppingCart />,
      path: "/InventoryManager",
    }, 
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
      title: "Purchase Management",
      icon: <FaTruck />,
      path: "/purchasemanagement",
    },
   
    {
      title: "Contract Management",
      icon: <FaClipboardList />,
      path: "/contract-management",
    },
    // {
    //   title: "Equipment Management",
    //   icon: <FaTools />,
    //   path: "/EquipmentManagement",
    // },
    {
      title: "Document Management",
      icon: <FaFolderOpen />,
      path: "/DocumentManagement",
    },

    {
      title: "HR & Payroll",
      icon: <FaUsers />, // FaUsers for general HR
      path: "/hr-payroll",
    },
    {
      title: "Health & Safety",
      icon: <FaHeartbeat />,
      path: "/health-safety",
    },
    
    {
      title: "Quality Control",
      icon: <FaCheckCircle />,
      path: "/quality-control",
    },
    // {
    //   title: "Finance & Account Report",
    //   icon: <FaDollarSign />,
    //   path: "/finance-reports",
    // },

  ];

  return (
    <>
      {/* Overlay for mobile view when sidebar is open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Actual Sidebar Content */}
      <div
        className={`
                    ${
                      // Mobile: fixed position, off-canvas, use mobileOpen prop
                      mobileOpen ? "translate-x-0" : "-translate-x-full"
                    }
                    fixed lg:relative top-0 left-0 h-full z-40

                    ${
                      // Responsive widths: collapsed on small screens, use isOpen on large
                      isOpen ? "w-64 lg:w-64" : "w-20 lg:w-20"
                    }
                    lg:translate-x-0 transition-all duration-300 flex flex-col shadow-2xl
                    bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200
                `}
      >
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
          <h1
            className={`text-xl sm:text-2xl font-extrabold text-white ${
              !isOpen && "lg:hidden"
            } ${!mobileOpen && "hidden lg:block"} `}
          >
            Company 

          </h1>

          {/* Close button for mobile (only visible on small screen) */}
          <button
            onClick={() => setMobileOpen(false)}
            className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-700 lg:hidden"
          >
            <FaTimes size={16} />
          </button>

          {/* Toggle button for large screen (only visible on large screen) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-700 hidden lg:block"
          >
            {isOpen ? "<" : ">"}
          </button>
        </div>

        {/* Menu (Scrollable area) */}
        <div className="flex-1 p-2 space-y-2 overflow-y-auto no-scrollbar">
          {menus.map((menu, i) => (
            <div key={i}>
              {/* If dropdown */}
              {menu.dropdown ? (
                <div>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === i ? null : i)
                    }
                    className="flex items-center justify-between w-full p-2 text-lg rounded-xl hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                        {menu.icon}
                      </span>
                      <span
                        className={`${
                          !isOpen && "lg:hidden"
                        } group-hover:text-white`}
                      >
                        {menu.title}
                      </span>
                    </div>
                    {/* Only show Chevron if not collapsed on large screen or if sidebar is open on mobile */}
                    {(isOpen || mobileOpen) && (
                      <span className="text-sm">
                        {openDropdown === i ? (
                          <FaChevronDown />
                        ) : (
                          <FaChevronRight />
                        )}
                      </span>
                    )}
                  </button>

                  {/* Dropdown items */}
                  {openDropdown === i && (
                    <div
                      className={`ml-10 mt-1 flex flex-col gap-1 ${
                        isOpen || mobileOpen ? "block" : "hidden"
                      }`}
                    >
                      {menu.dropdown.map((sub, j) => (
                        <Link
                          key={j}
                          to={sub.path}
                          className="text-gray-300 hover:text-white text-m py-2 pl-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                          onClick={() => setMobileOpen(false)} // Close mobile sidebar on link click
                        >
                          <span className="flex items-center gap-2">
                            {sub.icon} {/* Display sub-menu icon */}
                            {sub.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={menu.path}
                  className="flex items-center gap-4 p-3 text-lg rounded-xl hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 transition-all duration-200 hover:shadow-lg group"
                  onClick={() => setMobileOpen(false)} // Close mobile sidebar on link click
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                    {menu.icon}
                  </span>
                  <span
                    className={`${
                      !isOpen && "lg:hidden"
                    } group-hover:text-white`}
                  >
                    {menu.title}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
