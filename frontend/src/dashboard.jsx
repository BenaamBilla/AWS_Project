import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./navigation";

export default function Dashboard() {
  let navigate;
  try {
    navigate = useNavigate();
  } catch (e) {
    navigate = (path) => { window.location.href = path; };
  }

  const [userName, setUserName] = useState("NAME");

  const [prepCards, setPrepCards] = useState([
    { id: "gate-prep",    title: "GATE PREP",    tasksCount: 15, completedCount: 9 },
    { id: "mid-sem-prep", title: "MID SEM PREP", tasksCount: 10, completedCount: 6 },
    { id: "project-prep", title: "PROJECT PREP", tasksCount: 8,  completedCount: 7 },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    try {
      const savedName = localStorage.getItem("user_name");
      if (savedName) setUserName(savedName.toUpperCase());
    } catch (err) {
      console.warn("Storage access warning:", err);
    }
  }, []);

  const handleCreateCard = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newCard = {
      id: "prep-" + Date.now(),
      title: newTitle.trim().toUpperCase(),
      tasksCount: 0,
      completedCount: 0,
    };
    setPrepCards([...prepCards, newCard]);
    setNewTitle("");
    setShowCreateModal(false);
    if (typeof navigate === "function") {
      navigate("/board", { state: { title: newCard.title } });
    }
  };


  const handleOpenBoard = (card) => {
    if (typeof navigate === "function") {
      navigate("/board", { state: { title: card.title } });
    }
  };

  const handleLogout = () => {
    try { localStorage.removeItem("access_token"); } catch (err) {}
    if (typeof navigate === "function") navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--primary-bg)", fontFamily: "sans-serif" }}>

      {/* TOP NAVBAR */}
      <Navigation title={userName} />

      {/* MAIN CONTENT */}
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px" }}>

        {/* HELLO NAME banner */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{
            display: "inline-block",
            backgroundColor: "var(--primary-bg)",
            borderRadius: "8px",
            padding: "10px 24px",
          }}>
            <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: "var(--text-main)", letterSpacing: "1px" }}>
              HELLO {userName}
            </h1>
          </div>
        </div>

        {/* CARDS ROW */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>

          {/* CREATE NEW card */}
          <div
            onClick={() => setShowCreateModal(true)}
            style={{
              backgroundColor: "var(--secondary-bg)",
              border: "2px dashed var(--neon-green)",
              borderRadius: "16px",
              padding: "16px",
              minHeight: "160px",
              minWidth: "160px",
              flex: "1",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "28px", color: "var(--text-main)", lineHeight: 1 }}>+</span>
            <span style={{ fontSize: "11px", color: "var(--text-main)", letterSpacing: "1px" }}>CREATE NEW</span>
          </div>

          {/* PREP CARDS */}
          {prepCards.map((c) => (
            <div
              key={c.id}
              onClick={() => handleOpenBoard(c)}
              style={{
                backgroundColor: "var(--secondary-bg)",
                borderRadius: "16px",
                padding: "16px",
                minHeight: "160px",
                minWidth: "160px",
                flex: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                cursor: "pointer",
                border: "none",
                gap: "10px",
              }}
            >
              {/* Title bar */}
              <div style={{
                backgroundColor: "white",
                borderRadius: "6px",
                padding: "6px 10px",
                fontSize: "11px",
                fontWeight: "700",
                color: "#222",
                letterSpacing: "0.5px",
              }}>
                {c.title}
              </div>

              {/* Status bar */}
              <div style={{
                backgroundColor: "white",
                borderRadius: "4px",
                height: "14px",
                width: "70%",
              }} />
            </div>
          ))}

        </div>
      </main>

      {/* CREATE MODAL */}
      {showCreateModal && (
        <div style={{
          position: "fixed", inset: 0,
          backgroundColor: "rgba(0,0,0,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 50,
        }}>
          <div style={{
            backgroundColor: "var(secondary-bg)",
            borderRadius: "16px",
            padding: "28px",
            width: "100%",
            maxWidth: "380px",
            boxShadow: "0 8px 32px var(--neon-green)",
          }}>
            <h3 style={{ margin: "0 0 16px", fontSize: "16px", color: "white" }}>
              Create New Prep
            </h3>
            <form onSubmit={handleCreateCard}>
              <input
                type="text"
                placeholder="e.g. COMPILER DESIGN PREP"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  backgroundColor: "var(--text-main)",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "13px",
                  color: "#222",
                  outline: "none",
                  marginBottom: "16px",
                  boxSizing: "border-box",
                }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  style={{
                    padding: "8px 20px", backgroundColor: "var(--neon-green)",
                    border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "700",fontSize: "12px",color:"var(--secondary-bg)",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "8px 20px", backgroundColor: "var(--neon-green)",
                    border: "none", borderRadius: "8px", cursor: "pointer",
                    fontSize: "12px", fontWeight: "700",color: "var(--secondary-bg)",
                  }}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}