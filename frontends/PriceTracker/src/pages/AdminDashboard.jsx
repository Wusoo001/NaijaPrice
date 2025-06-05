import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized. Please log in.");
        return navigate("/admin-login");
      }

      try {
        const res = await axios.get("http://localhost:3000/api/Products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const decoded = JSON.parse(atob(token.split(".")[1]));
        if (decoded.role !== "admin") {
          setError("Access denied. Admins only.");
          return navigate("/login");
        }

        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch products.");
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Admin Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow hover:shadow-md">
            <h2 className="text-xl font-semibold capitalize">
              {product.food} ({product.state})
            </h2>
            <p className="text-green-800 mt-1 font-medium">
              ₦{product.currentPrice?.toLocaleString()} per unit
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Previous: ₦{product.history?.[product.history.length - 2]?.toLocaleString() || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
