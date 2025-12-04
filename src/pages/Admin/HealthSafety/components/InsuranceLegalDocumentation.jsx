import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaTimes,
  FaTrash,
  FaFilePdf,
  FaFileUpload,
  FaFile,
} from "react-icons/fa";

// --- Mock Data (UPDATED with URL) ---
const mockDocuments = [
  {
    id: 1,
    name: "General Liability Insurance Policy.pdf",
    type: "Insurance",
    project: "High-Rise Tower A",
    status: "Active",
    expiry: "2026-12-31",
    url: "/docs/placeholder.pdf", // Example URL
  },
  {
    id: 2,
    name: "Workers Compensation Policy.pdf",
    type: "Insurance",
    project: "All Projects",
    status: "Active",
    expiry: "2026-10-30",
    url: "/docs/placeholder.pdf", // Example URL
  },
  {
    id: 3,
    name: "Site Safety Plan v2.pdf",
    type: "Legal Compliance",
    project: "Highway Expansion Pkg 3",
    status: "Active",
    expiry: "2026-01-01",
    url: "/docs/placeholder.pdf", // Example URL
  },
  {
    id: 4,
    name: "Old Insurance Claim (2024).pdf",
    type: "Insurance Claim",
    project: "N/A",
    status: "Expired",
    expiry: "2024-11-01",
    url: "/docs/placeholder.pdf", // Example URL
  },
];

// --- Helper Function to check expiry ---
const getExpiryStatus = (dateString) => {
  if (!dateString) return { isExpired: false, text: "N/A" };
  const expiry = new Date(dateString);
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);

  if (expiry < today) {
    return {
      isExpired: true,
      textClass: "text-red-600 font-bold",
      text: `Expired on ${dateString}`,
    };
  }
  if (expiry < thirtyDaysFromNow) {
    return {
      isExpired: false,
      textClass: "text-yellow-600 font-semibold",
      text: `Expires ${dateString}`,
    };
  }
  return { isExpired: false, textClass: "text-gray-500", text: dateString };
};

// --- Main Component ---
const InsuranceLegalDocumentation = () => {
  const [documents, setDocuments] = useState(mockDocuments);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // --- Handlers ---
  const handleAddDocument = (docData) => {
    // In a real app, you would upload docData.file to a server here and get a URL back
    console.log("New document to add:", docData);

    const newDocument = {
      ...docData,
      id: `DOC-${Math.floor(Math.random() * 9000) + 1000}`,
      status: "Active",
      name: docData.file ? docData.file.name : docData.name,
      url: "/docs/placeholder.pdf", // Add placeholder URL for new docs
    };
    // We don't store the file object in state, just its metadata
    delete newDocument.file;

    setDocuments([newDocument, ...documents]);
    setIsUploadModalOpen(false);
  };

  const handleDeleteDocument = (docId) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      setDocuments(documents.filter((doc) => doc.id !== docId));
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
          Insurance & Legal Documentation
        </h2>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition w-full sm:w-auto"
        >
          <FaPlus /> Upload Document
        </button>
      </div>
      <p className="text-gray-600 mb-4 text-sm">
        A central repository for all insurance policies, claims, and legal
        documents related to HSE.
      </p>

      {/* --- Documents Table --- */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Document Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry / Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc) => {
              const expiryInfo = getExpiryStatus(doc.expiry);
              return (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-2">
                    <FaFilePdf className="text-red-500 flex-shrink-0" />
                    {/* --- CLICKABLE LINK --- */}
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline truncate"
                      title={doc.name}
                    >
                      {doc.name}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowGrap text-sm text-gray-500">
                    {doc.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.project}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${expiryInfo.textClass}`}
                  >
                    {expiryInfo.text}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-4">
                    <button
                      onClick={() => handleDeleteDocument(doc.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete Document"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* --- Modals --- */}
      <UploadDocumentModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSave={handleAddDocument}
      />
    </div>
  );
};

// --- Modal for Uploading Documents ---
const UploadDocumentModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Insurance",
    project: "",
    expiry: "",
  });
  const [file, setFile] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      // Automatically set the document name to the file name
      setFormData((prev) => ({ ...prev, name: selectedFile.name }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    // Pass both form data and the file object
    onSave({ ...formData, file });
    // Reset form and file
    setFormData({ name: "", type: "Insurance", project: "", expiry: "" });
    setFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Upload New Document</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Document Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-50"
              placeholder="e.g., General Liability Policy"
              required
              readOnly // Set by the file upload
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Document Type
              </label>
              <select
                name="type"
                onChange={handleChange}
                value={formData.type}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="Insurance">Insurance</option>
                <option value="Legal Compliance">Legal Compliance</option>
                <option value="Insurance Claim">Insurance Claim</option>
                <option value="Safety Plan">Safety Plan</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project (if specific)
              </label>
              <input
                type="text"
                name="project"
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="e.g., High-Rise Tower A"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date (if applicable)
            </label>
            <input
              type="date"
              name="expiry"
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload File
            </label>
            <label
              htmlFor="file-upload"
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-500"
            >
              <div className="space-y-1 text-center">
                {file ? (
                  <FaFile className="mx-auto h-12 w-12 text-blue-500" />
                ) : (
                  <FaFileUpload className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600">
                  <span className="relative rounded-md font-medium text-blue-600 hover:text-blue-500">
                    {file ? file.name : "Click to select a file"}
                  </span>
                  {!file && <p className="pl-1">or drag and drop</p>}
                </div>
                {!file && (
                  <p className="text-xs text-gray-500">
                    PDF, DOCX, PNG, JPG up to 10MB
                  </p>
                )}
              </div>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Save Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InsuranceLegalDocumentation;
