// pages/Admin/UserManagement/ManagementPanel.jsx

import React from 'react';
import { FaCheckCircle, FaBan, FaLock, FaUserTag, FaHammer } from 'react-icons/fa';

/**
 * Component for managing the selected user's status and role.
 */
const ManagementPanel = ({ selectedUser, handleUpdateUserStatus, handleUpdateUserRole, ROLES, STATUSES }) => {

    return (
        <div className="p-5 bg-orange-50 rounded-2xl shadow-lg border border-orange-200">
            <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
                <FaHammer className="text-orange-600" /> Manage User: {selectedUser.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Status Control */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
                    <div className="flex flex-wrap gap-2">
                        <button onClick={() => handleUpdateUserStatus(STATUSES.ACTIVE)} disabled={selectedUser.status === STATUSES.ACTIVE}
                            className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg transition-colors shadow-sm ${selectedUser.status === STATUSES.ACTIVE ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
                            <FaCheckCircle /> Active
                        </button>
                        <button onClick={() => handleUpdateUserStatus(STATUSES.INACTIVE)} disabled={selectedUser.status === STATUSES.INACTIVE}
                            className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg transition-colors shadow-sm ${selectedUser.status === STATUSES.INACTIVE ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}>
                            <FaBan /> Inactive
                        </button>
                        <button onClick={() => handleUpdateUserStatus(STATUSES.SUSPENDED)} disabled={selectedUser.status === STATUSES.SUSPENDED}
                            className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg transition-colors shadow-sm ${selectedUser.status === STATUSES.SUSPENDED ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}>
                            <FaLock /> Suspend
                        </button>
                    </div>
                </div>

                {/* Role Control */}
                <div>
                    <label htmlFor="editUserRole" className="block text-sm font-medium text-gray-700 mb-1">Change Role</label>
                    <div className="relative">
                        <select
                            id="editUserRole"
                            value={selectedUser.role}
                            onChange={(e) => handleUpdateUserRole(e.target.value)}
                            className="w-full border border-gray-300 p-2.5 rounded-xl focus:ring-teal-500 focus:border-teal-500 text-sm shadow-sm appearance-none pr-8"
                        >
                            {Object.values(ROLES).map(r => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                        <FaUserTag className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagementPanel;