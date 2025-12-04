import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// --- Protected Route ---
const ProtectedRoute = () => {
  const auth = sessionStorage.getItem("auth");
  return auth ? <Outlet /> : <Navigate to="/" replace />;
};

// AUTH
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignUp";
import ForgotPasswordPage from "./pages/ForgotPass";

// ADMIN
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import SalesAndBilling from "./pages/Admin/sales and billing/SalesBilling";
import CreateInvoice from "./pages/Admin/sales and billing/CreateInvoice";
import Alert from "./pages/Admin/sales and billing/PaymentTracking";
import TdsManagement from "./pages/Admin/sales and billing/TdsManagement";
import RABilling from "./pages/Admin/sales and billing/RABilling";
import DebitCreditNote from "./pages/Admin/sales and billing/DebitCreditNote";
import GstCalculator from "./pages/Admin/sales and billing/GstCalculator";
import PurchaseManagement from "./pages/Admin/PurchaseManagement";
import RetentionManagement from "./pages/Admin/sales and billing/RetentionManagement";
import GstnIntegration from "./pages/Admin/sales and billing/GstnIntegration";
import PanValidation from "./pages/Admin/sales and billing/PanValidation";
import HoldingDeduction from "./pages/Admin/sales and billing/HoldingDeduction";

import ContractManagementPage from "./pages/Admin/ContractManagement/ContractManagementPage";
import BiddingDashboard from "./pages/Admin/Bidding/BiddingDashboard";
import VendorBiddingPage from "./pages/Admin/Bidding/VendorBiddingPage";
import SubcontractorBiddingPage from "./pages/Admin/Bidding/SubcontractorBiddingPage";

import ProjectManager from "./pages/Admin/ProjectManager";
import UserAssignment from "./pages/Admin/UserManagement/AdminUserAssignment";

import ClientVendorPortal from "./pages/Admin/AdminClientVendorPortal/AdminClientVendorPortal";
// import EquipmentManagement from "./pages/Admin/EquipmentManagement";
import InventoryManager from "./pages/Admin/InventoryManager";
import QualityControlPage from "./pages/Admin/QualityControlPage";
import HealthSafetyPage from "./pages/Admin/HealthSafety/HealthSafetyPage";
import HRPayrollApp from "./pages/Admin/Hr payroll/hrpayroll";
import FinancialAccountReport from "./pages/Admin/FinanceAccountsReport";
import GeneralLedgerAccounts from "./pages/Admin/AdminClientVendorPortal/AdminClientVendorPortal";
import CRMPage from "./pages/Admin/CRM/CRMPage";
import ProfilePage from "./pages/Admin/AdminProfile";
import DocumentManagement from "./pages/Admin/DocumentManagement/DocumentLayout";
import InvoicesPage from "./pages/Admin/Invoice";

// SUPER ADMIN
import SuperAdminLayout from "./pages/Superadmin/components/SuperAdminLayout";
import SuperDashboard from "./pages/Superadmin/SuperDashboard";
import SuperUsers from "./pages/Superadmin/SuperUsers";
import ModulesPage from "./pages/Superadmin/components/Module";
import SuperNotifications from "./pages/Superadmin/SuperNotifications";
import Plan from "./pages/Superadmin/Plan";
import TransactionsPage from "./pages/Superadmin/Transaction";
import UserBackupPage from "./pages/Superadmin/Backup";
import TrainingSupportPage from "./pages/Superadmin/TrainingSupport";

// SUBCONTRACTOR
// import MainLayout from "./layout/MainLayout";
// import SubDashboard from "./pages/Subcontractor/SubcontractorDashboard";
// import Material from "./pages/Subcontractor/Material";
// import Payments from "./pages/Subcontractor/Payments";
// import Work from "./pages/Subcontractor/Work";
// import SubReports from "./pages/Subcontractor/SubReports";
// import Recent from "./pages/Subcontractor/Recent";
// import Dprsheet from "./pages/Subcontractor/dprsheet";
// import Bidding from "./pages/Subcontractor/bidding";
// import Boq from "./pages/Subcontractor/boq";
// import ProjectReports from "./pages/Subcontractor/projectreport";
// import Help from "./pages/Subcontractor/Help&Support";
// import SubProfile from "./pages/Subcontractor/SubProfile";

// SUPPLIER  
// import Purchase from "./pages/supplierdashboard/purchase&procurement";
// import Deliveries from "./pages/supplierdashboard/Deliveries";
// import Invoices from "./pages/supplierdashboard/Invoices";
// import Notification from "./pages/supplierdashboard/Notification";
// import Supreports from "./pages/supplierdashboard/supreports";
// import Profile from "./pages/supplierdashboard/Profile";
// import Supdashboard from "./pages/supplierdashboard/supdashboard";

//  PMC 
// import PMCLayout from "./pages/PMC/components/PMCLayout";
// import PMCDashboard from "./pages/PMC/PMCDashboard";
// import PMCProject from "./pages/PMC/PMCProject";
// import PMCTasks from "./pages/PMC/PMCTasks";
// import PMCSettings from "./pages/PMC/PMCSettings";
// import PMCTeams from "./pages/PMC/PMCTeams";
// import PMCBudget from "./pages/PMC/PMCBudget";
// import PMCReports from "./pages/PMC/PMCReports";
// import PMCNotification from "./pages/PMC/PMCNotification";


//MAIN ROUTER 
function App() {
  return (
    <Routes>
      
      {/* --- Public Routes --- */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* --- Protected Routes --- */}
      {/* <Route element={<ProtectedRoute />}> */}

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="AdminProfile" element={<ProfilePage />} />
          <Route path="SalesAndBilling" element={<SalesAndBilling />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="Newinvoice" element={<CreateInvoice />} />
          <Route path="Rabilling" element={<RABilling />} />
          <Route path="tdsmanagement" element={<TdsManagement />} />
          <Route path="debitandcreditnote" element={<DebitCreditNote />} />
          <Route path="gstcalculator" element={<GstCalculator />} />
          <Route path="retentionmanagement" element={<RetentionManagement />} />
          <Route path="purchasemanagement" element={<PurchaseManagement />} />
          <Route path="projectmanagement" element={<ProjectManager />} />
          <Route path="userassignment" element={<UserAssignment />} />
          <Route path="contract-management" element={<ContractManagementPage />} />
          <Route path="health-safety" element={<HealthSafetyPage />} />
          <Route path="alerts" element={<Alert />} />
          <Route path="quality-control" element={<QualityControlPage />} />
          <Route path="bidding" element={<BiddingDashboard />} />
          <Route path="bidding/vendor" element={<VendorBiddingPage />} />
          <Route path="bidding/subcontractor" element={<SubcontractorBiddingPage />} />
          <Route path="InventoryManager" element={<InventoryManager />} />
          <Route path="Client&Vendor" element={<ClientVendorPortal />} />
          <Route path="finance-reports" element={<FinancialAccountReport />} />
          <Route path="general-ledger-accounts" element={<GeneralLedgerAccounts />} />
          <Route path="hr-payroll" element={<HRPayrollApp />} />
          <Route path="CRMPage" element={<CRMPage />} />
          <Route path="GstnIntegration" element={<GstnIntegration />} />
          <Route path="PanValidation" element={<PanValidation />} />
          <Route path="HoldingDeduction" element={<HoldingDeduction />} />
          <Route path="DocumentManagement" element={<DocumentManagement />} />
        </Route>

        {/* Super Admin */}
        <Route path="/superadmin" element={<SuperAdminLayout />}>
          <Route index element={<SuperDashboard />} />
          <Route path="users" element={<SuperUsers />} />
          <Route path="modules" element={<ModulesPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="plan" element={<Plan />} />
          <Route path="notifications" element={<SuperNotifications />} />
          <Route path="backup" element={<UserBackupPage />} />
          <Route path="training-support" element={<TrainingSupportPage />} />
        </Route>

        {/* Subcontractor */}
        {/* <Route path="/subcontractor" element={<MainLayout role="subcontractor" />}>
          <Route index element={<SubDashboard />} />
          <Route path="material" element={<Material />} />
          <Route path="payments" element={<Payments />} />
          <Route path="work" element={<Work />} />
          <Route path="subreports" element={<SubReports />} />
          <Route path="recent" element={<Recent />} />
          <Route path="dprsheet" element={<Dprsheet />} />
          <Route path="bidding" element={<Bidding />} />
          <Route path="boq" element={<Boq />} />
          <Route path="projectreports" element={<ProjectReports />} />
          <Route path="help" element={<Help />} />
          <Route path="subprofile" element={<SubProfile />} />
        </Route> */}

        {/* Supplier */}
        {/* <Route path="/supplierdashboard" element={<MainLayout role="supplier" />}>
          <Route index element={<Supdashboard />} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="deliveries" element={<Deliveries />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="notification" element={<Notification />} />
          <Route path="supreports" element={<Supreports />} />
          <Route path="profile" element={<Profile />} />
        </Route> */}

        {/* PMC */}
        {/* <Route path="/PMC" element={<PMCLayout />}>
          <Route index element={<PMCDashboard />} />
          <Route path="Project" element={<PMCProject />} />
          <Route path="Tasks" element={<PMCTasks />} />
          <Route path="Settings" element={<PMCSettings />} />
          <Route path="team" element={<PMCTeams />} />
          <Route path="budget" element={<PMCBudget />} />
          <Route path="reports" element={<PMCReports />} />
          <Route path="notification" element={<PMCNotification />} />
        </Route> */}

      {/* </Route> */}
    </Routes>
  );
}

export default App;
