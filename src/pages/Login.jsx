import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // Import axios

export default function LoginPage() {
  const [email, setEmail] = useState(""); // Changed from username to email
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added for loading state
  const [error, setError] = useState(""); // Added for error messages
  const navigate = useNavigate();

  // Removed the hard-coded 'users' array

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setError(""); // Clear previous errors

    try {
      const url = "https://backend.dreamvieweryatra.com/api/v1/user/userLogin";
      const { data } = await axios.post(url, { email, password });

      // Check if the login was successful (responseCode 200)
      if (data.responseCode === 200 && data.result?.token) {
        const auth = {
          token: data.result.token,
          userType: data.result.userType,
          email: data.result.email,
          id: data.result._id,
        };

        // Store auth data in session storage to stay logged in
        sessionStorage.setItem("auth", JSON.stringify(auth));

        // Redirect based on userType from API response
        const userType = (auth.userType || "").toUpperCase();

        if (userType === "ADMIN") {
          navigate("/admin");
        } else if (userType === "SUPERADMIN") {
          navigate("/superadmin");
        } else if (userType === "SUBCONTRACTOR") {
          navigate("/subcontractor");
        } else if (userType === "SUPPLIER") {
          navigate("/supplierdashboard");
        } else if (userType === "PMC") {
          navigate("/PMC");
        } else {
          // Fallback/default route if userType is "USER" or unknown
          // You can change "/admin" to any default dashboard
          navigate("/admin"); 
        }
      } else {
        // Handle cases where API returns 200 but no token or error
        setError(data.responseMessage || "Invalid credentials.");
      }
    } catch (err) {
      // Handle network errors or API 4xx/5xx errors
      if (err.response) {
        setError(err.response.data?.responseMessage || "Invalid email or password");
      } else if (err.request) {
        setError("Network error. Please try again later.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-200">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md border border-purple-100">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mb-3">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Sign in to continue your journey
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email" // Changed from text
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
              required
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              value={password}
              onChange={(e) => { setPassword(e.target.value); if (error) setError(""); }}
              required
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          {/* Display API Error Messages */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-purple-600 hover:text-purple-700 hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-600 text-sm mt-6 text-center">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-600 hover:text-purple-700 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}