require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const menuRoutes = require("./routes/menuRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/review", reviewRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Error handler
app.use(errorHandler);

// ✅ CONNECT DB FIRST, THEN START SERVER
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.log("DB Error:", err.message);
  });