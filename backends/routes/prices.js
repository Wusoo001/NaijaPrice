const express = require("express");
const router = express.Router();
const Price = require("../models/price");
const protected = require("../middleware/protected");

// GET all food prices (protected)
router.get("/", protected, async (req, res) => {
  try {
    const prices = await Price.find();
    res.json({ prices });
  } catch (err) {
    res.status(500).json({ message: "Error fetching prices" });
  }
});

module.exports = router;
