import React, { useState } from "react";
import { FaDownload } from 'react-icons/fa';

const UserBackupPage = () => {
  // Sample users data - replace this with your real user data or pass as props
  const [users] = useState([
    {
      id: 1,
      name: "Rohit Sharma",
      mobile: "+91 9876543210",
      company: "Tech Solutions",
      address: "123, MG Road",
      city: "Mumbai",
      email: "rohit@example.com",
      plan: "Premium",
      amount: "5000",
      status: "Enabled",
      document: "aadhar.pdf",
    },
    {
      id: 2,
      name: "Neha Patel",
      mobile: "+91 9123456789",
      company: "Build Corp",
      address: "456, Park Street",
      city: "Delhi",
      email: "neha@example.com",
      plan: "Basic",
      amount: "2000",
      status: "Disabled",
      document: "pan.pdf",
    },
  ]);

  // State to track selected user IDs
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  // Toggle checkbox for individual user
  const toggleSelectUser = (id) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  // Toggle select all checkbox
  const toggleSelectAll = () => {
    if (selectedUserIds.length === users.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(users.map((user) => user.id));
    }
  };

  // Export selected users to CSV
  const backupSelectedUsers = () => {
    const selected = users.filter((u) => selectedUserIds.includes(u.id));

    if (selected.length === 0) {
      alert("Please select at least one user to backup.");
      return;
    }

    // CSV headers (all fields)
    const headers = [
      "ID",
      "Name",
      "Mobile",
      "Company",
      "Address",
      "City",
      "Email",
      "Plan",
      "Amount",
      "Status",
      "Document",
    ];

    // Prepare rows for CSV export
    const rows = selected.map((u) => [
      u.id,
      u.name,
      u.mobile,
      u.company,
      u.address,
      u.city,
      u.email,
      u.plan,
      u.amount,
      u.status,
      u.document,
    ]);

    // Escape CSV values with quotes if needed
    const escapeCSV = (text) => {
      if (text === null || text === undefined) return "";
      const str = text.toString();
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const csvContent =
      headers.join(",") +
      "\n" +
      rows.map((row) => row.map(escapeCSV).join(",")).join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "user_backup.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">User Backup</h2>

        <button
          onClick={backupSelectedUsers}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold shadow-md transition"
        >
          <FaDownload />
          Backup Selected
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-200">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead className="bg-indigo-50 text-gray-700">
            <tr>
              <th className="p-4">
                <input
                  type="checkbox"
                  checked={
                    selectedUserIds.length === users.length && users.length > 0
                  }
                  onChange={toggleSelectAll}
                  aria-label="Select All Users"
                />
              </th>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Mobile</th>
              <th className="p-4 font-semibold">Company</th>
              <th className="p-4 font-semibold">Address</th>
              <th className="p-4 font-semibold">City</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Plan</th>
              <th className="p-4 font-semibold">Amount</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Document</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="11" className="p-8 text-center text-gray-500">
                  No users available
                </td>
              </tr>
            )}

            {users.map((u, idx) => (
              <tr
                key={u.id}
                className={`${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-indigo-50 transition-colors`}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedUserIds.includes(u.id)}
                    onChange={() => toggleSelectUser(u.id)}
                    aria-label={`Select user ${u.name}`}
                  />
                </td>
                <td className="p-4 font-medium text-gray-900">{u.name}</td>
                <td className="p-4 text-gray-700">{u.mobile}</td>
                <td className="p-4 text-gray-700">{u.company}</td>
                <td className="p-4 text-gray-700">{u.address}</td>
                <td className="p-4 text-gray-700">{u.city}</td>
                <td className="p-4 text-gray-700">{u.email}</td>
                <td className="p-4 text-gray-700">{u.plan}</td>
                <td className="p-4 text-gray-700">₹{u.amount}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.status === "Enabled"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="p-4 text-indigo-600 font-medium">
                  {u.document || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBackupPage;
