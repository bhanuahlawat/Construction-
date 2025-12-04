import React, { useState } from "react";

function DocumentStorage() {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "ProjectPlan.pdf",
      size: "250 KB",
      type: "application/pdf",
      version: 1,
      uploadedAt: "2025-10-10",
    },
    {
      id: 2,
      name: "DrawingA.dwg",
      size: "1.2 MB",
      type: "image/dwg",
      version: 2,
      uploadedAt: "2025-10-12",
    },
  ]);

  const handleUpload = (e) => {
    const list = Array.from(e.target.files).map((f) => ({
      id: Date.now() + Math.random(),
      name: f.name,
      size: (f.size / 1024).toFixed(2) + " KB",
      type: f.type || "unknown",
      version: 1,
      uploadedAt: new Date().toISOString().slice(0, 10),
    }));
    setFiles((prev) => [...list, ...prev]);
  };

  const addNewVersion = (id) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              version: f.version + 1,
              uploadedAt: new Date().toISOString().slice(0, 10),
            }
          : f
      )
    );
  };

  return (
    <div>
      <input type="file" multiple onChange={handleUpload} className="mb-4" />
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Size</th>
            <th className="p-2 border">Version</th>
            <th className="p-2 border">Uploaded At</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {files.length === 0 && (
            <tr>
              <td colSpan={6} className="p-4 text-center">
                No files uploaded.
              </td>
            </tr>
          )}
          {files.map((f) => (
            <tr key={f.id} className="text-center">
              <td className="p-2 border">{f.name}</td>
              <td className="p-2 border">{f.type}</td>
              <td className="p-2 border">{f.size}</td>
              <td className="p-2 border">{f.version}</td>
              <td className="p-2 border">{f.uploadedAt}</td>
              <td className="p-2 border">
                <button
                  onClick={() => addNewVersion(f.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  Add new version
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DocumentStorage;
