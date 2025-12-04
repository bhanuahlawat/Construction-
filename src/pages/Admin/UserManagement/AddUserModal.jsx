// import React, { useState } from "react";
// import { FaTimes, FaEye, FaEyeSlash, FaRandom } from "react-icons/fa";

// const AddUserModal = ({ isOpen, onClose, onAddUser, ROLES, STATUSES, PERMISSIONS }) => {
//   const [name, setName] = useState("");
//   const [role, setRole] = useState(ROLES.WORKER);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [permissions, setPermissions] = useState([]);

//   const togglePermission = (perm) => {
//     setPermissions((prev) =>
//       prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
//     );
//   };

//   const generatePassword = () => {
//     const chars =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?";
//     let pass = "";
//     for (let i = 0; i < 12; i++) {
//       pass += chars[Math.floor(Math.random() * chars.length)];
//     }
//     setPassword(pass);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newUser = {
//       id: Date.now(),
//       name,
//       role,
//       email,
//       password,
//       status: STATUSES.ACTIVE,
//       permissions, // save permissions here
//     };

//     onAddUser(newUser);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
//       <div className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-xl relative">
        
//         <button onClick={onClose} className="absolute top-4 right-4">
//           <FaTimes size={20} />
//         </button>

//         <h2 className="text-2xl font-bold mb-5 border-b pb-3">Add User</h2>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           <input
//             className="w-full border p-3 rounded-xl"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e)=>setName(e.target.value)}
//           />

//           <input
//             className="w-full border p-3 rounded-xl"
//             placeholder="Email"
//             value={email}
//             onChange={(e)=>setEmail(e.target.value)}
//           />

//           <div className="relative">
//             <input
//               className="w-full border p-3 rounded-xl"
//               type="password"
//               value={password}
//               placeholder="Password"
//               onChange={(e)=>setPassword(e.target.value)}
//             />

//             <button type="button" onClick={generatePassword} className="absolute right-3 top-3">
//               <FaRandom />
//             </button>
//           </div>

//           <select
//             className="w-full border p-3 rounded-xl"
//             value={role}
//             onChange={(e)=>setRole(e.target.value)}
//           >
//             {Object.values(ROLES).map((r)=>
//               <option key={r}>{r}</option>
//             )}
//           </select>

//           {/* PERMISSIONS */}
//           <div>
//             <p className="font-semibold mb-2">Permissions</p>

//             <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border p-3 rounded-xl">
//               {Object.entries(PERMISSIONS).map(([key, value]) => (
//                 <label key={key} className="flex items-center gap-2 text-sm">
//                   <input
//                     type="checkbox"
//                     checked={permissions.includes(value)}
//                     onChange={() => togglePermission(value)}
//                   />
//                   {value.replace(/_/g, " ").toUpperCase()}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <button className="w-full bg-teal-600 text-white p-3 rounded-xl">
//             Create User
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddUserModal;


import React, { useState } from "react";
import { FaTimes, FaEye, FaEyeSlash, FaRandom } from "react-icons/fa";

const AddUserModal = ({ isOpen, onClose, onAddUser, ROLES, STATUSES, PERMISSIONS }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState(ROLES.WORKER);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [showPassword, setShowPassword] = useState(false); // NEW

  const togglePermission = (perm) => {
    setPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?";
    let pass = "";
    for (let i = 0; i < 12; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(pass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(),
      name,
      role,
      email,
      password,
      status: STATUSES.ACTIVE,
      permissions,
    };

    onAddUser(newUser);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 h-full">
      <div className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-xl relative">

        <button onClick={onClose} className="absolute top-4 right-4">
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-5 border-b pb-3">Add User</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          {/* PASSWORD WITH SHOW/HIDE + GENERATE */}
          <div className="relative">
            <input
              className="w-full border p-3 rounded-xl pr-16"
              type={showPassword ? "text" : "password"} // SHOW/HIDE
              value={password}
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
            />

            {/* SHOW/HIDE BUTTON */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-12 top-3 text-gray-600"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>

            {/* GENERATE PASSWORD BUTTON */}
            <button
              type="button"
              onClick={generatePassword}
              className="absolute right-3 top-3 text-blue-600"
            >
              <FaRandom size={18} />
            </button>
          </div>

          <select
            className="w-full border p-3 rounded-xl"
            value={role}
            onChange={(e)=>setRole(e.target.value)}
          >
            {Object.values(ROLES).map((r)=>
              <option key={r}>{r}</option>
            )}
          </select>

          {/* PERMISSIONS */}
          <div>
            <p className="font-semibold mb-2">Permissions</p>

            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border p-3 rounded-xl">
              {Object.entries(PERMISSIONS).map(([key, value]) => (
                <label key={key} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={permissions.includes(value)}
                    onChange={() => togglePermission(value)}
                  />
                  {value.replace(/_/g, " ").toUpperCase()}
                </label>
              ))}
            </div>
          </div>

          <button className="w-full bg-teal-600 text-white p-3 rounded-xl">
            Create User
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
