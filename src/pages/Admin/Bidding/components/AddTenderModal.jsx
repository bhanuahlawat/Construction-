
import React, { useState } from 'react';
import Modal from './Modal';

const AddTenderModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    deadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.deadline) {
      alert('Please fill out all fields.');
      return;
    }
    // Pass the new tender data back to the parent component
    onAdd(formData);
    setFormData({ name: '', deadline: '' }); // Reset form
    onClose(); // Close the modal
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Tender">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Tender Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="e.g., Downtown Office Renovation"
            required
          />
        </div>
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
            Submission Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Create Tender
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTenderModal;