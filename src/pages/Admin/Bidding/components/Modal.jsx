import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
          >
            &times;
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;