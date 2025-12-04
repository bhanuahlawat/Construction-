import React from 'react';
import { useNavigate } from 'react-router-dom';
import TdsManagement from './TdsManagement';

// === Mock Data for demonstration ===
const SalesAndBilling = () => {
    const navigate = useNavigate();

    // --- Utility Card Component (Responsive Updates) ---
    const FeatureCard = ({ title, description, icon, color = 'bg-indigo-500', onClick }) => (
        <div 
            className="p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 bg-white border border-gray-100 cursor-pointer h-full flex flex-col" // Added flex for consistent height
            onClick={onClick}
        >
            <div className={`w-8 h-8 sm:w-10 sm:h-10 ${color} rounded-full flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0`}>
                <span className="text-white text-lg sm:text-xl">{icon}</span> 
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{title}</h3> {/* Responsive Title Size */}
            <p className="text-gray-600 text-xs sm:text-sm flex-grow">{description}</p> {/* Responsive Description Size */}
        </div>
    );
    // ------------------------------------------------------------------------------

    // Define the click handler function for Payment Tracking
    const handlePaymentTrackingClick = () => {
        navigate('/admin/alerts'); 
    };

    const handleNewInvoice=()=>{
        navigate('/admin/Newinvoice')
    }
    const handleRABilling=()=>{
        navigate('/admin/Rabilling')
    }
    const handleTdsmanagement=()=>{
        navigate('/admin/tdsmanagement')
    }
    const handledebitandcredit=()=>{
        navigate('/admin/debitandcreditnote')
    }
    const handlegstcalcutaion=()=>{
        navigate('/admin/gstcalculator')
    }
    const handleretentionmanagement=()=>{
        navigate('/admin/retentionmanagement')
    }
    const handleGstnIntegration=()=>{
        navigate('/admin/GstnIntegration')
    }
    const handlePanValidation=()=>{
        navigate('/admin/PanValidation')
    }
    const handleHoldingDeduction=()=>{
        navigate('/admin/HoldingDeduction')
    }

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen"> {/* Responsive Padding */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 border-b pb-2"> {/* Responsive Header Size */}
                Sales & Billing Management
            </h1>
            
            {/* SECTION 1: Compliance Alerts */}
            

            {/* SECTION 2: Billing Workflows */}
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4">Invoicing & Document Generation</h2>
            {/* Adjusted grid to 2 columns on small screens, 3 on medium */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <FeatureCard 
                    title="New Invoice / Proforma" 
                    description="Create a new invoice, convert proforma, and ensure GST compliance." 
                    icon="🧾"
                    color="bg-green-500"
                    onClick={handleNewInvoice}
                />
                <FeatureCard 
                    title="Progress (RA) Billing" 
                    description="Generate invoices based on project completion stages and issue all docs." 
                    icon="🏗️"
                    color="bg-purple-500"
                    onClick={handleRABilling}
                />
                <FeatureCard 
                    title="Debit / Credit Notes" 
                    description="Issue notes for changes in taxable amount or returns." 
                    icon="±"
                    color="bg-yellow-500"
                    onClick={handledebitandcredit}
                />
            </div>

            {/* SECTION 3: Compliance & Tax Management */}
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4">Tax & Compliance</h2>
            {/* Adjusted grid to 2 columns on small, 3 on medium, 4 on large */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <FeatureCard 
                    title="TDS Management" 
                    description="Calculate, deduct at source, and configure rates." 
                    icon="💸"
                    color="bg-red-500"
                    onClick={handleTdsmanagement}
                />
                <FeatureCard 
                    title="GST Calculation" 
                    description="Calculate IGST, CGST, SGST based on location and service type." 
                    icon="📊"
                    color="bg-blue-500"
                    onClick={handlegstcalcutaion}
                />
                <FeatureCard 
                    title="GSTN Integration" 
                    description="Verify invoices" 
                    icon="🔗"
                    color="bg-teal-500"
                    onClick={handleGstnIntegration}
                />
                <FeatureCard 
                    title="PAN Validation" 
                    description="Ensure PAN of all contractors/vendors is validated." 
                    icon="🆔"
                    color="bg-orange-500"
                    onClick={handlePanValidation}
                />
            </div>
            
            {/* SECTION 4: Financial Tracking & Retention */}
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4">Financial Tracking</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"> {/* Adjusted grid to 2 columns on small screens, 3 on medium */}
                <FeatureCard 
                    title="Payment Tracking" 
                    description="Monitor statuses, pending dues, and overdue amounts." 
                    icon="💵"
                    color="bg-lime-600"
                    onClick={handlePaymentTrackingClick} 
                />
                <FeatureCard 
                    title="Retention Management" 
                    description="Track retention amounts held until project handover." 
                    icon="🔒"
                    color="bg-cyan-500"
                    onClick={handleretentionmanagement}
                />
                <FeatureCard 
                    title="Holding Deduction" 
                    description="Track amounts held for 'snag points' and release upon completion." 
                    icon="🛠️"
                    color="bg-pink-500"
                    onClick={handleHoldingDeduction}
                />
            </div>
        </div>
    );
};

export default SalesAndBilling;