import React, { useState } from "react";
import {
  FaQuestionCircle,
  FaVideo,
  FaFileAlt,
  FaEnvelope,
  FaPlus,
} from 'react-icons/fa';

const TrainingSupportPage = () => {
  // Dummy training materials
  const [trainingMaterials] = useState([
    {
      id: 1,
      title: "How to Add Users",
      type: "video",
      url: "https://www.example.com/video1", // link or file
    },
    {
      id: 2,
      title: "User Management Guide (PDF)",
      type: "document",
      url: "https://www.example.com/doc1.pdf",
    },
    {
      id: 3,
      title: "Plan Creation Tutorial",
      type: "video",
      url: "https://www.example.com/video2",
    },
  ]);

  // Dummy support tickets
  const [tickets, setTickets] = useState([
    {
      id: 101,
      subject: "Unable to upload document",
      status: "Open",
      date: "2025-10-05T10:30:00",
      description: "When I try to upload Aadhar, it fails.",
    },
    {
      id: 102,
      subject: "Plan not activating",
      status: "Closed",
      date: "2025-10-04T14:20:00",
      description: "I purchased plan but it's not visible in profile.",
    },
  ]);

  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
  });

  const [isCreatingTicket, setIsCreatingTicket] = useState(false);

  const handleChangeNewTicket = (e) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
  };

  const submitNewTicket = (e) => {
    e.preventDefault();
    const ticket = {
      id: Date.now(),
      subject: newTicket.subject,
      description: newTicket.description,
      status: "Open",
      date: new Date().toISOString(),
    };
    setTickets([ticket, ...tickets]);
    setNewTicket({ subject: "", description: "" });
    setIsCreatingTicket(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <h1 className="text-3xl font-bold flex items-center gap-3 text-indigo-700">
        <FaQuestionCircle /> Training & Support
      </h1>

      {/* Training / Tutorials Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Training Materials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingMaterials.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-5 shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-3">
                {item.type === "video" ? (
                  <FaVideo className="text-indigo-600 text-2xl" />
                ) : (
                  <FaFileAlt className="text-indigo-600 text-2xl" />
                )}
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-indigo-600 hover:underline"
              >
                View {item.type === "video" ? "Video" : "Document"}
              </a>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-gray-300" />

      {/* Support / Ticket Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Support Tickets</h2>
          <button
            onClick={() => setIsCreatingTicket(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaPlus /> New Ticket
          </button>
        </div>

        {/* Create New Ticket Modal/Form */}
        {isCreatingTicket && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
              <h3 className="text-xl font-bold mb-4">Create Support Ticket</h3>
              <form onSubmit={submitNewTicket} className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={newTicket.subject}
                    onChange={handleChangeNewTicket}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    value={newTicket.description}
                    onChange={handleChangeNewTicket}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3"
                    rows={5}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreatingTicket(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Ticket List */}
        <div className="bg-white border border-gray-200 rounded-lg shadow divide-y divide-gray-200">
          {tickets.length === 0 && (
            <p className="p-6 text-gray-500 text-center">No tickets found.</p>
          )}
          {tickets.map((t) => (
            <div
              key={t.id}
              className="p-5 flex flex-col sm:flex-row sm:justify-between gap-4"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{t.subject}</h3>
                <p className="text-gray-600 mt-1">{t.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(t.date).toLocaleString()} | Status:{" "}
                  <span
                    className={`font-semibold ${
                      t.status === "Open" ? "text-green-600" : "text-gray-600"
                    }`}
                  >
                    {t.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TrainingSupportPage;
