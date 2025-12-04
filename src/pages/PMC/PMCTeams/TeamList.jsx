import React from 'react';

const TeamList = ({ teams, selectedTeamId, onSelectTeam }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-200 max-h-[70vh] overflow-y-auto">
        {/*
          CHANGE THIS LINE: Use 'teams?.map' instead of 'teams.map'
        */}
        {teams?.map((team) => (
          <li
            key={team.id}
            className={`p-4 cursor-pointer ${selectedTeamId === team.id ? 'bg-blue-100 border-l-4 border-blue-500' : 'hover:bg-gray-50'}`}
            onClick={() => onSelectTeam(team)}
          >
            <strong className="block font-semibold text-gray-800">{team.name}</strong>
            <span className="text-sm text-gray-600">{team.project}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;