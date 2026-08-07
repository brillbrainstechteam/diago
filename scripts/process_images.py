"""
DIAGO image pipeline.

Goal: every product image becomes a consistently framed, centred tile so the
collection grids read as one set instead of seven unrelated photos. Source
shots have wildly different aspect ratios and uneven white margins, so we
auto-detect the jewellery's bounding box and re-pad it ourselves.
"""

from PIL import Image, ImageChops
import os

BROCHURE = r"F:\diago\files\extracted images from brochure"
PRODUCTS = r"F:\diago\product_images\Product images\gold"
LOGO_DIR = r"F:\diago\files"
OUT = r"F:\diago\public\images"
os.makedirs(OUT, exist_ok=True)


def save_webp(im, name, quality=92):
    im.convert("RGB").save(os.path.join(OUT, name), "WEBP", quality=quality, method=6)
    print(f"  saved {name:38} {im.size}")


def trim_to_content(im, bg_tolerance=12):
    """Crop away the flat white studio backdrop surrounding the jewellery."""
    rgb = im.convert("RGB")
    # Corner pixel is reliably backdrop in every source shot.
    bg = Image.new("RGB", rgb.size, rgb.getpixel((0, 0)))
    diff = ImageChops.difference(rgb, bg).convert("L")
    mask = diff.point(lambda p: 255 if p > bg_tolerance else 0)
    box = mask.getbbox()
    return im.crop(box) if box else im


def square_tile(im, size=1100, margin=0.11, bg=(255, 255, 255)):
    """Fit trimmed artwork into a square canvas with identical margins."""
    im = trim_to_content(im).convert("RGB")
    inner = int(size * (1 - margin * 2))
    w, h = im.size
    scale = min(inner / w, inner / h)
    im = im.resize((max(1, int(w * scale)), max(1, int(h * scale))), Image.LANCZOS)
    canvas = Image.new("RGB", (size, size), bg)
    canvas.paste(im, ((size - im.width) // 2, (size - im.height) // 2))
    return canvas


# ── Product tiles ─────────────────────────────────────────────────────────
print("Product tiles:")
products = {
    "ring": ("ring", "Ring.png"),
    "bracelet": ("bracelet", "WhatsApp Image 2026-07-30 at 1.12.14 PM (1).jpeg"),
    "chain-pendant": ("chain pendant_", "WhatsApp Image 2026-07-22 at 12.48.04 PM.jpeg"),
    "earring": ("earring", "studs.jpg"),
    "mangalsutra": ("mangalsutra", "Mangalsutras.png"),
    "necklace": ("necklace", "necklace.png"),
    "pendant-sets": ("pendant sets", "pendant sets.png"),
}

for slug, (folder, fname) in products.items():
    path = os.path.join(PRODUCTS, folder, fname)
    if not os.path.exists(path):
        # Source shots live outside the repo; the generated tile in
        # public/images is the artefact that matters, so skip rather than fail.
        print(f"  skip  product-{slug}.webp (source not present)")
        continue
    src = Image.open(path)
    if src.mode == "RGBA":  # flatten transparency onto white
        flat = Image.new("RGB", src.size, (255, 255, 255))
        flat.paste(src, mask=src.split()[3])
        src = flat
    save_webp(square_tile(src), f"product-{slug}.webp")

# ── Lifestyle portraits ───────────────────────────────────────────────────
# "womenwithpendent and earings.png" is a 1536x1024 triptych of three model
# shots (desk / evening / morning) separated by white gutters at x 485-516
# and 1018-1049. This replaced an older, much lower-res brochure crop that
# was visibly blurry once stretched to fill the lifestyle grid tiles.
print("\nLifestyle portraits:")
tri = Image.open(os.path.join(LOGO_DIR, "new images", "womenwithpendent and earings.png")).convert("RGB")
for i, (x0, x1) in enumerate([(0, 484), (517, 1017), (1050, tri.width)], start=1):
    save_webp(tri.crop((x0, 0, x1, tri.height)), f"lifestyle-{i}.webp")

# ── Hero portrait ─────────────────────────────────────────────────────────
# The source creative carries baked-in copy: the DIAGO lockup top-left, the
# "Redefining Gold" headline at x 85-440, and a gold star bottom-left. Cropping
# from x=470 clears all three. The vertical range runs from the top of the head
# to just below the pendant, so the necklace is never cut off by object-cover.
print("\nHero:")
hero = Image.open(os.path.join(BROCHURE, "creative- redefining gold.jpg"))
save_webp(hero.crop((470, 18, 1024, 918)), "hero-model.webp")

# ── Retail packaging shot, minus the decorative star graphic ──────────────
print("\nRetail:")
mag = Image.open(os.path.join(BROCHURE, "thegoldenmagnet creative.jpg"))
save_webp(mag.crop((0, 300, 780, 1024)), "retail-packaging.webp")

# ── Abstract gold-and-diamond texture from the About creative's right edge ─
print("\nTexture:")
about = Image.open(os.path.join(BROCHURE, "about.jpg"))
save_webp(about.crop((580, 180, 1024, 1024)), "texture-diamonds.webp")

# ── Logo ──────────────────────────────────────────────────────────────────
# Source PNG carries a soft glow that pads the lockup with near-transparent
# margin on every side; cropping to the glow's real bounding box (not just
# non-zero alpha) is what makes the mark read at nav-bar size instead of
# looking like a postage stamp in the middle of an empty canvas.
print("\nLogo:")
logo = Image.open(os.path.join(LOGO_DIR, "updated_logo.png")).convert("RGBA")
x0, y0, x1, y1 = logo.getchannel("A").point(lambda p: 255 if p >= 40 else 0).getbbox()
pad_x, pad_y = int((x1 - x0) * 0.035), int((y1 - y0) * 0.06)
x0, y0 = max(0, x0 - pad_x), max(0, y0 - pad_y)
x1, y1 = x1 + pad_x, y1 + pad_y
logo = logo.crop((x0, y0, x1, y1))
logo.save(os.path.join(OUT, "logo.webp"), "WEBP", quality=95, method=6)
print(f"  saved logo.webp {logo.size}")

print("\nDONE")
