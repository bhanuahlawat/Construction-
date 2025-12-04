import React from 'react';
import Modal from './Modal';

const ViewTenderModal = ({ isOpen, onClose, tender }) => {
  if (!tender) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="View Tender Details">
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Tender Name</h4>
          <p className="text-lg text-gray-800">{tender.name}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Status</h4>
          <p className={`text-lg font-semibold ${
            tender.status === 'Submitted' ? 'text-green-600' : 'text-yellow-600'
          }`}>
            {tender.status}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Deadline</h4>
          <p className="text-lg text-gray-800">{tender.deadline}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Tender Description</h4>
          <p className="text-gray-700 mt-1">
            This is a placeholder for the full tender details, requirements, and submitted documents.
            In a real application, you would fetch and display all relevant data for {tender.name}.
          </p>
        </div>
        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewTenderModal;