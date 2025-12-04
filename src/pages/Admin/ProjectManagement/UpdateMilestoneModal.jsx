import React from 'react';

const UpdateMilestoneModal = ({ isOpen, onClose, onSave, milestoneData, updateForm, setUpdateForm }) => {
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                <h3 className="text-2xl font-bold text-indigo-700 mb-4">Update Milestone Progress</h3>
                <form onSubmit={onSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Milestone</label>
                        <select
                            value={updateForm.milestoneId}
                            onChange={(e) => setUpdateForm({...updateForm, milestoneId: e.target.value})}
                            required
                            className="w-full border border-gray-300 p-2 rounded-lg"
                        >
                            <option value="">-- Choose Milestone --</option>
                            {milestoneData.map(m => (
                                <option key={m.id} value={m.id}>
                                    {m.milestone} ({m.completion}%)
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Completion Percentage</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            step="5"
                            value={updateForm.completion}
                            onChange={(e) => setUpdateForm({...updateForm, completion: e.target.value})}
                            required
                            className="w-full border border-gray-300 p-2 rounded-lg text-lg font-bold"
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
                            Save Progress
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateMilestoneModal;