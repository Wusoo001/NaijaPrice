import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    food: '',
    state: '',
    sort: '', // 'asc' or 'desc'
  });

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to view this page.");
      return;
    }

    try {
      const res = await axios.get("http://localhost:3000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const productsData = res.data.products || [];
      setProducts(productsData);
      setFiltered(productsData);
    } catch (err) {
      setError("Failed to load products. Please check your login.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filteredList = [...products];

    // Filter by food
    if (filters.food) {
      filteredList = filteredList.filter(p =>
        p.food.toLowerCase().includes(filters.food.toLowerCase())
      );
    }

    // Filter by state
    if (filters.state) {
      filteredList = filteredList.filter(p =>
        p.state.toLowerCase().includes(filters.state.toLowerCase())
      );
    }

    // Sort by price
    if (filters.sort === 'asc') {
      filteredList.sort((a, b) => a.currentPrice - b.currentPrice);
    } else if (filters.sort === 'desc') {
      filteredList.sort((a, b) => b.currentPrice - a.currentPrice);
    }

    setFiltered(filteredList);
  }, [filters, products]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🛒 NaijaMarket Prices Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* 🔍 Filter and Sort Controls */}
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

      {/* 📦 Product Grid */}
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

export default Dashboard;
