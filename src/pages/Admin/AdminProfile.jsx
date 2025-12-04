import React, { useState } from "react";
import { User, Mail, Phone, Edit, Lock, Camera, X } from "lucide-react";

// --- Mock user data ---
const mockUser = {
  name: "Elias Vance",
  username: "@elias_dev",
  phone: "987569745",
  email: "elias.vance@example.com",
  location: "Delhi",
  role: "Admin",
};

// --- Sub Component for Detail Rows ---
const ProfileDetail = ({ icon: Icon, label, value }) => (
  <div className="group flex items-center space-x-4 p-4 rounded-xl bg-white hover:bg-blue-50 transition-all duration-300 border border-gray-200 hover:border-blue-300 hover:shadow-md">
    <div className="p-2 rounded-lg bg-blue-600 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div className="flex-1">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-semibold text-gray-800 mt-0.5">{value}</p>
    </div>
  </div>
);

// --- Main Component ---
const ProfilePage = () => {
  const [user, setUser] = useState(mockUser);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [formData, setFormData] = useState(user);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle profile input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  // Save edited profile
  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  // Save password
  const handlePasswordSave = () => {
    const { oldPassword, newPassword, confirmPassword } = passwordData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("⚠️ Please fill all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("❌ New passwords do not match!");
      return;
    }

    alert("✅ Password changed successfully!");
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setIsChangingPassword(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 flex justify-center items-center">
      <div className="relative w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header banner */}
          <div className="h-32 bg-blue-600 relative"></div>

          <div className="px-6 sm:px-10 pb-8">
            {/* Profile Photo Section */}
            <div className="flex flex-col items-center -mt-16 mb-8 relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                <img
                  src="https://i.pravatar.cc/150"
                  alt="profile"
                  className="relative w-32 h-32 rounded-full border-4 border-white shadow-xl cursor-pointer group-hover:scale-105 transition-transform duration-300"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />
                <button className="absolute bottom-1 right-1 p-2 bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-200">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="mt-4 bg-white shadow-xl rounded-2xl border border-gray-100 py-2 px-1 absolute top-36 z-10 min-w-[180px] animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors duration-150 font-medium"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsImageModalOpen(true);
                    }}
                  >
                    View Full Profile
                  </button>
                </div>
              )}

              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-blue-600 text-base sm:text-lg font-medium mt-1">{user.username}</p>

              <div className="mt-3 px-4 py-1.5 bg-blue-600 rounded-full">
                <p className="text-white text-sm font-semibold">{user.role}</p>
              </div>
            </div>

            {/* === Edit Profile Form === */}
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                  <button
                    className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : isChangingPassword ? (
              // === Change Password Form ===
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">Old Password</label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                    onClick={handlePasswordSave}
                  >
                    Save Password
                  </button>
                  <button
                    className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300"
                    onClick={() => setIsChangingPassword(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // === Default Profile View ===
              <>
                <div className="grid gap-4 mb-8">
                  <ProfileDetail icon={Phone} label="Phone Number" value={user.phone} />
                  <ProfileDetail icon={Mail} label="Email Address" value={user.email} />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <button
                    className="group relative px-6 py-4 bg-blue-600 rounded-xl text-base font-semibold text-white overflow-hidden shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                    onClick={() => setIsEditing(true)}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Edit className="w-5 h-5" />
                      <span>Edit Profile</span>
                    </div>
                  </button>

                  <button
                    className="group relative px-6 py-4 bg-white border-2 border-gray-200 rounded-xl text-base font-semibold text-gray-700 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                    onClick={() => setIsChangingPassword(true)}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Lock className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                      <span className="group-hover:text-blue-600 transition-colors duration-300">
                        Change Password
                      </span>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* === Profile Image Modal === */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            <img
              src="https://i.pravatar.cc/300"
              alt="Full profile"
              className="rounded-xl w-72 h-72 object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
