const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const verifyToken = require("./routes/protected");
const cors = require('cors');
const protectedRoute = require("./routes/protected");
const productRoutes = require("./routes/Products");
const priceRoutes = require('./routes/prices');
const adminAuthRoutes = require("./routes/adminAuth");



dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/api", protectedRoute);
app.use("/api/Products", productRoutes);
app.use('/api/prices', priceRoutes);
app.use("/api/admin", adminAuthRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Routes
app.use("/api/auth", authRoutes);


// Protected route
app.get("/api/dashboard", verifyToken, (req, res) => {
  res.json({
    message: `Welcome ${req.user.name}, this is your protected dashboard.`,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
