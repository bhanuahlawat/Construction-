// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const stateOptions = [
//     { code: 'MH', name: 'Maharashtra' },
//     { code: 'GJ', name: 'Gujarat' },
//     { code: 'DL', name: 'Delhi' },
//     { code: 'HR', name: 'Haryana' },
//     { code: 'KA', name: 'Karnataka' },
//     { code: 'PB', name: 'Punjab' },
//     { code: 'CH', name: 'Chandigarh (UT)' }, // Union Territory for SGST/CGST logic
// ];

// const GstCalculator = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         taxableAmount: 100000,
//         gstRate: 0.18, // 18% default rate for construction services
//         supplyState: 'MH', // State where the service/goods originated
//         recipientState: 'MH', // State where the client/project is located
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     // --- Core Calculation Logic ---
//     const { taxableAmount, gstRate, supplyState, recipientState } = formData;
//     const amount = parseFloat(taxableAmount) || 0;
//     const rate = parseFloat(gstRate) || 0;

//     // 1. Determine Tax Type (IGST vs. CGST/SGST)
//     const isInterState = supplyState !== recipientState;

//     // 2. Calculate Total Tax
//     const totalGST = amount * rate;

//     // 3. Breakdown
//     let igst = 0;
//     let cgst = 0;
//     let sgst = 0;

//     if (isInterState) {
//         // Inter-State transaction uses IGST
//         igst = totalGST;
//     } else {
//         // Intra-State transaction splits tax into CGST and SGST
//         cgst = totalGST / 2;
//         sgst = totalGST / 2;
//     }

//     const grandTotal = amount + totalGST;

//     // Helper component for summary rows
//     const TaxRow = ({ label, value, color = 'text-gray-700', isFinal = false }) => (
//         <div className={`flex justify-between py-1 ${isFinal ? 'border-t-2 border-indigo-300 pt-3 mt-2' : ''}`}>
//             <span className={`text-sm ${color}`}>{label}</span>
//             <span className={`font-semibold ${color}`}>
//                 {value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 })}
//             </span>
//         </div>
//     );

//     return (
//         <div className="p-4 sm:p-6 max-w-4xl mx-auto">
//             <header className="mb-6 border-b pb-4 flex flex-col sm:flex-row justify-between sm:items-center">
//                 <h1 className="text-3xl font-bold text-gray-900">GST Calculation Tool</h1>
//                 <button 
//                     onClick={() => navigate('/admin/salesandbilling')}
//                     className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-150 text-sm mt-3 sm:mt-0"
//                 >
//                     &larr; Back to Sales Dashboard
//                 </button>
//             </header>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 {/* --- INPUTS: Taxable Amount and Location --- */}
//                 <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
//                     <h2 className="text-xl font-semibold text-indigo-700 mb-4 border-b pb-2">Transaction Details</h2>
                    
//                     {/* Taxable Amount */}
//                     <div className="mb-4">
//                         <label htmlFor="taxableAmount" className="block text-sm font-medium text-gray-700 mb-1">
//                             Taxable Value (Base Amount)
//                         </label>
//                         <input
//                             type="number"
//                             id="taxableAmount"
//                             name="taxableAmount"
//                             value={formData.taxableAmount}
//                             onChange={handleInputChange}
//                             min="0"
//                             step="1000"
//                             className="w-full border border-gray-300 p-3 rounded-lg text-xl font-bold focus:ring-indigo-500 focus:border-indigo-500"
//                         />
//                     </div>

//                     {/* GST Rate (Read-only for demo) */}
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Applicable GST Rate (%)
//                         </label>
//                         <div className="flex items-center">
//                              <input
//                                 type="number"
//                                 id="gstRate"
//                                 name="gstRate"
//                                 value={rate * 100}
//                                 readOnly
//                                 className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 font-mono"
//                             />
//                             <span className="ml-2 text-xl text-gray-600">%</span>
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1">This rate would be dynamically fetched based on HSN/SAC code.</p>
//                     </div>

//                     {/* State Selection */}
//                     <h3 className="text-md font-medium text-gray-700 mt-6 mb-3">Location for GST Determination (m)</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label htmlFor="supplyState" className="block text-xs font-medium text-gray-600 mb-1">
//                                 State of Supply (Your Location)
//                             </label>
//                             <select
//                                 id="supplyState"
//                                 name="supplyState"
//                                 value={formData.supplyState}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 p-2 rounded-lg"
//                             >
//                                 {stateOptions.map(state => (
//                                     <option key={state.code} value={state.code}>{state.name} ({state.code})</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div>
//                             <label htmlFor="recipientState" className="block text-xs font-medium text-gray-600 mb-1">
//                                 State of Recipient/Project
//                             </label>
//                             <select
//                                 id="recipientState"
//                                 name="recipientState"
//                                 value={formData.recipientState}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 p-2 rounded-lg"
//                             >
//                                 {stateOptions.map(state => (
//                                     <option key={state.code} value={state.code}>{state.name} ({state.code})</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- OUTPUTS: Results and Breakdown --- */}
//                 <div className="p-6 bg-indigo-50 rounded-xl shadow-lg border border-indigo-200">
//                     <h2 className="text-xl font-semibold text-indigo-700 mb-4 border-b pb-2">GST Calculation Result (g)</h2>

//                     <div className="mb-6 p-4 bg-indigo-100 rounded-lg">
//                         <p className="font-bold text-lg text-indigo-800">
//                             Transaction Type: 
//                             <span className={`ml-2 px-3 py-1 rounded-full text-sm font-extrabold ${isInterState ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
//                                 {isInterState ? 'Inter-State (IGST)' : 'Intra-State (CGST + SGST)'}
//                             </span>
//                         </p>
//                         <p className="text-sm text-gray-600 mt-1">
//                             {isInterState 
//                                 ? `Since State of Supply (${supplyState}) ≠ Recipient State (${recipientState}), IGST is applied.`
//                                 : `Since State of Supply (${supplyState}) = Recipient State (${recipientState}), CGST and SGST are applied.`
//                             }
//                         </p>
//                     </div>

//                     {/* Detailed Breakdown */}
//                     <div className="space-y-1">
//                         <TaxRow label="Taxable Value" value={amount} color="text-gray-900 font-bold" />
//                         <TaxRow label="Total GST Rate" value={rate * 100} color="text-gray-500" />
                        
//                         <div className="border-t my-3 border-dashed"></div>

//                         {/* IGST Row */}
//                         <TaxRow 
//                             label={`IGST @ ${rate * 100}%`} 
//                             value={igst} 
//                             color={isInterState ? 'text-red-600 font-bold' : 'text-gray-400'} 
//                         />
                        
//                         {/* CGST/SGST Rows */}
//                         <TaxRow 
//                             label={`CGST @ ${(rate * 100) / 2}%`} 
//                             value={cgst} 
//                             color={!isInterState ? 'text-green-600' : 'text-gray-400'} 
//                         />
//                          <TaxRow 
//                             label={`SGST @ ${(rate * 100) / 2}%`} 
//                             value={sgst} 
//                             color={!isInterState ? 'text-green-600' : 'text-gray-400'} 
//                         />

//                         <div className="border-t my-3 border-dashed"></div>

//                         {/* Grand Total */}
//                         <TaxRow label="Total Tax Payable" value={totalGST} color="text-indigo-800 font-extrabold" />
//                         <TaxRow label="GRAND TOTAL (Inclusive of GST)" value={grandTotal} color="text-indigo-900" isFinal={true} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default GstCalculator;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const stateOptions = [
  { code: 'MH', name: 'Maharashtra' },
  { code: 'GJ', name: 'Gujarat' },
  { code: 'DL', name: 'Delhi' },
  { code: 'HR', name: 'Haryana' },
  { code: 'KA', name: 'Karnataka' },
  { code: 'PB', name: 'Punjab' },
  { code: 'CH', name: 'Chandigarh (UT)' },
];

const GstCalculator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    taxableAmount: 100000,
    gstRate: 0.18,
    supplyState: 'MH',
    recipientState: 'MH',
  });

  const { taxableAmount, gstRate, supplyState, recipientState } = formData;
  const amount = parseFloat(taxableAmount) || 0;
  const rate = parseFloat(gstRate) || 0;
  const isInterState = supplyState !== recipientState;
  const totalGST = amount * rate;

  let igst = 0,
    cgst = 0,
    sgst = 0;
  if (isInterState) igst = totalGST;
  else {
    cgst = totalGST / 2;
    sgst = totalGST / 2;
  }
  const grandTotal = amount + totalGST;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const TaxRow = ({ label, value, color = 'text-gray-700', isFinal = false }) => (
    <div
      className={`flex justify-between py-1 ${
        isFinal ? 'border-t-2 border-indigo-300 pt-3 mt-2' : ''
      }`}
    >
      <span className={`text-sm ${color}`}>{label}</span>
      <span className={`font-semibold ${color}`}>
        {value.toLocaleString('en-IN', {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 2,
        })}
      </span>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <header className="mb-6 sm:mb-8 border-b pb-3 flex flex-col sm:flex-row justify-between sm:items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          GST Calculation Tool
        </h1>
        <button
          onClick={() => navigate('/admin/salesandbilling')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-150 text-sm mt-3 sm:mt-0"
        >
          ← Back to Sales Dashboard
        </button>
      </header>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* LEFT CARD: INPUTS */}
        <div className="p-5 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-700 mb-4 border-b pb-2">
            Transaction Details
          </h2>

          {/* Taxable Amount */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Taxable Value (Base Amount)
            </label>
            <input
              type="number"
              name="taxableAmount"
              value={formData.taxableAmount}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-3 rounded-lg text-lg font-bold focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* GST Rate */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Applicable GST Rate (%)
            </label>
            <div className="flex items-center">
              <input
                type="number"
                name="gstRate"
                value={rate * 100}
                readOnly
                className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 font-mono"
              />
              <span className="ml-2 text-lg text-gray-600">%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              This rate can be dynamic based on HSN/SAC codes.
            </p>
          </div>

          {/* STATES */}
          <h3 className="text-md font-semibold text-gray-700 mt-6 mb-3">
            GST Location Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                State of Supply
              </label>
              <select
                name="supplyState"
                value={formData.supplyState}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              >
                {stateOptions.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name} ({state.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                State of Recipient
              </label>
              <select
                name="recipientState"
                value={formData.recipientState}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              >
                {stateOptions.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name} ({state.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT CARD: OUTPUTS */}
        <div className="p-5 sm:p-6 bg-indigo-50 rounded-xl shadow-lg border border-indigo-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-700 mb-4 border-b pb-2">
            GST Calculation Result
          </h2>

          <div className="mb-6 p-4 bg-indigo-100 rounded-lg">
            <p className="font-bold text-base sm:text-lg text-indigo-800">
              Transaction Type:{' '}
              <span
                className={`ml-2 px-3 py-1 rounded-full text-sm font-extrabold ${
                  isInterState
                    ? 'bg-red-200 text-red-800'
                    : 'bg-green-200 text-green-800'
                }`}
              >
                {isInterState ? 'Inter-State (IGST)' : 'Intra-State (CGST + SGST)'}
              </span>
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {isInterState
                ? `Since ${supplyState} ≠ ${recipientState}, IGST is applied.`
                : `Since ${supplyState} = ${recipientState}, CGST and SGST are applied.`}
            </p>
          </div>

          <div className="space-y-1">
            <TaxRow label="Taxable Value" value={amount} color="text-gray-900 font-bold" />
            <TaxRow label="GST Rate" value={rate * 100} color="text-gray-500" />

            <div className="border-t my-3 border-dashed"></div>

            <TaxRow
              label={`IGST @ ${rate * 100}%`}
              value={igst}
              color={isInterState ? 'text-red-600 font-bold' : 'text-gray-400'}
            />
            <TaxRow
              label={`CGST @ ${(rate * 100) / 2}%`}
              value={cgst}
              color={!isInterState ? 'text-green-600' : 'text-gray-400'}
            />
            <TaxRow
              label={`SGST @ ${(rate * 100) / 2}%`}
              value={sgst}
              color={!isInterState ? 'text-green-600' : 'text-gray-400'}
            />

            <div className="border-t my-3 border-dashed"></div>

            <TaxRow
              label="Total Tax Payable"
              value={totalGST}
              color="text-indigo-800 font-extrabold"
            />
            <TaxRow
              label="GRAND TOTAL (Incl. GST)"
              value={grandTotal}
              color="text-indigo-900"
              isFinal={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GstCalculator;
