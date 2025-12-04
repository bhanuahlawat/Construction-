import React from 'react';
import { FaUserTag, FaSearch } from 'react-icons/fa';

const TeamRoster = ({ 
    team, 
    searchTerm, 
    setSearchTerm, 
    selectedUser, 
    handleUserSelect, 
    filteredTeam,
    // 💡 These props are new/updated in this scope:
    STATUSES, 
    getStatusColor 
}) => {

    // Ensure the getStatusColor function is available for styling the badge
    // (Note: getStatusColor must be defined in the parent or passed here)
    const renderStatusBadge = (userStatus) => {
        return (
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(userStatus)}`}>
                {userStatus}
            </span>
        );
    };

    return (
        <div className="lg:col-span-1 p-4 bg-white rounded-2xl shadow-lg border border-gray-100 h-fit">
            <div className="flex justify-between items-center mb-4 border-b pb-3 border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <FaUserTag className="text-gray-600" /> Team Roster ({filteredTeam.length} / {team.length})
                </h2>
            </div>
            
            {/* Search Input (logic remains the same) */}
            <div className="relative mb-4">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by name or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 text-sm shadow-sm"
                />
            </div>

            {/* User List */}
            <div className="space-y-3 max-h-[350px] sm:max-h-[450px] lg:max-h-[600px] overflow-y-auto pr-2">
                {filteredTeam.length > 0 ? (
                    filteredTeam.map(user => (
                        <div
                            key={user.id}
                            onClick={() => handleUserSelect(user)}
                            className={`p-3 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer transition-all duration-200 gap-2
                                ${selectedUser && selectedUser.id === user.id
                                    ? 'bg-teal-50 border-2 border-teal-400 shadow-md transform scale-[1.01]'
                                    : 'hover:bg-gray-100 hover:shadow-sm border-2 border-transparent'}
                                ${user.status === STATUSES.SUSPENDED ? 'opacity-60 grayscale' : ''}
                            `}
                        >
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                                <p className="text-xs text-teal-600 font-medium">{user.role}</p>
                            </div>
                            {/* Rendering the status badge using the passed function */}
                            {renderStatusBadge(user.status)}
                        </div>
                    ))
                ) : (
                    <div className="text-center p-4 text-gray-500">No users match your search criteria.</div>
                )}
            </div>
        </div>
    );
};

export default TeamRoster;