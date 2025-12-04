import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const MemberList = ({ members, onAddMember, onDeleteMember }) => {
  return (
    <div>
      <button 
        className="bg-gray-200 text-gray-800 text-sm py-1 px-3 rounded-md hover:bg-gray-300 mb-4 flex items-center gap-2"
        onClick={onAddMember}
      >
        <FaPlus />
        Add Member
      </button>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          {/* ... table head ... */}
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="p-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600">Role</th>
              <th className="p-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="p-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members?.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-200 text-sm">{member.name}</td>
                <td className="p-3 border-b border-gray-200 text-sm">{member.role}</td>
                <td className="p-3 border-b border-gray-200 text-sm">{member.email}</td>
                <td className="p-3 border-b border-gray-200 text-sm">
                  <button 
                    onClick={() => onDeleteMember(member.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Member"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberList;