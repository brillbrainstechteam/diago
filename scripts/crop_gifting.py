"""
Cut usable gifting imagery out of the retail key visual.

`thegoldenmagnet creative.jpg` is a 1024px brand layout: real photography of
the DIAGO box, display bust and carry bag, with a "The Golden Magnet for
High-Velocity Retail" headline and a logo lockup burned into the left half.
The photography is exactly what the gifting page needs; the retail copy is
not. These crops take the product group and leave every piece of baked-in
text outside the frame.
"""

from PIL import Image
import os

SRC = r"F:\diago\files\extracted images\thegoldenmagnet creative.jpg"
DST = r"F:\diago\public\images"

# (left, top, right, bottom) in the 1024x1024 source, then the output width.
# The headline block ends around x=440 and the logo lockup below y=230, so
# every box here starts to the right of / below that.
CROPS = {
    "gift-box": ((326, 578, 546, 812), 900),
    "gift-bag": ((664, 352, 1020, 786), 1000),
    # Starts right of the headline's longest line (~x=437) and stops short of
    # the decorative gold star in the source's bottom-right corner. The box
    # sits under the headline, so it can only enter this frame partially —
    # it gets its own full crop above.
    "gift-presentation": ((452, 300, 1020, 792), 1400),
}

src = Image.open(SRC).convert("RGB")
print(f"source {src.size}")

for name, (box, width) in CROPS.items():
    crop = src.crop(box)
    scale = width / crop.width
    crop = crop.resize((width, round(crop.height * scale)), Image.LANCZOS)
    out = os.path.join(DST, f"{name}.webp")
    crop.save(out, "WEBP", quality=88, method=6)
    print(f"{name:20s} {crop.size}  {os.path.getsize(out) // 1024}KB")
