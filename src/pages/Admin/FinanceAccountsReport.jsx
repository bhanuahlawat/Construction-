import React, { useState } from 'react';

// --- ICONS (Same as before) ---
import {
    FiBookOpen, FiTrendingUp, FiBook, FiDollarSign, FiPercent, 
    FiArchive, FiCheckSquare, FiClipboard, FiTag, FiBarChart2, 
    FiFileText, FiUsers, FiSettings, FiPackage, FiTruck, 
    FiShield, FiTarget, FiFile, FiAlertTriangle, FiList
} from 'react-icons/fi';
import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { BsBank, BsFileEarmarkBarGraph } from 'react-icons/bs';

const reports = [
    { key: 'generalLedger', label: 'General Ledger', icon: <FiBookOpen /> },
    { key: 'budgetingAndForecasting', label: 'Budgeting & Forecasting', icon: <FiTrendingUp /> },
    { key: 'bankAccountAndStatement', label: 'Bank Account & Statement', icon: <FiTrendingUp /> },
    { key: 'accountingAndBookkeeping', label: 'Accounting & Bookkeeping', icon: <FiBook /> },
    { key: 'cashFlowManagement', label: 'Cash flow Management', icon: <FiDollarSign /> },
    { key: 'taxManagement', label: 'Tax Management', icon: <FiPercent /> },
    { key: 'contactWise', label: 'ContactWiseConsumableStock', icon: <FiArchive /> },
    { key: 'dailyprogress', label: 'Daily Progress Labour Report', icon: <FiCheckSquare /> },
    { key: 'employeeattendence', label: 'Employee Attendence', icon: <FiClipboard /> },
    { key: 'generalconsumable', label: 'General Consumable Stock', icon: <FiTag /> },
    
];

import GeneralLedgerAccounts from './FinanceReports/GeneralLedgerAccounts';
import AccountingBookeeping from './FinanceReports/AccountingBookkeeping';
import BankAccountsStatements from './FinanceReports/BankAccountsStatements';
import BudgetingAndForecastingReport from './FinanceReports/BudgetingForecasting';
import CashFlowManagement from './FinanceReports/CashFlowManagement';
import TaxType from './FinanceReports/TaxType';
import ContractWiseStock from './FinanceReports/ContractWiseConsumableStock';
import DailyProgressLaborReport from './FinanceReports/DailyProgressLaborReport';
import EmployeeAttendance from './FinanceReports/EmployeeAttendance';
import GeneralConsumableStock from './FinanceReports/GeneralConsumableStock';
const reportComponents = {
    generalLedger: <GeneralLedgerAccounts />,
    bankAccountAndStatement: <BankAccountsStatements />,
    budgetingAndForecasting: <BudgetingAndForecastingReport />,
    accountingAndBookkeeping: <AccountingBookeeping />,
    cashFlowManagement: <CashFlowManagement />,
    taxManagement: <TaxType />,
    contactWise: <ContractWiseStock/>,
    dailyprogress: <DailyProgressLaborReport/>,
    employeeattendence: <EmployeeAttendance/>,
    generalconsumable: <GeneralConsumableStock/>,
  
};

const FinanceAccountsReport = () => {
    const [activeReportKey, setActiveReportKey] = useState(reports[0].key);

    return (
        <div className="flex h-[calc(100vh-80px)] font-sans">
            
            <div className="w-72 bg-gray-50 border-r border-gray-200 p-5 overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-5 text-gray-800">Financial Reports</h2>
                <nav>
                    <ul className="list-none p-0 m-0">
                        {reports.map((report) => (
                            <li key={report.key} className="mb-1">
                                <button
                                    onClick={() => setActiveReportKey(report.key)}
                                    className={`w-full px-4 py-3 text-left rounded-md cursor-pointer text-sm transition-colors duration-200 flex items-center gap-3
                                        ${activeReportKey === report.key
                                            ? 'bg-blue-600 text-white font-semibold'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }
                                    `}
                                >
                                    <span className="text-lg">{report.icon}</span>
                                    <span>{report.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="flex-grow p-8 overflow-y-auto bg-white">
                {reportComponents[activeReportKey] || (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-2m3 2v-2m-3-5V7m3 5V7m-3 5V7m-3 8h6m-6-4h6m-6-4h6M9 3v4m6 0v4m-6 0h6"></path></svg>
                        <h2 className="text-2xl font-bold text-gray-700">Report Under Development</h2>
                        <p className="mt-2 text-gray-500">
                            The report component for '{reports.find(r => r.key === activeReportKey)?.label}' is coming soon.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FinanceAccountsReport;