import React from 'react';
import { Info } from 'lucide-react';

export default function About() {
  return (
    <div style={{ flex: 1, padding: '60px', backgroundColor: '#F3F4F6', overflowY: 'auto' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '40px', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <Info size={32} color="var(--accent-orange)" />
          <h1 style={{ margin: 0, fontSize: '2.5rem', color: '#111827' }}>About Us</h1>
        </div>
        <p style={{ fontSize: '1.1rem', color: '#4B5563', lineHeight: '1.6', marginBottom: '24px' }}>
          The PS-08 Disaster Intelligence platform was created to provide rapid, satellite-derived situational awareness to first responders and crisis management agencies globally.
        </p>
        <p style={{ fontSize: '1.1rem', color: '#4B5563', lineHeight: '1.6' }}>
          By leveraging automated change-detection algorithms (such as NDWI delta analysis) on live satellite imagery, we identify critical impact zones, estimate affected populations, and prioritize relief efforts where they are needed most.
        </p>
      </div>
    </div>
  );
}
