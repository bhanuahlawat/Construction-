import { FaEdit, FaTrash } from 'react-icons/fa';

function WorkorderTable({ workorders, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcontractor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Hours</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {workorders.length > 0 ? (
            workorders.map((workorder) => (
              <tr key={workorder.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{workorder.description}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{workorder.subcontractor}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    workorder.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    workorder.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800' // Completed
                  }`}>
                    {workorder.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{workorder.hours}</td>
                <td className="px-6 py-4 text-right text-sm font-medium space-x-4">
                  <button onClick={() => onEdit(workorder)} className="text-blue-600 hover:text-blue-900"><FaEdit /></button>
                  <button onClick={() => onDelete(workorder.id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No workorders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default WorkorderTable;