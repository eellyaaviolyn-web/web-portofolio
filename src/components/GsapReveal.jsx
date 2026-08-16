import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GsapReveal = ({ children, direction = 'up', delay = 0, duration = 0.8, distance = 50, stagger = 0, className = '', style = {} }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;
    
    // Determine start position based on direction
    let y = 0, x = 0;
    switch (direction) {
      case 'up': y = distance; break;
      case 'down': y = -distance; break;
      case 'left': x = distance; break;
      case 'right': x = -distance; break;
      default: y = distance;
    }

    gsap.fromTo(
      el.children,
      { 
        y: y, 
        x: x, 
        autoAlpha: 0 // handles both opacity and visibility
      },
      {
        y: 0,
        x: 0,
        autoAlpha: 1,
        duration: duration,
        delay: delay,
        stagger: stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%", // Animation starts when top of element hits 85% of viewport
          toggleActions: "play none none reverse", // Plays on enter, reverses on scroll back up
        }
      }
    );
  }, { scope: containerRef }); // scope isolation for performance

  return (
    <div ref={containerRef} className={`gsap-reveal-container ${className}`} style={style}>
      {children}
    </div>
  );
};

export default GsapReveal;
