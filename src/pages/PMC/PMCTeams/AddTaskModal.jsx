import React from 'react';
import { FaPlus } from 'react-icons/fa';
import Modal from './Modal'; // Use our generic modal

const AddTaskModal = ({ isOpen, onClose, onSave, teamName, teamMembers = [] }) => {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const { taskName, assignedTo, status, dueDate } = event.target.elements;
    onSave({
      name: taskName.value,
      assignedTo: assignedTo.value,
      status: status.value,
      dueDate: dueDate.value
    });
  };

  return (
    <Modal onClose={onClose} title={`Add Task for ${teamName}`}>
      <form onSubmit={handleSubmit}>
        {/* ... form inputs ... */}
        <div className="mb-4">
          <label htmlFor="taskName" className="block mb-2 text-sm font-medium text-gray-700">Task Name</label>
          <input type="text" id="taskName" name="taskName" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required autoFocus />
        </div>
        
        <div className="mb-4">
          <label htmlFor="assignedTo" className="block mb-2 text-sm font-medium text-gray-700">Assigned To</label>
          <select 
            id="assignedTo" 
            name="assignedTo" 
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white" 
            required
            defaultValue=""
          >
            <option value="" disabled>Select a member</option>
            {teamMembers?.map(member => (
              <option key={member.id} value={member.id}>
                {member.name} ({member.role})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-700">Status</label>
          <select 
            id="status" 
            name="status" 
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white" 
            defaultValue="Pending"
            required
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="dueDate" className="block mb-2 text-sm font-medium text-gray-700">Due Date</label>
          <input type="date" id="dueDate" name="dueDate" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          <FaPlus />
          Save Task
        </button>
      </form>
    </Modal>
  );
};

export default AddTaskModal;