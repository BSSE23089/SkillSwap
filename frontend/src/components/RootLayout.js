import React, { useEffect, useState } from "react";
import MainNavbar from "./common/MainNavbar";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserProfile } from "../store/userSlice";
import API_URL from "../config/api";

const RootLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile);
  const [theme, setTheme] = useState(user?.themePreference || "light");

  // Sync local theme state with Redux
  useEffect(() => {
    setTheme(user?.themePreference || "light");
  }, [user?.themePreference]);

  // Apply theme to <body> globally
 useEffect(() => {
  document.body.setAttribute("data-theme", theme);
}, [theme]);

  const handleToggleTheme = async () => {
    if (!user || !user._id) {return;}

    const previousTheme = theme;
    const newTheme = theme === "dark" ? "light" : "dark";

    // Optimistic UI update
    setTheme(newTheme);
    dispatch(setUserProfile({ ...user, themePreference: newTheme }));

    try {
      const response = await fetch(`${API_URL}/api/users/${user._id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ themePreference: newTheme }),
      });

      const data = await response.json();

      if (!data.success) {throw new Error(data.error || "Failed to update theme");}

      // Update Redux with fresh backend data
      dispatch(setUserProfile(data.user));
    } catch (error) {
      console.error("Error updating theme:", error);
      // rollback
      setTheme(previousTheme);
      dispatch(setUserProfile({ ...user, themePreference: previousTheme }));
    }
  };

  return (
    <>
      <MainNavbar theme={theme} onToggleTheme={handleToggleTheme} />
      <Outlet />
    </>
  );
};

export default RootLayout;
