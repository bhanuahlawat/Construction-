import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const mockCustomers = [
    { id: 'C1001', name: 'City Development Corp', project: 'High-Rise Tower A' },
    { id: 'C1002', name: 'Global Infrastructure Ltd', project: 'Highway Segment 5' },
];

const taxRates = {
    '18% GST (9% CGST + 9% SGST)': 0.18,
    '12% GST (6% CGST + 6% SGST)': 0.12,
};

const CreateInvoice = () => {
    const navigate = useNavigate();
    const [invoiceType, setInvoiceType] = useState('Proforma');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [lineItems, setLineItems] = useState([
        { description: 'Foundation Work', hsnSac: '995411', quantity: 1, rate: 500000, taxRate: '18% GST (9% CGST + 9% SGST)' }
    ]);
    const [tdsApplicable, setTdsApplicable] = useState(false);
    const [tdsRate, setTdsRate] = useState(0);

    // Function to handle changes in line items
    const handleItemChange = (index, field, value) => {
        const newItems = [...lineItems];
        newItems[index][field] = value;
        setLineItems(newItems);
    };

    const addItem = () => {
        setLineItems([...lineItems, { description: '', hsnSac: '', quantity: 1, rate: 0, taxRate: '18% GST (9% CGST + 9% SGST)' }]);
    };

    const removeItem = (index) => {
        setLineItems(lineItems.filter((_, i) => i !== index));
    };

    // --- Calculation Logic ---
    const calculateTotals = () => {
        let subtotal = 0;
        let totalTax = 0;
        let tdsDeduction = 0;

        lineItems.forEach(item => {
            const amount = item.quantity * item.rate;
            subtotal += amount;

            const rate = taxRates[item.taxRate] || 0;
            const taxAmount = amount * rate;
            totalTax += taxAmount;
        });

        const grossTotal = subtotal + totalTax;
        
        if (tdsApplicable) {
            tdsDeduction = grossTotal * (tdsRate / 100);
        }

        const netPayable = grossTotal - tdsDeduction;

        return { subtotal, totalTax, tdsDeduction, grossTotal, netPayable };
    };

    const { subtotal, totalTax, tdsDeduction, grossTotal, netPayable } = calculateTotals();
    const cgst = totalTax / 2;
    const sgst = totalTax / 2;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting Invoice:", {
            type: invoiceType,
            customer: selectedCustomer,
            items: lineItems,
            totals: { subtotal, totalTax, tdsDeduction, netPayable }
        });
        // Note: Replaced alert() with console.log as per best practice in React environments
        console.log(`Successfully generated ${invoiceType} for Customer: ${selectedCustomer}`);
        navigate('/admin/newinvoice');
    };

    return (
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-lg max-w-7xl mx-auto">
            <header className="mb-6 border-b pb-4 flex flex-col sm:flex-row justify-between sm:items-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-0">Create New Invoice</h1>
                <button 
                    onClick={() => navigate('/admin/salesandbilling')}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-150 text-sm"
                >
                    &larr; Back to Sales Dashboard
                </button>
            </header>

            <form onSubmit={handleSubmit}>
                {/* Invoice Header */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Invoice Type</label>
                        <select
                            value={invoiceType}
                            onChange={(e) => setInvoiceType(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white border focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="Proforma">Proforma Invoice</option>
                            <option value="Tax">Tax Invoice</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Customer & Project</label>
                        <select
                            value={selectedCustomer}
                            onChange={(e) => setSelectedCustomer(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white border focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="">Select Customer/Project</option>
                            {mockCustomers.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name} ({c.project})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-end pt-2 md:pt-0">
                         <div className="text-lg font-semibold text-gray-800 p-2 border border-dashed rounded-lg w-full text-center">
                            Invoice No: INV-2025-001
                        </div>
                    </div>
                </div>

                {/* Line Items Table */}
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Construction & Service Details</h2>
                <div className="overflow-x-auto shadow-md rounded-lg mb-8">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase min-w-[150px]">Description</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase min-w-[80px]">HSN/SAC (k)</th>
                                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase min-w-[70px]">Qty</th>
                                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase min-w-[100px]">Rate (₹)</th>
                                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase min-w-[150px]">Tax Rate (m)</th>
                                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase min-w-[120px]">Amount (₹)</th>
                                <th className="px-3 py-3 min-w-[40px]"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {lineItems.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-3 py-2">
                                        <input
                                            type="text"
                                            value={item.description}
                                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                            className="w-full border rounded-md p-1.5 text-sm"
                                            required
                                        />
                                    </td>
                                    <td className="px-3 py-2">
                                        <input
                                            type="text"
                                            value={item.hsnSac}
                                            onChange={(e) => handleItemChange(index, 'hsnSac', e.target.value)}
                                            className="w-full border rounded-md p-1.5 text-sm" // Enhanced for mobile
                                        />
                                    </td>
                                    <td className="px-3 py-2">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                                            className="w-full border rounded-md p-1.5 text-sm text-center" // Enhanced for mobile
                                            min="0"
                                        />
                                    </td>
                                    <td className="px-3 py-2">
                                        <input
                                            type="number"
                                            value={item.rate}
                                            onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                                            className="w-full border rounded-md p-1.5 text-sm text-right" // Enhanced for mobile
                                            min="0"
                                        />
                                    </td>
                                    <td className="px-3 py-2">
                                        <select
                                            value={item.taxRate}
                                            onChange={(e) => handleItemChange(index, 'taxRate', e.target.value)}
                                            className="w-full border rounded-md p-1.5 text-sm"
                                        >
                                            {Object.keys(taxRates).map(rate => (
                                                <option key={rate} value={rate}>{rate}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-3 py-2 text-right font-semibold text-gray-800 whitespace-nowrap">
                                        {(item.quantity * item.rate).toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-3 py-2 text-right">
                                        <button 
                                            type="button" 
                                            onClick={() => removeItem(index)}
                                            className="text-red-500 hover:text-red-700 transition"
                                        >
                                            &times;
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button 
                    type="button" 
                    onClick={addItem}
                    className="mb-8 px-4 py-2 text-sm font-semibold bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition"
                >
                    + Add Line Item
                </button>

                {/* Summary and Deductions - Stacks naturally on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* TDS / Deductions (p, q) */}
                    <div className="md:col-span-4 p-4 border border-red-200 rounded-xl bg-red-50 h-min">
                        <h3 className="text-lg font-semibold text-red-700 mb-3">TDS & Deduction Management</h3>
                        <div className="flex items-center mb-4">
                            <input
                                id="tds-check"
                                type="checkbox"
                                checked={tdsApplicable}
                                onChange={(e) => setTdsApplicable(e.target.checked)}
                                className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                            />
                            <label htmlFor="tds-check" className="ml-2 block text-sm font-medium text-gray-900">
                                TDS Applicable?
                            </label>
                        </div>
                        {tdsApplicable && (
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700">TDS Rate (%)</label>
                                <input
                                    type="number"
                                    value={tdsRate}
                                    onChange={(e) => setTdsRate(parseFloat(e.target.value) )}
                                    min="0"
                                    max="100"
                                    placeholder="e.g., 2"
                                    className="w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                />
                                <p className="text-xs text-red-500">Deduction amount is calculated based on rate and gross total.</p>
                            </div>
                        )}
                    </div>

                    {/* Financial Summary (g) */}
                    <div className="md:col-span-8 p-4 bg-gray-50 rounded-xl shadow-inner">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Invoice Summary (Tax Calculations)</h3>
                        <div className="space-y-2">
                            <SummaryRow label="Subtotal" value={subtotal} />
                            <SummaryRow label="CGST" value={cgst} tax={true} />
                            <SummaryRow label="SGST / IGST" value={sgst} tax={true} />
                            
                            <div className="border-t border-gray-300 pt-2 mt-2">
                                <SummaryRow label="Gross Total (A)" value={grossTotal} final={true} />
                            </div>
                            
                            <SummaryRow label="TDS Deduction (B)" value={tdsDeduction} deduction={true} />

                            <div className="border-t border-indigo-500 pt-3 mt-3">
                                <SummaryRow label="Net Payable (A - B)" value={netPayable} finalPayable={true} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 pt-6 border-t flex justify-end">
                    <button 
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition duration-150 text-lg"
                    >
                        Generate {invoiceType}
                    </button>
                </div>
            </form>
        </div>
    );
};

// Helper component for summary rows
const SummaryRow = ({ label, value, tax = false, deduction = false, final = false, finalPayable = false }) => (
    <div className={`flex justify-between ${finalPayable ? 'text-xl font-bold' : final ? 'text-lg font-semibold' : 'text-base text-gray-700'}`}>
        <span className={deduction ? 'text-red-600' : ''}>
            {label}
            {tax && <span className="ml-2 text-xs text-gray-500">(GST)</span>}
        </span>
        <span className={deduction ? 'text-red-600' : ''}>
            {value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 })}
        </span>
    </div>
);

export default CreateInvoice;
