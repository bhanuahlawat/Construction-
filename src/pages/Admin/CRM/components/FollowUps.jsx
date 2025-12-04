// components/FollowUps.jsx
import React from "react";

const FollowUps = () => {
  const data = [
    { id: 1, name: "Sandeep", lastContact: "2 days ago" },
    { id: 2, name: "Kajal", lastContact: "1 day ago" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Follow Ups</h2>

      {data.map((d) => (
        <div
          key={d.id}
          className="p-3 border rounded-lg mb-2 bg-gray-50 flex justify-between"
        >
          <span>{d.name}</span>
          <span className="text-gray-500 text-sm">{d.lastContact}</span>
        </div>
      ))}
    </div>
  );
};

export default FollowUps;
