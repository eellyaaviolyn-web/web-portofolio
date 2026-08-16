import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const GlowCard = ({ children, className = '', style = {}, ...props }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`glow-card ${className}`}
      style={style}
      {...props}
    >
      <div className="glow-effect" />
      <div className="glow-content">
        {children}
      </div>
    </motion.div>
  );
};

export default GlowCard;
