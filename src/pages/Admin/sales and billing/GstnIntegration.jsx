// import React, { useState } from "react";

// const GstnIntegration = () => {
//   const [gstNumber, setGstNumber] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Dummy GST Verification Response
//   const [gstDetails, setGstDetails] = useState(null);

//   const dummyGstData = {
//     gstin: "09ABCDE1234F1Z5",
//     legalName: "xyzConstruction Pvt Ltd",
//     tradeName: "xdsConstruction",
//     state: "Uttar Pradesh",
//     registrationDate: "12 Jan 2021",
//     status: "Active",
//     type: "Regular",
//   };

//   const handleVerify = () => {
//     if (!gstNumber) return alert("Please enter a GST Number.");

//     setLoading(true);

//     setTimeout(() => {
//       setGstDetails(dummyGstData);
//       setLoading(false);
//     }, 1500);
//   };

//   return (
//     <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
//         GSTN Integration
//       </h1>

//       {/* ============================
//           GST NUMBER INPUT BOX
//       ============================= */}
//       <div className="bg-white p-5 rounded-xl shadow-md border mb-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-3">Verify GST Number</h2>

//         <div className="flex flex-col sm:flex-row gap-3">
//           <input
//             type="text"
//             placeholder="Enter GST Number"
//             className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300 outline-none"
//             value={gstNumber}
//             onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
//           />

//           <button
//             onClick={handleVerify}
//             disabled={loading}
//             className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition disabled:bg-gray-400"
//           >
//             {loading ? "Verifying..." : "Verify"}
//           </button>
//         </div>
//       </div>

//       {/* ============================
//           GST VERIFIED DETAILS
//       ============================= */}
//       {gstDetails && (
//         <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             GST Verification Details
//           </h2>

//           <div className="grid sm:grid-cols-2 gap-4 mt-2">
//             <Detail label="GSTIN" value={gstDetails.gstin} />
//             <Detail label="Legal Name" value={gstDetails.legalName} />
//             <Detail label="Trade Name" value={gstDetails.tradeName} />
//             <Detail label="State" value={gstDetails.state} />
//             <Detail label="Registration Date" value={gstDetails.registrationDate} />
//             <Detail label="Taxpayer Type" value={gstDetails.type} />
//             <Detail
//               label="Status"
//               value={gstDetails.status}
//               highlight
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// /* ----------------------------------------
//    Small Components
// ------------------------------------------*/
// const Detail = ({ label, value, highlight }) => (
//   <div className="border p-3 rounded-lg bg-gray-50">
//     <p className="text-sm text-gray-500 mb-1">{label}</p>
//     <p
//       className={`font-semibold text-lg ${
//         highlight ? "text-green-600" : "text-gray-800"
//       }`}
//     >
//       {value}
//     </p>
//   </div>
// );
// export default GstnIntegration;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GstnIntegration = () => {
  const navigate = useNavigate();
  const [gstNumber, setGstNumber] = useState("");
  const [loading, setLoading] = useState(false);

  // Dummy GST Verification Response
  const [gstDetails, setGstDetails] = useState(null);

  const dummyGstData = {
    gstin: "09ABCDE1234F1Z5",
    legalName: "xyzConstruction Pvt Ltd",
    tradeName: "xdsConstruction",
    state: "Uttar Pradesh",
    registrationDate: "12 Jan 2021",
    status: "Active",
    type: "Regular",
  };

  const handleVerify = () => {
    if (!gstNumber) return alert("Please enter a GST Number.");

    setLoading(true);

    setTimeout(() => {
      setGstDetails(dummyGstData);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">

      {/* -------------- HEADER WITH BACK BUTTON ---------------- */}
      <header className="mb-6 sm:mb-8 border-b pb-3 flex flex-col sm:flex-row justify-between sm:items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          GSTN Integration
        </h1>

        <button
          onClick={() => navigate("/admin/salesandbilling")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-150 text-sm mt-3 sm:mt-0"
        >
          ← Back to Sales Dashboard
        </button>
      </header>

      {/* ============================
          GST NUMBER INPUT BOX
      ============================= */}
      <div className="bg-white p-5 rounded-xl shadow-md border mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Verify GST Number</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter GST Number"
            className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300 outline-none"
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
          />

          <button
            onClick={handleVerify}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition disabled:bg-gray-400"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>

      {/* ============================
          GST VERIFIED DETAILS
      ============================= */}
      {gstDetails && (
        <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            GST Verification Details
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mt-2">
            <Detail label="GSTIN" value={gstDetails.gstin} />
            <Detail label="Legal Name" value={gstDetails.legalName} />
            <Detail label="Trade Name" value={gstDetails.tradeName} />
            <Detail label="State" value={gstDetails.state} />
            <Detail label="Registration Date" value={gstDetails.registrationDate} />
            <Detail label="Taxpayer Type" value={gstDetails.type} />
            <Detail label="Status" value={gstDetails.status} highlight />
          </div>
        </div>
      )}
    </div>
  );
};

/* ----------------------------------------
   Small Components
------------------------------------------*/
const Detail = ({ label, value, highlight }) => (
  <div className="border p-3 rounded-lg bg-gray-50">
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p
      className={`font-semibold text-lg ${
        highlight ? "text-green-600" : "text-gray-800"
      }`}
    >
      {value}
    </p>
  </div>
);

export default GstnIntegration;
