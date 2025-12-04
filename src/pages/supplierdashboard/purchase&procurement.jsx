import React, { useState } from "react";
import {
  ClipboardList,
  FileText,
  Package,
  Truck,
  User,
} from "lucide-react";

const tabs = [
  "Purchase Requisition",
  "Request for Quotation",
  "Purchase Order",
  "Goods Receipt Note",
  "Vendor Management",
];

const Purchase = () => {
  const [activeTab, setActiveTab] = useState("Purchase Requisition");

  const inputClass =
    "border border-gray-300 bg-white rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700";

  const renderForm = () => {
    switch (activeTab) {
      case "Purchase Requisition":
        return (
          <div className="grid md:grid-cols-2 gap-4">
            <input className={inputClass} placeholder="Requisition No" />
            <input className={inputClass} placeholder="Requested By" />
            <input className={inputClass} placeholder="Department" />
            <input className={inputClass} placeholder="Material Name" />
            <input className={inputClass} placeholder="Quantity Required" />
            <input className={inputClass} placeholder="Required Date" type="date" />
            <textarea className={inputClass} placeholder="Purpose / Remarks"></textarea>
          </div>
        );

      case "Request for Quotation":
        return (
          <div className="grid md:grid-cols-2 gap-4">
            <input className={inputClass} placeholder="RFQ No" />
            <input className={inputClass} placeholder="Supplier Name" />
            <input className={inputClass} placeholder="Contact Email" type="email" />
            <input className={inputClass} placeholder="Material Name" />
            <input className={inputClass} placeholder="Quantity" />
            <input className={inputClass} placeholder="Quotation Due Date" type="date" />
            <textarea className={inputClass} placeholder="Remarks"></textarea>
          </div>
        );

      case "Purchase Order":
        return (
          <div className="grid md:grid-cols-2 gap-4">
            <input className={inputClass} placeholder="PO Number" />
            <input className={inputClass} placeholder="Supplier Name" />
            <input className={inputClass} placeholder="Material" />
            <input className={inputClass} placeholder="Quantity" />
            <input className={inputClass} placeholder="Unit Price" type="number" />
            <input className={inputClass} placeholder="Delivery Date" type="date" />
            <textarea className={inputClass} placeholder="Payment Terms"></textarea>
          </div>
        );

      case "Goods Receipt Note":
        return (
          <div className="grid md:grid-cols-2 gap-4">
            <input className={inputClass} placeholder="GRN Number" />
            <input className={inputClass} placeholder="PO Number" />
            <input className={inputClass} placeholder="Received Quantity" />
            <input className={inputClass} placeholder="Accepted Quantity" />
            <input className={inputClass} placeholder="Rejected Quantity" />
            <input className={inputClass} placeholder="Date of Receipt" type="date" />
            <textarea className={inputClass} placeholder="Remarks"></textarea>
          </div>
        );

      case "Vendor Management":
        return (
          <div className="grid md:grid-cols-2 gap-4">
            <input className={inputClass} placeholder="Vendor ID" />
            <input className={inputClass} placeholder="Vendor Name" />
            <input className={inputClass} placeholder="Contact Info" />
            <input className={inputClass} placeholder="GST / PAN" />
            <input className={inputClass} placeholder="Bank Details" />
            <input className={inputClass} placeholder="Category" />
            <input className={inputClass} placeholder="Rating" type="number" />
            <select className={inputClass}>
              <option value="">Blacklist Status</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  const iconForTab = (tab) => {
    switch (tab) {
      case "Purchase Requisition":
        return <ClipboardList size={16} />;
      case "Request for Quotation":
        return <FileText size={16} />;
      case "Purchase Order":
        return <Package size={16} />;
      case "Goods Receipt Note":
        return <Truck size={16} />;
      case "Vendor Management":
        return <User size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        Purchase & Procurement Management
      </h2>

      {/* Tabs Section */}
      <div className="flex flex-wrap gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold shadow-sm transition-all duration-300 ${
              activeTab === tab
                ? "bg-indigo-100 text-indigo-900 shadow-md border border-indigo-300"
                : "bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200"
            }`}
          >
            {iconForTab(tab)}
            {tab}
          </button>
        ))}
      </div>

      {/* Form Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {activeTab}
        </h2>
        {renderForm()}

        <div className="flex justify-end mt-6">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-sm">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
