import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "./navigation";

export default function Source() {
  let navigate;
  try {
    navigate = useNavigate();
  } catch (e) {
    navigate = (path) => { window.location.href = path; };
  }

  const location = useLocation();
  const boardTitle = location.state?.title || "GATE PREP";

  const [activeTab, setActiveTab] = useState(null); // null | 'upload' | 'links' | 'text'
  const [fileName, setFileName]   = useState("");
  const [webUrl, setWebUrl]       = useState("");
  const [rawText, setRawText]     = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // navigate back to board after adding source
    if (typeof navigate === "function") {
      navigate("/board", { state: { title: boardTitle } });
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--primary-bg)", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ── TOP NAVBAR ─────────────────────────────── */}
      <Navigation title={boardTitle} />

      {/* â”€â”€ MAIN CONTENT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <main style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}>

        {/* Outer card */}
        <div style={{
          backgroundColor: "var(--secondary-bg)",
          borderRadius: "20px",
          padding: "20px",
          width: "100%",
          maxWidth: "480px",
          boxShadow: "0 8px 32px var(--neon-green)",
        }}>

          {/* INPUT SOURCES label bar */}
          <div style={{
            backgroundColor: "var(--text-main)",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "12px",
            fontWeight: "700",
            color: "#333",
            letterSpacing: "1px",
            textAlign: "center",
            marginBottom: "16px",
          }}>
            INPUT SOURCES
          </div>

          {/* Inner drop zone */}
          <div style={{
            backgroundColor: "var(--text-main)",
            borderRadius: "12px",
            padding: "48px 24px 24px",
            textAlign: "center",
          }}>
            {/* Drop zone text */}
            {activeTab === null && (
              <p style={{
                fontSize: "13px",
                fontWeight: "700",
                color: "#444",
                letterSpacing: "0.5px",
                marginBottom: "40px",
              }}>
                DROP PDFS, PPT, VIDEO LINKS
              </p>
            )}

            {/* Upload files tab content */}
            {activeTab === "upload" && (
              <div style={{ marginBottom: "24px" }}>
                <p style={{ fontSize: "12px", color: "black", marginBottom: "10px" }}>
                  Select or drag a PDF / PPT file
                </p>
                <input
                  type="text"
                  placeholder="e.g. Notes.pdf"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    backgroundColor: "var(--secondary-bg)",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "12px",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "sans-serif",
                  }}
                />
              </div>
            )}

            {/* Links tab content */}
            {activeTab === "links" && (
              <div style={{ marginBottom: "24px" }}>
                <p style={{ fontSize: "12px", color: "#555", marginBottom: "10px" }}>
                  Paste a YouTube / article URL
                </p>
                <input
                  type="url"
                  placeholder="https://..."
                  value={webUrl}
                  onChange={(e) => setWebUrl(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "12px",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "sans-serif",
                  }}
                />
              </div>
            )}

            {/* Text tab content */}
            {activeTab === "text" && (
              <div style={{ marginBottom: "24px" }}>
                <p style={{ fontSize: "12px", color: "var(--primary-bg)", marginBottom: "10px" }}>
                  Paste raw notes or text
                </p>
                <textarea
                  rows={4}
                  placeholder="Paste your notes here..."
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "12px",
                    outline: "none",
                    resize: "none",
                    boxSizing: "border-box",
                    fontFamily: "sans-serif",
                  }}
                />
              </div>
            )}

            {/* 3 Buttons: + Upload files | links | text */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                onClick={() => setActiveTab(activeTab === "upload" ? null : "upload")}
                style={{
                  backgroundColor: activeTab === "upload" ? "white" : "var(--text-main)",
                  border: "8px var(--secondary-bg)",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontSize: "11px",
                  color: "#333",
                  cursor: "pointer",
                  fontFamily: "sans-serif",
                  fontWeight:700,
                }}
              >
                + Upload files
              </button>
              <button
                onClick={() => setActiveTab(activeTab === "links" ? null : "links")}
                style={{
                  backgroundColor: activeTab === "links" ? "white" : "var(--text-main)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontSize: "11px",
                  color: "#333",
                  cursor: "pointer",
                  fontFamily: "sans-serif",
                }}
              >
                links
              </button>
              <button
                onClick={() => setActiveTab(activeTab === "text" ? null : "text")}
                style={{
                  backgroundColor: activeTab === "text" ? "white" : "var(--text-main)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontSize: "11px",
                  color: "#333",
                  cursor: "pointer",
                  fontFamily: "sans-serif",
                }}
              >
                text
              </button>
            </div>

            {/* Submit â€” only shown when a tab is active */}
            {activeTab !== null && (
              <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "var(--neon-green)",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 28px",
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "#222",
                    cursor: "pointer",
                    fontFamily: "sans-serif",
                  }}
                >
                  Add Source
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}