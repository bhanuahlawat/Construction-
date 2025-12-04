import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // <-- 1. ADD ROLE STATE
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // --- Validation ---
    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    // --- 2. ADD ROLE VALIDATION ---
    if (!role) {
      setError("Please select a role.");
      return;
    }

    setIsLoading(true);

    try {
      const url = "https://backend.dreamvieweryatra.com/api/v1/user/userSignUp";
      
      // --- 3. ADD 'role' TO THE API REQUEST ---
      const { data } = await axios.post(url, {
        fullName,
        email,
        password,
        mobileNumber,
        role, // Send the selected role to the backend
      });

      if (data.responseCode === 200) {
        setSuccess("Account created successfully! You can now log in.");
        // Clear the form
        setFullName("");
        setEmail("");
        setMobileNumber("");
        setPassword("");
        setRole(""); // Clear the role dropdown
      } else {
        setError(data.responseMessage || "An unknown error occurred.");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.responseMessage || "Signup failed. Please try again.");
      } else if (err.request) {
        setError("Network error. Please try again later.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-200">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md border border-purple-100">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mb-3">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Join us today and get started
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              placeholder="9876543210"
              maxLength="10"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              autoComplete="new-password"
            />
          </div>

          {/* --- 4. ADD THE ROLE DROPDOWN --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sign up as
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all bg-white"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              disabled={isLoading}
            >
              <option value="" disabled>Select your role</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Superadmin</option>
              <option value="subcontractor">Subcontractor</option>
              <option value="supplier">Supplier</option>
              <option value="PMC">PMC</option>
            </select>
          </div>
          {/* --- END OF ROLE DROPDOWN --- */}


          {/* Display API Error/Success Messages */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-gray-600 text-sm mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-purple-600 hover:text-purple-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}