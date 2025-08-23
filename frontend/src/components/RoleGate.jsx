import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleGate({ allow = [], children }) {
  const { role } = useAuth();
  console.log("role", role);
  if (!allow.includes(role)) return <Navigate to="/login" replace />;
  return children;
}
