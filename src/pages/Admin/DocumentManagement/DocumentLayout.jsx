import React, { useState } from "react";
import DocumentStorage from "./components/DocumentStorage";
import FileSharing from "./components/FileSharing";
import BlueprintManagement from "./components/BlueprintManagement";
import DocumentManager from "./components/DocumentManager";
import TTPLFormats from "./components/TTPLFormats";

export default function DocumentManagement() {
  const [activeTab, setActiveTab] = useState("storage");

  const tabs = [
    {
      id: "storage",
      label: "Document Storage",
      component: <DocumentStorage />,
    },
    { id: "sharing", label: "File Sharing", component: <FileSharing /> },
    {
      id: "blueprints",
      label: "Blueprint Management",
      component: <BlueprintManagement />,
    },
    {
      id: "manager",
      label: "Document Manager",
      component: <DocumentManager />,
    },
    { id: "ttpl", label: "TTPL Formats", component: <TTPLFormats /> },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Document Management</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded ${
              activeTab === t.id ? "bg-blue-600 text-white" : "bg-white border"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow">
        {tabs.find((t) => t.id === activeTab)?.component}
      </div>
    </div>
  );
}
