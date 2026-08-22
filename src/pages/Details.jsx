import React from 'react';
import { Satellite, Clock, Database, Shield, Activity, Cpu, Radio, Globe } from 'lucide-react';
import useWindowSize from '../hooks/useWindowSize';

export default function Details() {
  const { isMobile } = useWindowSize();

  const specs = [
    { icon: <Satellite size={22} />, label: 'Data Sources', value: 'Sentinel-1 SAR + Sentinel-2 MSI', color: '#3B82F6' },
    { icon: <Clock size={22} />, label: 'Processing Latency', value: 'Sub-3 hour turnaround', color: '#F97316' },
    { icon: <Activity size={22} />, label: 'Change Detection', value: 'NDWI Delta Analysis', color: '#22C55E' },
    { icon: <Database size={22} />, label: 'Output Format', value: 'GeoJSON severity grid', color: '#8B5CF6' },
    { icon: <Cpu size={22} />, label: 'Priority Formula', value: 'Weighted: severity × density × infra', color: '#EC4899' },
    { icon: <Shield size={22} />, label: 'Alert Tiering', value: 'High / Medium / Low severity', color: '#EF4444' },
    { icon: <Radio size={22} />, label: 'Dashboard', value: 'React + Leaflet + Vercel', color: '#06B6D4' },
    { icon: <Globe size={22} />, label: 'Coverage', value: 'Global — any lat/lon coordinate', color: '#F59E0B' },
  ];

  return (
    <div style={{
      flex: 1,
      backgroundColor: '#0F172A',
      color: 'white',
      overflowY: 'auto',
      padding: isMobile ? '24px 16px' : '48px'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
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
            <Database size={16} color="#F97316" />
            <span style={{ color: '#F97316', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em' }}>TECHNICAL SPECIFICATIONS</span>
          </div>
          <h1 style={{ fontSize: isMobile ? '2rem' : '3rem', fontWeight: 900, margin: '0 0 16px 0' }}>
            System Details
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            The complete technical breakdown of the Terra Pulse data pipeline and dashboard architecture.
          </p>
        </div>

        {/* Spec Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '16px',
          marginBottom: '48px'
        }}>
          {specs.map((spec, i) => (
            <div key={i} style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                backgroundColor: `${spec.color}15`,
                border: `1px solid ${spec.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: spec.color,
                flexShrink: 0
              }}>
                {spec.icon}
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '4px' }}>{spec.label}</div>
                <div style={{ fontSize: '1rem', fontWeight: 600 }}>{spec.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* JSON Schema */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px' }}>
          Data Contract <span style={{ color: '#F97316' }}>(ML → Dashboard)</span>
        </h2>
        <p style={{ color: '#94A3B8', marginBottom: '24px', lineHeight: 1.6 }}>
          The following JSON schema is the agreed contract between the data-ml pipeline and the dashboard frontend. Each cell represents a geographic grid tile with computed severity and priority metrics.
        </p>
        <div style={{
          backgroundColor: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '24px',
          fontFamily: 'monospace',
          fontSize: isMobile ? '0.8rem' : '0.9rem',
          lineHeight: 1.7,
          color: '#E2E8F0',
          overflowX: 'auto',
          marginBottom: '48px'
        }}>
          <pre style={{ margin: 0 }}>{`{
  "cells": [
    {
      "cell_id":              "r0_c0",        // Grid row_col ID
      "lat":                  26.912,          // Latitude
      "lon":                  75.787,          // Longitude
      "severity":             "high",          // "high" | "medium" | "low"
      "delta_ndwi":           0.42,            // NDWI change (0-1)
      "population_density":   0.8,             // Normalized (0-1)
      "critical_infra_flag":  1,               // 1 = critical infra present
      "priority_score":       0.71             // Weighted priority (0-1)
    }
  ]
}`}</pre>
        </div>

        {/* Priority Formula */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px' }}>
          Prioritization Formula
        </h2>
        <div style={{
          backgroundColor: 'rgba(139, 92, 246, 0.08)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '12px',
          padding: '24px',
          fontFamily: 'monospace',
          fontSize: '1rem',
          textAlign: 'center',
          color: '#C4B5FD',
          marginBottom: '48px'
        }}>
          priority_score = w₁ × severity + w₂ × population_density + w₃ × critical_infra_flag
        </div>
      </div>
    </div>
  );
}
