import React, { useState, useEffect } from 'react';

// --- Mock data to simulate an API call ---
const mockBudgetData = [
    { id: 1, category: '01 - Site Preparation', budget: 50000, actual: 48500 },
    { id: 2, category: '02 - Concrete & Foundation', budget: 150000, actual: 155000 },
    { id: 3, category: '03 - Framing & Structural', budget: 120000, actual: 115000 },
    { id: 4, category: '04 - Electrical', budget: 80000, actual: 75000 },
    { id: 5, category: '05 - Plumbing', budget: 70000, actual: 72500 },
    { id: 6, category: '06 - Interior Finishes', budget: 100000, actual: 90000 },
    { id: 7, category: '07 - Contingency', budget: 30000, actual: 5000 },
];

const BudgetingForecasting = () => {
    const [budgetData, setBudgetData] = useState([]);
    const [summaryData, setSummaryData] = useState({ totalBudget: 0, totalActual: 0, totalVariance: 0 });
    const [loading, setLoading] = useState(true);

    // Simulate fetching data and calculating summaries
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            // Calculate variance for each item
            const calculatedData = mockBudgetData.map(item => ({
                ...item,
                variance: item.budget - item.actual
            }));

            // Calculate totals for the summary cards
            const totalBudget = calculatedData.reduce((acc, item) => acc + item.budget, 0);
            const totalActual = calculatedData.reduce((acc, item) => acc + item.actual, 0);
            const totalVariance = totalBudget - totalActual;

            setSummaryData({ totalBudget, totalActual, totalVariance });
            setBudgetData(calculatedData);
            setLoading(false);
        }, 700); // Simulate network delay

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    // Helper to format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD', // Change as needed
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Budgeting & Forecasting</h2>
            
            {/* --- SUMMARY CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="text-sm font-medium text-gray-500">Total Budget</h3>
                    <p className="text-3xl font-semibold text-gray-900">{formatCurrency(summaryData.totalBudget)}</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="text-sm font-medium text-gray-500">Total Actual Spent</h3>
                    <p className="text-3xl font-semibold text-gray-900">{formatCurrency(summaryData.totalActual)}</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="text-sm font-medium text-gray-500">Total Variance</h3>
                    <p className={`text-3xl font-semibold ${summaryData.totalVariance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(summaryData.totalVariance)}
                        <span className="text-sm ml-2">{summaryData.totalVariance >= 0 ? '(Under Budget)' : '(Over Budget)'}</span>
                    </p>
                </div>
            </div>

            {/* --- FILTER SECTION --- */}
            <div className="bg-white p-5 rounded-lg shadow-md mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        Project:
                        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white">
                            <option value="all">Project Alpha (All)</option>
                            <option value="projA">Site A - Tower 1</option>
                            <option value="projB">Site B - Commercial</option>
                        </select>
                    </label>
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        Date Range:
                        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white">
                            <option value="quarter">This Quarter</option>
                            <option value="year">This Year</option>
                            <option value="total">Project to Date</option>
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
                        <p>Loading budget data...</p>
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Budgeted ($)</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Actual ($)</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Variance ($)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {budgetData.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 even:bg-gray-50">
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm font-medium text-gray-800">{item.category}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-right">{item.budget.toFixed(2)}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-right">{item.actual.toFixed(2)}</td>
                                        <td className={`border-b border-gray-200 px-4 py-3 text-sm text-right font-medium ${
                                            item.variance >= 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {item.variance.toFixed(2)}
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

export default BudgetingForecasting;