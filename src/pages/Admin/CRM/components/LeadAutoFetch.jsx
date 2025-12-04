// components/LeadAutoFetch.jsx
import React from "react";

const LeadAutoFetch = () => {
  const leads = [
    { id: 1, name: "Rahul Kumar", source: "Facebook Ad" },
    { id: 2, name: "Sneha Sharma", source: "Google Ads" },
    { id: 3, name: "Aman Verma", source: "Instagram" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Lead Auto Fetch</h2>

      <ul className="space-y-2">
        {leads.map((lead) => (
          <li
            key={lead.id}
            className="p-3 bg-gray-50 rounded-md border flex justify-between"
          >
            <span>{lead.name}</span>
            <span className="text-sm text-gray-500">{lead.source}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeadAutoFetch;
