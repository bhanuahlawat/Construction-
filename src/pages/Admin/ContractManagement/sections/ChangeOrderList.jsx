import { useState } from 'react';
import ChangeOrderTable from './components/ChangeOrderTable';
import ChangeOrderModal from './components/ChangeOrderModal';

// --- Mock Data (Now with a 'type' field) ---
const MOCK_VENDOR_CHANGE_ORDERS = [
  { id: 1, type: 'vendor', title: 'Change of Materials - Lobby', project: 'Plumbing Services Q3', status: 'Pending', amount: -2000 },
  { id: 2, type: 'vendor', title: 'Additional HVAC Ductwork', project: 'Office Building HVAC', status: 'Approved', amount: 7500 },
];

const MOCK_SUBCONTRACTOR_CHANGE_ORDERS = [
  { id: 3, type: 'subcontractor', title: 'Additional Lighting - 2nd Floor', project: 'Electrical Wiring - Site A', status: 'Approved', amount: 5000 },
  { id: 4, type: 'subcontractor', title: 'Extended Scaffolding Rental', project: 'Foundation Work - Site B', status: 'Pending', amount: 3000 },
];
// --- End Mock Data ---

function ChangeOrderList() {
  const [vendorChangeOrders, setVendorChangeOrders] = useState(MOCK_VENDOR_CHANGE_ORDERS);
  const [subcontractorChangeOrders, setSubcontractorChangeOrders] = useState(MOCK_SUBCONTRACTOR_CHANGE_ORDERS);
  
  const [activeTab, setActiveTab] = useState('vendor'); // 'vendor' or 'subcontractor'

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null); // This holds the order being edited

  // --- CRUD LOGIC (Updated) ---

  const handleSaveOrder = (orderData) => {
    // If currentOrder has data, it's an UPDATE
    if (currentOrder) {
      const updatedOrder = { ...currentOrder, ...orderData };

      if (currentOrder.type === 'vendor') {
        setVendorChangeOrders(vendorChangeOrders.map(o => 
          o.id === currentOrder.id ? updatedOrder : o
        ));
      } else {
        setSubcontractorChangeOrders(subcontractorChangeOrders.map(o => 
          o.id === currentOrder.id ? updatedOrder : o
        ));
      }
    } else {
      // Otherwise, it's a CREATE
      const newOrder = {
        ...orderData,
        id: Date.now(), // Use timestamp for a simple unique ID
        type: activeTab, // Assign type from the active tab
      };

      if (activeTab === 'vendor') {
        setVendorChangeOrders([...vendorChangeOrders, newOrder]);
      } else {
        setSubcontractorChangeOrders([...subcontractorChangeOrders, newOrder]);
      }
    }
    closeModal();
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm('Are you sure you want to delete this change order?')) {
      if (activeTab === 'vendor') {
        setVendorChangeOrders(vendorChangeOrders.filter(o => o.id !== id));
      } else {
        setSubcontractorChangeOrders(subcontractorChangeOrders.filter(o => o.id !== id));
      }
    }
  };

  // --- MODAL CONTROLS ---

  const openForCreate = () => {
    setCurrentOrder(null);
    setIsModalOpen(true);
  };

  const openForEdit = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentOrder(null);
  };

  // --- Helper to get the correct list based on active tab ---
  const activeList = activeTab === 'vendor' ? vendorChangeOrders : subcontractorChangeOrders;

  return (
    <div>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Change Order Management
        </h2>
        <button
          onClick={openForCreate}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          {/* Button text now changes based on the active tab */}
          Submit New {activeTab === 'vendor' ? 'Vendor' : 'Subcontractor'} Order
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
            Vendor Change Orders
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
            Subcontractor Change Orders
          </button>
        </nav>
      </div>

      {/* The table now dynamically shows the correct list */}
      <ChangeOrderTable
        changeOrders={activeList}
        onEdit={openForEdit}
        onDelete={handleDeleteOrder}
      />

      {/* The modal is reused without any changes */}
      <ChangeOrderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveOrder}
        order={currentOrder}
      />
    </div>
  );
}
export default ChangeOrderList;



// import { useState } from 'react';
// import ChangeOrderTable from './components/ChangeOrderTable';
// import ChangeOrderModal from './components/ChangeOrderModal';

// const MOCK_CHANGE_ORDERS = [
//   { id: 1, title: 'Additional Lighting - 2nd Floor', project: 'Office Building HVAC', status: 'Approved', amount: 5000 },
//   { id: 2, title: 'Change of Materials - Lobby', project: 'Plumbing Services Q3', status: 'Pending', amount: -2000 },
// ];

// function ChangeOrderList() {
//   const [changeOrders, setChangeOrders] = useState(MOCK_CHANGE_ORDERS);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentOrder, setCurrentOrder] = useState(null);

//   const handleSaveOrder = (orderData) => {
//     if (currentOrder) {
//       setChangeOrders(changeOrders.map(o => o.id === currentOrder.id ? { ...o, ...orderData } : o));
//     } else {
//       setChangeOrders([...changeOrders, { ...orderData, id: Date.now() }]);
//     }
//     closeModal();
//   };

//   const handleDeleteOrder = (id) => {
//     if (window.confirm('Are you sure you want to delete this change order?')) {
//       setChangeOrders(changeOrders.filter(o => o.id !== id));
//     }
//   };

//   const openForCreate = () => {
//     setCurrentOrder(null);
//     setIsModalOpen(true);
//   };

//   const openForEdit = (order) => {
//     setCurrentOrder(order);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentOrder(null);
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold text-gray-800">
//           Change Order Management
//         </h2>
//         <button
//           onClick={openForCreate}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
//         >
//           Submit Change Order
//         </button>
//       </div>

//       <ChangeOrderTable
//         changeOrders={changeOrders}
//         onEdit={openForEdit}
//         onDelete={handleDeleteOrder}
//       />

//       <ChangeOrderModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onSave={handleSaveOrder}
//         order={currentOrder}
//       />
//     </div>
//   );
// }
// export default ChangeOrderList;