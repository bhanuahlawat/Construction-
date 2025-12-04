import React, { useState, useEffect } from 'react';

// --- Mock data for different dates ---
// In a real app, you'd fetch this from an API
const mockAttendanceData = {
    '2025-11-03': [
        { id: 101, name: 'Ravi Kumar', department: 'Site Engineers', status: 'Present' },
        { id: 102, name: 'Sunita Sharma', department: 'Site Engineers', status: 'Present' },
        { id: 103, name: 'Anil Gupta', department: 'Site Engineers', status: 'On Leave' },
        { id: 104, name: 'Priya Singh', department: 'Accounts', status: 'Present' },
        { id: 105, name: 'Sanjay Verma', department: 'Labour', status: 'Present' },
        { id: 106, name: 'Deepak Patel', department: 'Labour', status: 'Absent' },
        { id: 107, name: 'Meena Reddy', department: 'Management', status: 'Present' },
    ],
    '2025-11-02': [
        { id: 101, name: 'Ravi Kumar', department: 'Site Engineers', status: 'Present' },
        { id: 102, name: 'Sunita Sharma', department: 'Site Engineers', status: 'Present' },
        { id: 103, name: 'Anil Gupta', department: 'Site Engineers', status: 'On Leave' },
        { id: 104, name: 'Priya Singh', department: 'Accounts', status: 'Present' },
        { id: 105, name: 'Sanjay Verma', department: 'Labour', status: 'Present' },
        { id: 106, name: 'Deepak Patel', department: 'Labour', status: 'Present' },
        { id: 107, name: 'Meena Reddy', department: 'Management', status: 'Present' },
    ],
};

// Helper to get today's date in YYYY-MM-DD format
const getDefaultDate = () => {
    // For this demo, we'll default to a date that has data
    return '2025-11-03';
};

const EmployeeAttendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [summary, setSummary] = useState({ present: 0, absent: 0, onLeave: 0 });
    const [selectedDate, setSelectedDate] = useState(getDefaultDate());
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDept, setFilterDept] = useState('all');

    // Re-fetch data when the selectedDate changes
    useEffect(() => {
        setLoading(true);
        // In a real app, fetch:
        // fetch(`/api/attendance?date=${selectedDate}`)
        const timer = setTimeout(() => {
            const data = mockAttendanceData[selectedDate] || [];
            
            // Calculate summaries
            const present = data.filter(e => e.status === 'Present').length;
            const absent = data.filter(e => e.status === 'Absent').length;
            const onLeave = data.filter(e => e.status === 'On Leave').length;

            setAttendanceData(data);
            setSummary({ present, absent, onLeave });
            setLoading(false);
        }, 500); // Simulate network delay

        return () => clearTimeout(timer); // Cleanup timer
    }, [selectedDate]); // Re-run when selectedDate changes

    // Filtered data for display
    const filteredData = attendanceData.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDept = filterDept === 'all' || emp.department === filterDept;
        return matchesSearch && matchesDept;
    });

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Employee Attendance</h2>
            
            {/* --- FILTER SECTION --- */}
            <div className="bg-white p-5 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        Select Report Date:
                        <input 
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        Filter by Department:
                        <select 
                            value={filterDept}
                            onChange={(e) => setFilterDept(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                        >
                            <option value="all">All Departments</option>
                            <option value="Site Engineers">Site Engineers</option>
                            <option value="Accounts">Accounts</option>
                            <option value="Labour">Labour</option>
                            <option value="Management">Management</option>
                        </select>
                    </label>
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        Search by Name:
                        <input 
                            type="text"
                            placeholder="Enter employee name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                    </label>
                </div>
            </div>

            {/* --- SUMMARY CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="text-sm font-medium text-green-600">Present</h3>
                    <p className="text-3xl font-semibold text-gray-900">{loading ? '...' : summary.present}</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="text-sm font-medium text-red-600">Absent</h3>
                    <p className="text-3xl font-semibold text-gray-900">{loading ? '...' : summary.absent}</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="text-sm font-medium text-yellow-600">On Leave</h3>
                    <p className="text-3xl font-semibold text-gray-900">{loading ? '...' : summary.onLeave}</p>
                </div>
            </div>

            {/* --- DATA TABLE SECTION --- */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {loading ? (
                    <div className="text-center p-20 text-gray-500">
                        <p>Loading attendance data for {selectedDate}...</p>
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Employee Name</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Department</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((emp) => (
                                        <tr key={emp.id} className="hover:bg-gray-50 even:bg-gray-50">
                                            <td className="border-b border-gray-200 px-4 py-3 text-sm font-medium">{emp.name}</td>
                                            <td className="border-b border-gray-200 px-4 py-3 text-sm">{emp.department}</td>
                                            <td className="border-b border-gray-200 px-4 py-3 text-sm text-center">
                                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                                    emp.status === 'Present' ? 'bg-green-100 text-green-800' :
                                                    emp.status === 'Absent' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {emp.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center p-10 text-gray-500">
                                            No employees found for this date or filter.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeAttendance;