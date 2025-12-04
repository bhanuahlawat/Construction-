// src/Pages/Admin/QualityControlPage.jsx

import React from 'react';
import QualityAuditsCompliance from './QualityControl/QualityAuditsCompliance';
import CorrectiveActionPlans from './QualityControl/CorrectiveActionPlans';
import InspectionTrackingReports from './QualityControl/InspectionTrackingReports';
import DefectTrackingRectification from './QualityControl/DefectTrackingRectification';
import StandardsRegulatoryTracking from './QualityControl/StandardsRegulatoryTracking';

const QualityControlPage = () => {
  return (
    // Use Tailwind for page padding and spacing between components
    <div className="p-6 space-y-6">
      
      {/* Page Header */}
      <h1 className="text-3xl font-semibold text-gray-800">Quality Control & Assurance</h1>
      
      {/* The 'space-y-6' class automatically adds margin 
        between each of these component sections.
      */}
      
      <QualityAuditsCompliance />
      <CorrectiveActionPlans />
      <InspectionTrackingReports />
      <DefectTrackingRectification />
      <StandardsRegulatoryTracking />

    </div>
  );
};

export default QualityControlPage;