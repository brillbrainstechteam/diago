import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Craft",
  description:
    "The art behind DIAGO jewellery - lightweight engineering, certified natural diamonds graded for cut, colour, clarity and carat, and BIS hallmarked fine gold.",
  openGraph: {
    title: "Our Craft | DIAGO",
    description:
      "Lightweight engineering meets certified natural diamonds. Every piece is BIS hallmarked and built for daily wear.",
    url: "https://thediago.com/craft",
  },
};

export default function CraftLayout({ children }: { children: React.ReactNode }) {
  return children;
}
