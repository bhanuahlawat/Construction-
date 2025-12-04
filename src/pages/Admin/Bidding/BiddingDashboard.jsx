import React from 'react';
import { Link } from 'react-router-dom';
// import AdminLayout from '.Layout'; // Corrected import path

const BiddingDashboard = () => {
  return (
  
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Bidding Management Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vendor Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Vendor Bidding</h2>
            <p className="mb-4 text-gray-700">Manage all aspects of bidding as a vendor, from submitting tenders to tracking profitability.</p>
            <Link
              to="/bidding/vendor" // This path is correct based on App.js
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Go to Vendor Bidding
            </Link>
          </div>

          {/* Subcontractor Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Subcontractor Tendering</h2>
            <p className="mb-4 text-gray-700">Oversee tenders for subcontractors, manage bids, and analyze costs.</p>
            <Link
              to="/bidding/subcontractor" // This path is correct based on App.js
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Go to Subcontractor Tendering
            </Link>
          </div>
        </div>

        {/* You can add more general bidding analytics or summaries here */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Overall Bidding Overview</h2>
          <p className="text-gray-700">
            This section could display aggregate data, recent bid activities, or key performance indicators across all bidding processes.
          </p>
          {/* Add charts or summaries here later */}
        </div>
      </div>
    
  );
};

export default BiddingDashboard;