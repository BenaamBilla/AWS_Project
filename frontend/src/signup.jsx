import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
export default function Signup() {
  let navigate;
  try {
    navigate = useNavigate();
  } catch (e) {
    navigate = (path) => { window.location.href = path; };
  }

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !username || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      localStorage.setItem("user_name", username);
      localStorage.setItem("access_token", "prep_token_" + Date.now());

      setTimeout(() => {
        if (typeof navigate === "function") {
          navigate("/dashboard");
        }
      }, 500);
    } catch (err) {
      setError("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    backgroundColor: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "11px",
    color: "#333",
    outline: "none",
    fontFamily: "sans-serif",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "var(--primary-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Outer Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          backgroundColor: "var(--neon-green)",
          borderRadius: "24px",
          padding: "12px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
        }}
      >
        {/* Inner layout: left panel + right panel */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            borderRadius: "16px",
            overflow: "hidden",
            minHeight: "260px",
          }}
        >
          {/* Left Panel */}
          <div
            style={{
              backgroundColor: "var(--primary-bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 24px",
            }}
          >
            <h1
              style={{
                fontSize: "30px",
                fontWeight: "400",
                color: "white",
                lineHeight: "1.35",
                margin: 0,
                textAlign: "center",
              }}
            >
              Create an<br />account
            </h1>
          </div>

          {/* Right Panel */}
          <div
            style={{
              backgroundColor: "var(--primary-bg)",
              borderRadius: "0 16px 16px 0",
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {error && (
              <div
                style={{
                  backgroundColor: "#fdd",
                  border: "1px solid #f99",
                  color: "#c00",
                  fontSize: "11px",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  marginBottom: "8px",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* email */}
              <input
                type="email"
                placeholder="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />

              {/* username */}
              <input
                type="text"
                placeholder="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={inputStyle}
              />

              {/* Password */}
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />

              {/* Confirm Password */}
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={inputStyle}
              />

              {/* SIGN UP Button */}
              <div style={{ display: "flex", justifyContent: "center", paddingTop: "12px" }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: "var(--neon-green)",
                    color: "#1a1a1a",
                    border: "none",
                    borderRadius: "20px",
                    padding: "8px 28px",
                    fontSize: "11px",
                    fontWeight: "600",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                    fontFamily: "sans-serif",
                  }}
                >
                  {loading ? "SIGNING UP..." : "SIGN UP"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
