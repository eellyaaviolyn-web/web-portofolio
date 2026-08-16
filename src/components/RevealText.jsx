import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const RevealText = ({ text, className = "", delay = 0, style = {} }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Split text by lines (assuming user passes \n or just wants words wrapped nicely)
  // For standard paragraph text, we wrap word by word so they flow naturally
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.015,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: {
      y: "120%",
      opacity: 0,
      rotateZ: 3,
    },
    visible: {
      y: "0%",
      opacity: 1,
      rotateZ: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      style={{ display: "flex", flexWrap: "wrap", ...style }}
    >
      {words.map((word, index) => (
        <span
          key={index}
          style={{
            overflow: "hidden",
            display: "inline-block",
            paddingRight: "0.25em",
            paddingBottom: "0.1em",
            lineHeight: 1.4
          }}
        >
          <motion.span
            variants={childVariants}
            style={{ display: "inline-block", originY: 1 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

export default RevealText;
