import { categories } from "@/data/collections";
import { withBase } from "@/lib/basePath";

export type NavDropdownItem = {
  label: string;
  href: string;
  image: string;
};

const bySlug = (slug: string) => categories.find((c) => c.slug === slug)!;

/**
 * The Collections nav dropdown. Six entries reuse existing category data and
 * link straight to that category's anchor on /collections (rather than the
 * generic /collections landing every link used to point at); the seventh
 * points at the homepage's Shop by Occasion section. Gifting has its own
 * top-level nav link now, so it isn't duplicated here.
 */
export const collectionsDropdown: NavDropdownItem[] = [
  { label: "Rings", href: `/collections#${bySlug("rings").slug}`, image: bySlug("rings").image },
  { label: "Bracelets", href: `/collections#${bySlug("bracelets").slug}`, image: bySlug("bracelets").image },
  { label: "Pendants & Chains", href: `/collections#${bySlug("chain-pendants").slug}`, image: bySlug("chain-pendants").image },
  { label: "Earrings", href: `/collections#${bySlug("earrings").slug}`, image: bySlug("earrings").image },
  { label: "Necklaces", href: `/collections#${bySlug("necklaces").slug}`, image: bySlug("necklaces").image },
  { label: "Mangalsutras", href: `/collections#${bySlug("mangalsutras").slug}`, image: bySlug("mangalsutras").image },
  { label: "Shop by Occasion", href: "/occasions", image: withBase("/images/moment-cafe.webp") },
];
