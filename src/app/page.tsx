"use client";

import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import { categories } from "@/data/collections";
import {
  Container, Section, Reveal, Eyebrow, GoldRule, Heading, Prose, FramedImage,
} from "@/components/ui";
import { withBase } from "@/lib/basePath";

/* ── Hero ───────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative flex items-center surface-burgundy overflow-hidden">
      <div className="absolute inset-0 grain-gold opacity-[0.06]" />

      <Container className="relative z-10 pt-[calc(var(--nav-h)+2.5rem)] pb-16 lg:pt-[calc(var(--nav-h)+3.5rem)] lg:pb-20">
        {/* The portrait track needs a definite size: an `auto` track combined
            with a `w-full` child resolves circularly and collapses to zero. */}
        <div className="grid lg:grid-cols-[1fr_minmax(0,420px)] gap-14 lg:gap-16 items-center">
        <div className="max-w-xl">
          <div className="animate-fade-in-up">
            <Eyebrow light>Fine Gold × Natural Diamonds</Eyebrow>
          </div>

          <h1
            className="mt-7 text-[2.75rem] sm:text-6xl lg:text-7xl font-bold leading-[1.04] text-cream animate-fade-in-up"
            style={{ animationDelay: "0.12s" }}
          >
            Redefining <span className="animate-shimmer">Gold</span>
            <span className="block mt-2 text-[1.75rem] sm:text-4xl lg:text-[2.75rem] font-normal italic text-cream/85" style={{ fontFamily: "var(--font-serif)" }}>
              for the Modern Era
            </span>
          </h1>

          <p
            className="mt-8 text-lg leading-[1.8] text-cream/85 max-w-md animate-fade-in-up"
            style={{ fontFamily: "var(--font-serif)", animationDelay: "0.24s" }}
          >
            Jewellery built for the way you actually live — lightweight, certified,
            and made to be worn every day rather than kept for occasions.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.36s" }}>
            <Link
              href="/collections"
              className="group inline-flex items-center gap-3 px-9 py-4 bg-gold text-burgundy-deep text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-gold-light transition-colors duration-300"
            >
              Explore Collections
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-9 py-4 border border-cream/30 text-cream text-[11px] font-bold tracking-[0.22em] uppercase hover:border-gold hover:text-gold transition-colors duration-300"
            >
              Our Story
            </Link>
          </div>

          <dl className="mt-16 flex flex-wrap gap-x-10 gap-y-6 animate-fade-in-up" style={{ animationDelay: "0.48s" }}>
            {[
              { v: "100%", l: "Certified diamonds" },
              { v: "BIS", l: "Hallmarked gold" },
              { v: "7", l: "Signature categories" },
            ].map((s) => (
              <div key={s.l} className="pl-5 border-l border-gold/30">
                <dt className="text-gold text-2xl sm:text-3xl font-bold leading-none" style={{ fontFamily: "var(--font-display)" }}>
                  {s.v}
                </dt>
                <dd className="mt-2 text-cream/85 text-[10px] tracking-[0.2em] uppercase">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

          {/* Framed portrait. The container's aspect ratio matches the source
              crop (554×900) exactly, so object-cover never clips the pendant. */}
          <div className="relative mx-auto lg:mx-0 w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[420px] animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <span className="pointer-events-none absolute -top-4 -left-4 w-24 h-24 border-t border-l border-gold/70 z-10" />
            <span className="pointer-events-none absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-gold/70 z-10" />
            <div className="relative overflow-hidden" style={{ aspectRatio: "554 / 900" }}>
              <Image
                src={withBase("/images/hero-model.webp")}
                alt="Model wearing a DIAGO diamond pendant and earrings"
                fill
                priority
                sizes="(max-width: 1024px) 340px, 420px"
                className="object-cover"
              />
              <span className="pointer-events-none absolute inset-3 border border-gold/30" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── Proposition strip ──────────────────────────────────────────────── */

function Proposition() {
  const items = [
    { t: "Fine Gold", d: "BIS hallmarked, certifying purity on every single piece." },
    { t: "Natural Diamonds", d: "Graded and certified for cut, colour, clarity and carat." },
    { t: "Modern Design", d: "Lightweight silhouettes built for daily wear, not the locker." },
  ];
  return (
    <Section tone="cream-light" className="!py-14 md:!py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-3 md:gap-14">
          {items.map((item, i) => (
            <Reveal key={item.t} delay={i * 120}>
              <div className="flex gap-5">
                <span className="text-gold text-xl leading-none pt-1 shrink-0">&#10022;</span>
                <div>
                  <h3 className="text-lg font-bold text-burgundy">{item.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft" style={{ fontFamily: "var(--font-serif)" }}>
                    {item.d}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ── About teaser ───────────────────────────────────────────────────── */

function AboutTeaser() {
  return (
    <Section tone="cream-light">
      <Container>
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <Reveal>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,var(--gold-pale)_0%,transparent_70%)] opacity-70 blur-2xl" />
              <FramedImage
                src={withBase("/images/product-chain-pendant.webp")}
                alt="DIAGO diamond pendant in fine gold"
                ratio="4/5"
                fit="contain"
                inset
                className="shadow-[0_30px_60px_-25px_rgba(67,15,34,0.35)]"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Heading eyebrow="Our Story" title="A house built on" accent="authenticity" />
            <Prose className="mt-8">
              <p>
                DIAGO redefines gold jewellery for the modern consumer by pairing fine gold
                artistry with the authentic brilliance of certified natural diamonds — crafted
                by Dishaa in strategic alliance with INDRA.
              </p>
              <p>
                Every creation is engineered for lightweight elegance and contemporary
                aesthetics, bridging traditional gold reverence with the way people dress today.
              </p>
            </Prose>
            <Link
              href="/about"
              className="group mt-10 inline-flex items-center gap-3 text-burgundy text-[11px] font-bold tracking-[0.22em] uppercase hover:text-gold-dark transition-colors duration-300"
            >
              Read the full story
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ── Collections rail ───────────────────────────────────────────────── */

function CollectionsRail() {
  return (
    <Section tone="burgundy">
      <div className="absolute inset-0 grain-gold opacity-[0.07]" />
      <Container className="relative z-10">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
            <Heading eyebrow="Signature Pieces" title="Explore the" accent="Collections" light />
            <Link
              href="/collections"
              className="group shrink-0 inline-flex items-center gap-3 text-gold text-[11px] font-bold tracking-[0.22em] uppercase hover:text-gold-light transition-colors duration-300"
            >
              View all seven
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <Carousel ariaLabel="Product collections" light slideClass="basis-[78%] sm:basis-[46%] lg:basis-[31%]">
            {categories.map((cat) => (
              <Link key={cat.slug} href="/collections" className="group block">
                <div className="relative bg-cream-light overflow-hidden">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 78vw, 31vw"
                      className="object-contain p-8 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                    />
                  </div>
                  <span className="pointer-events-none absolute inset-3 border border-gold/25 transition-colors duration-500 group-hover:border-gold/60" />
                </div>
                <div className="mt-6">
                  <p className="text-gold/90 text-[10px] tracking-[0.24em] uppercase">{cat.tagline}</p>
                  <h3 className="mt-2 text-cream text-lg font-bold">{cat.name}</h3>
                  <span className="mt-3 block w-8 h-px bg-gold/50 transition-all duration-500 group-hover:w-16" />
                </div>
              </Link>
            ))}
          </Carousel>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── Lifestyle band ─────────────────────────────────────────────────── */

function Lifestyle() {
  const shots = [
    { src: withBase("/images/lifestyle-1.webp"), cap: "At the desk" },
    { src: withBase("/images/lifestyle-2.webp"), cap: "After hours" },
    { src: withBase("/images/lifestyle-3.webp"), cap: "Every morning" },
  ];
  return (
    <Section tone="cream">
      <Container>
        <Reveal>
          <Heading
            eyebrow="Everyday Luxury"
            title="Everyday elegance,"
            accent="effortless radiance"
            center
            className="max-w-2xl mx-auto"
          />
          <p className="mt-7 text-center text-[1.0625rem] leading-[1.85] text-ink-soft max-w-xl mx-auto" style={{ fontFamily: "var(--font-serif)" }}>
            From the first meeting of the day to the last table of the evening —
            pieces light enough to forget you are wearing them.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {shots.map((s, i) => (
            <Reveal key={s.src} delay={i * 140}>
              <figure className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark">
                  <Image
                    src={s.src}
                    alt={`DIAGO jewellery worn ${s.cap.toLowerCase()}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                  <span className="pointer-events-none absolute inset-4 border border-cream/25" />
                </div>
                <figcaption className="mt-4 text-center text-[10px] tracking-[0.26em] uppercase text-gold-dark">
                  {s.cap}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ── Retail CTA ─────────────────────────────────────────────────────── */

function RetailCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[340px] lg:min-h-[540px]">
          <Image
            src={withBase("/images/retail-packaging.webp")}
            alt="DIAGO retail packaging and display"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-burgundy-deep/25" />
        </div>

        <div className="relative surface-burgundy flex items-center py-20 lg:py-28">
          <div className="absolute inset-0 grain-gold opacity-[0.07]" />
          <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:pr-24">
            <Reveal>
              <Eyebrow light>For Retailers</Eyebrow>
              <h2 className="mt-6 text-[2rem] sm:text-4xl lg:text-5xl font-bold leading-[1.1] text-cream">
                The golden <span className="animate-shimmer">magnet</span>
                <span className="block mt-2 text-2xl sm:text-3xl font-normal italic text-cream/90" style={{ fontFamily: "var(--font-serif)" }}>
                  for high-velocity retail
                </span>
              </h2>
              <GoldRule light className="mt-7" />
              <p className="mt-7 text-[1.0625rem] leading-[1.85] text-cream/85 max-w-md" style={{ fontFamily: "var(--font-serif)" }}>
                Lightweight designs with genuine shelf mobility and high turnover
                potential — engineered to move off the counter, not sit on it.
              </p>
              <p className="mt-8 text-gold text-lg italic" style={{ fontFamily: "var(--font-serif)" }}>
                Your showroom is the next.
              </p>
              <Link
                href="/contact"
                className="group mt-10 inline-flex items-center gap-3 px-9 py-4 bg-gold text-burgundy-deep text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-gold-light transition-colors duration-300"
              >
                Become a Partner
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Proposition />
      <AboutTeaser />
      <CollectionsRail />
      <Lifestyle />
      <RetailCta />
    </>
  );
}
