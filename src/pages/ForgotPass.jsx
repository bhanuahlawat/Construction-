import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmNewPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      const url = "https://backend.dreamvieweryatra.com/api/v1/user/passwordChange";
      const payload = { email, password, confirmNewPassword };
      const { data, status } = await axios.put(url, payload, { timeout: 15000 });

      // Expecting:
      // {
      //   "result": "Password changed successfully.",
      //   "responseMessage": "Opration successfull ",
      //   "responseCode": 200
      // }
      if (status === 200 && (data?.responseCode === 200 || data?.result)) {
        setSuccess(data?.result || "Password changed successfully.");
        setEmail("");
        setPassword("");
        setConfirmNewPassword("");
        // Optional: redirect to login after a short delay
        setTimeout(() => navigate("/", { replace: true }), 1200);
      } else {
        setError(data?.responseMessage || "Could not change password. Please try again.");
      }
    } catch (err) {
      if (err?.response) {
        setError(err.response.data?.message || "Invalid request. Please check your details.");
      } else if (err?.request) {
        setError("Network error. Please try again later.");
      } else {
        setError(err?.message || "An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-xl p-8 border border-purple-100">
          <div className="text-center mb-6">
            <div className="inline-block p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mb-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Forgot Password
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              Enter your email and new password to reset your account password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(""); if (success) setSuccess(""); }}
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (error) setError(""); if (success) setSuccess(""); }}
                required
                disabled={isLoading}
                autoComplete="new-password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                value={confirmNewPassword}
                onChange={(e) => { setConfirmNewPassword(e.target.value); if (error) setError(""); if (success) setSuccess(""); }}
                required
                disabled={isLoading}
                autoComplete="new-password"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {success && <p className="text-green-600 text-sm text-center">{success}</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 rounded-lg hover:shadow-lg hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Reset Password"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Remembered your password?{" "}
            <Link to="/" className="text-purple-600 hover:text-purple-700 font-semibold hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
