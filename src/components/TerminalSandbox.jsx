import React, { useState, useRef, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';

const TerminalSandbox = () => {
  const { t } = useContext(LanguageContext);
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to Portfolio zakia' },
    { type: 'output', text: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let response = '';

      switch (cmd) {
        case 'help':
          response = 'Available commands: about, skills, contact, clear, whoami, date';
          break;
        case 'about':
          response = t.hero.desc || 'I am a passionate Web Developer building modern web.';
          break;
        case 'skills':
          response = 'PHP, Laravel, MySQL, Tailwind CSS, Figma';
          break;
        case 'contact':
          response = 'Email: zakiaabdillah275@gmail.com | GitHub: eellyaaviolyn-web';
          break;
        case 'whoami':
          response = 'zakia abdillah';
          break;
        case 'date':
          response = new Date().toString();
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case '':
          response = '';
          break;
        default:
          response = `Command not found: ${cmd}. Type "help" for a list of commands.`;
      }

      setHistory(prev => [
        ...prev,
        { type: 'input', text: `guest@portfolio:~$ ${cmd}` },
        ...(response ? [{ type: 'output', text: response }] : [])
      ]);
      setInput('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      style={{
        width: '100%',
        maxWidth: '600px',
        margin: '2rem auto',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--shadow-xl)',
        fontFamily: 'monospace',
      }}
    >
      {/* Terminal Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
        </div>
        <div style={{ margin: '0 auto', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          guest@zakia-os ~
        </div>
      </div>

      {/* Terminal Body */}
      <div style={{
        padding: '1.5rem',
        minHeight: '250px',
        maxHeight: '350px',
        overflowY: 'auto',
        color: '#f8fafc',
        fontSize: '0.9rem',
        lineHeight: 1.6
      }}>
        {history.map((line, i) => (
          <div key={i} style={{ 
            marginBottom: '0.5rem',
            color: line.type === 'input' ? '#27c93f' : '#e2e8f0',
            wordBreak: 'break-all'
          }}>
            {line.text}
          </div>
        ))}

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#27c93f', marginRight: '0.5rem' }}>guest@portfolio:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              flex: 1,
              width: '100%'
            }}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </motion.div>
  );
};

export default TerminalSandbox;
