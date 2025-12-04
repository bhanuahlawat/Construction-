import React, { useState } from 'react';
import { Users, Clock, DollarSign, FileText, TrendingUp } from 'lucide-react';

// --- GLOBAL MOCK DATA (Consolidated here) ---
const mockEmployees = [
    { id: 1001, name: 'Alice Johnson', role: 'Software Engineer', salary: 90000, status: 'Active', hireDate: '2023-01-15' },
    { id: 1002, name: 'Bob Smith', role: 'Project Manager', salary: 120000, status: 'Active', hireDate: '2022-05-20' },
    { id: 1003, name: 'Charlie Brown', role: 'UX Designer', salary: 80000, status: 'On Leave', hireDate: '2024-03-01' },
    { id: 1004, name: 'Diana Prince', role: 'HR Specialist', salary: 75000, status: 'Active', hireDate: '2023-09-10' },
    { id: 1005, name: 'Ethan Hunt', role: 'Data Analyst', salary: 95000, status: 'Active', hireDate: '2022-11-01' },
];

const initialAttendance = [
    { empId: 1001, date: '2025-11-01', status: 'Present', checkIn: '09:00:00', checkOut: '17:00:00' },
    { empId: 1002, date: '2025-11-01', status: 'Present', checkIn: '08:30:00', checkOut: '17:30:00' },
    { empId: 1004, date: '2025-11-01', status: 'Present', checkIn: '09:15:00', checkOut: '17:15:00' },
    { empId: 1003, date: '2025-11-01', status: 'Leave', checkIn: '-', checkOut: '-' },
    { empId: 1005, date: '2025-11-01', status: 'Present', checkIn: '09:05:00', checkOut: '17:05:00' },
];

const initialLeaveRequests = [
    { id: 1, empId: 1003, name: 'Charlie Brown', type: 'Medical Leave', startDate: '2025-10-28', endDate: '2025-11-15', status: 'Approved' },
    { id: 2, empId: 1005, name: 'Ethan Hunt', type: 'Vacation', startDate: '2025-12-20', endDate: '2025-12-24', status: 'Pending' },
    { id: 3, empId: 1001, name: 'Alice Johnson', type: 'Sick Day', startDate: '2025-11-05', endDate: '2025-11-05', status: 'Pending' },
];


// Import Pages (UPDATED: using './' for components in the same folder)
import EmployeeListPage from './EmployeeListPage';
import AttendanceTrackerPage from './AttendanceTrackerPage';
import PayrollSummaryPage from './PayrollSummaryPage';
import LeaveRequestsPage from './LeaveRequestsPage';

export default function HRPayrollApp() {
    const [activeTab, setActiveTab] = useState('employees'); // 'employees', 'attendance', 'payroll', 'leave'

    const renderContent = () => {
        // ... (renderContent logic remains the same)
        switch (activeTab) {
            case 'employees':
                return <EmployeeListPage employees={mockEmployees} />;
            case 'attendance':
                return <AttendanceTrackerPage employees={mockEmployees} initialData={initialAttendance} />;
            case 'payroll':
                return <PayrollSummaryPage employees={mockEmployees} />;
            case 'leave':
                return <LeaveRequestsPage initialRequests={initialLeaveRequests} employees={mockEmployees} />;
            default:
                return <EmployeeListPage employees={mockEmployees} />;
        }
    };

    const tabClasses = (tabName) => 
        // ... (tabClasses logic remains the same)
        `px-4 py-3 font-semibold transition duration-200 flex items-center rounded-t-lg ${
            activeTab === tabName
                ? 'bg-white text-indigo-700 border-b-4 border-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
        }`;

    return (
        <div className="min-h-screen max-w-screen bg-gray-100 font-sans p-4 md:p-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 flex items-center">
                <TrendingUp className=" h-8 mr-3 text-indigo-600" /> HR & Payroll Management Suite
            </h1>
            
            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-300 bg-white rounded-t-xl shadow-lg overflow-x-auto ">
                <button className={tabClasses('employees')} onClick={() => setActiveTab('employees')}>
                    <Users className=" h-5 mr-2" /> Employee List
                </button>
                <button className={tabClasses('attendance')} onClick={() => setActiveTab('attendance')}>
                    <Clock className=" h-5 mr-2" /> Attendance Tracker
                </button>
                <button className={tabClasses('payroll')} onClick={() => setActiveTab('payroll')}>
                    <DollarSign className="h-5 mr-2" /> Payroll Summary
                </button>
                <button className={tabClasses('leave')} onClick={() => setActiveTab('leave')}>
                    <FileText className=" h-5 mr-2" /> Leave Requests
                </button>
            </div>

            {/* Content Area */}
            <div className="mt-0 bg-white rounded-b-xl shadow-xl p-0 min-h-[60vh]">
                {renderContent()}
            </div>
            
            {/* General Information Banner */}
            
        </div>
    );
}