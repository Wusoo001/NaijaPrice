const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { verifyToken, requireAdmin } = require('../middleware/auth');

// GET ALL PRODUCTS (for dashboard, public or protected depending on your design)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// POST product (admin only)
router.post("/", verifyToken, requireAdmin, async (req, res) => {
  const { food, state, currentPrice } = req.body;
  if (!food || !state || !currentPrice) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newProduct = new Product({
      food,
      state,
      currentPrice,
      history: [currentPrice],
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
  console.error("Error in POST /api/products:", error); // ✅ log this
  res.status(500).json({ message: "Error adding product", error: error.message });
}

});

module.exports = router;
