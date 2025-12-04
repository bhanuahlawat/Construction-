import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

// Import all the new components
import ReportsAnalytics from "./ProjectManagement/ReportsAnalytics";
import PlanningAndScheduling from "./ProjectManagement/PlanningAndScheduling";
import TechnicalAndBOQ from "./ProjectManagement/TechnicalAndBOQ";
import CollaborationAndWorkflow from "./ProjectManagement/CollaborationAndWorkflow";
import CreateProjectModal from "./ProjectManagement/CreateProjectModal";
import CreateBOQModal from "./ProjectManagement/CreateBOQModal";
import UpdateMilestoneModal from "./ProjectManagement/UpdateMilestoneModal";

// --- Mock Data ---
const mockProjects = [
  { id: "HR-A", name: "High-Rise Tower A", client: "City Dev Corp" },
  { id: "HW-P3", name: "Highway Expansion Pkg 3", client: "Global Infra Ltd" },
];
const initialMilestoneData = [
  {
    id: 1,
    milestone: "1.1 Excavation Complete",
    completion: 100,
    due: "2025-10-30",
    isWBS: true,
  },
  {
    id: 2,
    milestone: "1.2 Piling & Footing",
    completion: 40,
    due: "2025-11-15",
    isWBS: true,
  },
  {
    id: 3,
    milestone: "2.1 Column Erection (Floors 1-5)",
    completion: 0,
    due: "2025-12-30",
    isWBS: true,
  },
  {
    id: 4,
    milestone: "Final MEP Inspection",
    completion: 0,
    due: "2026-03-01",
    isWBS: false,
  },
];

const ProjectManager = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("planning");
  const [projects, setProjects] = useState(mockProjects);
  const [selectedProject, setSelectedProject] = useState(mockProjects[0].id);

  const [milestoneData, setMilestoneData] = useState(initialMilestoneData);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isNewBOQModalOpen, setIsNewBOQModalOpen] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    milestoneId: "",
    completion: 0,
  });

  // --- Handlers ---

  const handleCreateProject = (newProjectData) => {
    const newId = "P-" + (projects.length + 1);
    const newProject = {
      id: newId,
      name: newProjectData.name,
      client: newProjectData.client,
    };
    setProjects((prevProjects) => [...prevProjects, newProject]);
    setSelectedProject(newId);
    setIsNewProjectModalOpen(false);
  };

  const handleCreateBOQ = (boqData) => {
    console.log("Creating BOQ with data:", boqData);
    alert(
      `Mock BOQ for "${boqData.boqName}" created for Project: ${selectedProject}`
    );
    setIsNewBOQModalOpen(false);
  };

  const handleMilestoneUpdate = (e) => {
    e.preventDefault();
    const { milestoneId, completion } = updateForm;
    if (!milestoneId) return;
    const newCompletion = parseFloat(completion);
    const updatedData = milestoneData.map((item) =>
      item.id === parseInt(milestoneId)
        ? { ...item, completion: newCompletion }
        : item
    );
    setMilestoneData(updatedData);
    setIsUpdateModalOpen(false);
    setUpdateForm({ milestoneId: "", completion: 0 });
  };

  // --- Tab Content ---
  const renderContent = () => {
    switch (activeTab) {
      case "technical":
        return (
          <TechnicalAndBOQ onOpenBOQModal={() => setIsNewBOQModalOpen(true)} />
        );
      case "collaboration":
        return <CollaborationAndWorkflow navigate={navigate} />;
      case "reports":
        return <ReportsAnalytics />;
      case "planning":
      default:
        return (
          <PlanningAndScheduling
            milestoneData={milestoneData}
            onOpenUpdateModal={() => setIsUpdateModalOpen(true)}
          />
        );
    }
  };

  const tabs = [
    { id: "planning", name: "Roadmap & WBS" },
    { id: "technical", name: "Design & Materials" },
    { id: "collaboration", name: "Team & Workflow" },
    { id: "reports", name: "Reports & Analytics" },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen">
      <header className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center p-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-700 text-white shadow-xl">
        <h1 className="text-3xl font-extrabold tracking-wide">
          Project Management Hub
        </h1>
        <button
          onClick={() => setIsNewProjectModalOpen(true)}
          className="flex items-center gap-2 mt-4 sm:mt-0 bg-white text-indigo-700 font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-100 transition"
        >
          <FaPlusCircle /> Create New Project
        </button>
      </header>

      {/* Project Selector */}
      <div className="mb-6 flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md border-l-4 border-indigo-500">
        <label className="text-lg font-medium text-indigo-700">
          Active Project:
        </label>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full max-w-xs"
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.client})
            </option>
          ))}
        </select>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-6 border-b border-gray-300">
        <nav
          className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto"
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? "border-indigo-500 text-indigo-600 font-extrabold"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-400"
              }  py-3 px-1 border-b-4 text-sm sm:text-base transition-colors duration-200`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Render Tab Content */}
      <div className="py-4">{renderContent()}</div>

      {/* --- Render Modals --- */}
      <CreateProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onCreate={handleCreateProject}
      />
      <CreateBOQModal
        isOpen={isNewBOQModalOpen}
        onClose={() => setIsNewBOQModalOpen(false)}
        onCreate={handleCreateBOQ}
      />
      <UpdateMilestoneModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSave={handleMilestoneUpdate}
        milestoneData={milestoneData}
        updateForm={updateForm}
        setUpdateForm={setUpdateForm}
      />
    </div>
  );
};

export default ProjectManager;
