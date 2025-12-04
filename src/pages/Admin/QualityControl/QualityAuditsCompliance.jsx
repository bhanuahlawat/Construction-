// src/Pages/Admin/QualityControl/QualityAuditsCompliance.jsx

import React, { useState } from 'react';

// Initial data for demonstration
const initialAudits = [
  { 
    id: 'AUD-001', 
    date: '2025-10-28', 
    status: 'Completed', 
    details: 'All compliance checks passed. Minor observations noted in section 4.2.',
    reportFile: { name: 'Audit_Report_001.pdf' } // Simulating an uploaded file
  },
  { 
    id: 'AUD-002', 
    date: '2025-11-05', 
    status: 'Scheduled', 
    details: 'Audit scheduled for next week. Pre-audit documents submitted.',
    reportFile: null // No file uploaded yet
  },
];

const QualityAuditsCompliance = () => {
  // --- State Variables ---
  const [audits, setAudits] = useState(initialAudits);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState(null);

  // Initial state for the form, including the new 'reportFile'
  const initialFormState = {
    id: '',
    date: '',
    status: 'Scheduled',
    details: '',
    reportFile: null
  };
  const [newAudit, setNewAudit] = useState(initialFormState);

  // --- Event Handlers ---

  // Handles text, date, and select changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewAudit(prev => ({ ...prev, [name]: value }));
  };

  // NEW: Handles the file input change
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setNewAudit(prev => ({ ...prev, reportFile: e.target.files[0] }));
    }
  };

  // Handles the "Schedule New Audit" form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newId = newAudit.id || `AUD-${String(audits.length + 1).padStart(3, '0')}`;
    const auditToAdd = {
      ...newAudit,
      id: newId,
      // No longer need to set 'report' text, it's determined by 'reportFile'
    };
    
    setAudits([...audits, auditToAdd]); // Add the new audit to the list
    setIsFormModalOpen(false); // Close the modal
    setNewAudit(initialFormState); // Reset the form
  };

  // Handles clicking the "View" button on a row
  const handleViewClick = (audit) => {
    setSelectedAudit(audit); // Set the audit to be viewed
    setIsViewModalOpen(true); // Open the view modal
  };

  // NEW: Handles clicking the "Delete" button
  const handleDeleteClick = (auditId) => {
    // Add a confirmation dialog before deleting
    if (window.confirm(`Are you sure you want to delete audit ${auditId}?`)) {
      setAudits(audits.filter(audit => audit.id !== auditId));
    }
  };

  // --- JSX (Render) ---
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Component Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">1. Quality Audits and Compliance</h2>
        <button
          onClick={() => setIsFormModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Schedule New Audit
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audit ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> {/* NEW: Actions Column */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {audits.map((audit) => (
              <tr key={audit.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{audit.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{audit.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{audit.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {/* Logic for View button */}
                  {audit.reportFile ? (
                    <button
                      onClick={() => handleViewClick(audit)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View
                    </button>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
                {/* NEW: Delete Button Cell */}
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleDeleteClick(audit.id)}
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

      {/* 1. Schedule New Audit Form Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center overflow-y-auto p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Schedule New Audit</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700">Audit ID (Optional)</label>
                <input
                  type="text"
                  name="id"
                  id="id"
                  value={newAudit.id}
                  onChange={handleFormChange}
                  placeholder="e.g., AUD-003"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={newAudit.date}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  id="status"
                  value={newAudit.status}
                  onChange={handleFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Scheduled</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div>
                <label htmlFor="details" className="block text-sm font-medium text-gray-700">Details</label>
                <textarea
                  name="details"
                  id="details"
                  rows="3"
                  value={newAudit.details}
                  onChange={handleFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              {/* NEW: File Upload Section */}
              <div>
                <label htmlFor="reportFile" className="block text-sm font-medium text-gray-700">Upload Report (Optional)</label>
                <input
                  type="file"
                  name="reportFile"
                  id="reportFile"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Save Audit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. View Audit Details Modal (Updated for file) */}
      {isViewModalOpen && selectedAudit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Audit Details: {selectedAudit.id}</h3>
            <div className="space-y-3">
              <p><strong className="text-gray-600">Date:</strong> {selectedAudit.date}</p>
              <p><strong className="text-gray-600">Status:</strong> {selectedAudit.status}</p>
              
              {/* Report File Section */}
              {selectedAudit.reportFile ? (
                <div className="border-t pt-3 mt-3">
                  <strong className="text-gray-600">Report File:</strong>
                  <div className="flex items-center justify-between mt-2 p-3 bg-gray-50 rounded-md">
                    <span className="text-gray-700 truncate">{selectedAudit.reportFile.name}</span>
                    <button 
                      className="ml-4 text-sm bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                      onClick={() => alert('This would start the file download.')}
                    >
                      Download
                    </button>
                  </div>
                </div>
              ) : null}

              <p className="border-t pt-3 mt-3"><strong className="text-gray-600">Details:</strong></p>
              <p className="text-gray-700">{selectedAudit.details || 'No details provided.'}</p>
            </div>
            <div className="flex justify-end pt-6">
              <button
                type="button"
                onClick={() => setIsViewModalOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default QualityAuditsCompliance;