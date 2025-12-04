import React, { useState, useEffect } from 'react';
import { FaPlus, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';

// --- Mock Data ---
const mockIncidents = [
  { 
    id: 1, 
    date: '2025-10-28', 
    project: 'High-Rise Tower A', 
    type: 'Near Miss', 
    description: 'Tool dropped from 2nd floor, no one was hit.', 
    status: 'Under Investigation', 
    severity: 'Medium', 
    correctiveAction: 'Review tethering policy.' 
  },
  { 
    id: 2, 
    date: '2025-10-25', 
    project: 'Highway Expansion Pkg 3', 
    type: 'Accident', 
    description: 'Minor cut on hand, required first aid.', 
    status: 'Closed', 
    severity: 'Low', 
    correctiveAction: 'Issued new cut-resistant gloves to team.' 
  },
  { 
    id: 3, 
    date: '2025-10-22', 
    project: 'High-Rise Tower A', 
    type: 'Property Damage', 
    description: 'Forklift scraped side of delivery truck.', 
    status: 'Reported', 
    severity: 'Low', 
    correctiveAction: 'Pending review.' 
  },
];

// --- Main Component ---
const IncidentReportingManagement = () => {
  const [incidents, setIncidents] = useState(mockIncidents);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentIncident, setCurrentIncident] = useState(null); // To store the incident being edited

  // --- Handlers ---
  const handleAddIncident = (incidentData) => {
    const newIncident = {
      ...incidentData,
      id: `INC-${Math.floor(Math.random() * 9000) + 1000}`, // Random ID
      status: 'Reported', // New incidents are always 'Reported'
      correctiveAction: 'Pending review.',
    };
    setIncidents([newIncident, ...incidents]);
    setIsAddModalOpen(false);
  };

  const handleUpdateIncident = (updatedData) => {
    setIncidents(incidents.map(inc => 
      inc.id === currentIncident.id ? { ...inc, ...updatedData } : inc
    ));
    setIsUpdateModalOpen(false);
    setCurrentIncident(null);
  };

  const handleDeleteIncident = (incidentId) => {
    if (window.confirm('Are you sure you want to delete this incident report?')) {
      setIncidents(incidents.filter(inc => inc.id !== incidentId));
    }
  };

  const openUpdateModal = (incident) => {
    setCurrentIncident(incident);
    setIsUpdateModalOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">Incident Reporting & Management</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition w-full sm:w-auto"
        >
          <FaPlus /> Report New Incident
        </button>
      </div>
      <p className="text-gray-600 mb-4 text-sm">
        Record, track, and manage all workplace incidents. This includes near-misses, accidents, and property damage.
      </p>

      {/* --- Incidents Table --- */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {incidents.map((incident) => (
              <tr key={incident.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{incident.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{incident.project}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{incident.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`font-semibold ${
                    incident.severity === 'High' ? 'text-red-600' :
                    incident.severity === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {incident.severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    incident.status === 'Closed' ? 'bg-green-100 text-green-800' :
                    incident.status === 'Under Investigation' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {incident.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-4">
                  <button
                    onClick={() => openUpdateModal(incident)}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Update Status / Action"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteIncident(incident.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete Incident"
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
      <AddIncidentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddIncident}
      />
      <UpdateIncidentModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSave={handleUpdateIncident}
        incident={currentIncident}
      />
    </div>
  );
};

// --- Modal for Adding New Incidents ---
const AddIncidentModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0], // Defaults to today
    project: '',
    type: 'Near Miss',
    severity: 'Low',
    description: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose(); // Close modal on save
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Report New Incident</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><FaTimes /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Incident</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Project / Site</label>
            <input type="text" name="project" value={formData.project} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md" placeholder="e.g., High-Rise Tower A" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Incident Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white">
                <option value="Near Miss">Near Miss</option>
                <option value="Accident">Accident</option>
                <option value="Property Damage">Property Damage</option>
                <option value="Safety Observation">Safety Observation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Severity</label>
              <select name="severity" value={formData.severity} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Describe what happened..."
              required
            ></textarea>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg">Submit Report</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Modal for Updating Incident Status & Corrective Action ---
const UpdateIncidentModal = ({ isOpen, onClose, onSave, incident }) => {
  const [status, setStatus] = useState('');
  const [correctiveAction, setCorrectiveAction] = useState('');

  // Pre-fill the form when the modal opens
  useEffect(() => {
    if (incident) {
      setStatus(incident.status);
      setCorrectiveAction(incident.correctiveAction);
    }
  }, [incident, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ status, correctiveAction });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Update Incident (ID: {incident.id})</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><FaTimes /></button>
        </div>
        
        {/* Read-only incident details */}
        <div className="mb-4 p-4 bg-gray-50 rounded-md border">
          <p><strong>Project:</strong> {incident.project}</p>
          <p><strong>Date:</strong> {incident.date}</p>
          <p><strong>Description:</strong> {incident.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Investigation Status</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="Reported">Reported</option>
              <option value="Under Investigation">Under Investigation</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Corrective Action Taken</label>
            <textarea
              value={correctiveAction}
              onChange={(e) => setCorrectiveAction(e.target.value)}
              rows="4"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Describe the corrective action taken or planned..."
            ></textarea>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg">Save Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentReportingManagement;