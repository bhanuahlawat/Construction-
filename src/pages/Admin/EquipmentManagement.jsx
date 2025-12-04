import React, { useState } from "react";

export default function EquipmentManagement() {
  const [form, setForm] = useState({
    equipmentName: "",
    issuedTo: "",
    issueDate: "",
    expectedReturnDate: "",
  });

  const [records, setRecords] = useState([
    {
      id: 1,
      equipmentName: "Excavator CAT320",
      issuedTo: "Amit Sharma",
      issueDate: "2025-10-01",
      expectedReturnDate: "2025-10-10",
      returned: false,
    },
    {
      id: 2,
      equipmentName: "Concrete Mixer X120",
      issuedTo: "Ravi Kumar",
      issueDate: "2025-09-28",
      expectedReturnDate: "2025-10-05",
      returned: true,
      actualReturnDate: "2025-10-06",
    },
    {
      id: 3,
      equipmentName: "Welding Machine WM-450",
      issuedTo: "Suresh Patel",
      issueDate: "2025-10-05",
      expectedReturnDate: "2025-10-12",
      returned: false,
    },
  ]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecords((prev) => [
      { ...form, id: Date.now(), returned: false },
      ...prev,
    ]);
    setForm({
      equipmentName: "",
      issuedTo: "",
      issueDate: "",
      expectedReturnDate: "",
    });
  };

  const markReturned = (id, actualReturnDate) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, returned: true, actualReturnDate } : r
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Equipment Issue & Return
      </h1>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6 bg-white p-4 rounded shadow"
      >
        <input
          name="equipmentName"
          value={form.equipmentName}
          onChange={handleChange}
          placeholder="Equipment name"
          className="border p-2 rounded"
          required
        />
        <input
          name="issuedTo"
          value={form.issuedTo}
          onChange={handleChange}
          placeholder="Issued to"
          className="border p-2 rounded"
          required
        />
        <input
          name="issueDate"
          type="date"
          value={form.issueDate}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="expectedReturnDate"
          type="date"
          value={form.expectedReturnDate}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Record
        </button>
      </form>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-2 border">Equipment</th>
              <th className="p-2 border">Issued To</th>
              <th className="p-2 border">Issue Date</th>
              <th className="p-2 border">Expected Return</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="text-center hover:bg-gray-50">
                <td className="p-2 border">{r.equipmentName}</td>
                <td className="p-2 border">{r.issuedTo}</td>
                <td className="p-2 border">{r.issueDate}</td>
                <td className="p-2 border">{r.expectedReturnDate}</td>
                <td
                  className={`p-2 border font-semibold ${
                    r.returned ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {r.returned ? "Returned" : "Issued"}
                </td>
                <td className="p-2 border">
                  {!r.returned ? (
                    <button
                      onClick={() => {
                        const actual = new Date().toISOString().slice(0, 10);
                        markReturned(r.id, actual);
                      }}
                      className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Mark Returned
                    </button>
                  ) : (
                    <span className="text-sm text-gray-600">
                      Returned on {r.actualReturnDate}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
