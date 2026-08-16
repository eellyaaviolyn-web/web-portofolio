import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GsapParallaxBg = () => {
  const containerRef = useRef(null);
  const bgImageRef = useRef(null);

  useEffect(() => {
    // Smooth Parallax effect using ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Extremely smooth scrubbing
      }
    });

    // Move the background image upwards slowly as we scroll down to create parallax
    tl.to(bgImageRef.current, { y: '20vh', ease: 'none' }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: '#050810' // Deep dark fallback
      }}
    >
      {/* Aesthetic High-Res Background Image */}
      <div 
        ref={bgImageRef}
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '110%',
          height: '120%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35, // Keep it subtle so text remains readable
          filter: 'contrast(1.2) brightness(0.8)'
        }}
      />
      
      {/* Dark Vignette Overlay for blending */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at center, transparent 0%, #050810 100%)',
      }}></div>

      {/* Top and Bottom Gradient Fades */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '30%',
        background: 'linear-gradient(to bottom, #050810 0%, transparent 100%)',
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '30%',
        background: 'linear-gradient(to top, #050810 0%, transparent 100%)',
      }}></div>
    </div>
  );
};

export default GsapParallaxBg;
