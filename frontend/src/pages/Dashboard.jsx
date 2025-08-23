import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { role, token } = useAuth();

  if (!token) return <p className="text-center mt-10">Redirecting...</p>;
  if (!role) return <p className="text-center mt-10">Loading Dashboard...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard</h1>
      {role === "admin" ? (
        <div className="space-x-4 space-y-3">
          <button
            onClick={() => navigate("/admin/members")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Manage Members
          </button>
          <button
            onClick={() => navigate("/admin/classes")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Manage Classes
          </button>
          <button
            onClick={() => navigate("/admin/uploadPlan")}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Assign Workout Plan
          </button>
        </div>
      ) : (
        <div className="space-x-4">
          <button
            onClick={() => navigate("/member/classes")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            My Classes
          </button>
          <button
            onClick={() => navigate("/member/plans")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            My Workout Plans
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
