export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  details: string[];
};

export const categories: Category[] = [
  {
    slug: "rings",
    name: "Statement Rings",
    tagline: "The signature gesture",
    description:
      "Sculptural silhouettes in fine gold, set with certified natural diamonds. Built to be worn daily and noticed instantly.",
    image: "/images/product-ring.webp",
    details: ["Pear & marquee settings", "Micro-pave diamond detail", "Comfort-fit gold band"],
  },
  {
    slug: "bracelets",
    name: "Lightweight Bracelets",
    tagline: "Movement, made brilliant",
    description:
      "Paperclip links and fine cable chains anchored by a solitaire. Weightless on the wrist, deliberate in presence.",
    image: "/images/product-bracelet.webp",
    details: ["Solitaire centre stone", "Adjustable chain length", "Secure lobster clasp"],
  },
  {
    slug: "chain-pendants",
    name: "Modern Pendants & Chain Sets",
    tagline: "Everyday brilliance",
    description:
      "Contemporary pendants matched to fine gold chains — the layering pieces that carry a wardrobe from desk to dinner.",
    image: "/images/product-chain-pendant.webp",
    details: ["Matched chain included", "Layer-friendly proportions", "Halo diamond setting"],
  },
  {
    slug: "pendant-sets",
    name: "Diamond Pendant Sets",
    tagline: "Considered as a pair",
    description:
      "Coordinated pendant and earring sets designed together, so brilliance reads consistently across the face and neckline.",
    image: "/images/product-pendant-sets.webp",
    details: ["Pendant & earrings matched", "Baguette and round cuts", "Gift-ready presentation"],
  },
  {
    slug: "earrings",
    name: "Daily-Wear Earrings",
    tagline: "Light enough to forget",
    description:
      "Halo studs engineered for all-day comfort — secure, feather-light, and finished to catch light from every angle.",
    image: "/images/product-earring.webp",
    details: ["Halo-set brilliant cut", "Screw-back security", "Under 2g per pair"],
  },
  {
    slug: "necklaces",
    name: "Contemporary Necklaces",
    tagline: "Heritage, reframed",
    description:
      "Statement necklaces that carry traditional craftsmanship into a modern design language — structured, graphic, wearable.",
    image: "/images/product-necklace.webp",
    details: ["Graduated diamond line", "Balanced drape", "Hallmarked fine gold"],
  },
  {
    slug: "mangalsutras",
    name: "Mangalsutras",
    tagline: "Tradition, made contemporary",
    description:
      "The most meaningful piece in the box, reimagined — geometric motifs and diamond detailing that suit a modern wardrobe.",
    image: "/images/product-mangalsutra.webp",
    details: ["Hexagon & vine motifs", "Pear-cut centre drop", "Everyday-wear weight"],
  },
];
