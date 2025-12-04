import React, { useState } from "react";
import { FaChartLine } from "react-icons/fa";

const ModulesPage = () => {
  const [modules, setModules] = useState([
    {
      id: 1,
      name: "CRM",
      description: "Customer relationship management",
      isActive: true,
    },
    {
      id: 2,
      name: "Sales Invoicing & Billing",
      description: "Manage sales invoices and billing operations",
      isActive: true,
    },
    {
      id: 3,
      name: "Purchase & Procurement Management",
      description: "Procurement, purchase orders, and vendor management",
      isActive: true,
    },
    {
      id: 4,
      name: "Inventory & Material Management",
      description: "Material usage and inventory tracking",
      isActive: true,
    },
    {
      id: 5,
      name: "Bidding",
      description: "Manage bidding and tender processes",
      isActive: true,
    },
    {
      id: 6,
      name: "Project Management",
      description: "Plan and track project activities",
      isActive: true,
    },
    {
      id: 7,
      name: "Contract Management",
      description: "Manage contracts and agreements",
      isActive: true,
    },
    {
      id: 8,
      name: "Reports & Analytics",
      description: "Generate business reports and analytics",
      isActive: true,
    },
    {
      id: 9,
      name: "Equipment & Asset Management",
      description: "Track usage and lifecycle of assets",
      isActive: true,
    },
    {
      id: 10,
      name: "Document Management",
      description: "Organize and manage project documents",
      isActive: true,
    },
    {
      id: 11,
      name: "HR & Payroll",
      description: "Employee records and payroll processing",
      isActive: true,
    },
    {
      id: 12,
      name: "Health & Safety",
      description: "Ensure compliance and safety tracking",
      isActive: true,
    },
    {
      id: 13,
      name: "Client & Vendor Portal",
      description: "Access portal for clients and vendors",
      isActive: true,
    },
    {
      id: 14,
      name: "Quality Control",
      description: "Quality assurance and inspections",
      isActive: true,
    },
    {
      id: 15,
      name: "Finance & Account Report",
      description: "Financial management and account reporting",
      isActive: true,
    },
  ]);

  const toggleModule = (id) => {
    setModules(
      modules.map((m) => (m.id === id ? { ...m, isActive: !m.isActive } : m))
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-800 flex items-center">
        <FaChartLine className="text-indigo-600 mr-4 text-4xl" />
        Modules (Block / Unblock)
      </h2>

      {/* Grid of Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div
            key={module.id}
            className={`border rounded-2xl shadow-md p-6 transition
              ${
                module.isActive
                  ? "bg-white border-gray-200"
                  : "bg-gray-100 border-gray-300 opacity-70"
              }
            `}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {module.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{module.description}</p>
            <button
              onClick={() => toggleModule(module.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold shadow
                ${
                  module.isActive
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-green-500 text-white hover:bg-green-600"
                }
              `}
            >
              {module.isActive ? "Block" : "Unblock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModulesPage;
