const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Admin Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "Admin already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const newAdmin = new User({ name, email, password: hashed, role: "admin" });
  await newAdmin.save();

  const token = jwt.sign(
    { id: newAdmin._id, name: newAdmin.name, role: "admin" },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(201).json({ token, user: { id: newAdmin._id, name: newAdmin.name, role: "admin" } });
});

// Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await User.findOne({ email });

  if (!admin || admin.role !== "admin") return res.status(401).json({ message: "Not authorized" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: admin._id, name: admin.name, role: admin.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, user: { id: admin._id, name: admin.name, role: admin.role } });
});

module.exports = router;
