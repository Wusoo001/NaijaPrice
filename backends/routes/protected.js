const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/protected");

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}, you have access.` });
});

module.exports = router;
