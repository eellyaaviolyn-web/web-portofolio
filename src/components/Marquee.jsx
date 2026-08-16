import React from 'react';
import { motion } from 'framer-motion';

const Marquee = ({ text = "SOFTWARE ENGINEER - FRONTEND DEVELOPER -" }) => {
  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      background: 'var(--accent-primary)',
      padding: '1rem 0',
      display: 'flex',
      whiteSpace: 'nowrap',
      position: 'relative',
      transform: 'rotate(-2deg) scale(1.05)',
      zIndex: 10,
      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)',
      marginTop: '-2rem',
      marginBottom: '4rem',
    }}>
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ 
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear"
          }
        }}
        style={{
          display: 'flex',
          gap: '2rem',
        }}
      >
        {/* We repeat the text multiple times to ensure seamless infinite scroll */}
        {[...Array(10)].map((_, i) => (
          <span 
            key={i} 
            style={{ 
              color: 'var(--bg-primary)', 
              fontSize: '1.2rem', 
              fontWeight: 800, 
              letterSpacing: '2px' 
            }}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
