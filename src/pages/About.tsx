import React from 'react';

const About: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(to bottom, #f8f6ef, #d3af6c, #3b024d)',
      color: '#1a1a1a',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        About This Project
      </h1>
      <p style={{ maxWidth: '800px', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        This freelance job escrow system was created during the 2025 Bolt Hackathon, with smart contracts generated via Bolt.new and further enhanced with additional security and real-world logic.
      </p>
      <p style={{ maxWidth: '800px', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        Custom modifications include one-time funding logic, fallback mechanisms for rejected work, and timeout-based payout options to ensure funds are never stuck.
      </p>
      <p style={{ maxWidth: '800px', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        I wanted this build to reflect a commitment to fairness and usability — for both freelancers and clients. It blends clean automation with thoughtful protections.
      </p>
      <div style={{
        marginTop: '2rem',
        background: '#ffeedd',
        padding: '1rem',
        borderRadius: '6px'
      }}>
        <h2 style={{ marginBottom: '0.5rem' }}>⚠️ Style Preview Disclaimer</h2>
        <p>
          Tailwind styling is present in the codebase but may not be rendered in Bolt’s live preview. Exporting the project or running locally will show the full visual design.
        </p>
      </div>
    </div>
  );
};

export default About;
