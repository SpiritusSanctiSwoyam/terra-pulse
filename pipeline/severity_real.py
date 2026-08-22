import json
import os

def assign_severity():
    print("Assigning severity based on real delta_ndwi...")
    
    try:
        with open('output/ndwi_grid.json', 'r') as f:
            grid = json.load(f)
    except FileNotFoundError:
        print("Error: ndwi_grid.json not found. Run ndwi.py first.")
        return

    processed = []
    for cell in grid:
        delta = cell["delta_ndwi"]
        
        # Severity bucketing for real NDWI
        if delta < 0.05:
            severity = "low"
        elif delta < 0.2:
            severity = "medium"
        else:
            severity = "high"
            
        cell["severity"] = severity
        processed.append(cell)
            
    os.makedirs('output', exist_ok=True)
    with open('output/severity_base.json', 'w') as f:
        json.dump(processed, f, indent=2)
        
    print(f"  ✓ Processed {len(processed)} cells. Saved to output/severity_base.json")
    
if __name__ == "__main__":
    assign_severity()
