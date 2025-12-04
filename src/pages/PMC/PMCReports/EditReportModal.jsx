import React, { useState, useEffect } from 'react';

const EditReportModal = ({ isOpen, onClose, onSave, report }) => {
  // Internal state for the form, initialized from the report prop
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');

  // When the 'report' prop changes (i.e., when the modal is opened),
  // update the internal form state.
  useEffect(() => {
    if (report) {
      setName(report.name || '');
      setType(report.type || 'Project Progress');
      setStatus(report.status || 'Pending');
      setDescription(report.description || '');
    }
  }, [report]);

  if (!isOpen || !report) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert('Report name is required.');
      return;
    }
    
    // Pass back the updated data
    onSave({
      name,
      type,
      status,
      description,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Edit Report</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="editReportName" className="block text-sm font-medium text-gray-700 mb-1">Report Name</label>
              <input
                type="text"
                id="editReportName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              />
            </div>
            
            <div>
              <label htmlFor="editReportType" className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <select
                id="editReportType"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="Budget Overview">Budget Overview</option>
                <option value="Project Progress">Project Progress</option>
                <option value="Team Performance">Team Performance</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="editReportStatus" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                id="editReportStatus"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            
             <div>
              <label htmlFor="editReportDesc" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="editReportDesc"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                placeholder="Add a brief description..."
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReportModal;