import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GlitchText = ({ text, as: Component = 'span', className = '', style = {} }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Component
      className={`glitch-wrapper ${className}`}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        className={isHovered ? 'glitch-text' : ''}
        data-text={text}
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {text}
      </motion.span>
    </Component>
  );
};

export default GlitchText;
