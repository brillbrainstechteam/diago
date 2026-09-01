"""
Crawl the built site and check every link and image reference.

Runs against out/ so the exact bytes that deploy are what get checked, and
resolves internal links the way the static host will: /about/ -> out/about/index.html.
External links are requested over the network with a HEAD (falling back to GET,
since some hosts reject HEAD).
"""

import os
import re
import sys
import urllib.request
import urllib.error
from collections import defaultdict

OUT = r"F:\diago\out"
PAGES = ["", "about", "collections", "craft", "gifting", "occasions", "contact"]

href_re = re.compile(r'(?:href|src)="([^"]+)"')


def local_path(url: str) -> str | None:
    """Map a site-absolute URL to the file the static host would serve."""
    path = url.split("#")[0].split("?")[0]
    if not path.startswith("/"):
        return None
    path = path.lstrip("/")
    if path == "":
        return os.path.join(OUT, "index.html")
    direct = os.path.join(OUT, path.replace("/", os.sep))
    if os.path.isfile(direct):
        return direct
    # Directory-style route: /about/ is served from about/index.html
    idx = os.path.join(OUT, path.rstrip("/").replace("/", os.sep), "index.html")
    return idx


internal, external, anchors = defaultdict(set), defaultdict(set), defaultdict(set)

for page in PAGES:
    f = os.path.join(OUT, page, "index.html") if page else os.path.join(OUT, "index.html")
    if not os.path.isfile(f):
        print(f"MISSING PAGE FILE: {f}")
        continue
    html = open(f, encoding="utf-8", errors="ignore").read()
    label = "/" + page
    for raw in href_re.findall(html):
        if raw.startswith(("mailto:", "tel:", "data:", "javascript:")):
            continue
        if raw.startswith(("http://", "https://")):
            external[raw].add(label)
        elif raw.startswith("#"):
            anchors[(label, raw)].add(label)
        elif raw.startswith("/"):
            internal[raw].add(label)

print(f"pages scanned: {len(PAGES)}   internal refs: {len(internal)}   external: {len(external)}\n")

broken_internal = []
for url, seen_on in sorted(internal.items()):
    p = local_path(url)
    if p is None or not os.path.isfile(p):
        broken_internal.append((url, sorted(seen_on)))

# In-page anchors: does an element with that id actually exist on the page?
broken_anchors = []
for (page_label, frag), _ in sorted(anchors.items()):
    page = page_label.lstrip("/")
    f = os.path.join(OUT, page, "index.html") if page else os.path.join(OUT, "index.html")
    html = open(f, encoding="utf-8", errors="ignore").read()
    target = frag[1:]
    if target and f'id="{target}"' not in html:
        broken_anchors.append((page_label, frag))

# Cross-page anchors like /collections#rings
broken_cross = []
for url, seen_on in sorted(internal.items()):
    if "#" not in url:
        continue
    base, frag = url.split("#", 1)
    p = local_path(base)
    if not p or not os.path.isfile(p):
        continue
    html = open(p, encoding="utf-8", errors="ignore").read()
    if frag and f'id="{frag}"' not in html:
        broken_cross.append((url, sorted(seen_on)))

print("INTERNAL LINKS / ASSETS")
print(f"  checked {len(internal)}, broken {len(broken_internal)}")
for url, seen in broken_internal:
    print(f"    BROKEN {url}   (on {', '.join(seen)})")

print("\nSAME-PAGE ANCHORS")
print(f"  checked {len(anchors)}, broken {len(broken_anchors)}")
for page, frag in broken_anchors:
    print(f"    BROKEN {page}{frag}")

print("\nCROSS-PAGE ANCHORS")
print(f"  checked, broken {len(broken_cross)}")
for url, seen in broken_cross:
    print(f"    BROKEN {url}   (on {', '.join(seen)})")

print("\nEXTERNAL LINKS")
for url in sorted(external):
    req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "Mozilla/5.0"})
    try:
        code = urllib.request.urlopen(req, timeout=20).status
    except urllib.error.HTTPError as e:
        if e.code in (403, 405, 501):  # host dislikes HEAD; retry with GET
            try:
                code = urllib.request.urlopen(
                    urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=20
                ).status
            except Exception as e2:
                code = f"ERR {type(e2).__name__}"
        else:
            code = e.code
    except Exception as e:
        code = f"ERR {type(e).__name__}"
    print(f"  {str(code):>18}  {url}")

total_broken = len(broken_internal) + len(broken_anchors) + len(broken_cross)
print(f"\n=== broken internal total: {total_broken} ===")
sys.exit(0)
