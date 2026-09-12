import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  let navigate;
  try {
    navigate = useNavigate();
  } catch (e) {
    navigate = (path) => { window.location.href = path; };
  }

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword]     = useState("");
  const [error, setError]           = useState("");
  const [loading, setLoading]       = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!identifier || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const existingName = localStorage.getItem("user_name");
      if (!existingName) {
        const formattedName = identifier.includes("@") ? identifier.split("@")[0] : identifier;
        localStorage.setItem("user_name", formattedName);
      }
      localStorage.setItem("access_token", "prep_token_" + Date.now());
      setTimeout(() => {
        if (typeof navigate === "function") navigate("/dashboard");
      }, 600);
    } catch (err) {
      setError("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    backgroundColor: "var(--primary-bg)",
    border: "none",
    borderRadius: "4px",
    fontSize: "11px",
    color: "#333",
    outline: "none",
    fontFamily: "sans-serif",
    boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--primary-bg)", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>

      {/* Top gray bar with "Log in" */}
      <div style={{
        backgroundColor: "var(--secondary-bg)",
        padding: "8px 16px",
        fontSize: "13px",
        fontWeight: "500",
        color: "white",
      }}>
        Log in
      </div>

      {/* Main content */}
      <main style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
      }}>

        {/* Outer card */}
        <div style={{
          width: "100%",
          maxWidth: "520px",
          backgroundColor: "var(--secondary-bg)",
          borderRadius: "24px",
          padding: "12px",
          boxShadow: "0 4px 24px var(--neon-green)",
        }}>

          {/* Inner two-panel grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            borderRadius: "16px",
            overflow: "hidden",
            minHeight: "240px",
          }}>

            {/* Left panel */}
            <div style={{
              backgroundColor: "var(--secondary-bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 24px",
            }}>
              <h1 style={{
                fontSize: "24px",
                fontWeight: "400",
                color: "var(--text-main)",
                lineHeight: "1.35",
                margin: 0,
                textAlign: "center",
              }}>
                Welcome<br />back
              </h1>
            </div>

            {/* Right panel */}
            <div style={{
              backgroundColor: "var(--secondary-bg)",
              borderRadius: "0 16px 16px 0",
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>

              {/* Error */}
              {error && (
                <div style={{
                  backgroundColor: "#fdd",
                  border: "1px solid #f99",
                  color: "#c00",
                  fontSize: "11px",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  marginBottom: "8px",
                  textAlign: "center",
                }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

                {/* Username input */}
                <input
                  type="text"
                  placeholder="username"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  style={inputStyle}
                />

                {/* Password input */}
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle}
                />

                {/* LOG IN button */}
                <div style={{ display: "flex", justifyContent: "center", paddingTop: "16px" }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: "var(--neon-green)",
                      color: "white",
                      border: "none",
                      borderRadius: "20px",
                      padding: "8px 32px",
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.7 : 1,
                      fontFamily: "sans-serif",
                    }}
                  >
                    {loading ? "LOGGING IN..." : "LOG IN"}
                  </button>
                </div>

              </form>

              {/* Sign up link */}
              <div style={{ textAlign: "center", fontSize: "10px", color: "#666", marginTop: "12px" }}>
                Don&apos;t have an account?{" "}
                <Link to="/signup" style={{ color: "var(--neon-green)", fontWeight: "700" }}>
                  Sign up
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}