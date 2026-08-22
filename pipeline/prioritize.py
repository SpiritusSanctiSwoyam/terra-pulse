import json
import os

def calculate_priority():
    print("Running Prioritization Engine...")
    
    # Load severity data
    try:
        with open('output/severity_base.json', 'r') as f:
            severity_data = json.load(f)
    except FileNotFoundError:
        print("Error: output/severity_base.json not found. Run severity.py first.")
        return

    # Load static demo data
    try:
        with open('static/demo_grid.json', 'r') as f:
            static_data = json.load(f)
    except FileNotFoundError:
        print("Error: static/demo_grid.json not found.")
        return

    # Convert static data to dictionary for fast lookup by cell_id
    static_dict = {item['cell_id']: item for item in static_data}

    # Severity weights mapping
    severity_weights = {
        "low": 0.2,
        "medium": 0.6,
        "high": 1.0
    }

    final_grid = []
    
    for cell in severity_data:
        cell_id = cell['cell_id']
        static_info = static_dict.get(cell_id, {"population_density": 0.5, "critical_infra_flag": 0})
        
        # Apply formula: priority_score = 0.4*severity + 0.35*pop_density + 0.15*infra + 0.1*accessibility
        # Note: PRD mentions accessibility_penalty but static data doesn't have it, assuming 0.5 default
        sev_score = severity_weights.get(cell['severity'], 0.0)
        pop_density = static_info['population_density']
        infra_flag = static_info['critical_infra_flag']
        accessibility_penalty = 0.5
        
        priority_score = (0.4 * sev_score) + (0.35 * pop_density) + (0.15 * infra_flag) + (0.1 * accessibility_penalty)
        
        final_cell = {
            "cell_id": cell_id,
            "lat": cell['lat'],
            "lon": cell['lon'],
            "severity": cell['severity'],
            "delta_ndwi": cell['delta_ndwi'],
            "population_density": pop_density,
            "critical_infra_flag": infra_flag,
            "priority_score": round(priority_score, 3)
        }
        final_grid.append(final_cell)

    # Wrap in expected schema {"cells": [...]}
    output = {"cells": final_grid}
    
    with open('output/severity_grid.json', 'w') as f:
        json.dump(output, f, indent=2)
        
    print(f"  ✓ Processed prioritization for {len(final_grid)} cells.")
    print("  ✓ Saved final output to output/severity_grid.json")

if __name__ == "__main__":
    calculate_priority()
