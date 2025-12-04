import React from 'react';

const CollaborationAndWorkflow = ({ navigate }) => (
  <div className="space-y-8">
    <h3 className="text-xl font-bold text-gray-800 border-b-2 border-indigo-200 pb-2">Team & Communication</h3>

    {/* Email Sync Status */}
    <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-green-500">
      <p className="font-semibold text-green-700 text-lg mb-3">Email Sync Status</p>
      <div className="flex justify-between items-center text-sm">
        <p className="text-gray-700">Protocol integration with external email providers.</p>
        <span className="bg-green-600 text-white px-4 py-1 rounded-full font-bold shadow-md">
          Connected and Syncing
        </span>
      </div>
    </div>

    {/* Document and Agenda Sharing */}
    <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-yellow-500">
      <p className="font-semibold text-yellow-700 text-lg mb-3">Shared Documents & Agendas</p>
      <p className="text-sm text-gray-700 mb-4">
        Share task details and meeting agendas with the team within the ERP.
      </p>
      <button className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-md transition">
        Share New Agenda/Document
      </button>
    </div>

    {/* Task Assignments - Link to existing component */}
    <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-purple-500">
      <p className="font-semibold text-purple-700 text-lg mb-3">Task Assignments</p>
      <p className="text-sm text-gray-700 mb-4">
        Delegate work to team members and manage their project workflow.
      </p>
      <button
        onClick={() => navigate('/admin/userassignment')}
        className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-md transition"
      >
        Go to User Assignment Dashboard
      </button>
    </div>
  </div>
);

export default CollaborationAndWorkflow;