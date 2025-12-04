import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import BidComparisonTable from './components/BidComparisonTable';
import CostBreakdownForm from './components/CostBreakdownForm';
import ProfitabilityAnalysisChart from './components/ProfitabilityAnalysisChart';
import VarianceAnalysisChart from './components/VarianceAnalysisChart';

// Mock Data
const issuedTenders = [
  { id: 101, name: 'HVAC Installation for New Building', status: 'Open', bidCount: 5, deadline: '2023-12-20' },
  { id: 102, name: 'Electrical Wiring Upgrade', status: 'Closed', bidCount: 3, awardedTo: 'Sparky Co.', deadline: '2023-11-15' },
];

const subcontractorBids = [
  { id: 1, tender: 'HVAC Installation', subcontractor: 'Cool Air Inc.', bidAmount: 85000, status: 'Received' },
  { id: 2, tender: 'Electrical Wiring', subcontractor: 'Watt\'s Up', bidAmount: 42000, status: 'Awarded' },
  { id: 3, tender: 'HVAC Installation', subcontractor: 'Arctic Comfort', bidAmount: 82000, status: 'Received' },
];

const bidComparisonData = [
  { id: 1, tender: 'HVAC Installation', bid1: 85000, bid2: 82000, bid3: 90000, lowestBid: 82000 },
  { id: 2, tender: 'Electrical Wiring', bid1: 42000, bid2: 45000, bid3: null, lowestBid: 42000 },
];

const profitabilityData = {
  labels: ['Project A', 'Project B', 'Project C'],
  datasets: [
    {
      label: 'Project Profitability',
      data: [12, 18, 15], // in %
      backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
    },
  ],
};

const costVarianceData = {
  labels: ['HVAC Project', 'Electrical Project'],
  datasets: [
    {
      label: 'Cost Variance',
      data: [-3000, 1500], // in USD
      backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
    },
  ],
};


const SubcontractorBiddingPage = () => {
  const [activeTab, setActiveTab] = useState('tenders');
  const navigate = useNavigate();

  return (
    // 1. Added 'relative' to the main container
    <div className="p-4 sm:p-6 relative min-h-screen">
      
      {/* 2. Positioned button absolutely in the top-left corner (respecting padding) */}
      <button
        onClick={() => navigate(-1)} 
        className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors z-10"
      >
        <FaArrowLeft />
        Back to Bidding Page
      </button>

      {/* 3. Added padding-top to the title to avoid overlap on small screens */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 pt-8 sm:pt-0">
        Subcontractor Tendering Management
      </h1>

      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="subcontractorBiddingTab" role="tablist">
          {[
            { id: 'tenders', label: 'Manage Tenders & Bids' },
            { id: 'templates', label: 'Create Tender Templates' },
            { id: 'costs', label: 'Cost Management' },
            { id: 'reporting', label: 'Analysis & Reporting' },
          ].map((tab) => (
            <li key={tab.id} className="mr-2">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600'
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div id="subcontractorBiddingTabContent">
        {/* a. Allow vendors to register, submit documents, and track tenders they've participated in. (Reframed for you managing subs) */}
        {activeTab === 'tenders' && (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Manage Tenders Issued to Subcontractors</h2>
              <p className="mb-4 text-sm text-gray-600">Here you can view, create, and manage tenders issued to potential subcontractors.</p>

              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4 transition duration-300">
                Create New Tender
              </button>

              <h3 className="text-lg sm:text-xl font-semibold mb-3">Your Issued Tenders</h3>
              {issuedTenders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tender Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bids Received</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {issuedTenders.map((tender) => (
                        <tr key={tender.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{tender.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              tender.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {tender.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{tender.bidCount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{tender.deadline}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-2">View Bids</button>
                            <button className="text-blue-600 hover:text-blue-900">Edit Tender</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No tenders issued yet.</p>
              )}
            </div>

            {/* b. Automated Notification (Conceptual) */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Automated Notifications</h3>
              <p className="text-sm text-gray-600">Subcontractors are automatically notified of new tender opportunities and tender updates.</p>
            </div>

            {/* c. Bid Comparison Matrix */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Bid Comparison Matrix</h3>
              <BidComparisonTable data={bidComparisonData} isSubcontractorView={true} />
            </div>

            {/* d. Bid Management and tendering & Bid Tracking */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Subcontractor Bid Tracking</h3>
              <p className="mb-4 text-sm text-gray-600">Monitor all incoming bids from subcontractors.</p>
              {subcontractorBids.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tender</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcontractor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bid Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {subcontractorBids.map((bid) => (
                        <tr key={bid.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{bid.tender}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{bid.subcontractor}</td>
                          <td className="px-6 py-4 whitespace-nowrap">${bid.bidAmount.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              bid.status === 'Awarded' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {bid.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-2">Review Bid</button>
                            {bid.status === 'Received' && (
                                <button className="text-green-600 hover:text-green-900">Award</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No bids received yet.</p>
              )}
            </div>
          </div>
        )}

        {/* e. Pre-designed templates... */}
        {activeTab === 'templates' && (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Create & Manage Tender Templates</h2>
            <p className="mb-4 text-sm text-gray-600">Utilize and customize templates to efficiently create clear and comprehensive tender documents for subcontractors.</p>
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              New Tender Template
            </button>
            <div className="mt-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Existing Templates</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Standard Electrical Subcontract</li>
                <li>HVAC Installation Request for Proposal</li>
                <li>General Labor Tender</li>
              </ul>
            </div>
          </div>
        )}

        {/* f, g, h, i. Cost Management */}
        {activeTab === 'costs' && (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8 space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Project Cost Management & Tracking</h2>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Detailed Cost Breakdown for Projects</h3>
              <p className="mb-4 text-sm text-gray-600">Track and manage the detailed cost components of your projects, including those from subcontractors.</p>
              <CostBreakdownForm /> {/* Reusing the component */}
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Integrated Cost Estimation Tools</h3>
              <p className="text-sm text-gray-600">Use our integrated tools to estimate project costs before issuing tenders, helping you set realistic budgets.</p>
              <button className="mt-2 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                Launch Estimation Tool
              </button>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Cost Tracking (Labor, Materials, Equipment)</h3>
              <p className="mb-4 text-sm text-gray-600">Monitor all expenditures related to labor, materials, and equipment for your projects, including subcontractor costs.</p>
              <div className="bg-gray-50 p-4 rounded-md">
                <p>Tracked Items: Labor Hours, Material Units, Equipment Usage.</p>
                <button className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-sm">
                  View Detailed Cost Logs
                </button>
              </div>
            </div>
          </div>
        )}

        {/* j, k, l. Reporting */}
        {activeTab === 'reporting' && (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8 space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Project Reporting and Analysis</h2>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Profitability Analysis of Projects</h3>
              <p className="mb-4 text-sm text-gray-600">Assess the profitability of projects, taking into account subcontractor costs.</p>
              <ProfitabilityAnalysisChart data={profitabilityData} />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Budget vs. Actual Reporting</h3>
              <p className="mb-4 text-sm text-gray-600">Compare budgeted costs against actual spending for projects, including subcontractor payments.</p>
              <div className="bg-gray-50 p-4 rounded-md">
                <p>Example: Project Alpha - Budget: $200,000, Actual: $210,000</p>
                <p>Example: Project Beta - Budget: $75,000, Actual: $72,000</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Cost Variance Analysis</h3>
              <p className="mb-4 text-sm text-gray-600">Deep dive into cost variances to understand overruns or savings on projects involving subcontractors.</p>
              <VarianceAnalysisChart data={costVarianceData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default SubcontractorBiddingPage;