import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop by Occasion",
  description:
    "DIAGO's collection sorted by when you would wear it — at the desk, over coffee, or out and about. Certified natural diamonds in BIS hallmarked fine gold.",
  openGraph: {
    title: "Shop by Occasion | DIAGO",
    description:
      "Three edits of the DIAGO collection — at the desk, over coffee, out and about.",
    url: "https://thediago.com/occasions",
  },
};

export default function OccasionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
