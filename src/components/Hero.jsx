import React, { useContext, useEffect, useRef, useState } from 'react';
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
          <MagneticElement stretch={0.2}>
            <motion.a
              href="/cv.pdf"
              download="CV-Zakia-Abdillah.pdf"
              className="btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '1rem 2rem',
                fontSize: '1rem',
                background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))',
                border: '1px solid rgba(16,185,129,0.4)',
                color: '#10b981',
                borderRadius: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download CV
            </motion.a>
          </MagneticElement>
        </motion.div>


        {/* 🌐 Social Links Row */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'flex', gap: '1rem', marginTop: '2rem', alignItems: 'center' }}
        >
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Find me on</span>
          {[
            { href: 'https://github.com/eellyaaviolyn-web', label: 'GitHub', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            )},
            { href: 'https://www.instagram.com/zakiaabdillah_', label: 'Instagram', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            )},
            { href: 'https://wa.me/085797982538', label: 'WhatsApp', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            )},
          ].map(s => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.9 }}
              style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              {s.icon}
            </motion.a>
          ))}
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
