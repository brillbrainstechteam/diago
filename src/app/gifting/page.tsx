"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Container, Section, Reveal, Eyebrow, GoldRule, Heading, PageHeader,
} from "@/components/ui";
import { withBase } from "@/lib/basePath";

/* ── Why gift DIAGO ─────────────────────────────────────────────────── */

/**
 * Four single objects on one cream plinth.
 *
 * Cards one and two are photographed cut-outs — a loose stone, a bare band.
 * Three and four have no equivalent photograph (the two ribboned-box stills
 * that stood here were near enough identical to read as a mistake), so they
 * are drawn in the same gold line as the rest of the site's iconography and
 * set at the same scale. Every tile is then one object, centred, on the same
 * ground.
 */
const reasons = [
  {
    n: "01",
    t: "Certified Diamonds",
    d: "Every stone graded and certified — brilliance the recipient can trust, not just admire.",
    img: "/images/diamond-solo.webp",
    alt: "A loose certified natural diamond",
  },
  {
    n: "02",
    t: "Hallmarked Gold",
    d: "BIS hallmarked purity on every piece, so the gift carries a guarantee, not just a look.",
    img: "/images/finegold-band.webp",
    alt: "A polished BIS hallmarked fine gold band",
  },
  {
    n: "03",
    t: "Gift-Ready Presentation",
    d: "Packaged in DIAGO's signature box and bag — ready to hand over as it arrives.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" aria-hidden>
        <path d="M9 26h46v27a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V26Z" />
        <path d="M6 18h52v8H6z" />
        <path d="M32 18v38" />
        <path d="M32 18c-4 0-13 .4-15.5-2.2A5.4 5.4 0 0 1 20 6.6C25.2 6.6 30 12.4 32 18Z" />
        <path d="M32 18c4 0 13 .4 15.5-2.2A5.4 5.4 0 0 0 44 6.6C38.8 6.6 34 12.4 32 18Z" />
      </svg>
    ),
    alt: "A gift box tied with a ribbon",
  },
  {
    n: "04",
    t: "Free Lifetime Care",
    d: "Complimentary cleaning and inspection for as long as they own it — a gift that keeps working.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" aria-hidden>
        <path d="M28 22 20 31l8 20 8-20-8-9Z" />
        <path d="M20 31h16M24.5 31 28 22l3.5 9M28 51l-3.5-20m3.5 20 3.5-20" strokeWidth="0.85" />
        <path d="M45 10v10M40 15h10" strokeLinecap="round" strokeWidth="1.3" />
        <path d="M50 28v7M46.5 31.5h7" strokeLinecap="round" strokeWidth="1.1" />
        <path d="M13 14v6M10 17h6" strokeLinecap="round" strokeWidth="1.1" />
      </svg>
    ),
    alt: "A diamond with polish sparkles",
  },
] as const;

function WhyGift() {
  return (
    <Section tone="cream">
      <Container>
        <Reveal>
          <Heading eyebrow="Why Gift DIAGO" title="A keepsake," accent="not just a purchase" center className="max-w-xl mx-auto" />
        </Reveal>

        <div className="mt-11 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {reasons.map((r, i) => (
            <Reveal key={r.n} delay={i * 120}>
              <article className="group h-full">
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-cream-light to-cream border border-gold/30 border-t-2 border-t-gold/70 shadow-[0_18px_38px_-28px_rgba(122,32,64,0.45)] transition-all duration-500 group-hover:border-gold/60 group-hover:border-t-gold">
                  <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,var(--gold-pale)_0%,transparent_72%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                  {"img" in r ? (
                    <Image
                      src={withBase(r.img)}
                      alt={r.alt}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
                      className="relative object-contain p-9 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                  ) : (
                    <span
                      role="img"
                      aria-label={r.alt}
                      className="absolute inset-0 flex items-center justify-center text-gold-dark transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    >
                      <span className="w-[38%] max-w-[92px]">{r.icon}</span>
                    </span>
                  )}

                  <span className="pointer-events-none absolute inset-3 border border-gold/20 transition-colors duration-500 group-hover:border-gold/40" />
                </div>

                <div className="relative mt-7 pt-8 border-t border-gold/30">
                  <span
                    className="absolute -top-[0.9rem] left-0 bg-cream pr-4 text-gold-dark text-2xl font-bold leading-none tabular-nums"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {r.n}
                  </span>
                  <h3 className="text-xl font-bold text-burgundy">{r.t}</h3>
                  <p className="mt-4 text-[15px] leading-[1.8] text-ink-soft" style={{ fontFamily: "var(--font-serif)" }}>
                    {r.d}
                  </p>
                </div>
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
    { name: "Earrings", tagline: "Light enough to forget", href: "/collections#earrings", image: withBase("/images/product-earring.webp") },
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

        <div className="mt-10 grid gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4 border border-gold/20">
          {picks.map((p, i) => (
            <Reveal key={p.name} delay={i * 130}>
              <Link href={p.href} className="group h-full bg-cream-light p-9 lg:p-11 flex flex-col items-center text-center">
                {/* Uniform framed white tile behind every product so the four
                    read as one consistent set (source images have mixed white/
                    cream backgrounds that otherwise look mismatched). */}
                <div className="relative w-28 h-28 bg-white border border-gold/20 shadow-[0_16px_32px_-24px_rgba(122,32,64,0.4)] transition-all duration-500 group-hover:border-gold/50 group-hover:shadow-[0_22px_40px_-22px_rgba(122,32,64,0.45)]">
                  <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,var(--gold-pale)_0%,transparent_72%)] opacity-50" />
                  <Image src={p.image} alt={p.name} fill sizes="112px" className="object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
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

/* ── Packaging ──────────────────────────────────────────────────────── */

/**
 * The moment of handing it over. Gifting is the one context where the
 * packaging is part of the product rather than a shipping detail, so it gets
 * a section of its own.
 */
function Presentation() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[340px] lg:min-h-[520px]">
          <Image
            src={withBase("/images/gift-exchange.webp")}
            alt="A wrapped gift box passed from one pair of hands to another"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="relative surface-burgundy flex items-center py-14 lg:py-20">
          <div className="absolute inset-0 grain-gold opacity-[0.07]" />
          <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:pr-24">
            <Reveal>
              <Eyebrow light>The Presentation</Eyebrow>
              <h2 className="mt-6 text-[2rem] sm:text-4xl lg:text-5xl font-bold leading-[1.1] text-cream">
                Wrapped before
                <span className="block mt-2 font-normal italic text-gold-light" style={{ fontFamily: "var(--font-serif)" }}>
                  it reaches you
                </span>
              </h2>
              <GoldRule light className="mt-7" />
              <p className="mt-7 text-[1.0625rem] leading-[1.85] text-cream/85 max-w-md" style={{ fontFamily: "var(--font-serif)" }}>
                Every piece arrives in the signature box and carry bag, with its
                certificate enclosed — nothing left to wrap, nothing to explain.
              </p>

              <ul className="mt-9 grid sm:grid-cols-2 gap-x-6 gap-y-4 max-w-md">
                {[
                  "Signature box and bag",
                  "Certificate enclosed",
                  "Hallmark documented",
                  "Ready to hand over",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="text-gold text-xs leading-none pt-[6px] shrink-0">&#10022;</span>
                    <span className="text-[14px] text-cream/85" style={{ fontFamily: "var(--font-serif)" }}>{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
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
        image={withBase("/images/gift-boxed-alt.webp")}
      />
      <WhyGift />
      <GiftForOccasion />
      <Presentation />
      <GiftingCta />
    </>
  );
}
