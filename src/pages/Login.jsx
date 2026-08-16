import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Hardcoded credentials for testing
    if (username === "admin" && password === "vinzkiesaja") {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      className="section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Background Blobs */}
      <div
        className="bg-blob"
        style={{
          top: "20%",
          left: "20%",
          width: "300px",
          height: "300px",
          background: "var(--accent-primary)",
          opacity: 0.15,
        }}
      ></div>
      <div
        className="bg-blob"
        style={{
          bottom: "20%",
          right: "20%",
          width: "300px",
          height: "300px",
          background: "var(--accent-secondary)",
          opacity: 0.15,
        }}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="card glass"
        style={{ width: "100%", maxWidth: "420px", zIndex: 1 }}
      >
        <h2
          className="heading-lg"
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          <span className="gradient-text">Admin</span> Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">Username</label>
            <input
              type="text"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "1.5rem", padding: "1rem" }}
          >
            Login to Dashboard
          </motion.button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a
            href="/"
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.color = "var(--accent-primary)")
            }
            onMouseOut={(e) => (e.target.style.color = "var(--text-secondary)")}
          >
            &larr; Back to Home
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
