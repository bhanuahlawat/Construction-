// src/pages/PMC/PMCBudget/BudgetSummary.jsx

import React from 'react';
import { formatCurrency, getVarianceClass } from './budgetUtils';

const BudgetSummary = ({ totalAllocated, totalActual, totalVariance }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Allocated Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-base text-gray-500 mb-3 font-medium">
          Total Allocated Budget
        </h3>
        <p className="text-3xl font-bold text-gray-900">
          {formatCurrency(totalAllocated)}
        </p>
      </div>
      {/* Total Actual Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-base text-gray-500 mb-3 font-medium">
          Total Actual Spend
        </h3>
        <p className="text-3xl font-bold text-gray-900">
          {formatCurrency(totalActual)}
        </p>
      </div>
      {/* Variance Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-base text-gray-500 mb-3 font-medium">
          Remaining (Variance)
        </h3>
        <p className={`text-3xl font-bold ${getVarianceClass(totalVariance)}`}>
          {formatCurrency(totalVariance)}
        </p>
      </div>
    </div>
  );
};

export default BudgetSummary;