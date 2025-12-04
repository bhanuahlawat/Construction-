import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ children, onClose, title }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
    <div className="bg-white p-6 rounded-lg shadow-xl z-50 w-full max-w-md">
      <header className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-gray-600 text-2xl"
        >
          <FaTimes />
        </button>
      </header>
      {children}
    </div>
  </div>
);

export default Modal;