import rasterio
import numpy as np

# Define paths to image and label from the dataset
# UPDATE these two lines to match your actual downloaded filenames
image_path = 'data-ml/data/1010394_image.tif'
label_path = 'data-ml/data/1010394_label.tif'

# Output destination paths
after_path = 'data-ml/data/after.tif'
before_path = 'data-ml/data/before.tif'

with rasterio.open(image_path) as src_img, rasterio.open(label_path) as src_label:
    # 1. Read Sentinel-2 optical bands (3: Green, 4: Red, 5: NIR, 6: SWIR)
    green = src_img.read(3)
    red   = src_img.read(4)
    nir   = src_img.read(5)
    swir  = src_img.read(6)

    optical_stack = np.stack([green, red, nir, swir], axis=0)  # Shape: (4, H, W)

    # Read flood label mask (1 = flooded, 0 = non-flooded, -1 = no data)
    label_mask = src_label.read(1)

    # 2. Save after.tif (Post-flood imagery)
    meta = src_img.meta.copy()
    meta.update(count=4, dtype=optical_stack.dtype)

    with rasterio.open(after_path, 'w', **meta) as dst_after:
        dst_after.write(optical_stack)

    # 3. Create synthetic before.tif
    synthetic_before = optical_stack.copy()

    flooded_pixels = (label_mask == 1)
    non_flooded_pixels = (label_mask == 0)

    for band_idx in range(4):
        if np.any(non_flooded_pixels):
            dry_land_median = np.median(optical_stack[band_idx][non_flooded_pixels])
        else:
            dry_land_median = np.median(optical_stack[band_idx])

        synthetic_before[band_idx][flooded_pixels] = dry_land_median

    with rasterio.open(before_path, 'w', **meta) as dst_before:
        dst_before.write(synthetic_before)

print("Created data-ml/data/before.tif and data-ml/data/after.tif successfully.")