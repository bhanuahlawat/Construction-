import React, { useState, useEffect } from 'react';

// --- Mock data for CONSUMABLE items ---
const mockConsumableData = {
    projectAlpha: [
        { id: 1, item: 'Cement (Bag)', unit: 'Bags', qtyIssued: 500, rate: 350, total: 175000 },
        { id: 2, item: 'Sand (Cubic Meter)', unit: 'm³', qtyIssued: 80, rate: 1200, total: 96000 },
        { id: 3, item: 'Bricks (Piece)', unit: 'pcs', qtyIssued: 15000, rate: 8, total: 120000 },
    ],
    projectBeta: [
        { id: 6, item: 'Cement (Bag)', unit: 'Bags', qtyIssued: 300, rate: 360, total: 108000 },
        { id: 7, item: 'Binding Wire (kg)', unit: 'kg', qtyIssued: 150, rate: 60, total: 9000 },
    ],
};

// --- Mock data for NON-CONSUMABLE items ---
const mockNonConsumableData = {
    projectAlpha: [
        { id: 101, item: 'Scaffolding (Set)', unit: 'Sets', qtyIssued: 50, rate: 5000, total: 250000 },
        { id: 102, item: 'Power Drill (Bosch)', unit: 'pcs', qtyIssued: 10, rate: 8000, total: 80000 },
        { id: 103, item: 'Safety Harness', unit: 'pcs', qtyIssued: 25, rate: 1500, total: 37500 },
    ],
    projectBeta: [
        { id: 104, item: 'Concrete Mixer', unit: 'pcs', qtyIssued: 2, rate: 150000, total: 300000 },
        { id: 105, item: 'Power Drill (Bosch)', unit: 'pcs', qtyIssued: 5, rate: 8000, total: 40000 },
    ],
};

const ContractWiseStock = () => {
    const [stockData, setStockData] = useState([]);
    const [summary, setSummary] = useState({ totalValue: 0, totalItems: 0 });
    const [selectedProject, setSelectedProject] = useState('projectAlpha');
    const [selectedStockType, setSelectedStockType] = useState('consumable'); // 'consumable' or 'nonConsumable'
    const [loading, setLoading] = useState(true);

    // Re-fetch data when project OR stock type changes
    useEffect(() => {
        setLoading(true);
        // In a real app, you'd fetch from your API
        // e.g., fetch(`/api/reports/stock?project=${selectedProject}&type=${selectedStockType}`)
        const timer = setTimeout(() => {
            let data = [];
            if (selectedStockType === 'consumable') {
                data = mockConsumableData[selectedProject] || [];
            } else {
                data = mockNonConsumableData[selectedProject] || [];
            }
            
            // Calculate summaries
            const totalValue = data.reduce((acc, item) => acc + item.total, 0);
            const totalItems = data.length;

            setStockData(data);
            setSummary({ totalValue, totalItems });
            setLoading(false);
        }, 500); // Simulate network delay

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [selectedProject, selectedStockType]); // Dependency array includes both filters

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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Contract-Wise Stock Report</h2>
            
            {/* --- FILTER SECTION --- */}
            <div className="bg-white p-5 rounded-lg shadow-md mb-6">
                <div className="flex flex-wrap items-center gap-6">
                    {/* Project Filter */}
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        Contract / Project:
                        <select 
                            value={selectedProject}
                            onChange={(e) => setSelectedProject(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white w-64"
                        >
                            <option value="projectAlpha">Project Alpha - Tower 1</option>
                            <option value="projectBeta">Project Beta - Mall</option>
                        </select>
                    </label>

                    {/* Stock Type Filter (Radio Buttons) */}
                    <div className="flex flex-col gap-1 text-sm text-gray-600">
                        Stock Type:
                        <div className="flex items-center gap-4 mt-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="stockType"
                                    value="consumable"
                                    checked={selectedStockType === 'consumable'}
                                    onChange={(e) => setSelectedStockType(e.target.value)}
                                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                Consumable
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="stockType"
                                    value="nonConsumable"
                                    checked={selectedStockType === 'nonConsumable'}
                                    onChange={(e) => setSelectedStockType(e.target.value)}
                                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                Non-Consumable
                            </label>
                        </div>
                    </div>
                    
                    <button className="px-4 py-2 rounded-md bg-green-600 text-white cursor-pointer text-sm self-end ml-auto">
                        Export as PDF
                    </button>
                </div>
            </div>

            {/* --- SUMMARY CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="text-sm font-medium text-gray-500">Total Unique Items</h3>
                    <p className="text-3xl font-semibold text-gray-900">{summary.totalItems}</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="text-sm font-medium text-gray-500">Total Value of Stock</h3>
                    <p className="text-3xl font-semibold text-gray-900">{formatCurrency(summary.totalValue)}</p>
                </div>
            </div>

            {/* --- DATA TABLE SECTION --- */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {loading ? (
                    <div className="text-center p-20 text-gray-500">
                        <p>Loading {selectedStockType} stock data...</p>
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Item Description</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Unit</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Quantity</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Rate</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Total Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stockData.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 even:bg-gray-50">
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm font-medium">{item.item}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm">{item.unit}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-right">{item.qtyIssued}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-right">{formatCurrency(item.rate)}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-right font-semibold">{formatCurrency(item.total)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-gray-100">
                                    <td colSpan="4" className="px-4 py-3 text-right font-bold text-gray-800">Grand Total</td>
                                    <td className="px-4 py-3 text-right font-bold text-gray-800 text-base">{formatCurrency(summary.totalValue)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContractWiseStock;