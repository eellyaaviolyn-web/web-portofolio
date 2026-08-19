import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';

const GithubGraph = () => {
  return (
    <div style={{
      padding: '1.5rem',
      background: 'var(--bg-secondary)',
      borderRadius: '1rem',
      border: '1px solid var(--border-color)',
      overflowX: 'auto',
      boxShadow: 'var(--shadow-md)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
          Coding Activity
        </h3>
        <a 
          href="https://github.com/eellyaaviolyn-web" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            fontSize: '0.9rem',
            color: 'var(--accent-primary)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(59, 130, 246, 0.1)',
            padding: '0.4rem 0.8rem',
            borderRadius: '2rem',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'}
        >
          @eellyaaviolyn-web
        </a>
      </div>
      
      <div style={{ minWidth: '700px' }}>
        <GitHubCalendar 
          username="eellyaaviolyn-web" 
          colorScheme="dark"
          blockSize={12}
          blockMargin={4}
          theme={{
            dark: ['rgba(255, 255, 255, 0.05)', 'rgba(59, 130, 246, 0.3)', 'rgba(59, 130, 246, 0.5)', 'rgba(59, 130, 246, 0.8)', '#3b82f6'],
          }}
        />
      </div>
    </div>
  );
};

export default GithubGraph;
