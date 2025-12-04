import React, { useState } from 'react';

const GenerateReportModal = ({ isOpen, onClose, onGenerate }) => {
  // Internal state for the modal's form
  const [reportName, setReportName] = useState('');
  const [reportType, setReportType] = useState('Project Progress');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reportName) {
      alert('Please enter a report name.');
      return;
    }

    // Pass the new report data back to the parent
    onGenerate({
      name: reportName,
      type: reportType,
      date: new Date().toISOString().split('T')[0], // Use today's date as creation date
      // Note: You could also pass startDate/endDate if they are relevant
    });

    // Reset form and close modal
    setReportName('');
    setReportType('Project Progress');
    setStartDate('');
    setEndDate('');
    onClose();
  };

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Panel */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Generate New Report</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-800"
          >
            {/* Simple 'X' icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="reportName" className="block text-sm font-medium text-gray-700 mb-1">Report Name</label>
              <input
                type="text"
                id="reportName"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                placeholder="e.g., Q4 Financial Summary"
              />
            </div>
            
            <div>
              <label htmlFor="modalReportType" className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <select
                id="modalReportType"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="Budget Overview">Budget Overview</option>
                <option value="Project Progress">Project Progress</option>
                <option value="Team Performance">Team Performance</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="modalStartDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date (Optional)</label>
                <input
                  type="date"
                  id="modalStartDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                />
              </div>
              <div>
                <label htmlFor="modalEndDate" className="block text-sm font-medium text-gray-700 mb-1">End Date (Optional)</label>
                <input
                  type="date"
                  id="modalEndDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                />
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
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
              Generate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateReportModal;