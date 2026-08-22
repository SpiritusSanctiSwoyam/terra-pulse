import React from 'react';
import { useNavigate } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';

export default function Home() {
  const navigate = useNavigate();
  const { isMobile } = useWindowSize();

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      padding: isMobile ? '80px 16px 24px 16px' : '100px 48px 48px 48px',
      fontFamily: 'sans-serif',
      position: 'relative',
      overflowY: 'auto'
    }}>
      {/* Dark overlay for readability */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1
      }} />

      {/* Main Content Container */}
      <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Massive Glassmorphic Hero */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '32px',
          padding: isMobile ? '40px 24px' : '80px 60px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '48px',
          boxShadow: '0 24px 48px rgba(0,0,0,0.2)'
        }}>
          <h1 style={{ 
            margin: '0 0 24px 0', 
            fontSize: isMobile ? '3rem' : '7rem', 
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: '-0.02em',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '8px' : '0px'
          }}>
            <span style={{ color: '#FFFFFF' }}>INTELLIGENCE</span>
            <span style={{ 
              color: 'transparent', 
              WebkitTextStroke: isMobile ? '2px #FFFFFF' : '3px #FFFFFF',
            }}>YOU CAN TRUST.</span>
          </h1>
          
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: isMobile ? '1rem' : '1.25rem',
            maxWidth: '700px',
            lineHeight: 1.6,
            marginBottom: '40px',
            fontWeight: 500
          }}>
            Global disaster monitoring is a critical necessity often delayed by legacy systems. 
            Our platform provides sub-3-hour latency on satellite insights, giving responders 
            the tactical advantage they need before it's too late. Access the portal now.
          </p>

          <button 
            onClick={() => navigate('/dashboard')}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#000000',
              border: 'none',
              borderRadius: '30px',
              padding: '16px 40px',
              fontSize: '1.1rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Access Portal
          </button>
        </div>

        {/* 3 Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '24px',
          marginTop: 'auto'
        }}>
          {/* Flood Card */}
          <FeatureCard 
            title="Floods"
            description="With rising global temperatures and unpredictable weather patterns, coastal and river flooding incidents are escalating rapidly, displacing millions annually."
            image="https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=800&auto=format&fit=crop"
            onClick={() => navigate('/dashboard')}
          />
          {/* Wildfire Card */}
          <FeatureCard 
            title="Wildfires"
            description="Drier seasons and prolonged heatwaves have transformed vast forests into tinderboxes. Rapid detection is the only viable defense line."
            image="https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=800&auto=format&fit=crop"
            onClick={() => navigate('/dashboard')}
          />
          {/* Earthquakes Card */}
          <FeatureCard 
            title="Earthquakes"
            description="Sudden seismic events shatter critical infrastructure without warning. Instantaneous structural damage mapping directs relief to the hardest-hit sectors."
            image="https://images.unsplash.com/photo-1595180410403-128c119e8c45?q=80&w=800&auto=format&fit=crop"
            onClick={() => navigate('/dashboard')}
          />
        </div>
      </div>
    </div>
  );
}

// Helper Component for the 3 bottom cards
function FeatureCard({ title, description, image, onClick }) {
  return (
    <div style={{
      height: '300px',
      borderRadius: '24px',
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '24px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    }}>
      {/* Dark gradient for text readability */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
        zIndex: 1
      }} />
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h3 style={{ color: 'white', margin: '0 0 8px 0', fontSize: '1.4rem', fontWeight: 800 }}>{title}</h3>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', margin: '0 0 16px 0', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {description}
        </p>
        <button 
          onClick={onClick}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            alignSelf: 'flex-start',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#FFFFFF'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'}
        >
          Learn More
        </button>
      </div>
    </div>
  );
}
