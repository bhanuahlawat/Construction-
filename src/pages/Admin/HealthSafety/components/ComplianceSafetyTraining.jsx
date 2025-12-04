import React, { useState } from 'react';
import { FaPlus, FaTimes, FaTrash } from 'react-icons/fa'; // Added FaTrash icon

// --- Mock Data ---
const mockAudits = [
  { id: 'A-101', project: 'High-Rise Tower A', type: 'Monthly Site Walk', status: 'Completed', date: '2025-10-15', inspector: 'John Doe' },
  { id: 'A-102', project: 'Highway Expansion Pkg 3', type: 'Equipment Safety', status: 'Scheduled', date: '2025-11-05', inspector: 'Jane Smith' },
  { id: 'A-103', project: 'High-Rise Tower A', type: 'Electrical Systems', status: 'Pending', date: '2025-11-10', inspector: 'TBD' },
];

const mockTraining = [
  { id: 'T-201', employee: 'Mike Johnson', certification: 'Working at Heights', status: 'Active', expiry: '2026-09-30' },
  { id: 'T-202', employee: 'Sarah Chen', certification: 'First Aid Level 2', status: 'Active', expiry: '2027-01-15' },
  { id: 'T-203', employee: 'David Lee', certification: 'Forklift Operation', status: 'Expired', expiry: '2025-10-01' },
  { id: 'T-204', employee: 'Mike Johnson', certification: 'Confined Space Entry', status: 'Active', expiry: '2026-11-20' },
];

// --- Main Component ---
const ComplianceSafetyTraining = () => {
  const [audits, setAudits] = useState(mockAudits);
  const [trainingRecords, setTrainingRecords] = useState(mockTraining);
  
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);

  // --- Handlers ---
  const handleScheduleAudit = (auditData) => {
    const newAudit = {
      ...auditData,
      id: `A-${Math.floor(Math.random() * 900) + 100}`, // Random ID
      // Status is now set from the modal, not hardcoded
    };
    setAudits([newAudit, ...audits]);
    setIsAuditModalOpen(false);
  };

  const handleAddTraining = (trainingData) => {
    const newTraining = {
      ...trainingData,
      id: `T-${Math.floor(Math.random() * 900) + 100}`, // Random ID
      // Status is now set from the modal, not hardcoded
    };
    setTrainingRecords([newTraining, ...trainingRecords]);
    setIsTrainingModalOpen(false);
  };

  // --- NEW: Delete Handlers ---
  const handleDeleteAudit = (auditId) => {
    if (window.confirm('Are you sure you want to delete this audit record?')) {
      setAudits(audits.filter(audit => audit.id !== auditId));
    }
  };

  const handleDeleteTraining = (recordId) => {
    if (window.confirm('Are you sure you want to delete this training record?')) {
      setTrainingRecords(trainingRecords.filter(record => record.id !== recordId));
    }
  };

  return (
    <div>
      {/* --- Section 1: Compliance Audits --- */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">Compliance Audits</h2>
          <button
            onClick={() => setIsAuditModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
          >
            <FaPlus /> Schedule Audit
          </button>
        </div>
        <p className="text-gray-600 mb-4 text-sm">
          Track and manage all scheduled and completed compliance audits.
        </p>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audit Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> {/* NEW */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {audits.map((audit) => (
                <tr key={audit.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{audit.project}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{audit.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      audit.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      audit.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {audit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{audit.date}</td>
                  {/* NEW Delete Button */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDeleteAudit(audit.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete Audit"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* --- Section 2: Safety Training Records --- */}
      <section className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">Safety Training Records</h2>
          <button
            onClick={() => setIsTrainingModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
          >
            <FaPlus /> Add Training Record
          </button>
        </div>
        <p className="text-gray-600 mb-4 text-sm">
          Manage employee training certifications and track expiry dates.
        </p>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> {/* NEW */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trainingRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.employee}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.certification}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    record.status === 'Expired' ? 'text-red-600 font-bold' : 'text-gray-500'
                  }`}>
                    {record.expiry}
                  </td>
                  {/* NEW Delete Button */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDeleteTraining(record.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete Record"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* --- Modals --- */}
      <ScheduleAuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        onSave={handleScheduleAudit}
      />
      <AddTrainingModal
        isOpen={isTrainingModalOpen}
        onClose={() => setIsTrainingModalOpen(false)}
        onSave={handleAddTraining}
      />
    </div>
  );
};

// --- Modal Component for Scheduling Audits (UPDATED) ---
const ScheduleAuditModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({ 
    project: '', 
    type: '', 
    date: '', 
    status: 'Scheduled' // Default status
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ project: '', type: '', date: '', status: 'Scheduled' }); // Reset form
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Schedule New Audit</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project</label>
            <input
              type="text"
              value={formData.project}
              onChange={(e) => setFormData({ ...formData, project: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Audit Type</label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="e.g., Monthly Site Walk"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* NEW Status Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg">Schedule</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Modal Component for Adding Training Records (UPDATED) ---
const AddTrainingModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({ 
    employee: '', 
    certification: '', 
    expiry: '',
    status: 'Active' // Default status
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ employee: '', certification: '', expiry: '', status: 'Active' }); // Reset form
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Add Training Record</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee Name</label>
            <input
              type="text"
              value={formData.employee}
              onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Certification Name</label>
            <input
              type="text"
              value={formData.certification}
              onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="e.g., Working at Heights"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="date"
              value={formData.expiry}
              onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* NEW Status Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg">Save Record</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplianceSafetyTraining;