"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Collections", href: "/collections" },
  { label: "Our Craft", href: "/craft" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on route change so it never survives navigation.
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-shadow duration-500 bg-cream ${
        scrolled ? "shadow-[0_1px_24px_rgba(67,15,34,0.10)]" : ""
      }`}
      style={{ minHeight: "var(--nav-h)" }}
    >
      {/* Hairline gold underline keeps the bar from floating on cream sections. */}
      <span className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <nav className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-16 h-[var(--nav-h)] flex items-center justify-between">
        <Link href="/" className="shrink-0" aria-label="DIAGO — home">
          <Image
            src="/images/logo.webp"
            alt="DIAGO"
            width={221}
            height={100}
            className="h-11 sm:h-14 w-auto object-contain"
            priority
          />
        </Link>

        <div className="hidden lg:flex items-center gap-9">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`relative text-[11px] font-semibold tracking-[0.24em] uppercase transition-colors duration-300 ${
                  active ? "text-burgundy" : "text-burgundy/80 hover:text-burgundy"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-500 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href="/contact#book-appointment"
            className="px-7 py-3 bg-burgundy text-cream text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-burgundy-dark transition-colors duration-300"
          >
            Book Appointment
          </Link>
        </div>

        <button
          className="lg:hidden flex flex-col gap-[5px] p-2 -mr-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-[1.5px] bg-burgundy transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`block w-6 h-[1.5px] bg-burgundy transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[1.5px] bg-burgundy transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className="lg:hidden bg-cream border-t border-gold/20 px-6 sm:px-10 py-8 flex flex-col gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium tracking-[0.2em] uppercase ${
                pathname === l.href ? "text-burgundy" : "text-burgundy/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact#book-appointment"
            className="mt-2 px-8 py-4 bg-burgundy text-cream text-[10px] font-bold tracking-[0.2em] uppercase text-center"
          >
            Book Appointment
          </Link>
        </div>
      )}
    </header>
  );
}
