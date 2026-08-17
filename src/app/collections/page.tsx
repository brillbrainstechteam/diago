"use client";

import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import { categories } from "@/data/collections";
import {
  Container, Section, Reveal, Eyebrow, GoldRule, Heading, PageHeader,
} from "@/components/ui";
import { withBase } from "@/lib/basePath";

/* ── Quick index ────────────────────────────────────────────────────── */

function CategoryIndex() {
  return (
    <Section tone="cream-light" className="!py-12 md:!py-14">
      <Container>
        <Reveal>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <a
                  href={`#${c.slug}`}
                  className="text-[11px] font-semibold tracking-[0.2em] uppercase text-burgundy/80 hover:text-burgundy transition-colors duration-300"
                >
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── Editorial rows, one per category ───────────────────────────────── */

function CategoryRow({ cat, index }: { cat: (typeof categories)[number]; index: number }) {
  const flipped = index % 2 === 1;
  return (
    <div
      id={cat.slug}
      className={`scroll-mt-[calc(var(--nav-h)+2rem)] ${index % 2 === 1 ? "bg-cream-light" : "bg-cream"}`}
    >
      <Container>
        <div className="py-11 lg:py-14 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Image */}
          <Reveal className={flipped ? "lg:order-2" : ""}>
            <div className="relative group">
              <span className="pointer-events-none absolute -top-4 -left-4 w-20 h-20 border-t border-l border-gold/60 z-10" />
              <span className="pointer-events-none absolute -bottom-4 -right-4 w-20 h-20 border-b border-r border-gold/60 z-10" />
              <div className="relative aspect-square bg-white overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-10 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <span className="pointer-events-none absolute inset-4 border border-gold/25" />
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal delay={130} className={flipped ? "lg:order-1" : ""}>
            <span
              className="block text-gold-dark/80 text-5xl lg:text-6xl font-bold leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <p className="mt-6 text-[10px] font-semibold tracking-[0.3em] uppercase text-gold-dark">
              {cat.tagline}
            </p>

            <h2 className="mt-3 text-[1.75rem] sm:text-3xl lg:text-[2.5rem] font-bold leading-[1.12] text-burgundy">
              {cat.name}
            </h2>

            <GoldRule className="mt-6" />

            <p
              className="mt-7 text-[1.0625rem] leading-[1.85] text-ink-soft max-w-md"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {cat.description}
            </p>

            <ul className="mt-8 space-y-3">
              {cat.details.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <span className="text-gold text-xs leading-none pt-[6px]">&#10022;</span>
                  <span className="text-[15px] text-ink-soft" style={{ fontFamily: "var(--font-serif)" }}>
                    {d}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center gap-3 text-burgundy text-[11px] font-bold tracking-[0.22em] uppercase hover:text-gold-dark transition-colors duration-300"
            >
              Enquire about {cat.name.split(" ").slice(-1)[0].toLowerCase()}
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}

/* ── Browse-all rail ────────────────────────────────────────────────── */

function BrowseRail() {
  return (
    <Section tone="burgundy">
      <div className="absolute inset-0 grain-gold opacity-[0.07]" />
      <Container className="relative z-10">
        <Reveal>
          <Heading eyebrow="Browse" title="The complete" accent="range" light center className="max-w-xl mx-auto" />
        </Reveal>

        <Reveal delay={120} className="mt-10 block">
          <Carousel ariaLabel="All categories" light slideClass="basis-[62%] sm:basis-[38%] lg:basis-[24%]">
            {categories.map((cat) => (
              <a key={cat.slug} href={`#${cat.slug}`} className="group block">
                <div className="relative bg-cream-light overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 62vw, 24vw"
                      className="object-contain p-6 transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                  </div>
                  <span className="pointer-events-none absolute inset-2.5 border border-gold/25 transition-colors duration-500 group-hover:border-gold/60" />
                </div>
                <h3 className="mt-5 text-cream text-sm font-bold text-center">{cat.name}</h3>
              </a>
            ))}
          </Carousel>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── Catalogue CTA ──────────────────────────────────────────────────── */
/* The three-point trust grid this section used to open with is now covered
   sitewide by <AssuranceBar />, rendered once above the footer on every page —
   this keeps just the unique conversion CTA that bar doesn't provide. */

function CatalogueCta() {
  return (
    <Section tone="cream">
      <Container>
        <Reveal>
          <div className="text-center">
            <Heading eyebrow="Our Promise" title="Every piece," accent="assured" center className="max-w-xl mx-auto" />
            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center gap-3 px-9 py-4 bg-burgundy text-cream text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-burgundy-dark transition-colors duration-300"
            >
              Request the Catalogue
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

export default function CollectionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Collections"
        title="Seven categories,"
        accent="one standard"
        intro="Rings, bracelets, pendants, earrings, necklaces and mangalsutras — each crafted in hallmarked fine gold and set with certified natural diamonds."
        image={withBase("/images/earrings-feature.webp")}
      />
      <CategoryIndex />
      {categories.map((cat, i) => (
        <CategoryRow key={cat.slug} cat={cat} index={i} />
      ))}
      <BrowseRail />
      <CatalogueCta />
    </>
  );
}
