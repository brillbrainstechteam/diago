"""
Macro detail crops for the Our Craft process steps.

There is no workshop or bench photography in this project, and inventing some
would misrepresent the house. What does exist is studio originals in which the
craft is legible in the work itself — the table of a cut stone, the gallery
under a band, the seat of each pave grain. These crops zoom into one such
detail per process stage.

Source is docs/DISHA_IMAGES_WEB (the cleaned 1600px drop), NOT diago_images —
those raw files are vendor spec sheets carrying a navy border, a "D" watermark
and weight text, none of which belongs on the site. Output never upscales:
the crop is emitted at its own pixel size, capped.
"""

from PIL import Image
import numpy as np
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Import the helpers without triggering that module's own processing run.
_src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "process_catalogue.py"),
            encoding="utf-8").read().split("os.makedirs(DST")[0]
_ns: dict = {}
exec(compile(_src, "process_catalogue", "exec"), _ns)
background_alpha = _ns["background_alpha"]

# The raw sheets are pure white behind the piece. Measured across them, the
# watermark tops out around distance 45 and the piece starts near 70, so a
# threshold in that gap drops the watermark and keeps the metal and stones.
_ns["BG_TOLERANCE"] = 58

SRC = r"F:\diago\diago_images"
DST = r"F:\diago\public\images\craft"
MAX_OUT = 900

# The navy frame is 45px thick; trim generously so no edge pixel of it can
# seed the fill as "piece".
BORDER = 70

# Vendor weight/reference text is printed under the panel, bottom-left.
PANEL_BOTTOM = 2560

# stem -> (focus x, focus y as a fraction of the piece's bounding box,
#          zoom: fraction of the bbox's longer side that the crop spans)
DETAILS = {
    "craft-design": ("PENDANT SET/DS118 DS118E", (0.30, 0.50), 0.50),
    "craft-stone": ("RING/CLR173", (0.50, 0.45), 0.34),
    "craft-gold": ("RING/W527", (0.44, 0.42), 0.34),
    # Centred on the left drop: the pair's midpoint lands in the gap between
    # the two earrings.
    "craft-finish": ("EARRING/LONG EARRING/LD34", (0.27, 0.72), 0.40),
}


def detail(stem: str, focus, zoom: float, out_path: str) -> tuple[int, int]:
    im = Image.open(os.path.join(SRC, stem + ".jpg")).convert("RGB")
    # Drop the navy frame and the printed spec text below the panel first, so
    # neither can anchor the background sample or survive into the crop.
    im = im.crop((BORDER, BORDER, im.width - BORDER, PANEL_BOTTOM))
    rgb = np.array(im)

    alpha = background_alpha(rgb)
    ys, xs = np.nonzero(alpha)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()

    span = round(max(x1 - x0, y1 - y0) * zoom)
    cx = x0 + (x1 - x0) * focus[0]
    cy = y0 + (y1 - y0) * focus[1]

    left = int(min(max(cx - span / 2, 0), im.width - span))
    top = int(min(max(cy - span / 2, 0), im.height - span))

    cleared = rgb.copy()
    cleared[alpha == 0] = 0
    rgba = Image.fromarray(np.dstack([cleared, alpha]), mode="RGBA")

    crop = rgba.crop((left, top, left + span, top + span))
    out = min(MAX_OUT, span)          # never enlarge past the source pixels
    crop = crop.resize((out, out), Image.LANCZOS)
    crop.save(out_path, "WEBP", quality=90, method=6)
    return span, out


os.makedirs(DST, exist_ok=True)
for name, (stem, focus, zoom) in DETAILS.items():
    path = os.path.join(DST, name + ".webp")
    span, out = detail(stem, focus, zoom, path)
    print(f"{name:16s} {stem:28s} span={span:5d}px -> {out}px  {os.path.getsize(path) // 1024}KB")
