import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const TaskList = ({ tasks, onAddTask, onDeleteTask }) => {
  return (
    <div>
      <button 
        className="bg-gray-200 text-gray-800 text-sm py-1 px-3 rounded-md hover:bg-gray-300 mb-4 flex items-center gap-2"
        onClick={onAddTask}
      >
        <FaPlus />
        Assign New Task
      </button>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          {/* ... table head ... */}
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600">Task Name</th>
              <th className="p-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600">Assigned To</th>
              <th className="p-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="p-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600">Due Date</th>
              <th className="p-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-200 text-sm">{task.name}</td>
                <td className="p-3 border-b border-gray-200 text-sm">{task.assignedTo}</td>
                <td className="p-3 border-b border-gray-200 text-sm">{task.status}</td>
                <td className="p-3 border-b border-gray-200 text-sm">{task.dueDate}</td>
                <td className="p-3 border-b border-gray-200 text-sm">
                  <button 
                    onClick={() => onDeleteTask(task.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Task"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;