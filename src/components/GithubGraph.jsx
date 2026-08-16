import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GithubGraph = () => {
  const [contributions, setContributions] = useState([]);

  // Generate mock contribution data for the last 52 weeks (364 days)
  useEffect(() => {
    const data = [];
    const today = new Date();
    // Go back 364 days
    const startDate = new Date(today.getTime() - 364 * 24 * 60 * 60 * 1000);
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      // Give weekend a lower chance of commits, weekdays higher
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const activityLevel = isWeekend ? Math.random() * 0.4 : Math.random();
      
      let level = 0;
      if (activityLevel > 0.8) level = 4;
      else if (activityLevel > 0.6) level = 3;
      else if (activityLevel > 0.4) level = 2;
      else if (activityLevel > 0.15) level = 1;

      data.push({
        date: date.toDateString(),
        level,
        count: level === 0 ? 0 : Math.floor(Math.random() * (level * 5)) + 1
      });
    }
    setContributions(data);
  }, []);

  const getColor = (level) => {
    // Modern Github Green palette adapted for dark mode
    switch(level) {
      case 4: return 'var(--accent-primary)'; // Most active (use theme accent)
      case 3: return 'rgba(59, 130, 246, 0.8)';
      case 2: return 'rgba(59, 130, 246, 0.5)';
      case 1: return 'rgba(59, 130, 246, 0.3)';
      default: return 'rgba(255, 255, 255, 0.05)';
    }
  };

  // Group into weeks
  const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <div style={{
      padding: '1.5rem',
      background: 'var(--bg-secondary)',
      borderRadius: '1rem',
      border: '1px solid var(--border-color)',
      overflowX: 'auto',
      boxShadow: 'var(--shadow-md)'
    }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
        Coding Activity
      </h3>
      
      <div style={{ display: 'flex', gap: '4px' }}>
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {week.map((day, dayIdx) => (
              <div 
                key={dayIdx} 
                className="github-square"
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '2px',
                  background: getColor(day.level),
                  position: 'relative'
                }}
              >
                <div className="github-tooltip">
                  {day.count === 0 ? 'No' : day.count} contributions on {day.date}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '1rem', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        Less
        <div style={{ width: 12, height: 12, borderRadius: 2, background: getColor(0) }} />
        <div style={{ width: 12, height: 12, borderRadius: 2, background: getColor(1) }} />
        <div style={{ width: 12, height: 12, borderRadius: 2, background: getColor(2) }} />
        <div style={{ width: 12, height: 12, borderRadius: 2, background: getColor(3) }} />
        <div style={{ width: 12, height: 12, borderRadius: 2, background: getColor(4) }} />
        More
      </div>

      <style>{`
        .github-square:hover .github-tooltip {
          opacity: 1;
          visibility: visible;
        }
        .github-tooltip {
          position: absolute;
          bottom: 150%;
          left: 50%;
          transform: translateX(-50%);
          background: var(--bg-primary);
          color: var(--text-primary);
          padding: 0.4rem 0.8rem;
          border-radius: 0.4rem;
          font-size: 0.75rem;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.2s ease;
          border: 1px solid var(--border-color);
          z-index: 100;
          box-shadow: var(--shadow-sm);
        }
        .github-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: var(--border-color) transparent transparent transparent;
        }
      `}</style>
    </div>
  );
};

export default GithubGraph;
