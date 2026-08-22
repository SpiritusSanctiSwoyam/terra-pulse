import React from 'react';
import data from '../data/dummyZones.json';
import useWindowSize from '../hooks/useWindowSize';

export default function NewsTicker() {
  const { isMobile } = useWindowSize();
  const highSeverityZones = data.cells ? data.cells.filter(z => z.severity === 'high') : [];

  if (highSeverityZones.length === 0) return null;

  const headlines = highSeverityZones.map(zone => 
    `BREAKING: Severe flooding detected in EMSR2026-${zone.cell_id}. Priority Score ${(zone.priority_score * 100).toFixed(1)}. Rapid response mapping ongoing...`
  ).join(' | \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0 | \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0 ');

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#EF4444',
      color: 'white',
      padding: isMobile ? '4px 0' : '8px 0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      zIndex: 1500,
      position: 'relative',
      flexShrink: 0,
      height: isMobile ? '28px' : 'auto'
    }}>
      <div style={{ 
        backgroundColor: '#991B1B', 
        padding: isMobile ? '0 12px' : '0 24px', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        fontWeight: 800, 
        letterSpacing: '1px',
        position: 'absolute',
        left: 0,
        zIndex: 10,
        fontSize: isMobile ? '0.75rem' : '1rem'
      }}>
        LIVE DATA
      </div>
      <div style={{
        paddingLeft: isMobile ? '120px' : '220px',
        display: 'inline-block',
        animation: 'ticker-scroll 25s linear infinite',
        fontWeight: 600,
        fontSize: isMobile ? '0.75rem' : '0.9rem',
        lineHeight: 1
      }}>
        {headlines}
      </div>
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
