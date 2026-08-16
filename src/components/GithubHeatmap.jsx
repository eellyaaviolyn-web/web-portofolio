import React from 'react';

const GithubHeatmap = () => {
  // Generate mock data: 52 columns, 7 rows
  const weeks = 52;
  const days = 7;
  const cells = [];
  
  for (let i = 0; i < weeks * days; i++) {
    // Random intensity 0-4 (biased towards 0 for realism)
    const rand = Math.random();
    let intensity = 0;
    if (rand > 0.6) intensity = 1;
    if (rand > 0.8) intensity = 2;
    if (rand > 0.9) intensity = 3;
    if (rand > 0.95) intensity = 4;
    
    let color = 'var(--bg-secondary)'; // level 0
    if (intensity === 1) color = 'rgba(99, 102, 241, 0.3)';
    if (intensity === 2) color = 'rgba(99, 102, 241, 0.5)';
    if (intensity === 3) color = 'rgba(99, 102, 241, 0.8)';
    if (intensity === 4) color = 'var(--accent-primary)';
    
    cells.push(<div key={i} style={{ width: '12px', height: '12px', backgroundColor: color, borderRadius: '2px' }} />);
  }

  return (
    <div className="card glass" style={{ marginTop: '3rem', overflowX: 'auto', padding: '1.5rem 2rem' }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        GitHub Contributions <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>(1,034 contributions in the last year)</span>
      </h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${weeks}, 12px)`, 
        gridTemplateRows: `repeat(${days}, 12px)`, 
        gridAutoFlow: 'column', // Fill top to bottom, then left to right like GitHub
        gap: '4px', 
        width: 'fit-content' 
      }}>
        {cells}
      </div>
    </div>
  );
};

export default GithubHeatmap;
