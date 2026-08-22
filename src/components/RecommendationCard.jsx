import React from 'react';
import { ShieldAlert } from 'lucide-react';

// Rule-based recommendation engine — derives guidance text from 
// severity/priority thresholds (not an ML model)
export default function RecommendationCard({ zone }) {
  const getRecommendationText = () => {
    // Handle both boolean and flag formats for critical infra
    const isCriticalInfra = zone.critical_infra === true || zone.critical_infra === 1 || zone.critical_infra_flag === 1;

    if (zone.severity === 'high' && isCriticalInfra) {
      return "Critical infrastructure inundated. Immediate structural assessment and sandbagging required. Dispatch Tier 1 response.";
    }
    
    if (zone.affected_estimate > 2000 && zone.population_density > 0.8) {
      return `Dense population center affected. Establish temporary shelters for ~${zone.affected_estimate.toLocaleString()} displaced individuals. Prioritize search & rescue.`;
    }

    if (zone.severity === 'high') {
      return "High severity flooding detected. Mobilize local emergency services and issue evacuation warnings for low-lying areas.";
    }

    if (zone.severity === 'medium' && isCriticalInfra) {
      return "Moderate flooding near critical infrastructure. Deploy monitoring teams and stage preventive barriers.";
    }

    if (zone.severity === 'medium') {
      return "Moderate impact expected. Issue localized advisories and prepare secondary relief resources.";
    }

    // Default for low severity or unmatched
    return "Monitoring status. No immediate deployment necessary. Continue satellite tracking.";
  };

  return (
    <div style={{
      backgroundColor: '#F8FAFC',
      borderLeft: '4px solid #3B82F6',
      border: '1px solid #E2E8F0',
      borderLeftWidth: '4px',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '24px',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start',
      animation: 'fadeIn 0.3s ease-in-out'
    }}>
      <ShieldAlert size={20} color="#3B82F6" style={{ flexShrink: 0, marginTop: '2px' }} />
      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#3B82F6', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.05em' }}>
          Recommended Action
        </div>
        <div style={{ fontSize: '0.95rem', color: '#1E293B', lineHeight: '1.5', fontWeight: 500 }}>
          {getRecommendationText()}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
