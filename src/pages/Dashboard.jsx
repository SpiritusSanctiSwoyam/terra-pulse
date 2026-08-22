import React, { useState, useEffect } from 'react';
import MapView from '../components/MapView';
import Sidebar from '../components/Sidebar';
import ActivationDetails from '../components/ActivationDetails';
import data from '../data/dummyZones.json';
import { Layers } from 'lucide-react';
import useWindowSize from '../hooks/useWindowSize';

function BottomBar({ zones }) {
  const { isMobile } = useWindowSize();
  return (
    <div style={{
      width: '100%',
      backgroundColor: 'rgba(249, 115, 22, 0.90)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      color: '#111827',
      padding: isMobile ? '8px 16px' : '12px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '16px' : '32px',
      fontWeight: '600',
      fontSize: isMobile ? '0.75rem' : '0.9rem',
      borderTop: '1px solid rgba(0,0,0,0.1)',
      zIndex: 1000,
      position: 'relative',
      flexShrink: 0
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Layers size={isMobile ? 14 : 18} />
        <span style={{ fontSize: isMobile ? '0.85rem' : '1rem', fontWeight: 700 }}>{zones.length}</span>
        <span style={{ fontWeight: 500 }}>activations</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: isMobile ? '0.85rem' : '1rem', fontWeight: 700 }}>{zones.reduce((sum, z) => sum + z.affected_estimate, 0).toLocaleString()}</span>
        <span style={{ fontWeight: 500 }}>est. affected</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [zones, setZones] = useState((data.cells || []).map(cell => ({
    ...cell,
    // Derived estimate from population_density (raw headcount field not present in ML schema)
    affected_estimate: Math.round(cell.population_density * 3000)
  })));
  const [eventBounds, setEventBounds] = useState(null);
  const [activeZone, setActiveZone] = useState(null);
  const { isMobile } = useWindowSize();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const rawCells = data.cells || [];
    const mappedZones = rawCells.map(cell => ({
      ...cell,
      affected_estimate: Math.round(cell.population_density * 3000)
    }));
    setZones(mappedZones);

    if (data.event && data.event.bounds) {
      setEventBounds(data.event.bounds);
    } else if (rawCells.length > 0) {
      const lats = rawCells.map(z => z.lat);
      const lons = rawCells.map(z => z.lon);
      setEventBounds({
        north: Math.max(...lats) + 0.05,
        south: Math.min(...lats) - 0.05,
        east: Math.max(...lons) + 0.05,
        west: Math.min(...lons) - 0.05
      });
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', flex: 1, overflow: 'hidden' }}>
        
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div style={{ width: '380px', flexShrink: 0, zIndex: 10, backgroundColor: 'var(--bg-sidebar)', borderRight: '1px solid var(--border-sidebar)' }}>
            <Sidebar zones={zones} onSelectZone={setActiveZone} />
          </div>
        )}

        {/* Main Map Area */}
        <div style={{ flex: 1, position: 'relative' }}>
          <MapView zones={zones} bounds={eventBounds} />
          
          {/* Mobile Bottom Drawer */}
          {isMobile && (
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: drawerOpen ? '80%' : '40%',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              boxShadow: '0 -4px 12px rgba(0,0,0,0.15)',
              zIndex: 1000,
              transition: 'height 0.3s ease-out',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Drawer Handle */}
              <div 
                onClick={() => setDrawerOpen(!drawerOpen)}
                style={{
                  width: '100%',
                  height: '32px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                <div style={{ width: '40px', height: '4px', backgroundColor: '#D1D5DB', borderRadius: '2px' }} />
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <Sidebar zones={zones} onSelectZone={setActiveZone} isMobileDrawer={true} />
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomBar zones={zones} />
      {activeZone && <ActivationDetails zone={activeZone} onClose={() => setActiveZone(null)} />}
    </div>
  );
}
