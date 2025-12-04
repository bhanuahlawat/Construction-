import React, { useState, useEffect } from 'react';

// --- Mock data to simulate an API call ---
// This structure mimics a Statement of Cash Flows
const mockCashFlowData = {
    operatingActivities: [
        { id: 'op1', description: 'Net Income (from P&L)', amount: 150000 },
        { id: 'op2', description: 'Depreciation & Amortization', amount: 25000 },
        { id: 'op3', description: 'Increase in Accounts Receivable', amount: -30000 },
        { id: 'op4', description: 'Increase in Accounts Payable', amount: 15000 },
    ],
    investingActivities: [
        { id: 'inv1', description: 'Purchase of Equipment', amount: -75000 },
        { id: 'inv2', description: 'Sale of old vehicle', amount: 8000 },
    ],
    financingActivities: [
        { id: 'fin1', description: 'Bank Loan Received', amount: 100000 },
        { id: 'fin2', description: 'Loan Repayment (Principal)', amount: -20000 },
        { id: 'fin3', description: 'Owner Contribution', amount: 5000 },
    ],
    cashAtStart: 50000,
};

// Helper function to sum an array of objects by 'amount'
const sumAmounts = (items) => items.reduce((acc, item) => acc + item.amount, 0);

const CashFlowManagement = () => {
    const [cashFlowData, setCashFlowData] = useState(null);
    const [summary, setSummary] = useState({ start: 0, end: 0, net: 0 });
    const [loading, setLoading] = useState(true);

    // Simulate fetching data and calculating summaries
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            const data = mockCashFlowData;

            // Calculate totals
            const netOperating = sumAmounts(data.operatingActivities);
            const netInvesting = sumAmounts(data.investingActivities);
            const netFinancing = sumAmounts(data.financingActivities);
            const netCashFlow = netOperating + netInvesting + netFinancing;
            const cashAtEnd = data.cashAtStart + netCashFlow;

            setCashFlowData({
                ...data,
                netOperating,
                netInvesting,
                netFinancing,
            });
            setSummary({
                start: data.cashAtStart,
                end: cashAtEnd,
                net: netCashFlow,
            });
            setLoading(false);
        }, 800); // Simulate network delay

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    // Helper to format currency
    const formatCurrency = (amount) => {
        const value = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(Math.abs(amount));
        
        return amount < 0 ? `(${value})` : value;
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Cash Flow Management</h2>

            {/* --- SUMMARY CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="text-sm font-medium text-gray-500">Starting Cash</h3>
                    <p className="text-3xl font-semibold text-gray-900">{formatCurrency(summary.start)}</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="text-sm font-medium text-gray-500">Net Cash Flow</h3>
                    <p className={`text-3xl font-semibold ${summary.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(summary.net)}
                    </p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="text-sm font-medium text-gray-500">Ending Cash</h3>
                    <p className="text-3xl font-semibold text-gray-900">{formatCurrency(summary.end)}</p>
                </div>
            </div>

            {/* --- FILTER SECTION --- */}
            <div className="bg-white p-5 rounded-lg shadow-md mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        Project:
                        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white">
                            <option value="all">All Projects</option>
                            <option value="projA">Project Alpha</option>
                            <option value="projB">Project Beta</option>
                        </select>
                    </label>
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        Period:
                        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white">
                            <option value="monthly">November 2025</option>
                            <option value="quarter">Q4 2025</option>
                            <option value="year">2025</option>
                        </select>
                    </label>
                    <button className="px-4 py-2 rounded-md bg-blue-600 text-white cursor-pointer text-sm self-end">
                        Apply Filters
                    </button>
                    <button className="px-4 py-2 rounded-md bg-green-600 text-white cursor-pointer text-sm self-end ml-auto">
                        Export as PDF
                    </button>
                </div>
            </div>

            {/* --- DATA TABLE SECTION --- */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {loading ? (
                    <div className="text-center p-20 text-gray-500">
                        <p>Loading cash flow data...</p>
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700 w-3/4">Description</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700 w-1/4">Amount ($)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Operating Activities */}
                                <tr className="bg-gray-50">
                                    <td colSpan="2" className="border-b border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800">Cash Flow from Operating Activities</td>
                                </tr>
                                {cashFlowData.operatingActivities.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="border-b border-gray-200 px-4 py-2 text-sm pl-8">{item.description}</td>
                                        <td className={`border-b border-gray-200 px-4 py-2 text-sm text-right ${item.amount < 0 ? 'text-red-600' : ''}`}>{formatCurrency(item.amount)}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="border-b border-gray-300 px-4 py-2 text-sm font-semibold text-right">Net Cash from Operating Activities</td>
                                    <td className="border-b border-gray-300 px-4 py-2 text-sm text-right font-semibold">{formatCurrency(cashFlowData.netOperating)}</td>
                                </tr>

                                {/* Investing Activities */}
                                <tr className="bg-gray-50">
                                    <td colSpan="2" className="border-b border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800">Cash Flow from Investing Activities</td>
                                </tr>
                                {cashFlowData.investingActivities.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="border-b border-gray-200 px-4 py-2 text-sm pl-8">{item.description}</td>
                                        <td className={`border-b border-gray-200 px-4 py-2 text-sm text-right ${item.amount < 0 ? 'text-red-600' : ''}`}>{formatCurrency(item.amount)}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="border-b border-gray-300 px-4 py-2 text-sm font-semibold text-right">Net Cash from Investing Activities</td>
                                    <td className="border-b border-gray-300 px-4 py-2 text-sm text-right font-semibold">{formatCurrency(cashFlowData.netInvesting)}</td>
                                </tr>

                                {/* Financing Activities */}
                                <tr className="bg-gray-50">
                                    <td colSpan="2" className="border-b border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800">Cash Flow from Financing Activities</td>
                                </tr>
                                {cashFlowData.financingActivities.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="border-b border-gray-200 px-4 py-2 text-sm pl-8">{item.description}</td>
                                        <td className={`border-b border-gray-200 px-4 py-2 text-sm text-right ${item.amount < 0 ? 'text-red-600' : ''}`}>{formatCurrency(item.amount)}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="border-b border-gray-300 px-4 py-2 text-sm font-semibold text-right">Net Cash from Financing Activities</td>
                                    <td className="border-b border-gray-300 px-4 py-2 text-sm text-right font-semibold">{formatCurrency(cashFlowData.netFinancing)}</td>
                                </tr>

                                {/* Summary */}
                                <tr className="bg-gray-100">
                                    <td className="border-b border-gray-300 px-4 py-3 text-sm font-bold text-right">Net Increase/Decrease in Cash</td>
                                    <td className={`border-b border-gray-300 px-4 py-3 text-sm text-right font-bold ${summary.net >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                                        {formatCurrency(summary.net)}
                                    </td>
                                </tr>
                                <tr className="bg-gray-100">
                                    <td className="border-b border-gray-300 px-4 py-3 text-sm font-bold text-right">Cash at Beginning of Period</td>
                                    <td className="border-b border-gray-300 px-4 py-3 text-sm text-right font-bold">{formatCurrency(summary.start)}</td>
                                </tr>
                                <tr className="bg-gray-100">
                                    <td className="border-b border-gray-300 px-4 py-3 text-sm font-bold text-right">Cash at End of Period</td>
                                    <td className="border-b border-gray-300 px-4 py-3 text-sm text-right font-bold">{formatCurrency(summary.end)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CashFlowManagement;