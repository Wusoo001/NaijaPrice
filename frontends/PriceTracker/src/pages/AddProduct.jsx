import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const AddProduct = () => {
  const [form, setForm] = useState({ food: "", state: "", currentPrice: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/admin-login");

    const decoded = jwtDecode(token);
    if (decoded.role !== "admin") return navigate("/");
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:3000/api/products", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("✅ Product added successfully!");
      setForm({ food: "", state: "", currentPrice: "" });
    } catch (err) {
      setMessage("❌ Failed to add product");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">➕ Add New Product</h2>
      {message && <p className="mb-2 text-sm">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="food"
          value={form.food}
          onChange={handleChange}
          placeholder="Food name"
          className="w-full px-3 py-2 border rounded"
        />
        <input
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="State"
          className="w-full px-3 py-2 border rounded"
        />
        <input
          name="currentPrice"
          type="number"
          value={form.currentPrice}
          onChange={handleChange}
          placeholder="Current Price"
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
