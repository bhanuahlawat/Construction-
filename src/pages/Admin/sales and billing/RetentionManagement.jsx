import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock Data for Projects with Outstanding Retentions/Holdbacks
const initialRetentionData = [
    {
        id: 'P-001',
        client: 'Global Infrastructure Ltd.',
        project: 'Highway Expansion Pkg 3',
        retentionHeld: 1500000,
        snagHoldback: 50000, // Holdback for snag points
        status: 'Project Complete - Pending QA',
        completionDate: '2025-09-01',
    },
    {
        id: 'P-002',
        client: 'City Development Corp',
        project: 'High-Rise Tower A',
        retentionHeld: 850000,
        snagHoldback: 0,
        status: 'Ongoing (Final Bill Due)',
        completionDate: '2026-03-30',
    },
    {
        id: 'P-003',
        client: 'Tech Solutions HQ',
        project: 'Data Center Fitout',
        retentionHeld: 250000,
        snagHoldback: 10000,
        status: 'Quality Approved - Ready for Release',
        completionDate: '2025-10-15',
    },
];

const RetentionManagement = () => {
    const navigate = useNavigate();
    const [retentionData, setRetentionData] = useState(initialRetentionData);
    
    // State for the confirmation modal
    const [modalContext, setModalContext] = useState({
        isOpen: false,
        projectId: null,
        amount: 0,
        type: '', // 'retention' or 'snag'
    });

    // --- Helper Functions ---

    const formatCurrency = (amount) => {
        return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 });
    };
    
    const getStatusStyle = (status) => {
        if (status.includes('Ready for Release')) return 'bg-green-100 text-green-800';
        if (status.includes('Pending QA')) return 'bg-yellow-100 text-yellow-800';
        if (status.includes('Released')) return 'bg-gray-200 text-gray-700';
        return 'bg-blue-100 text-blue-800';
    };

    const totalOutstandingRetention = retentionData.reduce((sum, p) => sum + p.retentionHeld, 0);

    // --- Action Handlers (Open Modal) ---

    const handleOpenModal = (projectId, amount, type) => {
        setModalContext({
            isOpen: true,
            projectId,
            amount,
            type,
        });
    };

    const handleCloseModal = () => {
        setModalContext({
            isOpen: false,
            projectId: null,
            amount: 0,
            type: '',
        });
    };

    // --- Action Handler (Confirm Release) ---

    const handleConfirmAction = () => {
        const { projectId, type, amount } = modalContext;

        console.log(`CONFIRMING RELEASE: Type: ${type}, Project: ${projectId}, Amount: ${amount}`);
        
        // In a real app: Trigger financial transaction / document generation (d, e)

        const updatedData = retentionData.map(p => {
            if (p.id === projectId) {
                if (type === 'retention') {
                    return { ...p, retentionHeld: 0, status: 'Retention Released' };
                }
                if (type === 'snag') {
                    return { ...p, snagHoldback: 0 };
                }
            }
            return p;
        });

        setRetentionData(updatedData);
        handleCloseModal();
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <header className="mb-6 border-b pb-4 flex flex-col sm:flex-row justify-between sm:items-center">
                <h1 className="text-3xl font-bold text-gray-900">Retention & Holdback Manager</h1>
                <button 
                    onClick={() => navigate('/admin/salesandbilling')}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-150 text-sm mt-3 sm:mt-0"
                >
                    &larr; Back to Sales Dashboard
                </button>
            </header>

            {/* Summary Card */}
            <div className="mb-8 p-6 bg-indigo-600 text-white rounded-xl shadow-xl flex flex-col md:flex-row justify-between items-center">
                <div>
                    <p className="text-sm opacity-80">Total Outstanding Retention Funds Held</p>
                    <p className="text-4xl font-extrabold">{formatCurrency(totalOutstandingRetention)}</p>
                </div>
                {/* <button
                    className="mt-4 md:mt-0 bg-white text-indigo-700 hover:bg-indigo-100 font-bold py-2 px-6 rounded-full shadow-lg transition duration-200"
                >
                    View All Release History
                </button> */}
            </div>

            {/* Retention Tracking Table */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Holdbacks Overview</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">Project</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[180px]">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">Retention Held </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-red-600 uppercase tracking-wider min-w-[120px]">Snag Holdback </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[250px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {retentionData.map((project) => (
                                <tr key={project.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <p className="font-semibold">{project.project}</p>
                                        <p className="text-xs text-gray-500">{project.client}</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(project.status)}`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-700">
                                        {formatCurrency(project.retentionHeld)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-red-600">
                                        {formatCurrency(project.snagHoldback)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                        {project.retentionHeld > 0 && (
                                            <button
                                                onClick={() => handleOpenModal(project.id, project.retentionHeld, 'retention')}
                                                disabled={project.status.includes('Ongoing')}
                                                className={`py-1 px-3 rounded-lg text-white text-xs font-semibold transition ${
                                                    project.status.includes('Ongoing') 
                                                        ? 'bg-gray-400 cursor-not-allowed' 
                                                        : 'bg-indigo-600 hover:bg-indigo-700'
                                                }`}
                                            >
                                                Release Retention
                                            </button>
                                        )}
                                        {project.snagHoldback > 0 && (
                                            <button
                                                onClick={() => handleOpenModal(project.id, project.snagHoldback, 'snag')}
                                                className="py-1 px-3 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition"
                                            >
                                                Clear Snag Holdback
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Confirmation Modal */}
            {modalContext.isOpen && (
                <div className="fixed inset-0 bg-opacity-10 backdrop-blur-xs z-50 flex items-center justify-center p-4 transition-opacity duration-300">
                    <div className={`bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 transform transition-transform duration-300 ${modalContext.type === 'retention' ? 'border-l-4 border-indigo-600' : 'border-l-4 border-red-600'}`}>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Confirm Fund Release
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Are you sure you want to release the **{modalContext.type === 'retention' ? 'Retention' : 'Snag Holdback'}** amount for this project? This action cannot be reversed.
                        </p>
                        <div className="text-center p-4 rounded-lg bg-gray-100 mb-6">
                            <p className="text-sm text-gray-700">Amount to be released:</p>
                            <p className={`text-2xl font-extrabold ${modalContext.type === 'retagged' ? 'text-indigo-600' : 'text-red-600'}`}>
                                {formatCurrency(modalContext.amount)}
                            </p>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-medium transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmAction}
                                className={`px-4 py-2 text-white rounded-lg font-medium transition ${modalContext.type === 'retention' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-red-600 hover:bg-red-700'}`}
                            >
                                Confirm Release
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RetentionManagement;