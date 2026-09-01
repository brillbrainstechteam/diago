"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import PieceShowcase from "@/components/PieceShowcase";
import ProductDeck from "@/components/ProductDeck";
import { deckCards } from "@/data/deckCards";
import { moments } from "@/data/collections";
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
            {/* A single portrait rather than the cross-fading slideshow this
                held. The only other portrait-ratio photography in the library
                is the brochure's three "Everyday Elegance" frames, which now
                belong to the moments section further down — and rotating the
                same faces in two places is what made the page feel repetitive.
                One frame also makes for a cleaner LCP. */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "554 / 900" }}>
              <Image
                src={withBase("/images/hero-model.webp")}
                alt="Model wearing a DIAGO diamond pendant and earrings"
                fill
                priority
                sizes="(max-width: 1024px) 340px, 420px"
                className="object-cover"
              />
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
    {
      t: "Certified Diamonds",
      d: "Every stone checked and graded.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 3 4 9l8 12 8-12-8-6Z" />
          <path d="M4 9h16M9.5 9 12 3l2.5 6M12 21 9.5 9m2.5 12 2.5-12" strokeWidth="0.9" />
        </svg>
      ),
    },
    {
      t: "Hallmarked Gold",
      d: "Purity guaranteed on every piece.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 3l7 3v5c0 4.6-3 7.6-7 9-4-1.4-7-4.4-7-9V6l7-3Z" />
          <path d="m9 12 2 2 4-4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      t: "Light, Everyday Design",
      d: "Comfortable enough to wear daily.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" className="w-6 h-6">
          <path d="M5 21c0-9 7-16 16-16 0 9-7 16-16 16Z" />
          <path d="M5 21 14 12" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      t: "Easy Exchange & Free Care",
      d: "Because jewellery should be worn, not worried about.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8" />
          <path d="M20 3.5V8h-4.5" />
          <path d="M20 12a8 8 0 0 1-13.7 5.6L4 16" />
          <path d="M4 20.5V16h4.5" />
        </svg>
      ),
    },
  ];
  return (
    <Section tone="cream-light" className="!py-16 md:!py-20">
      <Container>
        <Reveal>
          <Heading eyebrow="Four Simple Promises" title="The DIAGO" accent="Promise" center className="max-w-xl mx-auto mb-12" />
        </Reveal>
        {/* Light cards, but lit rather than flat. The burgundy version these
            replaced was heavy against a cream section, and the plain cream one
            before it left the gold with nothing to sit against. The answer is
            a diagonal warm gradient with a gold seam and a pale-gold pool
            behind the icon, and `gold-dark` for the icon stroke — the token
            that exists precisely because metallic gold is too pale to read on
            cream. */}
        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.t} delay={i * 120} className="h-full">
              <article className="group relative h-full flex flex-col overflow-hidden bg-gradient-to-br from-white via-cream-light to-cream-dark border border-gold/30 shadow-[0_18px_40px_-30px_rgba(122,32,64,0.45)] transition-all duration-500 hover:border-gold/65 hover:shadow-[0_30px_58px_-28px_rgba(122,32,64,0.5)] hover:-translate-y-1.5">
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-gold/15 via-gold to-gold/15" />
                {/* Warm pool rising from the base, so the card is not one even
                    wash of cream from top to bottom. */}
                <span className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 w-[150%] h-44 bg-[radial-gradient(closest-side,rgba(197,165,90,0.16)_0%,transparent_72%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="pointer-events-none absolute top-3 left-3 w-5 h-5 border-t border-l border-gold/30 transition-colors duration-500 group-hover:border-gold/70" />
                <span className="pointer-events-none absolute bottom-3 right-3 w-5 h-5 border-b border-r border-gold/30 transition-colors duration-500 group-hover:border-gold/70" />

                <div className="relative z-10 flex flex-col items-center text-center px-6 pt-9 pb-8 lg:px-7">
                  <span className="text-gold-dark/45 text-[10px] font-bold tracking-[0.3em] tabular-nums" style={{ fontFamily: "var(--font-display)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="relative mt-5 w-16 h-16 flex items-center justify-center">
                    <span className="pointer-events-none absolute -inset-1 rounded-full bg-[radial-gradient(closest-side,var(--gold-pale)_0%,transparent_74%)] opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute inset-0 rounded-full border border-gold/50 transition-all duration-500 group-hover:border-gold group-hover:scale-105" />
                    <span className="absolute inset-[7px] rounded-full border border-gold/25 transition-colors duration-500 group-hover:border-gold/45" />
                    <span className="relative text-gold-dark transition-transform duration-500 group-hover:scale-110">
                      {item.icon}
                    </span>
                  </span>

                  <h3 className="mt-6 text-burgundy text-[14px] font-bold leading-snug tracking-[0.12em] uppercase">
                    {item.t}
                  </h3>
                  <span className="mt-3.5 block w-8 h-px bg-gold/60 transition-all duration-500 group-hover:w-16" />
                  <p className="mt-3.5 text-[14px] leading-[1.75] text-ink-soft" style={{ fontFamily: "var(--font-serif)" }}>
                    {item.d}
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

/* ── About teaser ───────────────────────────────────────────────────── */

function AboutTeaser() {
  return (
    <Section tone="cream-light">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Craft first, wearer second — which is the order the heading reads
              in. The two model portraits that stood here were the same face on
              the same burgundy as the hero directly above, so the section
              looked like a reprise of it. The bench shot is the only
              photograph on the site of the making, and it is what "crafted
              with care" is actually claiming. */}
          <Reveal>
            <div className="relative grid grid-cols-2 gap-5">
              <div className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,var(--gold-pale)_0%,transparent_70%)] opacity-70 blur-2xl" />
              <FramedImage
                src={withBase("/images/bench-setting.webp")}
                alt="A diamond being set into a gold mount with tweezers, loose stones alongside"
                ratio="4/5"
                inset
                className="shadow-[0_30px_60px_-25px_rgba(67,15,34,0.35)]"
              />
              <FramedImage
                src={withBase("/images/editorial-necklace.webp")}
                alt="A fine gold diamond necklace and matching earrings worn on satin"
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

/* ── Styled for every moment ───────────────────────────────────────── */

/**
 * The three moments from the brochure's "Everyday Elegance / Effortless
 * Radiance" spread, with that spread's own photography, each opening its own
 * grouping of pieces.
 *
 * This replaces two separate sections — a five-piece "one from each category"
 * row and a five-circle occasion rail. The rail's circles showed single
 * products, which answered "what is it" but not "when would I wear it", and
 * the featured row restated a selection the groupings already cover. One
 * section now does both jobs: pick the moment, see what suits it.
 */
function StyledForMoments() {
  const [active, setActive] = useState(0);
  const moment = moments[active];

  return (
    <Section tone="cream-light" id="shop-by-occasion">
      <Container>
        <Reveal>
          <Heading
            eyebrow="Find Your Moment"
            title="Everyday elegance,"
            accent="effortless radiance"
            center
            className="max-w-2xl mx-auto"
          />
          <p className="mt-6 text-center text-[1.0625rem] leading-[1.85] text-ink-soft max-w-xl mx-auto" style={{ fontFamily: "var(--font-serif)" }}>
            Three moments, three edits of the collection. Choose one to see the
            pieces made for it.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div
            role="tablist"
            aria-label="Moments"
            className="mt-11 grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {moments.map((m, i) => {
              const on = i === active;
              return (
                <button
                  key={m.slug}
                  role="tab"
                  id={`moment-tab-${m.slug}`}
                  aria-selected={on}
                  aria-controls={`moment-panel-${m.slug}`}
                  onClick={() => setActive(i)}
                  className="group text-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream-light"
                >
                  <span
                    className={`relative block w-full aspect-[3/4] overflow-hidden border transition-all duration-500 ${
                      on
                        ? "border-gold shadow-[0_26px_50px_-24px_rgba(122,32,64,0.55)]"
                        : "border-gold/25 shadow-[0_16px_32px_-26px_rgba(122,32,64,0.4)] group-hover:border-gold/60"
                    }`}
                  >
                    <Image
                      src={m.image}
                      alt={`DIAGO jewellery worn ${m.name.toLowerCase()}`}
                      fill
                      sizes="(max-width: 640px) 31vw, 30vw"
                      className={`object-cover transition-all duration-[1200ms] ease-out group-hover:scale-105 ${
                        on ? "" : "saturate-[0.75] opacity-80 group-hover:opacity-100"
                      }`}
                    />
                    {/* The selected card keeps a burgundy scrim so its label
                        stays legible; the others simply sit back. */}
                    <span
                      className={`pointer-events-none absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-burgundy-deep/70 via-burgundy-deep/10 to-transparent ${
                        on ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                      }`}
                    />
                    <span className={`pointer-events-none absolute inset-3 border transition-colors duration-500 ${on ? "border-cream/30" : "border-cream/15"}`} />
                  </span>

                  <span className={`mt-4 block text-[15px] font-bold transition-colors duration-300 ${on ? "text-burgundy" : "text-burgundy/70 group-hover:text-burgundy"}`}>
                    {m.name}
                  </span>
                  <span className="mt-1 block text-gold-dark text-[10px] tracking-[0.18em] uppercase">{m.note}</span>
                  {/* Says out loud that the card does something. Without it the
                      three read as decorative headers and the edit below them
                      looks like the only content on the section. */}
                  <span
                    className={`mt-2.5 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
                      on ? "text-burgundy" : "text-gold-dark/70 group-hover:text-burgundy"
                    }`}
                  >
                    {on ? "Showing this edit" : "View this edit"}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </span>
                  <span
                    className={`mt-3 mx-auto block h-px bg-gold transition-all duration-500 ${on ? "w-14" : "w-0 group-hover:w-8"}`}
                  />
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          role="tabpanel"
          id={`moment-panel-${moment.slug}`}
          aria-labelledby={`moment-tab-${moment.slug}`}
        >
          {/* Named so the pieces below read as a titled edit rather than an
              unlabelled tray hanging off the tabs. Keyed on the moment so the
              rule and title redraw with the row when the edit changes. */}
          <div key={`${moment.slug}-head`} className="mt-14 text-center animate-tile-in">
            <div className="flex items-center justify-center gap-4">
              <span className="block w-10 sm:w-16 h-px bg-gradient-to-r from-transparent to-gold/60" />
              <span className="text-gold-dark text-[10px] font-semibold tracking-[0.3em] uppercase">
                The New Collection
              </span>
              <span className="block w-10 sm:w-16 h-px bg-gradient-to-l from-transparent to-gold/60" />
            </div>
            <h3 className="mt-4 text-[1.5rem] sm:text-3xl font-bold text-burgundy leading-tight">
              {moment.editTitle}{" "}
              <span className="font-normal italic text-gold-dark" style={{ fontFamily: "var(--font-serif)" }}>
                {moment.editAccent}
              </span>
            </h3>
            <p
              className="mt-5 text-[1.0625rem] leading-[1.85] text-ink-soft max-w-xl mx-auto"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {moment.blurb}
            </p>
          </div>

          {/* Keyed on the moment so switching remounts the grid: without it
              React reuses the tiles and the images cross-fade into each other. */}
          <PieceShowcase
            key={moment.slug}
            pieces={moment.pieces}
            label={`Pieces for ${moment.name}`}
            className="mt-11"
          />
        </div>

        <Reveal delay={160}>
          <div className="mt-12 text-center">
            <Link
              href="/collections"
              className="group inline-flex items-center gap-3 px-9 py-4 border border-burgundy/40 text-burgundy text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-burgundy hover:text-cream hover:border-burgundy transition-colors duration-300"
            >
              See the full range
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
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

        {/* One photograph, full bleed.
            The three-tile collage that stood here put burgundy packaging shots
            on a burgundy panel behind a burgundy scrim: everything landed in
            the same narrow tonal band and the box and bag read as dark smudges.
            Cropping the frames smaller only made it worse. A single image at
            full size, matched to how the retail band below already works, has
            the contrast the subject needs and stays quiet next to the copy. */}
        <div className="relative order-1 lg:order-2 min-h-[340px] lg:min-h-[520px]">
          <Image
            src={withBase("/images/gift-boxed.webp")}
            alt="Diamond studs in a ribboned gift box beside a handwritten card"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-burgundy-deep/10" />
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
        {/* The display is shot on burgundy, so the copy panel beside it is
            cream rather than burgundy — set against its own colour the frame
            just merged into the panel. It also breaks up what was three
            burgundy blocks running into the footer. `object-left` keeps the
            necklace in frame; centring it cropped to the carry bag. */}
        <div className="relative min-h-[340px] lg:min-h-[500px]">
          <Image
            src={withBase("/images/gift-presentation.webp")}
            alt="A DIAGO necklace on its counter display beside the signature box and bag"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-left"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-burgundy-deep/10 to-burgundy-deep/25" />
        </div>

        <div className="relative surface-cream flex items-center py-14 lg:py-20">
          <div className="absolute inset-0 grain-ink opacity-[0.025]" />
          <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:pr-24">
            <Reveal>
              <Eyebrow>For Retailers</Eyebrow>
              <h2 className="mt-6 text-[2rem] sm:text-4xl lg:text-5xl font-bold leading-[1.1] text-burgundy">
                Stock that{" "}
                <span className="font-normal italic text-gold-dark" style={{ fontFamily: "var(--font-serif)" }}>
                  sells itself
                </span>
                <span className="block mt-2 text-2xl sm:text-3xl font-normal italic text-ink-soft" style={{ fontFamily: "var(--font-serif)" }}>
                  engineered for high turnover
                </span>
              </h2>
              <GoldRule className="mt-7" />
              <p className="mt-7 text-[1.0625rem] leading-[1.85] text-ink-soft max-w-md" style={{ fontFamily: "var(--font-serif)" }}>
                Lightweight designs that sell fast — not sit on the shelf.
              </p>

              <ul className="mt-9 grid grid-cols-2 gap-x-6 gap-y-4 max-w-md">
                {["Signature categories", "Hallmarked stock", "Dedicated partner support", "High turnover potential"].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="text-gold-dark text-xs leading-none pt-[6px] shrink-0">&#10022;</span>
                    <span className="text-[14px] text-ink-soft" style={{ fontFamily: "var(--font-serif)" }}>{f}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-9 text-burgundy text-lg italic" style={{ fontFamily: "var(--font-serif)" }}>
                Your showroom is the next.
              </p>
              <Link
                href="/contact"
                className="group mt-10 inline-flex items-center gap-3 px-9 py-4 bg-burgundy text-cream text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-burgundy-dark transition-colors duration-300"
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
      <StyledForMoments />
      <GiftingBanner />
      <RetailCta />
    </>
  );
}
