import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import BorderBeam from './BorderBeam';

const SpotlightCard = ({ children, className = '', style = {}, variants, whileHover }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
    setMousePosition({ x, y });
  };

  const handleFocus = () => { setIsFocused(true); setOpacity(1); };
  const handleBlur = () => { setIsFocused(false); setOpacity(0); };
  const handleMouseEnter = () => { setOpacity(1); setIsHovered(true); };
  const handleMouseLeave = () => { setOpacity(0); setIsHovered(false); };

  // Normalize mouse position for gradient angle calculation
  const glareAngle = divRef.current
    ? (mousePosition.x / (divRef.current.offsetWidth || 1)) * 180
    : 90;

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={variants}
      whileHover={whileHover}
      className={`relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] ${className}`}
      style={{
        ...style,
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
        position: 'relative',
      }}
    >
      {/* ✨ Border Beam — rotating neon laser glow on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', borderRadius: 'inherit' }}
      >
        <BorderBeam duration={4} colorFrom="#8b5cf6" colorTo="#0ea5e9" borderRadius="1rem" />
      </motion.div>

      {/* 🌈 Rainbow Holographic Iridescent Foil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.55 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          borderRadius: 'inherit',
          background: `
            radial-gradient(
              ellipse at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(255,255,255,0.25) 0%,
              transparent 50%
            ),
            linear-gradient(
              ${glareAngle}deg,
              rgba(255, 0, 128, 0.12) 0%,
              rgba(255, 154, 0, 0.12) 15%,
              rgba(208, 222, 33, 0.12) 30%,
              rgba(79, 220, 74, 0.12) 45%,
              rgba(63, 218, 216, 0.12) 60%,
              rgba(28, 127, 238, 0.12) 75%,
              rgba(186, 12, 248, 0.12) 90%,
              rgba(255, 0, 128, 0.12) 100%
            )
          `,
          mixBlendMode: 'color-dodge',
        }}
      />

      {/* 🔦 Spotlight radial glow — follows mouse */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.12), transparent 40%)`,
          zIndex: 2,
          mixBlendMode: 'screen',
          borderRadius: 'inherit',
          transition: 'opacity 0.25s ease',
        }}
      />

      {/* 💡 Subtle accent-color glow at bottom (always visible slightly) */}
      <div
        className="pointer-events-none absolute -inset-px"
        style={{
          opacity: opacity * 0.2,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, var(--accent-primary), transparent 50%)`,
          zIndex: 1,
          borderRadius: 'inherit',
          transition: 'opacity 0.25s ease',
        }}
      />

      {/* Content — always on top */}
      <div style={{ position: 'relative', zIndex: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </motion.div>
  );
};

export default SpotlightCard;

