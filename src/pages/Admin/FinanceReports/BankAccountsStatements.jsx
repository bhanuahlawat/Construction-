import React, { useState, useEffect } from 'react';

// --- Mock data to simulate an API call ---
const mockStatementData = [
    { id: 1, date: '2025-11-01', description: 'ACH Deposit - Client A', withdrawal: 0, deposit: 5000, balance: 15000, status: 'Reconciled' },
    { id: 2, date: '2025-11-01', description: 'Wire Transfer - Supplier X', withdrawal: 2500, deposit: 0, balance: 12500, status: 'Reconciled' },
    { id: 3, date: '2025-11-02', description: 'Bank Service Fee', withdrawal: 50, deposit: 0, balance: 12450, status: 'Unreconciled' },
    { id: 4, date: '2025-11-03', description: 'Check #1045 - Rent', withdrawal: 1200, deposit: 0, balance: 11250, status: 'Reconciled' },
    { id: 5, date: '2025-11-04', description: 'POS Purchase - Office Depot', withdrawal: 135.50, deposit: 0, balance: 11114.50, status: 'Unreconciled' },
    { id: 6, date: '2025-11-05', description: 'ACH Deposit - Client B', withdrawal: 0, deposit: 3200, balance: 14314.50, status: 'Reconciled' },
];

const BankAccountsStatements = () => {
    const [statementData, setStatementData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simulate fetching data when the component mounts
    useEffect(() => {
        setLoading(true);
        // In a real app, you would fetch from your API here
        // e.g., fetch('/api/reports/bank-statement/1')
        const timer = setTimeout(() => {
            setStatementData(mockStatementData);
            setLoading(false);
        }, 600); // Simulate network delay

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Bank Account Statements</h2>
            
            {/* --- FILTER SECTION --- */}
            <div className="bg-white p-5 rounded-lg shadow-md mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        Bank Account:
                        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white">
                            <option value="all">Main Checking (***1234)</option>
                            <option value="cash">Payroll Account (***5678)</option>
                            <option value="revenue">Savings (***9012)</option>
                        </select>
                    </label>
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        Start Date:
                        <input type="date" className="px-3 py-2 border border-gray-300 rounded-md text-sm" />
                    </label>
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        End Date:
                        <input type="date" className="px-3 py-2 border border-gray-300 rounded-md text-sm" />
                    </label>
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        Status:
                        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white">
                            <option value="all">All</option>
                            <option value="reconciled">Reconciled</option>
                            <option value="unreconciled">Unreconciled</option>
                        </select>
                    </label>
                    <button className="px-4 py-2 rounded-md bg-blue-600 text-white cursor-pointer text-sm self-end">
                        Apply Filters
                    </button>
                    <button className="px-4 py-2 rounded-md bg-green-600 text-white cursor-pointer text-sm self-end ml-auto">
                        Upload Statement
                    </button>
                </div>
            </div>

            {/* --- DATA TABLE SECTION --- */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {loading ? (
                    <div className="text-center p-20 text-gray-500">
                        <p>Loading bank statements...</p>
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Description</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Withdrawal ($)</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Deposit ($)</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Balance ($)</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {statementData.map((entry) => (
                                    <tr key={entry.id} className="hover:bg-gray-50 even:bg-gray-50">
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm">{entry.date}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm">{entry.description}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-right text-red-600">
                                            {entry.withdrawal > 0 ? entry.withdrawal.toFixed(2) : '-'}
                                        </td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-right text-green-600">
                                            {entry.deposit > 0 ? entry.deposit.toFixed(2) : '-'}
                                        </td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-right font-medium">{entry.balance.toFixed(2)}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-center">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                entry.status === 'Reconciled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {entry.status}
                                            </span>
                                        </td>
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

export default BankAccountsStatements;