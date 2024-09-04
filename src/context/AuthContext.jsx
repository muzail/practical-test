/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useState } from "react";
import ENDPOINTS from "../utils/endpoints";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  // Login function
  const login = useCallback(
    (newToken) => {
      setToken(newToken);
      localStorage.setItem("token", newToken);
      navigate("/");
    },
    [navigate]
  );

  // Logout function
  const logout = useCallback(async () => {
    try {
      await axios.post(
        ENDPOINTS.LOGOUT,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setToken(null);
      localStorage.removeItem("token");
      navigate("/sign-in");
    } catch (error) {
      console.error("Logout failed", error);
    }
  }, [token, navigate]);
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
