import React, { useState } from "react";
import {
  FaBell,
  FaCheck,
  FaTrash,
  FaEnvelopeOpen,
  FaEnvelope,
  FaSearch,
} from 'react-icons/fa';

const SuperAdminNotificationPage = () => {
  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "System Update",
      message: "The system will be down for maintenance at midnight.",
      user: "Rohit Sharma",
      company: "Tech Solutions",
      email: "rohit@example.com",
      datetime: "2025-10-04T22:00:00",
      read: false,
    },
    {
      id: 2,
      title: "Payment Received",
      message: "Payment of ₹5000 has been processed.",
      user: "Neha Patel",
      company: "Build Corp",
      email: "neha@example.com",
      datetime: "2025-10-03T15:30:00",
      read: true,
    },
    {
      id: 3,
      title: "New Login",
      message: "New login detected from IP 192.168.1.10",
      user: "Rohit Sharma",
      company: "Tech Solutions",
      email: "rohit@example.com",
      datetime: "2025-10-04T08:20:00",
      read: false,
    },
  ]);

  // Filter & Search states
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Selected notification ids (for bulk actions)
  const [selected, setSelected] = useState([]);

  // Filter notifications by status
  const filteredNotifications = notifications
    .filter((n) => {
      if (filter === "read") return n.read;
      if (filter === "unread") return !n.read;
      return true;
    })
    .filter((n) =>
      [n.title, n.message, n.user, n.company, n.email].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  // Toggle read/unread status of one notification
  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  // Delete one notification
  const deleteNotification = (id) => {
    if (window.confirm("Delete this notification?")) {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      setSelected((prev) => prev.filter((sid) => sid !== id));
    }
  };

  // Toggle select/deselect notification
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // Select or deselect all filtered notifications
  const toggleSelectAll = () => {
    if (selected.length === filteredNotifications.length) {
      setSelected([]);
    } else {
      setSelected(filteredNotifications.map((n) => n.id));
    }
  };

  // Bulk mark selected as read
  const markSelectedAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => (selected.includes(n.id) ? { ...n, read: true } : n))
    );
    setSelected([]);
  };

  // Bulk mark selected as unread
  const markSelectedAsUnread = () => {
    setNotifications((prev) =>
      prev.map((n) => (selected.includes(n.id) ? { ...n, read: false } : n))
    );
    setSelected([]);
  };

  // Bulk delete selected
  const deleteSelected = () => {
    if (
      selected.length > 0 &&
      window.confirm(`Delete ${selected.length} selected notification(s)?`)
    ) {
      setNotifications((prev) => prev.filter((n) => !selected.includes(n.id)));
      setSelected([]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold flex items-center gap-3 text-indigo-700">
        <FaBell /> Super Admin Notifications
      </h1>

      {/* Controls: Filter, Search, Bulk Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Filter Buttons */}
        <div className="flex gap-4">
          {["all", "read", "unread"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                filter === f
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Bulk Action Buttons */}
        <div className="flex gap-2 flex-wrap">
          <button
            disabled={selected.length === 0}
            onClick={markSelectedAsRead}
            className={`px-4 py-2 rounded-xl font-semibold transition ${
              selected.length === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            Mark Read
          </button>
          <button
            disabled={selected.length === 0}
            onClick={markSelectedAsUnread}
            className={`px-4 py-2 rounded-xl font-semibold transition ${
              selected.length === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-yellow-600 text-white hover:bg-yellow-700"
            }`}
          >
            Mark Unread
          </button>
          <button
            disabled={selected.length === 0}
            onClick={deleteSelected}
            className={`px-4 py-2 rounded-xl font-semibold transition ${
              selected.length === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            Delete Selected
          </button>
        </div>
      </div>

      {/* Notification list */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
        {/* Select All Checkbox */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-4">
          <input
            type="checkbox"
            checked={
              selected.length > 0 &&
              selected.length === filteredNotifications.length
            }
            onChange={toggleSelectAll}
            className="w-5 h-5 cursor-pointer"
            title="Select/Deselect All"
          />
          <span className="font-semibold text-gray-700">Select All</span>
        </div>

        {filteredNotifications.length === 0 && (
          <p className="p-8 text-center text-gray-500">
            No notifications found.
          </p>
        )}

        {filteredNotifications.map((n) => (
          <div
            key={n.id}
            className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 gap-4 border-t border-gray-200 ${
              n.read ? "bg-gray-50" : "bg-indigo-50"
            }`}
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={selected.includes(n.id)}
              onChange={() => toggleSelect(n.id)}
              className="w-5 h-5 cursor-pointer"
              title="Select notification"
            />

            {/* Notification Details */}
            <div className="flex-1 min-w-0">
              <h3
                className={`text-lg font-semibold truncate ${
                  n.read ? "text-gray-700" : "text-indigo-700"
                }`}
                title={n.title}
              >
                {n.title}
              </h3>
              <p className="text-gray-600 truncate" title={n.message}>
                {n.message}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                User: {n.user} | Company: {n.company} | Email: {n.email}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(n.datetime).toLocaleString()}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => toggleRead(n.id)}
                className={`p-2 rounded-full border ${
                  n.read
                    ? "border-indigo-600 text-indigo-600 hover:bg-indigo-100"
                    : "border-gray-400 text-gray-400 hover:bg-gray-200"
                } transition`}
                title={n.read ? "Mark as Unread" : "Mark as Read"}
              >
                {n.read ? <FaEnvelopeOpen /> : <FaEnvelope />}
              </button>

              <button
                onClick={() => deleteNotification(n.id)}
                className="p-2 rounded-full border border-red-500 text-red-500 hover:bg-red-100 transition"
                title="Delete Notification"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperAdminNotificationPage;
