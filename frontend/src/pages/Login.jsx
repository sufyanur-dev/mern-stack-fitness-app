import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ErrorToast from "../components/ErrorToast";
import SuccessToast from "../components/SuccessToast";

export default function Login() {
  const nav = useNavigate();
  const { login, user } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    // If user is already logged in, go to dashboard
    if (user) {
      nav("/dashboard");
    }
  }, [user, nav]);

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", form);
      login({ user: data, token: data.token });
      if (data) {
        console.log("data-login", data);
        console.log("data.token", data.token);
        SuccessToast("Login Successful");
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 card">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="input"
          name="email"
          placeholder="Email"
          onChange={onChange}
          required
        />
        <input
          className="input"
          name="password"
          type="password"
          placeholder="Password"
          onChange={onChange}
          required
        />
        <button className="btn w-full">Login</button>
      </form>
      <p className="text-sm mt-3">
        No account?{" "}
        <Link className="underline" to="/register">
          Register
        </Link>
      </p>
    </div>
  );
}
