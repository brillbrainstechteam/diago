"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Container, Section, Reveal, Eyebrow, GoldRule, Heading, Prose, FramedImage, PageHeader,
} from "@/components/ui";
import { withBase } from "@/lib/basePath";

/* ── Story ──────────────────────────────────────────────────────────── */

function Story() {
  return (
    <Section tone="cream-light">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,var(--gold-pale)_0%,transparent_70%)] opacity-70 blur-2xl" />
              <FramedImage
                src={withBase("/images/texture-diamonds.webp")}
                alt="Loose certified diamonds on a gold thread"
                ratio="4/5"
                inset
                className="shadow-[0_30px_60px_-25px_rgba(67,15,34,0.35)]"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Heading eyebrow="The Brand" title="Gold, rewritten for" accent="how we live now" />
            <Prose className="mt-8">
              <p>
                DIAGO redefines gold jewellery for the modern consumer by pairing fine gold
                artistry with the authentic brilliance of certified natural diamonds. Crafted by
                Dishaa in a strategic alliance with INDRA, the house bridges traditional gold
                reverence with contemporary luxury.
              </p>
              <p>
                Where heritage jewellery was made to be stored, DIAGO is made to be worn. Every
                creation offers lightweight elegance and modern aesthetics — designed for fast
                retail shelf mobility and genuine high turnover potential at the counter.
              </p>
            </Prose>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ── Pillars ────────────────────────────────────────────────────────── */

const pillars = [
  {
    n: "01",
    title: "Fine Gold",
    body: "Exquisite gold craftsmanship that honours tradition while embracing contemporary design. Every piece carries the BIS hallmark, certifying metal purity to Indian standards.",
    image: withBase("/images/finegold-band.webp"),
  },
  {
    n: "02",
    title: "Certified Natural Diamonds",
    body: "Every diamond is graded and certified for cut, colour, clarity and carat — never simulated, never treated. Brilliance that holds its value across generations.",
    image: withBase("/images/diamond-solo.webp"),
  },
  {
    n: "03",
    title: "Magic of the Modern Era",
    body: "Where timeless artistry meets modern luxury — designs that speak to the contemporary soul while honouring heritage. Lightweight, wearable, unmistakably elegant.",
    image: withBase("/images/sparkle-motif.webp"),
  },
];

function Pillars() {
  return (
    <Section tone="cream-light">
      <div className="absolute inset-0 grain-ink opacity-[0.025]" />
      <Container className="relative z-10">
        <Reveal>
          <Heading eyebrow="What We Stand For" title="Three" accent="core pillars" center className="max-w-xl mx-auto" />
        </Reveal>

        <div className="mt-12 grid gap-px bg-gold/25 md:grid-cols-3 border border-gold/25 overflow-hidden">
          {pillars.map((p, i) => (
            <Reveal key={p.n} delay={i * 130}>
              <article className="relative h-full bg-cream-light p-9 lg:p-11 text-center group overflow-hidden">
                {/* Oversized faint numeral watermark in the corner */}
                <span
                  className="pointer-events-none absolute top-3 right-5 text-6xl font-bold leading-none text-gold/15 select-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {p.n}
                </span>

                {/* Medallion: icon inside a gold ring with a soft glow */}
                <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full border border-gold/40 transition-colors duration-500 group-hover:border-gold/70" />
                  <span className="pointer-events-none absolute inset-1 rounded-full bg-[radial-gradient(closest-side,var(--gold-pale)_0%,transparent_72%)] opacity-70" />
                  <span className="relative w-11 h-11 transition-transform duration-700 group-hover:scale-110">
                    <Image src={p.image} alt="" fill sizes="44px" className="object-contain" />
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold text-burgundy leading-snug">{p.title}</h3>
                <span className="mt-4 mx-auto block w-9 h-px bg-gold transition-all duration-500 group-hover:w-16" />
                <p className="mt-4 text-[15px] leading-[1.8] text-ink-soft" style={{ fontFamily: "var(--font-serif)" }}>
                  {p.body}
                </p>

                {/* Gold underline sweeps in on hover */}
                <span className="pointer-events-none absolute left-0 bottom-0 h-[3px] w-0 bg-gold/70 transition-all duration-500 group-hover:w-full" />
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ── Alliance ───────────────────────────────────────────────────────── */

function Alliance() {
  return (
    <Section tone="burgundy">
      <div className="absolute inset-0 grain-gold opacity-[0.07]" />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal>
            <Heading eyebrow="The Alliance" title="Crafted by Dishaa," accent="in alliance with INDRA" light />
            <Prose light className="mt-8">
              <p>
                DIAGO is the product of two disciplines meeting. Dishaa brings decades of gold and
                platinum expertise and a distribution network that reaches India&apos;s most
                established showrooms. INDRA brings the design language.
              </p>
              <p>
                Together they produce jewellery that satisfies the traditional buyer&apos;s
                expectations of purity and the modern buyer&apos;s expectations of wearability.
              </p>
            </Prose>

            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
              {["Pure", "Precious", "Progressive"].map((w) => (
                <span key={w} className="text-gold text-lg italic" style={{ fontFamily: "var(--font-serif)" }}>
                  {w}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-5">
              {[
                { src: withBase("/images/lifestyle-2.webp"), ratio: "3/4", pad: "" },
                { src: withBase("/images/product-necklace.webp"), ratio: "3/4", pad: "mt-10" },
              ].map((im) => (
                <div
                  key={im.src}
                  className={`relative overflow-hidden shadow-[0_20px_45px_-18px_rgba(0,0,0,0.5)] ${im.pad}`}
                  style={{ aspectRatio: im.ratio }}
                >
                  <Image
                    src={im.src}
                    alt=""
                    fill
                    sizes="25vw"
                    className={im.src.includes("product") ? "object-contain bg-cream-light p-6" : "object-cover"}
                  />
                  <span className="pointer-events-none absolute inset-3 border border-gold/30" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ── Distribution ───────────────────────────────────────────────────── */

function Distribution() {
  return (
    <Section tone="cream">
      <Container>
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <Eyebrow center>Distribution</Eyebrow>
            <h2 className="mt-6 text-[2rem] sm:text-4xl lg:text-5xl font-bold leading-[1.12] text-burgundy">
              Reaching India&apos;s top
              <span className="block mt-2 font-normal italic text-gold-dark" style={{ fontFamily: "var(--font-serif)" }}>
                jewellery showrooms
              </span>
            </h2>
            <GoldRule center className="mt-7" />
            <p className="mt-8 text-[1.0625rem] leading-[1.85] text-ink-soft" style={{ fontFamily: "var(--font-serif)" }}>
              DIAGO holds exclusive sales and distribution rights with Dishaa Gold and Platinum.
              Our mandate is straightforward — bring certified natural diamond jewellery to the
              finest retail counters across the country.
            </p>
            <p className="mt-9 text-burgundy text-xl italic" style={{ fontFamily: "var(--font-serif)" }}>
              Your showroom is the next.
            </p>
            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center gap-3 px-9 py-4 bg-burgundy text-cream text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-burgundy-dark transition-colors duration-300"
            >
              Talk to Our Team
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About DIAGO"
        title="Real diamond,"
        accent="real you"
        intro="Bridging traditional gold reverence with contemporary luxury — a house built for the way jewellery is actually worn today."
        image={withBase("/images/portrait-earrings.webp")}
      />
      <Story />
      <Pillars />
      <Alliance />
      <Distribution />
    </>
  );
}
