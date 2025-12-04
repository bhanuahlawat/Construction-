import React, { useState } from 'react';

// --- Form Sub-Components ---
// We define the forms as separate components *within the same file* // to keep the main component clean.

// 1. Profile Form Component
const ProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@pmc-example.com',
    jobTitle: 'Senior Project Manager',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this data to your API
    console.log('Profile data saved:', formData);
    alert('Profile saved!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
            <p className="mt-1 text-sm text-gray-500">Update your personal and company information.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-6 gap-6">
            <div className="sm:col-span-3">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                id="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="bg-blue-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

// 2. Notification Form Component
const NotificationForm = () => {
  const [settings, setSettings] = useState({
    rfi: true,
    safety: true,
    schedule: false,
    digest: true,
  });
  const [inAppEnabled, setInAppEnabled] = useState(true);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allSettings = { ...settings, inApp: inAppEnabled };
    // API call to save settings
    console.log('Notification settings saved:', allSettings);
    alert('Notification settings saved!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Notifications</h3>
            <p className="mt-1 text-sm text-gray-500">Control how you receive notifications for project updates.</p>
          </div>

          <fieldset>
            <legend className="text-base font-medium text-gray-900">Email Notifications</legend>
            <div className="mt-4 space-y-4">
              <div className="flex items-start">
                <div className="h-5 flex items-center">
                  <input id="rfi" name="rfi" type="checkbox" checked={settings.rfi} onChange={handleCheckboxChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="rfi" className="font-medium text-gray-700">New RFIs</label>
                  <p className="text-gray-500">Get notified when a new RFI is submitted.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-5 flex items-center">
                  <input id="safety" name="safety" type="checkbox" checked={settings.safety} onChange={handleCheckboxChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="safety" className="font-medium text-gray-700">Safety Incidents</label>
                  <p className="text-gray-500">Get notified immediately of any new safety reports.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-5 flex items-center">
                  <input id="schedule" name="schedule" type="checkbox" checked={settings.schedule} onChange={handleCheckboxChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="schedule" className="font-medium text-gray-700">Schedule Changes</label>
                  <p className="text-gray-500">Get notified of updates to the master schedule.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-5 flex items-center">
                  <input id="digest" name="digest" type="checkbox" checked={settings.digest} onChange={handleCheckboxChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="digest" className="font-medium text-gray-700">Daily Project Digest</label>
                  <p className="text-gray-500">Receive a daily summary of all project activity.</p>
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-base font-medium text-gray-900">In-App Notifications</legend>
            <div className="mt-4 flex items-center justify-between">
              <span className="flex-grow flex flex-col">
                <span className="text-sm font-medium text-gray-700">Enable In-App Notifications</span>
                <span className="text-sm text-gray-500">Show floating alerts inside the application.</span>
              </span>
              <button
                type="button"
                className={`${
                  inAppEnabled ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                role="switch"
                aria-checked={inAppEnabled}
                onClick={() => setInAppEnabled(!inAppEnabled)}
              >
                <span
                  aria-hidden="true"
                  className={`${
                    inAppEnabled ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                ></span>
              </button>
            </div>
          </fieldset>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="bg-blue-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

// 3. Password Form (Placeholder)
const PasswordForm = () => (
  <div className="shadow sm:rounded-md bg-white p-6">
    <h3 className="text-lg leading-6 font-medium text-gray-900">Change Password</h3>
    <p className="mt-1 text-sm text-gray-500">This is a placeholder for the password change form.</p>
    {/* You would add current password, new password, and confirm password fields here */}
  </div>
);

// 4. Company Form (Placeholder)
const CompanyForm = () => (
  <div className="shadow sm:rounded-md bg-white p-6">
    <h3 className="text-lg leading-6 font-medium text-gray-900">Company Details</h3>
    <p className="mt-1 text-sm text-gray-500">This is a placeholder for the company settings form.</p>
    {/* You would add company name, address, logo upload, etc. here */}
  </div>
);

// --- Navigation Data ---
// We store nav items in an array to easily map over them
const navigation = [
  {
    id: 'profile',
    name: 'Profile',
    icon: (
      <svg className="flex-shrink-0 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A1.75 1.75 0 0117.25 22.5h-9.5a1.75 1.75 0 01-1.75-2.382z" />
      </svg>
    ),
  },
  {
    id: 'password',
    name: 'Password',
    icon: (
      <svg className="flex-shrink-0 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: (
      <svg className="flex-shrink-0 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
  },
  {
    id: 'company',
    name: 'Company',
    icon: (
      <svg className="flex-shrink-0 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6.75M9 11.25h6.75M9 15.75h6.75M9 20.25h6.75" />
      </svg>
    ),
  },
];


// --- MAIN PAGE COMPONENT ---

const PMCSettings = () => {
  // State to track which navigation item is active
  const [activeTab, setActiveTab] = useState('profile');

  // Helper function to render the correct content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileForm />;
      case 'password':
        return <PasswordForm />;
      case 'notifications':
        return <NotificationForm />;
      case 'company':
        return <CompanyForm />;
      default:
        return <ProfileForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Settings
          </h1>
        </div>
      </div>

      {/* Main Content Area (2-column layout) */}
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          
          {/* 1. Left-hand Navigation */}
          <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = item.id === activeTab;
                const activeClasses = 'bg-gray-100 text-blue-600';
                const inactiveClasses = 'text-gray-900 hover:text-gray-900 hover:bg-gray-50';
                const iconActiveClasses = 'text-blue-500';
                const iconInactiveClasses = 'text-gray-400 group-hover:text-gray-500';

                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.id)}
                    className={`${
                      isActive ? activeClasses : inactiveClasses
                    } group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full text-left`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* We need to clone the icon to add dynamic classes */}
                    {React.cloneElement(item.icon, {
                      className: `${
                        isActive ? iconActiveClasses : iconInactiveClasses
                      } flex-shrink-0 -ml-1 mr-3 h-6 w-6`,
                    })}
                    <span className="truncate">{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* 2. Right-hand Content Area */}
          <div className="space-y-6 lg:col-span-9">
            {renderContent()}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PMCSettings;
