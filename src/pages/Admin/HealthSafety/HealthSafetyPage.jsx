// src/Pages/Admin/HealthSafety/HealthSafetyPage.jsx
import React, { useState } from 'react';
import SafetyInspectionTracking from './components/SafetyInspectionTracking';
import IncidentReportingManagement from './components/IncidentReportingManagement';
import ComplianceSafetyTraining from './components/ComplianceSafetyTraining';
import RiskAssessmentManagement from './components/RiskAssessmentManagement';
import InsuranceLegalDocumentation from './components/InsuranceLegalDocumentation'; // Renamed to match the point

const HealthSafetyPage = () => {
  const [activeTab, setActiveTab] = useState('safety-inspections'); // Default active tab

  const tabs = [
    { id: 'safety-inspections', label: 'Safety Inspection Tracking', component: <SafetyInspectionTracking /> },
    { id: 'incident-reporting', label: 'Incident Reporting & Management', component: <IncidentReportingManagement /> },
    { id: 'compliance-training', label: 'Compliance Audits & Safety Training', component: <ComplianceSafetyTraining /> },
    { id: 'risk-management', label: 'Risk Assessments, Mgmt & Mitigation', component: <RiskAssessmentManagement /> },
    { id: 'insurance-legal', label: 'Insurance & Legal Documentation', component: <InsuranceLegalDocumentation /> },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Health, Safety, and Environment (HSE) Management</h1>

      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
          {tabs.map((tab) => (
            <li key={tab.id} className="mr-2">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg 
                  ${activeTab === tab.id 
                    ? 'text-blue-600 border-blue-600 bg-white' 
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                  } transition-colors duration-200 ease-in-out`}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="tab-content bg-white p-6 rounded-lg shadow-md">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            hidden={activeTab !== tab.id}
            id={`tabpanel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
          >
            {activeTab === tab.id && tab.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthSafetyPage;