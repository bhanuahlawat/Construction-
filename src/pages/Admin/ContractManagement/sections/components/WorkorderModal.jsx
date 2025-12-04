import { useState, useEffect } from 'react';

function WorkorderModal({ isOpen, onClose, onSave, workorder }) {
  const [formData, setFormData] = useState({
    description: '',
    subcontractor: '',
    status: 'Pending',
    hours: 0,
  });

  useEffect(() => {
    if (workorder) {
      setFormData(workorder);
    } else {
      setFormData({ description: '', subcontractor: '', status: 'Pending', hours: 0 });
    }
  }, [workorder, isOpen]);

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
        <h2 className="text-xl font-semibold mb-4">{workorder ? 'Edit Workorder' : 'Create New Workorder'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text" name="description" id="description" value={formData.description} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subcontractor" className="block text-sm font-medium text-gray-700">Subcontractor</label>
            <input
              type="text" name="subcontractor" id="subcontractor" value={formData.subcontractor} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="hours" className="block text-sm font-medium text-gray-700">Estimated Hours</label>
            <input
              type="number" name="hours" id="hours" value={formData.hours} onChange={handleChange}
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
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Save Workorder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default WorkorderModal;