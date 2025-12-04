// src/pages/PMC/PMCBudget/BudgetModal.jsx

import React from 'react';

const BudgetModal = ({ isOpen, onClose, onSubmit, formData, onChange, editingItem }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} 
    >
      <div 
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg"
        onClick={e => e.stopPropagation()} 
      >
        <h2 className="text-2xl font-semibold mb-6">
          {editingItem ? 'Edit Line Item' : 'Add New Line Item'}
        </h2>

        <form onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                id="category"
                value={formData.category}
                onChange={onChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="item" className="block text-sm font-medium text-gray-700">Line Item</label>
              <input
                type="text"
                name="item"
                id="item"
                value={formData.item}
                onChange={onChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="allocated" className="block text-sm font-medium text-gray-700">Allocated</label>
              <input
                type="number"
                name="allocated"
                id="allocated"
                value={formData.allocated}
                onChange={onChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="actual" className="block text-sm font-medium text-gray-700">Actual Spend</label>
              <input
                type="number"
                name="actual"
                id="actual"
                value={formData.actual}
                onChange={onChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="flex justify-end mt-8">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {editingItem ? 'Update Item' : 'Save Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetModal;