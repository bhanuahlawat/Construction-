// import React, { useState } from 'react'; // Removed useEffect
// import { FaPlus } from 'react-icons/fa';

// import TeamList from './PMCTeams/TeamList';
// import TeamDetails from './PMCTeams/TeamDetails';
// import AddTeamModal from './PMCTeams/AddTeamModal';
// // Removed LoadingSpinner import, we don't need it

// // Mock Data
// const mockTeams = [
//   { id: 1, name: 'Project Alpha - Surveyors', project: 'Project Alpha' },
//   { id: 2, name: 'Project Beta - Structural', project: 'Project Beta' },
//   { id: 3, name: 'On-Site QA Team', project: 'Project Alpha' },
// ];

// const PMCTeams = () => {
//   // --- STATE IS INITIALIZED WITH MOCK DATA DIRECTLY ---
//   const [teams, setTeams] = useState(mockTeams);
//   const [selectedTeam, setSelectedTeam] = useState(mockTeams[0]); // Select the first team
//   const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);

//   // --- useEffect and isLoading state are REMOVED ---

//   const handleSelectTeam = (team) => {
//     setSelectedTeam(team);
//   };

//   const handleAddNewTeam = (newTeamData) => {
//     const newTeam = {
//       id: Date.now(),
//       name: newTeamData.name,
//       project: newTeamData.project,
//     };
    
//     console.log('New Team:', newTeam);
//     setTeams([...teams, newTeam]);
//     setIsAddTeamModalOpen(false);
//   };

//   // --- isLoading check is REMOVED ---

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <header className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">PMC Team Management</h1>
//         <button 
//           className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center gap-2"
//           onClick={() => setIsAddTeamModalOpen(true)}
//         >
//           <FaPlus />
//           Add New Team
//         </button>
//       </header>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
//         <div className="md:col-span-1">
//           <TeamList 
//             teams={teams}
//             selectedTeamId={selectedTeam?.id}
//             onSelectTeam={handleSelectTeam}
//           />
//         </div>

//         <div className="md:col-span-2">
//           {!selectedTeam ? (
//             <div className="bg-white border border-gray-200 rounded-lg shadow-md min-h-[500px] flex items-center justify-center">
//               <p className="p-8 text-center text-gray-500">Please select a team to see details.</p>
//             </div>
//           ) : (
//             <TeamDetails key={selectedTeam.id} team={selectedTeam} />
//           )}
//         </div>
//       </div>

//       <AddTeamModal 
//         isOpen={isAddTeamModalOpen}
//         onClose={() => setIsAddTeamModalOpen(false)}
//         onSave={handleAddNewTeam}
//       />
//     </div>
//   );
// };

// export default PMCTeams;


import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import TeamList from './PMCTeams/TeamList';
import TeamDetails from './PMCTeams/TeamDetails';
import AddTeamModal from './PMCTeams/AddTeamModal';

// Mock Data
const mockTeams = [
  { id: 1, name: 'Project Alpha - Surveyors', project: 'Project Alpha' },
  { id: 2, name: 'Project Beta - Structural', project: 'Project Beta' },
  { id: 3, name: 'On-Site QA Team', project: 'Project Alpha' },
];

const PMCTeams = () => {
  const [teams, setTeams] = useState(mockTeams);
  const [selectedTeam, setSelectedTeam] = useState(mockTeams[0]);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
  };

  const handleAddNewTeam = (newTeamData) => {
    const newTeam = {
      id: Date.now(),
      name: newTeamData.name,
      project: newTeamData.project,
    };
    
    console.log('New Team:', newTeam);
    setTeams([...teams, newTeam]);
    setIsAddTeamModalOpen(false); // Also close modal on save
  };

  // --- DELETE TEAM HANDLER ---
  const handleDeleteTeam = (teamIdToDelete) => {
    if (window.confirm("Are you sure you want to delete this entire team?")) {
      const newTeamsList = teams.filter(team => team.id !== teamIdToDelete);
      
      console.log('Deleting team:', teamIdToDelete);
      setTeams(newTeamsList);

      // --- Crucial: Reset the selected team ---
      // If the deleted team was the selected one, select a new one
      if (selectedTeam?.id === teamIdToDelete) {
        // If there are any teams left, select the first one. Otherwise, select null.
        setSelectedTeam(newTeamsList.length > 0 ? newTeamsList[0] : null);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">PMC Team Management</h1>
        <button 
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center gap-2"
          onClick={() => setIsAddTeamModalOpen(true)}
        >
          <FaPlus />
          Add New Team
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="md:col-span-1">
          <TeamList 
            teams={teams}
            selectedTeamId={selectedTeam?.id}
            onSelectTeam={handleSelectTeam}
          />
        </div>

        <div className="md:col-span-2">
          {!selectedTeam ? (
            <div className="bg-white border border-gray-200 rounded-lg shadow-md min-h-[500px] flex items-center justify-center">
              <p className="p-8 text-center text-gray-500">Please select a team to see details.</p>
            </div>
          ) : (
            // --- Pass the new handler down as a prop ---
            <TeamDetails 
              key={selectedTeam.id} 
              team={selectedTeam} 
              onDeleteTeam={handleDeleteTeam} 
            />
          )}
        </div>
      </div>

      <AddTeamModal 
        isOpen={isAddTeamModalOpen}
        onClose={() => setIsAddTeamModalOpen(false)}
        onSave={handleAddNewTeam}
      />
    </div>
  );
};

export default PMCTeams;