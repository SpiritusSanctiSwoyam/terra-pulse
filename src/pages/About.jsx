import React from 'react';
import { Satellite, Clock, Shield, Globe, Users, Zap, BarChart3, AlertTriangle } from 'lucide-react';
import useWindowSize from '../hooks/useWindowSize';

export default function About() {
  const { isMobile } = useWindowSize();

  return (
    <div style={{
      flex: 1,
      backgroundColor: '#0F172A',
      color: 'white',
      overflowY: 'auto',
      padding: isMobile ? '24px 16px' : '48px'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(249, 115, 22, 0.15)',
            padding: '8px 16px',
            borderRadius: '20px',
            marginBottom: '24px',
            border: '1px solid rgba(249, 115, 22, 0.3)'
          }}>
            <Shield size={16} color="#F97316" />
            <span style={{ color: '#F97316', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em' }}>PS-08 DISASTER INTELLIGENCE</span>
          </div>
          <h1 style={{ fontSize: isMobile ? '2rem' : '3.5rem', fontWeight: 900, margin: '0 0 16px 0', lineHeight: 1.1 }}>
            About <span style={{ color: '#F97316' }}>Terra Pulse</span>
          </h1>
          <p style={{ fontSize: isMobile ? '1rem' : '1.2rem', color: '#94A3B8', maxWidth: '700px', margin: '0 auto', lineHeight: 1.7 }}>
            A satellite-derived rapid damage assessment platform combining NDWI-based flood severity classification with a weighted prioritization engine, designed to cut disaster response time from days to hours.
          </p>
        </div>

        {/* Problem / Solution */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '24px',
          marginBottom: '56px'
        }}>
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '16px',
            padding: '32px'
          }}>
            <AlertTriangle size={28} color="#EF4444" style={{ marginBottom: '16px' }} />
            <h3 style={{ color: '#EF4444', margin: '0 0 12px 0', fontSize: '1.3rem' }}>The Problem</h3>
            <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}>
              Natural disasters like floods and wildfires get slow relief response because damage assessment depends on manual field surveys. Free satellite data exists but isn't turned into clear, actionable information for relief teams — costing critical hours.
            </p>
          </div>
          <div style={{
            backgroundColor: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            borderRadius: '16px',
            padding: '32px'
          }}>
            <Zap size={28} color="#22C55E" style={{ marginBottom: '16px' }} />
            <h3 style={{ color: '#22C55E', margin: '0 0 12px 0', fontSize: '1.3rem' }}>Our Solution</h3>
            <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}>
              Terra Pulse fuses multi-source satellite imagery with ML-based change detection to generate rapid, prioritized disaster impact maps and alerts — reducing time between disaster onset and actionable intelligence from days to hours.
            </p>
          </div>
        </div>

        {/* Architecture */}
        <h2 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 800, marginBottom: '32px', textAlign: 'center' }}>
          System Architecture
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '56px'
        }}>
          {[
            { icon: <Satellite size={24} />, title: 'Data Ingestion', desc: 'Sentinel-1 SAR & Sentinel-2 multispectral imagery fetched and aligned for comparison.', color: '#3B82F6' },
            { icon: <BarChart3 size={24} />, title: 'Change Detection', desc: 'NDWI delta analysis classifies damage into low, medium, and high severity zones.', color: '#F97316' },
            { icon: <Users size={24} />, title: 'Prioritization', desc: 'Weighted formula combines damage with population density & infrastructure data.', color: '#8B5CF6' },
            { icon: <Globe size={24} />, title: 'Dashboard', desc: 'Interactive map with severity layers, priority rankings, and pre/post scrubber.', color: '#22C55E' },
          ].map((item, i) => (
            <div key={i} style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-1px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40%',
                height: '3px',
                backgroundColor: item.color,
                borderRadius: '0 0 4px 4px'
              }} />
              <div style={{ color: item.color, marginBottom: '12px' }}>{item.icon}</div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem' }}>{item.title}</h4>
              <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <h2 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 800, marginBottom: '32px', textAlign: 'center' }}>
          The Team
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '24px',
          marginBottom: '48px'
        }}>
          {[
            { name: 'Swoyam', role: 'Data / ML Pipeline', tasks: 'Satellite ingestion, NDWI computation, severity classification, priority scoring engine', color: '#3B82F6' },
            { name: 'Kunal', role: 'Dashboard / Frontend', tasks: 'Interactive Leaflet map, sidebar UI, activation details, responsive design, Vercel deployment', color: '#F97316' },
          ].map((member, i) => (
            <div key={i} style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: member.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.2rem'
              }}>
                {member.name[0]}
              </div>
              <h3 style={{ margin: 0, fontSize: '1.3rem' }}>{member.name}</h3>
              <div style={{ color: member.color, fontWeight: 700, fontSize: '0.9rem' }}>{member.role}</div>
              <p style={{ color: '#94A3B8', margin: 0, lineHeight: 1.6, fontSize: '0.9rem' }}>{member.tasks}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
