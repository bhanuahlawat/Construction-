import React from 'react';
import { Boxes, Truck, FileBarChart2, User, Package } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const stats = [
  { icon: Package, label: "Purchase", value: 12340, color: "from-green-400 to-green-600" },
  { icon: Truck, label: "Deliveries", value: 245, color: "from-blue-400 to-blue-600" },
  { icon: User, label: "Profile", value: 56, color: "from-yellow-400 to-yellow-600" },
  { icon: FileBarChart2, label: "Reports", value: 14, color: "from-pink-400 to-pink-600" },
];

const piedata = [
  { name: "Purchase Orders", value: 45, color: "#3b82f6" },
  { name: "Deliveries", value: 30, color: "#8b5cf6" },
  { name: "Invoices", value: 15, color: "#10b981" },
  { name: "Documents", value: 20, color: "#f5928c" },
  { name: "Notifications", value: 11, color: "#f59e0b" },
  { name: "Reports", value: 35, color: "#8b5cf6" },
  { name: "Profile", value: 25, color: "#ce4f0a" },
];

const data = [
  { month: "Jan", revenue: 45000, expenses: 32000 },
  { month: "Feb", revenue: 52000, expenses: 38000 },
  { month: "Mar", revenue: 48000, expenses: 35000 },
  { month: "Apr", revenue: 61000, expenses: 42000 },
  { month: "May", revenue: 55000, expenses: 40000 },
  { month: "Jun", revenue: 67000, expenses: 45000 },
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900"> Supplier Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${item.color} p-6 shadow-2xl rounded-2xl transform hover:scale-105 transition-transform duration-300 text-white flex items-center space-x-4`}
            >
              <Icon className="w-10 h-10 opacity-90" />
              <div>
                <p className="text-sm font-semibold uppercase opacity-80">{item.label}</p>
                <p className="text-3xl font-bold">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-4">Monthly Revenue & Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#4f46e5" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expenses" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-4">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={piedata}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {piedata.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Pie Legend */}
          <div className="mt-4 flex flex-wrap gap-3">
            {piedata.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
