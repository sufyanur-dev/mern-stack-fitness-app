import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const { pathname } = useLocation();
  return (
    <nav className="border-b bg-white">
      <div className="max-w-6xl mx-auto p-3 flex items-center gap-3 justify-between">
        <Link to="/" className="font-semibold">
          FitnessApp
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button className="btn-outline" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              {pathname !== "/login" && (
                <Link className="btn" to="/login">
                  Login
                </Link>
              )}
              {pathname !== "/register" && (
                <Link className="btn-outline" to="/register">
                  Register
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
