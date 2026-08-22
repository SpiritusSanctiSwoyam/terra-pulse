import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function AlertBanner({ topZone }) {
  if (!topZone) return null;

  return (
    <div style={{ position: 'relative', width: '100%', zIndex: 1000 }}>
      <div style={{
        width: '100%',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        color: 'var(--accent-red)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        fontWeight: '900',
        fontSize: '1.1rem',
        animation: 'pulse-banner 1s infinite',
        borderBottom: '1px solid var(--accent-red)',
        textTransform: 'uppercase'
      }}>
        <AlertTriangle size={24} className="glitch-text" />
        <span className="glitch-text" style={{ letterSpacing: '2px' }}>
          CRITICAL PRIORITY OVERRIDE: {topZone.cell_id} // EST. {topZone.affected_estimate.toLocaleString()} AFFECTED
        </span>
      </div>
      {/* Animated hazard stripe */}
      <div className="hazard-stripe" style={{
        height: '8px',
        width: '100%',
        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.8)'
      }} />
    </div>
  );
}
