import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HoldingDeduction = () => {
  const navigate = useNavigate();

  // Dummy rates for holding deduction
  const [rates, setRates] = useState([
    { type: "Vendor", rate: 5, description: "Standard vendor holding tax" },
    { type: "Sub-Contractor", rate: 7, description: "Sub-contractor withholding" },
    { type: "Professional", rate: 10, description: "Professional withholding" },
  ]);

  // Dummy deduction records
  const [records, setRecords] = useState([
    {
      id: 1,
      name: "Sharma Contractors",
      amount: 45000,
      rate: 5,
      deducted: 2250,
      dueDate: "2025-11-12",
      paid: false,
    },
    {
      id: 2,
      name: "Techno Solutions",
      amount: 82000,
      rate: 7,
      deducted: 5740,
      dueDate: "2025-10-28",
      paid: true,
    },
    {
      id: 3,
      name: "Elite Engineers",
      amount: 120000,
      rate: 10,
      deducted: 12000,
      dueDate: "2025-11-20",
      paid: false,
    },
    {
      id: 4,
      name: "Metro Electricals",
      amount: 55000,
      rate: 5,
      deducted: 2750,
      dueDate: "2025-10-25",
      paid: false,
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);

  const handleRateChange = (index, newValue) => {
    const updated = [...rates];
    updated[index].rate = newValue;
    setRates(updated);
  };

  const saveNewRates = () => {
    console.log("Updated Rates:", rates);
    setIsEditing(false);
  };

  const today = new Date();

  const getStatus = (item) => {
    if (item.paid) return "Paid";

    const due = new Date(item.dueDate);
    if (due < today) return "Overdue";

    return "Pending";
  };

  return (
    <div className="p-5 sm:p-6 bg-white rounded-2xl shadow-lg max-w-7xl mx-auto">

      {/* Header */}
      <header className="mb-6 border-b pb-4 flex flex-col sm:flex-row justify-between sm:items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Holding Deduction Management
        </h1>

        <button
          onClick={() => navigate("/admin/salesandbilling")}
          className="bg-gray-800 hover:bg-black text-white py-2 px-5 rounded-lg text-sm font-semibold shadow"
        >
          ← Back to Dashboard
        </button>
      </header>

      {/* Summary Cards */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-xl shadow">
          <p className="text-sm text-gray-600">Total Deducted</p>
          <p className="text-2xl font-bold text-blue-700">
            ₹
            {records
              .reduce((a, b) => a + b.deducted, 0)
              .toLocaleString("en-IN")}
          </p>
        </div>

        <div className="p-5 bg-green-50 border-l-4 border-green-500 rounded-xl shadow">
          <p className="text-sm text-gray-600">Paid To Government</p>
          <p className="text-2xl font-bold text-green-700">
            ₹
            {records
              .filter((r) => r.paid)
              .reduce((a, b) => a + b.deducted, 0)
              .toLocaleString("en-IN")}
          </p>
        </div>

        <div className="p-5 bg-red-50 border-l-4 border-red-500 rounded-xl shadow">
          <p className="text-sm text-gray-600">Overdue Alerts</p>
          <p className="text-2xl font-bold text-red-700">
            {
              records.filter((r) => getStatus(r) === "Overdue").length
            }{" "}
            Cases
          </p>
        </div>
      </div>

      {/* Rate Config */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex justify-between items-center">
        Holding Deduction Rates
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-4 rounded-full text-sm"
        >
          {isEditing ? "Cancel" : "Edit Rates"}
        </button>
      </h2>

      <div className="overflow-x-auto shadow rounded-xl mb-8">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Description
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                Rate (%)
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y">
            {rates.map((r, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium">{r.type}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {r.description}
                </td>
                <td className="px-4 py-3 text-center">
                  {isEditing ? (
                    <input
                      type="number"
                      value={r.rate}
                      onChange={(e) =>
                        handleRateChange(i, e.target.value)
                      }
                      className="w-20 border rounded-md p-1 text-center bg-yellow-50"
                    />
                  ) : (
                    <span className="font-bold">{r.rate}%</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <div className="flex justify-end mb-10">
          <button
            onClick={saveNewRates}
            className="bg-indigo-700 hover:bg-indigo-800 text-white py-3 px-7 rounded-xl font-bold shadow"
          >
            Save New Rates
          </button>
        </div>
      )}

      {/* Deduction Records */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Holding Deduction Records
      </h2>

      <div className="overflow-x-auto shadow rounded-xl">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold">Name</th>
              <th className="px-4 py-3 text-right text-xs font-semibold">
                Amount (₹)
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold">
                Rate (%)
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold">
                Deducted (₹)
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold">
                Due Date
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y">
            {records.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3 text-right">
                  ₹{item.amount.toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-3 text-center">{item.rate}%</td>
                <td className="px-4 py-3 text-right">
                  ₹{item.deducted.toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-3 text-center">{item.dueDate}</td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        getStatus(item) === "Paid"
                          ? "bg-green-200 text-green-800"
                          : getStatus(item) === "Overdue"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-200 text-yellow-800"
                      }
                    `}
                  >
                    {getStatus(item)}
                  </span>

                  {getStatus(item) === "Overdue" && (
                    <p className="text-xs text-red-600 font-semibold">
                      ⚠ Send Alert
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        * Holding deductions are automatically applied during vendor/sub-contractor payment entries.
      </p>
    </div>
  );
};

export default HoldingDeduction;
