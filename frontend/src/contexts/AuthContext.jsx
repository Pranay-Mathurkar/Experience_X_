import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: "http://localhost:8000/api/v1/users",
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Load user from localStorage on first render
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Sync user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // -------- REGISTER ----------
  const handleRegister = async (name, email, password) => {
    try {
      const res = await client.post("/register", { name, email, password });

      if (res.status === 200 || res.status === 201) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user || { name, email });
        navigate("/login"); // after register go to login page
      }
    } catch (err) {
      console.error("Register failed:", err);
      throw err;
    }
  };

  // -------- LOGIN ----------
  const handleLogin = async (email, password) => {
    try {
      const res = await client.post("/login", { email, password });

      if (res.status === httpStatus.OK || res.status === 200) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user || null);
        navigate("/home"); // change to your dashboard route
      }
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  // -------- LOGOUT ----------
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    handleRegister,
    handleLogin,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
