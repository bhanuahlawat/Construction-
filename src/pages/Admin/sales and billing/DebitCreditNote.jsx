import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 🧩 Initial Form Data
const initialFormData = {
  originalInvoiceId: '',
  dateOfIssue: new Date().toISOString().slice(0, 10),
  reason: '',
  taxableAdjustment: 0,
  gstRate: 0.18,
  description: '',
};

const DebitCreditNote = () => {
  const navigate = useNavigate();
  const [noteType, setNoteType] = useState('Credit');
  const [formData, setFormData] = useState(initialFormData);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data for invoices
  const mockInvoices = [
    { id: 'INV-2025-1001', amount: 550000, date: '2025-08-15' },
    { id: 'INV-2025-1002', amount: 120000, date: '2025-09-01' },
    { id: 'INV-2025-1003', amount: 800000, date: '2025-09-29' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setNoteType('Credit');
  };

  // --- Calculation Logic ---
  const taxableAmount = parseFloat(formData.taxableAdjustment);
  const gstRate = parseFloat(formData.gstRate);
  const totalGST = taxableAmount * gstRate;
  const cgst = totalGST / 2;
  const sgst = totalGST / 2;
  const totalNoteValue = taxableAmount + totalGST;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.originalInvoiceId || !formData.reason || taxableAmount <= 0) {
      alert('⚠️ Please select an invoice, provide a reason, and enter a valid amount.');
      return;
    }

    console.log(`Submitting ${noteType} Note:`, {
      ...formData,
      totalGST,
      cgst,
      sgst,
      totalNoteValue,
    });

    resetForm();
    navigate('/admin/debitandcreditnote');
  };

  const isCreditNote = noteType === 'Credit';
  const noteTheme = {
    cardBorder: isCreditNote ? 'border-red-400' : 'border-green-400',
    bgColor: isCreditNote ? 'bg-red-50' : 'bg-green-50',
    textColor: isCreditNote ? 'text-red-700' : 'text-green-700',
    buttonColor: isCreditNote ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700',
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <header className="mb-6 sm:mb-8 border-b pb-3 flex flex-col sm:flex-row justify-between sm:items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Issue Debit / Credit Note
        </h1>
        <button
          onClick={() => navigate('/admin/salesandbilling')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-150 text-sm mt-3 sm:mt-0"
        >
          ← Back to Sales Dashboard
        </button>
      </header>

      {/* MAIN CARD */}
      <form
        onSubmit={handleSubmit}
        className={`p-5 sm:p-6 rounded-xl shadow-lg border-l-8 ${noteTheme.cardBorder} ${noteTheme.bgColor}`}
      >
        {/* Type Toggle */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            type="button"
            onClick={() => setNoteType('Credit')}
            className={`py-2 px-6 rounded-full font-semibold transition ${
              isCreditNote
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-500'
            }`}
          >
            Credit Note (Decrease Value)
          </button>
          <button
            type="button"
            onClick={() => setNoteType('Debit')}
            className={`py-2 px-6 rounded-full font-semibold transition ${
              !isCreditNote
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-green-100 hover:text-green-500'
            }`}
          >
            Debit Note (Increase Value)
          </button>
        </div>

        {/* SECTION TITLE */}
        <h2 className={`text-xl sm:text-2xl font-semibold mb-6 ${noteTheme.textColor}`}>
          {noteType} Note Details (Correction)
        </h2>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Invoice */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Original Tax Invoice *
            </label>
            <select
              name="originalInvoiceId"
              value={formData.originalInvoiceId}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Select Original Invoice --</option>
              {mockInvoices.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.id} (₹ {inv.amount.toLocaleString('en-IN')})
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Issue
            </label>
            <input
              type="date"
              name="dateOfIssue"
              value={formData.dateOfIssue}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* REASON */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason for {noteType} Note *
          </label>
          <select
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">-- Select Reason --</option>
            <option value="Sales Return">Sales Return / Goods Returned</option>
            <option value="Post-Sale Discount">Post-Sale Discount</option>
            <option value="Price Correction">
              Correction in Taxable Value (Over/Under Charged)
            </option>
            <option value="Change in GST Rate">Change in GST Rate</option>
          </select>
        </div>

        {/* ADJUSTMENT DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Taxable Value Adjustment ({isCreditNote ? 'Decrease' : 'Increase'}) *
            </label>
            <input
              type="number"
              name="taxableAdjustment"
              value={formData.taxableAdjustment}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              required
              className="w-full border border-gray-300 p-2.5 rounded-lg text-lg font-bold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Applicable GST Rate (%)
            </label>
            <div className="flex items-center">
              <input
                type="number"
                name="gstRate"
                value={gstRate * 100}
                readOnly
                className="w-full border border-gray-300 p-2.5 rounded-lg bg-gray-100 font-mono"
              />
              <span className="ml-2 text-gray-600">%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Note Value
            </label>
            <div className="p-2.5 rounded-lg bg-gray-200 text-lg font-bold text-gray-900">
              ₹ {totalNoteValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* TAX BREAKDOWN */}
        <div className="border border-dashed border-gray-300 p-4 rounded-lg bg-white mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">Tax Breakdown</h4>
          <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-600">
            <span>CGST ({(gstRate * 100) / 2}%)</span>
            <span className="text-right col-span-2">
              ₹ {cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-600">
            <span>SGST ({(gstRate * 100) / 2}%)</span>
            <span className="text-right col-span-2">
              ₹ {sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="border-t mt-2 pt-2 grid grid-cols-3 gap-4 text-sm font-bold text-gray-800">
            <span>Total GST Adjustment</span>
            <span className="text-right col-span-2">
              ₹ {totalGST.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className={`w-full ${noteTheme.buttonColor} text-white font-bold py-3 rounded-lg shadow-lg transition duration-200 text-lg`}
        >
          Generate & File {noteType} Note
        </button>
      </form>
    </div>
  );
};

export default DebitCreditNote;
