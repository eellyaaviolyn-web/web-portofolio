import React from 'react';
import { motion } from 'framer-motion';

const CyberGrid = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: -1, // Lowest layer
      overflow: 'hidden',
      perspective: '1000px',
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
        style={{
          position: 'absolute',
          bottom: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `
            linear-gradient(transparent 65%, var(--accent-primary) 100%),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 60px 60px, 60px 60px',
          transform: 'rotateX(75deg) translateY(0)',
          transformOrigin: 'top',
          animation: 'cyber-grid-move 3s linear infinite',
        }}
      />
      <style>{`
        @keyframes cyber-grid-move {
          0% { background-position: 0 0, 0 0, 0 0; }
          100% { background-position: 0 0, 0 60px, 0 60px; }
        }
      `}</style>
    </div>
  );
};

export default CyberGrid;
