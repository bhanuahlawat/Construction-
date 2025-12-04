import React from 'react';
import { FaPlus } from 'react-icons/fa';
import Modal from './Modal'; // Use our generic modal

const AddMemberModal = ({ isOpen, onClose, onSave, teamName }) => {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const { memberName, memberRole, memberEmail } = event.target.elements;
    onSave({
      name: memberName.value,
      role: memberRole.value,
      email: memberEmail.value
    });
  };

  return (
    <Modal onClose={onClose} title={`Add Member to ${teamName}`}>
      <form onSubmit={handleSubmit}>
        {/* ... form inputs ... */}
        <div className="mb-4">
          <label htmlFor="memberName" className="block mb-2 text-sm font-medium text-gray-700">Member Name</label>
          <input type="text" id="memberName" name="memberName" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required autoFocus />
        </div>
        <div className="mb-4">
          <label htmlFor="memberRole" className="block mb-2 text-sm font-medium text-gray-700">Member Role</label>
          <input type="text" id="memberRole" name="memberRole" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
        </div>
        <div className="mb-4">
          <label htmlFor="memberEmail" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="memberEmail" name="memberEmail" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          <FaPlus />
          Save Member
        </button>
      </form>
    </Modal>
  );
};

export default AddMemberModal;