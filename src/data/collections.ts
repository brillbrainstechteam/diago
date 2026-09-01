import { withBase } from "@/lib/basePath";

/**
 * An individual piece photographed for the catalogue. `ref` is the vendor's
 * own design code — retailers order against it, so it is shown verbatim.
 */
export type Piece = {
  ref: string;
  name: string;
  note: string;
  image: string;
};

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  details: string[];
  /** Studio shots of real pieces in this category, where photographed. */
  pieces?: Piece[];
};

const piece = (ref: string, file: string, name: string, note: string): Piece => ({
  ref,
  name,
  note,
  image: withBase(`/images/catalogue/${file}.webp`),
});

export const categories: Category[] = [
  {
    slug: "rings",
    name: "Statement Rings",
    tagline: "The signature gesture",
    description:
      "Sculptural silhouettes in fine gold, set with certified natural diamonds. Built to be worn daily and noticed instantly.",
    image: withBase("/images/product-ring.webp"),
    details: ["Pear & marquee settings", "Micro-pave diamond detail", "Comfort-fit gold band"],
    pieces: [
      piece("CLR113", "ring-clr113", "Peacock Sapphire Ring", "Pear-cut blue sapphire, diamond plume"),
      piece("CLR173", "ring-clr173", "Emerald Cocktail Ring", "Emerald centre, marquise diamond flanks"),
      piece("W527", "ring-w527", "Diamond Fan Ring", "Fanned brilliant-cut crest on a twist band"),
    ],
  },
  {
    slug: "bracelets",
    name: "Lightweight Bracelets",
    tagline: "Movement, made brilliant",
    description:
      "Paperclip links and fine cable chains anchored by a solitaire. Weightless on the wrist, deliberate in presence.",
    image: withBase("/images/product-bracelet.webp"),
    details: ["Solitaire centre stone", "Adjustable chain length", "Secure lobster clasp"],
  },
  {
    slug: "chain-pendants",
    name: "Modern Pendants & Chain Sets",
    tagline: "Everyday brilliance",
    description:
      "Contemporary pendants matched to fine gold chains — the layering pieces that carry a wardrobe from desk to dinner.",
    image: withBase("/images/product-chain-pendant.webp"),
    details: ["Matched chain included", "Layer-friendly proportions", "Halo diamond setting"],
  },
  {
    slug: "pendant-sets",
    name: "Diamond Pendant Sets",
    tagline: "Considered as a pair",
    description:
      "Coordinated pendant and earring sets designed together, so brilliance reads consistently across the face and neckline.",
    image: withBase("/images/product-pendant-sets.webp"),
    details: ["Pendant & earrings matched", "Baguette and round cuts", "Gift-ready presentation"],
    pieces: [
      piece("DS118", "pendant-set-ds118", "Paisley Pendant Set", "Diamond-edged paisley with matched studs"),
      piece("DS138", "pendant-set-ds138", "Kite Motif Pendant Set", "Lattice-set kite pendant and studs"),
      piece("PES81", "trio-set-pes81", "Teardrop Trio Set", "Pendant, studs and ring in one suite"),
      piece("PES89", "trio-set-pes89", "Petal Trio Set", "Petal-cut trio, pendant to ring"),
      piece("PES160", "trio-set-pes160", "Swirl Trio Set", "Swirled pave across pendant, studs and ring"),
    ],
  },
  {
    slug: "earrings",
    name: "Daily-Wear Earrings",
    tagline: "Light enough to forget",
    description:
      "Halo studs engineered for all-day comfort — secure, feather-light, and finished to catch light from every angle.",
    image: withBase("/images/product-earring.webp"),
    details: ["Halo-set brilliant cut", "Screw-back security", "Under 2g per pair"],
    pieces: [
      piece("BT96", "earring-top-bt96", "Heart Cluster Tops", "Open heart studs, scattered brilliants"),
      piece("LD13", "earring-long-ld13", "Trine Drop Earrings", "Triangular drop on a pave stem"),
      piece("LD34", "earring-long-ld34", "Chandbali Drops", "Double-crescent chandbali with pave crown"),
    ],
  },
  {
    slug: "necklaces",
    name: "Contemporary Necklaces",
    tagline: "Heritage, reframed",
    description:
      "Statement necklaces that carry traditional craftsmanship into a modern design language — structured, graphic, wearable.",
    image: withBase("/images/product-necklace.webp"),
    details: ["Graduated diamond line", "Balanced drape", "Hallmarked fine gold"],
    pieces: [
      piece("ND94", "necklace-nd94", "Vine Link Necklace Set", "Scrolling vine links with matched earrings"),
    ],
  },
  {
    slug: "mangalsutras",
    name: "Mangalsutras",
    tagline: "Tradition, made contemporary",
    description:
      "The most meaningful piece in the box, reimagined — geometric motifs and diamond detailing that suit a modern wardrobe.",
    image: withBase("/images/product-mangalsutra.webp"),
    details: ["Hexagon & vine motifs", "Pear-cut centre drop", "Everyday-wear weight"],
    pieces: [
      piece("TD531", "tanmaniya-td531", "Emerald Tanmaniya", "Emerald centre on a chevron diamond line"),
      piece("TD535", "tanmaniya-td535", "Sapphire Tanmaniya", "Blue sapphire crest over a pave sweep"),
      piece("TD541", "tanmaniya-td541", "Ruby Tanmaniya", "Ruby centre with a scrolled diamond drop"),
    ],
  },
];

/** Every photographed piece, flattened, in category order. */
export const allPieces: Piece[] = categories.flatMap((c) => c.pieces ?? []);

const byRef = new Map(allPieces.map((p) => [p.ref, p]));

/** Look pieces up by reference code, keeping the given order. */
export const piecesByRef = (...refs: string[]): Piece[] =>
  refs.map((ref) => {
    const found = byRef.get(ref);
    if (!found) throw new Error(`Unknown piece ref: ${ref}`);
    return found;
  });

/**
 * Home-page selection: exactly one piece from each photographed category, in
 * the order the categories appear on /collections. That rule is what the
 * section's copy states, so it has to hold — pick by category, never by
 * favourite, or the heading stops being true.
 */
export const featuredPieces: Piece[] = piecesByRef(
  "CLR113", // rings
  "DS118",  // pendant sets
  "LD34",   // earrings
  "ND94",   // necklaces
  "TD541",  // mangalsutras
);

/** The category each featured piece stands for, for labelling that row. */
export const featuredCategoryOf = (ref: string): string =>
  categories.find((c) => c.pieces?.some((p) => p.ref === ref))?.name ?? "";

export type Moment = {
  slug: string;
  name: string;
  note: string;
  /** Editorial title for the edit itself, shown above its pieces. */
  editTitle: string;
  editAccent: string;
  blurb: string;
  image: string;
  pieces: Piece[];
};

/**
 * Three moments, keeping the brochure's "Everyday Elegance / Effortless
 * Radiance" theme and its count of three. Each is named for what its
 * photograph actually shows rather than for an occasion the frame does not
 * depict.
 *
 * Every catalogue piece belongs to exactly one moment, so the three groupings
 * partition the range rather than overlapping: switching moments shows a
 * genuinely different set instead of a reshuffle of the same favourites.
 */
export const moments: Moment[] = [
  {
    slug: "at-the-desk",
    name: "At the Desk",
    note: "Subtle, all-day shine",
    editTitle: "Quiet enough",
    editAccent: "for a Monday",
    blurb:
      "Pieces light enough to forget through a working day — nothing that catches on a sleeve or asks to be taken off.",
    image: withBase("/images/moment-desk.webp"),
    pieces: piecesByRef("BT96", "W527", "PES89", "PES160", "TD531"),
  },
  {
    slug: "over-coffee",
    name: "Over Coffee",
    note: "Effortless and repeatable",
    editTitle: "The ones you",
    editAccent: "never take off",
    blurb:
      "Reached for without thinking and worn with everything — the pieces that end up living on the dresser rather than in the locker.",
    image: withBase("/images/moment-cafe.webp"),
    pieces: piecesByRef("LD13", "CLR113", "DS118", "PES81", "TD541"),
  },
  {
    slug: "out-and-about",
    name: "Out and About",
    note: "A little more sparkle",
    editTitle: "For when you",
    editAccent: "are seen",
    blurb:
      "The step up for going somewhere — drops that move, a centre stone with some colour, a neckline worth dressing.",
    image: withBase("/images/moment-out.webp"),
    pieces: piecesByRef("LD34", "CLR173", "ND94", "TD535", "DS138"),
  },
];
