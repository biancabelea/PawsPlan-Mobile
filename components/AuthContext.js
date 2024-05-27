import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearCredentials = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <AuthContext.Provider
      value={{ email, setEmail, password, setPassword, clearCredentials }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
