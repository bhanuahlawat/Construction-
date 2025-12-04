import React, { useState } from "react";
//import SuperSidebar from "./components/SuperSidebar";
import { PlusCircle, Pencil, Trash2, Save, XCircle, LogIn } from "lucide-react";

// --- Data for Subscription Plans ---
const PLANS = ["Basic", "Pro", "Enterprise", "Trial"];

// ✅ Add Customer Account Form Component
const AddCustomerForm = ({ newCustomer, setNewCustomer, handleAddCustomer }) => (
  <div className="bg-white shadow-xl rounded-2xl p-6 mb-6 border-t-4 border-blue-500">
    <h2 className="text-xl font-bold text-blue-700 flex items-center mb-4">
      <PlusCircle size={20} className="mr-2" /> Provision New Customer Account
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
      <input
        type="text"
        placeholder="Customer/Org Name"
        value={newCustomer.name}
        onChange={(e) =>
          setNewCustomer({ ...newCustomer, name: e.target.value })
        }
        className="w-full border-gray-300 border-2 focus:border-blue-500 p-3 rounded-lg col-span-2"
      />
      <input
        type="text"
        placeholder="Account Admin Email"
        value={newCustomer.admin}
        onChange={(e) =>
          setNewCustomer({ ...newCustomer, admin: e.target.value })
        }
        className="w-full border-gray-300 border-2 focus:border-blue-500 p-3 rounded-lg"
      />
      <select
        value={newCustomer.plan}
        onChange={(e) =>
          setNewCustomer({ ...newCustomer, plan: e.target.value })
        }
        className="w-full border-gray-300 border-2 focus:border-blue-500 p-3 rounded-lg bg-white"
      >
        {PLANS.map((plan) => (
          <option key={plan} value={plan}>{plan}</option>
        ))}
      </select>
      <button
        onClick={handleAddCustomer}
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
      >
        <PlusCircle size={20} />
        <span>Add Customer</span>
      </button>
    </div>
  </div>
);

// ✅ Edit Customer Account Form Component
const EditCustomerForm = ({ editingCustomer, setEditingCustomer, handleSaveEdit }) => (
  <div className="bg-white shadow-xl rounded-2xl p-6 mb-6 border-t-4 border-yellow-500">
    <h2 className="text-xl font-bold text-yellow-700 flex items-center mb-4">
      <Pencil size={20} className="mr-2" /> Editing Account: {editingCustomer.name}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        type="text"
        value={editingCustomer.name}
        onChange={(e) =>
          setEditingCustomer({ ...editingCustomer, name: e.target.value })
        }
        className="w-full border-gray-300 border-2 focus:border-yellow-500 p-3 rounded-lg"
      />
      <input
        type="text"
        value={editingCustomer.admin}
        onChange={(e) =>
          setEditingCustomer({ ...editingCustomer, admin: e.target.value })
        }
        className="w-full border-gray-300 border-2 focus:border-yellow-500 p-3 rounded-lg"
      />
      <select
        value={editingCustomer.plan}
        onChange={(e) =>
          setEditingCustomer({ ...editingCustomer, plan: e.target.value })
        }
        className="w-full border-gray-300 border-2 focus:border-yellow-500 p-3 rounded-lg bg-white"
      >
        {PLANS.map((plan) => (
          <option key={plan} value={plan}>{plan}</option>
        ))}
      </select>
    </div>
    <div className="mt-6 flex gap-3">
      <button
        onClick={handleSaveEdit}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
      >
        <Save size={18} />
        <span>Save Changes</span>
      </button>
      <button
        onClick={() => setEditingCustomer(null)}
        className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 flex items-center space-x-2"
      >
        <XCircle size={18} />
        <span>Cancel</span>
      </button>
    </div>
  </div>
);

// ✅ Main Super Admin Component
const Projects = () => {
  const [customers, setCustomers] = useState([
    { id: 101, name: "GlobalTech Solutions", admin: "john.d@gts.com", plan: "Enterprise" },
    { id: 102, name: "AquaCorp Innovations", admin: "jane.s@aquacorp.net", plan: "Pro" },
    { id: 103, name: "Midwest Logistics Inc.", admin: "mark.w@midwest.org", plan: "Basic" },
  ]);

  const [newCustomer, setNewCustomer] = useState({ name: "", admin: "", plan: "Trial" });
  const [editingCustomer, setEditingCustomer] = useState(null);

  // --- Core CRUD Operations ---

  // ✅ Add Customer
  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.admin) {
      alert("Please fill in Customer Name and Admin Email!");
      return;
    }
    setCustomers([...customers, { id: customers.length + 101, ...newCustomer }]);
    setNewCustomer({ name: "", admin: "", plan: "Trial" });
  };

  // ✅ Delete Customer (Account Deactivation/Termination)
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to permanently delete this customer account (Tenant)? This action is irreversible.")) {
      setCustomers(customers.filter((c) => c.id !== id));
      // In a real app, this would trigger a massive DB cleanup/deactivation
      alert(`Customer ID ${id} deleted.`);
    }
  };

  // ✅ Edit Customer
  const handleEdit = (customer) => setEditingCustomer(customer);

  // ✅ Save Edit
  const handleSaveEdit = () => {
    if (!editingCustomer.name || !editingCustomer.admin) {
      alert("Please fill in all fields!");
      return;
    }
    setCustomers(customers.map((c) => (c.id === editingCustomer.id ? editingCustomer : c)));
    setEditingCustomer(null);
  };

  const getPlanClasses = (plan) => {
    switch (plan) {
      case "Enterprise": return "bg-purple-100 text-purple-700 ring-1 ring-purple-600/20";
      case "Pro": return "bg-green-100 text-green-700 ring-1 ring-green-600/20";
      case "Basic": return "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-600/20";
      case "Trial": return "bg-gray-100 text-gray-700 ring-1 ring-gray-600/20";
      default: return "bg-gray-100 text-gray-700 ring-1 ring-gray-600/20";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SuperSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 border-b pb-3">
          SaaS Customer Account Management (Super Admin)
        </h1>

        {/* Show edit form only when editing */}
        {editingCustomer && (
          <EditCustomerForm
            editingCustomer={editingCustomer}
            setEditingCustomer={setEditingCustomer}
            handleSaveEdit={handleSaveEdit}
          />
        )}

        {/* Always show add form (Provisioning) */}
        <AddCustomerForm
          newCustomer={newCustomer}
          setNewCustomer={setNewCustomer}
          handleAddCustomer={handleAddCustomer}
        />

        {/* Customers Table */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden mt-8">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-700">Active Customer Tenants</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account Admin</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscription Plan</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Super Admin Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{customer.id}</td>
                    <td className="px-6 py-4 font-semibold">{customer.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{customer.admin}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPlanClasses(customer.plan)}`}>
                        {customer.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center space-x-3 flex justify-center">
                      {/* EDIT (Modify Plan/Admin) */}
                      <button 
                        onClick={() => handleEdit(customer)} 
                        className="text-indigo-600 hover:text-indigo-900" 
                        title="Edit Account Details"
                      >
                        <Pencil size={18} />
                      </button>
                      {/* DELETE (Account Termination) */}
                      <button 
                        onClick={() => handleDelete(customer.id)} 
                        className="text-red-600 hover:text-red-900" 
                        title="Permanently Delete Account"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {customers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center p-6 text-gray-500 italic">
                      No customer accounts found. Provision a new one above!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;