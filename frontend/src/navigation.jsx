import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navigation({ title = "APP KA NAAM" }) {
  let navigate;
  try {
    navigate = useNavigate();
  } catch (e) {
    navigate = (path) => { window.location.href = path; };
  }

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        backgroundColor: "var(--primary-bg)",
        borderBottom: "1px solid var(--neon-green)",
        fontFamily: "sans-serif",
      }}
    >
      {/* Left: title pill */}
      <div
        style={{
          backgroundColor: "var(--primary-bg)",
          borderRadius: "20px",
          padding: "8px 20px",
          fontSize: "14px",
          fontWeight: "600",
          color: "var(--text-main)",
        }}
      >
        {title}
      </div>

      {/* Right: settings button + avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          onClick={() => typeof navigate === "function" && navigate("/settings")}
          style={{
            backgroundColor: "var(--primary-bg)",
            border: "none",
            borderRadius: "20px",
            padding: "6px 18px",
            fontSize: "12px",
            color: "var(--text-main)",
            cursor: "pointer",
            fontFamily: "sans-serif",
          }}
        >
          settings
        </button>

        {/* Avatar circle */}
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "white",
          }}
        />
      </div>
    </nav>
  );
}
