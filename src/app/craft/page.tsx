"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Container, Section, Reveal, Eyebrow, GoldRule, Heading, Prose, FramedImage, PageHeader,
} from "@/components/ui";
import { withBase } from "@/lib/basePath";

/* ── Process ────────────────────────────────────────────────────────── */

/**
 * Deliberately unillustrated for now.
 *
 * These four stages need photographs OF the stage — a bench, a grading loupe,
 * a torch, a polishing wheel. A macro crop of a finished ring is not a picture
 * of gold work, and standing one in as though it were misrepresents the
 * process. Drop four licensed process photographs into public/images/craft/
 * and give each step an `img`, then restore the framed tile in the article
 * below (see the At the Bench section for the treatment).
 */
const steps = [
  {
    n: "01",
    t: "Design",
    d: "Every silhouette begins as a wearability problem, not a drawing. Weight, drape and how the piece behaves through a working day come before ornament.",
  },
  {
    n: "02",
    t: "Stone Selection",
    d: "Natural diamonds are sourced and graded for cut, colour, clarity and carat. Nothing simulated, nothing treated — each stone carries its certificate.",
  },
  {
    n: "03",
    t: "Gold Work",
    d: "Fine gold is worked to hold the setting securely at the lowest viable weight, then hallmarked by BIS to certify purity before it leaves the bench.",
  },
  {
    n: "04",
    t: "Finishing",
    d: "Polishing, clasp testing and a final inspection against the design spec. Only then does a piece enter the collection.",
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
                {/* Circle node row. The connector segment is anchored to THIS
                    flex box — the same box the circle sits in — so the line is
                    always exactly on the circle's centre-line, regardless of any
                    grid offset. Each step (except the first) draws a segment
                    back to the previous node, edge-to-edge so it clears both
                    circles. Desktop only. */}
                <div className="relative flex justify-center h-16">
                  {i > 0 && (
                    <span className="hidden lg:block absolute top-1/2 -translate-y-1/2 h-px right-[calc(50%+2rem)] w-[calc(100%-2rem)] bg-gradient-to-l from-gold/50 to-gold/30" />
                  )}
                  <span
                    className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-cream border border-gold/45 text-gold-dark text-lg font-bold shadow-[0_10px_24px_-12px_rgba(122,32,64,0.4)] transition-all duration-500 group-hover:border-gold group-hover:-translate-y-0.5 tabular-nums"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.n}
                    <span className="absolute -inset-1.5 rounded-full border border-gold/20 transition-colors duration-500 group-hover:border-gold/40" />
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-bold text-burgundy">{s.t}</h3>
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
 * Uses the 3784x5676 bench frame from the images_Web drop, which is sharp
 * enough to run full width. The earlier 768px crop it replaced is retired.
 */
function AtTheBench() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[300px] lg:min-h-[460px]">
          <Image
            src={withBase("/images/bench-wide.webp")}
            alt="A jeweller working a gold band at the bench under a torch"
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
        image={withBase("/images/occasion-desk.webp")}
      />
      <Process />
      <AtTheBench />
      <Materials />
      <RetailMagnet />
    </>
  );
}
