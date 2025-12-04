import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import { FaChartLine, FaCheckCircle, FaClock, FaTasks, FaFilePdf, FaUpload, FaCalendarAlt, FaListAlt } from "react-icons/fa";

const ReportsAnalytics = () => {
  const [selectedProjectAnalytics, setSelectedProjectAnalytics] = useState("Project A");

  const dailyData = [
    { day: "Mon", completed: 80, productivity: 78 },
    { day: "Tue", completed: 90, productivity: 82 },
    { day: "Wed", completed: 75, productivity: 76 },
    { day: "Thu", completed: 85, productivity: 80 },
    { day: "Fri", completed: 92, productivity: 88 },
  ];

  const weeklyAgenda = [
    { milestone: "Foundation Work", status: "Completed", issues: "None" },
    { milestone: "Steel Framework", status: "Ongoing", issues: "Material delay" },
    { milestone: "Electrical Wiring", status: "Pending", issues: "Awaiting vendor" },
  ];

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-200 pb-2">
        Reports & Analytics
      </h3>

      {/* (a) Task Completion Dashboard */}
      <section className="bg-white p-6 rounded-2xl shadow space-y-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
          <FaChartLine className="text-blue-600" /> Task Completion & Progress
        </h2>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-xl shadow">
            <FaCheckCircle className="mx-auto text-blue-600 text-3xl mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">86%</h3>
            <p className="text-gray-600">Overall Task Completion</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl shadow">
            <FaTasks className="mx-auto text-green-600 text-3xl mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">12</h3>
            <p className="text-gray-600">Tasks Completed Today</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl shadow">
            <FaClock className="mx-auto text-yellow-600 text-3xl mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">3</h3>
            <p className="text-gray-600">Pending Tasks</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="completed" stroke="#2563eb" strokeWidth={3} />
            <Line type="monotone" dataKey="productivity" stroke="#16a34a" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* (b) Project Agenda */}
      <section className="bg-white p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
          <FaCalendarAlt className="text-indigo-600" /> Project Agenda Overview
        </h2>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Milestone</th>
              <th className="p-3">Status</th>
              <th className="p-3">Issues</th>
            </tr>
          </thead>
          <tbody>
            {weeklyAgenda.map((item, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{item.milestone}</td>
                <td className="p-3">{item.status}</td>
                <td className="p-3">{item.issues}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* (c) Tools */}
      <section className="bg-white p-6 rounded-2xl shadow space-y-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
          <FaListAlt className="text-blue-600" /> Report Tools
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <button className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
            <FaFilePdf /> Generate Report
          </button>
          <button className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition">
            <FaUpload /> Upload Images
          </button>
          <button className="flex items-center justify-center gap-2 bg-yellow-600 text-white py-3 rounded-xl hover:bg-yellow-700 transition">
            <FaTasks /> Add Next Day Notes
          </button>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-2">Select Project</h3>
          <select
            value={selectedProjectAnalytics}
            onChange={(e) => setSelectedProjectAnalytics(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option>Project A</option>
            <option>Project B</option>
            <option>Project C</option>
          </select>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="completed" fill="#2563eb" />
            <Bar dataKey="productivity" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default ReportsAnalytics;