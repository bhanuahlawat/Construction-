// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// // Mock data for a typical project scope
// const initialProjectScope = [
//     { id: 1, milestone: 'Excavation & Foundation', totalValue: 500000, completion: 100, billedPreviously: 500000, currentRA: 0 },
//     { id: 2, milestone: 'Superstructure (Columns & Beams)', totalValue: 1500000, completion: 70, billedPreviously: 600000, currentRA: 450000 },
//     { id: 3, milestone: 'Slab Casting (Floors 1-3)', totalValue: 800000, completion: 100, billedPreviously: 800000, currentRA: 0 },
//     { id: 4, milestone: 'MEP First Fix', totalValue: 900000, completion: 40, billedPreviously: 0, currentRA: 360000 },
//     { id: 5, milestone: 'Internal Finishings & Paint', totalValue: 1200000, completion: 5, billedPreviously: 0, currentRA: 60000 },
// ];

// const RABilling = () => {
//     const navigate = useNavigate();
//     const [projectScope, setProjectScope] = useState(initialProjectScope);
//     const [raBillNumber, setRaBillNumber] = useState('RA-2025-004'); // Assuming this is the 4th bill

//     // Function to calculate the billable value for the current RA based on changes
//     const calculateCurrentRA = (item) => {
//         // Total value of work done to date: (Total Value * Completion %)
//         const workDoneValue = item.totalValue * (item.completion / 100);
        
//         // Amount to bill now: Work Done Value - Amount already Billed
//         const currentBillable = Math.max(0, workDoneValue - item.billedPreviously);
//         return currentBillable;
//     };

//     // Handler for changes in the Completion Percentage slider/input
//     const handleCompletionChange = (id, newCompletion) => {
//         const updatedScope = projectScope.map(item => {
//             if (item.id === id) {
//                 const updatedItem = {
//                     ...item,
//                     completion: Math.min(100, Math.max(0, parseFloat(newCompletion) || 0))
//                 };
//                 // Recalculate the current RA amount immediately
//                 updatedItem.currentRA = calculateCurrentRA(updatedItem);
//                 return updatedItem;
//             }
//             return item;
//         });
//         setProjectScope(updatedScope);
//     };

//     // Global calculations for the summary
//     const totalCurrentRA = projectScope.reduce((sum, item) => sum + item.currentRA, 0);
//     const totalGrossProjectValue = projectScope.reduce((sum, item) => sum + item.totalValue, 0);
//     const totalBilledPreviously = projectScope.reduce((sum, item) => sum + item.billedPreviously, 0);
    
//     // Placeholder for TDS/Retention (these would normally be applied here)
//     const retentionRate = 0.05; // 5% retention
//     const retentionAmount = totalCurrentRA * retentionRate;
//     const netBillableAmount = totalCurrentRA - retentionAmount;


//     const handleFinalizeRA = (e) => {
//         e.preventDefault();
//         // In a real app, this would generate the full document package (c)
//         console.log(`Finalizing RA Bill No. ${raBillNumber}. Net Amount: ${netBillableAmount.toLocaleString('en-IN')}`);
        
//         // --- Document Generation Mock ---
//         alert(`RA Bill ${raBillNumber} and supporting documents generated successfully!`);
//         // The next logical step is to navigate to a PDF preview or the dashboard.
//         navigate('/admin/sales-billing');
//     };


//     return (
//         <div className="p-4 sm:p-6 bg-white rounded-xl shadow-lg max-w-7xl mx-auto">
//             <header className="mb-6 border-b pb-4 flex flex-col sm:flex-row justify-between sm:items-center">
//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-0">Progress (RA) Billing - {raBillNumber}</h1>
//                 <button 
//                     onClick={() => navigate('/admin/salesandbilling')}
//                     className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-150 text-sm"
//                 >
//                     &larr; Back to Sales Dashboard
//                 </button>
//             </header>

//             {/* Project Context */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-purple-50 rounded-xl border border-purple-200 text-sm">
//                 <div><span className="font-semibold text-gray-700">Client:</span> City Development Corp</div>
//                 <div><span className="font-semibold text-gray-700">Project:</span> High-Rise Tower A</div>
//                 <div><span className="font-semibold text-gray-700">Total Contract Value:</span> {totalGrossProjectValue.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 })}</div>
//             </div>

//             {/* RA Billing Details Table */}
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Milestone Completion Status</h2>
//             <div className="overflow-x-auto shadow-md rounded-lg mb-8">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-purple-100">
//                         <tr>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase min-w-[180px]">Milestone / Work Item</th>
//                             <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase min-w-[120px]">Total Value</th>
//                             <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase min-w-[150px]">Completion (%)</th>
//                             <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase min-w-[120px]">Billed Previously</th>
//                             <th className="px-4 py-3 text-right text-xs font-medium text-purple-700 uppercase min-w-[140px]">Current RA Value (b)</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {projectScope.map((item) => (
//                             <tr key={item.id} className="hover:bg-gray-50">
//                                 <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.milestone}</td>
//                                 <td className="px-4 py-3 text-sm text-right text-gray-700">
//                                     {item.totalValue.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 })}
//                                 </td>
//                                 <td className="px-4 py-3 text-sm">
//                                     <div className="flex items-center space-x-2">
//                                         <input
//                                             type="range"
//                                             min="0"
//                                             max="100"
//                                             step="5"
//                                             value={item.completion}
//                                             onChange={(e) => handleCompletionChange(item.id, e.target.value)}
//                                             className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm"
//                                         />
//                                         <input
//                                             type="number"
//                                             min="0"
//                                             max="100"
//                                             value={item.completion}
//                                             onChange={(e) => handleCompletionChange(item.id, e.target.value)}
//                                             className="w-16 border rounded-md p-1.5 text-sm text-center"
//                                         />
//                                         <span className="text-gray-600">%</span>
//                                     </div>
//                                 </td>
//                                 <td className="px-4 py-3 text-sm text-right text-gray-500">
//                                     {item.billedPreviously.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 })}
//                                 </td>
//                                 <td className={`px-4 py-3 text-sm text-right font-bold ${item.currentRA > 0 ? 'text-purple-700' : 'text-gray-400'}`}>
//                                     {item.currentRA.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 })}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Summary and Document Generation Panel */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
//                 {/* Billing Summary */}
//                 <div className="lg:col-span-2 p-6 bg-gray-50 rounded-xl border">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">RA Bill Financial Summary</h3>
//                     <div className="space-y-2">
//                         <SummaryRow label="Total Billed To Date (Previous RAs)" value={totalBilledPreviously} />
//                         <SummaryRow label="Current Billable Value (Gross)" value={totalCurrentRA} />
//                         <SummaryRow label={`Retention (${retentionRate * 100}%)`} value={retentionAmount} deduction={true} />
                        
//                         <div className="border-t border-purple-300 pt-3 mt-3">
//                             <SummaryRow label="Net Amount for RA Bill No. 4" value={netBillableAmount} finalPayable={true} />
//                         </div>
//                     </div>
//                     <p className="mt-4 text-xs text-gray-500">
//                         *Taxes (GST/TDS) and further deductions (e, holding amounts) must be applied to the net billable amount during final processing.
//                     </p>
//                 </div>
                
//                 {/* Document Generation (c) */}
//                 <div className="lg:col-span-1 p-6 bg-purple-100 rounded-xl border border-purple-300 flex flex-col justify-between">
//                     <div>
//                         <h3 className="text-lg font-semibold text-purple-800 mb-4">Generate Documents Package</h3>
//                         <p className="text-sm text-purple-700 mb-4">
//                             Ensure all required supporting formats are generated automatically for the client.
//                         </p>
//                         <ul className="text-sm space-y-2 text-purple-700 list-disc list-inside">
//                             <li>Customer RA Bill</li>
//                             <li>Payment Advice Note</li>
//                             <li>Cumulative Sheet</li>
//                             <li>Reconciliation Statement</li>
//                         </ul>
//                     </div>
//                     <button 
//                         onClick={handleFinalizeRA}
//                         className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition duration-150 mt-4"
//                     >
//                         Finalize & Generate RA Bill
//                     </button>
//                 </div>

//             </div>
//         </div>
//     );
// };

// // Helper component for summary rows (reused from CreateInvoice.jsx)
// const SummaryRow = ({ label, value, deduction = false, finalPayable = false }) => (
//     <div className={`flex justify-between ${finalPayable ? 'text-xl font-bold text-purple-800' : 'text-base text-gray-700'}`}>
//         <span className={deduction ? 'text-red-600' : 'text-gray-700'}>
//             {label}
//         </span>
//         <span className={deduction ? 'text-red-600' : 'text-gray-800'}>
//             {value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 })}
//         </span>
//     </div>
// );

// export default RABilling;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 🧱 Mock data for demonstration
const initialProjectScope = [
  { id: 1, milestone: "Excavation & Foundation", totalValue: 500000, completion: 100, billedPreviously: 500000, currentRA: 0 },
  { id: 2, milestone: "Superstructure (Columns & Beams)", totalValue: 1500000, completion: 70, billedPreviously: 600000, currentRA: 450000 },
  { id: 3, milestone: "Slab Casting (Floors 1-3)", totalValue: 800000, completion: 100, billedPreviously: 800000, currentRA: 0 },
  { id: 4, milestone: "MEP First Fix", totalValue: 900000, completion: 40, billedPreviously: 0, currentRA: 360000 },
  { id: 5, milestone: "Internal Finishings & Paint", totalValue: 1200000, completion: 5, billedPreviously: 0, currentRA: 60000 },
];

const RABilling = () => {
  const navigate = useNavigate();
  const [projectScope, setProjectScope] = useState(initialProjectScope);
  const [raBillNumber, setRaBillNumber] = useState("RA-2025-004");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 🧮 Calculation Functions
  const calculateCurrentRA = (item) => {
    const workDoneValue = item.totalValue * (item.completion / 100);
    const currentBillable = Math.max(0, workDoneValue - item.billedPreviously);
    return currentBillable;
  };

  const handleCompletionChange = (id, newCompletion) => {
    const updatedScope = projectScope.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          completion: Math.min(100, Math.max(0, parseFloat(newCompletion) || 0)),
        };
        updatedItem.currentRA = calculateCurrentRA(updatedItem);
        return updatedItem;
      }
      return item;
    });
    setProjectScope(updatedScope);
  };

  // 🧾 Summary Calculations
  const totalCurrentRA = projectScope.reduce((sum, item) => sum + item.currentRA, 0);
  const totalGrossProjectValue = projectScope.reduce((sum, item) => sum + item.totalValue, 0);
  const totalBilledPreviously = projectScope.reduce((sum, item) => sum + item.billedPreviously, 0);
  const retentionRate = 0.05;
  const retentionAmount = totalCurrentRA * retentionRate;
  const netBillableAmount = totalCurrentRA - retentionAmount;

  const handleFinalizeRA = (e) => {
    e.preventDefault();
    alert(`✅ RA Bill ${raBillNumber} generated successfully!\nNet Amount: ₹${netBillableAmount.toLocaleString("en-IN")}`);
    navigate("/admin/salesandbilling");
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-6 border-b pb-4 flex flex-col sm:flex-row justify-between sm:items-center">
        <h1 className="text-3xl font-bold text-gray-900">Progress (RA) Billing - {raBillNumber}</h1>
        <button
          onClick={() => navigate("/admin/salesandbilling")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-150 text-sm mt-3 sm:mt-0"
        >
          &larr; Back to Sales Dashboard
        </button>
      </header>

      {/* Project Context */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-indigo-50 rounded-xl border border-indigo-200 text-sm">
        <div><span className="font-semibold text-gray-700">Client:</span> City Development Corp</div>
        <div><span className="font-semibold text-gray-700">Project:</span> High-Rise Tower A</div>
        <div><span className="font-semibold text-gray-700">Contract Value:</span> ₹{totalGrossProjectValue.toLocaleString("en-IN")}</div>
      </div>

      {/* Table Section */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Milestone Completion Status</h2>
      <div className="overflow-x-auto rounded-lg shadow-lg mb-8 border">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Milestone / Work Item</th>
              <th className="px-4 py-3 text-right font-medium text-gray-700">Total Value</th>
              <th className="px-4 py-3 text-center font-medium text-gray-700">Completion (%)</th>
              <th className="px-4 py-3 text-right font-medium text-gray-700">Billed Previously</th>
              <th className="px-4 py-3 text-right font-medium text-indigo-700">Current RA Value</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {projectScope.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{item.milestone}</td>
                <td className="px-4 py-3 text-right text-gray-700">
                  ₹{item.totalValue.toLocaleString("en-IN")}
                </td>
                {/* <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={item.completion}
                      onChange={(e) => handleCompletionChange(item.id, e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
                    />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={item.completion}
                      onChange={(e) => handleCompletionChange(item.id, e.target.value)}
                      className="w-14 border rounded-md p-1 text-center"
                    />
                    <span>%</span>
                  </div>
                </td> */}
                <td className="px-4 py-3 text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={item.completion}
                      onChange={(e) => handleCompletionChange(item.id, e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm"
                    />
                    <div className="flex items-center justify-end space-x-1">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.completion}
                        onChange={(e) => handleCompletionChange(item.id, e.target.value)}
                        className="w-16 border rounded-md p-1.5 text-sm text-center"
                      />
                      <span className="text-gray-600">%</span>
                    </div>
                  </div>
                </td>
                                
                <td className="px-4 py-3 text-right text-gray-600">
                  ₹{item.billedPreviously.toLocaleString("en-IN")}
                </td>
                <td className={`px-4 py-3 text-right font-semibold ${item.currentRA > 0 ? "text-indigo-700" : "text-gray-400"}`}>
                  ₹{item.currentRA.toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary */}
        <div className="lg:col-span-2 p-6 bg-white rounded-xl shadow-lg border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">RA Bill Financial Summary</h3>
          <SummaryRow label="Total Billed Previously" value={totalBilledPreviously} />
          <SummaryRow label="Current Billable Value (Gross)" value={totalCurrentRA} />
          <SummaryRow label={`Retention (${retentionRate * 100}%)`} value={retentionAmount} deduction />
          <div className="border-t border-indigo-300 pt-3 mt-3">
            <SummaryRow label="Net Amount (Payable)" value={netBillableAmount} finalPayable />
          </div>
          <p className="mt-3 text-xs text-gray-500">
            *Taxes (GST/TDS) and other deductions will apply during final processing.
          </p>
        </div>

        {/* Document Generation */}
        <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-300 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-3">Generate Documents Package</h3>
            <p className="text-sm text-indigo-700 mb-4">
              Automatically generate all client deliverables with this RA Bill.
            </p>
            <ul className="text-sm text-indigo-700 list-disc list-inside space-y-1">
              <li>Customer RA Bill</li>
              <li>Payment Advice Note</li>
              <li>Cumulative Sheet</li>
              <li>Reconciliation Statement</li>
            </ul>
          </div>
          <button
            onClick={handleFinalizeRA}
            className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transition"
          >
            Finalize & Generate RA Bill
          </button>
        </div>
      </div>
    </div>
  );
};

// 💡 Reusable Summary Row Component
const SummaryRow = ({ label, value, deduction = false, finalPayable = false }) => (
  <div className={`flex justify-between ${finalPayable ? "text-xl font-bold text-indigo-800" : "text-base text-gray-700"}`}>
    <span className={deduction ? "text-red-600" : "text-gray-700"}>{label}</span>
    <span className={deduction ? "text-red-600" : "text-gray-900"}>
      ₹{value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
    </span>
  </div>
);

export default RABilling;
