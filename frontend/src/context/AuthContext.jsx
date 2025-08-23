import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData?.token && authData?.user) {
      setToken(authData.token);
      setUser(authData.user);
    }
  }, []);

  const login = ({ user, token }) => {
    localStorage.setItem("auth", JSON.stringify({ user, token }));
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, role: user?.role, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
