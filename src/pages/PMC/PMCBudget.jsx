import React, { useState } from 'react';

// Import all the new components
import BudgetHeader from './PMCBudget/BudgetHeader';
import BudgetSummary from './PMCBudget/BudgetSummary';
import BudgetTable from './PMCBudget/BudgetTable';
import BudgetModal from './PMCBudget/BudgetModal';

// --- Data ---
const initialBudgetItems = [
  { id: 1, category: 'Labor', item: 'General Contracting', allocated: 250000, actual: 235000 },
  { id: 2, category: 'Materials', item: 'Structural Steel', allocated: 180000, actual: 195000 },
  { id: 3, category: 'Materials', item: 'Concrete & Masonry', allocated: 320000, actual: 320000 },
  { id: 4, category: 'Equipment', item: 'Crane Rental', allocated: 75000, actual: 70000 },
  { id: 5, category: 'Permits', item: 'City Building Permits', allocated: 22000, actual: 23500 },
];

const emptyFormState = {
  category: '',
  item: '',
  allocated: 0,
  actual: 0
};

// --- Main Page Component ---
const PMCBudget = () => {

  // --- State Management ---
  const [budgetItems, setBudgetItems] = useState(initialBudgetItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(emptyFormState);

  // --- Calculations ---
  const totalAllocated = budgetItems.reduce((sum, item) => sum + item.allocated, 0);
  const totalActual = budgetItems.reduce((sum, item) => sum + item.actual, 0);
  const totalVariance = totalAllocated - totalActual;

  // --- Logic & Event Handlers ---
  const handleAddNew = () => {
    setFormData(emptyFormState);
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setBudgetItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData(emptyFormState);
  };

  const handleFormChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      setBudgetItems(prevItems =>
        prevItems.map(item =>
          item.id === editingItem.id ? { ...formData, id: item.id } : item
        )
      );
    } else {
      const newItem = {
        ...formData,
        id: Date.now(),
      };
      setBudgetItems(prevItems => [newItem, ...prevItems]);
    }
    closeModal();
  };

  // --- Render ---
  return (
    <div className="p-6 md:p-8 font-sans bg-gray-50 min-h-screen">
      
      {/* 1. Header Component */}
      <BudgetHeader onAddNew={handleAddNew} />

      {/* 2. Summary Cards Component */}
      <BudgetSummary
        totalAllocated={totalAllocated}
        totalActual={totalActual}
        totalVariance={totalVariance}
      />

      {/* 3. Table Component */}
      <BudgetTable
        budgetItems={budgetItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* 4. Modal Component */}
      <BudgetModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        formData={formData}
        onChange={handleFormChange}
        editingItem={editingItem}
      />

    </div>
  );
};

export default PMCBudget;