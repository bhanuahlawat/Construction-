import React from 'react';

const BidComparisonTable = ({ data, isSubcontractorView = false }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No bid comparison data available.</p>;
  }

  const getColumns = () => {
    if (isSubcontractorView) {
      // For when you are comparing bids from multiple subcontractors for YOUR tender
      const bidsCols = Object.keys(data[0]).filter(key => key.startsWith('bid') && key !== 'lowestBid');
      return [
        { key: 'tender', label: 'Tender' },
        ...bidsCols.map((key, index) => ({ key, label: `Bid ${index + 1}` })),
        { key: 'lowestBid', label: 'Lowest Bid' },
      ];
    } else {
      // For when a Vendor is comparing their bid to others
      return [
        { key: 'tender', label: 'Tender' },
        { key: 'yourBid', label: 'Your Bid' },
        { key: 'avgBid', label: 'Avg. Bid' },
        { key: 'status', label: 'Status' },
      ];
    }
  };

  const columns = getColumns();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {col.key === 'yourBid' || col.key.startsWith('bid') || col.key === 'avgBid' || col.key === 'lowestBid'
                    ? (row[col.key] ? `$${row[col.key].toLocaleString()}` : '-')
                    : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BidComparisonTable;