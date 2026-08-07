import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore DIAGO's seven signature collections - rings, earrings, pendants, necklaces, bracelets, mangalsutras, and pendant sets. BIS hallmarked gold with certified natural diamonds.",
  openGraph: {
    title: "Collections | DIAGO",
    description:
      "Seven signature collections of fine gold jewellery with certified natural diamonds. Rings, earrings, pendants, necklaces, bracelets and more.",
    url: "https://thediago.com/collections",
  },
};

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
