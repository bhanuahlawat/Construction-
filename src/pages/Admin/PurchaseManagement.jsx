import React, { useState } from "react";
import {
  ClipboardList, // Purchase Requisition
  FileText,      // Request for Quotation
  Package,       // Purchase Order
  Truck,         // Goods Receipt Note
  User,          // Vendor Management
  Wrench,        // Work Order Request (New)
  Receipt,       // Vendor Running Bill (RA) (New)
  Upload,        // For attachment button
  Tag,           // For Vendor Specific Section
} from "lucide-react";

// The full list of procurement stages/management areas
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
  // State for a simple loading/saving indicator
  const [isSaving, setIsSaving] = useState(false);
  // State to handle conditional rendering in Vendor Management tab
  const [vendorEntityType, setVendorEntityType] = useState(""); 
  
  // New state object for a more realistic form handling (though values aren't fully linked yet)
  const [vendorDetails, setVendorDetails] = useState({
      vendorId: '',
      entityType: '',
      legalName: '',
      contactEmail: '',
      taxId: '',
      bankDetails: '',
      category: '',
      complianceStatus: '',
      // Vendor-specific
      materialSupplyArea: '',
      avgLeadTimeDays: '',
      // Subcontractor-specific
      specializedTrade: '',
      maxLaborStrength: '',
      safetyRating: '',
      majorProjects: '',
  });

  const inputClass =
    "border border-gray-300 bg-white rounded-lg px-3 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 text-gray-700 shadow-sm";

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsSaving(false);
      console.log(`Saving data for: ${activeTab}`, activeTab === "Vendor Management" ? vendorDetails : 'Form Data');
      // In a real app, you would reset the form state here
    }, 1500);
  };

  const renderForm = () => {
    switch (activeTab) {
      case "Purchase Requisition":
        // Addresses requirement 'b' (based on needs) and 'e'
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <input className={inputClass} placeholder="Requisition No" />
            <input className={inputClass} placeholder="Requested By" />
            <input className={inputClass} placeholder="Department" />
            <input className={inputClass} placeholder="Material Name / Specification" />
            <input className={inputClass} placeholder="Quantity Required" type="number" min="1" />
            <input className={inputClass} placeholder="Required Date" type="date" />
            <textarea className={`${inputClass} md:col-span-2 lg:col-span-3`} rows="3" placeholder="Purpose / Justification (BOQ Reference)"></textarea>
          </div>
        );

      case "Request for Quotation":
        // Addresses requirement 'g'
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input className={inputClass} placeholder="RFQ No" />
            <input className={inputClass} placeholder="Target Vendor Name(s)" />
            <input className={inputClass} placeholder="Material/Service Requested" />
            <input className={inputClass} placeholder="Quantity" type="number" min="1" />
            <input className={inputClass} placeholder="Quotation Due Date" type="date" />
            <select className={inputClass}>
              <option value="">Quotation Format Type</option>
              <option value="Standard ERP">Standard ERP Format</option>
              <option value="Free Form">Free Form Upload</option>
            </select>
            <textarea className={`${inputClass} md:col-span-2`} rows="3" placeholder="Scope of Work / Instructions"></textarea>
          </div>
        );

      case "Purchase Order":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <input className={inputClass} placeholder="PO Number" />
            <input className={inputClass} placeholder="Supplier Name" />
            <input className={inputClass} placeholder="Material / Item Description" />
            <input className={inputClass} placeholder="Quantity Ordered" type="number" min="1" />
            <input className={inputClass} placeholder="Unit Price" type="number" step="0.01" />
            <input className={`${inputClass} bg-gray-100 font-semibold`} placeholder="Total PO Value" readOnly />
            <input className={inputClass} placeholder="Confirmed Delivery Date" type="date" />
            <textarea className={`${inputClass} md:col-span-2 lg:col-span-3`} rows="3" placeholder="Payment & Warranty Terms"></textarea>
          </div>
        );

      case "Goods Receipt Note":
        // Addresses requirement 'f' (supporting document linkage)
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input className={inputClass} placeholder="GRN Number" />
            <input className={inputClass} placeholder="PO Number Reference" />
            <input className={inputClass} placeholder="Material Received" />
            <input className={inputClass} placeholder="Received Quantity" type="number" min="0" />
            <input className={inputClass} placeholder="Inspection Report ID" />
            <input className={inputClass} placeholder="Date of Receipt" type="date" />
            <input className={inputClass} placeholder="Accepted Quantity" type="number" min="0" />
            <input className={inputClass} placeholder="Rejected Quantity" type="number" min="0" />
            <textarea className={`${inputClass} md:col-span-2`} rows="3" placeholder="Remarks on Quality or Discrepancy"></textarea>
          </div>
        );

      case "Vendor Management":
        return (
          <div className="space-y-6">
            {/* Section 1: General Details & Entity Type */}
            <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">
                  General Registration Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <input className={`${inputClass} bg-gray-100`} placeholder="Vendor ID (Auto-Generated)" readOnly />
                <select 
                  className={inputClass} 
                  value={vendorEntityType}
                  onChange={(e) => setVendorEntityType(e.target.value)}
                >
                  <option value="">-- Select Entity Type --</option>
                  <option value="Vendor">Vendor (Material/Goods)</option>
                  <option value="Subcontractor">Subcontractor (Services/Work)</option>
                </select>
                <input className={inputClass} placeholder="Legal Name" />
                <input className={inputClass} placeholder="Primary Contact Email" type="email" />
                <input className={inputClass} placeholder="GST / VAT / PAN No." />
                <input className={inputClass} placeholder="Bank A/C Details (for payment)" />
              </div>
            </div>

            {/* Section 2: Vendor/Supplier Specific Details (Material/Goods) */}
            {(vendorEntityType === "Vendor" || vendorEntityType === "") && (
              <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-inner">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2 border-b border-blue-200 pb-2">
                  <Tag size={20} /> Vendor / Material Supplier Specifics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <input className={inputClass} placeholder="Key Material/Commodity Supplied" />
                  <input className={inputClass} placeholder="Primary Supply Location" />
                  <input className={inputClass} placeholder="Average Lead Time (Days)" type="number" min="1" />
                  <input className={inputClass} placeholder="Annual Capacity (Units)" type="number" min="0" />
                  <input className={inputClass} placeholder="Quality Certifications (e.g., ISO)" />
                  <select className={inputClass}>
                    <option value="">Supply Area / Region</option>
                    <option value="Local">Local</option>
                    <option value="National">National</option>
                    <option value="International">International</option>
                  </select>
                </div>
              </div>
            )}
            
            {/* Section 3: Subcontractor Specific Details (Services/Work) */}
            {vendorEntityType === "Subcontractor" && (
              <div className="p-5 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg shadow-inner">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2 border-b border-yellow-200 pb-2">
                  <Wrench size={20} /> Subcontractor / Services Specifics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <input className={inputClass} placeholder="Specialized Trade / Disciplines" />
                  <input className={inputClass} placeholder="Max Labor Strength (Approx)" type="number" min="1" />
                  <input className={inputClass} placeholder="Safety Rating / OSHA Compliance" />
                  <input className={inputClass} placeholder="Professional Indemnity Insurance Value" type="number" step="0.01" />
                  <textarea className={`${inputClass} md:col-span-2 lg:col-span-3`} rows="2" placeholder="Major Projects Undertaken (Reference)"></textarea>
                </div>
              </div>
            )}

            {/* Section 4: Compliance and Actions */}
            <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">
                    Compliance & Rating
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <input className={inputClass} placeholder="Performance Rating (1-5)" type="number" min="1" max="5" />
                    <select className={inputClass}>
                        <option value="">Compliance Status</option>
                        <option value="Compliant">Compliant</option>
                        <option value="Non-Compliant">Non-Compliant</option>
                        <option value="Blacklisted">Blacklisted</option>
                    </select>
                    <button className="bg-blue-600 text-white flex items-center justify-center gap-2 px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-md">
                        <Upload size={18} /> Upload Registration Documents
                    </button>
                </div>
            </div>

          </div>
        );

      case "Work Order Request":
        // Addresses requirements 'd', 'l', and 'm'
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <input className={inputClass} placeholder="Work Order No" />
            <input className={inputClass} placeholder="BOQ Reference ID" />
            <select className={inputClass}>
              <option value="">Work Order Type</option>
              <option value="Material & Labour">Material & Labour</option>
              <option value="Labour Only">Labour Only</option>
            </select>
            <input className={inputClass} placeholder="Contractor/Vendor" />
            <input className={inputClass} placeholder="Start Date" type="date" />
            <input className={inputClass} placeholder="Target Completion Date" type="date" />
            <select className={inputClass}>
              <option value="">Trigger Type</option>
              <option value="Manual">Manual (Admin)</option>
              <option value="Automatic">Automatic (Approval Trigger)</option>
            </select>
            <input className={inputClass} placeholder="Initial Value (if fixed)" type="number" step="0.01" />
            <textarea className={`${inputClass} md:col-span-2 lg:col-span-3`} rows="3" placeholder="Scope / Customization Details / Amendments (if applicable)"></textarea>
          </div>
        );

      case "Vendor Running Bill (RA)":
        // Addresses requirements 'h', 'i', 'j', and 'k'
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <input className={inputClass} placeholder="RA Bill Number" />
            <input className={inputClass} placeholder="Contract/WO ID" />
            <input className={inputClass} placeholder="Bill Period Start Date" type="date" />
            <input className={inputClass} placeholder="Bill Period End Date" type="date" />

            <input className={inputClass} placeholder="Amount Claimed (Gross)" type="number" step="0.01" />
            <input className={inputClass} placeholder="Retention Amount (JMS/RFI)" type="number" step="0.01" />
            <input className={inputClass} placeholder="Holding Deduction Amount (Snags)" type="number" step="0.01" />
            <input className={`${inputClass} bg-indigo-50 font-extrabold text-indigo-800`} placeholder="Net Amount Payable" readOnly />

            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center gap-4">
              <input type="file" id="bill-attachment" className="hidden" accept=".pdf,.doc,.xlsx" />
              <label htmlFor="bill-attachment" className="bg-indigo-500 text-white flex items-center justify-center gap-2 px-4 py-3 rounded-lg hover:bg-indigo-600 transition-all shadow-md cursor-pointer">
                <Upload size={18} /> Upload Contractor Invoice
              </label>
              <p className="text-sm text-gray-500">Attach cumulative sheets, checklist, reconciliation docs.</p>
            </div>

            <textarea className={`${inputClass} md:col-span-2 lg:col-span-3`} rows="3" placeholder="Payment Advice / Audit Remarks"></textarea>
          </div>
        );

      default:
        return null;
    }
  };

  const iconForTab = (tab) => {
    const iconSize = 18;
    switch (tab) {
      case "Purchase Requisition":
        return <ClipboardList size={iconSize} />;
      case "Request for Quotation":
        return <FileText size={iconSize} />;
      case "Purchase Order":
        return <Package size={iconSize} />;
      case "Goods Receipt Note":
        return <Truck size={iconSize} />;
      case "Vendor Management":
        return <User size={iconSize} />;
      case "Work Order Request":
        return <Wrench size={iconSize} />;
      case "Vendor Running Bill (RA)":
        return <Receipt size={iconSize} />;
      default:
        return null;
    }
  };

  return (
    // Applied max-w-5xl (a fixed width on large screens) and mx-auto (for centering)
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700">
          Procurement Process Hub
        </h1>
        <p className="text-gray-500 mt-1">Manage the complete P2P cycle from request to payment.</p>
      </header>

      {/* Tabs Section - Responsive and Scrollable */}
      <div className="flex flex-nowrap overflow-x-auto gap-3 pb-4 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center flex-shrink-0 gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap shadow-md border-2 
              ${activeTab === tab
                ? "bg-indigo-600 text-white border-indigo-700 transform scale-[1.02]"
                : "bg-white text-gray-600 border-gray-200 hover:bg-indigo-50 hover:text-indigo-800"
              }`}
          >
            {iconForTab(tab)}
            {tab}
          </button>
        ))}
      </div>

      {/* Form Section */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-100 transition-all duration-500">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 flex items-center gap-2">
          {iconForTab(activeTab)}
          {activeTab} Entry Form
        </h2>
        {renderForm()}

        <div className="flex justify-end mt-8">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center justify-center gap-3 px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg 
              ${isSaving
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 active:ring-4 active:ring-indigo-300"
              }`}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Submit Record"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Use App as the default export for the single-file React environment
export default App;
