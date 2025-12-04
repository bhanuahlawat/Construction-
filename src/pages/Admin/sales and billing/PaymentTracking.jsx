// import React, { useEffect, useState } from "react";
// import { Bell, ArrowLeft } from "lucide-react"; // <-- Import ArrowLeft

// const challans = [
//   { id: 1, company: "ABC Pvt Ltd", tdsDueDate: "2025-10-05", filingDeadline: "2025-10-10", challanStatus: "Unpaid" },
//   { id: 2, company: "XYZ Ltd", tdsDueDate: "2025-09-28", filingDeadline: "2025-10-05", challanStatus: "Paid" },
//   { id: 3, company: "TechNova Systems", tdsDueDate: "2025-10-08", filingDeadline: "2025-10-15", challanStatus: "Unpaid" },
//   { id: 4, company: "Green Valley Farms", tdsDueDate: "2025-09-25", filingDeadline: "2025-10-02", challanStatus: "Paid" },
//   { id: 5, company: "FutureTech Labs", tdsDueDate: "2025-10-18", filingDeadline: "2025-10-25", challanStatus: "Unpaid" },
//   { id: 6, company: "NextGen Corp", tdsDueDate: "2025-09-20", filingDeadline: "2025-09-27", challanStatus: "Paid" },
//   { id: 7, company: "Sunrise Traders", tdsDueDate: "2025-10-03", filingDeadline: "2025-10-10", challanStatus: "Unpaid" },
//   { id: 8, company: "OceanBlue Logistics", tdsDueDate: "2025-10-01", filingDeadline: "2025-10-08", challanStatus: "Unpaid" },
//   { id: 9, company: "Prime Builders", tdsDueDate: "2025-10-22", filingDeadline: "2025-10-29", challanStatus: "Paid" },
//   { id: 10, company: "Digital Works Ltd", tdsDueDate: "2025-10-15", filingDeadline: "2025-10-22", challanStatus: "Unpaid" },
//   { id: 11, company: "EcoEnergy Pvt Ltd", tdsDueDate: "2025-09-30", filingDeadline: "2025-10-07", challanStatus: "Paid" },
//   { id: 12, company: "Skyline Industries", tdsDueDate: "2025-10-20", filingDeadline: "2025-10-27", challanStatus: "Unpaid" },
//   { id: 13, company: "BlueChip Finance", tdsDueDate: "2025-09-18", filingDeadline: "2025-09-25", challanStatus: "Paid" },
//   { id: 14, company: "Nova Retailers", tdsDueDate: "2025-10-25", filingDeadline: "2025-11-01", challanStatus: "Unpaid" },
//   { id: 15, company: "QuickMart", tdsDueDate: "2025-09-15", filingDeadline: "2025-09-22", challanStatus: "Paid" },
//   { id: 16, company: "Global Textiles", tdsDueDate: "2025-10-28", filingDeadline: "2025-11-04", challanStatus: "Unpaid" },
//   { id: 17, company: "Infinity Motors", tdsDueDate: "2025-09-22", filingDeadline: "2025-09-29", challanStatus: "Paid" },
//   { id: 18, company: "Delta Developers", tdsDueDate: "2025-10-12", filingDeadline: "2025-10-19", challanStatus: "Unpaid" },
//   { id: 19, company: "UrbanSpaces Interiors", tdsDueDate: "2025-10-06", filingDeadline: "2025-10-13", challanStatus: "Paid" },
//   { id: 20, company: "Vertex Analytics", tdsDueDate: "2025-10-16", filingDeadline: "2025-10-23", challanStatus: "Unpaid" },
//   { id: 21, company: "Crystal Technologies", tdsDueDate: "2025-09-27", filingDeadline: "2025-10-04", challanStatus: "Paid" },
//   { id: 22, company: "Apex Logistics", tdsDueDate: "2025-10-09", filingDeadline: "2025-10-16", challanStatus: "Unpaid" },
// ];

// export default function Alert() {
//   const [challanData, setChallanData] = useState(challans);

//   useEffect(()=>{
//     window.scrollTo(0,0);
//   },[])
//   
//   // Function to handle the back navigation
//   const handleGoBack = () => {
//     window.history.back();
//   };

//   function handleSendAlert(companyName, status) {
//     alert("Alert sent for " + companyName + " - Status: " + status);
//   }

//   function isOverdue(dueDate) {
//     // Current time is 2025-10-13
//     const today = new Date("2025-10-13"); // Using a static current time for consistent overdue calculation
//     const due = new Date(dueDate);
//     return due < today;
//   }

//   let unpaidCount = 0;
//   let overdueCount = 0;
//   for (let i = 0; i < challanData.length; i++) {
//     if (challanData[i].challanStatus === "Unpaid") {
//       unpaidCount++;
//       if (isOverdue(challanData[i].tdsDueDate)) {
//         overdueCount++;
//       }
//     }
//   }

//   return (
//     <div className="h-100% bg-gray-50 p-8">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Back Button Added Here */}
//         <button
//           onClick={handleGoBack}
//           className="flex items-center gap-2 mb-8 text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
//         >
//           <ArrowLeft size={20} />
//           <span className="font-medium">Go Back</span>
//         </button>

//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold text-gray-900 mb-3">
//             TDS Challan Dashboard
//           </h1>
//           <p className="text-gray-600 text-lg">Manage your tax deductions at source efficiently</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition-shadow">
//             <div className="text-gray-500 text-sm font-semibold uppercase mb-2">Total Challans</div>
//             <div className="text-3xl font-bold text-gray-900">{challanData.length}</div>
//           </div>
//           
//           <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600 hover:shadow-lg transition-shadow">
//             <div className="text-gray-500 text-sm font-semibold uppercase mb-2">Unpaid Challans</div>
//             <div className="text-3xl font-bold text-red-600">{unpaidCount}</div>
//           </div>
//           
//           <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-600 hover:shadow-lg transition-shadow">
//             <div className="text-gray-500 text-sm font-semibold uppercase mb-2">Overdue Challans</div>
//             <div className="text-3xl font-bold text-orange-600">{overdueCount}</div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
//           <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-blue-600 text-white sticky top-0 z-10">
//                   <th className="p-4 text-left text-sm font-bold uppercase">Company</th>
//                   <th className="p-4 text-left text-sm font-bold uppercase">TDS Due Date</th>
//                   <th className="p-4 text-left text-sm font-bold uppercase">Filing Deadline</th>
//                   <th className="p-4 text-left text-sm font-bold uppercase">Status</th>
//                   <th className="p-4 text-left text-sm font-bold uppercase">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {challanData.map((item, index) => {
//                   const overdue = item.challanStatus === "Unpaid" && isOverdue(item.tdsDueDate);
//                   return (
//                   <tr 
//                     key={item.id} 
//                     className={`border-b border-gray-200 hover:bg-blue-50 transition-colors ${overdue ? 'bg-red-50' : ''}`}
//                   >
//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
//                           {item.company.charAt(0)}
//                         </div>
//                         <span className="font-semibold text-gray-800">{item.company}</span>
//                         {overdue && (
//                           <span className="px-2 py-1 rounded-md bg-orange-100 text-orange-800 font-bold text-xs border border-orange-300">
//                             OVERDUE
//                           </span>
//                         )}
//                       </div>
//                     </td>
//                     <td className="p-4 text-gray-700">{item.tdsDueDate}</td>
//                     <td className="p-4 text-gray-700">{item.filingDeadline}</td>
//                     <td className="p-4">
//                       {item.challanStatus === "Unpaid" ? (
//                         <span className="px-3 py-1 rounded-md bg-red-100 text-red-800 font-semibold text-sm border border-red-200">
//                           Unpaid
//                         </span>
//                       ) : (
//                         <span className="px-3 py-1 rounded-md bg-green-100 text-green-800 font-semibold text-sm border border-green-200">
//                           Paid
//                         </span>
//                       )}
//                     </td>
//                     <td className="p-4">
//                       {overdue && (
//                         <button
//                           onClick={() => handleSendAlert(item.company, item.challanStatus)}
//                           className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold text-sm shadow-sm hover:shadow-md transition-all"
//                         >
//                           <Bell size={16} />
//                           Send Alert
//                         </button>
//                       )}
//                   </td>
//                   </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="mt-6 text-center text-gray-600">
//           <p className="text-base">
//             Displaying all <span className="font-bold text-blue-600">{challanData.length}</span> challans
//             {unpaidCount > 0 && (
//               <span className="ml-4 text-red-600 font-bold">
//                 🚨 {unpaidCount} alerts pending
//               </span>
//             )}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentTracking = () => {
  const navigate = useNavigate();

  const [payments, setPayments] = useState([
    {
      id: 1,
      client: "Skyline Builders",
      amount: 45000,
      dueDate: "2025-01-10",
      status: "Paid",
      invoice: "INV-1024",
    },
    {
      id: 2,
      client: "Urban Estate Pvt Ltd",
      amount: 90000,
      dueDate: "2025-01-05",
      status: "Overdue",
      invoice: "INV-1031",
    },
    {
      id: 3,
      client: "GreenField Constructions",
      amount: 30000,
      dueDate: "2025-01-20",
      status: "Pending",
      invoice: "INV-1038",
    },
    {
      id: 4,
      client: "Bright Homes",
      amount: 75000,
      dueDate: "2025-01-02",
      status: "Overdue",
      invoice: "INV-1042",
    },
    {
      id: 5,
      client: "Prime Build Co.",
      amount: 60000,
      dueDate: "2025-01-25",
      status: "Pending",
      invoice: "INV-1047",
    },
    
  ]);

  const sendAlert = (id) => {
    const payment = payments.find((p) => p.id === id);
    console.log(`Alert sent to ${payment.client} for Invoice ${payment.invoice}`);
    alert(
      `Reminder alert sent to ${payment.client} for overdue invoice ${payment.invoice}`
    );
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-lg max-w-7xl mx-auto">

      {/* HEADER */}
      <header className="mb-6 border-b pb-4 flex flex-col sm:flex-row justify-between sm:items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-0">
          Payment Tracking
        </h1>

        {/* Back Button (same as Debit/Credit page) */}
        <button
          onClick={() => navigate("/salesandbilling")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-150 text-sm mt-3 sm:mt-0"
        >
          ← Back to Dashboard
        </button>
      </header>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="p-5 rounded-xl bg-indigo-50 border-l-4 border-indigo-500 shadow">
          <p className="text-sm text-gray-600">Total Payments (₹)</p>
          <p className="text-3xl font-bold text-indigo-700">
            {payments.reduce((acc, p) => acc + p.amount, 0).toLocaleString("en-IN")}
          </p>
        </div>

        <div className="p-5 rounded-xl bg-green-50 border-l-4 border-green-500 shadow">
          <p className="text-sm text-gray-600">Paid (₹)</p>
          <p className="text-3xl font-bold text-green-700">
            {payments
              .filter((p) => p.status === "Paid")
              .reduce((acc, p) => acc + p.amount, 0)
              .toLocaleString("en-IN")}
          </p>
        </div>

        <div className="p-5 rounded-xl bg-red-50 border-l-4 border-red-500 shadow">
          <p className="text-sm text-gray-600">Overdue (₹)</p>
          <p className="text-3xl font-bold text-red-700">
            {payments
              .filter((p) => p.status === "Overdue")
              .reduce((acc, p) => acc + p.amount, 0)
              .toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* TABLE */}
      {/* <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount (₹)</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Due Date</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">

                <td className="px-4 py-3 text-sm font-medium text-gray-800">{p.client}</td>

                <td className="px-4 py-3 text-sm text-gray-700">{p.invoice}</td>

                <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                  {p.amount.toLocaleString("en-IN")}
                </td>

                <td className="px-4 py-3 text-sm text-center text-gray-600">{p.dueDate}</td>

                <td className="px-4 py-3 text-sm text-center">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold 
                      ${p.status === "Paid" ? "bg-green-100 text-green-700" : ""}
                      ${p.status === "Pending" ? "bg-yellow-100 text-yellow-700" : ""}
                      ${p.status === "Overdue" ? "bg-red-100 text-red-700" : ""}
                    `}
                  >
                    {p.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm text-center">
                  {p.status === "Overdue" ? (
                    <button
                      onClick={() => sendAlert(p.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-xs shadow"
                    >
                      Send Alert 🔔
                    </button>
                  ) : (
                    <span className="text-gray-400 text-xs">No Action</span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      <div className="mb-6">
        {/* Desktop / Tablet Table */}
        <div className="hidden md:block overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount (₹)</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
      
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{p.client}</td>
              
                  <td className="px-4 py-3 text-sm text-gray-700">{p.invoice}</td>
              
                  <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                    {p.amount.toLocaleString("en-IN")}
                  </td>
              
                  <td className="px-4 py-3 text-sm text-center text-gray-600">{p.dueDate}</td>
              
                  <td className="px-4 py-3 text-sm text-center">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold 
                      ${p.status === "Paid" ? "bg-green-100 text-green-700" : ""}
                      ${p.status === "Pending" ? "bg-yellow-100 text-yellow-700" : ""}
                      ${p.status === "Overdue" ? "bg-red-100 text-red-700" : ""}`}
                    >
                      {p.status}
                    </span>
                  </td>
                      
                  <td className="px-4 py-3 text-sm text-center">
                    {p.status === "Overdue" ? (
                      <button
                        onClick={() => sendAlert(p.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-xs shadow"
                      >
                        Send Alert 🔔
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs">No Action</span>
                    )}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
            
        {/* Mobile Responsive Cards */}
        <div className="md:hidden space-y-4">
          {payments.map((p) => (
            <div key={p.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            
              <div className="flex justify-between mb-2">
                <span className="text-xs text-gray-500 font-semibold">Client</span>
                <span className="text-sm font-bold">{p.client}</span>
              </div>
          
              <div className="flex justify-between mb-2">
                <span className="text-xs text-gray-500 font-semibold">Invoice</span>
                <span className="text-sm text-gray-700">{p.invoice}</span>
              </div>
          
              <div className="flex justify-between mb-2">
                <span className="text-xs text-gray-500 font-semibold">Amount (₹)</span>
                <span className="text-sm font-semibold text-gray-900">
                  {p.amount.toLocaleString("en-IN")}
                </span>
              </div>
          
              <div className="flex justify-between mb-2">
                <span className="text-xs text-gray-500 font-semibold">Due Date</span>
                <span className="text-sm text-gray-600">{p.dueDate}</span>
              </div>
          
              <div className="flex justify-between mb-3">
                <span className="text-xs text-gray-500 font-semibold">Status</span>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold 
                  ${p.status === "Paid" ? "bg-green-100 text-green-700" : ""}
                  ${p.status === "Pending" ? "bg-yellow-100 text-yellow-700" : ""}
                  ${p.status === "Overdue" ? "bg-red-100 text-red-700" : ""}`}
                >
                  {p.status}
                </span>
              </div>
                  
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500 font-semibold">Action</span>
                  
                {p.status === "Overdue" ? (
                  <button
                    onClick={() => sendAlert(p.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-xs shadow"
                  >
                    Send Alert 🔔
                  </button>
                ) : (
                  <span className="text-gray-400 text-xs">No Action</span>
                )}
              </div>
              
            </div>
          ))}
        </div>
      </div>
        

      <p className="mt-4 text-sm text-gray-500">
        * Overdue invoices automatically trigger payment delay alerts.
      </p>
    </div>
  );
};

export default PaymentTracking;
