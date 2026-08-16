import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { playHoverSound, playClickSound } from '../utils/sound';

const MagneticButton = ({ children, className = '', style = {}, onClick, ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const hasPlayedHover = useRef(false);

  const handleMouse = useCallback((e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!hasPlayedHover.current) {
      playHoverSound();
      hasPlayedHover.current = true;
    }
  }, []);

  const reset = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    hasPlayedHover.current = false;
  }, []);

  const handleClick = useCallback((e) => {
    playClickSound();
    if (onClick) onClick(e);
  }, [onClick]);

  const { x, y } = position;

  return (
    <motion.div
      style={{ position: 'relative', display: 'inline-block', ...style }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={reset}
      onClick={handleClick}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
