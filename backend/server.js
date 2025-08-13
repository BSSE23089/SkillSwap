const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors"); // ✅ Import cors
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:3000" })); // ✅ Allow your React app
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
