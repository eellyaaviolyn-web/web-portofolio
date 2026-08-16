import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';

const Scenery3D = () => {
  return (
    <>
      {/* Remove solid background and Sky to let CSS background show through */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={25} size={2} speed={0.4} opacity={0.2} color="#8b5cf6" />
      <Sparkles count={100} scale={25} size={4} speed={0.2} opacity={0.1} color="#0ea5e9" />
    </>
  );
};

const Background3D = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      pointerEvents: 'none',
      background: 'transparent'
    }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <Scenery3D />
      </Canvas>
    </div>
  );
};

export default Background3D;
