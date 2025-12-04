import React from "react";
import { FaKey } from "react-icons/fa";

const PermissionsPanel = ({ selectedUser, PERMISSIONS, handleUpdatePermissions }) => {
  
  const togglePermission = (perm) => {
    const hasPerm = selectedUser.permissions?.includes(perm);

    const newPerms = hasPerm
      ? selectedUser.permissions.filter((p) => p !== perm)
      : [...selectedUser.permissions, perm];

    handleUpdatePermissions(newPerms);
  };

  return (
    <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl shadow">
      <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
        <FaKey className="text-blue-700" /> Permissions
      </h3>

      <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto">
        {Object.entries(PERMISSIONS).map(([k, v]) => (
          <label key={k} className="flex items-center gap-2 text-sm text-blue-900">
            <input
              type="checkbox"
              checked={selectedUser.permissions?.includes(v)}
              onChange={() => togglePermission(v)}
            />
            {v.replace(/_/g, " ").toUpperCase()}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PermissionsPanel;
