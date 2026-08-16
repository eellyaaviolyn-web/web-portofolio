import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  // Outer ring spring (slower, trails behind)
  const ringX = useSpring(0, { stiffness: 150, damping: 20 });
  const ringY = useSpring(0, { stiffness: 150, damping: 20 });

  // Inner dot spring (faster, follows exactly)
  const dotX = useSpring(0, { stiffness: 400, damping: 30 });
  const dotY = useSpring(0, { stiffness: 400, damping: 30 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button' || e.target.closest('a') || e.target.closest('button') || e.target.closest('.card')) {
        setIsHoveringLink(true);
      } else {
        setIsHoveringLink(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [ringX, ringY, dotX, dotY]);

  // Don't show on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1px solid var(--accent-primary)',
          pointerEvents: 'none',
          zIndex: 9999,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: 0.5,
        }}
        animate={{
          scale: isHoveringLink ? 1.5 : 1,
          opacity: isHoveringLink ? 0 : 0.5,
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Inner Dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-primary)',
          pointerEvents: 'none',
          zIndex: 9999,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHoveringLink ? 2 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
};

export default CustomCursor;
