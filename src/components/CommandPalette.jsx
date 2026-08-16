import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsSearch, BsHouse, BsPerson, BsBriefcase, BsEnvelope, BsMoon, BsSun, BsTranslate, BsVolumeUp, BsVolumeMute } from 'react-icons/bs';
import { LanguageContext } from '../context/LanguageContext';
import { toggleMute, getIsMuted, playClickSound } from '../utils/sound';
import { toggleAmbientSoundscape } from '../utils/generativeAudio';

const CommandPalette = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { toggleLanguage } = useContext(LanguageContext);
  const inputRef = useRef(null);

  // Toggle overlay on Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const commands = [
    { id: 'home', name: 'Go to Home', icon: BsHouse, action: () => { window.location.hash = '#home'; } },
    { id: 'about', name: 'Go to About', icon: BsPerson, action: () => { window.location.hash = '#about'; } },
    { id: 'projects', name: 'View Projects', icon: BsBriefcase, action: () => { window.location.hash = '#projects'; } },
    { id: 'contact', name: 'Contact Me', icon: BsEnvelope, action: () => { window.location.hash = '#contact'; } },
    { id: 'admin', name: 'Secret: Admin Login', icon: BsPerson, action: () => { window.location.href = '/admin'; } },
    { id: 'theme', name: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`, icon: theme === 'dark' ? BsSun : BsMoon, action: toggleTheme },
    { id: 'lang', name: 'Toggle Language', icon: BsTranslate, action: toggleLanguage },
    { id: 'sound', name: 'Toggle Sound', icon: getIsMuted() ? BsVolumeUp : BsVolumeMute, action: () => {
        const newState = toggleMute();
        toggleAmbientSoundscape(!newState);
        if (!newState) playClickSound();
    }},
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleExecute = (cmd) => {
    cmd.action();
    setIsOpen(false);
  };

  const handleKeyboardNav = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        handleExecute(filteredCommands[selectedIndex]);
      }
    }
  };

  return (
    <>
      {/* Visual Hint removed as per user request */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: '10vh'
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '550px',
                background: 'var(--bg-secondary)',
                borderRadius: '1rem',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-xl)',
                overflow: 'hidden',
                margin: '0 1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <BsSearch size={20} style={{ color: 'var(--text-secondary)', marginRight: '1rem' }} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                  onKeyDown={handleKeyboardNav}
                  placeholder="Type a command or search..."
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '1.1rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ padding: '0.5rem', maxHeight: '350px', overflowY: 'auto' }}>
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd, index) => {
                    const Icon = cmd.icon;
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        key={cmd.id}
                        onClick={() => handleExecute(cmd)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0.75rem 1rem',
                          margin: '0.25rem 0',
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                          background: isSelected ? 'var(--accent-primary)' : 'transparent',
                          color: isSelected ? 'var(--bg-primary)' : 'var(--text-primary)',
                          transition: 'background 0.1s ease',
                          gap: '1rem'
                        }}
                      >
                        <Icon size={18} />
                        <span style={{ fontWeight: 500 }}>{cmd.name}</span>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No commands found for "{query}"
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
