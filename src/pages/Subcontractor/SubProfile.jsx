import React from 'react';
import { User, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';

const subcontractorProfile = {
  name: "Rahul Kumar",
  email: "rahul@contractor.com",
  phone: "+91 9876543210",
  company: "RK Constructions",
  avatar: "https://i.pravatar.cc/150?img=12",
  stats: [
    { label: "Ongoing Projects", value: 5, icon: Clock, color: "from-blue-400 to-blue-600" },
    { label: "Completed Projects", value: 12, icon: CheckCircle, color: "from-green-400 to-green-600" },
    { label: "Pending Tasks", value: 3, icon: XCircle, color: "from-red-400 to-red-600" },
    { label: "Profile Visits", value: 230, icon: User, color: "from-pink-400 to-pink-600" },
  ],
  recentTasks: [
    { id: 1, task: "Electrical Wiring", location: "Tower A, Floor 3", status: "Ongoing", date: "10 Oct 2025" },
    { id: 2, task: "Painting", location: "Tower B, Floor 2", status: "Completed", date: "12 Oct 2025" },
    { id: 3, task: "Plumbing", location: "Tower C, Floor 1", status: "Pending", date: "14 Oct 2025" },
  ],
};

const SubcontractorProfilePage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-6 bg-white p-6 rounded-2xl shadow-lg">
        <img src={subcontractorProfile.avatar} alt="avatar" className="w-24 h-24 rounded-full border-4 border-indigo-500" />
        <div>
          <h1 className="text-3xl font-bold">{subcontractorProfile.name}</h1>
          <p className="text-gray-600">{subcontractorProfile.company}</p>
          <p className="text-gray-500 mt-1">{subcontractorProfile.email} | {subcontractorProfile.phone}</p>
        </div>
        <div className="ml-auto flex space-x-3">
          <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Edit Profile</button>
        
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subcontractorProfile.stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl shadow-lg flex items-center space-x-4 transform hover:scale-105 transition-transform duration-300 text-white`}>
              <Icon className="w-8 h-8 opacity-90" />
              <div>
                <p className="text-sm font-semibold">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Tasks Table */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Recent Tasks</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 font-semibold text-gray-700">Task</th>
              <th className="p-4 font-semibold text-gray-700">Location</th>
              <th className="p-4 font-semibold text-gray-700">Status</th>
              <th className="p-4 font-semibold text-gray-700">Date</th>
            </tr>
          </thead>
          <tbody>
            {subcontractorProfile.recentTasks.map((task) => (
              <tr key={task.id} className="border-b hover:bg-indigo-50 transition-colors duration-200 even:bg-gray-50">
                <td className="p-4 font-medium">{task.task}</td>
                <td className="p-4">{task.location}</td>
                <td className={`p-4 font-semibold ${
                  task.status === "Completed" ? "text-green-600" :
                  task.status === "Pending" ? "text-yellow-600" :
                  "text-blue-600"
                }`}>{task.status}</td>
                <td className="p-4">{task.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubcontractorProfilePage;
