import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

const CreateProjectModal = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [client, setClient] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && client) {
            onCreate({ name, client });
            setName('');
            setClient('');
        }
    };

    return (
        <div className="fixed inset-0 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 border-t-4 border-indigo-600">
                <h3 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
                    <FaPlusCircle /> New Project Details
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            placeholder="e.g., High-Rise Tower B"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                        <input
                            type="text"
                            value={client}
                            onChange={(e) => setClient(e.target.value)}
                            required
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            placeholder="e.g., Mega Builders Ltd"
                        />
                    </div>
                    <div className="flex justify-end space-x-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
                        >
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectModal;