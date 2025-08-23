import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminMembers from "./pages/admin/Members";
import AdminClasses from "./pages/admin/Classes";
import UploadPlan from "./pages/admin/UploadPlan";
import MemberClasses from "./pages/member/Classes";
import MemberPlans from "./pages/member/Plans";
import ClassDetails from "./pages/member/ClassDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleGate from "./components/RoleGate";
import ClassMembers from "./pages/admin/ClassMembers";

export default function RoutesView() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin */}
      <Route
        path="/admin/members"
        element={
          <ProtectedRoute>
            <RoleGate allow={["admin"]}>
              <AdminMembers />
            </RoleGate>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/classes"
        element={
          <ProtectedRoute>
            <RoleGate allow={["admin"]}>
              <AdminClasses />
            </RoleGate>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/uploadPlan"
        element={
          <ProtectedRoute>
            <RoleGate allow={["admin"]}>
              <UploadPlan />
            </RoleGate>
          </ProtectedRoute>
        }
      />

      {/* Member */}
      <Route
        path="/member/classes"
        element={
          <ProtectedRoute>
            <RoleGate allow={["member", "admin"]}>
              <MemberClasses />
            </RoleGate>
          </ProtectedRoute>
        }
      />
      <Route
        path="/member/classes/:id"
        element={
          <ProtectedRoute>
            <RoleGate allow={["member", "admin"]}>
              <ClassDetails />
            </RoleGate>
          </ProtectedRoute>
        }
      />
      <Route
        path="/member/plans"
        element={
          <ProtectedRoute>
            <RoleGate allow={["member", "admin"]}>
              <MemberPlans />
            </RoleGate>
          </ProtectedRoute>
        }
      />
      <Route
        path="/classes/members"
        element={
          <ProtectedRoute>
            <RoleGate allow={["admin"]}>
              <ClassMembers />
            </RoleGate>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
