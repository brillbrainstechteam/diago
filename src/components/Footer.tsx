import Image from "next/image";
import Link from "next/link";
import { withBase } from "@/lib/basePath";

const nav = [
  { l: "Home", href: "/" },
  { l: "About", href: "/about" },
  { l: "Collections", href: "/collections" },
  { l: "Our Craft", href: "/craft" },
  { l: "Contact", href: "/contact" },
];

// TODO: swap "#" for the real profile URLs once they're available.
const socials = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.35" cy="6.65" r="1.05" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M15.5 8.5h-2a1.5 1.5 0 0 0-1.5 1.5v2h3.4l-.5 3H12v7h-3v-7H7v-3h2v-2.3C9 7.7 10.7 6 13.2 6h2.3v2.5Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="12" rx="4" />
        <path d="M10.5 9.7v4.6l4-2.3-4-2.3Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <line x1="7.3" y1="10.2" x2="7.3" y2="16.8" />
        <circle cx="7.3" cy="7.1" r="0.15" fill="currentColor" />
        <path d="M11.3 16.8v-4.1c0-1.5 1-2.5 2.35-2.5s2.35 1 2.35 2.5v4.1" />
        <line x1="11.3" y1="10.2" x2="11.3" y2="16.8" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative surface-burgundy text-cream overflow-hidden">
      <div className="absolute inset-0 grain-gold opacity-[0.06]" />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="py-16 lg:py-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Image
              src={withBase("/images/logo.webp")}
              alt="DIAGO"
              width={221}
              height={100}
              className="h-14 lg:h-16 w-auto object-contain"
            />
            <p className="mt-6 text-cream/85 text-[15px] leading-relaxed" style={{ fontFamily: "var(--font-serif)" }}>
              Fine gold artistry paired with the authentic brilliance of certified natural diamonds.
            </p>
            <p className="mt-4 text-gold text-sm italic" style={{ fontFamily: "var(--font-serif)" }}>
              Real Diamond, Real You.
            </p>
          </div>

          <div>
            <h4 className="text-gold text-[10px] font-bold tracking-[0.28em] uppercase mb-6">Navigate</h4>
            <ul className="space-y-3.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-cream/85 text-sm hover:text-gold transition-colors duration-300">
                    {item.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold text-[10px] font-bold tracking-[0.28em] uppercase mb-6">Collections</h4>
            <ul className="space-y-3.5">
              {["Rings", "Bracelets", "Pendants", "Earrings", "Necklaces", "Mangalsutras"].map((l) => (
                <li key={l}>
                  <Link href="/collections" className="text-cream/85 text-sm hover:text-gold transition-colors duration-300">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold text-[10px] font-bold tracking-[0.28em] uppercase mb-6">Enquiries</h4>
            <a href="tel:+912268936666" className="block text-cream/85 text-sm hover:text-gold transition-colors duration-300">
              +91 22 6893 6666
            </a>
            <a href="mailto:diago@dishaplatinum.com" className="mt-2 block text-cream/85 text-sm hover:text-gold transition-colors duration-300">
              diago@dishaplatinum.com
            </a>

            <div className="flex gap-2.5 mt-7">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  title={s.name}
                  className="w-9 h-9 border border-cream/15 flex items-center justify-center text-cream/85 hover:border-gold hover:text-gold transition-all duration-300"
                >
                  <span className="w-[18px] h-[18px]">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 py-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-cream/85 text-[11px] tracking-[0.14em] text-center sm:text-left">
            &copy; 2026 DIAGO. All rights reserved.
          </p>
          <p className="text-cream/85 text-[11px] tracking-[0.14em] text-center sm:text-right">
            Exclusive distribution by Dishaa Gold and Platinum
          </p>
        </div>

        <div className="border-t border-cream/10 py-4 text-center">
          <p className="text-cream/60 text-[10px] tracking-[0.14em]">
            Powered By{" "}
            <a
              href="https://brillbrainsconsultants.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors duration-300"
            >
              Brillbrains
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
