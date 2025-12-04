// AttendanceTrackerPage.jsx
import React, { useState, useMemo, useCallback } from 'react';
import { Calendar, Plus, CheckCircle, XCircle } from 'lucide-react';
// FIX: Cleaned up and renamed import to match the exported name below
import AttendanceModal from './AttendenceModal'; 
// Note: You should save the modal file as AttendanceModal.jsx

const AttendanceTrackerPage = ({ employees, initialData }) => {
    const [attendanceData, setAttendanceData] = useState(initialData);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal
    const today = useMemo(() => new Date().toISOString().split('T')[0], []);

    const handleToggleAttendance = useCallback((empId) => {
        // ... (Clock In/Out logic remains the same)
        setAttendanceData(prevData => {
            const employee = employees.find(e => e.id === empId);
            if (!employee || employee.status !== 'Active') return prevData;

            const existingEntryIndex = prevData.findIndex(item => item.empId === empId && item.date === today);
            const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

            if (existingEntryIndex > -1 && prevData[existingEntryIndex].status === 'Present' && !prevData[existingEntryIndex].checkOut) {
                // Clock out
                const updatedData = [...prevData];
                updatedData[existingEntryIndex].checkOut = nowTime;
                return updatedData;
            } else if (existingEntryIndex === -1 || (existingEntryIndex > -1 && prevData[existingEntryIndex].checkOut)) {
                // Clock in or New Entry
                const newEntry = {
                    empId,
                    date: today,
                    status: 'Present',
                    checkIn: nowTime,
                    checkOut: null,
                };
                const filteredData = prevData.filter(item => item.empId !== empId || item.date !== today);
                return [...filteredData, newEntry];
            }
            return prevData;
        });
    }, [employees, today]);

    // New function to handle manual entries from the modal
    const handleManualEntry = useCallback((newEntry) => {
        setAttendanceData(prevData => {
            // Remove any existing entry for this employee/date before adding the new one (upsert logic)
            const filteredData = prevData.filter(item => 
                !(item.empId === newEntry.empId && item.date === newEntry.date)
            );
            return [...filteredData, newEntry];
        });
        alert(`Attendance manually logged for Employee ID ${newEntry.empId} on ${newEntry.date}.`);
    }, []);

    return (
        <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-3 sm:mb-0">
                    <Calendar className="w-6 h-6 mr-3 text-indigo-500" /> Daily Attendance Log: <span className="text-indigo-600 ml-2">{today}</span>
                </h2>
                {/* Manual Entry Button - ACTIVATED */}
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-150 flex items-center"
                >
                    <Plus className="w-5 h-5 mr-2" /> Submit Manual Entry
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees.map((emp) => {
                    // Find the most relevant attendance record for today (handling cases where initialData has old dates)
                    const currentEntry = attendanceData.find(item => item.empId === emp.id && item.date === today) || 
                                         attendanceData.find(item => item.empId === emp.id && item.date === '2025-11-01' && today !== '2025-11-01');

                    const isClockedIn = currentEntry && currentEntry.status === 'Present' && !currentEntry.checkOut;
                    
                    // Logic to determine display status for today if no entry exists
                    const displayStatus = currentEntry?.status || (emp.status === 'Active' ? 'Absent' : emp.status);

                    return (
                        <div key={emp.id} className={`p-5 border rounded-xl shadow-md transition-all ${
                            isClockedIn ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                        }`}>
                            <h3 className="text-lg font-bold text-gray-900 flex justify-between items-start">
                                {emp.name}
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                    emp.status === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                                }`}>{emp.status}</span>
                            </h3>
                            <p className="text-sm text-gray-500 mb-3">{emp.role}</p>
                            
                            <div className="space-y-1 text-sm bg-white p-3 rounded-lg border">
                                <p><strong>Check In:</strong> <span className="font-mono ml-1">{currentEntry?.checkIn || '-'}</span></p>
                                <p><strong>Check Out:</strong> <span className="font-mono ml-1">{currentEntry?.checkOut || (isClockedIn ? 'Working...' : '-')}</span></p>
                                <p className="pt-2"><strong>Daily Status:</strong> 
                                    <span className={`font-bold ml-1 ${
                                        displayStatus === 'Present' ? 'text-green-600' : 
                                        displayStatus === 'Leave' ? 'text-yellow-600' : 'text-red-600'
                                    }`}>
                                        {displayStatus}
                                    </span>
                                </p>
                            </div>

                            {emp.status === 'Active' && (
                                <button
                                    onClick={() => handleToggleAttendance(emp.id)}
                                    className={`w-full mt-4 py-2 font-semibold rounded-lg transition duration-150 flex items-center justify-center ${
                                        isClockedIn 
                                            ? 'bg-red-600 hover:bg-red-700 text-white shadow-md' 
                                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                                    }`}
                                >
                                    {isClockedIn ? (
                                        <>
                                            <XCircle className="w-5 h-5 mr-2" /> Clock Out Now
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-5 h-5 mr-2" /> Clock In Now
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Render the Manual Entry Modal */}
            {isModalOpen && (
                <AttendanceModal // FIX: Changed component tag name to match import
                    employees={employees} 
                    onClose={() => setIsModalOpen(false)} 
                    onSave={handleManualEntry} 
                />
            )}
        </div>
    );
};

export default AttendanceTrackerPage;