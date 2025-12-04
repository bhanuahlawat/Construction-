import { FaEdit, FaTrash } from 'react-icons/fa';

function ChangeOrderTable({ changeOrders, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {changeOrders.length > 0 ? (
            changeOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{order.project}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800' // Rejected
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">${order.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-sm font-medium space-x-4">
                  <button onClick={() => onEdit(order)} className="text-blue-600 hover:text-blue-900"><FaEdit /></button>
                  <button onClick={() => onDelete(order.id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No change orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default ChangeOrderTable;