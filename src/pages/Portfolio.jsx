import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
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

const Portfolio = ({ theme, toggleTheme }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
          height: "4px",
          background: "var(--accent-primary)",
          transformOrigin: "0%",
          zIndex: 9999,
        }}
      />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <CommandPalette theme={theme} toggleTheme={toggleTheme} />
        <Hero />
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
