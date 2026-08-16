import React, { useRef, useEffect } from 'react';

const FluidSimulation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking
    let mouse = { x: width / 2, y: height / 2, vx: 0, vy: 0 };
    let lastMouse = { x: width / 2, y: height / 2 };

    const handleMouseMove = (e) => {
      mouse.vx = e.clientX - lastMouse.x;
      mouse.vy = e.clientY - lastMouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particles array
    const particles = [];
    const numParticles = Math.min(window.innerWidth / 3, 400); // Scale by screen size

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        size: Math.random() * 2.5 + 0.5,
        color: `hsla(${Math.random() * 40 + 190}, 100%, 60%, 0.6)` // Cyans and Blues
      });
    }

    let animationFrameId;

    const render = () => {
      // Fade canvas to create smoke trails (Fluid effect). Pure black is transparent in screen blend mode!
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; 
      ctx.fillRect(0, 0, width, height);

      // Dampen mouse velocity
      mouse.vx *= 0.9;
      mouse.vy *= 0.9;

      particles.forEach(p => {
        // Distance to mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Fluid-like swirling force (curl noise approximation)
        if (dist < 300) {
          const force = (300 - dist) / 300;
          // Add perpendicular force for vortex effect
          p.vx += (dy / dist) * force * 0.5;
          p.vy -= (dx / dist) * force * 0.5;
          
          // Add direct push from mouse velocity
          p.vx += mouse.vx * force * 0.05;
          p.vy += mouse.vy * force * 0.05;
        }

        // Apply velocities with friction
        p.vx *= 0.95;
        p.vy *= 0.95;
        
        // Add subtle constant drift
        p.vy -= 0.2; // Drift up like smoke
        p.vx += Math.sin(p.y * 0.01) * 0.2; // Wavy movement

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        
        // Dynamic glow based on velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 2) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -2, // Behind CyberGrid and everything else
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default FluidSimulation;
