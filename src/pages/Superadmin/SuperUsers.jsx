import React, { useState } from "react";
import { FaUser, FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const SuperUsers = () => {
  // Initial users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rohit Sharma",
      mobile: "+91 9876543210",
      company: "Tech Solutions",
      address: "123, MG Road",
      city: "Mumbai",
      email: "rohit@example.com",
      plan: "Premium",
      amount: "5000",
      status: "Enabled",
      document: "aadhar.pdf",
    },
    {
      id: 2,
      name: "Neha Patel",
      mobile: "+91 9123456789",
      company: "Build Corp",
      address: "456, Park Street",
      city: "Delhi",
      email: "neha@example.com",
      plan: "Basic",
      amount: "2000",
      status: "Disabled",
      document: "pan.pdf",
    },
  ]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    mobile: "",
    company: "",
    address: "",
    city: "",
    email: "",
    plan: "",
    amount: "",
    status: "Enabled",
    document: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "document" && files.length > 0) {
      setFormData({ ...formData, document: files[0].name });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Open Add Modal
  const handleAdd = () => {
    setFormData({
      id: null,
      name: "",
      mobile: "",
      company: "",
      address: "",
      city: "",
      email: "",
      plan: "",
      amount: "",
      status: "Enabled",
      document: "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleEdit = (user) => {
    setFormData(user);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Delete User
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  // Save User
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setUsers(users.map((u) => (u.id === formData.id ? { ...formData } : u)));
    } else {
      const newUser = { ...formData, id: Date.now() };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  // Filter users by search
  const filteredUsers = users.filter((u) =>
    [u.name, u.email, u.mobile, u.status, u.plan].some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
          <FaUser className="text-indigo-600 mr-4 text-4xl" />
          Users
        </h2>

        {/* Search Box */}
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email or mobile"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Add Button */}
        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <FaPlus />
          Add User
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-xl rounded-2xl overflow-x-auto border border-gray-200">
        <table className="w-full text-left text-sm min-w-[1000px]">
          <thead className="bg-gradient-to-r from-indigo-50 to-blue-50">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Name</th>
              <th className="p-4 font-semibold text-gray-700">Mobile</th>
              <th className="p-4 font-semibold text-gray-700">Company</th>
              <th className="p-4 font-semibold text-gray-700">Address</th>
              <th className="p-4 font-semibold text-gray-700">City</th>
              <th className="p-4 font-semibold text-gray-700">Email</th>
              <th className="p-4 font-semibold text-gray-700">Plan</th>
              <th className="p-4 font-semibold text-gray-700">Amount</th>
              <th className="p-4 font-semibold text-gray-700">Status</th>
              <th className="p-4 font-semibold text-gray-700">Document</th>
              <th className="p-4 font-semibold text-gray-700 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b border-gray-100 hover:bg-indigo-50 transition-colors duration-200 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-4 font-medium text-gray-900">{user.name}</td>
                <td className="p-4 text-gray-700">{user.mobile}</td>
                <td className="p-4 text-gray-700">{user.company}</td>
                <td className="p-4 text-gray-700">{user.address}</td>
                <td className="p-4 text-gray-700">{user.city}</td>
                <td className="p-4 text-gray-700">{user.email}</td>
                <td className="p-4 text-gray-700">{user.plan}</td>
                <td className="p-4 text-gray-700">₹{user.amount}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === "Enabled"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-indigo-600 font-medium">
                  {user.document || "N/A"}
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-indigo-600 hover:text-indigo-800 mr-3 p-2 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="11" className="p-8 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaUser className="text-indigo-600 mr-3" />
              {isEditing ? "Edit User" : "Add New User"}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter user name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter mobile number"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter address"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Plan
                </label>
                <input
                  type="text"
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter plan"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Enabled</option>
                  <option>Disabled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Document
                </label>
                <input
                  type="file"
                  name="document"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-2 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="col-span-2 flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isEditing ? "Update User" : "Save User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperUsers;
