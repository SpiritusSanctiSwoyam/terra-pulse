import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers, Flame, Waves, AlertTriangle } from 'lucide-react';
import { renderToString } from 'react-dom/server';
import useWindowSize from '../hooks/useWindowSize';

function BoundsComponent({ bounds, focusMode, zones }) {
  const map = useMap();
  useEffect(() => {
    if (focusMode && zones && zones.length > 0) {
      map.setView([zones[0].lat, zones[0].lon], 15);
    } else if (bounds) {
      map.fitBounds([
        [bounds.south, bounds.west],
        [bounds.north, bounds.east]
      ], {
        padding: [50, 50],
        maxZoom: 14 
      });
    }
  }, [bounds, map, focusMode, zones]);

  useEffect(() => {
    const handleResize = () => {
      // Small timeout allows parent containers to finish resizing
      setTimeout(() => map.invalidateSize(), 300);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [map]);

  return null;
}

export default function MapView({ zones, bounds, focusMode = false }) {
  const [basemap, setBasemap] = useState('satellite');
  const [timelineValue, setTimelineValue] = useState(100);
  const { isMobile } = useWindowSize();

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return 'gray';
    }
  };

  const createCopernicusIcon = (zone) => {
    const color = getSeverityColor(zone.severity);
    const size = zone.severity === 'high' ? 56 : (zone.severity === 'medium' ? 48 : 40);
    const coreSize = size - 16;

    const IconElement = () => {
      if (zone.severity === 'high') return <Flame size={coreSize/1.8} />;
      if (zone.severity === 'medium') return <AlertTriangle size={coreSize/1.8} />;
      return <Waves size={coreSize/1.8} />;
    };

    const iconHtml = `
      <div class="copernicus-marker" style="width: ${size}px; height: ${size}px;">
        <div class="copernicus-halo" style="background-color: ${color}; border: 1px solid ${color};"></div>
        <div class="copernicus-core" style="width: ${coreSize}px; height: ${coreSize}px;">
          ${renderToString(<IconElement />)}
        </div>
      </div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: '',
      iconSize: [size, size],
      iconAnchor: [size/2, size/2],
      popupAnchor: [0, -size/2]
    });
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Basemap Toggle */}
      <button
        onClick={() => setBasemap(prev => prev === 'dark' ? 'satellite' : 'dark')}
        style={{
          position: 'absolute',
          top: isMobile ? '70px' : '20px',
          right: isMobile ? '12px' : '20px',
          zIndex: 1000,
          backgroundColor: '#FFFFFF',
          color: '#111827',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.2s'
        }}
        title="Toggle Basemap"
      >
        <Layers size={20} />
      </button>

      <MapContainer 
        center={[26.9, 75.8]} 
        zoom={12} 
        style={{ width: '100%', height: '100%', zIndex: 1, backgroundColor: '#111827' }}
        zoomControl={false}
        worldCopyJump={false}
      >
        <BoundsComponent bounds={bounds} focusMode={focusMode} zones={zones} />
        {basemap === 'dark' ? (
          <TileLayer
            key="dark"
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            noWrap={true}
          />
        ) : (
          <TileLayer
            key="satellite"
            url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
            attribution="&copy; Google Maps"
            noWrap={true}
          />
        )}
        
        {zones.slice(0, Math.max(1, Math.ceil((timelineValue / 100) * zones.length))).map(zone => {
          const color = getSeverityColor(zone.severity);
          return (
            <Marker
              key={zone.cell_id}
              position={[zone.lat, zone.lon]}
              icon={createCopernicusIcon(zone)}
            >
              <Popup>
                <div style={{ minWidth: '150px' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#111827' }}>EMSR2026 - {zone.cell_id}</h3>
                  <div style={{ marginBottom: '4px', textTransform: 'uppercase', color: color, fontWeight: 700, fontSize: '0.8rem' }}>
                    Severity: {zone.severity}
                  </div>
                  <div style={{ color: '#4B5563', fontSize: '0.9rem' }}>
                    Affected: {zone.affected_estimate.toLocaleString()}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? 'auto' : '24px',
        top: isMobile ? '12px' : 'auto',
        left: isMobile ? '12px' : '24px',
        zIndex: 1000,
        backgroundColor: '#FFFFFF',
        padding: isMobile ? '12px' : '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '8px' : '12px'
      }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', letterSpacing: '0.05em' }}>SEVERITY LEVEL</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { label: 'High', color: '#EF4444' },
            { label: 'Medium', color: '#F59E0B' },
            { label: 'Low', color: '#10B981' }
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                width: '14px', 
                height: '14px', 
                borderRadius: '50%', 
                backgroundColor: item.color
              }} />
              <span style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', fontWeight: 600, color: '#111827' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Timeline Control */}
      {!focusMode && (
        <div style={{
          position: 'absolute',
          bottom: isMobile ? '45%' : '24px',
          right: isMobile ? '12px' : '24px',
          zIndex: 1000,
          backgroundColor: 'rgba(30, 41, 59, 0.85)',
          backdropFilter: 'blur(8px)',
          padding: isMobile ? '8px 16px' : '12px 24px',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '8px' : '16px',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {!isMobile && <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>2025-Aug</div>}
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={timelineValue}
            onChange={(e) => setTimelineValue(Number(e.target.value))}
            style={{ width: isMobile ? '100px' : '150px', cursor: 'pointer', accentColor: 'var(--accent-orange)' }}
          />
          <div style={{ fontSize: isMobile ? '0.75rem' : '0.85rem', fontWeight: 600 }}>2026-Aug</div>
        </div>
      )}
      
    </div>
  );
}
