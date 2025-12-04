import React from "react";
import { useState, useMemo, useEffect, } from "react"
import { Bell, Search, CheckCircle, AlertTriangle, Info, Trash2, Mail, MailOpen, ChevronLeft, ChevronRight } from "lucide-react";


const Sample = [
    {
        id: 1,
        title: "Document Verified",
        message: "GST Certificate verified successfully.",
        type: "success",
        datetime: "2025-11-20T02:10 ",
        read: false,
    },
    {
        id: 2,
        title: "Pending Verification",
        message: "PAN Card is pending admin review.",
        type: "warning",
        datetime: "2025-11-20T04:12 ",
        read: false,
    },
    {
        id: 3,
        title: "Profile Updated",
        message: "Your profile details were updated.",
        type: "info",
        datetime: "2025-11-20T12:00 ",
        read: true,
    },
    {
        id: 4,
        title: "Payment Received",
        message: "payment of ₹14,200 has been processed.",
        type: "success",
        datetime: "2025-11-20T10:15 ",
        read: true,
    },
    {
        id: 5,
        title: "Security Alert",
        message: "New login from unrecognized device.",
        type: "success",
        datetime: "2025-11-20T01:10 ",
        read: false,
    },
    {
        id: 6,
        title: "Monthly Report",
        message: "Monthly performance report is ready to view.",
        type: "success",
        datetime: "2025-11-20T05:00 ",
        read: true,
    },
    {
        id: 7,
        title: "Document Verified",
        message: "GST Certificate verified successfully.",
        type: "success",
        datetime: "2025-11-20T09:30 ",
        read: false,
    },

]



export default function Notification() {
    const [notifications, setNotifications] = useState(Sample);
    const [filter, setFilter] = useState("All")
    const [query, setQuery] = useState("")
    const [selectedIds, setSelectedIds] = useState([]);
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 4;


    // search + filter
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return notifications.filter((n) => {
            if (filter === "read" && !n.read) return false;
            if (filter === "unread" && n.read) return false;
            if (!q) return true;
            return (
                n.title.toLowerCase().includes(q) ||
                n.message.toLowerCase().includes(q) ||
                n.type.toLowerCase().includes(q)
            );
        });
    }, [notifications, filter, query]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    // Helpers
    const toggleSelect = (id) =>
        setSelectedIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
    const selectAllVisible = () => {
        const ids = pageItems.map((i) => i.id);
        const allSelected = ids.every((id) => selectedIds.includes(id));
        setSelectedIds((s) => (allSelected ? s.filter((x) => !ids.includes(x)) : Array.from(new Set([...s, ...ids]))));
    };

    const markAsRead = (ids) =>
        setNotifications((prev) => prev.map((n) => (ids.includes(n.id) ? { ...n, read: true } : n)));
    const markAsUnread = (ids) =>
        setNotifications((prev) => prev.map((n) => (ids.includes(n.id) ? { ...n, read: false } : n)));
    const deleteIds = (ids) =>
        setNotifications((prev) => prev.filter((n) => !ids.includes(n.id)));

    const handleToggleReadSingle = (id) =>
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));

    //  icon 
    const TypeIcon = ({ type }) => {
        if (type === "success") return <CheckCircle className="w-5 h-5 text-green-600" />;
        if (type === "warning") return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
        return <Info className="w-5 h-5 text-blue-600" />;
    };

    // format datetime
    const formatDT = (iso) => {
        const d = new Date(iso);
        return `${d.toLocaleDateString()} • ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    };


    React.useEffect(() => {
        setSelectedIds((s) => s.filter((id) => filtered.some((f) => f.id === id)));
        setPage(1);
    }, [query, filter]);

    return (
        <>
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl max-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                                <Bell className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-800">Notifications</h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="hidden  sm:flex items-center gap-2  bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                                {["All", "Read", "Unread"].map((f) => (
                                    <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-lg text-sm font-medium transition ${filter === f ? "bg-indigo-600 text-white shadow" : "text-gray-600 hover:bg-gray-100"
                                        }`}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
                                ))}
                            </div>
                            {/* Search */}
                            <div className="relative bg-white rounded-full border border-gray-200 shadow-sm">
                                <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                                <input value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search notifications..."
                                    className="pl-10 pr-3 py-2 rounded-full w-56 text-sm outline-none" />
                            </div>
                        </div>
                    </div>

                    {/* action bar */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={pageItems.length > 0 && pageItems.every((i) => selectedIds.includes(i.id))}
                                onChange={selectAllVisible}
                                className="w-5 h-5 cursor-pointer"
                                title="Select visible" />
                            <span className="text-sm text-gray-600">{selectedIds.length} selected</span>
                            <div className="flex  items-center gap-2">
                                <button
                                    onClick={() => {
                                        if (selectedIds.length === 0) return;
                                        markAsRead(selectedIds);
                                        setSelectedIds([]);
                                    }}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${selectedIds.length === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-green-600 text-white"
                                        }`}
                                >
                                    Mark Read
                                </button>

                                <button
                                    onClick={() => {
                                        if (selectedIds.length === 0) return;
                                        markAsUnread(selectedIds);
                                        setSelectedIds([]);
                                    }}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${selectedIds.length === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-yellow-600 text-white"
                                        }`}
                                >
                                    Mark Unread
                                </button>

                                <button
                                    onClick={() => {
                                        if (selectedIds.length === 0) return;
                                        if (!confirm(`Delete ${selectedIds.length} notifications?`)) return;
                                        deleteIds(selectedIds);
                                        setSelectedIds([]);
                                    }}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${selectedIds.length === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-red-600 text-white"
                                        }`}
                                >
                                    Delete
                                </button>

                            </div>
                        </div>

                        <div className="text-sm text-gray-500 hidden sm:block">
                            showing{(page - 1) * PAGE_SIZE + 1} - {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                        </div>
                    </div>

                    {/* list */}
                    <div className="space-y-3">
                        {pageItems.length === 0 && (
                            <div className="bg-white rounded-xl p-6 text-center text-gray-500 shadow-sm">No notifications found.</div>
                        )}

                        {pageItems.map((n) => (
                            <div
                                key={n.id} className={`flex gap-4 items-start p-4 rounded-xl shadow-sm bg-white border border-gray-100 transition hover:shadow-md ${n.read ? "opacity-80" : "ring-1 ring-indigo-50"
                                    }`}>
                                <div className="flex flex-col items-start gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(n.id)}
                                        onChange={() => toggleSelect(n.id)}
                                        className="w-4 h-4 mt-1"
                                        title="Select notification"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-gray-50 border border-gray-100">
                                                <TypeIcon type={n.type} />
                                            </div>
                                            <div>
                                                <h3 className={`text-sm font-semibold ${n.read ? "text-gray-700" : "text-gray-900"}`}>{n.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{n.message}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-2">
                                            <div className="text-xs text-gray-400">{formatDT(n.datetime)}</div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleToggleReadSingle(n.id)}
                                                    title={n.read ? "Mark unread" : "Mark read"}
                                                    className={`p-2 rounded-md hover:bg-gray-100 transition ${n.read ? "text-indigo-600 border border-indigo-100" : "text-gray-500"}`}
                                                >
                                                    {n.read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        if (!confirm("Delete this notification?")) return;
                                                        deleteIds([n.id]);
                                                        setSelectedIds((s) => s.filter((x) => x !== n.id));
                                                    }}
                                                    title="Delete"
                                                    className="p-2 rounded-md hover:bg-gray-100 text-red-500 transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination controls */}
                    <div className="flex items-center justify-between gap-3 mt-6">
                        <div className="text-sm text-gray-600">
                            Page {page} of {totalPages}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`p-2 rounded-md border ${page === 1 ? "text-gray-300 border-gray-200" : "text-gray-600 hover:bg-gray-100"}`}
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="inline-flex items-center  gap-1 rounded-md bg-white border px-3 py-1 text-sm">
                {Array.from({length: totalPages}, (_, i) => i+ 1).map((pg) => (
                      <button
                  key={pg}
                  onClick={() => setPage(pg)}
                  className={`px-2 py-1 rounded text-sm ${pg === page ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  {pg}
                </button>
                ))}
            </div>

              <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`p-2 rounded-md border ${page === totalPages ? "text-gray-300 border-gray-200" : "text-gray-600 hover:bg-gray-100"}`}
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )


}



