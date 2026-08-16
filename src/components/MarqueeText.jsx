import React from 'react';

const MarqueeText = ({ text = "DEVELOPER • DESIGNER • CREATOR • " }) => {
  return (
    <div className="marquee-container" style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100vw',
      overflow: 'hidden',
      zIndex: -1,
      pointerEvents: 'none',
      opacity: 0.03, // Sangat transparan sebagai latar belakang
      userSelect: 'none',
    }}>
      <div className="marquee-content" style={{
        display: 'flex',
        whiteSpace: 'nowrap',
        width: 'fit-content',
        willChange: 'transform'
      }}>
        <h1 style={{
          fontSize: 'clamp(10rem, 25vw, 30rem)',
          fontWeight: 900,
          lineHeight: 1,
          margin: 0,
          paddingRight: '1rem',
          color: 'transparent',
          WebkitTextStroke: '2px var(--text-primary)',
          fontFamily: '"Fira Code", monospace'
        }}>
          {text}
        </h1>
        <h1 style={{
          fontSize: 'clamp(10rem, 25vw, 30rem)',
          fontWeight: 900,
          lineHeight: 1,
          margin: 0,
          paddingRight: '1rem',
          color: 'transparent',
          WebkitTextStroke: '2px var(--text-primary)',
          fontFamily: '"Fira Code", monospace'
        }}>
          {text}
        </h1>
        <h1 style={{
          fontSize: 'clamp(10rem, 25vw, 30rem)',
          fontWeight: 900,
          lineHeight: 1,
          margin: 0,
          paddingRight: '1rem',
          color: 'transparent',
          WebkitTextStroke: '2px var(--text-primary)',
          fontFamily: '"Fira Code", monospace'
        }}>
          {text}
        </h1>
      </div>
    </div>
  );
};

export default MarqueeText;
