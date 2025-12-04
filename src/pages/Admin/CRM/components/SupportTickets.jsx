// components/SupportTickets.jsx
import React from "react";

const SupportTickets = () => {
  const tickets = [
    { id: 101, issue: "Payment failed", status: "Open" },
    { id: 102, issue: "Account blocked", status: "Resolved" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Support Tickets</h2>

      {tickets.map((t) => (
        <div
          key={t.id}
          className="p-3 border rounded-lg mb-2 bg-gray-50 flex justify-between"
        >
          <span>{t.issue}</span>
          <span
            className={`text-sm ${
              t.status === "Open" ? "text-red-600" : "text-green-600"
            }`}
          >
            {t.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SupportTickets;
