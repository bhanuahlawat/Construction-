import React, { useState } from "react";

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      number: "INV-001",
      client: "John Doe",
      amount: 500,
      status: "Paid",
      dueDate: "2025-10-01",
    },
    {
      id: 2,
      number: "INV-002",
      client: "Alice Brown",
      amount: 1200,
      status: "Pending",
      dueDate: "2025-10-10",
    },
    {
      id: 3,
      number: "INV-003",
      client: "Bob Lee",
      amount: 750,
      status: "Overdue",
      dueDate: "2025-09-20",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    number: "",
    client: "",
    amount: "",
    status: "Pending",
    dueDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setFormData({
      id: null,
      number: "",
      client: "",
      amount: "",
      status: "Pending",
      dueDate: "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEdit = (invoice) => {
    setFormData(invoice);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      setInvoices(invoices.filter((inv) => inv.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setInvoices(
        invoices.map((inv) => (inv.id === formData.id ? { ...formData } : inv))
      );
    } else {
      setInvoices([...invoices, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const statusColors = {
    Paid: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Overdue: "bg-red-100 text-red-700",
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Invoices</h2>
        <button
          onClick={handleAdd}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          + Add Invoice
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Invoice #</th>
              <th className="p-3">Client</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Due Date</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3 font-medium">{inv.number}</td>
                <td className="p-3">{inv.client}</td>
                <td className="p-3">${inv.amount}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusColors[inv.status]
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="p-3">{inv.dueDate}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => handleEdit(inv)}
                    className="text-blue-600 hover:underline mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(inv.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {invoices.length === 0 && (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  No invoices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit Invoice" : "Add New Invoice"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Invoice Number
                </label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 border rounded-md p-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Client</label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 border rounded-md p-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 border rounded-md p-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-md p-2 text-sm"
                >
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Overdue</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 border rounded-md p-2 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {isEditing ? "Update Invoice" : "Save Invoice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicesPage;
