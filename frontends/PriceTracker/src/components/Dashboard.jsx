import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to view this page.");
      return;
    }

    try {
      const res = await axios.get("http://localhost:3000/api/Products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(res.data.products || []);
    } catch (err) {
      setError("Failed to load products. Please check your login.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]); // Add to top of list
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🛒 NaijaMarket Prices Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      
      {/* ✅ Product Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <div key={product._id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold capitalize">
              {product.food} ({product.state})
            </h2>
            <p className="text-gray-700">
              ₦{product.currentPrice?.toLocaleString()} per unit
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Previous: ₦{product.history?.[product.history.length - 2]?.toLocaleString() || 'N/A'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
