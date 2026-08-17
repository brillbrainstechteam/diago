"use client";

import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import ProductDeck from "@/components/ProductDeck";
import VerticalShowcase from "@/components/VerticalShowcase";
import { deckCards } from "@/data/deckCards";
import {
  Container, Section, Reveal, Eyebrow, GoldRule, Heading, Prose, FramedImage,
} from "@/components/ui";
import { withBase } from "@/lib/basePath";

/* ── Hero ───────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative flex items-center surface-burgundy overflow-hidden">
      <div className="absolute inset-0 grain-gold opacity-[0.06]" />

      <Container className="relative z-10 pt-[calc(var(--nav-h)+1.75rem)] pb-16 lg:pt-[calc(var(--nav-h)+2.25rem)] lg:pb-20">
        {/* The portrait track needs a definite size: an `auto` track combined
            with a `w-full` child resolves circularly and collapses to zero. */}
        <div className="grid lg:grid-cols-[1fr_minmax(0,420px)] gap-12 lg:gap-16 items-center">
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

          <dl className="mt-11 flex flex-wrap gap-x-10 gap-y-6 animate-fade-in-up" style={{ animationDelay: "0.48s" }}>
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
            <Image
              src={withBase("/images/sparkle-motif.webp")}
              alt=""
              width={56}
              height={47}
              className="sparkle-spin pointer-events-none absolute -top-6 -right-6 w-12 h-auto z-10"
            />
            <div className="relative overflow-hidden" style={{ aspectRatio: "554 / 900" }}>
              {/* Cross-fading portrait slideshow. Three stacked slides share one
                  keyframe; each is offset by a third of the 18s cycle so one
                  fades in as the previous fades out. Only the first is priority-
                  loaded (it's the frame visible before the animation begins). */}
              {[
                { src: "/images/hero-model.webp", alt: "Model wearing a DIAGO diamond pendant and earrings" },
                { src: "/images/lifestyle-3.webp", alt: "Model wearing a DIAGO diamond necklace at work" },
                { src: "/images/lifestyle-2.webp", alt: "Model wearing DIAGO diamond earrings and pendant in the evening" },
              ].map((slide, i, arr) => (
                <div
                  key={slide.src}
                  className="hero-slide hero-slide-anim absolute inset-0"
                  style={{ animationDelay: `${-((arr.length - i) % arr.length) * (18 / arr.length)}s` }}
                >
                  <Image
                    src={withBase(slide.src)}
                    alt={slide.alt}
                    fill
                    // First slide is the LCP image (priority preload). The other
                    // two load eagerly but without the high-priority hint, so
                    // they're ready before the first crossfade (~4s) without
                    // competing with the LCP image.
                    priority={i === 0}
                    loading={i === 0 ? undefined : "eager"}
                    sizes="(max-width: 1024px) 340px, 420px"
                    className="object-cover"
                  />
                </div>
              ))}
              <span className="pointer-events-none absolute inset-3 border border-gold/30 z-10" />
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
    { t: "Certified Diamonds", d: "Every stone checked and graded." },
    { t: "Hallmarked Gold", d: "Purity guaranteed on every piece." },
    { t: "Light, Everyday Design", d: "Comfortable enough to wear daily." },
    { t: "Easy Exchange & Free Care", d: "Because jewellery should be worn, not worried about." },
  ];
  return (
    <Section tone="cream-light" className="!py-14 md:!py-16">
      <Container>
        <Reveal>
          <Heading eyebrow="Four Simple Promises" title="The DIAGO" accent="Promise" center className="max-w-xl mx-auto mb-10" />
        </Reveal>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 md:gap-10">
          {items.map((item, i) => (
            <Reveal key={item.t} delay={i * 120}>
              <div className="flex gap-4">
                <span className="text-gold text-xl leading-none pt-1 shrink-0">&#10022;</span>
                <div>
                  <h3 className="text-base font-bold text-burgundy leading-snug">{item.t}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-soft" style={{ fontFamily: "var(--font-serif)" }}>
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
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal>
            <div className="relative grid grid-cols-2 gap-5">
              <div className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,var(--gold-pale)_0%,transparent_70%)] opacity-70 blur-2xl" />
              <FramedImage
                src={withBase("/images/product-chain-pendant.webp")}
                alt="DIAGO diamond pendant in fine gold"
                ratio="4/5"
                fit="contain"
                inset
                className="shadow-[0_30px_60px_-25px_rgba(67,15,34,0.35)]"
              />
              <FramedImage
                src={withBase("/images/texture-diamonds.webp")}
                alt="Certified natural diamonds set in fine gold"
                ratio="4/5"
                inset
                corners={false}
                className="mt-10 shadow-[0_30px_60px_-25px_rgba(67,15,34,0.35)]"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Heading eyebrow="Our Story" title="Crafted with Care." accent="Worn with Confidence." />
            <p className="mt-6 text-burgundy text-lg italic" style={{ fontFamily: "var(--font-serif)" }}>
              The story of a house built on gold and trust.
            </p>
            <Prose className="mt-6">
              <p>
                DIAGO believes fine jewellery should move with you — not sit locked away for
                special occasions. Every piece is made with years of gold craftsmanship and
                certified diamonds, so quality is never just a promise. It&apos;s proven.
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
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
            <div>
              <Heading eyebrow="Signature Pieces" title="Signature" accent="Collection" light />
              <p className="mt-6 text-cream/85 text-[15px]" style={{ fontFamily: "var(--font-serif)" }}>
                Seven ways to wear DIAGO — find yours.
              </p>
            </div>
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
          <ProductDeck cards={deckCards} />
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

        <div className="mt-11 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
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

/* ── Shop by Occasion ──────────────────────────────────────────────── */

function ShopByOccasion() {
  const occasions = [
    { name: "At the Desk", src: withBase("/images/occasion-desk.webp"), href: "/collections#chain-pendants" },
    { name: "Date Night", src: withBase("/images/occasion-datenight.webp"), href: "/collections#pendant-sets" },
    { name: "Weekend Party", src: withBase("/images/occasion-weekend.webp"), href: "/collections#earrings" },
    { name: "Festive Season", src: withBase("/images/occasion-festive.webp"), href: "/collections#necklaces" },
    { name: "The Big Day", src: withBase("/images/occasion-bigday.webp"), href: "/collections#rings" },
  ];
  return (
    <Section tone="cream-light" id="shop-by-occasion">
      <Container>
        <Reveal>
          <Heading
            eyebrow="Find Your Moment"
            title="Shop by"
            accent="Occasion"
            center
            className="max-w-2xl mx-auto"
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-11">
            <Carousel ariaLabel="Shop by occasion" slideClass="basis-[38%] sm:basis-[26%] lg:basis-1/5">
              {occasions.map((o) => (
                <Link key={o.name} href={o.href} className="group flex flex-col items-center">
                  <div className="relative w-full aspect-square rounded-full overflow-hidden border border-gold/30">
                    <Image
                      src={o.src}
                      alt={`Shop DIAGO for ${o.name.toLowerCase()}`}
                      fill
                      sizes="(max-width: 640px) 38vw, 20vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                  </div>
                  <p className="mt-5 text-center text-burgundy text-[13px] font-semibold tracking-[0.08em]">
                    {o.name}
                  </p>
                </Link>
              ))}
            </Carousel>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── Gifting banner ─────────────────────────────────────────────────── */

function GiftingBanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="relative surface-burgundy flex items-center py-14 lg:py-20 order-2 lg:order-1">
          <div className="absolute inset-0 grain-gold opacity-[0.07]" />
          <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:pl-24">
            <Reveal>
              <Eyebrow light>Gifting</Eyebrow>
              <h2 className="mt-6 text-[2rem] sm:text-4xl lg:text-5xl font-bold leading-[1.1] text-cream">
                A gift and a
                <span className="block mt-2 font-normal italic text-gold-light" style={{ fontFamily: "var(--font-serif)" }}>
                  keepsake in one
                </span>
              </h2>
              <GoldRule light className="mt-7" />
              <p className="mt-7 text-[1.0625rem] leading-[1.85] text-cream/85 max-w-md" style={{ fontFamily: "var(--font-serif)" }}>
                Certified, hallmarked, and meaningful — a gift and a keepsake in one.
              </p>
              <Link
                href="/gifting"
                className="group mt-10 inline-flex items-center gap-3 px-9 py-4 bg-gold text-burgundy-deep text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-gold-light transition-colors duration-300"
              >
                Explore Gifting
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Fixed-height, relatively-positioned cell: the showcase fills it
            absolutely so the moving track can never stretch the banner. Six
            items guarantee one copy is taller than this window, so the loop
            never reveals empty space. */}
        <div className="relative min-h-[420px] lg:min-h-[520px] order-1 lg:order-2">
          <VerticalShowcase
            items={[
              { label: "Statement Rings", tagline: "The signature gesture", image: withBase("/images/deck-ring.webp") },
              { label: "Contemporary Necklaces", tagline: "Heritage, reframed", image: withBase("/images/deck-necklace.webp") },
              { label: "Daily-Wear Earrings", tagline: "Light enough to forget", image: withBase("/images/gift-earrings.webp") },
              { label: "Diamond Pendant Sets", tagline: "Gift-ready presentation", image: withBase("/images/product-pendant-sets.webp") },
              { label: "Lightweight Bracelets", tagline: "Movement, made brilliant", image: withBase("/images/product-bracelet.webp") },
              { label: "Mangalsutras", tagline: "Tradition, made contemporary", image: withBase("/images/product-mangalsutra.webp") },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

/* ── Retail CTA ─────────────────────────────────────────────────────── */

function RetailCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[340px] lg:min-h-[460px]">
          <Image
            src={withBase("/images/retail-packaging.webp")}
            alt="DIAGO retail packaging and display"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-burgundy-deep/25" />
        </div>

        <div className="relative surface-burgundy flex items-center py-14 lg:py-20">
          <div className="absolute inset-0 grain-gold opacity-[0.07]" />
          <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:pr-24">
            <Reveal>
              <Eyebrow light>For Retailers</Eyebrow>
              <h2 className="mt-6 text-[2rem] sm:text-4xl lg:text-5xl font-bold leading-[1.1] text-cream">
                Stock that <span className="animate-shimmer">sells itself</span>
                <span className="block mt-2 text-2xl sm:text-3xl font-normal italic text-cream/90" style={{ fontFamily: "var(--font-serif)" }}>
                  engineered for high turnover
                </span>
              </h2>
              <GoldRule light className="mt-7" />
              <p className="mt-7 text-[1.0625rem] leading-[1.85] text-cream/85 max-w-md" style={{ fontFamily: "var(--font-serif)" }}>
                Lightweight designs that sell fast — not sit on the shelf.
              </p>

              <ul className="mt-9 grid grid-cols-2 gap-x-6 gap-y-4 max-w-md">
                {["Signature categories", "Hallmarked stock", "Dedicated partner support", "High turnover potential"].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="text-gold text-xs leading-none pt-[6px] shrink-0">&#10022;</span>
                    <span className="text-[14px] text-cream/85" style={{ fontFamily: "var(--font-serif)" }}>{f}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-9 text-gold text-lg italic" style={{ fontFamily: "var(--font-serif)" }}>
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
      <ShopByOccasion />
      <GiftingBanner />
      <RetailCta />
    </>
  );
}
