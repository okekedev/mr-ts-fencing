import os
import glob
import cv2
import torch
import numpy as np
from basicsr.archs.rrdbnet_arch import RRDBNet
from realesrgan import RealESRGANer

# Download model weights automatically
model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64,
                num_block=23, num_grow_ch=32, scale=4)

upsampler = RealESRGANer(
    scale=4,
    model_path='https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth',
    model=model,
    tile=256,
    tile_pad=10,
    pre_pad=0,
    half=False  # MPS doesn't support half precision
)

input_dir = 'images'
output_dir = 'images/upscaled'
os.makedirs(output_dir, exist_ok=True)

exts = ['*.jpeg', '*.jpg', '*.png', '*.PNG']
files = []
for ext in exts:
    files.extend(glob.glob(os.path.join(input_dir, ext)))

# Skip already-upscaled
files = [f for f in files if 'upscaled' not in f]

print(f"Found {len(files)} images to upscale\n")

for path in files:
    filename = os.path.basename(path)
    name, ext = os.path.splitext(filename)
    out_path = os.path.join(output_dir, f"{name}_4x.jpg")

    print(f"Processing {filename}...")
    img = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print(f"  Skipping — could not read {filename}")
        continue

    output, _ = upsampler.enhance(img, outscale=4)
    cv2.imwrite(out_path, output, [cv2.IMWRITE_JPEG_QUALITY, 90])
    print(f"  Saved → {out_path}")

print("\nDone!")
