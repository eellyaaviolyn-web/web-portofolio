import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ClickExplosion = () => {
  const [explosions, setExplosions] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const id = Date.now();
      const newExplosion = {
        id,
        x: e.clientX,
        y: e.clientY,
        color: getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim() || '#6366f1'
      };

      setExplosions((prev) => [...prev, newExplosion]);

      // Remove explosion after animation completes
      setTimeout(() => {
        setExplosions((prev) => prev.filter((exp) => exp.id !== id));
      }, 1000);
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 99999 }}>
      <AnimatePresence>
        {explosions.map((exp) => (
          <React.Fragment key={exp.id}>
            {/* Generate 8 particles per click */}
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const velocity = 50 + Math.random() * 50;
              const dx = Math.cos(angle) * velocity;
              const dy = Math.sin(angle) * velocity;

              return (
                <motion.div
                  key={`${exp.id}-${i}`}
                  initial={{ opacity: 1, scale: 1, x: exp.x, y: exp.y }}
                  animate={{ 
                    opacity: 0, 
                    scale: 0, 
                    x: exp.x + dx, 
                    y: exp.y + dy + 20 // add slight gravity
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{
                    position: 'absolute',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: exp.color,
                    boxShadow: `0 0 10px ${exp.color}`,
                    top: '-4px', // center based on size
                    left: '-4px'
                  }}
                />
              );
            })}
            
            {/* Center shockwave ring */}
            <motion.div
              initial={{ opacity: 0.8, scale: 0, x: exp.x, y: exp.y }}
              animate={{ opacity: 0, scale: 4, x: exp.x, y: exp.y }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                position: 'absolute',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: `2px solid ${exp.color}`,
                top: '-10px',
                left: '-10px'
              }}
            />
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ClickExplosion;
