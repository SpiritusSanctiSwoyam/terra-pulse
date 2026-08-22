import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Activity, ShieldAlert, ChevronRight } from 'lucide-react';
import useWindowSize from '../hooks/useWindowSize';

export default function Home() {
  const { isMobile } = useWindowSize();

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F3F4F6',
      backgroundImage: 'radial-gradient(#E5E7EB 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      padding: isMobile ? '24px' : '40px',
      overflowY: 'auto'
    }}>
      <div style={{
        maxWidth: '800px',
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#FFFFFF',
        padding: isMobile ? '40px 24px' : '60px',
        borderRadius: '16px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1px solid #E5E7EB'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: isMobile ? '16px' : '24px', 
          marginBottom: '32px',
          flexWrap: 'wrap'
        }}>
          <Globe size={isMobile ? 36 : 48} color="#3B82F6" />
          <Activity size={isMobile ? 36 : 48} color="var(--accent-orange)" />
          <ShieldAlert size={isMobile ? 36 : 48} color="#EF4444" />
        </div>
        
        <h1 style={{ 
          fontSize: isMobile ? '2rem' : '3rem', 
          fontWeight: 900, 
          color: '#111827', 
          marginBottom: '16px', 
          letterSpacing: '-0.02em',
          lineHeight: 1.2
        }}>
          PS-08 Disaster Intelligence
        </h1>
        
        <p style={{ 
          fontSize: isMobile ? '1rem' : '1.2rem', 
          color: '#4B5563', 
          marginBottom: '40px', 
          lineHeight: '1.6' 
        }}>
          Advanced satellite-derived rapid mapping and geospatial intelligence platform. 
          Monitor, analyze, and deploy resources to crisis zones in real-time.
        </p>
        
        <Link to="/dashboard" style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: isMobile ? '100%' : 'auto',
          gap: '8px',
          backgroundColor: '#111827',
          color: 'white',
          padding: '16px 32px',
          borderRadius: '32px',
          fontSize: '1.1rem',
          fontWeight: 700,
          textDecoration: 'none',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transition: 'transform 0.2s, background-color 0.2s',
          minHeight: '44px' 
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.backgroundColor = '#1F2937';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.backgroundColor = '#111827';
        }}
        >
          Access Secure Portal <ChevronRight size={20} />
        </Link>
      </div>
    </div>
  );
}
