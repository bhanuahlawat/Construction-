import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';

const TechnicalAndBOQ = ({ onOpenBOQModal }) => (
  <div className="space-y-8">
    <h3 className="text-xl font-bold text-gray-800 border-b-2 border-indigo-200 pb-2">Design & Materials</h3>

    {/* CAD Integration / Quantity Extraction */}
    <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-blue-500">
      <p className="font-semibold text-blue-700 text-lg mb-3">CAD File Intelligence</p>
      <p className="text-sm text-gray-700 mb-4">
        Import AutoCAD/Revit files to automatically extract quantities (area, volume, etc.).
      </p>
      <div className="flex justify-between items-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-md transition">
          Import Design Files (.DWG / .RVT)
        </button>
        <span className="text-xs text-green-700 font-medium">Last Sync: 10/24/2025</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">Status: 1.2M³ of concrete successfully extracted and added to BOQ.</p>
    </div>

    {/* BOQ Management */}
    <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-purple-500">
      <p className="font-semibold text-purple-700 text-lg mb-3">Bill of Quantities (BOQ) Progress</p>
      
      <button
        onClick={onOpenBOQModal}
        className="flex items-center gap-2 mb-4 bg-purple-100 text-purple-700 text-sm font-bold py-2 px-4 rounded-lg hover:bg-purple-200 transition"
      >
        <FaPlusCircle /> Create New BOQ
      </button>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b pb-2">
            <th className="py-2">Item</th>
            <th className="py-2 text-center">Progress</th>
            <th className="py-2 text-right">Material Need</th>
            <th className="py-2 text-center">Docs</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-3 font-medium text-gray-900">Reinforcement Steel</td>
            <td className="py-3 text-center text-red-600 font-bold">30%</td>
            <td className="py-3 text-right">350 MT Remaining</td>
            <td className="py-3 text-center text-indigo-600 underline cursor-pointer">Drawings</td>
          </tr>
          <tr>
            <td className="py-3 font-medium text-gray-900">Concrete (M30)</td>
            <td className="py-3 text-center text-green-600 font-bold">90%</td>
            <td className="py-3 text-right">120 M³ Remaining</td>
            <td className="py-3 text-center text-indigo-600 underline cursor-pointer">Quotes</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default TechnicalAndBOQ;