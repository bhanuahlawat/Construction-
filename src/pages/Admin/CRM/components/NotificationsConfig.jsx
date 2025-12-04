// // components/NotificationsConfig.jsx
// import React from "react";

// const NotificationsConfig = () => {
//   const settings = {
//     newLead: true,
//     followUpReminder: false,
//     ticketUpdates: true,
//   };

//   return (
//     <div className="bg-white rounded-xl shadow p-4">
//       <h2 className="text-lg font-semibold mb-3">Notification Settings</h2>

//       {Object.entries(settings).map(([key, value]) => (
//         <div
//           key={key}
//           className="flex justify-between items-center p-2 border-b"
//         >
//           <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
//           <span
//             className={`px-3 py-1 text-sm rounded-full ${
//               value ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
//             }`}
//           >
//             {value ? "ON" : "OFF"}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NotificationsConfig;


// components/NotificationsConfig.jsx
import React, { useState } from "react";

const NotificationsConfig = () => {
  const [settings, setSettings] = useState({
    newLead: true,
    followUpReminder: false,
    ticketUpdates: true,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Notification Settings</h2>

      <div className="space-y-4">
        {Object.entries(settings).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between items-center p-2 border rounded-lg bg-gray-50"
          >
            {/* Setting Name */}
            <span className="capitalize font-medium">
              {key.replace(/([A-Z])/g, " $1")}
            </span>

            {/* Toggle Switch */}
            <button
              onClick={() => toggleSetting(key)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                value ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${
                  value ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsConfig;
