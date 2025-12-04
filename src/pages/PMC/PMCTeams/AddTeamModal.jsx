import React from 'react';
import { FaPlus } from 'react-icons/fa';
import Modal from './Modal'; // Use our generic modal

const AddTeamModal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const { teamName, projectName } = event.target.elements;
    onSave({ 
      name: teamName.value, 
      project: projectName.value 
    });
  };

  return (
    <Modal onClose={onClose} title="Add New Team">
      <form onSubmit={handleSubmit}>
        {/* ... form inputs ... */}
        <div className="mb-4">
          <label htmlFor="teamName" className="block mb-2 text-sm font-medium text-gray-700">Team Name</label>
          <input type="text" id="teamName" name="teamName" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required autoFocus />
        </div>
        <div className="mb-4">
          <label htmlFor="projectName" className="block mb-2 text-sm font-medium text-gray-700">Project Name</label>
          <input type="text" id="projectName" name="projectName" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          <FaPlus />
          Save Team
        </button>
      </form>
    </Modal>
  );
};

export default AddTeamModal;