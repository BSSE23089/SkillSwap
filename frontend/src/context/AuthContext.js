// AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // login only sets the user; token is in HttpOnly cookie
  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      // call backend logout route to clear cookie
      await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        credentials: "include", // send cookie to delete
      });
    } catch (err) {
      console.error("Logout error:", err);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
