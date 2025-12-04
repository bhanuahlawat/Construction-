// src/Pages/Admin/QualityControl/DefectTrackingRectification.jsx

import React, { useState } from 'react';

// Initial data for demonstration
const initialDefects = [
  { id: 'DEF-001', location: 'Floor 5, Column C2', severity: 'High', status: 'Open', details: 'Visible cracks on column C2, requires immediate inspection.' },
  { id: 'DEF-002', location: 'Basement, Waterproofing', severity: 'Medium', status: 'In Progress', details: 'Minor seepage reported after rainfall. Rectification work ongoing.' },
  { id: 'DEF-003', location: 'Floor 2, Window W-12', severity: 'Low', status: 'Closed', details: 'Window sealant was misaligned. Fixed and verified.' },
];

// Initial state for the "Report New" form
const newFormState = {
  location: '',
  severity: 'Low',
  status: 'Open',
  details: ''
};

const DefectTrackingRectification = () => {
  // --- State Variables ---
  const [defects, setDefects] = useState(initialDefects);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedDefect, setSelectedDefect] = useState(null);

  // State for modals
  const [formData, setFormData] = useState(newFormState);
  const [modalStatus, setModalStatus] = useState('');

  // --- Helper Functions ---
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

  // --- Event Handlers ---

  // Handles form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handles "Report New Defect" form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.location || !formData.details) {
      alert('Please fill out all fields.');
      return;
    }
    const newDefect = {
      ...formData,
      id: `DEF-${String(defects.length + 1).padStart(3, '0')}`
    };
    setDefects([...defects, newDefect]);
    setFormData(newFormState); // Reset form
    setIsFormModalOpen(false); // Close modal
  };

  // Opens the "View Details" modal
  const handleViewClick = (defect) => {
    setSelectedDefect(defect);
    setModalStatus(defect.status);
    setIsViewModalOpen(true);
  };

  // Deletes a defect
  const handleDelete = (defectId) => {
    if (window.confirm(`Are you sure you want to delete defect ${defectId}?`)) {
      setDefects(defects.filter(d => d.id !== defectId));
    }
  };

  // Updates the status from the "View" modal
  const handleUpdateStatus = () => {
    setDefects(prevDefects =>
      prevDefects.map(d =>
        d.id === selectedDefect.id ? { ...d, status: modalStatus } : d
      )
    );
    setIsViewModalOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">4. Defect tracking and rectification</h2>
        <button
          onClick={() => setIsFormModalOpen(true)} // Opens the form modal
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Report New Defect
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Defect ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {defects.map((defect) => (
              <tr key={defect.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{defect.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{defect.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{defect.severity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(defect.status)}`}>
                    {defect.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-4">
                  <button
                    onClick={() => handleViewClick(defect)} // Opens view modal
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleDelete(defect.id)} // Deletes item
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Modals --- */}

      {/* 1. Report New Defect Form Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Report New Defect</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text" name="location" id="location"
                  value={formData.location} onChange={handleFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="severity" className="block text-sm font-medium text-gray-700">Severity</label>
                  <select
                    name="severity" id="severity"
                    value={formData.severity} onChange={handleFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status" id="status"
                    value={formData.status} onChange={handleFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Closed</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="details" className="block text-sm font-medium text-gray-700">Defect Details</label>
                <textarea
                  name="details" id="details"
                  rows="4"
                  value={formData.details} onChange={handleFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setIsFormModalOpen(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                  Cancel
                </button>
                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                  Save Defect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. View/Update Defect Modal */}
      {isViewModalOpen && selectedDefect && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Defect Details: {selectedDefect.id}</h3>
            <div className="space-y-4">
              <p><strong className="text-gray-600">Location:</strong> {selectedDefect.location}</p>
              <p><strong className="text-gray-600">Severity:</strong> {selectedDefect.severity}</p>
              
              <div>
                <label htmlFor="modalStatus" className="block text-sm font-medium text-gray-700">Update Status</label>
                <select
                  id="modalStatus"
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Closed</option>
                </select>
              </div>

              <p className="border-t pt-4 mt-4"><strong className="text-gray-600">Details:</strong></p>
              <p className="text-gray-700">{selectedDefect.details}</p>
            </div>
            <div className="flex justify-end space-x-3 pt-6">
              <button type="button" onClick={() => setIsViewModalOpen(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
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

export default DefectTrackingRectification;