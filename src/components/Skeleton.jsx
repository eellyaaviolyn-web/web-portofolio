import React from 'react';

const shimmerStyle = {
  background: 'linear-gradient(90deg, var(--bg-secondary) 25%, var(--border-color) 50%, var(--bg-secondary) 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.5s infinite',
  borderRadius: '0.5rem',
};

export const SkeletonBox = ({ width = '100%', height = '1rem', style = {} }) => (
  <>
    <div style={{ width, height, ...shimmerStyle, ...style }} />
    <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
  </>
);

export const ProjectSkeleton = () => (
  <div className="card glass" style={{ padding: 0, overflow: 'hidden', marginBottom: '2rem' }}>
    <SkeletonBox height="300px" style={{ borderRadius: '0' }} />
    <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <SkeletonBox height="2rem" width="60%" />
      <SkeletonBox height="1rem" />
      <SkeletonBox height="1rem" width="80%" />
      <SkeletonBox height="2.5rem" width="150px" style={{ borderRadius: '50px' }} />
    </div>
  </div>
);

export const BlogSkeleton = () => (
  <div className="card glass" style={{ padding: 0, overflow: 'hidden' }}>
    <SkeletonBox height="180px" style={{ borderRadius: '0' }} />
    <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <SkeletonBox height="1.2rem" width="40%" style={{ borderRadius: '50px' }} />
      <SkeletonBox height="1.5rem" width="85%" />
      <SkeletonBox height="1rem" />
      <SkeletonBox height="1rem" width="70%" />
    </div>
  </div>
);
