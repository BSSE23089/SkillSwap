// src/config/api.js

// You can switch automatically depending on environment
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://skill-swap-backend.vercel.app/api" // your deployed backend
    : "http://localhost:5000/api"; // local backend

export default API_URL;
