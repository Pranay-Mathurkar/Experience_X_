



import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});


const client = axios.create({
  baseURL: "https://experience-9t2k.onrender.com/api",
});


client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();


  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });


  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

 
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !user) {
      client
        .get("/me")  
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          handleLogout(); 
        });
    }
  }, []);

 
  const handleSignup = async (name, email, password) => {
    try {
      const res = await client.post("/signup", { name, email, password });

      if (res.status === 200 || res.status === 201) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user || { name, email });
        navigate("/home");
      }
    } catch (err) {
      console.error("Register failed:", err.response?.data || err.message);
      throw err;
    }
  };

  
  const handleLogin = async (email, password) => {
    try {
      const res = await client.post("/login", { email, password });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        navigate("/home");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      throw err;
    }
  };


const handleGoogleLogin = async (credentialResponse) => {
  try {
    const res = await client.post("/auth/google", {
      token: credentialResponse.credential,
    });

    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/home");
    }
  } catch (err) {
    console.error("Google login failed:", err.response?.data || err.message);
    throw err;
  }
};



  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    handleSignup,
    handleLogin,
    handleLogout,
    handleGoogleLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

