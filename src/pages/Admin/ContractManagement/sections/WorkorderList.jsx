import { useState } from 'react';
import WorkorderTable from './components/WorkorderTable';
import WorkorderModal from './components/WorkorderModal';

const MOCK_WORKORDERS = [
  { id: 1, description: 'Perimeter Fencing - Site B', subcontractor: 'SecureFence Ltd.', status: 'In Progress', hours: 80 },
  { id: 2, description: 'Foundation Waterproofing', subcontractor: 'DryBase Solutions', status: 'Pending', hours: 40 },
];

function WorkorderList() {
  const [workorders, setWorkorders] = useState(MOCK_WORKORDERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWorkorder, setCurrentWorkorder] = useState(null);

  const handleSaveWorkorder = (workorderData) => {
    if (currentWorkorder) {
      setWorkorders(workorders.map(w => w.id === currentWorkorder.id ? { ...w, ...workorderData } : w));
    } else {
      setWorkorders([...workorders, { ...workorderData, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDeleteWorkorder = (id) => {
    if (window.confirm('Are you sure you want to delete this workorder?')) {
      setWorkorders(workorders.filter(w => w.id !== id));
    }
  };

  const openForCreate = () => {
    setCurrentWorkorder(null);
    setIsModalOpen(true);
  };

  const openForEdit = (workorder) => {
    setCurrentWorkorder(workorder);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentWorkorder(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Subcontractor Workorders & Agreements
        </h2>
        <button
          onClick={openForCreate}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          New Workorder
        </button>
      </div>

      <WorkorderTable
        workorders={workorders}
        onEdit={openForEdit}
        onDelete={handleDeleteWorkorder}
      />

      <WorkorderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveWorkorder}
        workorder={currentWorkorder}
      />
    </div>
  );
}
export default WorkorderList;