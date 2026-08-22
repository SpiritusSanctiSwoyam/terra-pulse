import os
import pystac_client
import planetary_computer
import rasterio
from rasterio.windows import from_bounds
from rasterio.warp import transform_bounds
import numpy as np

def fetch_sentinel_data():
    print("🌍 Initializing connection to Planetary Computer STAC API...")
    catalog = pystac_client.Client.open(
        "https://planetarycomputer.microsoft.com/api/stac/v1",
        modifier=planetary_computer.sign_inplace,
    )
    
    # Bounding box in Assam, India (flood prone area)
    # [min_lon, min_lat, max_lon, max_lat]
    bbox = [91.70, 26.15, 91.80, 26.25]
    
    print(f"🔍 Searching for Sentinel-2 L2A imagery for bounding box: {bbox}")
    
    # Pre-flood date range (e.g., early 2023 dry season)
    search_before = catalog.search(
        collections=["sentinel-2-l2a"],
        bbox=bbox,
        datetime="2023-01-01/2023-04-30",
        query={"eo:cloud_cover": {"lt": 20}}
    )
    
    # Post-flood date range (e.g., mid 2023 monsoon season)
    search_after = catalog.search(
        collections=["sentinel-2-l2a"],
        bbox=bbox,
        datetime="2023-06-01/2023-09-30",
        query={"eo:cloud_cover": {"lt": 40}}
    )
    
    items_before = list(search_before.items())
    items_after = list(search_after.items())
    
    if not items_before or not items_after:
        print("❌ Could not find matching cloud-free satellite imagery for these dates.")
        return
        
    # Take the best (least cloudy) image from before and after
    item_before = items_before[0]
    item_after = items_after[0]
    
    print(f"✅ Found Pre-Disaster Image: {item_before.id} (Date: {item_before.datetime})")
    print(f"✅ Found Post-Disaster Image: {item_after.id} (Date: {item_after.datetime})")
    
    # Green is B03, NIR is B08 in Sentinel-2
    def download_subset(item, output_filename):
        green_href = item.assets["B03"].href
        nir_href = item.assets["B08"].href
        
        print(f"⬇️ Downloading subset for {output_filename}...")
        
        with rasterio.open(green_href) as src_green:
            # Transform our lon/lat bbox to the image's CRS
            left, bottom, right, top = transform_bounds(
                "EPSG:4326", src_green.crs, *bbox
            )
            window = from_bounds(left, bottom, right, top, src_green.transform)
            
            green_data = src_green.read(1, window=window)
            out_transform = src_green.window_transform(window)
            out_meta = src_green.meta.copy()
            
        with rasterio.open(nir_href) as src_nir:
            nir_data = src_nir.read(1, window=window)
            
        # We need to save as a multi-band TIFF where Band 1 = Green, Band 3 = NIR
        # (to match the ndwi.py script requirements)
        out_meta.update({
            "count": 3,
            "width": window.width,
            "height": window.height,
            "transform": out_transform,
            "dtype": 'uint16'
        })
        
        os.makedirs("data", exist_ok=True)
        out_path = os.path.join("data", output_filename)
        with rasterio.open(out_path, "w", **out_meta) as dest:
            dest.write(green_data, 1)
            # Write zeros for band 2 just to pad it
            dest.write(np.zeros_like(green_data), 2)
            dest.write(nir_data, 3)
            
        print(f"  ✓ Saved to {out_path}")
        return out_path

    before_path = download_subset(item_before, "before.tif")
    after_path = download_subset(item_after, "after.tif")
    
    print("🎉 Data fetching complete! You can now run pipeline/ndwi.py")

if __name__ == "__main__":
    fetch_sentinel_data()
