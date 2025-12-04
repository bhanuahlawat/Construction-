import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PlanningAndScheduling = ({ milestoneData, onOpenUpdateModal }) => {
  const [openIndex, setOpenIndex] = useState(null);

  // Editable Roadmap Data
  const [roadmap, setRoadmap] = useState([
    { phase: "Site Preparation", start: "Jan 2025", end: "Feb 2025", progress: 100, details: "Clearing completed." },
    { phase: "Foundation & Basement", start: "Mar 2025", end: "May 2025", progress: 75, details: "Basement slab ongoing." },
    { phase: "Superstructure", start: "Jun 2025", end: "Dec 2025", progress: 40, details: "1st floor work started." },
    { phase: "Finishing & Interiors", start: "Jan 2026", end: "Jun 2026", progress: 10, details: "Material procurement started." },
    { phase: "Final Inspection & Handover", start: "Jul 2026", end: "Aug 2026", progress: 0, details: "Pending final touches." }
  ]);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Update local editable values
  const handleChange = (index, field, value) => {
    const updated = [...roadmap];
    updated[index][field] = value;
    setRoadmap(updated);
  };

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-gray-800 border-b-2 border-indigo-200 pb-2">
        Roadmap & Deadlines
      </h3>

      {/* Editable Roadmap */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-700">
        <p className="font-semibold text-purple-700 text-lg mb-4">
          🚀 Project Roadmap (Editable)
        </p>

        <div className="space-y-4">
          {roadmap.map((step, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-purple-50 border border-purple-200 hover:shadow-md transition"
            >
              {/* Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleOpen(index)}
              >
                <div>
                  <p className="text-lg font-bold text-gray-800">{step.phase}</p>
                  <p className="text-xs text-gray-500">
                    {step.start} → {step.end}
                  </p>
                </div>

                {openIndex === index ? (
                  <FaChevronUp className="text-purple-700" />
                ) : (
                  <FaChevronDown className="text-purple-700" />
                )}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-300 rounded-full h-2 mt-3">
                <div
                  className="h-2 bg-purple-600 rounded-full transition-all"
                  style={{ width: `${step.progress}%` }}
                />
              </div>

              <p className="text-sm font-semibold text-purple-700 mt-1">
                {step.progress}% Complete
              </p>

              {/* Expandable Area */}
              {openIndex === index && (
                <div className="mt-4 bg-white border p-3 rounded-lg">
                  
                  {/* Progress Slider */}
                  <label className="text-sm font-semibold text-gray-700">
                    Adjust Progress:
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={step.progress}
                    onChange={(e) => handleChange(index, "progress", Number(e.target.value))}
                    className="w-full mt-1"
                  />

                  {/* Notes Input */}
                  <label className="text-sm font-semibold text-gray-700 mt-3 block">
                    Update Work Done:
                  </label>
                  <textarea
                    value={step.details}
                    onChange={(e) => handleChange(index, "details", e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                    rows="3"
                  />

                  {/* Save Button */}
                  <button
                    onClick={() => alert("Updated Successfully!")}
                    className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition"
                  >
                    Save Update
                  </button>

                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* WBS Section (no changes) */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500">
        <p className="font-semibold text-indigo-700 text-lg mb-3">Work Breakdown Structure (WBS) Tracker</p>

        {/* ... your existing milestoneData code stays the same ... */}

        <button
          onClick={onOpenUpdateModal}
          className="mt-5 text-sm font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 p-2 rounded-lg"
        >
          + Update Milestone Completion
        </button>
      </div>
    </div>
  );
};

export default PlanningAndScheduling;
