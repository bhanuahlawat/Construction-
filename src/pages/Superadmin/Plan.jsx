import React, { useState } from "react";
import { FaBox, FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const PlansPage = () => {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Monthly",
      duration: "1 Month",
      price: 1000,
      description: "Access for 30 days",
    },
    {
      id: 2,
      name: "Half-Yearly",
      duration: "6 Months",
      price: 5000,
      description: "Access for 6 months",
    },
    {
      id: 3,
      name: "Annual",
      duration: "1 Year",
      price: 9000,
      description: "Access for 12 months",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    duration: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    setFormData({
      id: null,
      name: "",
      duration: "",
      price: "",
      description: "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEdit = (plan) => {
    setFormData(plan);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      setPlans(plans.filter((p) => p.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setPlans(plans.map((p) => (p.id === formData.id ? formData : p)));
    } else {
      const newPlan = { ...formData, id: Date.now() };
      setPlans([...plans, newPlan]);
    }
    setIsModalOpen(false);
  };

  const filteredPlans = plans.filter((plan) =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
          <FaBox className="text-indigo-600 mr-4 text-4xl" />
          Plans
        </h2>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by plan name"
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
          <FaPlus /> Add Plan
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Duration:</strong> {plan.duration}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Price:</strong> ₹{plan.price}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Description:</strong> {plan.description}
                </p>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <button
                  onClick={() => handleEdit(plan)}
                  className="text-indigo-600 hover:text-indigo-800 p-2 rounded-lg hover:bg-indigo-100 transition"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-100 transition"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No plans found
          </p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaBox className="text-indigo-600 mr-3" />
              {isEditing ? "Edit Plan" : "Add New Plan"}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Plan Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Monthly, Annual"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 1 Month"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 1000"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  placeholder="Describe this plan"
                />
              </div>
              <div className="flex justify-end gap-4 mt-4">
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
                  {isEditing ? "Update Plan" : "Save Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlansPage;
