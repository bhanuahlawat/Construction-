import { useState } from 'react';

// Import the content for each tab
import ContractList from './sections/ContractList';
import WorkorderList from './sections/WorkorderList';
import ChangeOrderList from './sections/ChangeOrderList';
// import BillingDashboard from './ContractManagement/sections/BillingDashboard';

// Define tabs in an array to make rendering cleaner
const tabs = [
  { id: 'contracts', label: 'Contract Creation' },
  { id: 'workorders', label: 'Subcontractor Workorders' },
  { id: 'change-orders', label: 'Change Order Management' },
];

function ContractManagementPage() {
  // 'contracts' is the default active tab
  const [activeTab, setActiveTab] = useState('contracts');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'contracts':
        return <ContractList />;
      case 'workorders':
        return <WorkorderList />;
      case 'change-orders':
        return <ChangeOrderList />;
      
      default:
        return <ContractList />;
    }
  };

  return (
    <div className="p-6 md:p-8"> {/* Main page padding */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Contract Management
      </h1>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600' // Active tab style
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300' // Inactive tab style
                }
                py-4 px-1 border-b-2 font-medium text-sm focus:outline-none
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default ContractManagementPage;