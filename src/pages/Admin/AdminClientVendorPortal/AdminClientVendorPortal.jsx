import React, { useState } from 'react';
import { LayoutDashboard, TrendingUp, BarChart2, CheckCircle, Clock, Send, MessageSquare, ClipboardList, Package, DollarSign, Users, HardHat, FileText } from 'lucide-react';

// --- Mock Data: Tailored for Client View ---

const mockClientData = {
    clientName: 'Acme Corporation',
    entityType: 'Client',
    currentProject: 'Project Titan: Q4 System Integration',
    kpis: [
        { title: 'Budget Utilized', value: '65%', icon: BarChart2, color: 'text-blue-500', bg: 'bg-blue-100' },
        { title: 'Milestones Completed', value: '4/6', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100' },
        { title: 'Project Health', value: 'On Track', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-100' },
        { title: 'Pending Feedback', value: '1 item', icon: MessageSquare, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    ],
    milestones: [
        { id: 1, name: 'Initial Planning & Scoping', status: 'Completed', date: '2025-08-15', detail: 'Scope finalized and signed off.' },
        { id: 2, name: 'System Architecture Design', status: 'Completed', date: '2025-09-10', detail: 'High-level design approved.' },
        { id: 3, name: 'Module A Development', status: 'In Progress', date: '2025-10-30', detail: '80% complete, entering UAT.' },
        { id: 4, name: 'Module B Development', status: 'Upcoming', date: '2025-11-20', detail: 'Dependencies from Module A required.' },
        { id: 5, name: 'Client Training & Handoff', status: 'Upcoming', date: '2025-12-05', detail: 'Schedule pending completion of development.' },
    ],
    reports: [
        { id: 'R-001', name: 'Weekly Progress Report - Oct 25', date: '2025-10-26', type: 'Progress', link: '#' },
        { id: 'R-002', name: 'Financial Summary - Sep 2025', date: '2025-10-01', type: 'Financial', link: '#' },
        { id: 'R-003', name: 'Scope Change Log', date: '2025-09-15', type: 'Log', link: '#' },
    ]
};

// --- New Mock Data: Tailored for Vendor View ---

const mockVendorData = {
    vendorName: 'Global Tech Solutions',
    entityType: 'Vendor',
    currentContract: 'Service Agreement #VTS-1209',
    kpis: [
        { title: 'Total Invoiced Value', value: '$125k', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-100' },
        { title: 'Outstanding Payments', value: '$25k', icon: Clock, color: 'text-red-500', bg: 'bg-red-100' },
        { title: 'Available Resources', value: '10', icon: Users, color: 'text-blue-500', bg: 'bg-blue-100' },
        { title: 'Open Tickets', value: '3', icon: HardHat, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    ],
    invoices: [
        { id: 'INV-101', name: 'October Services - Q4', amount: '$45,000', status: 'Paid', date: '2025-10-30', link: '#' },
        { id: 'INV-102', name: 'September Services - Q4', amount: '$25,000', status: 'Pending', date: '2025-09-30', link: '#' },
        { id: 'INV-103', name: 'Aug Services - Q4 (Reimbursable)', amount: '$5,000', status: 'Paid', date: '2025-08-30', link: '#' },
    ]
};

// --- Shared Component ---

const StatCard = ({ title, value, icon: Icon, color, bg }) => (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex items-center transition-all duration-200 hover:shadow-lg">
        <div className={`p-3 rounded-full ${bg} mr-4`}>
            <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-xl font-extrabold text-gray-900 mt-0.5">{value}</p>
        </div>
    </div>
);

// --- Client-Specific Components (from original code) ---

const MilestoneTimeline = ({ milestones }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-indigo-500" />
                Project Milestones & Progress
            </h2>
            <div className="relative border-l-4 border-gray-200 ml-4">
                {milestones.map((milestone) => (
                    <div key={milestone.id} className="mb-8 ml-6">
                        {/* Circle Indicator */}
                        <div className={`absolute w-4 h-4 rounded-full -left-2.5 mt-1.5 border-4 ${
                            milestone.status === 'Completed' ? 'bg-green-500 border-green-200' :
                            milestone.status === 'In Progress' ? 'bg-yellow-500 border-yellow-200' :
                            'bg-gray-400 border-gray-200'
                        }`}></div>

                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-gray-900">{milestone.name}</h3>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                milestone.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                milestone.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                                {milestone.status}
                            </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{milestone.detail}</p>
                        <time className="text-xs text-indigo-600 font-medium mt-1 block">
                            Target Date: {milestone.date}
                        </time>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TransparentReporting = ({ reports }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <ClipboardList className="w-6 h-6 mr-2 text-indigo-500" />
                Transparent Reporting & Docs
            </h2>
            <p className="text-sm text-gray-500 mb-6">View all project reports, financial summaries, and technical documents.</p>

            <div className="space-y-3">
                {reports.map((report) => (
                    <div key={report.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
                        <div className="flex items-center">
                            <Package className="w-5 h-5 mr-3 text-indigo-500" />
                            <div>
                                <a href={report.link} className="font-medium text-gray-900 hover:text-indigo-600 transition">{report.name}</a>
                                <p className="text-xs text-gray-500">
                                    <span className="font-semibold text-xs mr-2 px-1 rounded-sm bg-gray-200">{report.type}</span>
                                    Uploaded: {report.date}
                                </p>
                            </div>
                        </div>
                        <a href={report.link} className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center">
                            View File
                            <Send className="w-4 h-4 ml-1 transform rotate-45" />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

const FeedbackSubmission = () => {
    const [feedbackText, setFeedbackText] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (feedbackText.trim()) {
            // Simulate API submission
            console.log("Submitting feedback:", feedbackText);
            setIsSubmitted(true);
            setFeedbackText('');
            setTimeout(() => setIsSubmitted(false), 3000); // Clear message after 3 seconds
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <MessageSquare className="w-6 h-6 mr-2 text-indigo-500" />
                Client Feedback Portal
            </h2>
            <p className="text-sm text-gray-500 mb-4">Provide direct feedback for continuous improvement, bugs, or change requests.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px]"
                    placeholder="Enter your feedback or request here..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-150 flex items-center justify-center disabled:opacity-50"
                    disabled={!feedbackText.trim()}
                >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Feedback
                </button>
            </form>
            
            {isSubmitted && (
                <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Thank you! Your feedback has been submitted.
                </div>
            )}
        </div>
    );
};

// --- New Vendor-Specific Component ---

const InvoiceTracker = ({ invoices }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-2 text-purple-500" />
                Invoice & Payment Status
            </h2>
            <p className="text-sm text-gray-500 mb-6">Track all invoices submitted and their payment status.</p>

            <div className="space-y-3">
                {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-purple-50 transition">
                        <div className="flex items-center">
                            <DollarSign className="w-5 h-5 mr-3 text-purple-500" />
                            <div>
                                <a href={invoice.link} className="font-medium text-gray-900 hover:text-purple-600 transition">{invoice.name}</a>
                                <p className="text-xs text-gray-500">
                                    <span className={`font-semibold text-xs mr-2 px-1 rounded-sm ${
                                        invoice.status === 'Paid' ? 'bg-green-200 text-green-800' :
                                        invoice.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                                        'bg-red-200 text-red-800'
                                    }`}>{invoice.status}</span>
                                    Due Date: {invoice.date}
                                </p>
                            </div>
                        </div>
                        <span className="font-bold text-lg text-gray-800">{invoice.amount}</span>
                    </div>
                ))}
            </div>
            <button className="mt-4 w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition">
                Submit New Invoice
            </button>
        </div>
    );
};

// --- Vendor Portal Component ---

const VendorPortal = () => {
    const { vendorName, currentContract, kpis, invoices } = mockVendorData;

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-10">
                
                {/* Contract Overview */}
                <div className="bg-purple-600 text-white p-6 rounded-xl shadow-xl">
                    <p className="text-sm font-medium opacity-80">Active Contract</p>
                    <h2 className="text-3xl font-extrabold mt-1">{currentContract}</h2>
                </div>

                {/* KPI Dashboard */}
                <section>
                    <h3 className="text-xl font-bold text-gray-800 mb-5 border-b pb-2">Vendor Financial & Resource Metrics</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {kpis.map((kpi) => (
                            <StatCard key={kpi.title} {...kpi} />
                        ))}
                    </div>
                </section>

                {/* Main Content Grid: Invoices and Resource Mgmt */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Invoice Tracker - Takes 2/3 width */}
                    <div className="lg:col-span-2">
                        <InvoiceTracker invoices={invoices} />
                    </div>

                    {/* Placeholder for Resource Allocation/Time Sheet - Takes 1/3 width */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-full">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                <Users className="w-6 h-6 mr-2 text-purple-500" />
                                Resource Allocation
                            </h2>
                            <p className="text-sm text-gray-500 mb-4">Manage and update your team's assigned tasks and time sheets.</p>
                            <button className="w-full px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition">
                                Go to Timesheets
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Verification Status Placeholder */}
                <div className="p-4 bg-green-50 rounded-xl border border-green-200 flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                    <p className="text-sm text-green-800">
                        **Vendor Verification Status:** Your entity (GST, EIN, W-9, etc.) was **Auto-Verified** during contract signing.
                    </p>
                </div>

            </main>
        </div>
    );
}

// --- Client Portal Component (from original code) ---

const ClientPortal = () => {
    const { currentProject, kpis, milestones, reports } = mockClientData;

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-10">
                
                {/* Project Overview */}
                <div className="bg-indigo-600 text-white p-6 rounded-xl shadow-xl">
                    <p className="text-sm font-medium opacity-80">Current Focus</p>
                    <h2 className="text-3xl font-extrabold mt-1">{currentProject}</h2>
                </div>

                {/* KPI Dashboard (Requirement c) */}
                <section>
                    <h3 className="text-xl font-bold text-gray-800 mb-5 border-b pb-2">Key Performance Indicators (KPIs)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {kpis.map((kpi) => (
                            <StatCard key={kpi.title} {...kpi} />
                        ))}
                    </div>
                </section>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Milestones & Progress (Requirement a) - Takes 2/3 width */}
                    <div className="lg:col-span-2">
                        <MilestoneTimeline milestones={milestones} />
                    </div>

                    {/* Feedback Submission (Requirement b) - Takes 1/3 width */}
                    <div className="lg:col-span-1">
                        <FeedbackSubmission />
                    </div>
                </div>
                
                {/* Reports Section (Requirement a, c) - Full width */}
                <section>
                    <TransparentReporting reports={reports} />
                </section>
                
                {/* Verification Status Placeholder (Requirement e) */}
                <div className="p-4 bg-green-50 rounded-xl border border-green-200 flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                    <p className="text-sm text-green-800">
                        **User Verification Status (e):** Your identity (GST, PAN, Aadhar, etc.) was **Auto-Verified** during sign-up. Access is fully granted.
                    </p>
                </div>
            </main>
        </div>
    );
}


// Main App Component with Role Selector
export default function ClientVendorPortal() {
    // State to simulate user role selection
    const [userRole, setUserRole] = useState('Client'); // Default to Client

    const roleButtonClass = (role) => 
        `px-6 py-2 m-2 rounded-lg font-semibold transition duration-150 ${
            userRole === role
                ? 'bg-white text-indigo-700 shadow-md border border-indigo-300'
                : 'bg-indigo-500 text-white hover:bg-indigo-400'
        }`;

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Role Selector Header */}
            <header className=" bg-indigo-700 p-4 shadow-lg">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-extrabold text-white">
                        <LayoutDashboard className="inline w-6 h-6 mr-2 mb-1" />
                        Project Portal
                    </h1>
                    <div className="space-x-3">
                        <button className={roleButtonClass('Client')} onClick={() => setUserRole('Client')}>
                            Client View
                        </button>
                        <button className={roleButtonClass('Vendor')} onClick={() => setUserRole('Vendor')}>
                            Vendor View
                        </button>
                    </div>
                </div>
            </header>

            {/* Conditional Rendering of the Portal */}
            {userRole === 'Client' ? <ClientPortal /> : <VendorPortal />}
        </div>
    );
}