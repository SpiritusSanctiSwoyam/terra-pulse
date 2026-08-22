import json
import os

def assign_severity():
    print("Assigning severity based on delta_ndwi...")
    # Mocking the grid from ndwi.py aggregation for demonstration
    grid = []
    for r in range(5):
        for c in range(5):
            # Simulated delta_ndwi values (0.0 to 0.8)
            delta = 0.1 * r + 0.05 * c
            
            # Severity bucketing
            if delta < 0.2:
                severity = "low"
            elif delta < 0.5:
                severity = "medium"
            else:
                severity = "high"
                
            grid.append({
                "cell_id": f"r{r}_c{c}",
                "lat": 26.9 + (r * 0.01),
                "lon": 75.7 + (c * 0.01),
                "delta_ndwi": round(delta, 2),
                "severity": severity
            })
            
    os.makedirs('output', exist_ok=True)
    with open('output/severity_base.json', 'w') as f:
        json.dump(grid, f, indent=2)
    print(f"  ✓ Processed {len(grid)} cells. Saved to output/severity_base.json")
    
if __name__ == "__main__":
    assign_severity()
