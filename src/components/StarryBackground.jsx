import React, { useEffect, useRef } from 'react';

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];
    
    // Mouse tracking for constellation
    let mouse = { x: null, y: null };
    const maxDistance = 150; // Distance within which stars connect
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      // Calculate a reasonable number of stars based on screen size
      const numStars = Math.floor((canvas.width * canvas.height) / 2000); 
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2 + 0.1,
          alpha: Math.random(),
          twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
          speedY: Math.random() * 0.15 + 0.05
        });
      }
    };

    const drawStars = () => {
      // Clear canvas (keep it transparent to let theme colors show)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        // Move slowly upwards
        star.y -= star.speedY;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }

        // Twinkle
        star.alpha += star.twinkleSpeed;
        if (star.alpha <= 0.1 || star.alpha >= 0.9) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Add a slight blueish tint to some stars for aesthetic
        const r = 255;
        const g = 255;
        const b = Math.random() > 0.8 ? 255 : 220; // 20% pure white, 80% slightly warm/blueish depending on theme

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, star.alpha))})`;
        ctx.fill();
        
        // Add subtle glow to larger stars
        if (star.radius > 1) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = "white";
        } else {
          ctx.shadowBlur = 0;
        }
      });

      // Draw constellation lines
      if (mouse.x !== null && mouse.y !== null) {
        stars.forEach(star => {
          const dx = mouse.x - star.x;
          const dy = mouse.y - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(mouse.x, mouse.y);
            // Opacity based on distance
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(100, 200, 255, ${opacity * 0.4})`; // Light blue/cyan tint for lines
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(drawStars);
    };

    window.addEventListener('resize', resize);
    resize();
    drawStars();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
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
        width: '100vw',
        height: '100vh',
        zIndex: -3,
        pointerEvents: 'none',
        opacity: 0.6 // Subtle overall opacity
      }}
    />
  );
};

export default StarryBackground;
