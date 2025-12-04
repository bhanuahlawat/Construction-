import React, { useState } from "react";

function DocumentManager() {
  const [docs, setDocs] = useState([
    {
      id: 1,
      title: "Safety Manual",
      description: "Site safety procedures",
      version: 1,
      createdAt: "2025-10-14",
    },
  ]);
  const [form, setForm] = useState({ title: "", description: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addDoc = (e) => {
    e.preventDefault();
    setDocs((prev) => [
      {
        ...form,
        id: Date.now(),
        version: 1,
        createdAt: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
    setForm({ title: "", description: "" });
  };

  const deleteDoc = (id) => setDocs((prev) => prev.filter((d) => d.id !== id));
  const bumpVersion = (id) =>
    setDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, version: d.version + 1 } : d))
    );

  return (
    <div>
      <form
        onSubmit={addDoc}
        className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6"
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 rounded"
          required
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Short description"
          className="border p-2 rounded"
        />
        <button className="bg-blue-600 text-white py-2 rounded">Create</button>
      </form>

      <ul className="space-y-3">
        {docs.length === 0 && <div className="text-gray-500">No documents</div>}
        {docs.map((d) => (
          <li
            key={d.id}
            className="bg-white p-3 border rounded flex justify-between items-center"
          >
            <div>
              <div className="font-medium">
                {d.title}{" "}
                <span className="text-sm text-gray-500">v{d.version}</span>
              </div>
              <div className="text-sm text-gray-500">{d.description}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => bumpVersion(d.id)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                New Version
              </button>
              <button
                onClick={() => deleteDoc(d.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DocumentManager;
