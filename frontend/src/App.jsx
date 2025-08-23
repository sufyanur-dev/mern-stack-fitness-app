import React from "react";
import Navbar from "./components/Navbar";
import RoutesView from "./routes";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <RoutesView />
      </div>
    </div>
  );
}
