import React, { useState, useMemo } from 'react';
import { List, Search, Plus, User } from 'lucide-react';
// Import the new modal component
import NewHireModal from './NewHireModal'; 

const EmployeeListPage = ({ employees }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Note: Since this component receives 'employees' via props, 
    // we manage employee list locally to demonstrate interaction.
    const [employeeList, setEmployeeList] = useState(employees);


    const handleView = (emp) => {
        alert(`Viewing details for: ${emp.name} (ID: ${emp.id}). Full data logged to console.`);
        console.log("View Employee Details:", emp);
    };

    const handleTerminate = (empId) => {
        if (window.confirm(`Are you sure you want to terminate employee ID: ${empId}? This action cannot be undone.`)) {
            // Update local state for visual feedback
            setEmployeeList(prevList => 
                prevList.map(emp => 
                    emp.id === empId ? { ...emp, status: 'Terminated' } : emp
                )
            );
            console.log(`Employee ID: ${empId} terminated.`);
        }
    };
    
    const handleNewHire = (newEmpData) => {
        // Find the maximum existing ID and add 1
        const maxId = employeeList.reduce((max, e) => (e.id > max ? e.id : max), 1000); 
        const newId = maxId + 1;
        
        const newEmployee = {
            id: newId,
            name: newEmpData.name,
            role: newEmpData.role,
            salary: 70000, // Default salary for new hire
            status: 'Active',
            hireDate: new Date().toISOString().split('T')[0],
        };
        setEmployeeList(prevList => [...prevList, newEmployee]);
        alert(`New employee ${newEmployee.name} added with ID ${newId}!`);
        console.log("New Employee Added:", newEmployee);
    };


    const filteredEmployees = useMemo(() => {
        return employeeList.filter(emp =>
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.id.toString().includes(searchTerm)
        );
    }, [employeeList, searchTerm]);

    return (
        <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-3 sm:mb-0">
                    <List className="w-6 h-6 mr-3 text-indigo-500" /> Employee Directory ({employeeList.length})
                </h2>
                <div className="flex w-full sm:w-auto space-x-3">
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search by name, role, or ID..."
                            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {/* New Hire Button - ACTIVATED */}
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-150 flex items-center whitespace-nowrap"
                    >
                        <Plus className="w-5 h-5 mr-2" /> New Hire
                    </button>
                </div>
            </div>

            {/* Table view for large screens */}
            <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hire Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {filteredEmployees.map((emp) => (
                            <tr key={emp.id} className="hover:bg-indigo-50/50 transition">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                                    <User className="w-5 h-5 mr-3 text-indigo-400" /> {emp.name} (ID: {emp.id})
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{emp.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{emp.hireDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        emp.status === 'Active' ? 'bg-green-100 text-green-800' :
                                        emp.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {emp.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {/* View Button - ACTIVATED */}
                                    <button
                                        onClick={() => handleView(emp)}
                                        className="text-indigo-600 hover:text-indigo-900 transition mr-4"
                                    >
                                        View
                                    </button>
                                    {/* Terminate Button - ACTIVATED */}
                                    {emp.status === 'Active' && (
                                        <button
                                            onClick={() => handleTerminate(emp.id)}
                                            className="text-red-600 hover:text-red-900 transition"
                                        >
                                            Terminate
                                        </button>
                                    )}
                                    {emp.status === 'Terminated' && (
                                        <span className="text-gray-400">Archived</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Card view for small screens */}
            <div className="md:hidden grid grid-cols-1 gap-4">
                {filteredEmployees.map((emp) => (
                    <div key={emp.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:bg-indigo-50/50 transition">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                                <User className="w-5 h-5 mr-3 text-indigo-400" />
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">{emp.name}</h3>
                                    <p className="text-xs text-gray-500">ID: {emp.id}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                emp.status === 'Active' ? 'bg-green-100 text-green-800' :
                                emp.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {emp.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Role: {emp.role}</p>
                        <p className="text-sm text-gray-600 mb-3">Hire Date: {emp.hireDate}</p>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleView(emp)}
                                className="text-indigo-600 hover:text-indigo-900 transition text-sm"
                            >
                                View
                            </button>
                            {emp.status === 'Active' && (
                                <button
                                    onClick={() => handleTerminate(emp.id)}
                                    className="text-red-600 hover:text-red-900 transition text-sm"
                                >
                                    Terminate
                                </button>
                            )}
                            {emp.status === 'Terminated' && (
                                <span className="text-gray-400 text-sm">Archived</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {filteredEmployees.length === 0 && (
                <div className="text-center py-10 text-gray-500 bg-white rounded-b-lg border-x border-b border-gray-200">No employees match your criteria.</div>
            )}

            {/* Render Modal */}
            {isModalOpen && <NewHireModal onClose={() => setIsModalOpen(false)} onSave={handleNewHire} />}
        </div>
    );
};

export default EmployeeListPage;