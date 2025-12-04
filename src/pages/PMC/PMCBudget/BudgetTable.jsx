// src/pages/PMC/PMCBudget/BudgetTable.jsx

import React from 'react';
import { formatCurrency, getVarianceClass } from './budgetUtils';

const BudgetTable = ({ budgetItems, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Line Item</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Allocated</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actual Spend</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Variance</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {budgetItems.map((item) => {
              const variance = item.allocated - item.actual;
              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-4 whitespace-nowrap text-sm text-gray-700">{item.category}</td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-900 font-medium">{item.item}</td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(item.allocated)}</td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(item.actual)}</td>
                  <td className={`p-4 whitespace-nowrap text-sm font-medium ${getVarianceClass(variance)}`}>
                    {formatCurrency(variance)}
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm">
                    <button 
                      onClick={() => onEdit(item)}
                      className="border border-gray-300 text-gray-700 py-1 px-3 rounded-md text-sm transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => onDelete(item.id)}
                      className="border border-red-500 text-red-500 py-1 px-3 rounded-md text-sm transition-all hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetTable;