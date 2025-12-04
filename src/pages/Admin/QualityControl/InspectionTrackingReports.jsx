// src/Pages/Admin/QualityControl/InspectionTrackingReports.jsx

import React, { useState } from 'react';

// --- Helper Functions for Badges ---
const getStatusBadge = (status) => {
  switch (status) {
    case 'Pending':
    case 'Submitted':
    case 'Open':
      return 'bg-yellow-100 text-yellow-800';
    case 'Completed':
    case 'Approved':
    case 'Pass':
    case 'Closed':
      return 'bg-green-100 text-green-800';
    case 'Rejected':
    case 'Fail':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const InspectionTrackingReports = () => {
  // --- State Variables ---
  const [activeTab, setActiveTab] = useState('checklists');
  
  // Data state for each tab
  const [checklists, setChecklists] = useState([]);
  const [rfis, setRfis] = useState([]);
  const [mirs, setMirs] = useState([]);
  const [testingLogs, setTestingLogs] = useState([]);

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // State for forms and modals
  const [formData, setFormData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalStatus, setModalStatus] = useState('');
  const [reportData, setReportData] = useState('');

  // Tab definitions
  const tabs = [
    { id: 'checklists', name: 'Checklists' },
    { id: 'rfi', name: 'RFI' },
    { id: 'mir', name: 'MIR' },
    { id: 'testing', name: 'Testing Logs' },
  ];
  
  // Status options for the update modal
  const statusOptions = {
    checklists: ['Pending', 'Completed'],
    rfi: ['Submitted', 'Approved', 'Rejected'],
    mir: ['Submitted', 'Inspected', 'Approved', 'Rejected'],
    testing: ['Pending', 'Pass', 'Fail'],
  };

  // --- Event Handlers ---

  // Opens the "Add New" form, setting default values based on the tab
  const handleOpenFormModal = () => {
    const defaultData = {
      checklists: { name: '', status: 'Pending' },
      rfi: { subject: '', date: '', status: 'Submitted' },
      mir: { material: '', date: '', status: 'Submitted' },
      testing: { testName: '', date: '', result: 'Pending' },
    };
    setFormData(defaultData[activeTab]);
    setIsFormModalOpen(true);
  };

  // Handles form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submits the "Add New" form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const id = `${activeTab.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const newItem = { ...formData, id };

    switch (activeTab) {
      case 'checklists':
        setChecklists([...checklists, newItem]);
        break;
      case 'rfi':
        setRfis([...rfis, newItem]);
        break;
      case 'mir':
        setMirs([...mirs, newItem]);
        break;
      case 'testing':
        setTestingLogs([...testingLogs, newItem]);
        break;
      default:
        break;
    }
    setIsFormModalOpen(false);
  };

  // Opens the "View Details" modal
  const handleViewClick = (item) => { // <-- THIS IS THE CORRECTED LINE
    setSelectedItem(item);
    setModalStatus(item.status || item.result); // Handle 'result' for testing logs
    setIsViewModalOpen(true);
  };

  // Updates the status of an item from the "View" modal
  const handleUpdateStatus = () => {
    const updateItem = (item) => (
      item.id === selectedItem.id 
        ? { ...item, status: modalStatus, result: modalStatus } // Update status or result
        : item
    );

    switch (activeTab) {
      case 'checklists':
        setChecklists(checklists.map(updateItem));
        break;
      case 'rfi':
        setRfis(rfis.map(updateItem));
        break;
      case 'mir':
        setMirs(mirs.map(updateItem));
        break;
      case 'testing':
        setTestingLogs(testingLogs.map(updateItem));
        break;
      default:
        break;
    }
    setIsViewModalOpen(false);
    setSelectedItem(null);
  };

  // Deletes an item from the active tab's list
  const handleDeleteClick = (itemId) => {
    if (!window.confirm(`Are you sure you want to delete item ${itemId}?`)) return;

    switch (activeTab) {
      case 'checklists':
        setChecklists(checklists.filter(i => i.id !== itemId));
        break;
      case 'rfi':
        setRfis(rfis.filter(i => i.id !== itemId));
        break;
      case 'mir':
        setMirs(mirs.filter(i => i.id !== itemId));
        break;
      case 'testing':
        setTestingLogs(testingLogs.filter(i => i.id !== itemId));
        break;
      default:
        break;
    }
  };

  // Generates a text report and displays it in a modal
  const handleGenerateReport = () => {
    let report = `--- QUALITY CONTROL REPORT (${new Date().toLocaleDateString()}) ---\n\n`;
    
    report += `== CHECKLISTS (${checklists.length}) ==\n`;
    report += checklists.length ? JSON.stringify(checklists, null, 2) : 'No data.\n';
    
    report += `\n\n== REQUESTS FOR INSPECTION (RFI) (${rfis.length}) ==\n`;
    report += rfis.length ? JSON.stringify(rfis, null, 2) : 'No data.\n';
    
    report += `\n\n== MATERIAL INSPECTION REPORTS (MIR) (${mirs.length}) ==\n`;
    report += mirs.length ? JSON.stringify(mirs, null, 2) : 'No data.\n';
    
    report += `\n\n== TESTING LOGS (${testingLogs.length}) ==\n`;
    report += testingLogs.length ? JSON.stringify(testingLogs, null, 2) : 'No data.\n';
    
    setReportData(report);
    setIsReportModalOpen(true);
  };

  // --- Dynamic Content Rendering ---

  // Renders the form fields inside the "Add New" modal
  const renderFormFields = () => {
    switch (activeTab) {
      case 'checklists':
        return (
          <label className="block">
            <span className="text-gray-700">Checklist Name</span>
            <input type="text" name="name" onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </label>
        );
      case 'rfi':
        return (
          <>
            <label className="block">
              <span className="text-gray-700">RFI Subject</span>
              <input type="text" name="subject" onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </label>
            <label className="block">
              <span className="text-gray-700">Date</span>
              <input type="date" name="date" onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </label>
          </>
        );
      case 'mir':
        return (
          <>
            <label className="block">
              <span className="text-gray-700">Material</span>
              <input type="text" name="material" onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </label>
            <label className="block">
              <span className="text-gray-700">Date</span>
              <input type="date" name="date" onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </label>
          </>
        );
      case 'testing':
        return (
          <>
            <label className="block">
              <span className="text-gray-700">Test Name</span>
              <input type="text" name="testName" onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </label>
            <label className="block">
              <span className="text-gray-700">Date</span>
              <input type="date" name="date" onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </label>
          </>
        );
      default:
        return null;
    }
  };

  // Renders the details inside the "View" modal
  const renderViewDetails = () => {
    if (!selectedItem) return null;
    switch (activeTab) {
      case 'checklists':
        return <p><strong className="text-gray-600">Name:</strong> {selectedItem.name}</p>;
      case 'rfi':
        return (
          <>
            <p><strong className="text-gray-600">Subject:</strong> {selectedItem.subject}</p>
            <p><strong className="text-gray-600">Date:</strong> {selectedItem.date}</p>
          </>
        );
      case 'mir':
        return (
          <>
            <p><strong className="text-gray-600">Material:</strong> {selectedItem.material}</p>
            <p><strong className="text-gray-600">Date:</strong> {selectedItem.date}</p>
          </>
        );
      case 'testing':
        return (
          <>
            <p><strong className="text-gray-600">Test Name:</strong> {selectedItem.testName}</p>
            <p><strong className="text-gray-600">Date:</strong> {selectedItem.date}</p>
          </>
        );
      default:
        return null;
    }
  };

  // Renders the correct table based on the active tab
  const renderTabContent = () => {
    let data, headers;
    
    switch (activeTab) {
      case 'checklists':
        data = checklists;
        headers = ['ID', 'Name', 'Status', 'Actions'];
        break;
      case 'rfi':
        data = rfis;
        headers = ['ID', 'Subject', 'Date', 'Status', 'Actions'];
        break;
      case 'mir':
        data = mirs;
        headers = ['ID', 'Material', 'Date', 'Status', 'Actions'];
        break;
      case 'testing':
        data = testingLogs;
        headers = ['ID', 'Test Name', 'Date', 'Result', 'Actions'];
        break;
      default:
        return null;
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map(header => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="px-6 py-4 text-center text-gray-500">No data found.</td>
              </tr>
            ) : (
              data.map(item => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.name || item.subject || item.material || item.testName}</td>
                  {activeTab !== 'checklists' && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.date}</td>}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(item.status || item.result)}`}>
                      {item.status || item.result}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-4">
                    <button onClick={() => handleViewClick(item)} className="text-blue-600 hover:text-blue-800">View</button>
                    <button onClick={() => handleDeleteClick(item.id)} className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">3. Inspection, RFI, MIR & Testing Logs</h2>
        <button onClick={handleGenerateReport} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
          Generate Report
        </button>
      </div>

      {/* Tabs */}
      <div>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none
                `}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* "Add New" Button */}
        <div className="mt-6 mb-4 text-right">
          <button
            onClick={handleOpenFormModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add New {tabs.find(t => t.id === activeTab).name}
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {renderTabContent()}
        </div>
      </div>

      {/* --- Modals --- */}

      {/* 1. Add New Item Form Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New {tabs.find(t => t.id === activeTab).name}</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {renderFormFields()}
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setIsFormModalOpen(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. View Details / Update Status Modal */}
      {isViewModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Details: {selectedItem.id}</h3>
            <div className="space-y-4">
              {renderViewDetails()}
              
              {/* Update Status Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Update Status</label>
                <select
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {statusOptions[activeTab].map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end pt-6 space-x-3">
              <button type="button" onClick={() => setIsViewModalOpen(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
              <button type="button" onClick={handleUpdateStatus} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Update Status</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Generate Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl h-3/4">
            <h3 className="text-xl font-semibold mb-4">Generated Report</h3>
            <div className="overflow-y-auto h-full max-h-[60vh] bg-gray-100 p-4 rounded border border-gray-300">
              <pre className="text-sm whitespace-pre-wrap">{reportData}</pre>
            </div>
            <div className="flex justify-end pt-6">
              <button type="button" onClick={() => setIsReportModalOpen(false)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default InspectionTrackingReports;