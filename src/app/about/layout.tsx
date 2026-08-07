import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About DIAGO",
  description:
    "DIAGO redefines gold jewellery for the modern consumer. Fine gold artistry paired with certified natural diamonds, crafted by Dishaa in alliance with INDRA.",
  openGraph: {
    title: "About DIAGO | The Natural Diamond Delite",
    description:
      "Fine gold artistry paired with certified natural diamonds. Crafted by Dishaa in alliance with INDRA.",
    url: "https://thediago.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
