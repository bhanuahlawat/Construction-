import { FaEdit, FaTrash } from 'react-icons/fa';

function ContractTable({ contracts, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {contracts.length > 0 ? (
            contracts.map((contract) => (
              <tr key={contract.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{contract.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{contract.vendor}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    contract.status === 'Active' ? 'bg-green-100 text-green-800' :
                    contract.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {contract.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">${contract.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-sm font-medium space-x-4">
                  <button onClick={() => onEdit(contract)} className="text-blue-600 hover:text-blue-900">
                    <FaEdit />
                  </button>
                  <button onClick={() => onDelete(contract.id)} className="text-red-600 hover:text-red-900">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                No contracts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default ContractTable;