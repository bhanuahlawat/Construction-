// components/SalesPipeline.jsx
import React from "react";

const SalesPipeline = () => {
  const pipeline = [
    { stage: "New Leads", count: 50 },
    { stage: "Contacted", count: 9 },
    { stage: "Proposal Sent", count: 5 },
    { stage: "Closed", count: 2 },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Sales Pipeline</h2>

      {pipeline.map((p, i) => (
        <div key={i} className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span>{p.stage}</span>
            <span>{p.count}</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="h-2 bg-blue-500 rounded"
              style={{ width: `${p.count * 1}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SalesPipeline;
