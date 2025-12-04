// import React, { useState } from 'react'; // Removed useEffect
// import { FaUsers, FaTasks } from 'react-icons/fa';

// // Removed LoadingSpinner import
// import AddMemberModal from './AddMemberModal';
// import AddTaskModal from './AddTaskModal';
// import MemberList from './MemberList';
// import TaskList from './TaskList';

// // Mock Data Functions
// const getMockMembers = () => ({
//   1: [
//     { id: 101, name: 'John Doe', role: 'Team Lead', email: 'john@example.com' },
//     { id: 102, name: 'Jane Smith', role: 'Surveyor', email: 'jane@example.com' },
//   ],
//   2: [ { id: 103, name: 'Robert Brown', role: 'Structural Engineer', email: 'rob@example.com' } ],
//   3: [
//     { id: 104, name: 'Emily White', role: 'QA Manager', email: 'emily@example.com' },
//     { id: 105, name: 'Michael Lee', role: 'QA Inspector', email: 'mike@example.com' },
//   ],
// });

// const getMockTasks = () => ({
//   1: [
//     { id: 201, name: 'Initial Site Survey', assignedTo: 'Jane Smith', status: 'In Progress', dueDate: '2025-11-15' },
//     { id: 202, name: 'Review Survey Data', assignedTo: 'John Doe', status: 'Pending', dueDate: '2025-11-18' },
//   ],
//   2: [ { id: 203, name: 'Calculate Load Bearings', assignedTo: 'Robert Brown', status: 'Completed', dueDate: '2025-11-01' } ],
//   3: [ { id: 204, name: 'Pre-pour Inspection', assignedTo: 'Michael Lee', status: 'In Progress', dueDate: '2025-11-10' } ],
// });


// const TeamDetails = ({ team }) => {
//   // --- STATE IS INITIALIZED WITH MOCK DATA DIRECTLY ---
//   const [teamMembers, setTeamMembers] = useState(getMockMembers()[team.id] || []);
//   const [teamTasks, setTeamTasks] = useState(getMockTasks()[team.id] || []);
  
//   const [currentTab, setCurrentTab] = useState('members');
//   const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
//   const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

//   // --- useEffect and isLoadingDetails state are REMOVED ---

//   // --- Member Handlers ---
//   const handleAddNewMember = (newMemberData) => {
//     const newMember = { id: Date.now(), ...newMemberData };
//     console.log('New Member:', newMember);
//     setTeamMembers([...teamMembers, newMember]);
//     setIsAddMemberModalOpen(false);
//   };

//   const handleDeleteMember = (memberId) => {
//     if (window.confirm("Are you sure you want to delete this member?")) {
//       console.log('Deleting member:', memberId);
//       setTeamMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
//     }
//   };

//   // --- Task Handlers ---
//   const handleAddNewTask = (newTaskData) => {
//     const assignedMember = teamMembers.find(m => m.id.toString() === newTaskData.assignedTo);
//     const newTask = {
//       id: Date.now(),
//       name: newTaskData.name,
//       assignedTo: assignedMember ? assignedMember.name : 'Unassigned',
//       status: newTaskData.status,
//       dueDate: newTaskData.dueDate,
//     };
//     console.log('New Task:', newTask);
//     setTeamTasks([...teamTasks, newTask]);
//     setIsAddTaskModalOpen(false);
//   };

//   const handleDeleteTask = (taskId) => {
//     if (window.confirm("Are you sure you want to delete this task?")) {
//       console.log('Deleting task:', taskId);
//       setTeamTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
//     }
//   };

//   // --- isLoading check is REMOVED ---

//   return (
//     <>
//       <div className="bg-white border border-gray-200 rounded-lg shadow-md min-h-[500px]">
//         {/* Team Name Header */}
//         <div className="p-4 border-b border-gray-200">
//           <h2 className="text-2xl font-semibold text-gray-800">{team.name}</h2>
//           <span className="text-gray-600">{team.project}</span>
//         </div>
        
//         {/* Tabs */}
//         <nav className="flex border-b border-gray-200">
//           <button 
//             className={`flex items-center gap-2 py-3 px-5 ${currentTab === 'members' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
//             onClick={() => setCurrentTab('members')}
//           >
//             <FaUsers /> Members
//           </button>
//           <button 
//             className={`flex items-center gap-2 py-3 px-5 ${currentTab === 'tasks' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
//             onClick={() => setCurrentTab('tasks')}
//           >
//             <FaTasks /> Tasks
//           </button>
//         </nav>

//         {/* Tab Panels */}
//         <div className="p-4">
//           {currentTab === 'members' && (
//             <MemberList 
//               members={teamMembers}
//               onAddMember={() => setIsAddMemberModalOpen(true)}
//               onDeleteMember={handleDeleteMember}
//             />
//           )}
//           {currentTab === 'tasks' && (
//             <TaskList 
//               tasks={teamTasks}
//               onAddTask={() => setIsAddTaskModalOpen(true)}
//               onDeleteTask={handleDeleteTask}
//             />
//           )}
//         </div>
//       </div>

//       <AddMemberModal 
//         isOpen={isAddMemberModalOpen}
//         onClose={() => setIsAddMemberModalOpen(false)}
//         onSave={handleAddNewMember}
//         teamName={team.name}
//       />
//       <AddTaskModal
//         isOpen={isAddTaskModalOpen}
//         onClose={() => setIsAddTaskModalOpen(false)}
//         onSave={handleAddNewTask}
//         teamName={team.name}
//         teamMembers={teamMembers}
//       />
//     </>
//   );
// };

// export default TeamDetails;



import React, { useState } from 'react';
// Add FaTrash icon
import { FaUsers, FaTasks, FaTrash } from 'react-icons/fa';

import AddMemberModal from './AddMemberModal';
import AddTaskModal from './AddTaskModal';
import MemberList from './MemberList';
import TaskList from './TaskList';

// Mock Data Functions
const getMockMembers = () => ({
  1: [
    { id: 101, name: 'John Doe', role: 'Team Lead', email: 'john@example.com' },
    { id: 102, name: 'Jane Smith', role: 'Surveyor', email: 'jane@example.com' },
  ],
  2: [ { id: 103, name: 'Robert Brown', role: 'Structural Engineer', email: 'rob@example.com' } ],
  3: [
    { id: 104, name: 'Emily White', role: 'QA Manager', email: 'emily@example.com' },
    { id: 105, name: 'Michael Lee', role: 'QA Inspector', email: 'mike@example.com' },
  ],
});

const getMockTasks = () => ({
  1: [
    { id: 201, name: 'Initial Site Survey', assignedTo: 'Jane Smith', status: 'In Progress', dueDate: '2025-11-15' },
    { id: 202, name: 'Review Survey Data', assignedTo: 'John Doe', status: 'Pending', dueDate: '2025-11-18' },
  ],
  2: [ { id: 203, name: 'Calculate Load Bearings', assignedTo: 'Robert Brown', status: 'Completed', dueDate: '2025-11-01' } ],
  3: [ { id: 204, name: 'Pre-pour Inspection', assignedTo: 'Michael Lee', status: 'In Progress', dueDate: '2025-11-10' } ],
});


// --- Add onDeleteTeam to the props list ---
const TeamDetails = ({ team, onDeleteTeam }) => {
  const [teamMembers, setTeamMembers] = useState(getMockMembers()[team.id] || []);
  const [teamTasks, setTeamTasks] = useState(getMockTasks()[team.id] || []);
  
  const [currentTab, setCurrentTab] = useState('members');
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  // --- Member Handlers ---
  const handleAddNewMember = (newMemberData) => {
    const newMember = { id: Date.now(), ...newMemberData };
    console.log('New Member:', newMember);
    setTeamMembers([...teamMembers, newMember]);
    setIsAddMemberModalOpen(false);
  };

  const handleDeleteMember = (memberId) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      console.log('Deleting member:', memberId);
      setTeamMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
    }
  };

  // --- Task Handlers ---
  const handleAddNewTask = (newTaskData) => {
    const assignedMember = teamMembers.find(m => m.id.toString() === newTaskData.assignedTo);
    const newTask = {
      id: Date.now(),
      name: newTaskData.name,
      assignedTo: assignedMember ? assignedMember.name : 'Unassigned',
      status: newTaskData.status,
      dueDate: newTaskData.dueDate,
    };
    console.log('New Task:', newTask);
    setTeamTasks([...teamTasks, newTask]);
    setIsAddTaskModalOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      console.log('Deleting task:', taskId);
      setTeamTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg shadow-md min-h-[500px]">
        
        {/* --- MODIFIED TEAM HEADER --- */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{team.name}</h2>
            <span className="text-gray-600">{team.project}</span>
          </div>
          
          {/* --- NEW DELETE BUTTON --- */}
          <button 
            className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-100 transition-colors"
            title="Delete Team"
            onClick={() => onDeleteTeam(team.id)} // Pass the team ID up
          >
            <FaTrash className="text-lg" />
          </button>
        </div>
        
        {/* Tabs */}
        <nav className="flex border-b border-gray-200">
          <button 
            className={`flex items-center gap-2 py-3 px-5 ${currentTab === 'members' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setCurrentTab('members')}
          >
            <FaUsers /> Members
          </button>
          <button 
            className={`flex items-center gap-2 py-3 px-5 ${currentTab === 'tasks' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setCurrentTab('tasks')}
          >
            <FaTasks /> Tasks
          </button>
        </nav>

        {/* Tab Panels */}
        <div className="p-4">
          {currentTab === 'members' && (
            <MemberList 
              members={teamMembers}
              onAddMember={() => setIsAddMemberModalOpen(true)}
              onDeleteMember={handleDeleteMember}
            />
          )}
          {currentTab === 'tasks' && (
            <TaskList 
              tasks={teamTasks}
              onAddTask={() => setIsAddTaskModalOpen(true)}
              onDeleteTask={handleDeleteTask}
            />
          )}
        </div>
      </div>

      <AddMemberModal 
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onSave={handleAddNewMember}
        teamName={team.name}
      />
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onSave={handleAddNewTask}
        teamName={team.name}
        teamMembers={teamMembers}
      />
    </>
  );
};

export default TeamDetails;