import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AmbientGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="ambient-glow"
      animate={{
        x: mousePosition.x - 400, // Center the 800px glow
        y: mousePosition.y - 400,
      }}
      transition={{ type: 'tween', ease: 'backOut', duration: 2 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0, // Behind content
        filter: 'blur(40px)',
      }}
    />
  );
};

export default AmbientGlow;
