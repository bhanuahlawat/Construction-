import React, { useState } from 'react';
import Modal from './Modal';

const EstimationToolModal = ({ isOpen, onClose }) => {
  const [sqft, setSqft] = useState(0);
  const [laborHours, setLaborHours] = useState(0);
  const [materialCost, setMaterialCost] = useState(0);
  const [estimatedCost, setEstimatedCost] = useState(0);

  // This is a dummy calculation. A real one would be much more complex.
  const calculateEstimate = () => {
    const laborRate = 45; // $45/hr
    const sqftRate = 15; // $15/sqft
    const overhead = 1.15; // 15% overhead

    const total = (sqft * sqftRate + laborHours * laborRate + parseFloat(materialCost)) * overhead;
    setEstimatedCost(total.toFixed(2));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cost Estimation Tool">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Enter project metrics to generate a rough cost estimate.
        </p>
        
        <div>
          <label htmlFor="sqft" className="block text-sm font-medium text-gray-700">
            Project Square Feet
          </label>
          <input
            type="number"
            id="sqft"
            value={sqft}
            onChange={(e) => setSqft(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        
        <div>
          <label htmlFor="labor" className="block text-sm font-medium text-gray-700">
            Estimated Labor (Hours)
          </label>
          <input
            type="number"
            id="labor"
            value={laborHours}
            onChange={(e) => setLaborHours(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="material" className="block text-sm font-medium text-gray-700">
            Total Material Cost ($)
          </label>
          <input
            type="number"
            id="material"
            value={materialCost}
            onChange={(e) => setMaterialCost(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="pt-4 flex justify-between items-center">
          <button
            type="button"
            onClick={calculateEstimate}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Calculate Estimate
          </button>
          <div className="text-right">
            <span className="text-sm font-medium text-gray-600">Estimated Total:</span>
            <p className="text-2xl font-bold text-gray-900">${estimatedCost}</p>
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EstimationToolModal;