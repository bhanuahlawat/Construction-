import React, { useState } from "react";

function FileSharing() {
  const [files, setFiles] = useState([{ id: 1, name: "Report.pdf" }]);
  const [shareEmail, setShareEmail] = useState("");

  const upload = (e) => {
    const list = Array.from(e.target.files).map((f) => ({
      id: Date.now() + Math.random(),
      name: f.name,
    }));
    setFiles((prev) => [...list, ...prev]);
  };

  const share = (fileId) => {
    const file = files.find((f) => f.id === fileId);
    if (!file || !shareEmail) {
      alert("Select an email and a file");
      return;
    }
    alert(`Simulated: ${file.name} shared with ${shareEmail}`);
  };

  return (
    <div>
      <input type="file" onChange={upload} className="mb-4" />
      <div className="mb-4">
        <input
          placeholder="Enter email to share with"
          value={shareEmail}
          onChange={(e) => setShareEmail(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <span className="text-sm text-gray-500">(Simulated sharing)</span>
      </div>

      <ul className="space-y-2">
        {files.length === 0 && <li className="text-gray-500">No files</li>}
        {files.map((f) => (
          <li
            key={f.id}
            className="flex items-center justify-between bg-white p-3 border rounded"
          >
            <span>{f.name}</span>
            <button
              onClick={() => share(f.id)}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Share
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileSharing;
