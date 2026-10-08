import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import MacDock from '../components/MacDock';
import CommandPalette from '../components/CommandPalette';
import StarryBackground from '../components/StarryBackground';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Blog from '../components/Blog';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import SkillsMarquee from '../components/SkillsMarquee';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = ({ theme, toggleTheme }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 🚀 Silky 60fps momentum smooth scroll (Lenis + GSAP ScrollTrigger)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="portfolio-wrapper">
      <StarryBackground />
      <div className="noise-overlay"></div>
      <motion.div
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), #38bdf8)",
          transformOrigin: "0%",
          zIndex: 9999,
        }}
      />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <CommandPalette theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <SkillsMarquee />
        <About />
        <Services />
        <Projects />
        <Education />
        <Blog />
        <Testimonials />
        <Contact />
      </main>
      <MacDock />
    </div>
  );
};

export default Portfolio;
