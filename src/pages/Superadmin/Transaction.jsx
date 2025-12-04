import React, { useState } from "react";
import { FaSearch } from 'react-icons/fa';

const TransactionsPage = () => {
  const [transactions] = useState([
    {
      id: 1,
      name: "Rohit Sharma",
      company: "Tech Solutions",
      email: "rohit@example.com",
      mobile: "+91 9876543210",
      status: "Completed",
      amount: 5000,
      date: "2025-10-01T10:20:00Z",
      method: "UPI",
    },
    {
      id: 2,
      name: "Amit Verma",
      company: "CodeCraft Ltd",
      email: "amit@example.com",
      mobile: "+91 9988776655",
      status: "Failed",
      amount: 1500,
      date: "2025-10-02T09:30:00Z",
      method: "Cash",
    },
    {
      id: 3,
      name: "Sneha Rao",
      company: "Web Innovations",
      email: "sneha@example.com",
      mobile: "+91 9090909090",
      status: "Completed",
      amount: 3000,
      date: "2025-10-04T14:15:00Z",
      method: "Card",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = [t.name, t.email, t.mobile, t.company].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Transactions</h2>

        <div className="flex gap-3 flex-col sm:flex-row">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>

          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-xl rounded-2xl overflow-x-auto border border-gray-200">
        <table className="w-full min-w-[1000px] text-sm text-left">
          <thead className="bg-gradient-to-r from-indigo-50 to-blue-50">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Name</th>
              <th className="p-4 font-semibold text-gray-700">Company</th>
              <th className="p-4 font-semibold text-gray-700">Email</th>
              <th className="p-4 font-semibold text-gray-700">Mobile</th>
              <th className="p-4 font-semibold text-gray-700">Status</th>
              <th className="p-4 font-semibold text-gray-700">Amount (₹)</th>
              <th className="p-4 font-semibold text-gray-700">Date</th>
              <th className="p-4 font-semibold text-gray-700">Method</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx, idx) => (
                <tr
                  key={tx.id}
                  className={`transition-colors duration-200 ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50`}
                >
                  <td className="p-4 font-medium text-gray-900">{tx.name}</td>
                  <td className="p-4 text-gray-700">{tx.company}</td>
                  <td className="p-4 text-gray-700">{tx.email}</td>
                  <td className="p-4 text-gray-700">{tx.mobile}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tx.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-gray-900">
                    ₹{tx.amount}
                  </td>
                  <td className="p-4 text-gray-600">
                    {new Date(tx.date).toLocaleDateString()}
                    <br />
                    <span className="text-xs text-gray-400">
                      {new Date(tx.date).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="p-4 text-gray-700">{tx.method}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-8 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPage;
