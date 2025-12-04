import React, { useState } from 'react';

// Accept an 'onSave' prop from the parent
const CostBreakdownForm = ({ onSave }) => {
  const [costs, setCosts] = useState({
    labor: '',
    materials: '',
    equipment: '',
    overhead: '',
    subcontractor: '',
    other: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCosts((prevCosts) => ({
      ...prevCosts,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Call the onSave function passed from the parent
    if (onSave) {
      onSave(costs);
      alert('Cost breakdown saved!');
    } else {
      console.log('Submitted Cost Breakdown:', costs);
      alert('Cost breakdown logged to console. (No onSave handler provided)');
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(costs).map((key) => (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">
              {key} Cost:
            </label>
            <input
              type="number"
              id={key}
              name={key}
              value={costs[key]}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder={`Enter ${key} cost`}
              min="0"
            />
          </div>
        ))}
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Save Cost Breakdown
          </button>
        </div>
      </form>
    </div>
  );
};

export default CostBreakdownForm;