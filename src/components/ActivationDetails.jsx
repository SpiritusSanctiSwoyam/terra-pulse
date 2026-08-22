import React, { useState } from 'react';
import { Droplet, Layers, Download, BarChart, FileText, Code, X, AlertCircle } from 'lucide-react';
import MapView from './MapView';
import useWindowSize from '../hooks/useWindowSize';
import RecommendationCard from './RecommendationCard';

export default function ActivationDetails({ zone, onClose }) {
  const [activeTab, setActiveTab] = useState('description');
  const { isMobile } = useWindowSize();

  if (!zone) return null;

  const tabs = [
    { id: 'description', label: 'ACTIVATION DESCRIPTION', icon: AlertCircle },
    { id: 'map', label: 'SEVERITY MAP', icon: Layers },
    { id: 'download', label: 'DOWNLOAD DATA', icon: Download },
    { id: 'stats', label: 'ACTIVATION STATS', icon: BarChart },
    { id: 'report', label: 'SITUATIONAL REPORT', icon: FileText },
    { id: 'api', label: 'API ACCESS', icon: Code },
  ];

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return 'gray';
    }
  };

  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify(zone, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zone_${zone.cell_id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadCSV = () => {
    const headers = Object.keys(zone).join(',');
    const values = Object.values(zone).join(',');
    const csvStr = `${headers}\\n${values}`;
    const blob = new Blob([csvStr], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zone_${zone.cell_id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'description':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#111827' }}>PS08-{zone.cell_id}</h2>
              <div style={{ 
                backgroundColor: getSeverityColor(zone.severity), 
                color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 
              }}>
                {zone.severity === 'high' ? 'ONGOING' : (zone.severity === 'medium' ? 'MONITORING' : 'RESOLVED')}
              </div>
            </div>
            
            <RecommendationCard zone={zone} />

            <div style={{ marginBottom: '24px', fontSize: '0.9rem', color: '#6B7280' }}>
              <div style={{ marginBottom: '8px' }}><strong>Event Time:</strong> 2026-08-22 14:00 UTC</div>
              <div style={{ marginBottom: '8px' }}><strong>Detection Time:</strong> 2026-08-22 15:30 UTC</div>
              <div style={{ marginBottom: '8px' }}><strong>NDWI Delta:</strong> {zone.delta_ndwi}</div>
              <div style={{ marginBottom: '8px' }}><strong>Pop Density:</strong> {zone.population_density} ({zone.lat}, {zone.lon})</div>
            </div>

            <div style={{ 
              backgroundColor: '#F9FAFB', padding: '16px', borderRadius: '8px', 
              border: '1px solid #E5E7EB', marginBottom: '24px', fontSize: '0.95rem', lineHeight: '1.5', color: '#374151' 
            }}>
              <div style={{ marginBottom: '16px', lineHeight: 1.5 }}>
                Anomalous surface water detected via Sentinel-1 SAR imagery. Change detection algorithms indicate a maximum NDWI deviation of {zone.delta_ndwi} from the pre-event baseline. 
                Rapid response prioritization was triggered given the zone's priority score of {(zone.priority_score * 100).toFixed(1)}.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
              {['1 AOI', '1 Product', '3 Alerts'].map(stat => (
                <div key={stat} style={{ flex: isMobile ? '1 1 40%' : 1, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', padding: '12px', borderRadius: '8px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600, color: '#111827' }}>
                  {stat}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'map':
        return (
          <div>
            <h2 style={{ margin: '0 0 24px 0', fontSize: '1.5rem', color: '#111827' }}>Severity Map</h2>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '24px', color: '#374151' }}>
              <input type="checkbox" defaultChecked />
              <span style={{ fontSize: '0.9rem' }}>Severity Overlay</span>
            </label>
            <div style={{ color: '#6B7280', fontSize: '0.9rem' }}>
              Grading status: <span style={{ color: '#111827' }}>Completed (situation as of 2026-08-22 15:30 UTC)</span>
            </div>
          </div>
        );

      case 'download':
        return (
          <div>
            <h2 style={{ margin: '0 0 24px 0', fontSize: '1.5rem', color: '#111827' }}>Download Data</h2>
            <p style={{ color: '#6B7280', marginBottom: '24px', fontSize: '0.9rem' }}>
              Download the structured intelligence data for this zone.
            </p>
            <button onClick={handleDownloadJSON} style={{ display: 'block', width: '100%', padding: '12px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', color: '#111827', borderRadius: '8px', marginBottom: '12px', cursor: 'pointer', fontWeight: 600, transition: 'background-color 0.2s' }}>
              Download Zone Data (JSON)
            </button>
            <button onClick={handleDownloadCSV} style={{ display: 'block', width: '100%', padding: '12px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', color: '#111827', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, transition: 'background-color 0.2s' }}>
              Download Summary (CSV)
            </button>
          </div>
        );

      case 'stats':
        return (
          <div>
            <h2 style={{ margin: '0 0 24px 0', fontSize: '1.5rem', color: '#111827' }}>Activation Stats</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', padding: '16px', borderRadius: '8px' }}>
                <div style={{ color: '#6B7280', fontSize: '0.75rem', fontWeight: 700, marginBottom: '8px' }}>ESTIMATED POPULATION AFFECTED</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>{zone.affected_estimate.toLocaleString()}</div>
              </div>
              <div style={{ flex: 1, backgroundColor: '#F9FAFB', padding: '16px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                <div style={{ fontSize: '0.8rem', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700 }}>Priority Score</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>{(zone.priority_score * 100).toFixed(1)}</div>
              </div>
              <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', padding: '16px', borderRadius: '8px' }}>
                <div style={{ color: '#6B7280', fontSize: '0.75rem', fontWeight: 700, marginBottom: '8px' }}>SEVERITY LEVEL</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', color: getSeverityColor(zone.severity) }}>{zone.severity}</div>
              </div>
            </div>
          </div>
        );

      case 'report':
        return (
          <div>
            <h2 style={{ margin: '0 0 24px 0', fontSize: '1.5rem', color: '#111827' }}>Situational Report</h2>
            <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', color: '#374151', whiteSpace: 'pre-wrap' }}>
              [2026-08-22 15:30:00 UTC] — Zone {zone.cell_id} flagged {zone.severity.toUpperCase()} priority.<br/><br/>
              Estimated {zone.affected_estimate.toLocaleString()} affected.<br/><br/>
              Recommend deployment within 12 hours.
            </div>
          </div>
        );

      case 'api':
        return (
          <div>
            <h2 style={{ margin: '0 0 24px 0', fontSize: '1.5rem', color: '#111827' }}>Structured Data</h2>
            <p style={{ color: '#6B7280', marginBottom: '16px', fontSize: '0.9rem' }}>Structured data for this activation (JSON)</p>
            <pre style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', color: '#10B981' }}>
              <code>{JSON.stringify(zone, null, 2)}</code>
            </pre>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2000,
      backgroundColor: 'rgba(255, 255, 255, 0.90)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      display: 'flex', flexDirection: isMobile ? 'column' : 'row', color: '#111827', fontFamily: 'sans-serif'
    }}>
      {/* Tab Navigation */}
      <div style={{
        width: isMobile ? '100%' : '280px', 
        height: isMobile ? 'auto' : '100%',
        backgroundColor: 'rgba(249, 250, 251, 0.6)', 
        borderRight: isMobile ? 'none' : '1px solid #E5E7EB',
        borderBottom: isMobile ? '1px solid #E5E7EB' : 'none',
        display: 'flex', 
        flexDirection: isMobile ? 'row' : 'column', 
        padding: isMobile ? '16px' : '24px 0',
        overflowX: isMobile ? 'auto' : 'visible',
        flexShrink: 0
      }}>
        <div style={{ 
          padding: isMobile ? '0 16px 0 0' : '0 24px', 
          marginBottom: isMobile ? '0' : '32px', 
          display: 'flex', alignItems: 'center', gap: '16px',
          borderRight: isMobile ? '1px solid #E5E7EB' : 'none',
          marginRight: isMobile ? '16px' : '0',
          flexShrink: 0
        }}>
          <button onClick={onClose} style={{ 
            background: 'transparent', border: 'none', color: '#111827', cursor: 'pointer', padding: 0 
          }}>
            <X size={24} />
          </button>
          {!isMobile && <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Activation Details</span>}
        </div>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: isMobile ? '8px' : '0', flex: 1 }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '16px', 
                  padding: isMobile ? '8px 16px' : '16px 24px',
                  backgroundColor: isActive ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
                  border: 'none', 
                  borderLeft: (!isMobile && isActive) ? '4px solid #F97316' : (!isMobile ? '4px solid transparent' : 'none'),
                  borderBottom: (isMobile && isActive) ? '3px solid #F97316' : (isMobile ? '3px solid transparent' : 'none'),
                  color: isActive ? '#F97316' : '#6B7280',
                  borderRadius: isMobile ? '16px' : '0',
                  cursor: 'pointer', textAlign: 'left', width: isMobile ? 'auto' : '100%',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                <Icon size={16} />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em' }}>{isMobile ? tab.label.split(' ')[0] : tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Panel */}
      <div style={{ 
        width: isMobile ? '100%' : '450px', 
        height: isMobile ? '45%' : '100%',
        backgroundColor: '#FFFFFF', padding: isMobile ? '24px' : '40px', overflowY: 'auto',
        flexShrink: 0
      }}>
        {renderTabContent()}
      </div>

      {/* Right Map Panel */}
      <div style={{ flex: 1, borderLeft: isMobile ? 'none' : '1px solid #E5E7EB', borderTop: isMobile ? '1px solid #E5E7EB' : 'none', position: 'relative' }}>
        <MapView zones={[zone]} bounds={null} focusMode={true} />
      </div>
    </div>
  );
}
