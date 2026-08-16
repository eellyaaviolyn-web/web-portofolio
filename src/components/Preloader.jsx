import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  
  const texts = [
    "INITIALIZING SYSTEM...",
    "LOADING SECURE MODULES...",
    "DECRYPTING ASSETS...",
    "ESTABLISHING CONNECTION...",
    "ACCESS GRANTED"
  ];

  useEffect(() => {
    let currentProgress = 0;
    const duration = 2000; // 2 seconds total loading
    const intervalTime = 40;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(timer);
        setTimeout(onComplete, 600); // Hang on 100% for a moment
      } else {
        setProgress(Math.floor(currentProgress));
      }

      if (currentProgress < 20) setTextIndex(0);
      else if (currentProgress < 40) setTextIndex(1);
      else if (currentProgress < 70) setTextIndex(2);
      else if (currentProgress < 95) setTextIndex(3);
      else setTextIndex(4);

    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100vh' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#050505',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'var(--accent-primary, #6366f1)',
        fontFamily: '"Fira Code", monospace, Courier'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '320px' }}>
        <p style={{ margin: 0, marginBottom: '15px', fontSize: '1rem', letterSpacing: '2px', fontWeight: 'bold' }}>
          {texts[textIndex]}
        </p>
        
        {/* Progress Bar Container */}
        <div style={{ width: '100%', height: '2px', backgroundColor: 'rgba(255,255,255,0.1)', position: 'relative' }}>
          <motion.div 
            style={{ height: '100%', backgroundColor: 'var(--accent-primary, #6366f1)', boxShadow: '0 0 10px var(--accent-primary)' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear', duration: 0.1 }}
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px', fontSize: '0.85rem', color: 'var(--text-secondary, #a1a1aa)' }}>
          <span>PORTFOLIO_OS_V1.0</span>
          <span style={{ color: progress === 100 ? 'var(--accent-primary)' : 'inherit' }}>{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
