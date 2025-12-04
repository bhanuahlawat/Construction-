import React from 'react';

const ViewReportModal = ({ isOpen, onClose, report }) => {
  if (!isOpen || !report) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{report.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <span className="text-sm font-medium text-gray-500">Report Type</span>
            <p className="text-gray-800">{report.type}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Date</span>
            <p className="text-gray-800">{report.date}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Status</span>
            <p className={`text-sm font-semibold ${
              report.status === 'Completed' ? 'text-green-800' :
              report.status === 'In Progress' ? 'text-yellow-800' :
              'text-red-800'
            }`}>
              {report.status}
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Description / Details</span>
            <p className="text-gray-800 mt-1">
              {report.description || 'No description provided.'}
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewReportModal;