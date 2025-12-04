// import React, { useState } from "react";

// const PanValidation = () => {
//   const [pan, setPan] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [panDetails, setPanDetails] = useState(null);

//   // Dummy PAN Validation Response
//   const dummyData = {
//     pan: "ABCDE1234F",
//     name: "Rohit Verma",
//     status: "Active",
//     category: "Individual",
//     lastUpdated: "10 July 2023",
//     aadhaarLinked: true,
//   };

//   const handleValidate = () => {
//     if (!pan) return alert("Please enter a PAN Number.");
//     const regex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

//     if (!regex.test(pan)) {
//       return alert("Invalid PAN format. Example: ABCDE1234F");
//     }

//     setLoading(true);

//     setTimeout(() => {
//       setPanDetails(dummyData);
//       setLoading(false);
//     }, 1500);
//   };

//   return (
//     <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
//         PAN Validation
//       </h1>
      


//       <div className="bg-white p-5 rounded-xl shadow-md border mb-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-3">
//           Validate PAN Number
//         </h2>

//         <div className="flex flex-col sm:flex-row gap-3">
//           <input
//             type="text"
//             placeholder="Enter PAN Number"
//             className="w-full border px-4 py-2 rounded-lg uppercase focus:ring focus:ring-blue-300 outline-none"
//             maxLength={10}
//             value={pan}
//             onChange={(e) => setPan(e.target.value.toUpperCase())}
//           />

//           <button
//             onClick={handleValidate}
//             disabled={loading}
//             className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition disabled:bg-gray-400"
//           >
//             {loading ? "Validating..." : "Validate"}
//           </button>
//         </div>
//       </div>


//       {panDetails && (
//         <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             PAN Details
//           </h2>

//           <div className="grid sm:grid-cols-2 gap-4 mt-2">
//             <Detail label="PAN Number" value={panDetails.pan} />
//             <Detail label="Name" value={panDetails.name} />
//             <Detail label="Status" value={panDetails.status} highlight />
//             <Detail label="Category" value={panDetails.category} />
//             <Detail label="Aadhaar Linked" value={panDetails.aadhaarLinked ? "Yes" : "No"} />
//             <Detail label="Last Updated" value={panDetails.lastUpdated} />
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

// export default PanValidation;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PanValidation = () => {
  const navigate = useNavigate();
  const [pan, setPan] = useState("");
  const [loading, setLoading] = useState(false);
  const [panDetails, setPanDetails] = useState(null);

  const dummyData = {
    pan: "ABCDE1234F",
    name: "Rohit Verma",
    status: "Active",
    category: "Individual",
    lastUpdated: "10 July 2023",
    aadhaarLinked: true,
  };

  const handleValidate = () => {
    if (!pan) return alert("Please enter a PAN Number.");
    const regex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (!regex.test(pan)) {
      return alert("Invalid PAN format. Example: ABCDE1234F");
    }

    setLoading(true);

    setTimeout(() => {
      setPanDetails(dummyData);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">

      {/* HEADER + BACK BUTTON */}
      <header className="mb-6 sm:mb-8 border-b pb-3 flex flex-col sm:flex-row justify-between sm:items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          PAN Validation
        </h1>

        <button
          onClick={() => navigate('/admin/salesandbilling')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-150 text-sm mt-3 sm:mt-0"
        >
          ← Back to Sales Dashboard
        </button>
      </header>

      {/* PAN INPUT CARD */}
      <div className="bg-white p-5 rounded-xl shadow-md border mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Validate PAN Number
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter PAN Number"
            className="w-full border px-4 py-2 rounded-lg uppercase focus:ring focus:ring-blue-300 outline-none"
            maxLength={10}
            value={pan}
            onChange={(e) => setPan(e.target.value.toUpperCase())}
          />

          <button
            onClick={handleValidate}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition disabled:bg-gray-400"
          >
            {loading ? "Validating..." : "Validate"}
          </button>
        </div>
      </div>

      {/* PAN DETAILS CARD */}
      {panDetails && (
        <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            PAN Details
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mt-2">
            <Detail label="PAN Number" value={panDetails.pan} />
            <Detail label="Name" value={panDetails.name} />
            <Detail label="Status" value={panDetails.status} highlight />
            <Detail label="Category" value={panDetails.category} />
            <Detail label="Aadhaar Linked" value={panDetails.aadhaarLinked ? "Yes" : "No"} />
            <Detail label="Last Updated" value={panDetails.lastUpdated} />
          </div>
        </div>
      )}
    </div>
  );
};

const Detail = ({ label, value, highlight }) => (
  <div className="border p-3 rounded-lg bg-gray-50">
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className={`font-semibold text-lg ${highlight ? "text-green-600" : "text-gray-800"}`}>
      {value}
    </p>
  </div>
);

export default PanValidation;
