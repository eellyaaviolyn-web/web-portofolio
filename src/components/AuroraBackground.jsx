import React from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const AuroraBackground = () => {
  const isMobile = useIsMobile();
  
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -5,
        overflow: 'hidden',
        background: 'var(--bg-primary)',
      }}
    >
      {!isMobile && (
        <>
          <div className="aurora-blob blob-1"></div>
          <div className="aurora-blob blob-2"></div>
          <div className="aurora-blob blob-3"></div>
        </>
      )}

      <style>
        {`
          .aurora-blob {
            position: absolute;
            filter: blur(100px);
            opacity: 0.5;
            border-radius: 50%;
            animation: aurora-float 15s infinite alternate ease-in-out;
          }
          .blob-1 {
            top: -10%;
            left: -10%;
            width: 50vw;
            height: 50vw;
            background: rgba(59, 130, 246, 0.2); /* Soft Blue */
            animation-delay: 0s;
          }
          .blob-2 {
            bottom: -20%;
            right: -10%;
            width: 60vw;
            height: 60vw;
            background: rgba(139, 92, 246, 0.15); /* Soft Purple */
            animation-delay: -5s;
          }
          .blob-3 {
            top: 40%;
            left: 50%;
            width: 40vw;
            height: 40vw;
            background: rgba(20, 184, 166, 0.15); /* Soft Teal */
            transform: translate(-50%, -50%);
            animation-delay: -10s;
          }

          @keyframes aurora-float {
            0% { transform: translate(0, 0) scale(1) rotate(0deg); }
            33% { transform: translate(5%, -5%) scale(1.1) rotate(5deg); }
            66% { transform: translate(-2%, 5%) scale(0.9) rotate(-2deg); }
            100% { transform: translate(3%, 2%) scale(1.05) rotate(3deg); }
          }
        `}
      </style>
    </div>
  );
};

export default AuroraBackground;
