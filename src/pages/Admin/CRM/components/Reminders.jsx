// components/Reminders.jsx
import React from "react";

const Reminders = () => {
  const reminders = [
    { id: 1, task: "Call lead - Priya", time: "2:00 PM" },
    { id: 2, task: "Follow-up with Mohit", time: "5:30 PM" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Reminders</h2>

      {reminders.map((r) => (
        <div
          key={r.id}
          className="p-3 border rounded-lg mb-2 bg-gray-50 flex justify-between"
        >
          <span>{r.task}</span>
          <span className="text-gray-500">{r.time}</span>
        </div>
      ))}
    </div>
  );
};

export default Reminders;
