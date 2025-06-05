import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(null); // ✅ Fix: define setName
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const decoded = jwtDecode(token);
          // If name is encoded in token
          if (decoded.name) {
            setName(decoded.name);
          } else {
            // Or fetch it from API if not present in token
            const res = await axios.get("http://localhost:3000/api/auth/me", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setName(res.data.name);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setName(null);
      }
    };

    fetchUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">NaijaMarket</Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-green-200 transition">Home</Link>
          <a href="#features" className="hover:text-green-200 transition">Features</a>
          <a href="#how-it-works" className="hover:text-green-200 transition">How it Works</a>
          <a href="#contact" className="hover:text-green-200 transition">Contact</a>
          {token && <Link to="/dashboard" className="hover:text-green-200 transition">Dashboard</Link>}
        </div>

        <div className="hidden md:flex space-x-4 text-sm items-center">
          {token ? (
            <>
              <span className="mr-4">Hello, {name || "User"}</span>
              <button onClick={handleLogout} className="px-4 py-2 bg-white text-green-600 font-semibold rounded hover:bg-green-100 transition">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 bg-white text-green-600 font-semibold rounded hover:bg-green-100 transition">Login</Link>
              <Link to="/signup" className="px-4 py-2 border border-white font-semibold rounded hover:bg-white hover:text-green-600 transition">Sign Up</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3">
          <Link to="/" className="block hover:text-green-200" onClick={() => setIsOpen(false)}>Home</Link>
          <a href="#features" className="block hover:text-green-200" onClick={() => setIsOpen(false)}>Features</a>
          <a href="#how-it-works" className="block hover:text-green-200" onClick={() => setIsOpen(false)}>How it Works</a>
          <a href="#contact" className="block hover:text-green-200" onClick={() => setIsOpen(false)}>Contact</a>
          {token && <Link to="/dashboard" className="block hover:text-green-200" onClick={() => setIsOpen(false)}>Dashboard</Link>}
          <hr className="my-2 border-green-300" />
          {token ? (
            <>
              <span className="block px-4 py-2 text-white font-semibold">Hello, {name || "User"}</span>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full bg-white text-green-600 px-4 py-2 rounded font-semibold hover:bg-green-100">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block bg-white text-green-600 px-4 py-2 rounded font-semibold text-center hover:bg-green-100" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/signup" className="block border border-white px-4 py-2 rounded font-semibold text-center hover:bg-white hover:text-green-600" onClick={() => setIsOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
