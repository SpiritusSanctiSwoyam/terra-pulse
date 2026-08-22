import React from 'react';
import { List } from 'lucide-react';

export default function Details() {
  return (
    <div style={{ flex: 1, padding: '60px', backgroundColor: '#F3F4F6', overflowY: 'auto' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '40px', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <List size={32} color="var(--accent-orange)" />
          <h1 style={{ margin: 0, fontSize: '2.5rem', color: '#111827' }}>Basic Details</h1>
        </div>
        <ul style={{ fontSize: '1.1rem', color: '#4B5563', lineHeight: '1.8' }}>
          <li><strong>Data Sources:</strong> Sentinel-1 SAR and Sentinel-2 Multispectral imagery.</li>
          <li><strong>Processing Latency:</strong> Sub-3 hour turnaround from satellite downlink to dashboard delivery.</li>
          <li><strong>Alert Tiering:</strong> Zones are categorized into High, Medium, and Low severity based on inundation percentage and proximity to critical infrastructure.</li>
          <li><strong>Coverage:</strong> Global monitoring capability with rapid tasking in high-risk regions.</li>
        </ul>
      </div>
    </div>
  );
}
