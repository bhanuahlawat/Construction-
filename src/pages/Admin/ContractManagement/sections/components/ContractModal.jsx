import { useState, useEffect } from 'react';

function ContractModal({ isOpen, onClose, onSave, contract }) {
  const [formData, setFormData] = useState({
    title: '',
    vendor: '',
    status: 'Draft',
    amount: 0,
  });

  // This effect runs when the modal is opened.
  // If we are editing a contract, it populates the form with that contract's data.
  useEffect(() => {
    if (contract) {
      setFormData(contract);
    } else {
      // Otherwise, it resets the form for creating a new contract.
      setFormData({ title: '', vendor: '', status: 'Draft', amount: 0 });
    }
  }, [contract, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Send the data back to the parent component
    onClose(); // Close the modal
  };

  if (!isOpen) return null; // Don't render anything if the modal is closed

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-xs">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">{contract ? 'Edit Contract' : 'Create New Contract'}</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text" name="title" id="title" value={formData.title} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="vendor" className="block text-sm font-medium text-gray-700">Vendor</label>
            <input
              type="text" name="vendor" id="vendor" value={formData.vendor} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount ($)</label>
            <input
              type="number" name="amount" id="amount" value={formData.amount} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status" id="status" value={formData.status} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Draft">Draft</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button" onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Contract
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ContractModal;