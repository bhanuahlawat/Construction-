import { useState } from 'react';
import ContractTable from './components/ContractTable';
import ContractModal from './components/ContractModal';

// --- Mock Data (Now with a 'type' field) ---
const MOCK_VENDOR_CONTRACTS = [
  { id: 1, type: 'vendor', title: 'Office Building HVAC', vendor: 'Cooling Systems Inc.', status: 'Active', amount: 120000 },
  { id: 2, type: 'vendor', title: 'Plumbing Services Q3', vendor: 'Reliable Pipes', status: 'Draft', amount: 45000 },
];

const MOCK_SUBCONTRACTOR_CONTRACTS = [
  { id: 3, type: 'subcontractor', title: 'Electrical Wiring - Site A', vendor: 'Spark Solutions', status: 'Active', amount: 80000 },
  { id: 4, type: 'subcontractor', title: 'Foundation Work - Site B', vendor: 'Concrete Pros', status: 'Draft', amount: 250000 },
];
// --- End Mock Data ---

function ContractList() {
  const [vendorContracts, setVendorContracts] = useState(MOCK_VENDOR_CONTRACTS);
  const [subcontractorContracts, setSubcontractorContracts] = useState(MOCK_SUBCONTRACTOR_CONTRACTS);
  
  const [activeTab, setActiveTab] = useState('vendor'); // 'vendor' or 'subcontractor'

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContract, setCurrentContract] = useState(null); // This holds the contract being edited

  // --- CRUD LOGIC (Updated) ---

  const handleSaveContract = (contractData) => {
    // If currentContract has data, it's an UPDATE
    if (currentContract) {
      const updatedContract = { ...currentContract, ...contractData };

      if (currentContract.type === 'vendor') {
        setVendorContracts(vendorContracts.map(c => 
          c.id === currentContract.id ? updatedContract : c
        ));
      } else {
        setSubcontractorContracts(subcontractorContracts.map(c => 
          c.id === currentContract.id ? updatedContract : c
        ));
      }
    } else {
      // Otherwise, it's a CREATE
      const newContract = {
        ...contractData,
        id: Date.now(), // Use timestamp for a simple unique ID
        type: activeTab, // Assign type from the active tab
      };

      if (activeTab === 'vendor') {
        setVendorContracts([...vendorContracts, newContract]);
      } else {
        setSubcontractorContracts([...subcontractorContracts, newContract]);
      }
    }
    closeModal();
  };

  const handleDeleteContract = (id) => {
    if (window.confirm('Are you sure you want to delete this contract?')) {
      // We only need to check the active tab, since the user can only
      // click delete on the list that is currently visible.
      if (activeTab === 'vendor') {
        setVendorContracts(vendorContracts.filter(c => c.id !== id));
      } else {
        setSubcontractorContracts(subcontractorContracts.filter(c => c.id !== id));
      }
    }
  };

  // --- MODAL CONTROLS (No changes needed) ---

  const openForCreate = () => {
    setCurrentContract(null);
    setIsModalOpen(true);
  };

  const openForEdit = (contract) => {
    setCurrentContract(contract);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContract(null);
  };

  // --- Helper to get the correct list based on active tab ---
  const activeList = activeTab === 'vendor' ? vendorContracts : subcontractorContracts;

  return (
    <div>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Contract Creation and Management
        </h2>
        <button
          onClick={openForCreate}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          {/* Button text now changes based on the active tab */}
          Create New {activeTab === 'vendor' ? 'Vendor' : 'Subcontractor'} Contract
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('vendor')}
            className={`
              py-3 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'vendor'
                ? "border-blue-500 text-blue-600" // Active tab style
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" // Inactive tab style
              }
            `}
          >
            Vendor Contracts
          </button>
          <button
            onClick={() => setActiveTab('subcontractor')}
            className={`
              py-3 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'subcontractor'
                ? "border-blue-500 text-blue-600" // Active tab style
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" // Inactive tab style
              }
            `}
          >
            Subcontractor Contracts
          </button>
        </nav>
      </div>

      {/* The table now dynamically shows the correct list */}
      <ContractTable
        contracts={activeList}
        onEdit={openForEdit}
        onDelete={handleDeleteContract}
      />

      {/* The modal is reused without any changes */}
      <ContractModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveContract}
        contract={currentContract}
      />
    </div>
  );
}
export default ContractList;