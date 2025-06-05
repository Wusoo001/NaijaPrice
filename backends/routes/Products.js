const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { verifyToken, requireAdmin } = require('../middleware/auth');

// Add new product (ADMIN ONLY)
router.post('/', verifyToken, requireAdmin, async (req, res) => {
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
    console.error(error);
    res.status(500).json({ message: "Error adding product" });
  }
});

module.exports = router;
