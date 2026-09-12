import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "./navigation";

export default function Board() {
  let navigate;
  try {
    navigate = useNavigate();
  } catch (e) {
    navigate = (path) => { window.location.href = path; };
  }

  const location = useLocation();
  const boardTitle = location.state?.title || "GATE PREP";

  const [sources] = useState([
    { id: 1, name: "GATE_Syllabus_2026.pdf", type: "PDF" },
    { id: 2, name: "Data_Structures_Notes.txt", type: "Note" },
    { id: 3, name: "https://nptel.ac.in/algo-lectures", type: "Link" },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, sender: "ai", text: `Welcome to your ${boardTitle} workspace! Ask me anything.` },
  ]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [tasks, setTasks] = useState([
    { id: 1, text: "Solve 20 Graph Theory PYQs", completed: true },
    { id: 2, text: "Revise Virtual Memory Concepts", completed: false },
    { id: 3, text: "Complete DBMS Indexing Notes", completed: false },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;
    const userMsg = { id: Date.now(), sender: "user", text: inputPrompt.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "ai", text: `Based on your ${boardTitle} sources: Here is a breakdown for "${userMsg.text}".` },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)));
  };

  /* ── shared panel style ── */
  const panel = {
    backgroundColor: "var(--secondary-bg)",
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 8px 32px var(--neon-green)",
  };

  const tabLabel = {
    display: "inline-block",
    backgroundColor: "var(--primary-bg)",
    borderRadius: "6px",
    padding: "4px 12px",
    fontSize: "11px",
    fontWeight: "600",
    color: "white",
    marginBottom: "14px",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--primary-bg)", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ── TOP NAVBAR ─────────────────────────────── */}
      <Navigation title={boardTitle} />

      {/* ── 3-PANEL LAYOUT ─────────────────────────── */}
      <div style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        gap: "16px",
        padding: "20px 24px",
        maxWidth: "960px",
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
      }}>

        {/* ── LEFT: SOURCE ── */}
        <div style={{ ...panel, minHeight: "360px" }}>
          <span style={tabLabel}>source</span>

          {/* + Add sources button */}
          <button
            onClick={() => typeof navigate === "function" && navigate("/source", { state: { title: boardTitle } })}
            style={{
              backgroundColor: "var(--secondary-bg)",
              border: "none",
              borderRadius: "8px",
              padding: "8px 14px",
              fontSize: "11px",
              color: "var(--text-main)",
              cursor: "pointer",
              textAlign: "left",
              marginBottom: "12px",
              fontFamily: "sans-serif",
            }}
          >
            + Add sources
          </button>

          {/* Source items as gray bars */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {sources.map((src) => (
              <div key={src.id} style={{
                backgroundColor: "var(--text-main)",
                borderRadius: "6px",
                height: "12px",
                width: `${60 + src.id * 10}%`,
              }} />
            ))}
          </div>
        </div>

        {/* ── CENTER: CHAT ── */}
        <div style={{ ...panel, minHeight: "360px", justifyContent: "space-between" }}>
          <div>
            <span style={tabLabel}>chat</span>

            {/* AI message bubble */}
            <div style={{
              backgroundColor: "var(--secondary-bg)",
              borderRadius: "10px",
              padding: "12px 16px",
              fontSize: "12px",
              color: "white",
              marginBottom: "12px",
              maxWidth: "70%",
            }}>
              {messages[0]?.text}
            </div>

            {/* Spacer / separator bar */}
            <div style={{ backgroundColor: "white", height: "10px", borderRadius: "4px", marginBottom: "8px", width: "100%" }} />

            {/* Chat message bars (wireframe placeholders) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
              <div style={{ backgroundColor: "white", height: "10px", borderRadius: "4px", width: "75%" }} />
              <div style={{ backgroundColor: "white", height: "10px", borderRadius: "4px", width: "90%" }} />
              <div style={{ backgroundColor: "white", height: "10px", borderRadius: "4px", width: "65%" }} />
            </div>

            {/* Typing indicator */}
            {isTyping && (
              <div style={{ fontSize: "11px", color: "#888", fontStyle: "italic", marginBottom: "8px" }}>
                AI is typing...
              </div>
            )}
          </div>

          {/* Input bar at bottom */}
          <form onSubmit={handleSendMessage} style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
            <input
              type="text"
              placeholder="Ask anything..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              style={{
                flex: 1,
                backgroundColor: "white",
                border: "none",
                borderRadius: "20px",
                padding: "10px 16px",
                fontSize: "12px",
                color: "#222",
                outline: "none",
                fontFamily: "sans-serif",
              }}
            />
          </form>
        </div>

        {/* ── RIGHT: TRACKER ── */}
        <div style={{ ...panel, minHeight: "360px" }}>
          <span style={tabLabel}>tracker</span>

          {/* Tracker blocks */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                style={{
                  backgroundColor: task.completed ? "var(--text-main)" : "white",
                  borderRadius: "10px",
                  height: "54px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "12px",
                  fontSize: "11px",
                  color: "#444",
                  textDecoration: task.completed ? "line-through" : "none",
                  opacity: task.completed ? 0.6 : 1,
                }}
              >
                {task.text}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}