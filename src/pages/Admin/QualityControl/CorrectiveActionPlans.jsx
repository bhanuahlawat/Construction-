// src/Pages/Admin/QualityControl/CorrectiveActionPlans.jsx

import React, { useState } from 'react';

const CorrectiveActionPlans = () => {
  // --- State Variables ---
  const [plans, setPlans] = useState([]);
  const [formData, setFormData] = useState({
    issue: '',
    assignedTo: '',
    action: '',
    status: 'Open' // Default status
  });
  
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  // NEW: Add local state for the modal's status dropdown
  const [modalStatus, setModalStatus] = useState('');

  // --- Event Handlers ---

  // Handles input changes in the form
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // Handles the "Create Plan" form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.issue || !formData.assignedTo || !formData.action) {
      alert('Please fill out all fields.');
      return;
    }
    
    const newPlan = {
      ...formData,
      id: `CAP-${String(plans.length + 1).padStart(3, '0')}` // Create a unique ID
    };
    
    setPlans([...plans, newPlan]); // Add the new plan to the list
    setFormData({ issue: '', assignedTo: '', action: '', status: 'Open' }); // Reset the form
  };

  // Handles clicking the "View" button on a row
  const handleViewClick = (plan) => {
    setSelectedPlan(plan); // Set the plan to be viewed
    setModalStatus(plan.status); // NEW: Set the modal's dropdown to the plan's current status
    setIsViewModalOpen(true); // Open the view modal
  };

  // Handles clicking the "Delete" button
  const handleDeleteClick = (planId) => {
    if (window.confirm(`Are you sure you want to delete plan ${planId}?`)) {
      setPlans(plans.filter(plan => plan.id !== planId));
    }
  };

  // NEW: Handles the "Update Status" button in the modal
  const handleUpdateStatus = () => {
    // Update the main 'plans' list
    setPlans(prevPlans =>
      prevPlans.map(p =>
        p.id === selectedPlan.id ? { ...p, status: modalStatus } : p
      )
    );
    setIsViewModalOpen(false); // Close the modal
  };

  // Function to get Tailwind badge colors based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-red-100 text-red-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // --- JSX (Render) ---
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">2. Corrective Action Plans</h2>

      {/* --- Create Plan Form --- */}
      <form onSubmit={handleFormSubmit}>
        {/* ... (form inputs are unchanged) ... */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Issue/Non-compliance */}
          <div>
            <label htmlFor="issue" className="block text-sm font-medium text-gray-700">
              Issue/Non-compliance
            </label>
            <input
              type="text"
              id="issue"
              value={formData.issue}
              onChange={handleFormChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Assigned To */}
          <div>
            <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
              Assigned To
            </label>
            <input
              type="text"
              id="assignedTo"
              value={formData.assignedTo}
              onChange={handleFormChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Corrective Action */}
          <div className="md:col-span-2">
            <label htmlFor="action" className="block text-sm font-medium text-gray-700">
              Corrective Action
            </label>
            <textarea
              id="action"
              rows="3"
              value={formData.action}
              onChange={handleFormChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
        </div>
        {/* Submit Button */}
        <div className="mt-6 text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create Plan
          </button>
        </div>
      </form>

      {/* --- Existing Plans List --- */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Existing Plans</h3>
        <div className="overflow-x-auto">
          {/* ... (table is unchanged) ... */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {plans.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No corrective action plans created yet.</td>
                </tr>
              ) : (
                plans.map((plan) => (
                  <tr key={plan.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{plan.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plan.issue}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plan.assignedTo}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(plan.status)}`}>
                        {plan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-4">
                      <button
                        onClick={() => handleViewClick(plan)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteClick(plan.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- View Plan Details Modal (UPDATED) --- */}
      {isViewModalOpen && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Plan Details: {selectedPlan.id}</h3>
            <div className="space-y-4">
              <p><strong className="text-gray-600">Issue:</strong> {selectedPlan.issue}</p>
              <p><strong className="text-gray-600">Assigned To:</strong> {selectedPlan.assignedTo}</p>
              
              {/* NEW: Status Update Dropdown */}
              <div>
                <label htmlFor="modalStatus" className="block text-sm font-medium text-gray-700">
                  Update Status
                </label>
                <select
                  id="modalStatus"
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Closed</option>
                </select>
              </div>
              
              <p className="border-t pt-4 mt-4"><strong className="text-gray-600">Corrective Action:</strong></p>
              <p className="text-gray-700">{selectedPlan.action}</p>
            </div>
            
            {/* NEW: Updated Modal Buttons */}
            <div className="flex justify-end pt-6 space-x-3">
              <button
                type="button"
                onClick={() => setIsViewModalOpen(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdateStatus}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CorrectiveActionPlans;