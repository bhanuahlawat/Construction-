// pages/Admin/UserManagement/AssignmentPanel.jsx

import React from 'react';
import { FaHammer } from 'react-icons/fa';

/**
 * Component for the task assignment form.
 * Receives mockTasks data via props.
 */
const AssignmentPanel = ({ selectedUser, assignment, setAssignment, handleAssignTask, mockTasks }) => {

    return (
        <div className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-lg border-2 border-indigo-300">
            <h2 className="text-xl font-bold text-indigo-800 mb-2 flex items-center gap-2">
                <FaHammer className="text-indigo-600" /> Assign Task
            </h2>
            <p className="text-sm text-gray-600 mb-5">Delegating work to <strong>{selectedUser.name}</strong> ({selectedUser.role})</p>

            <form onSubmit={handleAssignTask} className="space-y-4">

                {/* Task Selection */}
                <div>
                    <label htmlFor="taskId" className="block text-sm font-medium text-gray-700 mb-1">
                        Select Task or Milestone to Assign
                    </label>
                    <select
                        id="taskId"
                        value={assignment.taskId}
                        onChange={(e) => setAssignment({...assignment, taskId: e.target.value})}
                        required
                        className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-teal-500 focus:border-teal-500 text-sm shadow-sm"
                    >
                        <option value="">-- Choose a Task --</option>
                        {mockTasks.map(task => (
                            <option key={task.id} value={task.id}>
                                {task.name} ({task.project})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Due Date */}
                <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date
                    </label>
                    <input
                        type="date"
                        id="dueDate"
                        value={assignment.dueDate}
                        onChange={(e) => setAssignment({...assignment, dueDate: e.target.value})}
                        required
                        className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-teal-500 focus:border-teal-500 text-sm shadow-sm"
                    />
                </div>

                {/* Notes/Description (Optional) */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Assignment Notes
                    </label>
                    <textarea
                        id="description"
                        rows="3"
                        className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-teal-500 focus:border-teal-500 shadow-sm text-sm"
                        placeholder="E.g., Focus on concrete strength reports."
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-br from-indigo-600 to-purple-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.005] hover:shadow-xl text-base"
                >
                    Confirm Assignment
                </button>
            </form>
        </div>
    );
};

export default AssignmentPanel;