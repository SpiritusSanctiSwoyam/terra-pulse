import rasterio
with rasterio.open('data-ml/data/1010394_image.tif') as src:
    print(src.count)          # should be 8
    print(src.descriptions)   # band names if the file has them
    for i in range(1, src.count + 1):
        band = src.read(i)
        print(f"Band {i}: min={band.min()}, max={band.max()}, mean={band.mean():.2f}")