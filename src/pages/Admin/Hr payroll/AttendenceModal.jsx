// AttendanceModal.jsx (Save this file with this name)
import React, { useState } from 'react';
import { X, CheckCircle, Plus } from 'lucide-react'; // Added Plus for the title

const AttendanceModal = ({ employees, onClose, onSave }) => { // FIX: Renamed component to AttendanceModal
    const [empId, setEmpId] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [status, setStatus] = useState('Present'); // Default status

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!empId || !date || (status === 'Present' && (!checkIn || !checkOut))) {
            alert('Please fill in all required fields (Employee, Date, and Check In/Out times for Present status).');
            return;
        }

        const newEntry = {
            empId: parseInt(empId),
            date,
            status,
            checkIn: status === 'Present' ? checkIn : '-',
            checkOut: status === 'Present' ? checkOut : '-',
        };
        
        onSave(newEntry);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50"> 
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
                <div className="flex justify-between items-center border-b pb-3">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center"><Plus className="w-5 h-5 mr-2 text-green-600" /> Submit Manual Attendance</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="employee" className="block text-sm font-medium text-gray-700">Employee</label>
                            <select
                                id="employee"
                                value={empId}
                                onChange={(e) => setEmpId(e.target.value)}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            >
                                <option value="">Select Employee</option>
                                {employees.filter(e => e.status === 'Active').map(emp => (
                                    <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            >
                                <option value="Present">Present</option>
                                <option value="Absent">Absent</option>
                                <option value="Leave">On Leave</option>
                            </select>
                        </div>
                        <div className={status !== 'Present' ? 'opacity-50 pointer-events-none' : ''}>
                            <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">Check In (Time)</label>
                            <input
                                id="checkIn"
                                type="time"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                disabled={status !== 'Present'}
                            />
                        </div>
                        <div className={status !== 'Present' ? 'opacity-50 pointer-events-none' : ''}>
                            <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">Check Out (Time)</label>
                            <input
                                id="checkOut"
                                type="time"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                disabled={status !== 'Present'}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition flex items-center"
                        >
                            <CheckCircle className="w-4 h-4 mr-2" /> Submit Entry
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AttendanceModal;
