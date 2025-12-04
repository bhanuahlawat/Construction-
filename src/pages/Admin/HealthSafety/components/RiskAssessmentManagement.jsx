import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes, FaEdit, FaTrash } from "react-icons/fa";

// --- Mock Data ---
const mockRisks = [
  {
    id: 1,
    task: "Working at Heights (Roofing)",
    hazard: "Fall from height",
    likelihood: "Medium",
    impact: "High",
    mitigationPlan:
      "Full body harness, guardrails installed, 100% tie-off policy.",
    status: "In Progress",
    owner: "Site Supervisor",
  },
  {
    id: 2,
    task: "Excavation Work",
    hazard: "Trench collapse",
    likelihood: "Low",
    impact: "High",
    mitigationPlan:
      "Trench box and shoring used for all depths over 1.5m. Daily inspection.",
    status: "Closed",
    owner: "Foreman",
  },
  {
    id: 3,
    task: "Electrical Panel Installation",
    hazard: "Electric shock",
    likelihood: "Low",
    impact: "Medium",
    mitigationPlan:
      "LOTO (Lockout/Tagout) procedures followed. Only certified electricians to perform work.",
    status: "Open",
    owner: "Electrical Lead",
  },
];

// --- Helper Components for Badges ---
const getRiskLevel = (likelihood, impact) => {
  if (impact === "High" && likelihood === "High")
    return { label: "Extreme", class: "bg-red-700 text-white" };
  if (impact === "High" || likelihood === "High")
    return { label: "High", class: "bg-red-500 text-white" };
  if (impact === "Medium" && likelihood === "Medium")
    return { label: "Medium", class: "bg-yellow-500 text-gray-900" };
  return { label: "Low", class: "bg-green-500 text-white" };
};

const RiskLevelBadge = ({ likelihood, impact }) => {
  const level = getRiskLevel(likelihood, impact);
  return (
    <span
      className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${level.class}`}
    >
      {level.label}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  let color;
  switch (status) {
    case "Closed":
      color = "bg-green-100 text-green-800";
      break;
    case "In Progress":
      color = "bg-yellow-100 text-yellow-800";
      break;
    case "Open":
    default:
      color = "bg-blue-100 text-blue-800";
  }
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${color}`}
    >
      {status}
    </span>
  );
};

// --- Main Component ---
const RiskAssessmentManagement = () => {
  const [risks, setRisks] = useState(mockRisks);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentRisk, setCurrentRisk] = useState(null);

  // --- Handlers ---
  const handleAddRisk = (riskData) => {
    const newRisk = {
      ...riskData,
      id: `R-${Math.floor(Math.random() * 9000) + 1000}`,
      status: "Open", // New risks are always 'Open'
    };
    setRisks([newRisk, ...risks]);
    setIsAddModalOpen(false);
  };

  const handleUpdateRisk = (updatedData) => {
    setRisks(
      risks.map((r) => (r.id === currentRisk.id ? { ...r, ...updatedData } : r))
    );
    setIsUpdateModalOpen(false);
    setCurrentRisk(null);
  };

  const handleDeleteRisk = (riskId) => {
    if (
      window.confirm("Are you sure you want to delete this risk assessment?")
    ) {
      setRisks(risks.filter((r) => r.id !== riskId));
    }
  };

  const openUpdateModal = (risk) => {
    setCurrentRisk(risk);
    setIsUpdateModalOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
          Risk Assessment Register
        </h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition w-full sm:w-auto"
        >
          <FaPlus /> Log New Risk
        </button>
      </div>
      <p className="text-gray-600 mb-4 text-sm">
        A central register of all identified risks, their mitigation plans, and
        current status.
      </p>

      {/* --- Risk Register Table --- */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task / Hazard
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risk Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mitigation Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {risks.map((risk) => (
              <tr key={risk.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-normal text-sm">
                  <div className="font-medium text-gray-900">{risk.task}</div>
                  <div className="text-gray-500">{risk.hazard}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <RiskLevelBadge
                    likelihood={risk.likelihood}
                    impact={risk.impact}
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {risk.mitigationPlan}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={risk.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {risk.owner}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-4">
                  <button
                    onClick={() => openUpdateModal(risk)}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Update Status / Mitigation"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteRisk(risk.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete Risk"
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
      <AddRiskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddRisk}
      />
      <UpdateRiskModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSave={handleUpdateRisk}
        risk={currentRisk}
      />
    </div>
  );
};

// --- Modal for Adding New Risk ---
const AddRiskModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    task: "",
    hazard: "",
    likelihood: "Low",
    impact: "Low",
    mitigationPlan: "",
    owner: "",
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

  const currentRiskLevel = getRiskLevel(formData.likelihood, formData.impact);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Log New Risk Assessment</h3>
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
              Task / Activity
            </label>
            <input
              type="text"
              name="task"
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="e.g., Working at Heights"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Potential Hazard
            </label>
            <input
              type="text"
              name="hazard"
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="e.g., Fall from height"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Likelihood
              </label>
              <select
                name="likelihood"
                value={formData.likelihood}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Impact
              </label>
              <select
                name="impact"
                value={formData.impact}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div className="text-sm font-medium">
            Calculated Risk Level:
            <span
              className={`ml-2 px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${currentRiskLevel.class}`}
            >
              {currentRiskLevel.label}
            </span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mitigation Plan / Control Measures
            </label>
            <textarea
              name="mitigationPlan"
              onChange={handleChange}
              rows="3"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Describe control measures..."
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Owner (Responsible Person)
            </label>
            <input
              type="text"
              name="owner"
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="e.g., Site Supervisor"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              typeT="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Save Risk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Modal for Updating Risk Status ---
const UpdateRiskModal = ({ isOpen, onClose, onSave, risk }) => {
  const [status, setStatus] = useState("");
  const [mitigationPlan, setMitigationPlan] = useState("");
  const [owner, setOwner] = useState("");

  useEffect(() => {
    if (risk) {
      setStatus(risk.status);
      setMitigationPlan(risk.mitigationPlan);
      setOwner(risk.owner);
    }
  }, [risk, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ status, mitigationPlan, owner });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Update Risk (ID: {risk.id})</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mb-4 p-4 bg-gray-50 rounded-md border">
          <p>
            <strong>Task:</strong> {risk.task}
          </p>
          <p>
            <strong>Hazard:</strong> {risk.hazard}
          </p>
          <p>
            <strong>Risk Level:</strong>{" "}
            <RiskLevelBadge likelihood={risk.likelihood} impact={risk.impact} />
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mitigation Plan
            </label>
            <textarea
              value={mitigationPlan}
              onChange={(e) => setMitigationPlan(e.target.value)}
              rows="4"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Owner (Responsible Person)
            </label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
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
              Save Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RiskAssessmentManagement;
