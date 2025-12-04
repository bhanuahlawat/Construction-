import React, { useState, useEffect } from 'react';

// --- Mock data for different dates ---
// In a real app, you'd fetch this from an API based on the selected date
const mockLaborData = {
    '2025-11-03': [
        { id: 1, subcontractor: 'Alpha Concrete', trade: 'Mason', headcount: 10, dailyRate: 1500, totalCost: 15000 },
        { id: 2, subcontractor: 'Alpha Concrete', trade: 'General Labour', headcount: 25, dailyRate: 800, totalCost: 20000 },
        { id: 3, subcontractor: 'Beta Electrics', trade: 'Electrician', headcount: 8, dailyRate: 2000, totalCost: 16000 },
        { id: 4, subcontractor: 'Beta Electrics', trade: 'Helper', headcount: 8, dailyRate: 700, totalCost: 5600 },
        { id: 5, subcontractor: 'Charlie Plumbing', trade: 'Plumber', headcount: 4, dailyRate: 1800, totalCost: 7200 },
    ],
    '2025-11-02': [
        { id: 6, subcontractor: 'Alpha Concrete', trade: 'Mason', headcount: 12, dailyRate: 1500, totalCost: 18000 },
        { id: 7, subcontractor: 'Alpha Concrete', trade: 'General Labour', headcount: 30, dailyRate: 800, totalCost: 24000 },
        { id: 8, subcontractor: 'Charlie Plumbing', trade: 'Plumber', headcount: 5, dailyRate: 1800, totalCost: 9000 },
    ],
    '2025-11-01': [
         { id: 9, subcontractor: 'Alpha Concrete', trade: 'General Labour', headcount: 20, dailyRate: 800, totalCost: 16000 },
         { id: 10, subcontractor: 'Beta Electrics', trade: 'Electrician', headcount: 7, dailyRate: 2000, totalCost: 14000 },
         { id: 11, subcontractor: 'Beta Electrics', trade: 'Helper', headcount: 5, dailyRate: 700, totalCost: 3500 },
    ]
};

// Get today's date in YYYY-MM-DD format, but default to our mock data
const getDefaultDate = () => {
    // const today = new Date();
    // const yyyy = today.getFullYear();
    // const mm = String(today.getMonth() + 1).padStart(2, '0');
    // const dd = String(today.getDate()).padStart(2, '0');
    // return `${yyyy}-${mm}-${dd}`;
    
    // For this demo, we'll default to a date that has data
    return '2025-11-03';
};

const DailyProgressLaborReport = () => {
    const [reportData, setReportData] = useState([]);
    const [summary, setSummary] = useState({ totalHeadcount: 0, totalCost: 0 });
    const [selectedDate, setSelectedDate] = useState(getDefaultDate());
    const [loading, setLoading] = useState(true);

    // Re-fetch data when the selectedDate changes
    useEffect(() => {
        setLoading(true);
        // In a real app, you'd fetch:
        // fetch(`/api/reports/dpr-labor?date=${selectedDate}`)
        const timer = setTimeout(() => {
            const data = mockLaborData[selectedDate] || []; // Get data for the date, or empty array
            
            // Calculate summaries
            const totalHeadcount = data.reduce((acc, item) => acc + item.headcount, 0);
            const totalCost = data.reduce((acc, item) => acc + item.totalCost, 0);

            setReportData(data);
            setSummary({ totalHeadcount, totalCost });
            setLoading(false);
        }, 500); // Simulate network delay

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [selectedDate]); // Dependency: re-run when selectedDate changes

    // Helper to format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Daily Progress Report (Labor)</h2>
            
            {/* --- FILTER SECTION --- */}
            <div className="bg-white p-5 rounded-lg shadow-md mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        Select Report Date:
                        <input 
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-64"
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        Subcontractor:
                        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white w-full sm:w-64">
                            <option value="all">All Subcontractors</option>
                            <option value="alpha">Alpha Concrete</option>
                            <option value="beta">Beta Electrics</option>
                            <option value="charlie">Charlie Plumbing</option>
                        </select>
                    </label>
                    <button className="px-4 py-2 rounded-md bg-green-600 text-white cursor-pointer text-sm self-end ml-auto">
                        Export as PDF
                    </button>
                </div>
            </div>

            {/* --- SUMMARY CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="text-sm font-medium text-gray-500">Total Headcount (All Trades)</h3>
                    <p className="text-3xl font-semibold text-gray-900">{loading ? '...' : summary.totalHeadcount}</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="text-sm font-medium text-gray-500">Total Labor Cost for {selectedDate}</h3>
                    <p className="text-3xl font-semibold text-gray-900">{loading ? '...' : formatCurrency(summary.totalCost)}</p>
                </div>
            </div>

            {/* --- DATA TABLE SECTION --- */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {loading ? (
                    <div className="text-center p-20 text-gray-500">
                        <p>Loading labor report for {selectedDate}...</p>
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Subcontractor</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Labor Trade</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Headcount</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Daily Rate</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Total Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.length > 0 ? (
                                    reportData.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 even:bg-gray-50">
                                            <td className="border-b border-gray-200 px-4 py-3 text-sm font-medium">{item.subcontractor}</td>
                                            <td className="border-b border-gray-200 px-4 py-3 text-sm">{item.trade}</td>
                                            <td className="border-b border-gray-200 px-4 py-3 text-sm text-right font-medium">{item.headcount}</td>
                                            <td className="border-b border-gray-200 px-4 py-3 text-sm text-right">{formatCurrency(item.dailyRate)}</td>
                                            <td className="border-b border-gray-200 px-4 py-3 text-sm text-right font-semibold">{formatCurrency(item.totalCost)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center p-10 text-gray-500">
                                            No labor data found for {selectedDate}.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            {reportData.length > 0 && (
                                <tfoot>
                                    <tr className="bg-gray-100">
                                        <td colSpan="2" className="px-4 py-3 text-right font-bold text-gray-800">Grand Total</td>
                                        <td className="px-4 py-3 text-right font-bold text-gray-800 text-base">{summary.totalHeadcount}</td>
                                        <td className="px-4 py-3 text-right font-bold text-gray-800">--</td>
                                        <td className="px-4 py-3 text-right font-bold text-gray-800 text-base">{formatCurrency(summary.totalCost)}</td>
                                    </tr>
                                </tfoot>
                            )}
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DailyProgressLaborReport;