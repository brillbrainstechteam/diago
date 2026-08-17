"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export type DeckCard = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  href: string;
};

function Card({ card }: { card: DeckCard }) {
  return (
    <Link
      href={card.href}
      className="group shrink-0 w-[220px] sm:w-[250px] block bg-cream-light border border-gold/25 border-t-2 border-t-gold shadow-[0_20px_40px_-28px_rgba(67,15,34,0.4)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-24px_rgba(67,15,34,0.45)] hover:border-gold/60"
    >
      <div className="relative">
        <span className="pointer-events-none absolute top-3 left-3 w-6 h-6 border-t border-l border-gold/50 transition-colors duration-500 group-hover:border-gold" />
        <span className="pointer-events-none absolute bottom-3 right-3 w-6 h-6 border-b border-r border-gold/50 transition-colors duration-500 group-hover:border-gold" />
        <div className="relative aspect-square overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,var(--gold-pale)_0%,transparent_72%)] opacity-60" />
          <Image
            src={card.image}
            alt={card.name}
            fill
            sizes="250px"
            className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </div>
      </div>

      <div className="px-6 pb-7 pt-1 text-center">
        <span className="mx-auto block w-8 h-px bg-gold/60" />
        <p className="mt-4 text-gold-dark text-[10px] tracking-[0.24em] uppercase">{card.tagline}</p>
        <h3 className="mt-1.5 text-burgundy text-lg font-normal italic" style={{ fontFamily: "var(--font-serif)" }}>
          {card.name}
        </h3>
      </div>
    </Link>
  );
}

/**
 * Continuous auto-scrolling showcase strip — the full range of products
 * flows past at a steady pace so multiple pieces are visible at once,
 * rather than a single focused slide. Pure CSS transform loop (the track
 * renders the card list twice back-to-back and translates by exactly -50%,
 * which is seamless regardless of actual pixel width); pauses on hover.
 * Falls back to a manually-scrollable static row under reduced motion.
 */
export default function ProductDeck({ cards }: { cards: DeckCard[] }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (reducedMotion) {
    return (
      <div className="no-scrollbar flex gap-6 overflow-x-auto pb-2">
        {cards.map((card) => (
          <Card key={card.slug} card={card} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-burgundy to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-burgundy to-transparent z-10" />
      <div className="marquee-track flex gap-6 w-max">
        {[...cards, ...cards].map((card, i) => (
          <Card key={`${card.slug}-${i}`} card={card} />
        ))}
      </div>
    </div>
  );
}
