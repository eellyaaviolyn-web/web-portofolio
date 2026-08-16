import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useIsMobile } from '../hooks/useIsMobile';

const TRAIL_COUNT = 5;

const GsapCursor = () => {
  const isMobile = useIsMobile();
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const trailsRef = useRef([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isMobile) return;

    // Main cursor & dot quick setters
    const xToCursor = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" });
    const yToCursor = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" });
    
    const xToDot = gsap.quickTo(dotRef.current, "x", { duration: 0.1, ease: "power3" });
    const yToDot = gsap.quickTo(dotRef.current, "y", { duration: 0.1, ease: "power3" });

    // Trail quick setters
    const trailSetters = trailsRef.current.map((el, i) => ({
      x: gsap.quickTo(el, "x", { duration: 0.15 + (i * 0.05), ease: "power3" }),
      y: gsap.quickTo(el, "y", { duration: 0.15 + (i * 0.05), ease: "power3" })
    }));

    const onMouseMove = (e) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToDot(e.clientX);
      yToDot(e.clientY);
      
      trailSetters.forEach(setter => {
        setter.x(e.clientX);
        setter.y(e.clientY);
      });
    };

    const onMouseOver = (e) => {
      const isInteractable = e.target.closest('a, button, .card, input, textarea');
      if (isInteractable) {
        setIsHovering(true);
        gsap.to(cursorRef.current, { scale: 1.5, opacity: 0, duration: 0.3 });
        gsap.to(dotRef.current, { scale: 2, duration: 0.3 });
        gsap.to(trailsRef.current, { opacity: 0, duration: 0.2 });
      } else {
        setIsHovering(false);
        gsap.to(cursorRef.current, { scale: 1, opacity: 0.5, duration: 0.3 });
        gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
        gsap.to(trailsRef.current, { 
          opacity: (i) => 0.4 - (i * 0.08), 
          duration: 0.2 
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Trails */}
      {[...Array(TRAIL_COUNT)].map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={el => trailsRef.current[i] = el}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${10 - i * 1.5}px`,
            height: `${10 - i * 1.5}px`,
            backgroundColor: 'var(--accent-primary)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9998,
            transform: 'translate(-50%, -50%)',
            opacity: 0.4 - (i * 0.08)
          }}
        />
      ))}
      {/* Main Cursor Ring */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          border: '1px solid var(--accent-primary)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          opacity: 0.5
        }}
      />
      {/* Main Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: 'var(--accent-primary)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  );
};

export default GsapCursor;
