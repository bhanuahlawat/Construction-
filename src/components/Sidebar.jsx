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
  FaSignOutAlt,
  FaBoxes,
  FaBuilding,
  FaCreditCard,
  FaTasks,
  FaHistory,
  FaQuestionCircle,
  FaUserCog,
  FaBox,
  FaGavel,
  FaClipboardList,
  FaRProject,
  FaFileAlt,
  
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ role = "subcontractor" }) => {
  const [isOpen, setIsOpen] = useState(true);

  const menus = {
    subcontractor: [
      { icon: <FaBoxes />, title: "Dashboard", path: "/subcontractor" },
      { icon: <FaBuilding />, title: "DPR Sheet", path: "/subcontractor/dprsheet" },
      { icon: <FaBuilding />, title: "ProjectsReports", path: "/subcontractor/projectreports" },
      { icon: <FaTruck />, title: "Material Deliveries", path: "/subcontractor/material" },
      { icon: <FaCreditCard />, title: "Payments", path: "/subcontractor/payments" },
      { icon: <FaTasks />, title: "Work Schedule", path: "/subcontractor/work" },
      { icon: <FaChartLine />, title: "Reports", path: "/subcontractor/subreports" },
      {icon : <FaBoxes /> ,title:"Boq", path:"/subcontractor/boq"},
    { icon: <FaHistory />, title: "Recent Activity", path: "/subcontractor/recent" },
     
      
     

      { icon: <FaQuestionCircle />, title: "Help & Support", path: "/subcontractor/help" },
      { icon: <FaUserCog />, title: "Profile", path: "/subcontractor/subprofile" },
    ],
    supplier: [
      { icon: <FaTachometerAlt />, title: "Dashboard", path: "/supplierdashboard" },
      { icon: <FaTruck />, title: "Purchase & Procurement", path: "/supplierdashboard/purchase" },
      { icon: <FaTruck />, title: "Deliveries", path: "/supplierdashboard/deliveries" },
      { icon: <FaFileInvoice />, title: "Invoices", path: "/supplierdashboard/invoices" },
      // { icon: <FaBox />, title: "Documents", path: "/supplierdashboard/documents" },
      { icon: <FaUsers />, title: "Notification", path: "/supplierdashboard/notification" },
      { icon: <FaChartLine />, title: "Reports", path: "/supplierdashboard/supreports" },
      { icon: <FaUserTie />, title: "Profile", path: "/supplierdashboard/profile" },
    ],
  };

  const menu = menus[role] || [];

  const handleLogout = () => {
    alert("Logged out!");
  };

  return (
    <div
      className={`${
        isOpen ? "w-69" : "w-20"
      } bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 transition-all duration-300 flex flex-col h-screen shadow-2xl overflow-y-scroll`}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between p-8 border-gray-700 ">
        {isOpen && (
          <h1 className="text-2xl font-extrabold text-white truncate">
            {role === "subcontractor" ? "Subcontractor dashboard" : "Supplier dashboard"}
          </h1>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-white transition-colors duration-200 p-2  rounded-lg hover:bg-gray-700"
        >
          {isOpen ? "<" : ">"}
        </button>
      </div>

      {/* Menu */}
      <div className="flex-1 p-2 space-y-2 flex-grow">
        {menu.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className="flex items-center gap-4 p-3 text-lg rounded-xl hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 transition-all duration-200 hover:shadow-lg group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform duration-200">
              {item.icon}
            </span>
            {isOpen && ( 
              <span className="group-hover:text-white">{item.title}</span>
            )}
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div className=" mt-auto p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 w-full text-red-400 hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 rounded-lg transition-all duration-200"
        >
          <FaSignOutAlt className="text-xl" />
          {isOpen && <span className="font-semibold">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
