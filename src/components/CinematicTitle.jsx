import React from 'react';
import { motion } from 'framer-motion';

/**
 * CinematicTitle — animates a heading word-by-word with a 3D spring stagger.
 * Triggers when the element enters the viewport.
 *
 * Props:
 *  - words: string — the full heading text
 *  - highlightWords: string[] — words to render with `gradient-text` class
 *  - tag: 'h1' | 'h2' | 'h3' — rendered tag (default h2)
 *  - className, style — forwarded to the container
 *  - delay: number — seconds to wait before stagger starts
 */
const CinematicTitle = ({
  words = '',
  highlightWords = [],
  tag = 'h2',
  className = '',
  style = {},
  delay = 0,
}) => {
  const splitWords = words.split(' ').filter(Boolean);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: 60,
      opacity: 0,
      rotateX: -45,
      scale: 0.85,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 14,
      },
    },
  };

  const Tag = tag;

  return (
    <Tag className={className} style={{ overflow: 'hidden', perspective: '600px', ...style }}>
      <motion.span
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em', justifyContent: style.textAlign === 'center' ? 'center' : 'flex-start' }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        {splitWords.map((word, i) => {
          const isHighlighted = highlightWords.includes(word);
          return (
            <motion.span
              key={i}
              variants={wordVariants}
              style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
            >
              {isHighlighted ? (
                <span className="gradient-text">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          );
        })}
      </motion.span>
    </Tag>
  );
};

export default CinematicTitle;
