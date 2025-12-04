import React, { useState } from "react";
import { FiEye, FiPlus, FiTrash2 } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectCardPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [viewProject, setViewProject] = useState(null);
  

  const [projects, setProjects] = useState([
    {
      id: "PRJ-001",
      name: "Abc Company",
      manager: "Amit Verma",
      status: "On Track",
      start: "2025-01-10",
      end: "2025-11-30",
      description: "Construction of a premium shopping mall with 200+ outlets."
    },
    {
      id: "PRJ-002",
      name: "Abc company  ",
      manager: "Neha",
      status: "Delayed",
      start: "2024-08-05",
      end: "2025-12-10",
      description: "Luxury residential towers near the riverfront with clubhouse."
    },
    {
      id: "PRJ-002",
      name: "Abc company  ",
      manager: "Neha",
      status: "Delayed",
      start: "2024-08-05",
      end: "2025-12-10",
      description: "Luxury residential towers near the riverfront with clubhouse."
    },
  ]);

  const handleAddProject = (e) => {
    e.preventDefault();
    const form = e.target;
    const newProject = {
      id: `PRJ-${projects.length + 1}`.padStart(3, "0"),
      name: form.name.value,
      manager: form.manager.value,
      status: form.status.value,
      start: form.start.value,
      end: form.end.value,
      description: form.description.value
    };
    setProjects([...projects, newProject]);
    setIsAddOpen(false);
  };

  const handleDelete = () => {
    setProjects((prev) => prev.filter((p) => p.id !== setProjects.id));
    setProjects.id
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800"> Projects </h1>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition"
        >
          <FiPlus className="w-5 h-5" /> Add Project
        </button>
      </div>

      {/* Project Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white shadow-lg rounded-2xl p-5 border border-gray-100"
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-lg font-semibold text-gray-800">{p.name}</h2>
              <StatusBadge status={p.status} />
            </div>
            <p className="text-sm text-gray-500 mb-2">Manager: {p.manager}</p>
            <p className="text-sm text-gray-500 mb-4">
              {p.start} → {p.end}
            </p>
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
              {p.description}
            </p>

            <div   className=" flex justify-end gap-4 mt-3">
              <button
    onClick={() => setViewProject(p)}
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
  >
    <FiEye className="w-4 h-4" /> View
  </button>
  <button
    onClick={() => setProject(p)}
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
  >
    <FiTrash2 className="w-4 h-4" /> Delete
  </button>
            </div>
             
          </motion.div>
        ))}
      </div>

      {/* Add Project Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Project">
        <form onSubmit={handleAddProject} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input name="name" label="Project Name" required />
            <Input name="manager" label="Manager" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select name="status" label="Status" options={["On Track", "Delayed", "On Hold"]} />
            <Input name="start" label="Start Date" type="date" required />
          </div>
          <Input name="end" label="End Date" type="date" required />
          <textarea
            name="description"
            placeholder="Project Description"
            className="w-full border rounded-lg px-3 py-2 h-24"
          ></textarea>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>

      {/* View Details Modal (Table Inside) */}
      <Modal isOpen={!!viewProject} onClose={() => setViewProject(null)} title="Project Details">
        {viewProject && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <tbody className="divide-y divide-gray-100">
                <TableRow label="Project ID" value={viewProject.id} />
                <TableRow label="Name" value={viewProject.name} />
                <TableRow label="Manager" value={viewProject.manager} />
                <TableRow label="Status" value={<StatusBadge status={viewProject.status} />} />
                <TableRow label="Start Date" value={viewProject.start} />
                <TableRow label="End Date" value={viewProject.end} />
                <TableRow label="Description" value={viewProject.description} />
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </div>
  );
}

/* --- Reusable Components --- */
function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40  backdrop-blur-md flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ×
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TableRow({ label, value }) {
  return (
    <tr>
      <td className="px-4 py-2 font-medium text-gray-600 bg-gray-50 w-40">{label}</td>
      <td className="px-4 py-2 text-gray-800">{value}</td>
    </tr>
  );
}

function StatusBadge({ status }) {
  const color =
    status === "On Track"
      ? "bg-green-100 text-green-700"
      : status === "Delayed"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-gray-700";
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
}

function Input({ label, name, type = "text", required = false }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full border rounded-lg px-3 py-2 mt-1"
      />
    </div>
  );
}

function Select({ label, name, options }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <select name={name} className="w-full border rounded-lg px-3 py-2 mt-1">
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
