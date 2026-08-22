import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldAlert, Menu } from 'lucide-react';
import useWindowSize from '../hooks/useWindowSize';

export default function TopNav() {
  const location = useLocation();
  const { isMobile, isTablet } = useWindowSize();
  const [menuOpen, setMenuOpen] = useState(false);
  const isSmallScreen = isMobile || isTablet;

  return (
    <div style={{
      width: '100%',
      height: isMobile ? '60px' : '70px',
      backgroundColor: '#111827',
      color: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isMobile ? '0 16px' : '0 32px',
      borderBottom: '4px solid var(--accent-orange)',
      zIndex: 1500,
      position: 'relative',
      flexShrink: 0
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '16px' }}>
        <ShieldAlert size={isMobile ? 24 : 32} color="var(--accent-orange)" />
        <span style={{ fontSize: isMobile ? '1rem' : '1.4rem', fontWeight: 800, letterSpacing: '1px' }}>
          {isMobile ? 'PS-08' : 'PS-08 DISASTER INTELLIGENCE'}
        </span>
        <div style={{ 
          width: '8px', height: '8px', backgroundColor: '#EF4444', borderRadius: '50%', 
          animation: 'pulse 1.5s infinite', marginLeft: isMobile ? '4px' : '12px' 
        }} title="System Online & Processing" />
        <style>{`
          @keyframes pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
          }
        `}</style>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '16px' : '32px' }}>
        {!isSmallScreen && (
          <>
            <Link to="/" style={{ color: location.pathname === '/' ? 'var(--accent-orange)' : '#D1D5DB', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', transition: 'color 0.2s' }}>HOME</Link>
            <Link to="/about" style={{ color: location.pathname === '/about' ? 'var(--accent-orange)' : '#9CA3AF', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', transition: 'color 0.2s' }}>ABOUT US</Link>
            <Link to="/details" style={{ color: location.pathname === '/details' ? 'var(--accent-orange)' : '#9CA3AF', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', transition: 'color 0.2s' }}>BASIC DETAILS</Link>
          </>
        )}
        
        {location.pathname !== '/dashboard' && (
          <Link to="/dashboard" style={{
            backgroundColor: 'var(--accent-orange)',
            color: '#111827',
            padding: isMobile ? '8px 16px' : '10px 24px',
            borderRadius: '24px',
            textDecoration: 'none',
            fontWeight: 800,
            fontSize: isMobile ? '0.8rem' : '0.95rem',
            marginLeft: isSmallScreen ? '0' : '16px',
            transition: 'opacity 0.2s',
            whiteSpace: 'nowrap'
          }}>
            {isMobile ? 'PORTAL' : 'ENTER SECURE PORTAL'}
          </Link>
        )}

        {isSmallScreen && (
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'transparent', border: 'none', color: '#D1D5DB', cursor: 'pointer', display: 'flex', padding: 0 }}
          >
            <Menu size={28} />
          </button>
        )}
      </div>
      
      {/* Mobile Dropdown Menu (Mock) */}
      {isSmallScreen && menuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#1F2937',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          borderBottom: '1px solid #374151'
        }}>
          <Link onClick={() => setMenuOpen(false)} to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <Link onClick={() => setMenuOpen(false)} to="/about" style={{ color: 'white', textDecoration: 'none', fontWeight: 600 }}>About Us</Link>
          <Link onClick={() => setMenuOpen(false)} to="/details" style={{ color: 'white', textDecoration: 'none', fontWeight: 600 }}>Basic Details</Link>
        </div>
      )}
    </div>
  );
}
