import React, { useState, useMemo, useCallback } from 'react';
import { 
  FaWarehouse, 
  FaDollarSign, 
  FaSignOutAlt, 
  FaUndo, 
  FaFilePdf, 
  FaSync,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa'; // Reverted to standard import!
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';


// --- Global State Mock Data ---
const initialInventory = [
  { id: 101, name: "Concrete M40", unit: "CUM", currentStock: 850, minLevel: 100, unitCost: 120 },
  { id: 102, name: "Reinforcement Steel (T16)", unit: "KG", currentStock: 15000, minLevel: 25000, unitCost: 0.8 },
  { id: 103, name: "Cement Bags (50kg)", unit: "BAG", currentStock: 500, minLevel: 100, unitCost: 6 },
  { id: 104, name: "Formwork Sheets", unit: "SQM", currentStock: 1200, minLevel: 500, unitCost: 5 },
];

const initialIssueLog = [
  { id: 1, materialId: 102, name: "Reinforcement Steel (T16)", recipient: "Subcontractor Alpha", date: "2025-10-20", quantity: 5000, value: 4000, returned: 500, returnable: true, challan: 'CH-001' },
  { id: 2, materialId: 101, name: "Concrete M40", recipient: "In-House Team", date: "2025-10-21", quantity: 100, value: 12000, returned: 0, returnable: false, challan: 'CH-002' },
  { id: 3, materialId: 104, name: "Formwork Sheets", recipient: "Subcontractor Beta", date: "2025-10-22", quantity: 300, value: 1500, returned: 100, returnable: true, challan: 'CH-003' },
];

const reconciliationData = [
    { recipient: "Alpha", issued: 5000, consumed: 4000, reconciled: 1000 },
    { recipient: "Beta", issued: 300, consumed: 200, reconciled: 100 },
    { recipient: "In-House", issued: 100, consumed: 95, reconciled: 5 },
];

// --- Sub-components ---

// Component for the Top-Level KPI Cards
const KPICard = ({ title, value, icon: Icon, color }) => (
  <div className={`bg-white p-6 rounded-2xl shadow-xl transition-shadow duration-300 hover:shadow-2xl border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold uppercase text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <Icon className={`text-4xl opacity-50 ${color.replace('border-l-4', '').trim()}`} size={40} />
    </div>
  </div>
);

// Component for the Return Modal (Mock functionality)
const ReturnMaterialModal = ({ isOpen, onClose, log, onReturn }) => {
    const [selectedLogId, setSelectedLogId] = useState('');
    const [returnQuantity, setReturnQuantity] = useState(0);

    if (!isOpen) return null;

    const availableReturns = log.filter(item => item.returnable && item.quantity > item.returned);
    const selectedItem = availableReturns.find(item => item.id === parseInt(selectedLogId));
    
    const maxReturn = selectedItem ? selectedItem.quantity - selectedItem.returned : 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const qty = parseFloat(returnQuantity);
        if (selectedItem && qty > 0 && qty <= maxReturn) {
            onReturn(selectedLogId, qty);
            onClose();
        } else {
            console.error("Invalid return quantity.");
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
                <h3 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
                    <FaUndo className="mr-2" size={24} /> Return Unused Material
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Issued Item (Max Returnable: {maxReturn})</label>
                        <select
                            value={selectedLogId}
                            onChange={(e) => {
                                setSelectedLogId(e.target.value);
                                setReturnQuantity(0); // Reset quantity on change
                            }}
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg text-sm"
                        >
                            <option value="">-- Select Issued Challan --</option>
                            {availableReturns.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.challan} - {item.name} ({item.quantity - item.returned})
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity to Return</label>
                        <input
                            type="number"
                            min="1"
                            max={maxReturn}
                            step="0.1"
                            value={returnQuantity}
                            onChange={(e) => setReturnQuantity(e.target.value)}
                            required
                            disabled={!selectedLogId}
                            className="w-full border border-gray-300 p-3 rounded-lg text-lg font-bold"
                            placeholder="Enter return quantity"
                        />
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-medium transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!selectedLogId || returnQuantity <= 0 || returnQuantity > maxReturn}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium disabled:opacity-50 transition"
                        >
                            Process Return
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- Main Component ---
const InventoryManager = () => {
  // Inventory state: current stock, minimum level, etc.
  const [inventory, setInventory] = useState(initialInventory);
  // Issue log state: tracks what was issued to whom
  const [issueLog, setIssueLog] = useState(initialIssueLog);
  // UI State
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);

  // --- Calculations for KPIs ---
  const totalStockValue = useMemo(() => 
    inventory.reduce((sum, item) => sum + item.currentStock * item.unitCost, 0).toFixed(2), [inventory]
  );

  const totalIssuedValue = useMemo(() => 
    issueLog.reduce((sum, item) => sum + item.value, 0).toFixed(2), [issueLog]
  );
  
  const pendingReturnCount = useMemo(() => 
    issueLog.filter(item => item.returnable && item.quantity > item.returned).length
  , [issueLog]);

  const lowStockCount = useMemo(() => 
    inventory.filter(item => item.currentStock < item.minLevel).length
  , [inventory]);

  // --- Handlers ---
  
  // Handles the return of unused materials (m, n, q)
  const handleMaterialReturn = useCallback((logId, quantity) => {
    // Find the log item before updating the state
    const logItem = issueLog.find(item => item.id === parseInt(logId));

    if (!logItem) {
        console.error(`Log item with ID ${logId} not found.`);
        return;
    }
    
    // 1. Update the returned quantity in the issue log (q)
    setIssueLog(prevLog => 
      prevLog.map(item => {
        if (item.id === parseInt(logId)) {
          return { ...item, returned: item.returned + quantity };
        }
        return item;
      })
    );

    // 2. Update the main inventory stock (n)
    setInventory(prevInv => 
        prevInv.map(invItem => {
            if (invItem.id === logItem.materialId) {
                return { ...invItem, currentStock: invItem.currentStock + quantity };
            }
            return invItem;
        })
    );
    
    console.log(`Processed return of ${quantity} ${logItem.name} for log ID ${logId}. (Inventory updated)`);
  }, [issueLog]);

  // Mock function to simulate generating a PDF delivery challan (p)
  const generateChallanPDF = useCallback((challanId) => {
    // In a real app, this would make a service call to generate and download a PDF
    console.log(`Generating Delivery Challan PDF for ${challanId}...`);
    alert(`Mock PDF Challan ${challanId} generated for legal and compliance purposes.`);
  }, []);
  
  // Mock function for Material Reconcilition Report (t)
  const generateReconciliationReport = useCallback(() => {
      console.log("Generating Reconciliation Report...");
      alert("Reconciliation Report (Issued vs. Consumed) generated to minimize wastage.");
  }, []);


  // --- Render Functions ---

  const renderStockStatus = (stock, min) => {
    const status = stock >= min ? "On Track" : "Low Stock";
    const color = stock >= min ? "text-green-600" : "text-red-600";
    const Icon = stock >= min ? FaCheckCircle : FaExclamationTriangle;

    return (
      <span className={`flex items-center font-semibold ${color}`}>
        <Icon className="mr-2" size={14} />
        {status}
      </span>
    );
  };

  const ReconciliationChart = () => (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <FaSync className="text-purple-600 mr-2" size={20} /> Material Reconciliation Report (Mock)
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={reconciliationData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="recipient" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip contentStyle={{ backgroundColor: "#f9fafb", border: "none", borderRadius: "8px" }} />
          <Bar dataKey="issued" fill="#4f46e5" name="Issued Quantity" radius={[4, 4, 0, 0]} />
          <Bar dataKey="consumed" fill="#10b981" name="Estimated Consumed" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <button 
        onClick={generateReconciliationReport}
        className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg transition"
      >
        Generate Full Reconciliation Report
      </button>
    </div>
  );

  return (
    <div className="space-y-10 p-4 sm:p-8 bg-gray-50 min-h-screen">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center p-4 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-700 text-white shadow-xl">
        <h1 className="text-3xl font-extrabold tracking-wide flex items-center gap-3">
          <FaWarehouse size={32} /> Inventory & Materials Management
        </h1>
        <button 
          onClick={() => setIsReturnModalOpen(true)}
          className="flex items-center gap-2 mt-4 sm:mt-0 bg-white text-teal-700 font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-teal-100 transition"
        >
          <FaUndo size={16} /> Process Material Return
        </button>
      </header>

      {/* 1. KPIs & Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Stock Value" 
          value={`$${totalStockValue}`} 
          icon={FaDollarSign} 
          color="border-l-4 border-teal-600 text-teal-600"
        />
        <KPICard 
          title="Total Issued Value" 
          value={`$${totalIssuedValue}`} 
          icon={FaSignOutAlt} 
          color="border-l-4 border-indigo-600 text-indigo-600"
        />
        <KPICard 
          title="Pending Returns" 
          value={pendingReturnCount} 
          icon={FaUndo} 
          color="border-l-4 border-yellow-600 text-yellow-600"
        />
        <KPICard 
          title="Low Stock Items" 
          value={lowStockCount} 
          icon={FaExclamationTriangle} 
          color="border-l-4 border-red-600 text-red-600"
        />
      </section>

      {/* 2. Inventory Stock Levels & Alerts (a, b, c, d, e, f, g) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 shadow-xl rounded-2xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaWarehouse className="text-teal-600 mr-2" size={20} /> Warehouse & Site Store Inventory
            </h2>
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="p-4 font-semibold text-gray-700">Material</th>
                        <th className="p-4 font-semibold text-gray-700 text-right">Stock</th>
                        <th className="p-4 font-semibold text-gray-700">Min. Level (Reorder Point)</th>
                        <th className="p-4 font-semibold text-gray-700">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100 hover:bg-teal-50">
                            <td className="p-4 font-medium text-gray-900">{item.name}</td>
                            <td className="p-4 text-right font-bold">{item.currentStock} {item.unit}</td>
                            <td className="p-4">{item.minLevel} {item.unit}</td>
                            <td className="p-4">
                                {renderStockStatus(item.currentStock, item.minLevel)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Reconciliation Report Chart (t, m) */}
        <ReconciliationChart />
      </div>


      {/* 3. Issued Materials Log (j, k, l, o, p, q, r, s, t) */}
      <section className="bg-white p-6 shadow-xl rounded-2xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaSignOutAlt className="text-indigo-600 mr-2" size={20} /> Tracking Issued Materials (Subcontractor & In-House)
        </h2>
        <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
                <thead className="bg-indigo-50">
                    <tr>
                        {/* <th className="p-4 font-semibold text-gray-700">Challan</th> */}
                        <th className="p-4 font-semibold text-gray-700">Material</th>
                        <th className="p-4 font-semibold text-gray-700">Issued To</th>
                        <th className="p-4 font-semibold text-gray-700">Quantity</th>
                        <th className="p-4 font-semibold text-gray-700 text-right">Issued Value ($)</th>
                        <th className="p-4 font-semibold text-gray-700">Returned</th>
                        <th className="p-4 font-semibold text-gray-700">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {issueLog.map((log) => {
                        const material = inventory.find(item => item.id === log.materialId);
                        const unit = material ? material.unit : '';
                        const returnStatus = log.quantity - log.returned;

                        return (
                            <tr key={log.id} className="border-b border-gray-100 hover:bg-indigo-50 even:bg-gray-50">
                                {/* <td className="p-4 font-medium text-indigo-700">{log.challan}</td> */}
                                <td className="p-4">{log.name}</td>
                                <td className="p-4">{log.recipient}</td>
                                <td className="p-4">{log.quantity} {unit}</td>
                                <td className="p-4 text-right">${log.value.toFixed(2)}</td>
                                <td className="p-4">
                                    {log.returned} {unit} returned.
                                    {log.returnable && returnStatus > 0 && 
                                        <span className="ml-2 text-xs text-red-600 font-semibold">({returnStatus} pending)</span>
                                    }
                                    {!log.returnable && <span className="ml-2 text-xs text-gray-500">(Not Returnable)</span>}
                                </td>
                                <td className="p-4">
                                    <button 
                                        onClick={() => generateChallanPDF(log.challan)}
                                        className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full text-xs font-bold flex items-center"
                                    >
                                        <FaFilePdf size={14} className="mr-1" /> PDF
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
      </section>

      {/* MODALS */}
      <ReturnMaterialModal 
          isOpen={isReturnModalOpen} 
          onClose={() => setIsReturnModalOpen(false)} 
          log={issueLog} 
          onReturn={handleMaterialReturn} 
      />

    </div>
  );
};

export default InventoryManager;
