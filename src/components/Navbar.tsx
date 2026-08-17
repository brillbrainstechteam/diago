"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { withBase } from "@/lib/basePath";
import { collectionsDropdown } from "@/data/navigation";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Collections", href: "/collections" },
  { label: "Our Craft", href: "/craft" },
  { label: "Gifting", href: "/gifting" },
  { label: "Contact", href: "/contact" },
];

function CollectionsMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4 p-6 w-[440px]">
      {collectionsDropdown.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={onNavigate}
          className="group flex items-center gap-3"
        >
          <span className="relative w-11 h-11 shrink-0 overflow-hidden bg-cream-dark border border-gold/20">
            <Image src={item.image} alt="" fill sizes="44px" className="object-contain p-1" />
          </span>
          <span className="text-[13px] text-burgundy/85 group-hover:text-burgundy transition-colors duration-300">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on route change so it never survives navigation.
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
    setMobileCollectionsOpen(false);
  }, [pathname]);

  // Escape closes the desktop dropdown from anywhere, matching the mobile
  // drawer's existing close-on-navigate behaviour.
  useEffect(() => {
    if (!dropdownOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        dropdownRef.current?.querySelector("a")?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dropdownOpen]);

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
            src={withBase("/images/logo.webp")}
            alt="DIAGO"
            width={221}
            height={100}
            className="h-10 sm:h-12 w-auto object-contain"
            priority
          />
        </Link>

        <div className="hidden lg:flex items-center gap-9">
          {links.map((l) => {
            const active = pathname === l.href;
            if (l.label === "Collections") {
              return (
                <div
                  key={l.href}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    aria-expanded={dropdownOpen}
                    onFocus={() => setDropdownOpen(true)}
                    className={`relative text-[11px] font-semibold tracking-[0.24em] uppercase transition-colors duration-300 ${
                      active ? "text-burgundy" : "text-burgundy/80 hover:text-burgundy"
                    }`}
                  >
                    {l.label}
                    <span
                      className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-500 ${
                        active || dropdownOpen ? "w-full" : "w-0"
                      }`}
                    />
                  </Link>
                  {dropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                      <div className="bg-cream-light border border-gold/25 shadow-[0_24px_48px_-16px_rgba(67,15,34,0.25)]">
                        <CollectionsMenu onNavigate={() => setDropdownOpen(false)} />
                      </div>
                    </div>
                  )}
                </div>
              );
            }
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
          {links.map((l) => {
            if (l.label === "Collections") {
              return (
                <div key={l.href}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={l.href}
                      className={`text-sm font-medium tracking-[0.2em] uppercase ${
                        pathname === l.href ? "text-burgundy" : "text-burgundy/80"
                      }`}
                    >
                      {l.label}
                    </Link>
                    <button
                      onClick={() => setMobileCollectionsOpen((v) => !v)}
                      aria-label={mobileCollectionsOpen ? "Collapse collections" : "Expand collections"}
                      aria-expanded={mobileCollectionsOpen}
                      className="p-2 -mr-2 text-burgundy/80"
                    >
                      <span
                        className={`block w-2.5 h-2.5 border-r border-b border-current transition-transform duration-300 ${
                          mobileCollectionsOpen ? "-rotate-[135deg] translate-y-0.5" : "rotate-45 -translate-y-0.5"
                        }`}
                      />
                    </button>
                  </div>
                  {mobileCollectionsOpen && (
                    <ul className="mt-5 space-y-4 pl-1">
                      {collectionsDropdown.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 text-[13px] text-burgundy/75"
                          >
                            <span className="relative w-8 h-8 shrink-0 overflow-hidden bg-cream-dark border border-gold/20">
                              <Image src={item.image} alt="" fill sizes="32px" className="object-contain p-0.5" />
                            </span>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium tracking-[0.2em] uppercase ${
                  pathname === l.href ? "text-burgundy" : "text-burgundy/80"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
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
