import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Get values from localStorage on initialization
  const storedToken = localStorage.getItem("authToken");
  const storedUsername = localStorage.getItem("username");
  const storedEmail = localStorage.getItem("userEmail");

  const [isAuthenticated, setIsAuthenticated] = useState(!!storedToken);  // Only this line is needed
  const [username, setUsername] = useState(storedUsername || "");
  const [email, setEmail] = useState(storedEmail || ""); // Store Email

  // Save Token, Username, and Email on Login
  const login = (token, user, userEmail) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("username", user);
    localStorage.setItem("userEmail", userEmail); // Store Email
    setIsAuthenticated(true);
    setUsername(user);
    setEmail(userEmail);
  };

  // Remove Token, Username, and Email on Logout
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail"); // Remove Email
    setIsAuthenticated(false);
    setUsername("");
    setEmail("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
