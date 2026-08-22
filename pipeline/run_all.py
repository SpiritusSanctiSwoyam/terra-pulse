import os
import subprocess
import sys

def run_step(cmd, description):
    print(f"\n{'='*60}")
    print(f"🚀 {description}")
    print(f"{'='*60}")
    result = subprocess.run(cmd, shell=True)
    if result.returncode != 0:
        print(f"❌ Failed during: {description}")
        sys.exit(1)

def main():
    print("🌟 STARTING TERRA PULSE END-TO-END DATA PIPELINE 🌟")
    
    # Step 1: Fetch satellite data
    run_step("python3 pipeline/fetch_data.py", "STEP 1: Fetching Sentinel-2 Satellite Data (Pre/Post Flood)")
    
    # Step 2: Compute NDWI and Change Detection
    # Notice we output to 'output' dir which is where severity/prioritize expect it
    run_step("python3 pipeline/ndwi.py --before data/before.tif --after data/after.tif --output output/", "STEP 2: Computing NDWI & Change Detection")
    
    # Step 3: Run Severity Bucketing
    # Since ndwi.py now outputs ndwi_grid.json directly, we actually don't need severity.py's mock anymore.
    # But wait, our new ndwi.py didn't assign severity ("low"/"medium"/"high"), just delta_ndwi!
    # Let's write a new severity.py that reads ndwi_grid.json instead of mocking!
    run_step("python3 pipeline/severity_real.py", "STEP 3: Assigning Severity Buckets")
    
    # Step 4: Run Prioritization Engine
    run_step("python3 pipeline/prioritize.py", "STEP 4: Calculating Prioritization Scores")
    
    print("\n✅ PIPELINE COMPLETE! Run 'python3 pipeline/server.py' to serve the data.")

if __name__ == "__main__":
    main()
