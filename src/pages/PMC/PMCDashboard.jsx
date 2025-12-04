import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaWallet,
  FaChartLine,
  FaClipboardList,
} from "react-icons/fa";

const kpi = [
  {
    id: 1,
    title: "Total Projects",
    value: 24,
    icon: <FaProjectDiagram className="text-white text-4xl mb-3 opacity-90" />,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    title: "Active Projects",
    value: 8,
    icon: <FaChartLine className="text-white text-4xl mb-3 opacity-90" />,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: 3,
    title: "Pending Tasks",
    value: 53,
    icon: <FaTasks className="text-white text-4xl mb-3 opacity-90" />,
    gradient: "from-orange-500 to-amber-600",
  },
  {
    id: 4,
    title: "Budget Used",
    value: "$120,400",
    icon: <FaWallet className="text-white text-4xl mb-3 opacity-90" />,
    gradient: "from-purple-500 to-fuchsia-600",
  },
];

const chartData = [
  { month: "Jan", progress: 30 },
  { month: "Feb", progress: 45 },
  { month: "Mar", progress: 50 },
  { month: "Apr", progress: 65 },
  { month: "May", progress: 80 },
  { month: "Jun", progress: 75 },
  { month: "Jul", progress: 90 },
];

const projectsSample = [
  {
    id: 1,
    name: "Mall Redevelopment",
    manager: "Ravi",
    progress: 72,
    due: "2025-11-01",
    budget: "$420,000",
  },
  {
    id: 2,
    name: "Highway Bridge",
    manager: "Anita",
    progress: 45,
    due: "2026-03-15",
    budget: "$1,200,000",
  },
  {
    id: 3,
    name: "Residential Block A",
    manager: "Suresh",
    progress: 88,
    due: "2025-07-30",
    budget: "$800,000",
  },
];

export default function PMCDashboard() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Project Management Dashboard
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {kpi.map((k) => (
          <div
            key={k.id}
            className={`bg-gradient-to-br ${k.gradient} p-6 shadow-2xl rounded-2xl hover:scale-105 transition-transform duration-300 text-white`}
          >
            {k.icon}
            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-90">
              {k.title}
            </h3>
            <p className="text-4xl font-bold mt-2">{k.value}</p>
          </div>
        ))}
      </div>

      {/* Chart + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart */}
        <div className="bg-white p-6 shadow-xl rounded-2xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <FaChartLine className="text-indigo-600 mr-3" />
            Progress Overview (Last 7 Months)
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  border: "none",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="progress"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#colorProgress)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Ongoing Projects Table */}
        <div className="bg-white p-6 shadow-xl rounded-2xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <FaClipboardList className="text-blue-600 mr-3" />
              Ongoing Projects
            </h3>
            <button className="text-sm text-blue-600 hover:underline">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="p-3 font-semibold text-gray-700">Project</th>
                  <th className="p-3 font-semibold text-gray-700">Manager</th>
                  <th className="p-3 font-semibold text-gray-700">Progress</th>
                  <th className="p-3 font-semibold text-gray-700">Due</th>
                  <th className="p-3 font-semibold text-gray-700">Budget</th>
                </tr>
              </thead>
              <tbody>
                {projectsSample.map((p, i) => (
                  <tr
                    key={p.id}
                    className={`border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200 ${
                      i % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="p-3 font-medium text-gray-800">{p.name}</td>
                    <td className="p-3 text-gray-600">{p.manager}</td>
                    <td className="p-3">
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {p.progress}%
                      </div>
                    </td>
                    <td className="p-3 text-gray-600">{p.due}</td>
                    <td className="p-3 text-gray-600">{p.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {[
          {
            title: "Create Project",
            desc: "Kick off a new project with templates & budgeting.",
          },
          {
            title: "Assign Tasks",
            desc: "Assign tasks to team members and set deadlines.",
          },
          {
            title: "Generate Report",
            desc: "Create performance or budget reports for stakeholders.",
          },
        ].map((action) => (
          <div
            key={action.title}
            className="bg-white p-6 shadow-xl rounded-2xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
          >
            <h4 className="font-bold text-gray-800">{action.title}</h4>
            <p className="text-sm text-gray-500 mt-2">{action.desc}</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200">
              {action.title.split(" ")[0]}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
