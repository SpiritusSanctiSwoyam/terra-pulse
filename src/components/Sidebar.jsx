import React from 'react';
import { Flame, Waves, AlertTriangle } from 'lucide-react';

export default function Sidebar({ zones, onSelectZone, isMobileDrawer = false }) {
  const sortedZones = [...zones].sort((a, b) => b.priority_score - a.priority_score);

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'var(--accent-red)';
      case 'medium': return 'var(--accent-amber)';
      case 'low': return 'var(--accent-green)';
      default: return 'gray';
    }
  };

  const getSeverityLabel = (severity) => {
    switch(severity) {
      case 'high': return 'ONGOING';
      case 'medium': return 'MONITORING';
      case 'low': return 'PLANNED';
      default: return 'UNKNOWN';
    }
  };

  const getIcon = (severity) => {
    if (severity === 'high') return <Flame size={14} color="white" />;
    if (severity === 'medium') return <AlertTriangle size={14} color="white" />;
    return <Waves size={14} color="white" />;
  };

  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: 'rgba(255, 255, 255, 0.90)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)'
    }}>
      <style>{`
        .sidebar-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .sidebar-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px -2px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      {!isMobileDrawer && (
        <div style={{ padding: '24px', borderBottom: '1px solid #E5E7EB', flexShrink: 0 }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 4px 0', color: '#111827' }}>PS-08 Disaster Intelligence</h1>
          <div style={{ color: '#6B7280', fontSize: '0.9rem' }}>EMSR2026 - Active Zones</div>
        </div>
      )}
      
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {sortedZones.map((zone) => {
          const sevColor = getSeverityColor(zone.severity);
          return (
            <div 
              key={zone.cell_id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                borderBottom: '1px solid var(--border-sidebar)',
                backgroundColor: 'var(--bg-sidebar)',
                transition: 'background-color 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-sidebar-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-sidebar)'}
            >
              {/* Header: Icon, ID, Status Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: sevColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {getIcon(zone.severity)}
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#111827' }}>EMSR2026 - {zone.cell_id}</span>
                </div>
                <div style={{ 
                  backgroundColor: sevColor, 
                  color: 'white',
                  padding: '3px 8px', 
                  borderRadius: '12px',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}>
                  {getSeverityLabel(zone.severity)}
                </div>
              </div>
              
              <div style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '16px', paddingLeft: '30px', color: '#1F2937' }}>
                Disaster Event in Zone {zone.cell_id}
              </div>
              
              {/* Metadata columns */}
              <div style={{ display: 'flex', gap: '24px', marginBottom: '20px', paddingLeft: '30px' }}>
                <div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-muted-light)', fontWeight: 600, letterSpacing: '0.05em' }}>AFFECTED EST.</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#374151' }}>{zone.affected_estimate.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-muted-light)', fontWeight: 600, letterSpacing: '0.05em' }}>POP DENSITY</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#374151' }}>{zone.population_density}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#374151' }}>{(zone.priority_score * 100).toFixed(1)}</div>
                  <div style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>PRIORITY</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button 
                  onClick={() => onSelectZone(zone)}
                  style={{
                  padding: '6px 20px',
                  backgroundColor: 'white',
                  border: '1px solid #D1D5DB',
                  borderRadius: '20px',
                  color: '#4B5563',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}>
                  Activation details &gt;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
