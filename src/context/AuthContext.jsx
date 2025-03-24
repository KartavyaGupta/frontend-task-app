import React, { useState, createContext, useEffect, Children } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadToken();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      const recievedToken = res.data.token;
      setToken(recievedToken);
      await AsyncStorage.setItem("token", recievedToken);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const signup = async (name, email, password, passwordConfirmation) => {
    try {
      const res = await API.post("/auth/signup", {
        name,
        email,
        password,
        passwordConfirmation,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setToken(null);
      console.log("running");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <AuthContext.Provider value={{ token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
