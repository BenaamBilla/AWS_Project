import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Page Components
import Login from "./login";
import Signup from "./signup";
import Dashboard from "./dashboard";
import Board from "./board";
import Source from "./source";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard Route (HELLO NAME & Prep Cards) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Prep Board Route (3 Panels: Source, Chat, Tracker) */}
        <Route path="/board" element={<Board />} />

        {/* Source Upload Route (INPUT SOURCES & Drop-zone) */}
        <Route path="/source" element={<Source />} />

        {/* Fallback to Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}