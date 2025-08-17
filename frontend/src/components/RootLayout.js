import React, { useState, useEffect } from "react";
import MainNavbar from "./common/MainNavbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  // Placeholder: fetch user and set theme from user.themePreference
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // TODO: Replace with real user fetch
    // Example: fetch('/api/user/me').then(res => res.json()).then(user => setTheme(user.themePreference));
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return next;
    });
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <MainNavbar theme={theme} onToggleTheme={handleToggleTheme} />
      <Outlet />
    </>
  );
};

export default RootLayout;
