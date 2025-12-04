import React, { useState, useEffect } from 'react';

// --- Mock data for ALL CONSUMABLE items ---
const mockConsumableData = [
    { id: 1, item: 'Cement (Bag)', category: 'Building', unit: 'Bags', qtyOnHand: 1500, rate: 350, total: 525000 },
    { id: 2, item: 'Sand (Cubic Meter)', category: 'Building', unit: 'm³', qtyOnHand: 300, rate: 1200, total: 360000 },
    { id: 3, item: 'Bricks (Piece)', category: 'Building', unit: 'pcs', qtyOnHand: 50000, rate: 8, total: 400000 },
    { id: 4, item: 'Safety Helmets', category: 'Safety', unit: 'pcs', qtyOnHand: 150, rate: 250, total: 37500 },
    { id: 5, item: 'Binding Wire (kg)', category: 'Tools', unit: 'kg', qtyOnHand: 500, rate: 60, total: 30000 },
];

// --- Mock data for ALL NON-CONSUMABLE items ---
const mockNonConsumableData = [
    { id: 101, item: 'Scaffolding (Set)', category: 'Equipment', unit: 'Sets', qtyOnHand: 100, rate: 5000, total: 500000 },
    { id: 102, item: 'Power Drill (Bosch)', category: 'Tools', unit: 'pcs', qtyOnHand: 30, rate: 8000, total: 240000 },
    { id: 103, item: 'Safety Harness', category: 'Safety', unit: 'pcs', qtyOnHand: 75, rate: 1500, total: 112500 },
    { id: 104, item: 'Concrete Mixer', category: 'Equipment', unit: 'pcs', qtyOnHand: 5, rate: 150000, total: 750000 },
];

const GeneralStock = () => {
    const [stockData, setStockData] = useState([]);
    const [summary, setSummary] = useState({ totalValue: 0, totalItems: 0 });
    const [selectedStockType, setSelectedStockType] = useState('consumable'); // 'consumable' or 'nonConsumable'
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    // Re-fetch data when stock type changes
    useEffect(() => {
        setLoading(true);
        // In a real app, you'd fetch from your API
        // e.g., fetch(`/api/reports/general-stock?type=${selectedStockType}`)
        const timer = setTimeout(() => {
            let data = [];
            if (selectedStockType === 'consumable') {
                data = mockConsumableData;
            } else {
                data = mockNonConsumableData;
            }
            
            // Calculate summaries
            const totalValue = data.reduce((acc, item) => acc + item.total, 0);
            const totalItems = data.length;

            setStockData(data);
            setSummary({ totalValue, totalItems });
            setLoading(false);
        }, 500); // Simulate network delay

        return () => clearTimeout(timer); // Cleanup timer
    }, [selectedStockType]); // Dependency array

    // Helper to format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Filter data based on search term
    const filteredData = stockData.filter(item =>
        item.item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">General Stock Report</h2>
            
            {/* --- FILTER SECTION --- */}
            <div className="bg-white p-5 rounded-lg shadow-md mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
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
                    
                    {/* Search Bar */}
                    <div className="flex-grow max-w-xs">
                        <label className="flex flex-col gap-1 text-sm text-gray-600">
                            Search Item:
                            <input
                                type="text"
                                placeholder="Type item name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                        </label>
                    </div>

                    <button className="px-4 py-2 rounded-md bg-green-600 text-white cursor-pointer text-sm self-end">
                        Export as Excel
                    </button>
                </div>
            </div>

            {/* --- SUMMARY CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="text-sm font-medium text-gray-500">Total Unique Items (Filtered)</h3>
                    <p className="text-3xl font-semibold text-gray-900">{filteredData.length}</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="text-sm font-medium text-gray-500">Total Stock Value</h3>
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
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Unit</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Qty On Hand</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Rate</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Total Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 even:bg-gray-50">
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm font-medium">{item.item}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm">{item.category}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm">{item.unit}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-right font-medium">{item.qtyOnHand}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-right">{formatCurrency(item.rate)}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-right font-semibold">{formatCurrency(item.total)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-gray-100">
                                    <td colSpan="5" className="px-4 py-3 text-right font-bold text-gray-800">Grand Total</td>
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

export default GeneralStock;