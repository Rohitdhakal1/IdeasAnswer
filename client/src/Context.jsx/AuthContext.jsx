import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, SetUser] = useState(null);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/me", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        SetUser(data.userId);
      } else {
        SetUser(null);
      }
    } catch (error) {
      SetUser(null);
    }
    SetLoading(false);
  };

  const logout = async () => {
    await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    SetUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
