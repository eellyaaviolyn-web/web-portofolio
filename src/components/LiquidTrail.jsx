import React, { useRef, useEffect } from 'react';

const LiquidTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let trail = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Configuration for liquid physics
    const config = {
      pointsCount: 30, // How many segments the trail has
      radius: 15, // Thickness of the trail
      friction: 0.5,
      spring: 0.4,
    };

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, moved: false };

    // Initialize trail points
    for (let i = 0; i < config.pointsCount; i++) {
      trail.push({ x: mouse.x, y: mouse.y, vx: 0, vy: 0 });
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.moved = true;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!mouse.moved) {
        // If mouse hasn't moved yet, don't draw anything to keep it clean
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // Update lead point to follow mouse
      trail[0].x = mouse.x;
      trail[0].y = mouse.y;

      // Update remaining points using a spring/friction model to create a "liquid" dragging effect
      for (let i = 1; i < config.pointsCount; i++) {
        let prev = trail[i - 1];
        let curr = trail[i];

        curr.vx += (prev.x - curr.x) * config.spring;
        curr.vy += (prev.y - curr.y) * config.spring;
        curr.vx *= config.friction;
        curr.vy *= config.friction;

        curr.x += curr.vx;
        curr.y += curr.vy;
      }

      // Draw the trail
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      
      // We'll draw it twice for a neon glow effect
      for (let j = 0; j < 2; j++) {
        ctx.beginPath();
        for (let i = 0; i < config.pointsCount - 1; i++) {
          let curr = trail[i];
          let next = trail[i + 1];
          let xc = (curr.x + next.x) / 2;
          let yc = (curr.y + next.y) / 2;

          if (i === 0) {
            ctx.moveTo(curr.x, curr.y);
          } else {
            ctx.quadraticCurveTo(curr.x, curr.y, xc, yc);
          }
        }
        
        ctx.lineWidth = j === 0 ? config.radius : config.radius / 2;
        
        if (j === 0) {
          // Outer glow/shadow
          ctx.strokeStyle = isDark ? 'rgba(124, 58, 237, 0.15)' : 'rgba(99, 102, 241, 0.15)';
          ctx.filter = 'blur(8px)';
        } else {
          // Inner core
          ctx.strokeStyle = isDark ? 'rgba(139, 92, 246, 0.5)' : 'rgba(79, 70, 229, 0.5)';
          ctx.filter = 'blur(2px)';
        }
        
        ctx.stroke();
      }
      
      ctx.filter = 'none';

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
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
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9997, // Just below the cursor but above UI
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default LiquidTrail;
