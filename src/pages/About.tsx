import React from 'react';

const About: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '2rem',
        backgroundImage: `
          radial-gradient(circle at top, #ffffff 10%, transparent 30%),
          linear-gradient(to bottom, #fafafa, #d9d9d9, #0b0e23)
        `,
        color: '#1a1a1a',
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '2.75rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          textAlign: 'center',
          color: '#0b0e23',
        }}
      >
        About This Project
      </h1>

      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          maxWidth: '850px',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <p style={{ lineHeight: '1.7', marginBottom: '1.5rem' }}>
          This freelance job escrow system was created during the 2025 Bolt Hackathon, with smart contracts generated via Bolt.new and further enhanced with additional security and real-world logic.
        </p>
        <p style={{ lineHeight: '1.7', marginBottom: '1.5rem' }}>
          Custom modifications include one-time funding logic, fallback mechanisms for rejected work, and timeout-based payout options to ensure funds are never stuck.
        </p>
        <p style={{ lineHeight: '1.7', marginBottom: '1.5rem' }}>
          I wanted this build to reflect a commitment to fairness and usability — for both freelancers and clients. It blends clean automation with thoughtful protections.
        </p>

      </div>
    </div>
  );
};

export default About;
