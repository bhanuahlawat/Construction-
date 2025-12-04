import React from 'react';

// Receive 'filters' (the current state) and 'onFilterChange' (the update function)
const ReportFilter = ({ filters, onFilterChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
        <select
          id="reportType"
          name="reportType" // 'name' attribute must match the state key
          value={filters.reportType} // Controlled value
          onChange={onFilterChange} // Controlled onChange
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="all">All Types</option>
          <option value="Budget Overview">Budget Overview</option>
          <option value="Project Progress">Project Progress</option>
          <option value="Team Performance">Team Performance</option>
        </select>
      </div>

      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate" // 'name' attribute
          value={filters.startDate} // Controlled value
          onChange={onFilterChange} // Controlled onChange
          className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        />
      </div>

      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate" // 'name' attribute
          value={filters.endDate} // Controlled value
          onChange={onFilterChange} // Controlled onChange
          className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        />
      </div>
    </div>
  );
};

export default ReportFilter;