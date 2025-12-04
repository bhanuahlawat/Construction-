// components/FeedbackTracking.jsx
import React from "react";

const FeedbackTracking = () => {
  const feedback = [
    { id: 1, user: "Ankit", rating: 4 },
    { id: 2, user: "Divya", rating: 5 },
    { id: 3, user: "Manish", rating: 3 },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Feedback Tracking</h2>

      {feedback.map((f) => (
        <div
          key={f.id}
          className="p-3 border rounded-lg mb-2 bg-gray-50 flex justify-between"
        >
          <span>{f.user}</span>
          <span className="text-yellow-600">{f.rating} ⭐</span>
        </div>
      ))}
    </div>
  );
};

export default FeedbackTracking;
