// src/Pages/Admin/QualityControl/StandardsRegulatoryTracking.jsx

import React, { useState } from 'react';

// Initial data moved to a constant
const initialStandards = [
  { id: 'ISO-9001', name: 'ISO 9001:2015', lastReview: '2025-06-01', status: 'Compliant' },
  { id: 'IS-456', name: 'IS 456:2000 (Concrete)', lastReview: '2025-01-15', status: 'Compliant' },
  { id: 'NBC-2016', name: 'National Building Code', lastReview: '2024-12-10', status: 'Under Review' },
];

// Initial state for the "Add New" form
const newFormState = {
  id: '',
  name: '',
  lastReview: '',
  status: 'Compliant'
};

const StandardsRegulatoryTracking = () => {
  // --- State Variables ---
  const [standards, setStandards] = useState(initialStandards);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStandard, setSelectedStandard] = useState(null);

  // State for the modals
  const [formData, setFormData] = useState(newFormState);
  const [modalStatus, setModalStatus] = useState('');
  const [modalReviewDate, setModalReviewDate] = useState('');

  // --- Helper Functions ---
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Compliant':
        return 'bg-green-100 text-green-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // --- Event Handlers ---

  // Handles input changes in the "Add New" form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handles submission of the "Add New" form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.name || !formData.lastReview) {
      alert('Please fill out all fields.');
      return;
    }
    setStandards([...standards, formData]);
    setFormData(newFormState); // Reset form
    setIsFormModalOpen(false); // Close modal
  };

  // Handles clicking the "Delete" button
  const handleDelete = (standardId) => {
    if (window.confirm(`Are you sure you want to delete standard ${standardId}?`)) {
      setStandards(standards.filter(s => s.id !== standardId));
    }
  };

  // Opens the "View/Update" modal
  const handleOpenViewModal = (standard) => {
    setSelectedStandard(standard);
    setModalStatus(standard.status);
    setModalReviewDate(standard.lastReview);
    setIsViewModalOpen(true);
  };

  // Handles the "Update" button in the view modal
  const handleUpdate = () => {
    setStandards(prevStandards =>
      prevStandards.map(s =>
        s.id === selectedStandard.id
          ? { ...s, status: modalStatus, lastReview: modalReviewDate }
          : s
      )
    );
    setIsViewModalOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">5. Standards and regulatory tracking</h2>
        <button
          onClick={() => setIsFormModalOpen(true)} // Opens the "Add New" modal
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add New Standard
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Standard ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Review Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {standards.map((standard) => (
              <tr key={standard.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{standard.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{standard.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{standard.lastReview}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(standard.status)}`}>
                    {standard.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-4">
                  <button
                    onClick={() => handleOpenViewModal(standard)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View/Update
                  </button>
                  <button
                    onClick={() => handleDelete(standard.id)}
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

      {/* 1. Add New Standard Form Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Standard</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700">Standard ID</label>
                <input
                  type="text" name="id" id="id"
                  value={formData.id} onChange={handleFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Standard Name</label>
                <input
                  type="text" name="name" id="name"
                  value={formData.name} onChange={handleFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required
                />
              </div>
              <div>
                <label htmlFor="lastReview" className="block text-sm font-medium text-gray-700">Last Review Date</label>
                <input
                  type="date" name="lastReview" id="lastReview"
                  value={formData.lastReview} onChange={handleFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status" id="status"
                  value={formData.status} onChange={handleFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option>Compliant</option>
                  <option>Under Review</option>
                  <option>Expired</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setIsFormModalOpen(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Save Standard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. View/Update Modal */}
      {isViewModalOpen && selectedStandard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Update Standard: {selectedStandard.id}</h3>
            <div className="space-y-4">
              <div>
                <span className="block text-sm font-medium text-gray-500">Standard Name</span>
                <p className="text-lg text-gray-800">{selectedStandard.name}</p>
              </div>
              <div>
                <label htmlFor="modalReviewDate" className="block text-sm font-medium text-gray-700">Last Review Date</label>
                <input
                  type="date" id="modalReviewDate"
                  value={modalReviewDate} onChange={(e) => setModalReviewDate(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                {/* THIS IS THE CORRECTED LINE */}
                <label htmlFor="modalStatus" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  id="modalStatus"
                  value={modalStatus} onChange={(e) => setModalStatus(e.gtarget.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option>Compliant</option>
                  <option>Under Review</option>
                  <option>Expired</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-6">
              <button type="button" onClick={() => setIsViewModalOpen(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                Cancel
              </button>
              <button type="button" onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StandardsRegulatoryTracking;