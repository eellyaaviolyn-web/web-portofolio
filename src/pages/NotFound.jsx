import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
      textAlign: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient blobs */}
      <div style={{ position:'absolute', top:'-10%', left:'-10%', width:'50vw', height:'50vw', borderRadius:'50%', background:'rgba(99,102,241,0.08)', filter:'blur(80px)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-10%', right:'-10%', width:'40vw', height:'40vw', borderRadius:'50%', background:'rgba(14,165,233,0.08)', filter:'blur(80px)', pointerEvents:'none' }} />

      {/* 404 Number */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
      >
        <h1 style={{
          fontSize: 'clamp(6rem, 20vw, 12rem)',
          fontWeight: 900,
          lineHeight: 1,
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.05em',
          marginBottom: '1rem',
        }}>
          404
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          Halaman Tidak Ditemukan
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
          Oops! Sepertinya halaman yang kamu cari sudah berpindah ke galaksi lain. 🚀 Yuk kembali ke beranda!
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="btn btn-primary"
            style={{ padding: '0.9rem 2rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Kembali ke Beranda
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="btn btn-outline"
            style={{ padding: '0.9rem 2rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Halaman Sebelumnya
          </motion.button>
        </div>
      </motion.div>

      {/* Floating emoji decoration */}
      {['🛸','⭐','🌙','💫'].map((emoji, i) => (
        <motion.div
          key={i}
          style={{ position:'absolute', fontSize:'2rem', userSelect:'none', pointerEvents:'none',
            left: `${15 + i * 22}%`, top: `${20 + (i % 2) * 50}%`,
          }}
          animate={{ y: [-10,10,-10], rotate: [-5,5,-5] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease:'easeInOut', delay: i * 0.5 }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default NotFound;
