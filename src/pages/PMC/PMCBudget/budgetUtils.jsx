// src/pages/PMC/PMCBudget/budgetUtils.js

export const formatCurrency = (amount) => {
  return '$' + amount.toLocaleString();
};

export const getVarianceClass = (variance) => {
  if (variance < 0) return 'text-red-600';
  if (variance > 0) return 'text-green-600';
  return 'text-gray-600';
};