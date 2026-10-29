import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from '../lib/supabase';
import { toast } from '../components/Toast';

const LOCKOUT_KEY = 'admin_security_lockout';
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 menit

function getLockoutInfo() {
  try {
    const raw = localStorage.getItem(LOCKOUT_KEY);
    if (!raw) return { attempts: 0, lockUntil: 0, isLocked: false, remainingSeconds: 0 };
    const data = JSON.parse(raw);
    const now = Date.now();
    if (data.lockUntil && now < data.lockUntil) {
      return {
        attempts: data.attempts || MAX_ATTEMPTS,
        lockUntil: data.lockUntil,
        isLocked: true,
        remainingSeconds: Math.ceil((data.lockUntil - now) / 1000),
      };
    }
    // Expired lockout
    if (data.lockUntil && now >= data.lockUntil) {
      localStorage.removeItem(LOCKOUT_KEY);
      return { attempts: 0, lockUntil: 0, isLocked: false, remainingSeconds: 0 };
    }
    return {
      attempts: data.attempts || 0,
      lockUntil: 0,
      isLocked: false,
      remainingSeconds: 0,
    };
  } catch {
    return { attempts: 0, lockUntil: 0, isLocked: false, remainingSeconds: 0 };
  }
}

function recordFailure() {
  try {
    const info = getLockoutInfo();
    const newAttempts = info.attempts + 1;
    const now = Date.now();
    if (newAttempts >= MAX_ATTEMPTS) {
      const lockUntil = now + LOCKOUT_DURATION_MS;
      localStorage.setItem(LOCKOUT_KEY, JSON.stringify({ attempts: newAttempts, lockUntil }));
      return { isLocked: true, remainingAttempts: 0, remainingSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000) };
    }
    localStorage.setItem(LOCKOUT_KEY, JSON.stringify({ attempts: newAttempts, lockUntil: 0 }));
    return { isLocked: false, remainingAttempts: MAX_ATTEMPTS - newAttempts, remainingSeconds: 0 };
  } catch {
    return { isLocked: false, remainingAttempts: 1, remainingSeconds: 0 };
  }
}

function clearLockout() {
  try {
    localStorage.removeItem(LOCKOUT_KEY);
  } catch {}
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lockoutSec, setLockoutSec] = useState(() => getLockoutInfo().remainingSeconds);
  const navigate = useNavigate();

  // Timer countdown jika sedang lockout
  useEffect(() => {
    if (lockoutSec <= 0) return;
    const timer = setInterval(() => {
      setLockoutSec((prev) => {
        if (prev <= 1) {
          clearLockout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutSec]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Cek status lockout
    const currentLock = getLockoutInfo();
    if (currentLock.isLocked) {
      setLockoutSec(currentLock.remainingSeconds);
      toast.error(`Terlalu banyak percobaan gagal. Silakan tunggu ${currentLock.remainingSeconds} detik lagi.`);
      return;
    }

    setIsLoading(true);
    const startTime = Date.now();

    const cleanInput = email.trim().toLowerCase().slice(0, 100);
    const cleanPassword = password.slice(0, 100);

    // Constant-time artificial delay to prevent timing analysis
    const enforceConstantTime = async () => {
      const elapsed = Date.now() - startTime;
      if (elapsed < 400) {
        await new Promise((r) => setTimeout(r, 400 - elapsed));
      }
    };

    // 🔑 Akun default admin portofolio
    if (
      (cleanInput === "admin" || cleanInput === "admin@zakia.com" || cleanInput === "eellyaaviolyn@gmail.com") &&
      cleanPassword === "vinzkiesaja"
    ) {
      await enforceConstantTime();
      clearLockout();
      localStorage.setItem("isAdminLoggedIn", "true");
      toast.success("Login berhasil! Selamat datang, Admin.");
      navigate("/admin");
      setIsLoading(false);
      return;
    }

    // Coba via Supabase Auth jika ada session
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanInput,
        password: cleanPassword,
      });

      await enforceConstantTime();

      if (error) {
        const result = recordFailure();
        if (result.isLocked) {
          setLockoutSec(result.remainingSeconds);
          toast.error(`5x gagal login berturut-turut! Akun dikunci selama 5 menit demi keamanan.`);
        } else {
          toast.error(`Email atau password salah. Sisa kesempatan: ${result.remainingAttempts}x`);
        }
      } else if (data?.session) {
        clearLockout();
        toast.success("Login berhasil! Selamat datang, Admin.");
        navigate("/admin");
      }
    } catch {
      await enforceConstantTime();
      const result = recordFailure();
      if (result.isLocked) {
        setLockoutSec(result.remainingSeconds);
        toast.error(`5x gagal login berturut-turut! Akun dikunci selama 5 menit demi keamanan.`);
      } else {
        toast.error(`Email atau password salah. Sisa kesempatan: ${result.remainingAttempts}x`);
      }
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
          style={{ textAlign: "center", marginBottom: "1.5rem" }}
        >
          <span className="gradient-text">Admin</span> Login
        </h2>

        {lockoutSec > 0 && (
          <div
            style={{
              padding: "0.85rem 1rem",
              marginBottom: "1.5rem",
              borderRadius: "10px",
              background: "rgba(239, 68, 68, 0.12)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              color: "#fca5a5",
              fontSize: "0.88rem",
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            🛡️ <strong>Keamanan Diaktifkan:</strong> Terlalu banyak percobaan salah. Coba lagi dalam{" "}
            <span style={{ fontWeight: 700, color: "#fff" }}>{lockoutSec}</span> detik.
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">Email / Username</label>
            <input
              type="text"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email atau admin"
              disabled={lockoutSec > 0 || isLoading}
              maxLength={100}
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
              disabled={lockoutSec > 0 || isLoading}
              maxLength={100}
              required
            />
          </div>

          <motion.button
            whileHover={lockoutSec > 0 || isLoading ? {} : { scale: 1.02 }}
            whileTap={lockoutSec > 0 || isLoading ? {} : { scale: 0.98 }}
            type="submit"
            className="btn btn-primary"
            disabled={isLoading || lockoutSec > 0}
            style={{
              width: "100%",
              marginTop: "1.5rem",
              padding: "1rem",
              opacity: isLoading || lockoutSec > 0 ? 0.6 : 1,
              cursor: lockoutSec > 0 ? "not-allowed" : "pointer",
            }}
          >
            {lockoutSec > 0
              ? `Terkunci (${lockoutSec}s)`
              : isLoading
              ? "Memverifikasi..."
              : "Login to Dashboard"}
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
