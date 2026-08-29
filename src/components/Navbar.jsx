import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsSun, BsMoon, BsGlobe, BsVolumeUp, BsVolumeMute, BsList, BsX } from 'react-icons/bs';
import { LanguageContext } from '../context/LanguageContext';
import { toggleMute, getIsMuted, playClickSound } from '../utils/sound';
import { toggleAmbientSoundscape } from '../utils/generativeAudio';
import useOnlineCount from '../hooks/useOnlineCount';

const Navbar = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useContext(LanguageContext);
  const [isMuted, setIsMuted] = useState(getIsMuted());
  const onlineCount = useOnlineCount();

  const handleToggleMute = () => {
    const newState = toggleMute();
    setIsMuted(newState);
    toggleAmbientSoundscape(!newState);
    if (!newState) playClickSound();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.education, href: '#education' },
    { name: t.nav.blog, href: '#blog' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'background-color 0.3s ease, padding 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        backgroundColor: isScrolled ? 'var(--glass-bg)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
        padding: isScrolled ? '1rem 0' : '1.5rem 0',
        boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="heading-lg" 
            style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800, background: 'none', color: 'var(--text-primary)', WebkitTextFillColor: 'initial', display: 'flex', alignItems: 'center' }}
          >
            Portfolio<span style={{ color: 'var(--accent-primary)', fontSize: '2rem', lineHeight: 0 }}>.</span>
          </a>

          {/* Realtime Online Visitor Badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={onlineCount}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '50px',
                padding: '0.3rem 0.75rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#10b981',
                whiteSpace: 'nowrap',
              }}
              title="Orang yang sedang melihat portofolio ini"
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  display: 'block',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 6px #10b981',
                  flexShrink: 0,
                }}
              />
              {onlineCount} online
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="desktop-nav" style={{ alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleLanguage} 
              className="btn glass" 
              style={{ 
                padding: '0.6rem 1rem', 
                borderRadius: '50px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '0.5rem',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
              aria-label="Toggle language"
            >
              <BsGlobe size={16} />
              {language.toUpperCase()}
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme} 
              className="btn glass" 
              style={{ 
                padding: '0.6rem', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)'
              }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <BsSun size={18} /> : <BsMoon size={18} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleMute} 
              className="btn glass" 
              style={{ 
                padding: '0.6rem', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)'
              }}
              aria-label="Toggle sound"
            >
              {isMuted ? <BsVolumeMute size={18} /> : <BsVolumeUp size={18} />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
