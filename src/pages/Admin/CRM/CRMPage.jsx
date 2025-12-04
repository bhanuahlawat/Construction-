// import React from "react";
// import LeadAutoFetch from "./components/LeadAutoFetch";
// import NotificationsConfig from "./components/NotificationsConfig";
// import Reminders from "./components/Reminders";
// import SupportTickets from "./components/SupportTickets";
// import FollowUps from "./components/FollowUps";
// import TodoList from "./components/TodoList";
// import SalesPipeline from "./components/SalesPipeline";
// import FeedbackTracking from "./components/FeedbackTracking";

// const CRMPage = () => {
//   return (
//     <div className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen">

//       {/* Page Title */}
//       <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
//         CRM (Customer Relationship Management)
//       </h1>

//       {/* Main Section */}
//       <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 mb-6">
//         <h2 className="text-lg sm:text-xl font-semibold mb-3">
//           Client & Communication Management
//         </h2>
//         <ul className="list-disc ml-5 text-gray-700 space-y-1 text-sm sm:text-base">
//           <li>Client information and contact management</li>
//           <li>Notifications for vendors, customers, and team members</li>
//           <li>Stakeholder pending action reminders</li>
//         </ul>
//       </div>

//       {/* Responsive Grid for Components */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <LeadAutoFetch />
//         <Reminders />
//         <SupportTickets />
//         <FollowUps />
//         <TodoList />
//         <NotificationsConfig />
//         <SalesPipeline />
//         <FeedbackTracking />
//       </div>
//     </div>
//   );
// };

// export default CRMPage;

// /src/pages/Admin/CRM/CRMPage.jsx
import React from "react";
import LeadAutoFetch from "./components/LeadAutoFetch";
import NotificationsConfig from "./components/NotificationsConfig";
import Reminders from "./components/Reminders";
import SupportTickets from "./components/SupportTickets";
import FollowUps from "./components/FollowUps";
import TodoList from "./components/TodoList";
import SalesPipeline from "./components/SalesPipeline";
import FeedbackTracking from "./components/FeedbackTracking";

const CRMPage = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      
      {/* Page Heading */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        CRM Dashboard
      </h1>

      {/* Grid Layout - Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <LeadAutoFetch />
        <NotificationsConfig />
        <Reminders />

        <SupportTickets />
        <FollowUps />
        <TodoList />

        <SalesPipeline />
        <FeedbackTracking />
      </div>
    </div>
  );
};

export default CRMPage;
