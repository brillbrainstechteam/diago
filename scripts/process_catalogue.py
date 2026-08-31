"""
Prepare the DISHA_IMAGES_WEB drop for the site.

The source shots are 1600x1600 with the product floating small in a large
cream field. Two problems for the web: the product reads tiny inside a card,
and the baked-in cream never quite matches whatever surface the card uses.

So: lift the background to true alpha (flood-filled from the border, so
white diamond interiors stay opaque), tight-crop to the product, then re-pad
to a square with a consistent margin. Output is RGBA webp that sits correctly
on cream *or* burgundy.
"""

from PIL import Image, ImageDraw, ImageFilter
import numpy as np
import json
import os

SRC = r"F:\diago\docs\DISHA_IMAGES_WEB"
DST = r"F:\diago\public\images\catalogue"

# Source stem -> web slug. Codes are the vendor's; the slug carries the
# category so the filename is readable in markup.
NAMES = {
    "EARRING/LONG EARRING/LD13": "earring-long-ld13",
    "EARRING/LONG EARRING/LD34": "earring-long-ld34",
    "EARRING/TOPS/BT96": "earring-top-bt96",
    "NECKLACE/ND94  ND94E": "necklace-nd94",
    "PENDANT SET/DS118 DS118E": "pendant-set-ds118",
    "PENDANT SET/DS138  DS138E": "pendant-set-ds138",
    "RING/CLR113": "ring-clr113",
    "RING/CLR173": "ring-clr173",
    "RING/W527": "ring-w527",
    "TAN/TD531": "tanmaniya-td531",
    "TAN/TD535": "tanmaniya-td535",
    "TAN/TD541": "tanmaniya-td541",
    "TRIO SET/PES160": "trio-set-pes160",
    "TRIO SET/PES81": "trio-set-pes81",
    "TRIO SET/PES89": "trio-set-pes89",
}

OUT_SIZE = 1200
MARGIN = 0.07          # share of the square left as breathing room
BG_TOLERANCE = 20      # how close to the sampled bg counts as background


def scanline_fill(candidate: np.ndarray, h: int, w: int) -> np.ndarray:
    """Which candidate pixels are reachable from the border.

    Span-based rather than per-pixel: each stack entry is a whole horizontal
    run, so the Python-level loop count tracks the number of spans (a few
    thousand for a plain backdrop) instead of the 2.5M pixels. Pillow 12's
    ImageDraw.floodfill returns without filling on an "L" mask, so this
    replaces it outright.
    """
    filled = np.zeros((h, w), dtype=bool)
    stack = []

    for x in range(w):
        if candidate[0, x]:
            stack.append((0, x))
        if candidate[h - 1, x]:
            stack.append((h - 1, x))
    for y in range(h):
        if candidate[y, 0]:
            stack.append((y, 0))
        if candidate[y, w - 1]:
            stack.append((y, w - 1))

    row_any = candidate.any(axis=1)

    while stack:
        y, x = stack.pop()
        if filled[y, x] or not candidate[y, x]:
            continue

        row = candidate[y]
        left = x
        while left > 0 and row[left - 1] and not filled[y, left - 1]:
            left -= 1
        right = x
        while right < w - 1 and row[right + 1] and not filled[y, right + 1]:
            right += 1

        filled[y, left:right + 1] = True

        # Seed the neighbouring rows once per contiguous unfilled run, so a
        # 1600-wide span costs a handful of entries rather than 1600.
        for ny in (y - 1, y + 1):
            if ny < 0 or ny >= h or not row_any[ny]:
                continue
            seg = candidate[ny, left:right + 1] & ~filled[ny, left:right + 1]
            if not seg.any():
                continue
            idx = np.flatnonzero(seg)
            breaks = np.flatnonzero(np.diff(idx) > 1)
            starts = np.concatenate(([idx[0]], idx[breaks + 1]))
            for s in starts:
                stack.append((ny, left + int(s)))

    return filled


def background_alpha(rgb: np.ndarray) -> np.ndarray:
    """Alpha channel with the border-connected background removed.

    A plain colour threshold would also punch holes in the bright interiors
    of the diamonds, which sit very close to the cream. Flood-filling inward
    from the border instead means only background actually reachable from
    outside the piece is cleared.
    """
    h, w, _ = rgb.shape

    # Sample the four corners rather than one, so a vignette can't skew it.
    patches = [rgb[0:40, 0:40], rgb[0:40, w - 40:w], rgb[h - 40:h, 0:40], rgb[h - 40:h, w - 40:w]]
    bg = np.median(np.concatenate([p.reshape(-1, 3) for p in patches]), axis=0)

    dist = np.abs(rgb.astype(np.int16) - bg.astype(np.int16)).max(axis=2)
    candidate = dist < BG_TOLERANCE

    outside = scanline_fill(candidate, h, w)
    alpha = np.where(outside, 0, 255).astype(np.uint8)

    # Feather by a pixel or so; a hard cut leaves a jagged rim on the metal.
    return np.array(Image.fromarray(alpha, mode="L").filter(ImageFilter.GaussianBlur(1.1)))


def process(src_path: str, out_path: str) -> dict:
    im = Image.open(src_path).convert("RGB")
    rgb = np.array(im)

    alpha = background_alpha(rgb)

    # Neutralise RGB where the pixel is fully transparent. Resampling blends
    # colour across the alpha edge, so leaving cream behind a 0-alpha pixel
    # paints a pale halo around the metal once the piece is scaled down.
    cleared = rgb.copy()
    cleared[alpha == 0] = 0
    rgba = Image.fromarray(np.dstack([cleared, alpha]), mode="RGBA")

    # Bound on the alpha channel alone: getbbox() over RGBA calls a pixel
    # non-empty unless every channel is 0, which the background is not.
    bbox = rgba.getchannel("A").getbbox()
    if bbox is None:
        raise RuntimeError(f"no product found in {src_path}")
    piece = rgba.crop(bbox)

    # Fit the crop into a square, preserving aspect, with an even margin.
    inner = int(OUT_SIZE * (1 - 2 * MARGIN))
    scale = min(inner / piece.width, inner / piece.height)
    piece = piece.resize((max(1, round(piece.width * scale)), max(1, round(piece.height * scale))), Image.LANCZOS)

    canvas = Image.new("RGBA", (OUT_SIZE, OUT_SIZE), (0, 0, 0, 0))
    canvas.paste(piece, ((OUT_SIZE - piece.width) // 2, (OUT_SIZE - piece.height) // 2), piece)
    canvas.save(out_path, "WEBP", quality=90, method=6)

    return {
        "source_bbox": bbox,
        "crop": [piece.width, piece.height],
        "bytes": os.path.getsize(out_path),
    }


os.makedirs(DST, exist_ok=True)
report = {}
for stem, slug in NAMES.items():
    src = os.path.join(SRC, stem + ".webp")
    out = os.path.join(DST, slug + ".webp")
    info = process(src, out)
    report[slug] = info
    print(f"{slug:24s} bbox={info['source_bbox']}  crop={info['crop']}  {info['bytes'] // 1024}KB")

print(json.dumps({"count": len(report)}, indent=2))
