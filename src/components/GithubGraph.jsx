import React from 'react';
import GitHubCalendar from 'react-github-calendar';

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
      <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
        Coding Activity
      </h3>
      
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
