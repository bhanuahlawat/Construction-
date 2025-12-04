import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data for configurable TDS sections (q)
const initialTdsRates = [
    { section: '194C', description: 'Payment to Contractors (Individual/HUF)', rate: 1.0, threshold: 30000, type: 'Vendor' },
    { section: '194C', description: 'Payment to Contractors (Company/Firm)', rate: 2.0, threshold: 30000, type: 'Vendor' },
    { section: '194J', description: 'Professional or Technical Services', rate: 10.0, threshold: 30000, type: 'Sub-Contractor' },
    { section: '192', description: 'Salaries (based on tax slab)', rate: 'Slab', threshold: 'N/A', type: 'Employee' },
];

const TdsManagement = () => {
    const navigate = useNavigate();
    const [tdsRates, setTdsRates] = useState(initialTdsRates);
    const [complianceData, setComplianceData] = useState({
        deducted: 155000,
        deposited: 140000,
        pendingChallans: 3,
        nextDueDate: '10/11/2025'
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleRateChange = (index, newRate) => {
        const updatedRates = [...tdsRates];
        updatedRates[index].rate = newRate;
        setTdsRates(updatedRates);
    };

    const handleSaveRates = () => {
        // In a real application, this would save the rates to a database
        console.log("TDS Rates saved:", tdsRates);
        setIsEditing(false);
        // Display a confirmation message using a console log instead of alert()
        console.log("Success: TDS configuration updated.");
    };

    return (
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-lg max-w-7xl mx-auto">
            <header className="mb-6 border-b pb-4 flex flex-col sm:flex-row justify-between sm:items-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-0">TDS Management & Compliance</h1>
                <button 
                    onClick={() => navigate('/admin/salesandbilling')}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-150 text-sm"
                >
                    &larr; Back to Sales Dashboard
                </button>
            </header>

            {/* Compliance Summary Dashboard (p, j) */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Compliance Status (Current Period)</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {/* Total Deducted */}
                <div className="p-5 rounded-xl bg-indigo-50 border-l-4 border-indigo-500 shadow-md">
                    <p className="text-sm font-medium text-gray-600">Total TDS Deducted (₹)</p>
                    <p className="text-2xl font-bold text-indigo-800">{complianceData.deducted.toLocaleString('en-IN')}</p>
                </div>
                {/* Total Deposited */}
                <div className="p-5 rounded-xl bg-green-50 border-l-4 border-green-500 shadow-md">
                    <p className="text-sm font-medium text-gray-600">Total TDS Deposited (₹)</p>
                    <p className="text-2xl font-bold text-green-800">{complianceData.deposited.toLocaleString('en-IN')}</p>
                </div>
                {/* Difference / Pending */}
                <div className="p-5 rounded-xl bg-red-50 border-l-4 border-red-500 shadow-md">
                    <p className="text-sm font-medium text-gray-600">Pending Deposit (₹)</p>
                    <p className="text-2xl font-bold text-red-800">{(complianceData.deducted - complianceData.deposited).toLocaleString('en-IN')}</p>
                </div>
                {/* Next Due Date */}
                <div className="p-5 rounded-xl bg-yellow-50 border-l-4 border-yellow-500 shadow-md">
                    <p className="text-sm font-medium text-gray-600">Next Filing/Deposit Due</p>
                    <p className="text-2xl font-bold text-yellow-800">{complianceData.nextDueDate}</p>
                </div>
            </div>

            {/* TDS Rate Configuration (q) */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex justify-between items-center">
                TDS Rate Configuration (Section-wise)
                <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-sm font-semibold py-1 px-3 rounded-full transition duration-150"
                    style={{ backgroundColor: isEditing ? '#f87171' : '#4f46e5', color: 'white' }}
                >
                    {isEditing ? 'Cancel Edit' : 'Edit Rates'}
                </button>
            </h2>
            
            <div className="overflow-x-auto shadow-md rounded-lg mb-8">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase min-w-[100px]">Section</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase min-w-[150px]">Recipient Type</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase min-w-[250px]">Description</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase min-w-[100px]">Threshold (₹)</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase min-w-[100px]">Rate (%)</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tdsRates.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm font-medium text-indigo-600">{item.section}</td>
                                <td className="px-4 py-3 text-sm text-gray-800">{item.type}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{item.description}</td>
                                <td className="px-4 py-3 text-sm text-right text-gray-500">{item.threshold.toLocaleString('en-IN') || 'N/A'}</td>
                                <td className="px-4 py-3 text-sm text-center">
                                    {isEditing ? (
                                        <input
                                            type="text" // Use text to allow 'Slab' input
                                            value={item.rate}
                                            onChange={(e) => handleRateChange(index, e.target.value)}
                                            className="w-full border rounded-md p-1.5 text-sm text-center font-bold bg-yellow-50 border-yellow-300"
                                        />
                                    ) : (
                                        <span className="font-bold">{item.rate}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                {isEditing && (
                    <button 
                        onClick={handleSaveRates}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition duration-150 text-lg"
                    >
                        Save New TDS Rates
                    </button>
                )}
            </div>
            <p className="mt-4 text-sm text-gray-500">*Note: This configuration drives the automatic TDS calculation in the Invoice generation form.</p>

        </div>
    );
};

export default TdsManagement;
