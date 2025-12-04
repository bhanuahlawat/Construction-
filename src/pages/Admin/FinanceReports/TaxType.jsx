import React, { useState, useEffect } from 'react';

// --- Mock data to simulate an API call ---
const mockTaxData = [
    { id: 1, name: 'GST 18%', code: 'GST-18', rate: 18, type: 'Percentage', applicableTo: 'Sales & Services' },
    { id: 2, name: 'GST 5%', code: 'GST-5', rate: 5, type: 'Percentage', applicableTo: 'Sales' },
    { id: 3, name: 'TDS on Contractor', code: 'TDS-194C', rate: 2, type: 'Percentage', applicableTo: 'Purchases & Services' },
    { id: 4, name: 'TDS on Rent', code: 'TDS-194I', rate: 10, type: 'Percentage', applicableTo: 'Expenses' },
    { id: 5, name: 'GST 0% (Exempt)', code: 'GST-0', rate: 0, type: 'Percentage', applicableTo: 'Sales (Exempt)' },
];

const TaxType = () => {
    const [taxTypes, setTaxTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTax, setCurrentTax] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Simulate fetching data
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setTaxTypes(mockTaxData);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    // --- Modal and Form Handling ---
    const handleOpenModal = (tax = null) => {
        if (tax) {
            setIsEditing(true);
            setCurrentTax(tax);
        } else {
            setIsEditing(false);
            setCurrentTax({ name: '', code: '', rate: 0, type: 'Percentage', applicableTo: 'Sales' });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentTax(null);
        setIsEditing(false);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setCurrentTax(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // In a real app, you'd send this to your API
        if (isEditing) {
            console.log('Updating tax:', currentTax);
            setTaxTypes(taxTypes.map(t => (t.id === currentTax.id ? currentTax : t)));
        } else {
            const newTax = { ...currentTax, id: Date.now() }; // Mock new ID
            console.log('Creating new tax:', newTax);
            setTaxTypes([newTax, ...taxTypes]);
        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this tax type?')) {
            console.log('Deleting tax with id:', id);
            setTaxTypes(taxTypes.filter(t => t.id !== id));
        }
    };

    // Filtered data for display
    const filteredTaxTypes = taxTypes.filter(tax =>
        tax.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tax.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Tax Type Management</h2>
            
            {/* --- FILTER & ACTION BAR --- */}
            <div className="bg-white p-5 rounded-lg shadow-md mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <input
                        type="text"
                        placeholder="Search by name or code..."
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={() => handleOpenModal()}
                        className="px-4 py-2 rounded-md bg-blue-600 text-white cursor-pointer text-sm font-semibold">
                        Add New Tax Type
                    </button>
                </div>
            </div>

            {/* --- DATA TABLE SECTION --- */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {loading ? (
                    <div className="text-center p-20 text-gray-500"><p>Loading tax types...</p></div>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Tax Name</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Code</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">Rate</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Applicable To</th>
                                    <th className="border-b border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTaxTypes.map((tax) => (
                                    <tr key={tax.id} className="hover:bg-gray-50 even:bg-gray-50">
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm font-medium">{tax.name}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm">{tax.code}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-right">{tax.rate}%</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm">{tax.applicableTo}</td>
                                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-center">
                                            <button onClick={() => handleOpenModal(tax)} className="text-blue-600 hover:text-blue-800 font-medium mr-3">Edit</button>
                                            <button onClick={() => handleDelete(tax.id)} className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* --- ADD/EDIT MODAL --- */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Tax Type' : 'Add New Tax Type'}</h3>
                        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                            <div className="space-y-4">
                                <label className="flex flex-col gap-1 text-sm text-gray-600">
                                    Tax Name:
                                    <input type="text" name="name" value={currentTax.name} onChange={handleFormChange} className="px-3 py-2 border border-gray-300 rounded-md text-sm" required />
                                </label>
                                <label className="flex flex-col gap-1 text-sm text-gray-600">
                                    Tax Code:
                                    <input type="text" name="code" value={currentTax.code} onChange={handleFormChange} className="px-3 py-2 border border-gray-300 rounded-md text-sm" required />
                                </label>
                                <label className="flex flex-col gap-1 text-sm text-gray-600">
                                    Tax Rate (%):
                                    <input type="number" name="rate" value={currentTax.rate} onChange={handleFormChange} className="px-3 py-2 border border-gray-300 rounded-md text-sm" required />
                                </label>
                                <label className="flex flex-col gap-1 text-sm text-gray-600">
                                    Applicable To:
                                    <select name="applicableTo" value={currentTax.applicableTo} onChange={handleFormChange} className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white">
                                        <option value="Sales">Sales</option>
                                        <option value="Purchases">Purchases</option>
                                        <option value="Services">Services</option>
                                        <option value="Sales & Services">Sales & Services</option>
                                        <option value="Purchases & Services">Purchases & Services</option>
                                        <option value="Expenses">Expenses</option>
                                    </select>
                                </label>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 cursor-pointer text-sm">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white cursor-pointer text-sm font-semibold">
                                    {isEditing ? 'Save Changes' : 'Create Tax'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaxType;