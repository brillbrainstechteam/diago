import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with DIAGO - book an appointment, enquire about collections, or become a retail partner. Email: diago@dishaplatinum.com | Phone: +91 22 6893 6666.",
  openGraph: {
    title: "Contact | DIAGO",
    description:
      "Book an appointment or enquire about DIAGO's certified natural diamond jewellery collections.",
    url: "https://thediago.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
