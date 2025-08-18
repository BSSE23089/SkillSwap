// src/config/api.js

// You can switch automatically depending on environment
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://skill-swap-9ab9.vercel.app" // your deployed backend
    : "http://localhost:5000"; // local backend

export default API_URL;
