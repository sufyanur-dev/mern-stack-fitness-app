import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  console.log("user", user);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
