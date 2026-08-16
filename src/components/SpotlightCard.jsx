import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

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

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setIsHovered(false);
  };

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
        position: 'relative' 
      }}
    >
      {/* Holographic Iridescent Foil Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: `
            radial-gradient(
              circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(255,255,255,0.2) 0%,
              transparent 40%
            ),
            linear-gradient(
              ${(mousePosition.x / 400) * 360}deg,
              rgba(255, 0, 0, 0.1) 0%,
              rgba(255, 154, 0, 0.1) 10%,
              rgba(208, 222, 33, 0.1) 20%,
              rgba(79, 220, 74, 0.1) 30%,
              rgba(63, 218, 216, 0.1) 40%,
              rgba(47, 201, 226, 0.1) 50%,
              rgba(28, 127, 238, 0.1) 60%,
              rgba(95, 21, 242, 0.1) 70%,
              rgba(186, 12, 248, 0.1) 80%,
              rgba(251, 7, 217, 0.1) 90%,
              rgba(255, 0, 0, 0.1) 100%
            )
          `,
          mixBlendMode: 'color-dodge'
        }}
      />

      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.1), transparent 40%)`,
          zIndex: 1, // Above background, below content
          mixBlendMode: 'screen'
        }}
      />
      {/* For dark mode, we might want an accent color glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, var(--accent-primary), transparent 40%)`,
          zIndex: 0, // Very subtle background glow
          opacity: opacity * 0.15 
        }}
      />
      
      {/* Content wrapper */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </motion.div>
  );
};

export default SpotlightCard;
