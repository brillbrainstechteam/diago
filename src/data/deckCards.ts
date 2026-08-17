import { categories } from "@/data/collections";
import { withBase } from "@/lib/basePath";

// A few categories have richer renders (true alpha-transparent product
// shots) from the latest photography drop — swapped in here only; the
// underlying /collections page and nav thumbnails keep the original crops.
const deckImageOverrides: Record<string, string> = {
  rings: withBase("/images/deck-ring.webp"),
  necklaces: withBase("/images/deck-necklace.webp"),
  earrings: withBase("/images/gift-earrings.webp"),
};

export const deckCards = categories.map((cat) => ({
  slug: cat.slug,
  name: cat.name,
  tagline: cat.tagline,
  image: deckImageOverrides[cat.slug] ?? cat.image,
  href: `/collections#${cat.slug}`,
}));
