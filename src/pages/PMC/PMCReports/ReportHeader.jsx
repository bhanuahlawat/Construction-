import React from 'react';

// Receive onGenerateReport and onUploadReport as props
const ReportHeader = ({ onGenerateReport, onUploadReport }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800">PMC Reports</h1>
      <div className="flex space-x-3">
        <button 
          onClick={onUploadReport}
          className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-gray-50 focus:outline-none"
        >
          Upload Report
        </button>
        <button 
          onClick={onGenerateReport} // This opens the modal
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Generate New Report
        </button>
      </div>
    </div>
  );
};

export default ReportHeader;