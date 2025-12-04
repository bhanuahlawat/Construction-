import React, { useMemo, useState } from 'react';
import { DollarSign, CheckCircle, Clock } from 'lucide-react';

const PayrollSummaryPage = ({ employees }) => {
    const [isProcessed, setIsProcessed] = useState(false);
    const formatCurrency = (amount) => `$${Math.round(amount).toLocaleString()}`;
    const currentMonthYear = 'November 2025';

    // Mock payroll calculation
    const payrollData = useMemo(() => {
        return employees.map(emp => {
            const annualSalary = emp.salary;
            const monthlyBase = annualSalary / 12;
            const mockHours = emp.status === 'Active' ? Math.floor(Math.random() * (175 - 150 + 1) + 150) : 0; 
            const hourlyRate = monthlyBase / 160;
            const overtimeHours = Math.max(0, mockHours - 160);
            const overtimePay = overtimeHours * hourlyRate * 1.5;
            const grossPay = monthlyBase + overtimePay;
            const taxDeduction = grossPay * 0.20; 
            const netPay = grossPay - taxDeduction;

            return {
                id: emp.id, name: emp.name, role: emp.role, status: emp.status,
                mockHours, overtimeHours, monthlyBase, grossPay, taxDeduction, netPay, overtimePay
            };
        }).filter(p => p.status === 'Active'); 
    }, [employees]);

    const totalNetPay = payrollData.reduce((sum, p) => sum + p.netPay, 0);

    // Admin Action: Finalize and Process Payroll
    const handleProcessPayroll = () => {
        if (!isProcessed && window.confirm(`Confirm processing payroll for ${currentMonthYear} totaling ${formatCurrency(totalNetPay)}. This action is irreversible.`)) {
            // Simulate payroll processing time
            console.log("Processing Payroll...");
            setTimeout(() => {
                setIsProcessed(true);
                alert(`Payroll for ${currentMonthYear} has been successfully processed and disbursements initiated!`);
            }, 1000);
        }
    };

    return (
        <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-3 sm:mb-0">
                    <DollarSign className="w-6 h-6 mr-3 text-indigo-500" /> Payroll Summary: <span className="text-indigo-600 ml-2">{currentMonthYear}</span>
                </h2>
                <div className="text-right p-3 bg-indigo-50 rounded-lg border-indigo-200 border">
                    <p className="text-sm font-medium text-gray-700">Total Net Disbursement</p>
                    <p className="text-3xl font-extrabold text-green-700">{formatCurrency(totalNetPay)}</p>
                </div>
            </div>

            {/* Table view for large screens */}
            <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours (OT)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Pay</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Deduction</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {payrollData.map((p) => (
                            <tr key={p.id} className="hover:bg-indigo-50/50 transition">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {p.mockHours}h ({p.overtimeHours} OT)
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">{formatCurrency(p.grossPay)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">({formatCurrency(p.taxDeduction)})</td>
                                <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-green-700">{formatCurrency(p.netPay)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Card view for small screens */}
            <div className="md:hidden grid grid-cols-1 gap-4">
                {payrollData.map((p) => (
                    <div key={p.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:bg-indigo-50/50 transition">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{p.name}</h3>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-600">Hours: {p.mockHours}h ({p.overtimeHours} OT)</p>
                            <p className="text-sm text-gray-800 font-semibold">Gross Pay: {formatCurrency(p.grossPay)}</p>
                            <p className="text-sm text-red-600">Tax Deduction: ({formatCurrency(p.taxDeduction)})</p>
                            <p className="text-lg font-bold text-green-700">Net Pay: {formatCurrency(p.netPay)}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Finalize Button - ACTIVATED for Admin */}
            <button 
                onClick={handleProcessPayroll}
                disabled={isProcessed}
                className={`mt-6 w-full py-3 font-semibold rounded-lg transition duration-150 flex items-center justify-center shadow-lg ${
                    isProcessed 
                        ? 'bg-gray-400 text-gray-800 cursor-not-allowed' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
            >
                {isProcessed ? (
                    <>
                        <Clock className="w-5 h-5 mr-2" /> Payroll Processed
                    </>
                ) : (
                    <>  
                        <CheckCircle className="w-5 h-5 mr-2" /> Finalize and Process Payroll
                    </>
                )}
            </button>
        </div>
    );
};

export default PayrollSummaryPage;