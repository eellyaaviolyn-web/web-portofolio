import React, { useState, useEffect, useRef } from 'react';

const CHARS = '!<>-_\\\\/[]{}—=+*^?#________';

const TextScramble = ({ text, className = '' }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef(null);
  
  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;
    
    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text.split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });
      
      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
        setIsScrambling(false);
      }
      
      iteration += 1 / 3; // Speed of resolving
    }, 30);
  };

  // Scramble once on mount as well for an entrance effect
  useEffect(() => {
    scramble();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <span 
      className={className} 
      onMouseEnter={scramble}
      style={{ display: 'inline-block', whiteSpace: 'pre-wrap' }}
    >
      {displayText}
    </span>
  );
};

export default TextScramble;
