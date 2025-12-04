
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaClipboardList,
  FaFileInvoiceDollar,
  FaPlus,
  FaDownload,
  FaFilePdf,
  FaFileExcel,
  FaTimes,
} from "react-icons/fa";

export default function BoqDashboard() {
  const [activeTab, setActiveTab] = useState("boq");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [items, setItems] = useState([
    { id: 1, desc: "Excavation in soil", category: "Civil", unit: "m³", qty: 120, rate: 350, amount: 120 * 350 },
    { id: 2, desc: "RCC Column Concrete", category: "Structure", unit: "m³", qty: 85, rate: 4200, amount: 85 * 4200 },
    { id: 3, desc: "Steel Reinforcement", category: "Material", unit: "kg", qty: 1500, rate: 70, amount: 1500 * 70 },
  ]);

  const totalAmount = useMemo(() => items.reduce((s, it) => s + Number(it.amount || 0), 0), [items]);
  const completedCount = useMemo(() => items.filter(i => i.rate && Number(i.rate) > 0).length, [items]);

  function openAddModal() {
    setEditingItem(null);
    setIsModalOpen(true);
  }
  function openEditModal(item) {
    setEditingItem(item);
    setIsModalOpen(true);
  }
  function saveItem(data) {
    if (data.id) {
      setItems(prev =>
        prev.map(it =>
          it.id === data.id ? { ...data, amount: Number(data.qty) * Number(data.rate) } : it
        )
      );
    } else {
      setItems(prev => [
        ...prev,
        { ...data, id: Date.now(), amount: Number(data.qty) * Number(data.rate) },
      ]);
    }
    setIsModalOpen(false);
  }
  function deleteItem(id) {
    if (!confirm("Delete this BOQ item?")) return;
    setItems(prev => prev.filter(i => i.id !== id));
  }

  const tabClass = t =>
    `px-3 py-2 rounded-lg text-sm font-medium ${
      activeTab === t ? "bg-blue-600 text-white" : "bg-white/70 text-gray-700"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <FaClipboardList className="text-blue-600" /> Project Report
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
          {/* Export Buttons — hidden on mobile */}
          <div className="hidden md:flex gap-2 bg-white rounded-xl p-1 shadow">
            <button className="px-3 py-2 rounded-lg flex items-center gap-2 text-sm border">
              <FaFileExcel className="text-green-600" /> Excel
            </button>
            <button className="px-3 py-2 rounded-lg flex items-center gap-2 text-sm border">
              <FaFilePdf className="text-red-600" /> PDF
            </button>
            <button className="px-3 py-2 rounded-lg flex items-center gap-2 text-sm border">
              <FaDownload /> Export
            </button>
          </div>

          <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 justify-center"
          >
            <FaPlus /> Add Item
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6 overflow-x-auto">
        <button onClick={() => setActiveTab("boq")} className={tabClass("boq")}>
          BOQ
        </button>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div className="bg-white shadow rounded-xl p-5">
          <div className="text-xs text-gray-500">Total Items</div>
          <div className="text-2xl font-bold">{items.length}</div>
        </motion.div>

        <motion.div className="bg-white shadow rounded-xl p-5">
          <div className="text-xs text-gray-500">Completed Entries</div>
          <div className="text-2xl font-bold">{completedCount}</div>
          <div className="mt-3 h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-blue-600 rounded"
              style={{
                width: `${Math.round((completedCount / Math.max(1, items.length)) * 100)}%`,
              }}
            ></div>
          </div>
        </motion.div>

        <motion.div className="bg-white shadow rounded-xl p-5">
          <div className="text-xs text-gray-500">Total Cost</div>
          <div className="text-2xl font-bold">₹ {totalAmount.toLocaleString()}</div>
        </motion.div>

        <motion.div className="bg-white shadow rounded-xl p-5">
          <div className="text-xs text-gray-500">Remaining Budget</div>
          <div className="text-2xl font-bold">
            ₹ {(5000000 - totalAmount).toLocaleString()}
          </div>
        </motion.div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden border">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="font-semibold">BOQ Items</div>
          <div className="text-xs text-gray-500 sm:block hidden">Editable fields</div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-right">Qty</th>
                <th className="p-3 text-right">Unit</th>
                <th className="p-3 text-right">Rate</th>
                <th className="p-3 text-right">Amount</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {items.map((it, idx) => (
                <tr key={it.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{it.desc}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded text-white bg-gray-700 text-xs">
                      {it.category}
                    </span>
                  </td>
                  <td className="p-3 text-right">{it.qty}</td>
                  <td className="p-3 text-right">{it.unit}</td>

                  <td className="p-3 text-right">
                    <input
                      type="number"
                      value={it.rate}
                      onChange={(e) => {
                        const r = e.target.value;
                        setItems((prev) =>
                          prev.map((x) =>
                            x.id === it.id
                              ? { ...x, rate: r, amount: Number(r) * Number(x.qty) }
                              : x
                          )
                        );
                      }}
                      className="w-24 p-1 border rounded text-right"
                    />
                  </td>

                  <td className="p-3 text-right font-semibold">
                    ₹ {Number(it.amount).toLocaleString()}
                  </td>

                  <td className="p-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEditModal(it)} className="px-2 py-1 bg-gray-100 rounded text-sm">
                        Edit
                      </button>
                      <button onClick={() => deleteItem(it.id)} className="px-2 py-1 bg-red-600 text-white rounded text-sm">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 text-right bg-gray-50 font-semibold">
          Total: ₹ {totalAmount.toLocaleString()}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <motion.div className="w-[90%] sm:w-full max-w-lg bg-white rounded-xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Add / Edit BOQ Item</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded hover:bg-gray-100">
                <FaTimes />
              </button>
            </div>

            <BoqForm
              initial={editingItem}
              onSave={(data) => saveItem(data)}
              onCancel={() => setIsModalOpen(false)}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

/* FORM */

function BoqForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(
    initial
      ? { ...initial }
      : { desc: "", category: "Civil", qty: 0, unit: "m³", rate: 0 }
  );

  const submit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      qty: Number(form.qty),
      rate: Number(form.rate),
    });
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        required
        value={form.desc}
        onChange={(e) => setForm((s) => ({ ...s, desc: e.target.value }))}
        placeholder="Description"
        className="w-full p-2 border rounded"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <select
          value={form.category}
          onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
          className="p-2 border rounded"
        >
          <option value="Civil">Civil</option>
          <option value="Structure">Structure</option>
          <option value="Material">Material</option>
          <option value="Electrical">Electrical</option>
        </select>

        <input
          required
          value={form.unit}
          onChange={(e) => setForm((s) => ({ ...s, unit: e.target.value }))}
          placeholder="Unit (e.g. m³ / kg)"
          className="p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <input
          type="number"
          required
          value={form.qty}
          onChange={(e) =>
            setForm((s) => ({ ...s, qty: Number(e.target.value) }))
          }
          placeholder="Qty"
          className="p-2 border rounded"
        />

        <input
          type="number"
          required
          value={form.rate}
          onChange={(e) =>
            setForm((s) => ({ ...s, rate: Number(e.target.value) }))
          }
          placeholder="Rate"
          className="p-2 border rounded"
        />

        <input
          readOnly
          value={Number(form.qty * form.rate)}
          className="p-2 border rounded bg-gray-100"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-gray-200">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
          Save
        </button>
      </div>
    </form>
  );
}
