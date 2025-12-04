import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const EditTenderModal = ({ isOpen, onClose, tender, onSave }) => {
  const [formData, setFormData] = useState({ id: null, name: '', deadline: '' });

  // When the 'tender' prop changes, update the form data
  useEffect(() => {
    if (tender) {
      setFormData({
        id: tender.id,
        name: tender.name,
        deadline: tender.deadline,
        status: tender.status, // Keep status, though we aren't editing it
      });
    }
  }, [tender]);

  if (!tender) {
    return null;
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass the updated data back to the parent
    onClose(); // Close the modal
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Draft Tender">
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
            required
          />
        </div>
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
            Deadline
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
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTenderModal;