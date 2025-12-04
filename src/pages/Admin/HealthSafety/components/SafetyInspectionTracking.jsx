import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes, FaEdit, FaTrash } from "react-icons/fa";

// --- Mock Data ---
const mockInspections = [
  {
    id: 1,
    project: "High-Rise Tower A",
    type: "Weekly Site Walk",
    inspector: "John Doe",
    date: "2025-10-28",
    status: "Completed",
    notes: "All clear. Minor debris on Floor 3, notified sub.",
  },
  {
    id: 2,
    project: "Highway Expansion Pkg 3",
    type: "Scaffolding Check",
    inspector: "Jane Smith",
    date: "2025-10-30",
    status: "In Progress",
    notes: "Tags missing on west-side scaffold.",
  },
  {
    id: 3,
    project: "High-Rise Tower A",
    type: "Electrical Safety",
    inspector: "John Doe",
    date: "2025-11-05",
    status: "Scheduled",
    notes: "",
  },
];

// --- Helper Component for Status Badge ---
const StatusBadge = ({ status }) => {
  let colorClass = "bg-gray-100 text-gray-800";
  switch (status) {
    case "Completed":
      colorClass = "bg-green-100 text-green-800";
      break;
    case "In Progress":
      colorClass = "bg-yellow-100 text-yellow-800";
      break;
    case "Scheduled":
      colorClass = "bg-blue-100 text-blue-800";
      break;
    case "Failed":
      colorClass = "bg-red-100 text-red-800";
      break;
    default:
      break;
  }
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}
    >
      {status}
    </span>
  );
};

// --- Main Component ---
const SafetyInspectionTracking = () => {
  const [inspections, setInspections] = useState(mockInspections);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentInspection, setCurrentInspection] = useState(null);

  // --- Handlers ---
  const handleScheduleInspection = (inspectionData) => {
    const newInspection = {
      ...inspectionData,
      id: `INSP-${Math.floor(Math.random() * 9000) + 1000}`,
      status: "Scheduled",
      notes: "",
    };
    setInspections([newInspection, ...inspections]);
    setIsScheduleModalOpen(false);
  };

  const handleUpdateInspection = (updatedData) => {
    setInspections(
      inspections.map((insp) =>
        insp.id === currentInspection.id ? { ...insp, ...updatedData } : insp
      )
    );
    setIsUpdateModalOpen(false);
    setCurrentInspection(null);
  };

  const handleDeleteInspection = (inspectionId) => {
    if (
      window.confirm("Are you sure you want to delete this inspection record?")
    ) {
      setInspections(inspections.filter((insp) => insp.id !== inspectionId));
    }
  };

  const openUpdateModal = (inspection) => {
    setCurrentInspection(inspection);
    setIsUpdateModalOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
          Safety Inspection Tracking
        </h2>
        <button
          onClick={() => setIsScheduleModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition w-full sm:w-auto"
        >
          <FaPlus /> Schedule Inspection
        </button>
      </div>
      <p className="text-gray-600 mb-4 text-sm">
        Manage and track all safety inspections across projects. Schedule new
        inspections, assign inspectors, and log results.
      </p>

      {/* --- Inspections Table --- */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Inspection Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Inspector
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inspections.map((inspection) => (
              <tr key={inspection.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {inspection.project}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {inspection.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {inspection.inspector}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {inspection.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={inspection.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-4">
                  <button
                    onClick={() => openUpdateModal(inspection)}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Update / View Checklist"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteInspection(inspection.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete Inspection"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Modals --- */}
      <ScheduleInspectionModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSave={handleScheduleInspection}
      />
      <UpdateInspectionModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSave={handleUpdateInspection}
        inspection={currentInspection}
      />
    </div>
  );
};

// --- Modal for Scheduling New Inspections ---
const ScheduleInspectionModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    project: "",
    type: "",
    inspector: "",
    date: new Date().toISOString().split("T")[0],
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Schedule New Inspection</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project / Site
            </label>
            <input
              type="text"
              name="project"
              value={formData.project}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="e.g., High-Rise Tower A"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Inspection Type
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="e.g., Weekly Site Walk"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Inspector
              </label>
              <input
                type="text"
                name="inspector"
                value={formData.inspector}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="e.g., John Doe"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Scheduled Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Schedule Inspection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Modal for Updating Inspection (Checklist Management) ---
const UpdateInspectionModal = ({ isOpen, onClose, onSave, inspection }) => {
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (inspection) {
      setStatus(inspection.status);
      setNotes(inspection.notes);
    }
  }, [inspection, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ status, notes });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Update Inspection</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mb-4 p-4 bg-gray-50 rounded-md border">
          <p>
            <strong>Project:</strong> {inspection.project}
          </p>
          <p>
            <strong>Type:</strong> {inspection.type}
          </p>
          <p>
            <strong>Date:</strong> {inspection.date}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Inspection Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Checklist Results / Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="5"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Log inspection results, findings, and corrective actions here..."
            ></textarea>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Save Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SafetyInspectionTracking;
