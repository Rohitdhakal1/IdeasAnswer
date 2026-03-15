import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context.jsx/AuthContext";

function ProtectedRoutes({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading.....</p>;

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoutes;
