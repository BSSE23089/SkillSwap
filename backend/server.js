const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const statsRoutes = require("./routes/statsRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ CORS setup
const allowedOrigins = [
  "http://localhost:3000", 
  "https://skill-swap-git-shiza-shiza-shumaims-projects.vercel.app", // vercel preview
  "https://skill-swap-sepia.vercel.app" // production frontend
];


app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/stats", statsRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
