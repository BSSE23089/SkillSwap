import React, { useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setUserProfile } from "../../store/userSlice";
import API_URL from "../../config/api";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile);
  const theme = user?.themePreference || "light";

  // 🔥 Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    // Optimistic update in Redux
    dispatch(setUserProfile({ ...user, themePreference: newTheme }));

    try {
      const formData = new FormData();
      formData.append("themePreference", newTheme);

      const response = await fetch(`${API_URL}/api/users/${user._id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {throw new Error(data.error || "Failed to update theme");}

      dispatch(setUserProfile(data.user));
    } catch (error) {
      console.error("Error updating theme:", error);
      dispatch(setUserProfile({ ...user, themePreference: theme }));
    }
  };

  return (
    <button
      aria-label="Toggle theme"
      onClick={handleToggle}
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
        transition: "all 0.3s ease",
      }}
    >
      {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeToggle;
