import React from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = ({ theme, onToggle }) => (
  <button
    aria-label="Toggle theme"
    onClick={onToggle}
    style={{
      background: theme === "dark" ? "#1a2332" : "#f3f6fd",
      color: theme === "dark" ? "#6791E4" : "#3b5fff",
      border: theme === "dark" ? "1px solid #6791E4" : "none",
      borderRadius: 8,
      fontSize: 22,
      padding: "7px 12px",
      cursor: "pointer",
      marginRight: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease"
    }}
  >
    {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
  </button>
);

export default ThemeToggle;
