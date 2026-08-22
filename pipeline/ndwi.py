"""
NDWI Computation Module — PS-08 Disaster Intelligence
=====================================================
Computes the Normalized Difference Water Index (NDWI) for before/after
satellite imagery to detect flood inundation changes.

Formula:  NDWI = (Green - NIR) / (Green + NIR)
Bands:    Band 1 = Green, Band 3 = NIR (Sentinel-2 resampled)

Usage:
    python ndwi.py --before data/before.tif --after data/after.tif --output data/

Outputs:
    - ndwi_before.tif   (NDWI raster for pre-disaster)
    - ndwi_after.tif     (NDWI raster for post-disaster)
    - delta_ndwi.tif     (Change map: after - before)
"""

import numpy as np
import argparse
import os

try:
    import rasterio
    HAS_RASTERIO = True
except ImportError:
    HAS_RASTERIO = False
    print("WARNING: rasterio not installed. Install with: pip install rasterio")


def compute_ndwi(green: np.ndarray, nir: np.ndarray) -> np.ndarray:
    """
    Compute NDWI per pixel.
    
    NDWI = (Green - NIR) / (Green + NIR)
    
    Args:
        green: 2D array of Green band values (Band 1)
        nir:   2D array of NIR band values (Band 3)
    
    Returns:
        2D array of NDWI values in range [-1, 1]
    """
    # Cast to float to avoid integer division issues
    green = green.astype(np.float64)
    nir = nir.astype(np.float64)

    # Avoid division by zero — mask pixels where both bands are 0
    denominator = green + nir
    ndwi = np.where(
        denominator == 0,
        0.0,
        (green - nir) / denominator
    )

    # Clamp to valid range [-1, 1]
    ndwi = np.clip(ndwi, -1.0, 1.0)

    return ndwi


def load_bands(tif_path: str, green_band: int = 1, nir_band: int = 3):
    """
    Load Green and NIR bands from a GeoTIFF file.
    
    Args:
        tif_path:   Path to the .tif file
        green_band: Band index for Green (1-indexed, default=1)
        nir_band:   Band index for NIR (1-indexed, default=3)
    
    Returns:
        (green_array, nir_array, profile) — the two band arrays and the rasterio profile
    """
    if not HAS_RASTERIO:
        raise ImportError("rasterio is required. Install with: pip install rasterio")

    with rasterio.open(tif_path) as src:
        green = src.read(green_band)
        nir = src.read(nir_band)
        profile = src.profile.copy()

    return green, nir, profile


def save_ndwi(ndwi_array: np.ndarray, profile: dict, output_path: str):
    """
    Save an NDWI raster to a GeoTIFF file.
    
    Args:
        ndwi_array:  2D NDWI array
        profile:     Rasterio profile from the source file
        output_path: Destination .tif path
    """
    # Update profile for single-band float output
    profile.update(
        dtype=rasterio.float64,
        count=1,
        nodata=-9999
    )

    with rasterio.open(output_path, 'w', **profile) as dst:
        dst.write(ndwi_array, 1)

    print(f"  ✓ Saved: {output_path}")


def process(before_path: str, after_path: str, output_dir: str):
    """
    Full NDWI pipeline: load imagery, compute NDWI, compute delta, save outputs.
    
    Args:
        before_path: Path to before.tif (pre-disaster)
        after_path:  Path to after.tif (post-disaster)
        output_dir:  Directory to write output .tif files
    """
    os.makedirs(output_dir, exist_ok=True)

    print(f"\n{'='*60}")
    print(f"  NDWI COMPUTATION — PS-08 Disaster Intelligence")
    print(f"{'='*60}")

    # --- Step 1: Load before image ---
    print(f"\n[1/5] Loading before image: {before_path}")
    green_before, nir_before, profile = load_bands(before_path)
    print(f"      Shape: {green_before.shape}, Bands: Green(1), NIR(3)")

    # --- Step 2: Load after image ---
    print(f"[2/5] Loading after image: {after_path}")
    green_after, nir_after, _ = load_bands(after_path)
    print(f"      Shape: {green_after.shape}, Bands: Green(1), NIR(3)")

    # Validate dimensions match
    assert green_before.shape == green_after.shape, \
        f"Shape mismatch: before={green_before.shape}, after={green_after.shape}"

    # --- Step 3: Compute NDWI for before ---
    print(f"[3/5] Computing NDWI (before)...")
    ndwi_before = compute_ndwi(green_before, nir_before)
    print(f"      Range: [{ndwi_before.min():.4f}, {ndwi_before.max():.4f}]")
    save_ndwi(ndwi_before, profile, os.path.join(output_dir, "ndwi_before.tif"))

    # --- Step 4: Compute NDWI for after ---
    print(f"[4/5] Computing NDWI (after)...")
    ndwi_after = compute_ndwi(green_after, nir_after)
    print(f"      Range: [{ndwi_after.min():.4f}, {ndwi_after.max():.4f}]")
    save_ndwi(ndwi_after, profile, os.path.join(output_dir, "ndwi_after.tif"))

    # --- Step 5: Compute delta NDWI (change detection) ---
    print(f"[5/5] Computing delta NDWI (after - before)...")
    delta_ndwi = ndwi_after - ndwi_before
    print(f"      Range: [{delta_ndwi.min():.4f}, {delta_ndwi.max():.4f}]")
    print(f"      Mean delta: {delta_ndwi.mean():.4f}")
    save_ndwi(delta_ndwi, profile, os.path.join(output_dir, "delta_ndwi.tif"))

    # --- Summary stats ---
    # Positive delta = more water detected (flooding)
    flood_pixels = np.sum(delta_ndwi > 0.1)
    total_pixels = delta_ndwi.size
    flood_pct = (flood_pixels / total_pixels) * 100

    print(f"\n{'='*60}")
    print(f"  SUMMARY")
    print(f"{'='*60}")
    print(f"  Total pixels:      {total_pixels:,}")
    print(f"  Flood pixels:      {flood_pixels:,} (delta > 0.1)")
    print(f"  Flood coverage:    {flood_pct:.2f}%")
    
    # --- Step 6: Aggregate into 5x5 grid ---
    print(f"\n[6/6] Aggregating into 5x5 grid for severity processing...")
    import json
    h, w = delta_ndwi.shape
    grid_h = h // 5
    grid_w = w // 5
    
    grid = []
    
    # Extract bounds from profile
    transform = profile['transform']
    lon_min = transform.c
    lat_max = transform.f
    lon_max = lon_min + w * transform.a
    lat_min = lat_max + h * transform.e
    
    for r in range(5):
        for c in range(5):
            # Extract cell patch
            r_start, r_end = r * grid_h, (r+1) * grid_h if r < 4 else h
            c_start, c_end = c * grid_w, (c+1) * grid_w if c < 4 else w
            
            patch = delta_ndwi[r_start:r_end, c_start:c_end]
            avg_delta = float(np.mean(patch))
            
            # Calculate approx center lat/lon for cell in native CRS
            cell_x = lon_min + (c + 0.5) * grid_w * transform.a
            cell_y = lat_max + (r + 0.5) * grid_h * transform.e
            
            import rasterio.warp
            # Convert native CRS back to lat/lon (EPSG:4326)
            lon_array, lat_array = rasterio.warp.transform(
                profile['crs'], 'EPSG:4326', [cell_x], [cell_y]
            )
            cell_lon = lon_array[0]
            cell_lat = lat_array[0]
            
            grid.append({
                "cell_id": f"r{r}_c{c}",
                "lat": round(cell_lat, 4),
                "lon": round(cell_lon, 4),
                "delta_ndwi": round(avg_delta, 4)
            })
            
    with open(os.path.join(output_dir, "ndwi_grid.json"), "w") as f:
        json.dump(grid, f, indent=2)
        
    print(f"  ✓ Saved 5x5 aggregated grid to: {os.path.join(output_dir, 'ndwi_grid.json')}")
    print(f"  Output directory:  {output_dir}")
    print(f"{'='*60}\n")

    return ndwi_before, ndwi_after, delta_ndwi


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Compute NDWI from before/after satellite imagery"
    )
    parser.add_argument(
        "--before", required=True,
        help="Path to before.tif (pre-disaster image)"
    )
    parser.add_argument(
        "--after", required=True,
        help="Path to after.tif (post-disaster image)"
    )
    parser.add_argument(
        "--output", default="output/",
        help="Output directory for NDWI rasters (default: output/)"
    )
    parser.add_argument(
        "--green-band", type=int, default=1,
        help="Band index for Green channel (default: 1)"
    )
    parser.add_argument(
        "--nir-band", type=int, default=3,
        help="Band index for NIR channel (default: 3)"
    )

    args = parser.parse_args()
    process(args.before, args.after, args.output)
