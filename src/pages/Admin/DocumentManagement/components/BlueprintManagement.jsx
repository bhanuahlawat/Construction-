import React, { useState } from "react";

function BlueprintManagement() {
  const [blueprints, setBlueprints] = useState([
    {
      id: 1,
      name: "SiteLayout.png",
      preview: "https://via.placeholder.com/150",
    },
  ]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files).map((f) => ({
      id: Date.now() + Math.random(),
      name: f.name,
      preview: URL.createObjectURL(f),
    }));
    setBlueprints((prev) => [...files, ...prev]);
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf,image/*,dwg"
        onChange={handleUpload}
        multiple
        className="mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {blueprints.length === 0 && (
          <div className="text-gray-500">No blueprints uploaded.</div>
        )}
        {blueprints.map((b) => (
          <div key={b.id} className="border rounded overflow-hidden">
            <div className="p-2 text-sm font-medium">{b.name}</div>
            <div className="h-48 flex items-center justify-center bg-gray-50">
              <img
                src={b.preview}
                alt={b.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlueprintManagement;
