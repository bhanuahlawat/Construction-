// src/pages/admin/FinanceReports/GeneralLedgerAccount.jsx
import React, { useState, useEffect } from 'react';

// --- Mock data to simulate an API call ---
// In a real app, you'd fetch this from your backend
const mockLedgerData = [
    { id: 1, date: '2025-11-01', account: 'Cash', description: 'Initial deposit', debit: 10000, credit: 0, balance: 10000 },
    { id: 2, date: '2025-11-02', account: 'Office Supplies', description: 'Purchase paper', debit: 150, credit: 0, balance: 9850 },
    { id: 3, date: '2025-11-02', account: 'Cash', description: 'Paid for supplies', debit: 0, credit: 150, balance: 9850 },
    { id: 4, date: '2025-11-03', account: 'Sales Revenue', description: 'Client project payment', debit: 0, credit: 5000, balance: 14850 },
    { id: 5, date: '2025-11-03', account: 'Cash', description: 'Received client payment', debit: 5000, credit: 0, balance: 14850 },
    { id: 6, date: '2025-11-04', account: 'Rent Expense', description: 'Paid November rent', debit: 1200, credit: 0, balance: 13650 },
    { id: 7, date: '2025-11-04', account: 'Cash', description: 'Paid November rent', debit: 0, credit: 1200, balance: 13650 },
];

const GeneralLedgerAccount = () => {
    const [ledgerData, setLedgerData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simulate fetching data when the component mounts
    useEffect(() => {
        setLoading(true);
        // In a real app, you would fetch from your API here
        // e.g., fetch('/api/reports/general-ledger')
        const timer = setTimeout(() => {
            setLedgerData(mockLedgerData);
            setLoading(false);
        }, 1000); // Simulate 1 second network delay

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">General Ledger & Accounts</h2>
            
            {/* --- FILTER SECTION --- */}
            <div className="bg-white p-5 rounded-lg shadow-md mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        Start Date:
                        <input type="date" className="px-3 py-2 border border-gray-300 rounded-md text-sm" />
                    </label>
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        End Date:
                        <input type="date" className="px-3 py-2 border border-gray-300 rounded-md text-sm" />
                    </label>
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        Account:
                        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white">
                            <option value="all">All Accounts</option>
                            <option value="cash">Cash</option>
                            <option value="revenue">Sales Revenue</option>
                            <option value="expense">Rent Expense</option>
                        </select>
                    </label>
                    <button className="px-4 py-2 rounded-md bg-blue-600 text-white cursor-pointer text-sm self-end">
                        Apply Filters
                    </button>
                    <button className="px-4 py-2 rounded-md bg-green-600 text-white cursor-pointer text-sm self-end ml-auto">
                        Export to Excel
                    </button>
                </div>
            </div>

            {/* --- DATA TABLE SECTION --- */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {loading ? (
                    <div className="text-center p-20 text-gray-500">
                        <p>Loading report data...</p>
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Account</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Description</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Debit ($)</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Credit ($)</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Balance ($)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ledgerData.map((entry) => (
                                    <tr key={entry.id} className="hover:bg-gray-50 even:bg-gray-50">
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm">{entry.date}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm">{entry.account}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm">{entry.description}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-right">{entry.debit > 0 ? entry.debit.toFixed(2) : '-'}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-right">{entry.credit > 0 ? entry.credit.toFixed(2) : '-'}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-right font-medium">{entry.balance.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GeneralLedgerAccount;