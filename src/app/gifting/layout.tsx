import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gifting",
  description:
    "DIAGO gifting — certified natural diamonds and BIS hallmarked gold, packaged to give and built to keep. A gift and a keepsake in one.",
  openGraph: {
    title: "Gifting | DIAGO",
    description:
      "Certified, hallmarked, and meaningful — a gift and a keepsake in one.",
    url: "https://thediago.com/gifting",
  },
};

export default function GiftingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
