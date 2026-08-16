import React, { useContext } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion'; 
import { LanguageContext } from '../context/LanguageContext';
import fotoProfil from '../assets/foto.jpeg';
import TerminalSandbox from './TerminalSandbox';
import MagneticElement from './MagneticElement';
import TiltCard from './TiltCard';
import KineticText from './KineticText';
import LiquidImage from './LiquidImage';
import TextReveal from './TextReveal';

const Hero = () => {
  const { t } = useContext(LanguageContext);
  
  // Variants for staggered text animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 50, damping: 15 } 
    },
  };

  return (
    <section id="home" className="section container" style={{ 
      display: 'flex', 
      flexWrap: 'wrap',
      alignItems: 'center', 
      justifyContent: 'space-between',
      gap: '2rem',
      paddingTop: '8rem',
      minHeight: '100vh',
      position: 'relative'
    }}>
      <KineticText text="ZAKIA AZ-ZAHRA" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ flex: '1', minWidth: '300px', textAlign: 'left', zIndex: 2 }}
      >
        <motion.div variants={itemVariants} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.5rem 1rem', borderRadius: '50px', border: '1px solid var(--border-color)', marginBottom: '1.5rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
          <span style={{ display: 'block', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} className="pulse-dot"></span>
          Available for Work & Internship
        </motion.div>

        <motion.h2 variants={itemVariants} className="text-lead" style={{ color: 'var(--accent-primary)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>
          {t.hero.greeting}{' '}
          <motion.span
            style={{ display: 'inline-block', originX: 0.7, originY: 0.7, cursor: 'default' }}
            whileHover={{ rotate: [0, 20, -15, 20, -15, 20, 0] }}
            transition={{ duration: 0.6 }}
          >
            👋
          </motion.span>
        </motion.h2>
        
        <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
          <TextReveal 
            text="Zakia Abdillah Az-Zahra." 
            className="heading-xl gradient-text" 
            tag="h1" 
            delay={0.2}
          />
        </motion.div>
        
        <motion.h3 variants={itemVariants} className="heading-lg" style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          {t.hero.welcome}
        </motion.h3>
        
        <motion.div variants={itemVariants}>
          <TerminalSandbox />
        </motion.div>
        
        <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <MagneticElement stretch={0.2}>
            <button 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary" 
              style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' }}
            >
              {t.hero.viewWork}
            </button>
          </MagneticElement>
          <MagneticElement stretch={0.2}>
            <button 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-outline" 
              style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}
            >
              {t.hero.contactMe}
            </button>
          </MagneticElement>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, type: 'spring', stiffness: 40 }}
        style={{ flex: '1', minWidth: '300px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', position: 'relative', minHeight: '500px' }}
      >
        {/* Lingkaran Ungu di belakang foto dengan animasi rotasi/pulse */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          style={{
            position: 'absolute',
            bottom: '5%',
            width: '80%',
            maxWidth: '400px',
            aspectRatio: '1/1',
            background: 'linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))',
            borderRadius: '50%',
            zIndex: 0,
            opacity: 0.6,
            filter: 'blur(60px)'
          }}
        ></motion.div>
        
        <TiltCard style={{ width: '100%', maxWidth: '380px', aspectRatio: '1/1', position: 'relative', zIndex: 1, borderRadius: '50%' }}>
          <motion.div
            initial={{ y: 20, rotate: 0 }}
            animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ 
              width: '100%', 
              height: '100%',
              borderRadius: '50%', // Membuatnya bulat sempurna
              border: '6px solid var(--glass-border)', // Efek bingkai kaca
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', // Bayangan halus
              padding: '8px', // Memberikan jarak antara foto dan bingkai
              background: 'var(--glass-bg)', // Warna dasar untuk efek cincin
              backdropFilter: 'blur(10px)',
              overflow: 'hidden'
            }} 
          >
            <LiquidImage 
              src={fotoProfil} 
              alt="Zakia" 
              style={{ width: '100%', height: '100%', borderRadius: '50%' }} 
            />
          </motion.div>
        </TiltCard>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          zIndex: 10
        }}
        onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
      >
        <span style={{ fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>Scroll</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-primary)' }}>
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
