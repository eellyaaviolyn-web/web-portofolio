import React from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const FilmGrain = () => {
  const isMobile = useIsMobile();
  
  if (isMobile) return null;

  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <filter id="film-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="
            1 0 0 0 0,
            0 1 0 0 0,
            0 0 1 0 0,
            0 0 0 0.1 0" />
        </filter>
      </svg>
      <div
        className="film-grain-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9997, // Behind the cursor
          opacity: 0.15, // Subtle blend
          mixBlendMode: 'overlay',
        }}
      >
        <style>
          {`
            .film-grain-overlay::before {
              content: "";
              position: absolute;
              top: -100%;
              left: -100%;
              width: 300%;
              height: 300%;
              background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
              animation: grain-animation 8s steps(10) infinite;
            }
            @keyframes grain-animation {
              0%, 100% { transform: translate(0, 0) }
              10% { transform: translate(-5%, -10%) }
              20% { transform: translate(-15%, 5%) }
              30% { transform: translate(7%, -25%) }
              40% { transform: translate(-5%, 25%) }
              50% { transform: translate(-15%, 10%) }
              60% { transform: translate(15%, 0%) }
              70% { transform: translate(0%, 15%) }
              80% { transform: translate(3%, 35%) }
              90% { transform: translate(-10%, 10%) }
            }
          `}
        </style>
      </div>
    </>
  );
};

export default FilmGrain;
