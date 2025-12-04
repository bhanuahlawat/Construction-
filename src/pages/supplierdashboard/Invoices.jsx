
import React, { useState } from "react";
import { Search, PlusCircle, Filter, Edit, Trash } from "lucide-react";

export default function Invoice() {
  
  const initialInvoices = [
    { id: "INV-1001", client: "Aarav Traders", dueDate: "2025-11-30", amount: 45200.0, status: "Pending", items: 6 },
    { id: "INV-1002", client: "Zenith Solutions", dueDate: "2025-11-10", amount: 12500.5, status: "Paid", items: 3 },
    { id: "INV-1003", client: "Kriti Enterprises", dueDate: "2025-12-05", amount: 98700.99, status: "Overdue", items: 12 },
    { id: "INV-1004", client: "Prime Imports", dueDate: "2025-11-22", amount: 7600.0, status: "Pending", items: 1 },
  ];

  const [invoices, setInvoices] = useState(initialInvoices);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(invoices[0]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  const statusColors = {
    Paid: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Overdue: "bg-red-100 text-red-800",
  };

  // Search + Filter 
  const filtered = invoices.filter((inv) => {
    const matchQ = `${inv.id} ${inv.client}`.toLowerCase().includes(query.toLowerCase());
    const matchStatus = statusFilter === "All" ? true : inv.status === statusFilter;
    return matchQ && matchStatus;
  });

  // Select invoice
  function handleSelect(inv) {
    setSelected(inv);
    setEditMode(false);
  }

  // Delete invoice
  function handleDelete(id) {
    if (!confirm("Delete invoice?")) return;
    setInvoices((s) => s.filter((i) => i.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  // Create new  invoice 
  function handleCreateDemo() {
    const newInv = {
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      client: "New Client",
      dueDate: "2025-12-31",
      amount: Math.round(Math.random() * 100000) / 100,
      status: "Pending",
      items: Math.ceil(Math.random() * 8),
    };

    setInvoices((s) => [newInv, ...s]);
    setSelected(newInv);
  }

  // Open edit panel
  function handleEdit(inv) {
    setEditData(inv);
    setEditMode(true);
  }

  // Save edit
  function saveEdit() {
    setInvoices((old) => old.map((i) => (i.id === editData.id ? editData : i)));
    setSelected(editData);
    setEditMode(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">

        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Invoice</h1>
           
          </div>

           
          <button
            onClick={handleCreateDemo}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl shadow"
          >
            <PlusCircle size={16} /> Create Invoice
          </button>
        </div>

      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          
          <div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow-sm">

            {/* Search + Filter */}
            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center gap-2 flex-1">
                <Search size={18} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search invoice or client..."
                  className="w-full outline-none py-2"
                />
              </label>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-full border px-3 py-2"
                >
                  <option>All</option>
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Overdue</option>
                </select>
                <div className="absolute right-3 top-2 pointer-events-none">
                  <Filter size={14} />
                </div>
              </div>
            </div>

            {/* Invoice List */}
            <div className="divide-y">
              {filtered.map((inv) => (
                <div
                  key={inv.id}
                  onClick={() => handleSelect(inv)}
                  className={`flex items-center justify-between py-3 cursor-pointer hover:bg-slate-50 px-2 rounded-xl ${
                    selected?.id === inv.id ? "ring-2 ring-indigo-200" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-sm font-medium">
                      {inv.client.split(" ")[0][0]}
                      {inv.client.split(" ").slice(-1)[0][0]}
                    </div>

                    <div>
                      <div className="font-medium">{inv.client}</div>
                      <div className="text-xs text-slate-500">{inv.id} • {inv.items} items</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium">{inv.amount.toFixed(2)}</div>
                      <div className="text-xs text-slate-400">Due {inv.dueDate}</div>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs ${statusColors[inv.status]}`}>{inv.status}</span>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="py-8 text-center text-slate-500">No invoices found.</div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Details + Edit */}
          <div>
            {selected ? (
              <div className="bg-white p-6 rounded-2xl shadow-md">

                <h2 className="text-xl font-semibold mb-2">Invoice Details</h2>
                <div className="text-sm text-slate-500 mb-4">{selected.id}</div>

                <div className="font-medium">{selected.client}</div>
                <div className="text-slate-500 text-sm mb-4">Due: {selected.dueDate}</div>

                <div className="text-lg font-semibold mb-4">{selected.amount.toFixed(2)}</div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => handleEdit(selected)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-xl"
                  >
                    <Edit size={16} /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-xl"
                  >
                    <Trash size={16} /> Delete
                  </button>
                </div>

                {/* EDIT PANEL */}
                {editMode && (
                  <div className="mt-6 border-t pt-4">
                    <h3 className="font-semibold mb-3">Edit Invoice</h3>

                    <label className="block mb-3 text-sm">Client Name</label>
                    <input
                      value={editData.client}
                      onChange={(e) => setEditData({ ...editData, client: e.target.value })}
                      className="w-full border rounded-xl px-3 py-2 mb-3"
                    />

                    <label className="block mb-3 text-sm">Amount</label>
                    <input
                      type="number"
                      value={editData.amount}
                      onChange={(e) => setEditData({ ...editData, amount: +e.target.value })}
                      className="w-full border rounded-xl px-3 py-2 mb-3"
                    />

                    <label className="block mb-3 text-sm">Due Date</label>
                    <input
                      type="date"
                      value={editData.dueDate}
                      onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
                      className="w-full border rounded-xl px-3 py-2 mb-3"
                    />

                    <label className="block mb-3 text-sm">Status</label>
                    <select
                      value={editData.status}
                      onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                      className="w-full border rounded-xl px-3 py-2 mb-3"
                    >
                      <option>Paid</option>
                      <option>Pending</option>
                      <option>Overdue</option>
                    </select>

                    <button
                      onClick={saveEdit}
                      className="bg-green-600 text-white px-4 py-2 rounded-xl mt-3"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-slate-500 text-center">Select an invoice to view details</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
