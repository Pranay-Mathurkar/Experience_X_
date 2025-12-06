// src/contexts/AuthContext.jsx
import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

// Axios instance
const client = axios.create({
  baseURL: "http://localhost:8000/api/v1/users",
});

// Attach token to every request
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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

  // -------- SIGN UP ----------
  const handleSignUp = async (name, email, password) => {
    try {
      const res = await client.post("/SignUp", { name, email, password });

      if (res.status === 200 || res.status === 201) {
        const { token, user: userData } = res.data;

        if (token) {
          localStorage.setItem("token", token);
        }

        setUser(userData || { name, email });

        // after register go to login (or home if you want auto‑login)
        navigate("/login");
      }
    } catch (err) {
      console.error("SignUp failed:", err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "Sign up failed. Please try again.";
      throw new Error(message);
    }
  };

  // -------- LOGIN ----------
  const handleLogin = async (email, password) => {
    try {
      const res = await client.post("/login", { email, password });

      if (res.status === httpStatus.OK || res.status === 200) {
        const { token, user: userData } = res.data;

        if (token) {
          localStorage.setItem("token", token);
        }

        setUser(userData || null);

        // change to your dashboard route
        navigate("/home");
      }
    } catch (err) {
      console.error("Login failed:", err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please check your credentials.";
      throw new Error(message);
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
    handleSignUp,
    handleLogin,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
