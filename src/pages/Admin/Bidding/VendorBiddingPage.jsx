import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- 1. IMPORT
import { FaArrowLeft } from 'react-icons/fa'; // <-- 1. IMPORT
import BidComparisonTable from './components/BidComparisonTable';
import CostBreakdownForm from './components/CostBreakdownForm';
import ProfitabilityAnalysisChart from './components/ProfitabilityAnalysisChart';
import VarianceAnalysisChart from './components/VarianceAnalysisChart';

// Import all the modals
import RegisterModal from './components/RegisterModal';
import ViewTenderModal from './components/ViewTenderModal';
import EditTenderModal from './components/EditTenderModal';
import AddTenderModal from './components/AddTenderModal';

// Mock Data (remains the same)
const initialVendorTenders = [
  { id: 1, name: 'Office Supply Tender', status: 'Submitted', deadline: '2023-12-31' },
  { id: 2, name: 'IT Services Contract', status: 'Draft', deadline: '2024-01-15' },
];
// ... (all other mock data)
const bidComparisonData = [
  { id: 1, tender: 'IT Services', yourBid: 120000, avgBid: 130000, status: 'Under Review' },
  { id: 2, tender: 'Office Supplies', yourBid: 5000, avgBid: 4800, status: 'Awarded' },
];
const profitabilityData = {
  labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023'],
  datasets: [
    {
      label: 'Projected Profit',
      data: [15, 20, 18, 25], // in %
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
};
const costVarianceData = {
  labels: ['Project A', 'Project B', 'Project C'],
  datasets: [
    {
      label: 'Cost Variance',
      data: [5, -2, 8], // e.g., in thousands USD
      backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)'],
    },
  ],
};


const VendorBiddingPage = () => {
  const [activeTab, setActiveTab] = useState('register');
  const navigate = useNavigate(); // <-- 2. INITIALIZE HOOK
  
  // --- States ---
  const [tenders, setTenders] = useState(initialVendorTenders);
  const [selectedTender, setSelectedTender] = useState(null);
  
  // State to control modal visibility
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // --- Event Handlers ---

  const handleCloseModals = () => {
    setIsRegisterModalOpen(false);
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedTender(null);
  };

  const handleViewTender = (tender) => {
    setSelectedTender(tender);
    setIsViewModalOpen(true);
  };

  const handleEditTender = (tender) => {
    setSelectedTender(tender);
    setIsEditModalOpen(true);
  };

  const handleSaveTender = (updatedTender) => {
    setTenders(prevTenders => 
      prevTenders.map(tender => 
        tender.id === updatedTender.id ? updatedTender : tender
      )
    );
    handleCloseModals();
  };
  
  const handleAddNewTender = (newTenderData) => {
    const newTender = {
      ...newTenderData,
      id: Date.now(),
      status: 'Draft',
    };
    setTenders(prevTenders => [...prevTenders, newTender]);
    handleCloseModals();
    setActiveTab('register');
  };

  const handleDeleteTender = (tenderIdToDelete) => {
    if (window.confirm("Are you sure you want to delete this tender? This action cannot be undone.")) {
      setTenders(prevTenders => 
        prevTenders.filter(tender => tender.id !== tenderIdToDelete)
      );
    }
  };

  // --- JSX ---
  return (
    // 3. Added 'relative' to the main container
    <div className="p-6 relative min-h-screen">
      
      {/* --- 3. ADDED BACK BUTTON --- */}
      <button
        onClick={() => navigate(-1)} // Navigates to the previous page
        className="absolute top-6 right-6 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors z-10"
      >
        <FaArrowLeft />
        Back to Bidding
      </button>
      {/* --- END OF ADDED BUTTON --- */}
      
      <h1 className="text-3xl font-bold mb-6">Vendor Bidding Management</h1>

      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="vendorBiddingTab" role="tablist">
          {[
            { id: 'register', label: 'Vendor Registration & Tenders' },
            { id: 'templates', label: 'Tender Documents' },
            { id: 'costs', label: 'Cost & Markup' },
            { id: 'reporting', label: 'Budget & Analysis' },
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

      <div id="vendorBiddingTabContent">
        {/* 1. Vendor Registration, Tracking, etc. */}
        {activeTab === 'register' && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Vendor Registration & Tender Tracking</h2>
              <button 
                onClick={() => setIsRegisterModalOpen(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Manage Profile / Register
              </button>
            </div>
            
            <p className="mb-4 text-gray-700">Here, vendors can manage their profile, submit required documents, and view their submitted/drafted tenders.</p>

            <h3 className="text-xl font-semibold mb-3">Your Tenders</h3>
            {tenders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tender Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tenders.map((tender) => (
                      <tr key={tender.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{tender.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            tender.status === 'Submitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {tender.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{tender.deadline}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => handleViewTender(tender)}
                            className="text-indigo-600 hover:text-indigo-900 mr-2"
                          >
                            View
                          </button>
                          {tender.status === 'Draft' && (
                            <button 
                              onClick={() => handleEditTender(tender)}
                              className="text-red-600 hover:text-red-900 mr-2"
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteTender(tender.id)}
                            className="text-gray-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No tenders submitted yet.</p>
            )}

            {/* Other sections in this tab */}
            <h3 className="text-xl font-semibold mb-3 mt-6">Notifications</h3>
            <p className="text-gray-700">You will receive automated notifications for new tender opportunities, status updates, and deadlines via email.</p>
            <h3 className="text-xl font-semibold mb-3 mt-6">Bid Comparison</h3>
            <BidComparisonTable data={bidComparisonData} />
            <h3 className="text-xl font-semibold mb-3 mt-6">Bid Management Overview</h3>
            <p className="text-gray-700">Your submitted tenders are actively tracked above. You can manage bid details within each tender.</p>
          </div>
        )}

        {/* e. Tender Templates */}
        {activeTab === 'templates' && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Create Tender Documents</h2>
            <p className="mb-4 text-gray-700">Use pre-designed templates to quickly draft tender proposals. Define your scope, timeline, and pricing clearly.</p>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              New Tender from Template
            </button>
          </div>
        )}

        {/* f, g, h, i. Cost Management */}
        {activeTab === 'costs' && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cost Estimation and Markup</h2>
            <h3 className="text-xl font-semibold mb-3">Detailed Cost Breakdown & Tracking</h3>
            <p className="mb-4 text-gray-700">Enter your project's detailed cost components for accurate bidding.</p>
            <CostBreakdownForm />
            <h3 className="text-xl font-semibold mb-3 mt-6">Markup Management</h3>
            <p className="mb-4 text-gray-700">Define and apply your desired profit margins to your estimated costs.</p>
            <div className="flex items-center space-x-4">
              <label htmlFor="markup" className="block text-sm font-medium text-gray-700">Default Markup (%):</label>
              <input
                type="number"
                id="markup"
                className="mt-1 block w-24 border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="15"
              />
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                Save Markup
              </button>
            </div>
            <h3 className="text-xl font-semibold mb-3 mt-6">Integrated Cost Estimation Tools</h3>
            <p className="text-gray-700">Our system integrates tools to help you accurately estimate project costs.</p>
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Launch Estimation Tool
            </button>
          </div>
        )}

        {/* j, k, l. Reporting */}
        {activeTab === 'reporting' && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Reporting and Analysis</h2>
            <h3 className="text-xl font-semibold mb-3">Profitability Analysis</h3>
            <p className="mb-4 text-gray-700">Analyze the profitability of your past and current projects.</p>
            <ProfitabilityAnalysisChart data={profitabilityData} />
            <h3 className="text-xl font-semibold mb-3 mt-6">Budget vs. Actual Reporting</h3>
            <p className="mb-4 text-gray-700">Compare your project budgets against actual expenditures.</p>
            <div className="bg-gray-50 p-4 rounded-md">
              <p>Example: Project X - Budget: $100,000, Actual: $105,000</p>
              <p>Example: Project Y - Budget: $50,000, Actual: $48,000</p>
            </div>
            <h3 className="text-xl font-semibold mb-3 mt-6">Cost Variance Analysis</h3>
            <p className="mb-4 text-gray-700">Identify and understand the reasons for differences between planned and actual costs.</p>
            <VarianceAnalysisChart data={costVarianceData} />
          </div>
        )}
      </div>

      {/* --- Render Modals --- */}
      <RegisterModal 
        isOpen={isRegisterModalOpen}
        onClose={handleCloseModals} 
      />
      <ViewTenderModal 
        isOpen={isViewModalOpen}
        onClose={handleCloseModals}
        tender={selectedTender}
      />
      <EditTenderModal 
        isOpen={isEditModalOpen}
        onClose={handleCloseModals}
        tender={selectedTender}
        onSave={handleSaveTender}
      />
      <AddTenderModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModals}
        onAdd={handleAddNewTender}
      />
    </div>
  );
};

export default VendorBiddingPage;