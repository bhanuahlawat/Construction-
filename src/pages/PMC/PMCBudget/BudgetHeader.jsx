// src/pages/PMC/PMCBudget/BudgetHeader.jsx

import React from 'react';

const BudgetHeader = ({ onAddNew }) => {
  return (
    <div className="flex justify-between items-center mb-6 border-b-2 border-gray-200 pb-4">
      <h1 className="text-3xl font-semibold text-gray-800">
        Project Budget Management
      </h1>
      <button 
        onClick={onAddNew}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-sm font-medium transition-colors hover:bg-blue-700"
      >
        + Add New Line Item
      </button>
    </div>
  );
};

export default BudgetHeader;