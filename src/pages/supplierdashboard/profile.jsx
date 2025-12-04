import React from 'react';
import { User, Truck, Package, FileText } from 'lucide-react';

const supplierProfile = {
  name: "ABC Suppliers",
  email: "contact@abc.com",
  phone: "+91 9876543210",
  company: "ABC Pvt Ltd",
  avatar: "https://i.pravatar.cc/150?img=3",
  stats: [
    { label: "Total Orders", value: 120, icon: Package, color: "from-blue-400 to-blue-600" },
    { label: "Deliveries", value: 95, icon: Truck, color: "from-green-400 to-green-600" },
    { label: "Invoices", value: 45, icon: FileText, color: "from-yellow-400 to-yellow-600" },
    { label: "Profile Visits", value: 300, icon: User, color: "from-pink-400 to-pink-600" },
  ],
  recentOrders: [
    { id: 1, item: "Steel Beams", quantity: 50, status: "Delivered", date: "10 Oct 2025" },
    { id: 2, item: "Cement Bags", quantity: 100, status: "Pending", date: "12 Oct 2025" },
    { id: 3, item: "Bricks", quantity: 500, status: "In Transit", date: "14 Oct 2025" },
  ],
};

const Profile = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-6 bg-white p-6 rounded-2xl shadow-lg">
        <img src={supplierProfile.avatar} alt="avatar" className="w-24 h-24 rounded-full border-4 border-indigo-500" />
        <div>
          <h1 className="text-3xl font-bold">{supplierProfile.name}</h1>
          <p className="text-gray-600">{supplierProfile.company}</p>
          <p className="text-gray-500 mt-1">{supplierProfile.email} | {supplierProfile.phone}</p>
        </div>
        <button className="ml-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Edit Profile
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {supplierProfile.stats.map((stat, index) => {
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

      {/* Recent Orders Table */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 font-semibold text-gray-700">Item</th>
              <th className="p-4 font-semibold text-gray-700">Quantity</th>
              <th className="p-4 font-semibold text-gray-700">Status</th>
              <th className="p-4 font-semibold text-gray-700">Date</th>
            </tr>
          </thead>
          <tbody>
            {supplierProfile.recentOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-indigo-50 transition-colors duration-200 even:bg-gray-50">
                <td className="p-4 font-medium">{order.item}</td>
                <td className="p-4">{order.quantity}</td>
                <td className={`p-4 font-semibold ${order.status === "Delivered" ? "text-green-600" : order.status === "Pending" ? "text-yellow-600" : "text-blue-600"}`}>
                  {order.status}
                </td>
                <td className="p-4">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
