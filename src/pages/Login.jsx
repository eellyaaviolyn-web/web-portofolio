import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from '../lib/supabase';
import { toast } from '../components/Toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      toast.error(error.message || "Email atau password salah.");
    } else if (data.session) {
      toast.success("Login berhasil! Selamat datang, Admin.");
      navigate("/admin");
    }
    
    setIsLoading(false);
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
            <label className="input-label">Email</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
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
            disabled={isLoading}
            style={{ width: "100%", marginTop: "1.5rem", padding: "1rem", opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? 'Logging in...' : 'Login to Dashboard'}
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
