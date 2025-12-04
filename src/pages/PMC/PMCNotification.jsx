import React, { useState } from 'react';

// --- MOCK DATA ---
// In a real app, you would fetch this from an API
const MOCK_NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'rfi',
    title: "New RFI submitted for 'Tower B - HVAC'",
    description: "Contractor 'Apex Mechanical' has submitted RFI-00-B-17 regarding ductwork specifications.",
    timestamp: "2 minutes ago",
    isUnread: true
  },
  {
    id: 'n2',
    type: 'safety',
    title: "Site Safety Incident Report",
    description: "A minor incident was reported at Zone 4 (Scaffolding). No injuries, but corrective action is required.",
    timestamp: "1 hour ago",
    isUnread: true
  },
  {
    id: 'n3',
    type: 'approval',
    title: "Change Order <strong class=\"font-semibold\">CO-007</strong> Approved",
    description: "The budget adjustment for 'Additional Landscaping' has been approved by the client.",
    timestamp: "Yesterday at 4:30 PM",
    isUnread: false
  },
  {
    id: 'n4',
    type: 'upload',
    title: "New Documents Uploaded",
    description: "'Alpha Engineering' uploaded revised structural blueprints for the podium level.",
    timestamp: "2 days ago",
    isUnread: false
  },
];

// --- STYLES & ICONS (Helpers) ---

// A mapping to dynamically set the icon background color
const ICON_STYLES = {
  rfi: 'bg-blue-100',
  safety: 'bg-yellow-100',
  approval: 'bg-green-100',
  upload: 'bg-indigo-100',
};

// This helper function returns the correct SVG icon based on the 'type' prop
const getNotificationIcon = (type) => {
  switch (type) {
    case 'rfi':
      // Heroicon: document-text
      return (
        <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    case 'safety':
      // Heroicon: exclamation-triangle
      return (
        <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      );
    case 'approval':
      // Heroicon: check-badge
      return (
        <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.242-.152 2.452-.428 3.585a.75.75 0 01-.126.477l-1.93 3.093a.75.75 0 01-.58.345H5.035a.75.75 0 01-.58-.345l-1.93-3.093a.75.75 0 01-.126-.477C2.152 14.452 2 13.242 2 12c0-5.523 4.477-10 10-10s10 4.477 10 10z" />
        </svg>
      );
    case 'upload':
      // Heroicon: arrow-up-tray
      return (
        <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      );
    default:
      return null;
  }
};

// --- MAIN COMPONENT ---
// Renamed from NotificationPage to PMCNotification
const PMCNotification = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  // Function to mark all notifications as read
  const handleMarkAllAsRead = () => {
    const allRead = notifications.map(n => ({ ...n, isUnread: false }));
    setNotifications(allRead);
  };

  const unreadCount = notifications.filter(n => n.isUnread).length;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* 1. Header Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Project Notifications
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-xs font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </h1>
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm font-medium text-blue-600 hover:text-blue-500 disabled:text-gray-400"
              disabled={unreadCount === 0}
            >
              Mark all as read
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-600">
            Updates from all active sites and teams.
          </p>
        </div>
        
        {/* 2. Notification List */}
        <div className="divide-y divide-gray-200">
          {notifications.length > 0 ? (
            notifications.map(notification => {
              // Logic from NotificationItem is inlined here
              const { id, type, title, description, timestamp, isUnread } = notification;
              const itemClasses = `p-6 flex items-start space-x-4 ${
                isUnread ? 'bg-blue-50' : 'bg-white'
              }`;
              const iconBgClass = ICON_STYLES[type] || 'bg-gray-100';

              return (
                <div key={id} className={itemClasses}>
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <span className={`inline-flex justify-center items-center h-10 w-10 rounded-full ${iconBgClass}`}>
                      {getNotificationIcon(type)}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900" dangerouslySetInnerHTML={{ __html: title }} />
                    <p className="mt-1 text-sm text-gray-600">{description}</p>
                    <p className="mt-1 text-sm text-gray-500">{timestamp}</p>
                  </div>
                  
                  {/* Unread Dot (or spacer) */}
                  <div className="flex-shrink-0 self-center">
                    {isUnread ? (
                      <div className="h-2.5 w-2.5 rounded-full bg-blue-600"></div>
                    ) : (
                      <div className="h-2.5 w-2.5 rounded-full bg-transparent"></div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-10 text-center">
              <p className="text-gray-500">You're all caught up!</p>
            </div>
          )}
        </div>

        {/* 3. Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
          <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            View All Notifications
          </a>
        </div>

      </div>
    </div>
  );
};

export default PMCNotification; // Updated export