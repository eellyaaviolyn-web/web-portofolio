import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TerminalTypewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 30); // Kecepatan mengetik (30ms per karakter)

    return () => clearInterval(typingInterval);
  }, [text]);

  return (
    <div style={{
      background: '#1e1e1e', // Dark theme VS Code / Terminal
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
      border: '1px solid #333',
      maxWidth: '600px',
      marginBottom: '3rem',
      fontFamily: '"Fira Code", "Courier New", monospace'
    }}>
      {/* Terminal Header */}
      <div style={{
        background: '#2d2d2d',
        padding: '10px 15px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
        <span style={{ marginLeft: '10px', color: '#999', fontSize: '0.8rem', fontWeight: 600 }}>~/zakia/about.sh</span>
      </div>
      
      {/* Terminal Body */}
      <div style={{ padding: '20px', color: '#e0e0e0', fontSize: '1rem', lineHeight: '1.6' }}>
        <span style={{ color: '#27c93f' }}>zakia@portfolio</span>
        <span style={{ color: '#fff' }}>:</span>
        <span style={{ color: '#56b6c2' }}>~</span>
        <span style={{ color: '#fff' }}>$ cat about.txt</span>
        <br />
        <br />
        <span style={{ whiteSpace: 'pre-wrap' }}>{displayedText}</span>
        {isTyping && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            style={{ display: 'inline-block', width: '8px', height: '1em', background: '#fff', verticalAlign: 'middle', marginLeft: '4px' }}
          />
        )}
      </div>
    </div>
  );
};

export default TerminalTypewriter;
