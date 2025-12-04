import React from "react";
import {
  FaProjectDiagram,
  FaUsers,
  FaTruck,
  FaFileInvoice,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const projectData = [
  { name: "Jan", progress: 40 },
  { name: "Feb", progress: 55 },
  { name: "Mar", progress: 70 },
  { name: "Apr", progress: 65 },
  { name: "May", progress: 85 },
  { name: "Jun", progress: 95 },
];

const expenseData = [
  { name: "Project A", expenses: 4000 },
  { name: "Project B", expenses: 3000 },
  { name: "Project C", expenses: 2000 },
  { name: "Project D", expenses: 2780 },
];

const Dashboard = () => {
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6 lg:mb-8">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 sm:p-4 lg:p-6 shadow-2xl rounded-2xl hover:scale-105 transition-transform duration-300 text-white">
          <FaProjectDiagram className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 opacity-90" />
          <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider opacity-90">
            Active Projects
          </h3>
          <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mt-2">12</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 sm:p-4 lg:p-6 shadow-2xl rounded-2xl hover:scale-105 transition-transform duration-300 text-white">
          <FaUsers className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 opacity-90" />
          <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider opacity-90">
            Subcontractors
          </h3>
          <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mt-2">8</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-3 sm:p-4 lg:p-6 shadow-2xl rounded-2xl hover:scale-105 transition-transform duration-300 text-white">
          <FaTruck className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 opacity-90" />
          <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider opacity-90">
            Suppliers
          </h3>
          <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mt-2">15</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-rose-600 p-3 sm:p-4 lg:p-6 shadow-2xl rounded-2xl hover:scale-105 transition-transform duration-300 text-white">
          <FaFileInvoice className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 opacity-90" />
          <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider opacity-90">
            Invoices Pending
          </h3>
          <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mt-2">5</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Line Chart */}
        <div className="bg-white p-4 sm:p-6 shadow-xl rounded-2xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
            <FaProjectDiagram className="text-indigo-600 mr-2 sm:mr-3" />
            Project Progress
          </h3>
          <ResponsiveContainer width="100%" height={250} sm={{ height: 300 }}>
            <LineChart data={projectData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  border: "none",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="progress"
                stroke="#4f46e5"
                strokeWidth={4}
                dot={{ fill: "#4f46e5", strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 sm:p-6 shadow-xl rounded-2xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
            <FaFileInvoice className="text-emerald-600 mr-2 sm:mr-3" />
            Expenses by Project
          </h3>
          <ResponsiveContainer width="100%" height={250} sm={{ height: 300 }}>
            <BarChart data={expenseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  border: "none",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="expenses" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div> 

      {/* Table Section */}
      <div className="bg-white p-4 sm:p-6 shadow-xl rounded-2xl border border-gray-200">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
          <FaProjectDiagram className="text-indigo-600 mr-2 sm:mr-3" />
          Recent Projects
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm ">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="p-2 sm:p-4 font-semibold text-gray-700">Project</th>
                <th className="p-2 sm:p-4 font-semibold text-gray-700">Client</th>
                <th className="p-2 sm:p-4 font-semibold text-gray-700">Status</th>
                <th className="p-2 sm:p-4 font-semibold text-gray-700">Deadline</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-indigo-50 transition-colors duration-200 even:bg-gray-50">
                <td className="p-2 sm:p-4 font-medium">Highway Expansion</td>
                <td className="p-2 sm:p-4">ABC Infra</td>
                <td className="p-2 sm:p-4">
                  <span className="flex items-center text-green-600 font-semibold">
                    <FaCheckCircle className="mr-1 sm:mr-2" />
                    On Track
                  </span>
                </td>
                <td className="p-2 sm:p-4">30 Oct 2025</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-indigo-50 transition-colors duration-200 even:bg-gray-50">
                <td className="p-2 sm:p-4 font-medium">Residential Towers</td>
                <td className="p-2 sm:p-4">XYZ Developers</td>
                <td className="p-2 sm:p-4">
                  <span className="flex items-center text-yellow-600 font-semibold">
                    <FaExclamationTriangle className="mr-1 sm:mr-2" />
                    Delayed
                  </span>
                </td>
                <td className="p-2 sm:p-4">15 Dec 2025</td>
              </tr>
              <tr className="hover:bg-indigo-50 transition-colors duration-200 even:bg-gray-50">
                <td className="p-2 sm:p-4 font-medium">Metro Line Phase 2</td>
                <td className="p-2 sm:p-4">Metro Corp</td>
                <td className="p-2 sm:p-4">
                  <span className="flex items-center text-blue-600 font-semibold">
                    <FaClock className="mr-1 sm:mr-2" />
                    Ongoing
                  </span>
                </td>
                <td className="p-2 sm:p-4">22 Jan 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
