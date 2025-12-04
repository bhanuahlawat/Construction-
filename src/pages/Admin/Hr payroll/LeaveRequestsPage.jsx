import React, { useState } from 'react';
import { Send, Plus, CheckCircle, MinusCircle, FileText } from 'lucide-react';

const LeaveRequestsPage = ({ initialRequests, employees }) => {
    // Admin uses local state to manage approvals/rejections
    const [requests, setRequests] = useState(initialRequests);

    // Function to handle Approval/Rejection actions
    const handleAction = (id, newStatus) => {
        setRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
        console.log(`Request ID ${id} status updated to: ${newStatus}`);
        
        if (newStatus === 'Approved') {
            alert(`Leave Request Approved! Employee's status needs to be updated for the dates: ${requests.find(r => r.id === id).startDate} to ${requests.find(r => r.id === id).endDate}`);
        } else if (newStatus === 'Rejected') {
            alert("Leave Request Rejected.");
        }
    };

    const getStatusClasses = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-3 sm:mb-0">
                    <Send className="w-6 h-6 mr-3 text-indigo-500 transform -rotate-45" /> Leave Requests Management ({requests.filter(r => r.status === 'Pending').length} Pending)
                </h2>
                <button className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-150 flex items-center">
                    <Plus className="w-5 h-5 mr-2" /> New Request (Self-Service)
                </button>
            </div>

            {/* Table view for large screens */}
            <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {requests.map((req) => (
                            <tr key={req.id} className="hover:bg-indigo-50/50 transition">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{req.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {req.startDate} to {req.endDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(req.status)}`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    {/* Action Buttons - ACTIVATED */}
                                    {req.status === 'Pending' ? (
                                        <>
                                            <button
                                                onClick={() => handleAction(req.id, 'Approved')}
                                                className="text-green-600 hover:text-green-900 transition flex items-center text-sm"
                                            >
                                                <CheckCircle className="w-4 h-4 mr-1" /> Approve
                                            </button>
                                            <button
                                                onClick={() => handleAction(req.id, 'Rejected')}
                                                className="text-red-600 hover:text-red-900 transition flex items-center text-sm"
                                            >
                                                <MinusCircle className="w-4 h-4 mr-1" /> Reject
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-gray-400">Review Complete</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Card view for small screens */}
            <div className="md:hidden grid grid-cols-1 gap-4">
                {requests.map((req) => (
                    <div key={req.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:bg-indigo-50/50 transition">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-medium text-gray-900">{req.name}</h3>
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(req.status)}`}>
                                {req.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Type: {req.type}</p>
                        <p className="text-sm text-gray-600 mb-3">Duration: {req.startDate} to {req.endDate}</p>
                        <div className="flex space-x-2">
                            {req.status === 'Pending' ? (
                                <>
                                    <button
                                        onClick={() => handleAction(req.id, 'Approved')}
                                        className="text-green-600 hover:text-green-900 transition flex items-center text-sm"
                                    >
                                        <CheckCircle className="w-4 h-4 mr-1" /> Approve
                                    </button>
                                    <button
                                        onClick={() => handleAction(req.id, 'Rejected')}
                                        className="text-red-600 hover:text-red-900 transition flex items-center text-sm"
                                    >
                                        <MinusCircle className="w-4 h-4 mr-1" /> Reject
                                    </button>
                                </>
                            ) : (
                                <span className="text-gray-400 text-sm">Review Complete</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                <p className="font-semibold">Note:</p>
                <p>As the Admin, you manage approvals. Approving a leave request would typically trigger a backend job to update the Attendance Tracker and payroll records.</p>
            </div>
        </div>
    );
};

export default LeaveRequestsPage;