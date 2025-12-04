import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo

// --- Mock data to simulate an API call ---
const mockJournalData = [
    { id: 1, journalId: 'J-001', date: '2025-11-05', account: 'Office Supplies', description: 'Purchase office chairs', debit: 500, credit: 0, status: 'Posted' },
    { id: 2, journalId: 'J-001', date: '2025-11-05', account: 'Cash', description: 'Purchase office chairs', debit: 0, credit: 500, status: 'Posted' },
    { id: 3, journalId: 'J-002', date: '2025-11-06', account: 'Accounts Receivable', description: 'Invoice #1023 (Client A)', debit: 1500, credit: 0, status: 'Posted' },
    { id: 4, journalId: 'J-002', date: '2025-11-06', account: 'Sales Revenue', description: 'Invoice #1023 (Client A)', debit: 0, credit: 1500, status: 'Posted' },
    { id: 5, journalId: 'J-003', date: '2025-11-07', account: 'Utilities Expense', description: 'Pay electric bill', debit: 250, credit: 0, status: 'Pending' },
    { id: 6, journalId: 'J-003', date: '2025-11-07', account: 'Cash', description: 'Pay electric bill', debit: 0, credit: 250, status: 'Pending' },
    { id: 7, journalId: 'J-004', date: '2025-11-08', account: 'Cash', description: 'Receive payment Invoice #1023', debit: 1500, credit: 0, status: 'Posted' },
    { id: 8, journalId: 'J-004', date: '2025-11-08', account: 'Accounts Receivable', description: 'Receive payment Invoice #1023', debit: 0, credit: 1500, status: 'Posted' },
];

const AccountingBookkeeping = () => {
    // State for the master list of data
    const [journalData, setJournalData] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- State for filters ---
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [journalId, setJournalId] = useState('');
    const [status, setStatus] = useState('all'); // 'all', 'Posted', or 'Pending'

    // Simulate fetching data when the component mounts
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setJournalData(mockJournalData); // Load the full list into state
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []); // Empty array ensures this runs only once on mount

    // --- Create a derived state for the filtered data using useMemo ---
    const filteredData = useMemo(() => {
        return journalData.filter(entry => {
            if (startDate && entry.date < startDate) return false;
            if (endDate && entry.date > endDate) return false;
            if (journalId && !entry.journalId.toLowerCase().includes(journalId.toLowerCase())) return false;
            if (status !== 'all' && entry.status !== status) return false;
            return true;
        });
    }, [journalData, startDate, endDate, journalId, status]); // Dependencies

    // --- NEW: Handle Deleting a Journal Entry ---
    const handleDelete = (journalIdToDelete) => {
        // Confirmation is important for destructive actions
        if (window.confirm(`Are you sure you want to delete all entries for Journal ID: ${journalIdToDelete}?`)) {
            // Update the main data state
            setJournalData(currentData =>
                currentData.filter(entry => entry.journalId !== journalIdToDelete)
            );
            // The `filteredData` will update automatically via useMemo
        }
    };

    // --- NEW: Handle CSV Export ---
    const handleExportCSV = () => {
        // Use filteredData to export only what the user sees
        const header = ['Journal ID', 'Date', 'Account', 'Description', 'Debit ($)', 'Credit ($)', 'Status'].join(',');
        
        const rows = filteredData.map(entry => {
            // Wrap description in quotes to handle potential commas
            const description = `"${entry.description}"`; 
            return [entry.journalId, entry.date, entry.account, description, entry.debit, entry.credit, entry.status].join(',');
        });

        const csvContent = [header, ...rows].join('\n');
        
        // Create a blob and trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'journal_entries.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Accounting & Bookkeeping (Journal Entries)</h2>
            
            {/* --- FILTER SECTION --- */}
            <div className="bg-white p-5 rounded-lg shadow-md mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        Start Date:
                        <input 
                            type="date" 
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm" 
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        End Date:
                        <input 
                            type="date" 
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm" 
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        Journal ID:
                        <input 
                            type="text" 
                            placeholder="e.g., J-001" 
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm" 
                            value={journalId}
                            onChange={(e) => setJournalId(e.target.value)}
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        Status:
                        <select 
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="Posted">Posted</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </label>
                    <button 
                        className="px-4 py-2 rounded-md bg-green-600 text-white cursor-pointer text-sm self-end ml-auto"
                        onClick={handleExportCSV} // --- NEW: Added onClick handler ---
                    >
                        Export as CSV
                    </button>
                </div>
            </div>

            {/* --- DATA TABLE SECTION --- */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {loading ? (
                    <div className="text-center p-20 text-gray-500">
                        <p>Loading journal entries...</p>
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Journal ID</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Account</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Description</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Debit ($)</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Credit ($)</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">Status</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">Actions</th> {/* --- NEW: Header --- */}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((entry) => (
                                        <tr key={entry.id} className="hover:bg-gray-50 even:bg-gray-50">
                                            <td className="border-b border-gray-200 px-4 py-3 text-sm">{entry.journalId}</td>
                                            <td className="border-b border-gray-200 px-4 py-3 text-sm">{entry.date}</td>
                                            <td className="border-b border-gray-200 px-4 py-3 text-sm">{entry.account}</td>
                                            <td className="border-b border-gray-200 px-4 py-3 text-sm">{entry.description}</td>
                                            <td className="border-b border-gray-200 px-4 py-3 text-sm text-right">{entry.debit > 0 ? entry.debit.toFixed(2) : '-'}</td>
                                            <td className="border-b border-gray-200 px-4 py-3 text-sm text-right">{entry.credit > 0 ? entry.credit.toFixed(2) : '-'}</td>
                                            <td className="border-b border-gray-200 px-4 py-3 text-sm text-center">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                    entry.status === 'Posted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {entry.status}
                                                </span>
                                            </td>
                                            {/* --- NEW: Delete Button Cell --- */}
                                            <td className="border-b border-gray-200 px-4 py-3 text-sm text-center">
                                                <button 
                                                    onClick={() => handleDelete(entry.journalId)} 
                                                    className="text-red-600 hover:text-red-800 font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        {/* --- NEW: Updated colSpan to 8 --- */}
                                        <td colSpan="8" className="text-center p-10 text-gray-500">
                                            No journal entries found for these filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountingBookkeeping;