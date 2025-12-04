import React, { useState } from "react";

function TTPLFormats() {
  const FORMATS = [
    "RFI",
    "JMS",
    "DC",
    "MIR",
    "Checklist",
    "RFQ",
    "DPR",
    "DLR",
    "Other",
  ];
  const [entries, setEntries] = useState([
    { id: 1, format: "RFI", title: "RFI - 23", fileName: "RFI_23.pdf" },
  ]);
  const [form, setForm] = useState({
    format: FORMATS[0],
    title: "",
    fileName: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addEntry = (e) => {
    e.preventDefault();
    setEntries((prev) => [{ ...form, id: Date.now() }, ...prev]);
    setForm({ format: FORMATS[0], title: "", fileName: "" });
  };

  return (
    <div>
      <form
        onSubmit={addEntry}
        className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6"
      >
        <select
          name="format"
          value={form.format}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          {FORMATS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 rounded"
          required
        />
        <input
          name="fileName"
          value={form.fileName}
          onChange={handleChange}
          placeholder="File name (for demo)"
          className="border p-2 rounded"
        />
        <button className="col-span-1 md:col-span-4 bg-blue-600 text-white py-2 rounded">
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {entries.length === 0 && (
          <div className="text-gray-500">No TTPL entries</div>
        )}
        {entries.map((e) => (
          <li
            key={e.id}
            className="bg-white p-3 border rounded flex justify-between"
          >
            <div>
              <div className="font-medium">
                {e.format} — {e.title}
              </div>
              <div className="text-sm text-gray-500">{e.fileName}</div>
            </div>
            <div className="text-sm text-gray-500">
              {new Date(e.id).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TTPLFormats;
