import React, { useState } from "react";
import {
  ClipboardList,
  FileText,
  Package,
  Truck,
  User,
  Wrench,
  Receipt,
  Upload,
  Tag,
} from "lucide-react";

// Tabs List
const tabs = [
  "Purchase Requisition",
  "Request for Quotation",
  "Purchase Order",
  "Goods Receipt Note",
  "Vendor Management",
  "Work Order Request",
  "Vendor Running Bill (RA)",
];

const App = () => {
  const [activeTab, setActiveTab] = useState("Purchase Requisition");
  const [isSaving, setIsSaving] = useState(false);
  const [vendorEntityType, setVendorEntityType] = useState("");

  const inputClass =
    "border border-gray-300 bg-white rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 text-gray-700 shadow-sm";

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      console.log("Saved");
    }, 1500);
  };

  // ICON HANDLER
  const iconForTab = (tab) => {
    const size = 18;
    switch (tab) {
      case "Purchase Requisition": return <ClipboardList size={size} />;
      case "Request for Quotation": return <FileText size={size} />;
      case "Purchase Order": return <Package size={size} />;
      case "Goods Receipt Note": return <Truck size={size} />;
      case "Vendor Management": return <User size={size} />;
      case "Work Order Request": return <Wrench size={size} />;
      case "Vendor Running Bill (RA)": return <Receipt size={size} />;
      default: return null;
    }
  };

  // FORM SWITCH
  const renderForm = () => {
    switch (activeTab) {
      case "Purchase Requisition":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input className={inputClass} placeholder="Requisition No" />
            <input className={inputClass} placeholder="Requested By" />
            <input className={inputClass} placeholder="Department" />
            <input className={inputClass} placeholder="Material Name / Specification" />
            <input className={inputClass} placeholder="Quantity Required" type="number" />
            <input className={inputClass} type="date" placeholder="Required Date" />
            <textarea
              className={`${inputClass} sm:col-span-2 lg:col-span-3`}
              rows={3}
              placeholder="Purpose / BOQ Reference"
            ></textarea>
          </div>
        );

      case "Request for Quotation":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className={inputClass} placeholder="RFQ No" />
            <input className={inputClass} placeholder="Target Vendor Names" />
            <input className={inputClass} placeholder="Material/Service" />
            <input className={inputClass} type="number" placeholder="Quantity" />
            <input className={inputClass} type="date" placeholder="Due Date" />
            <select className={inputClass}>
              <option>Select Quotation Format</option>
              <option>Standard ERP</option>
              <option>Free Format</option>
            </select>
            <textarea
              className={`${inputClass} sm:col-span-2`}
              rows={3}
              placeholder="Scope / Instructions"
            ></textarea>
          </div>
        );

      case "Purchase Order":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input className={inputClass} placeholder="PO Number" />
            <input className={inputClass} placeholder="Supplier Name" />
            <input className={inputClass} placeholder="Item Description" />
            <input className={inputClass} type="number" placeholder="Quantity" />
            <input className={inputClass} type="number" step="0.01" placeholder="Unit Price" />
            <input className={`${inputClass} bg-gray-100 font-semibold`} placeholder="Total Value" readOnly />
            <input className={inputClass} type="date" placeholder="Delivery Date" />
            <textarea
              className={`${inputClass} sm:col-span-2 lg:col-span-3`}
              rows={3}
              placeholder="Payment & Warranty Terms"
            ></textarea>
          </div>
        );

      case "Goods Receipt Note":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className={inputClass} placeholder="GRN Number" />
            <input className={inputClass} placeholder="PO Reference" />
            <input className={inputClass} placeholder="Material Received" />
            <input className={inputClass} type="number" placeholder="Quantity" />
            <input className={inputClass} placeholder="Inspection ID" />
            <input className={inputClass} type="date" placeholder="Receipt Date" />
            <textarea
              className={`${inputClass} sm:col-span-2`}
              rows={3}
              placeholder="Quality Remarks"
            ></textarea>
          </div>
        );

      case "Vendor Management":
        return (
          <div className="space-y-6">

            {/* General Section */}
            <div className="p-5 bg-white border rounded-lg">
              <h3 className="text-lg font-bold text-gray-700 mb-3">General Details</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <input className={`${inputClass} bg-gray-100`} placeholder="Vendor ID (Auto)" readOnly />

                <select
                  className={inputClass}
                  value={vendorEntityType}
                  onChange={(e) => setVendorEntityType(e.target.value)}
                >
                  <option>Select Entity Type</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Subcontractor">Subcontractor</option>
                </select>

                <input className={inputClass} placeholder="Legal Name" />
                <input className={inputClass} type="email" placeholder="Email" />
                <input className={inputClass} placeholder="GST / PAN" />
                <input className={inputClass} placeholder="Bank Details" />
              </div>
            </div>

            {/* Vendor Section */}
            {(vendorEntityType === "Vendor" || vendorEntityType === "") && (
              <div className="p-5 bg-blue-50 border-l-4 border-blue-600 rounded-lg">
                <h3 className="text-lg font-bold text-blue-700 flex items-center gap-2">
                  <Tag size={18} /> Vendor Specific
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                  <input className={inputClass} placeholder="Key Material" />
                  <input className={inputClass} placeholder="Primary Location" />
                  <input className={inputClass} placeholder="Lead Time (Days)" />
                </div>
              </div>
            )}

            {/* Subcontractor Form */}
            {vendorEntityType === "Subcontractor" && (
              <div className="p-5 bg-yellow-50 border-l-4 border-yellow-600 rounded-lg">
                <h3 className="text-lg font-bold text-yellow-700 flex items-center gap-2">
                  <Wrench size={18} /> Subcontractor Specific
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                  <input className={inputClass} placeholder="Trade" />
                  <input className={inputClass} placeholder="Labor Strength" />
                  <input className={inputClass} placeholder="Safety Rating" />
                </div>
              </div>
            )}
          </div>
        );

      case "Work Order Request":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input className={inputClass} placeholder="Work Order No" />
            <input className={inputClass} placeholder="BOQ Reference" />
            <select className={inputClass}>
              <option>Material & Labour</option>
              <option>Labour Only</option>
            </select>
            <input className={inputClass} placeholder="Vendor Name" />
            <input className={inputClass} type="date" placeholder="Start Date" />
            <input className={inputClass} type="date" placeholder="End Date" />
          </div>
        );

      case "Vendor Running Bill (RA)":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input className={inputClass} placeholder="RA Bill No" />
            <input className={inputClass} placeholder="WO ID" />
            <input className={inputClass} type="date" placeholder="Start Date" />
            <input className={inputClass} type="date" placeholder="End Date" />
            <input className={inputClass} placeholder="Gross Amount" />
            <input className={inputClass} placeholder="Retention" />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen max-w-screen mx-auto">

      {/* Page Header */}
      <header className="mb-6">
        <h1 className="text-2xl md:text-4xl font-extrabold text-indigo-700">
          Procurement Process Hub
        </h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base">
          Manage the entire P2P cycle smoothly.
        </p>
      </header>

      {/* Tabs - Fully Responsive */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl flex-shrink-0 border transition-all
              ${
                activeTab === tab
                  ? "bg-indigo-600 text-white border-indigo-700 scale-105 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
              }`}
          >
            {iconForTab(tab)}
            {tab}
          </button>
        ))}
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
          {iconForTab(activeTab)} {activeTab} Entry Form
        </h2>

        {renderForm()}

        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-8 py-3 rounded-xl text-white font-bold shadow-md transition-all
              ${
                isSaving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
          >
            {isSaving ? "Processing..." : "Submit Record"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
