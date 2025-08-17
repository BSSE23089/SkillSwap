const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const statsRoutes = require("./routes/statsRoutes");
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Custom CORS middleware
const allowedOrigins = ["http://localhost:3000"]; // Add your frontend origins here

app.use((req, res, next) => {
  const {origin} = req.headers;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // allow cookies

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // handle preflight requests
  }

  next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/stats", statsRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
