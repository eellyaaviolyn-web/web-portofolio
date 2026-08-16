import React, { useEffect } from 'react';
import { getAudioAmplitude } from '../utils/generativeAudio';

const AudioReactor = () => {
  useEffect(() => {
    let animationFrameId;

    const render = () => {
      const amp = getAudioAmplitude(); // 0 to 1
      
      // We amplify the visual effect slightly, max out around 1.05 scale for safety
      // Base scale is 1, max scale is 1.05
      const scale = 1 + (amp * 0.5); 
      
      // Update global CSS variable
      document.documentElement.style.setProperty('--audio-amp', amp.toFixed(3));
      document.documentElement.style.setProperty('--audio-scale', scale.toFixed(3));
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return null;
};

export default AudioReactor;
