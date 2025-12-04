// NewHireModal.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';

const NewHireModal = ({ onClose, onSave }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && role) {
            onSave({ name, role });
            // Alert is handled in the parent component, EmployeeListPage
            onClose();
        } else {
            alert('Please enter both name and role.');
        }
    };

    return (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center border-b pb-3">
                    <h3 className="text-xl font-bold text-gray-900">Add New Employee</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role/Title</label>
                        <input
                            id="role"
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                        >
                            Add Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewHireModal;