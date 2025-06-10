// pages/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({ food: '', state: '', sort: '' });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let results = [...products];

    if (filters.food) {
      results = results.filter(p =>
        p.food.toLowerCase().includes(filters.food.toLowerCase())
      );
    }

    if (filters.state) {
      results = results.filter(p =>
        p.state.toLowerCase().includes(filters.state.toLowerCase())
      );
    }

    if (filters.sort === 'asc') {
      results.sort((a, b) => a.currentPrice - b.currentPrice);
    } else if (filters.sort === 'desc') {
      results.sort((a, b) => b.currentPrice - a.currentPrice);
    }

    setFiltered(results);
  }, [filters, products]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products");
      setProducts(res.data.products || []);
      setFiltered(res.data.products || []);
    } catch (err) {
      setError("Failed to load data.");
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📊 Market Prices for Users</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* 🔍 Filter Bar */}
      <div className="mb-6 flex flex-wrap gap-4">
        <input
          name="food"
          placeholder="Filter by food"
          value={filters.food}
          onChange={handleChange}
          className="px-3 py-2 border rounded"
        />
        <input
          name="state"
          placeholder="Filter by state"
          value={filters.state}
          onChange={handleChange}
          className="px-3 py-2 border rounded"
        />
        <select name="sort" value={filters.sort} onChange={handleChange} className="px-3 py-2 border rounded">
          <option value="">Sort by price</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      {/* 📦 Product Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((product) => {
          const history = product.history || [];
          const prevPrice = history.length > 1 ? history[history.length - 2] : null;

          return (
            <div key={product._id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold capitalize">
                {product.food} ({product.state})
              </h2>
              <p className="text-gray-700">
                <strong>Current:</strong> ₦{product.currentPrice?.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                <strong>Previous:</strong> ₦{prevPrice?.toLocaleString() || 'N/A'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserDashboard;
