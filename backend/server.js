const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();

const path = require("path");
const app = express();

// Middleware

app.use(cookieParser());
app.use(express.json({ limit: "1mb" })); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const authRoutes = require("./routes/authRoutes");
const statsRoutes = require("./routes/statsRoutes");
const userRoutes = require("./routes/userRoutes");
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
app.use("/api/users", authRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/users", userRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30s instead of 51s default
  socketTimeoutMS: 45000,         // Allow sockets to stay open longer
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
