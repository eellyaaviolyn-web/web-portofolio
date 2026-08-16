import React from 'react';
import { motion } from 'framer-motion';

const TextReveal = ({ text, className = '', delay = 0, tag: Tag = 'h2' }) => {
  // Split text into characters including spaces
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * i },
    }),
  };

  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20, // Slide up from below
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <Tag className={className} style={{ margin: 0 }}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        style={{ display: 'inline-block', overflow: 'hidden' }}
      >
        {letters.map((letter, index) => (
          <motion.span
            variants={childVariants}
            key={index}
            style={{ 
              display: 'inline-block', 
              whiteSpace: letter === ' ' ? 'pre' : 'normal' 
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
};

export default TextReveal;
