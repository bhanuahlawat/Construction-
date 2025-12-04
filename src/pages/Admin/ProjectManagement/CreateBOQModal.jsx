import React, { useState } from 'react';
import { FaListAlt } from 'react-icons/fa';

const CreateBOQModal = ({ isOpen, onClose, onCreate }) => {
    const [boqName, setBoqName] = useState('');
    const [template, setTemplate] = useState('Standard Civil');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (boqName) {
            onCreate({ boqName, template });
            setBoqName('');
            setTemplate('Standard Civil');
        }
    };

    return (
        <div className="fixed inset-0 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 border-t-4 border-purple-600">
                <h3 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                    <FaListAlt /> Generate New BOQ
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">BOQ Name</label>
                        <input
                            type="text"
                            value={boqName}
                            onChange={(e) => setBoqName(e.target.value)}
                            required
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            placeholder="e.g., Phase 1 - Structural BOQ"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Template</label>
                        <select
                            value={template}
                            onChange={(e) => setTemplate(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                        >
                            <option>Standard Civil</option>
                            <option>MEP Works</option>
                            <option>Interior Finishes</option>
                        </select>
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
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
                        >
                            Generate BOQ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBOQModal;