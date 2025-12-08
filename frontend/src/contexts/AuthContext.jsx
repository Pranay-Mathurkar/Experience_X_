// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext({});

// const client = axios.create({
//   baseURL: "http://localhost:3000/api",
// });



// client.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });





// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();

  


//   const [user, setUser] = useState(() => {
//     try {
//       const savedUser = localStorage.getItem("user");
//       return savedUser ? JSON.parse(savedUser) : null;
//     } catch {
//       return null;
//     }
//   });

  


//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [user]);

//   // ================== SIGNUP ==================




//   const handleSignup = async (name, email, password) => {
//     try {
//       const res = await client.post("/signup", { name, email, password });

//       if (res.status === 200 || res.status === 201) {
//         localStorage.setItem("token", res.data.token);
//         setUser(res.data.user || { name, email });
//         navigate("/home"); 
//       }
//     } catch (err) {
//       console.error("Register failed:", err.response?.data || err.message);
//       throw err;
//     }
//   };




//   // ================== LOGIN ==================




//   const handleLogin = async (email, password) => {
//     try {
//       const res = await client.post("/login", { email, password });

//       if (res.status === 200) {
//         localStorage.setItem("token", res.data.token);
//         setUser(res.data.user);
//         navigate("/home");
//       }
//     } catch (err) {
//       console.error("Login failed:", err.response?.data || err.message);
//       throw err;
//     }
//   };





//   // ================== LOGOUT ==================



//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/login");
//   };

//   const value = {
//     user,
//     handleSignup,
//     handleLogin,
//     handleLogout,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// export const useAuth = () => useContext(AuthContext);






import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

// ✅ Use correct backend port
const client = axios.create({
  baseURL: "http://localhost:3000/api", // keep this if backend is really on 3000
});

// ✅ Attach token to every request
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // ✅ Load user from localStorage
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // ✅ Persist user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // ✅ ✅ ✅ RESTORE USER AFTER PAGE RELOAD WITH TOKEN
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !user) {
      client
        .get("/me")  // ✅ REQUIRED BACKEND ROUTE
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          handleLogout(); // invalid token → logout
        });
    }
  }, []);

  // ================== SIGNUP ==================
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

  // ================== LOGIN ==================
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

  // ================== GOOGLE LOGIN ==================
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


  // ================== LOGOUT ==================
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

