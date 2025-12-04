import { useState, useEffect } from 'react';

function ChangeOrderModal({ isOpen, onClose, onSave, order }) {
  const [formData, setFormData] = useState({
    title: '',
    project: '',
    status: 'Pending',
    amount: 0,
  });

  useEffect(() => {
    if (order) {
      setFormData(order);
    } else {
      setFormData({ title: '', project: '', status: 'Pending', amount: 0 });
    }
  }, [order, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">{order ? 'Edit Change Order' : 'Create New Change Order'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text" name="title" id="title" value={formData.title} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="project" className="block text-sm font-medium text-gray-700">Project</label>
            <input
              type="text" name="project" id="project" value={formData.project} onChange={handleChange}
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
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Save Change Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ChangeOrderModal;