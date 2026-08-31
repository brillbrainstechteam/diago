"use client";

import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import {
  Container, Section, Reveal, Eyebrow, GoldRule, Heading, Prose, FramedImage, PageHeader,
} from "@/components/ui";
import { withBase } from "@/lib/basePath";

/* ── Process ────────────────────────────────────────────────────────── */

/**
 * Each stage is illustrated by a macro of the stage's own evidence in a
 * finished piece — the drawn silhouette, a seated centre stone, the gold
 * gallery beneath it, the polished pave. Cut from the studio originals at
 * full resolution by scripts/process_catalogue.py's sibling crop pass.
 */
const steps = [
  {
    n: "01",
    t: "Design",
    d: "Every silhouette begins as a wearability problem, not a drawing. Weight, drape and how the piece behaves through a working day come before ornament.",
    img: "craft-design",
    alt: "Macro of a paisley pendant silhouette outlined in pave diamonds",
  },
  {
    n: "02",
    t: "Stone Selection",
    d: "Natural diamonds are sourced and graded for cut, colour, clarity and carat. Nothing simulated, nothing treated — each stone carries its certificate.",
    img: "craft-stone",
    alt: "Macro of an emerald-cut centre stone held in four gold prongs",
  },
  {
    n: "03",
    t: "Gold Work",
    d: "Fine gold is worked to hold the setting securely at the lowest viable weight, then hallmarked by BIS to certify purity before it leaves the bench.",
    img: "craft-gold",
    alt: "Macro of the fine gold gallery and prong work beneath a diamond fan",
  },
  {
    n: "04",
    t: "Finishing",
    d: "Polishing, clasp testing and a final inspection against the design spec. Only then does a piece enter the collection.",
    img: "craft-finish",
    alt: "Macro of a polished chandbali crescent set with graduated pave",
  },
];

function Process() {
  return (
    <Section tone="cream">
      <Container>
        <Reveal>
          <Heading eyebrow="How It's Made" title="Four stages, no" accent="shortcuts" center className="max-w-xl mx-auto" />
        </Reveal>

        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <article className="group relative text-center h-full">
                {/* Macro of the stage's evidence, framed to match the piece
                    cards elsewhere. The step number sits on the frame's lower
                    edge, which keeps the old numbered-sequence read without
                    needing a separate node row above it. */}
                <div className="relative">
                  <div className="relative aspect-square overflow-hidden border border-gold/25 border-t-2 border-t-gold bg-gradient-to-b from-cream-light to-cream shadow-[0_18px_38px_-28px_rgba(67,15,34,0.45)] transition-all duration-500 group-hover:border-gold/55">
                    <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,var(--gold-pale)_0%,transparent_72%)] opacity-55 transition-opacity duration-500 group-hover:opacity-80" />
                    <Image
                      src={withBase(`/images/craft/${s.img}.webp`)}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
                      className="relative object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                    />
                    <span className="pointer-events-none absolute inset-4 border border-gold/15 transition-colors duration-500 group-hover:border-gold/30" />
                  </div>
                  <span
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-cream border border-gold/45 text-gold-dark text-base font-bold shadow-[0_10px_24px_-12px_rgba(122,32,64,0.45)] transition-colors duration-500 group-hover:border-gold tabular-nums"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-11 text-xl font-bold text-burgundy">{s.t}</h3>
                <span className="mt-4 mx-auto block w-8 h-px bg-gold/60 transition-all duration-500 group-hover:w-14" />
                <p className="mt-4 text-[15px] leading-[1.8] text-ink-soft max-w-[15rem] mx-auto" style={{ fontFamily: "var(--font-serif)" }}>
                  {s.d}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ── Everyday elegance ──────────────────────────────────────────────── */

function EverydayElegance() {
  return (
    <Section tone="cream-light">
      <div className="absolute inset-0 grain-ink opacity-[0.025]" />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal>
            <Heading eyebrow="Everyday Luxury" title="Everyday elegance," accent="effortless radiance" />
            <Prose className="mt-8">
              <p>
                From boardroom presentations to evening celebrations, DIAGO jewellery moves
                seamlessly through the moments that matter. Lightweight, contemporary, and
                designed to complement every chapter rather than compete with it.
              </p>
              <p>
                Every piece is crafted for someone who values authenticity — real diamonds set
                in fine gold, made for real life rather than the safe deposit box.
              </p>
            </Prose>
          </Reveal>

          <Reveal delay={120}>
            <FramedImage
              src={withBase("/images/lifestyle-2.webp")}
              alt="Model wearing a DIAGO pendant and earrings"
              ratio="4/5"
              inset
              className="shadow-[0_30px_60px_-25px_rgba(67,15,34,0.35)]"
            />
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mt-11">
            <Carousel ariaLabel="Lifestyle photography" slideClass="basis-[70%] sm:basis-[42%] lg:basis-[31%]">
              {[
                { src: withBase("/images/lifestyle-1.webp"), cap: "At the desk" },
                { src: withBase("/images/lifestyle-3.webp"), cap: "Every morning" },
                { src: withBase("/images/lifestyle-2.webp"), cap: "After hours" },
                { src: withBase("/images/product-earring.webp"), cap: "Halo studs", contain: true },
              ].map((s) => (
                <figure key={s.cap} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark">
                    <Image
                      src={s.src}
                      alt={s.cap}
                      fill
                      sizes="(max-width: 640px) 70vw, 31vw"
                      className={`transition-transform duration-[1400ms] ease-out group-hover:scale-105 ${
                        s.contain ? "object-contain bg-white p-8" : "object-cover"
                      }`}
                    />
                    <span className="pointer-events-none absolute inset-4 border border-cream/30" />
                  </div>
                  <figcaption className="mt-4 text-center text-[10px] tracking-[0.26em] uppercase text-gold-dark">
                    {s.cap}
                  </figcaption>
                </figure>
              ))}
            </Carousel>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── Materials ──────────────────────────────────────────────────────── */

function Materials() {
  const specs = [
    { k: "Metal", v: "BIS hallmarked fine gold" },
    { k: "Stones", v: "Certified natural diamonds" },
    { k: "Grading", v: "Cut, colour, clarity, carat" },
    { k: "Weight", v: "Engineered for daily wear" },
    { k: "Settings", v: "Halo, pave, prong and bezel" },
    { k: "Service", v: "Lifetime cleaning & inspection" },
  ];
  return (
    <Section tone="burgundy">
      <div className="absolute inset-0 grain-gold opacity-[0.07]" />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal>
            <div className="relative">
              <span className="pointer-events-none absolute -top-4 -left-4 w-20 h-20 border-t border-l border-gold/60 z-10" />
              <span className="pointer-events-none absolute -bottom-4 -right-4 w-20 h-20 border-b border-r border-gold/60 z-10" />
              <div className="relative aspect-[4/5] overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]">
                <Image
                  src={withBase("/images/earrings-feature.webp")}
                  alt="Fine gold diamond earrings in close-up"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Heading eyebrow="Materials" title="What every piece" accent="is made of" light />
            <dl className="mt-10 divide-y divide-cream/10 border-y border-cream/10">
              {specs.map((s) => (
                <div key={s.k} className="py-4 flex items-baseline justify-between gap-6">
                  <dt className="text-gold/90 text-[10px] font-semibold tracking-[0.24em] uppercase shrink-0">
                    {s.k}
                  </dt>
                  <dd className="text-cream/85 text-[15px] text-right" style={{ fontFamily: "var(--font-serif)" }}>
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ── Retail magnet ──────────────────────────────────────────────────── */

function RetailMagnet() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="relative surface-cream flex items-center py-14 lg:py-20 order-2 lg:order-1">
          <div className="absolute inset-0 grain-ink opacity-[0.025]" />
          <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:pl-24">
            <Reveal>
              <Eyebrow>For Retailers</Eyebrow>
              <h2 className="mt-6 text-[2rem] sm:text-4xl lg:text-5xl font-bold leading-[1.1] text-burgundy">
                Built to sell,
                <span className="block mt-2 text-2xl sm:text-3xl font-normal italic text-gold-dark" style={{ fontFamily: "var(--font-serif)" }}>
                  not to sit on the shelf
                </span>
              </h2>
              <GoldRule className="mt-7" />

              <div className="mt-9 space-y-6">
                {[
                  { t: "Lightweight elegance", d: "Lower gold weight per piece keeps price points accessible." },
                  { t: "Modern aesthetics", d: "Designs that appeal to the buyer walking in today." },
                  { t: "High turnover potential", d: "Built for shelf mobility, not long display cycles." },
                ].map((b) => (
                  <div key={b.t} className="flex gap-4">
                    <span className="text-gold text-sm leading-none pt-1.5 shrink-0">&#10022;</span>
                    <div>
                      <h3 className="text-base font-bold text-burgundy">{b.t}</h3>
                      <p className="mt-1 text-[15px] text-ink-soft" style={{ fontFamily: "var(--font-serif)" }}>
                        {b.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="group mt-11 inline-flex items-center gap-3 px-9 py-4 bg-burgundy text-cream text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-burgundy-dark transition-colors duration-300"
              >
                Become a Partner
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="relative min-h-[340px] lg:min-h-[520px] order-1 lg:order-2">
          <Image
            src={withBase("/images/retail-packaging.webp")}
            alt="DIAGO retail packaging and counter display"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-burgundy-deep/20" />
        </div>
      </div>
    </section>
  );
}

/* ── At the bench ───────────────────────────────────────────────────── */

/**
 * The one bench photograph currently cleared for use. Two others were
 * supplied alongside it but carry stock-preview watermarks, so they are kept
 * in docs/generic_images/ rather than published — swap them in here once
 * licensed copies replace them.
 */
function AtTheBench() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[300px] lg:min-h-[460px]">
          <Image
            src={withBase("/images/craft/at-the-bench.webp")}
            alt="A jeweller setting diamonds into a gold pendant at the bench"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-burgundy-deep/15" />
        </div>

        <div className="relative surface-burgundy flex items-center py-14 lg:py-20">
          <div className="absolute inset-0 grain-gold opacity-[0.07]" />
          <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:pr-24">
            <Reveal>
              <Eyebrow light>At the Bench</Eyebrow>
              <h2 className="mt-6 text-[2rem] sm:text-4xl lg:text-5xl font-bold leading-[1.1] text-cream">
                Set by hand,
                <span className="block mt-2 font-normal italic text-gold-light" style={{ fontFamily: "var(--font-serif)" }}>
                  stone by stone
                </span>
              </h2>
              <GoldRule light className="mt-7" />
              <Prose light className="mt-7">
                <p>
                  Every stone is seated individually. A pave field is not printed
                  or cast — each grain is raised, the stone dropped in, and the
                  metal closed over it under magnification.
                </p>
                <p>
                  It is slow work, and it is the reason a DIAGO piece holds its
                  stones and its finish through years of daily wear.
                </p>
              </Prose>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CraftPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Craft"
        title="Made to be worn,"
        accent="not stored"
        intro="Certified stones, hallmarked gold and a design process that starts with wearability — here is what goes into a DIAGO piece before it reaches the counter."
        image={withBase("/images/lifestyle-1.webp")}
      />
      <Process />
      <AtTheBench />
      <EverydayElegance />
      <Materials />
      <RetailMagnet />
    </>
  );
}
