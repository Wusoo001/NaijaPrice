// pages/AdminSignup.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", {
        ...formData,
        role: "admin",
      }, {
        headers: {
          "x-admin-key": "mySuperSecretAdminKey123", // 👈 same as in your .env
        },
      });

      localStorage.setItem("token", res.data.token);
      navigate("/admin-dashboard"); // or wherever you route admins
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      console.error("Admin signup error:", err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">🔐 Admin Signup</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Sign Up
        </button>
      </form>
      <p className="text-sm mt-4 text-center">
              Already have an account?{" "}
              <a href="/admin-login" className="text-green-600 underline">
                Login here
              </a>
        </p>
    </div>
  );
};

export default AdminSignup;
