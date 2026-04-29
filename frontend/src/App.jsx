import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(()=>{
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark");
    }else{
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")

    }
  }, [darkMode])

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="bg-gray-950 min-h-screen">
      
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#111827",
            color: "#fff",
            border: "1px solid #374151",
          },
        }}
      />

      <button
    onClick={() => setDarkMode(!darkMode)}
    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded"
  >
    {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
  </button>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
        
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
};

export default App;