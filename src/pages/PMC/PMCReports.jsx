import React, { useState, useMemo } from 'react';
import ReportHeader from './PMCReports/ReportHeader';
import ReportFilter from './PMCReports/ReportFilter';
import ReportTable from './PMCReports/ReportTable';
import GenerateReportModal from './PMCReports/GenerateReportModal';
import ViewReportModal from './PMCReports/ViewReportModal';
import EditReportModal from './PMCReports/EditReportModal';

// Dummy data.
const initialReports = [
  { id: 1, name: 'Q1 Budget Summary', type: 'Budget Overview', date: '2025-03-31', status: 'Completed', description: 'Detailed budget breakdown for Q1.' },
  { id: 2, name: 'Project Alpha Progress', type: 'Project Progress', date: '2025-04-15', status: 'In Progress', description: 'Weekly progress on Project Alpha, 45% complete.' },
  { id: 3, name: 'Team A Performance', type: 'Team Performance', date: '2025-03-20', status: 'Completed', description: 'Performance metrics for Team A.' },
  { id: 4, name: 'Q2 Budget Forecast', type: 'Budget Overview', date: '2025-06-30', status: 'Pending', description: 'Forecasted budget for Q2 operations.' },
  { id: 5, name: 'Safety Audit Report', type: 'Project Progress', date: '2025-05-01', status: 'Completed', description: 'Monthly safety audit results.' },
];

const PMCReports = () => {
  const [reports, setReports] = useState(initialReports);
  
  // State for the main page filters
  const [filters, setFilters] = useState({
    reportType: 'all',
    startDate: '',
    endDate: '',
  });

  // State for modals
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // State for which report is being viewed/edited
  const [viewingReport, setViewingReport] = useState(null);
  const [editingReport, setEditingReport] = useState(null);

  // Filter change handler
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // --- CRUD Operations ---

  // CREATE (from Generate Modal)
  const handleGenerateReport = (newReportData) => {
    const newReport = {
      ...newReportData,
      id: Date.now(),
      status: 'Pending',
    };
    setReports(prevReports => [newReport, ...prevReports]);
    setIsGenerateModalOpen(false); // Close the modal
  };

  // UPDATE (from Edit Modal)
  const handleSaveEditReport = (updatedReportData) => {
    setReports(prevReports =>
      prevReports.map(report =>
        report.id === editingReport.id
          ? { ...report, ...updatedReportData }
          : report
      )
    );
    setIsEditModalOpen(false);
    setEditingReport(null);
  };

  // DELETE
  const handleDeleteReport = (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setReports(prevReports => prevReports.filter(report => report.id !== id));
    }
  };
  
  // --- Modal Open/Close Handlers ---
  
  const handleOpenUpload = () => {
    // This would typically trigger a file input
    alert('Upload functionality would be triggered here!');
  };

  const handleOpenViewModal = (report) => {
    setViewingReport(report);
    setIsViewModalOpen(true);
  };

  const handleOpenEditModal = (report) => {
    setEditingReport(report);
    setIsEditModalOpen(true);
  };

  // Memoized function to filter reports
  const filteredReports = useMemo(() => {
    // ... (filtering logic remains the same)
    return reports.filter(report => {
      const { reportType, startDate, endDate } = filters;
      if (reportType !== 'all' && report.type !== reportType) return false;
      if (startDate && new Date(report.date) < new Date(startDate)) return false;
      if (endDate && new Date(report.date) > new Date(endDate)) return false;
      return true;
    });
  }, [reports, filters]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ReportHeader 
        onGenerateReport={() => setIsGenerateModalOpen(true)}
        onUploadReport={handleOpenUpload}
      />
      
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <ReportFilter 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
        
        <ReportTable 
          reports={filteredReports}
          onView={handleOpenViewModal}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteReport}
        />
      </div>

      {/* Modals */}
      <GenerateReportModal 
        isOpen={isGenerateModalOpen} 
        onClose={() => setIsGenerateModalOpen(false)} 
        onGenerate={handleGenerateReport} 
      />
      
      <ViewReportModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        report={viewingReport}
      />
      
      <EditReportModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingReport(null);
        }}
        onSave={handleSaveEditReport}
        report={editingReport}
      />
    </div>
  );
};

export default PMCReports;