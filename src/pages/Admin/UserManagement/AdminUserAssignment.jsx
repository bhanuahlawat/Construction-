import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaHammer, FaUserTag } from "react-icons/fa";

import AddUserModal from "./AddUserModal";
import TeamRoster from "./TeamRoster";
import AssignmentPanel from "./AssignmentPanel";
import ManagementPanel from "./ManagementPanel";
import PermissionsPanel from "./PermissionsPanel"; // NEW PANEL

// ===============================================
// PERMISSIONS LIST (Inside same file as requested)
// ===============================================
const PERMISSIONS = {
  DASHBOARD: "dashboard",
  PROJECT_MANAGEMENT: "project_management",
  USER_MANAGEMENT: "user_management",
  SALES_BILLING: "sales_billing",
  PURCHASE_MANAGEMENT: "purchase_management",
  INVENTORY: "inventory",
  BIDDING: "bidding",
  CONTRACT_MANAGEMENT: "contract_management",
  EQUIPMENT: "equipment",
  DOCUMENTS: "documents",
  HR_PAYROLL: "hr_payroll",
  HEALTH_SAFETY: "health_safety",
  CLIENT_VENDOR: "client_vendor",
  QUALITY_CONTROL: "quality_control",
  FINANCE_REPORTS: "finance_reports",
  CRM: "crm",
};

// ===============================================
// ROLES & STATUS
// ===============================================
const ROLES = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  SUPERVISOR: "Supervisor",
  WORKER: "Worker",
};

const STATUSES = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  SUSPENDED: "Suspended",
};

// ===============================================
// MOCK DATA
// ===============================================
const initialTeam = [
  {
    id: 1,
    name: "Admin User",
    role: ROLES.ADMIN,
    status: STATUSES.ACTIVE,
    email: "admin@site.com",
    permissions: Object.values(PERMISSIONS), // full access
  },
  {
    id: 2,
    name: "Jane Doe",
    role: ROLES.MANAGER,
    status: STATUSES.ACTIVE,
    email: "jane.doe@site.com",
    permissions: [PERMISSIONS.PROJECT_MANAGEMENT, PERMISSIONS.INVENTORY],
  },
  {
    id: 3,
    name: "Bob Builder",
    role: ROLES.WORKER,
    status: STATUSES.INACTIVE,
    email: "bob.b@site.com",
    permissions: [PERMISSIONS.DASHBOARD],
  },
  {
    id: 4,
    name: "Chris Control",
    role: ROLES.SUPERVISOR,
    status: STATUSES.ACTIVE,
    email: "chris@site.com",
    permissions: [PERMISSIONS.QUALITY_CONTROL, PERMISSIONS.DOCUMENTS],
  },
  // Added more users to test scrolling and search responsiveness
  { id: 5, name: "Alice Arch", role: ROLES.WORKER, status: STATUSES.ACTIVE, email: "alice@site.com", permissions: [] },
  { id: 6, name: "Tom Tester", role: ROLES.WORKER, status: STATUSES.SUSPENDED, email: "tom@site.com", permissions: [] },
];

const mockTasks = [
  { id: "T-101", name: "Approve Concrete Mix Design", type: "Milestone" },
  { id: "T-102", name: "Review RA Bill", type: "Billing" },
  { id: "T-103", name: "Inspect Foundation Work", type: "Inspection" },
];

// ===============================================
// MAIN COMPONENT (Responsive changes applied)
// ===============================================
const UserAssignment = () => {
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState(initialTeam[0]); // Select first user by default for better UX
  const [assignment, setAssignment] = useState({
    taskId: "",
    dueDate: new Date().toISOString().slice(0, 10),
  });
  const [team, setTeam] = useState(initialTeam);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const currentUserRole = ROLES.ADMIN; // mock login
  const canManageUsers = currentUserRole === ROLES.ADMIN || currentUserRole === ROLES.MANAGER;

  // ===============================================
  // FILTER TEAM
  // ===============================================
  const filteredTeam = useMemo(() => {
    if (!searchTerm) return team;

    const lower = searchTerm.toLowerCase();
    return team.filter(
      (u) =>
        u.name.toLowerCase().includes(lower) ||
        u.role.toLowerCase().includes(lower)
    );
  }, [team, searchTerm]);

  // ===============================================
  // ACTION HANDLERS
  // ===============================================
  const handleAddUser = (newUser) => {
    setTeam((prev) => [newUser, ...prev]);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;

    if (window.confirm(`Delete ${selectedUser.name}?`)) {
      setTeam((prev) => prev.filter((u) => u.id !== selectedUser.id));
      setSelectedUser(null);
    }
  };

  const handleUpdateUserStatus = (newStatus) => {
    const updatedTeam = team.map((u) =>
        u.id === selectedUser.id ? { ...u, status: newStatus } : u
    );
    setTeam(updatedTeam);
    setSelectedUser((prev) => ({ ...prev, status: newStatus }));
  };

  const handleUpdateUserRole = (newRole) => {
    const updatedTeam = team.map((u) =>
        u.id === selectedUser.id ? { ...u, role: newRole } : u
    );
    setTeam(updatedTeam);
    setSelectedUser((prev) => ({ ...prev, role: newRole }));
  };

  const handleUpdatePermissions = (newPermissions) => {
    const updatedTeam = team.map((u) =>
        u.id === selectedUser.id ? { ...u, permissions: newPermissions } : u
    );
    setTeam(updatedTeam);
    setSelectedUser((prev) => ({ ...prev, permissions: newPermissions }));
  };

  const handleAssignTask = (e) => {
    e.preventDefault();
    console.log("Assigning:", assignment);
    alert(`Assigned task ${assignment.taskId} to ${selectedUser.name}.`);
  };
  
  // Adjusted status color logic for better contrast/readability
  const getStatusColor = (st) => {
    switch (st) {
      case STATUSES.ACTIVE:
        return "bg-green-100 text-green-700";
      case STATUSES.INACTIVE:
        return "bg-yellow-100 text-yellow-700";
      case STATUSES.SUSPENDED:
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };


  // ===============================================
  // RENDER UI
  // ===============================================
  return (
    // Responsive: Added responsive padding (p-4) and clearer background (bg-gray-100)
    <div className="space-y-6 p-4 md:p-6 bg-gray-100 min-h-screen">

      {/* MODAL (assuming AddUserModal handles its own responsiveness) */}
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddUser={handleAddUser}
        ROLES={ROLES}
        STATUSES={STATUSES}
        PERMISSIONS={PERMISSIONS}
      />

      {/* HEADER: Enhanced appearance and better mobile stacking */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white shadow-lg rounded-xl">
        <h1 className="text-xl md:text-2xl font-extrabold flex items-center gap-2 mb-3 md:mb-0 text-gray-800">
          <FaHammer className="text-teal-600" /> User Management
        </h1>

        <div className="flex gap-3 w-full md:w-auto">
          {/* Delete Button - Using outline style for secondary action */}
          <button
            onClick={handleDeleteUser}
            disabled={!selectedUser}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-xl hover:bg-red-50 disabled:opacity-50 transition duration-150 text-sm"
          >
            <FaTrash /> Delete
          </button>

          {/* Add User Button - Primary action */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-700 transition duration-150 shadow-md text-sm"
          >
            <FaPlus /> Add User
          </button>
        </div>
      </div>

      {/* MAIN GRID: Mobile stack (col-span-1) -> Desktop 3-column (lg:grid-cols-3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT SIDE LIST: Team Roster */}
        <div className="lg:order-1 order-2"> {/* Moved Roster below Panels on Mobile for focus */}
          <TeamRoster
            team={team}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedUser={selectedUser}
            handleUserSelect={setSelectedUser}
            filteredTeam={filteredTeam}
            STATUSES={STATUSES}
            // Passing the updated color logic
            getStatusColor={getStatusColor}
          />
        </div>

        {/* RIGHT SIDE PANELS */}
        <div className="lg:col-span-2 lg:order-2 order-1 space-y-6">
          {selectedUser ? (
            <>
              {/* Selected User Summary (Added for better context) */}
              <div className="bg-white p-4 rounded-xl shadow-lg border-l-4 border-teal-600">
                  <h2 className="text-xl font-semibold text-gray-800">
                      Managing: {selectedUser.name} 
                      <span className="ml-3 text-sm font-medium text-teal-700 bg-teal-100 px-3 py-1 rounded-full border border-teal-300">
                          {selectedUser.role}
                      </span>
                  </h2>
              </div>
              
              {/* MANAGEMENT */}
              {canManageUsers && (
                <ManagementPanel
                  selectedUser={selectedUser}
                  handleUpdateUserStatus={handleUpdateUserStatus}
                  handleUpdateUserRole={handleUpdateUserRole}
                  ROLES={ROLES}
                  STATUSES={STATUSES}
                />
              )}

              {/* NEW PERMISSIONS PANEL */}
              {canManageUsers && (
                <PermissionsPanel
                  selectedUser={selectedUser}
                  PERMISSIONS={PERMISSIONS}
                  handleUpdatePermissions={handleUpdatePermissions}
                />
              )}

              {/* TASK ASSIGN */}
              <AssignmentPanel
                selectedUser={selectedUser}
                assignment={assignment}
                setAssignment={setAssignment}
                handleAssignTask={handleAssignTask}
                mockTasks={mockTasks}
              />
            </>
          ) : (
            <div className="p-8 bg-white rounded-2xl border border-dashed border-gray-300 shadow-inner min-h-[200px] flex flex-col items-center justify-center">
              <FaUserTag size={40} className="text-teal-600 mx-auto mb-3 opacity-60" />
              <p className="text-center text-gray-600 font-medium">
                Select a user from the **Team Roster** to manage details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAssignment;