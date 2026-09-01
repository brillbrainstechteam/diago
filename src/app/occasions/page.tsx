"use client";

import Image from "next/image";
import Link from "next/link";
import PieceShowcase from "@/components/PieceShowcase";
import { moments } from "@/data/collections";
import {
  Container, Section, Reveal, Eyebrow, GoldRule, Heading, Prose, PageHeader,
} from "@/components/ui";
import { withBase } from "@/lib/basePath";

/* ── Index ──────────────────────────────────────────────────────────── */

function MomentIndex() {
  return (
    <Section tone="cream-light" className="!py-12 md:!py-14">
      <Container>
        <Reveal>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {moments.map((m) => (
              <li key={m.slug}>
                <a
                  href={`#${m.slug}`}
                  className="text-[11px] font-semibold tracking-[0.2em] uppercase text-burgundy/80 hover:text-burgundy transition-colors duration-300"
                >
                  {m.name}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── One moment, opened out ─────────────────────────────────────────── */

/**
 * The home page shows these three as tabs, one edit at a time. Here each is
 * given its own band with the photograph at full size and every piece on
 * show at once — the same three edits, read rather than browsed.
 */
function MomentBand({ moment, index }: { moment: (typeof moments)[number]; index: number }) {
  const flipped = index % 2 === 1;
  return (
    <div
      id={moment.slug}
      className={`scroll-mt-[calc(var(--nav-h)+2rem)] ${flipped ? "bg-cream-light" : "bg-cream"}`}
    >
      <Container>
        <div className="py-12 lg:py-16 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal className={flipped ? "lg:order-2" : ""}>
            <div className="relative group">
              <span className="pointer-events-none absolute -top-4 -left-4 w-20 h-20 border-t border-l border-gold/60 z-10" />
              <span className="pointer-events-none absolute -bottom-4 -right-4 w-20 h-20 border-b border-r border-gold/60 z-10" />
              <div className="relative aspect-[4/5] overflow-hidden shadow-[0_30px_60px_-25px_rgba(67,15,34,0.4)]">
                <Image
                  src={moment.image}
                  alt={`DIAGO jewellery worn ${moment.name.toLowerCase()}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-4 border border-cream/25" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={130} className={flipped ? "lg:order-1" : ""}>
            <span
              className="block text-gold-dark/80 text-5xl lg:text-6xl font-bold leading-none tabular-nums"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <p className="mt-6 text-[10px] font-semibold tracking-[0.3em] uppercase text-gold-dark">
              {moment.note}
            </p>

            <h2 className="mt-3 text-[1.75rem] sm:text-3xl lg:text-[2.5rem] font-bold leading-[1.12] text-burgundy">
              {moment.name}
            </h2>

            <GoldRule className="mt-6" />

            <Prose className="mt-7">
              <p>{moment.blurb}</p>
            </Prose>

            <p className="mt-7 text-burgundy text-lg italic" style={{ fontFamily: "var(--font-serif)" }}>
              {moment.editTitle} {moment.editAccent}.
            </p>

            <Link
              href="/contact"
              className="group mt-9 inline-flex items-center gap-3 text-burgundy text-[11px] font-bold tracking-[0.22em] uppercase hover:text-gold-dark transition-colors duration-300"
            >
              Enquire about this edit
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </Reveal>
        </div>

        <div className="pb-12 lg:pb-16">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="block w-8 h-px bg-gold" />
              <h3 className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gold-dark">
                {moment.pieces.length} pieces for {moment.name.toLowerCase()}
              </h3>
              <span className="hidden sm:block flex-1 h-px bg-gold/20" />
              <span className="hidden sm:block shrink-0 text-ink-soft/70 text-[10px] tracking-[0.18em] uppercase">
                Tap to enlarge
              </span>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <PieceShowcase pieces={moment.pieces} label={`Pieces for ${moment.name}`} className="mt-7" />
          </Reveal>
        </div>
      </Container>
    </div>
  );
}

/* ── Closing CTA ────────────────────────────────────────────────────── */

function BrowseAll() {
  return (
    <Section tone="burgundy">
      <div className="absolute inset-0 grain-gold opacity-[0.07]" />
      <Container className="relative z-10">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <Eyebrow light center>By Category</Eyebrow>
            <h2 className="mt-6 text-[2rem] sm:text-4xl lg:text-5xl font-bold leading-[1.12] text-cream">
              Prefer to browse
              <span className="block mt-2 font-normal italic text-gold-light" style={{ fontFamily: "var(--font-serif)" }}>
                by category
              </span>
            </h2>
            <GoldRule light center className="mt-7" />
            <p className="mt-8 text-[1.0625rem] leading-[1.85] text-cream/85" style={{ fontFamily: "var(--font-serif)" }}>
              The same range, sorted by what a piece is rather than when it is worn —
              rings, earrings, necklaces, pendant sets and mangalsutras.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/collections"
                className="group inline-flex items-center gap-3 px-9 py-4 bg-gold text-burgundy-deep text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-gold-light transition-colors duration-300"
              >
                All Collections
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
              <Link
                href="/contact#book-appointment"
                className="inline-flex items-center px-9 py-4 border border-cream/30 text-cream text-[11px] font-bold tracking-[0.22em] uppercase hover:border-gold hover:text-gold transition-colors duration-300"
              >
                Book an Appointment
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

export default function OccasionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop by Occasion"
        title="Three moments,"
        accent="three edits"
        intro="The same collection, sorted by when you would actually reach for it — at the desk, over coffee, or on the way out."
        image={withBase("/images/moment-cafe.webp")}
      />
      <MomentIndex />
      {moments.map((m, i) => (
        <MomentBand key={m.slug} moment={m} index={i} />
      ))}
      <BrowseAll />
    </>
  );
}
