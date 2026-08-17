"use client";

import Image from "next/image";
import Link from "next/link";
import ProductDeck from "@/components/ProductDeck";
import {
  Container, Section, Reveal, Eyebrow, GoldRule, Heading, PageHeader,
} from "@/components/ui";
import { withBase } from "@/lib/basePath";
import { deckCards } from "@/data/deckCards";

/* ── Why gift DIAGO ─────────────────────────────────────────────────── */

const reasons = [
  {
    n: "01",
    t: "Certified Diamonds",
    d: "Every stone graded and certified — brilliance the recipient can trust, not just admire.",
  },
  {
    n: "02",
    t: "Hallmarked Gold",
    d: "BIS hallmarked purity on every piece, so the gift carries a guarantee, not just a look.",
  },
  {
    n: "03",
    t: "Gift-Ready Presentation",
    d: "Packaged in DIAGO's signature box and bag — ready to hand over as it arrives.",
  },
  {
    n: "04",
    t: "Free Lifetime Care",
    d: "Complimentary cleaning and inspection for as long as they own it — a gift that keeps working.",
  },
];

function WhyGift() {
  return (
    <Section tone="cream">
      <Container>
        <Reveal>
          <Heading eyebrow="Why Gift DIAGO" title="A keepsake," accent="not just a purchase" center className="max-w-xl mx-auto" />
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {reasons.map((r, i) => (
            <Reveal key={r.n} delay={i * 120}>
              <article className="relative pt-8 border-t border-gold/30 h-full">
                <span
                  className="absolute -top-[0.9rem] left-0 bg-cream pr-4 text-gold-dark text-2xl font-bold leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {r.n}
                </span>
                <h3 className="text-xl font-bold text-burgundy">{r.t}</h3>
                <p className="mt-4 text-[15px] leading-[1.8] text-ink-soft" style={{ fontFamily: "var(--font-serif)" }}>
                  {r.d}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ── Gift for every occasion ───────────────────────────────────────── */

function GiftForOccasion() {
  const picks = [
    { name: "Rings", tagline: "The signature gesture", href: "/collections#rings", image: withBase("/images/deck-ring.webp") },
    { name: "Earrings", tagline: "Light enough to forget", href: "/collections#earrings", image: withBase("/images/gift-earrings.webp") },
    { name: "Necklaces", tagline: "Heritage, reframed", href: "/collections#necklaces", image: withBase("/images/deck-necklace.webp") },
    { name: "Pendant Sets", tagline: "Gift-ready presentation", href: "/collections#pendant-sets", image: withBase("/images/product-pendant-sets.webp") },
  ];
  return (
    <Section tone="cream-light">
      <div className="absolute inset-0 grain-ink opacity-[0.025]" />
      <Container className="relative z-10">
        <Reveal>
          <Heading eyebrow="Popular Gifts" title="Pieces people" accent="love to give" center className="max-w-xl mx-auto" />
        </Reveal>

        <div className="mt-14 grid gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4 border border-gold/20">
          {picks.map((p, i) => (
            <Reveal key={p.name} delay={i * 130}>
              <Link href={p.href} className="group h-full bg-cream-light p-9 lg:p-11 flex flex-col items-center text-center">
                <div className="relative w-24 h-24">
                  <Image src={p.image} alt={p.name} fill sizes="96px" className="object-contain transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-burgundy">{p.name}</h3>
                <p className="mt-2 text-[13px] text-gold-dark uppercase tracking-[0.16em]">{p.tagline}</p>
                <span className="mt-6 inline-flex items-center gap-3 text-burgundy text-[10px] font-bold tracking-[0.22em] uppercase group-hover:text-gold-dark transition-colors duration-300">
                  Explore
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 text-center">
            <Link
              href="/#shop-by-occasion"
              className="group inline-flex items-center gap-3 text-burgundy text-[11px] font-bold tracking-[0.22em] uppercase hover:text-gold-dark transition-colors duration-300"
            >
              Shop by occasion
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── Showcase ───────────────────────────────────────────────────────── */

function GiftShowcase() {
  return (
    <Section tone="burgundy" className="!py-16 md:!py-20">
      <div className="absolute inset-0 grain-gold opacity-[0.07]" />
      <Container className="relative z-10">
        <Reveal>
          <Heading eyebrow="Seven Collections" title="Every piece," accent="gift-ready" center light className="max-w-xl mx-auto mb-14" />
        </Reveal>
        <Reveal delay={120}>
          <ProductDeck cards={deckCards} />
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── Book an appointment CTA ───────────────────────────────────────── */

function GiftingCta() {
  return (
    <Section tone="burgundy">
      <div className="absolute inset-0 grain-gold opacity-[0.07]" />
      <Container className="relative z-10">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <Eyebrow light center>Need Help Choosing</Eyebrow>
            <h2 className="mt-6 text-[2rem] sm:text-4xl lg:text-5xl font-bold leading-[1.12] text-cream">
              Let us help you find
              <span className="block mt-2 font-normal italic text-gold-light" style={{ fontFamily: "var(--font-serif)" }}>
                the right piece
              </span>
            </h2>
            <GoldRule light center className="mt-7" />
            <p className="mt-8 text-[1.0625rem] leading-[1.85] text-cream/85" style={{ fontFamily: "var(--font-serif)" }}>
              Book a private appointment at the Mumbai showroom, or reach the team directly —
              we will help you choose a piece worth giving.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact#book-appointment"
                className="group inline-flex items-center gap-3 px-9 py-4 bg-gold text-burgundy-deep text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-gold-light transition-colors duration-300"
              >
                Book an Appointment
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center px-9 py-4 border border-cream/30 text-cream text-[11px] font-bold tracking-[0.22em] uppercase hover:border-gold hover:text-gold transition-colors duration-300"
              >
                Browse Collections
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

export default function GiftingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gifting"
        title="A gift and a"
        accent="keepsake in one"
        intro="Certified, hallmarked, and meaningful — every DIAGO piece is packaged to give and built to keep."
        image={withBase("/images/texture-diamonds.webp")}
      />
      <GiftShowcase />
      <WhyGift />
      <GiftForOccasion />
      <GiftingCta />
    </>
  );
}
