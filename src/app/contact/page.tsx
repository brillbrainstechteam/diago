"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Container, Section, Reveal, Eyebrow, GoldRule, Heading, PageHeader,
} from "@/components/ui";
import { withBase } from "@/lib/basePath";

/* ── Contact details ────────────────────────────────────────────────── */

const channels: { k: string; lines: { label: string; href?: string }[] }[] = [
  {
    k: "Phone",
    lines: [
      { label: "+91 22 6893 6666", href: "tel:+912268936666" },
      { label: "+91 81691 20942", href: "tel:+918169120942" },
    ],
  },
  {
    k: "Email",
    lines: [{ label: "diago@dishaplatinum.com", href: "mailto:diago@dishaplatinum.com" }],
  },
  {
    k: "Hours",
    lines: [{ label: "Monday – Saturday, 10:30 AM – 8:00 PM" }],
  },
  {
    k: "Web",
    lines: [{ label: "dishaaplatinum.com" }],
  },
];

function Details() {
  return (
    <Section tone="cream">
      <Container>
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-start">
          <Reveal>
            <Heading eyebrow="Reach Us" title="Speak to the" accent="DIAGO team" />
            <p className="mt-8 text-[1.0625rem] leading-[1.85] text-ink-soft max-w-md" style={{ fontFamily: "var(--font-serif)" }}>
              Whether you are a retailer looking to stock the collection or a customer
              wanting to see pieces in person, the distribution team handles every enquiry
              directly.
            </p>

            <dl className="mt-12 divide-y divide-gold/20 border-y border-gold/20">
              {channels.map((c) => (
                <div key={c.k} className="py-5 grid grid-cols-[5.5rem_1fr] gap-5 items-baseline">
                  <dt className="text-gold-dark text-[10px] font-semibold tracking-[0.24em] uppercase">
                    {c.k}
                  </dt>
                  <dd className="space-y-1">
                    {c.lines.map((l) =>
                      l.href ? (
                        <a
                          key={l.label}
                          href={l.href}
                          className="block text-[15px] text-ink-soft hover:text-burgundy transition-colors duration-300"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {l.label}
                        </a>
                      ) : (
                        <span key={l.label} className="block text-[15px] text-ink-soft" style={{ fontFamily: "var(--font-serif)" }}>
                          {l.label}
                        </span>
                      )
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#book-appointment"
                className="group inline-flex items-center gap-3 px-9 py-4 bg-burgundy text-cream text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-burgundy-dark transition-colors duration-300"
              >
                Book an Appointment
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
              <a
                href="tel:+912268936666"
                className="inline-flex items-center px-9 py-4 border border-burgundy/40 text-burgundy text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-burgundy hover:text-cream transition-colors duration-300"
              >
                Call Now
              </a>
            </div>
          </Reveal>

          {/* Distributor card */}
          <Reveal delay={130}>
            <aside className="relative surface-burgundy overflow-hidden p-10 lg:p-12">
              <div className="absolute inset-0 grain-gold opacity-[0.08]" />
              <span className="pointer-events-none absolute inset-4 border border-gold/25" />

              <div className="relative z-10">
                <Eyebrow light>Exclusive Distribution</Eyebrow>
                <h2 className="mt-6 text-2xl lg:text-3xl font-bold text-cream leading-snug">
                  Dishaa Gold
                  <span className="block font-normal italic text-gold-light" style={{ fontFamily: "var(--font-serif)" }}>
                    and Platinum
                  </span>
                </h2>
                <p className="mt-4 text-gold/90 text-[10px] tracking-[0.26em] uppercase">
                  Pure &middot; Precious &middot; Progressive
                </p>
                <GoldRule light className="mt-7" />
                <p className="mt-7 text-[15px] leading-[1.8] text-cream/85" style={{ fontFamily: "var(--font-serif)" }}>
                  Holding exclusive sales and distribution rights for DIAGO across India,
                  supplying the country&apos;s leading jewellery showrooms from Mumbai.
                </p>

                <div className="mt-9 relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={withBase("/images/retail-packaging.webp")}
                    alt="DIAGO packaging and counter display"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ── Book an appointment ────────────────────────────────────────────── */

const timeSlots = ["10:30 AM – 1:00 PM", "1:00 PM – 4:00 PM", "4:00 PM – 8:00 PM"];

const inputCls =
  "w-full bg-transparent border-b border-burgundy/25 py-3 text-[15px] text-burgundy placeholder:text-ink-soft/50 focus:outline-none focus:border-gold-dark transition-colors duration-300";

function AppointmentForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name") as string;
    const phone = data.get("phone") as string;
    const email = data.get("email") as string;
    const date = data.get("date") as string;
    const time = data.get("time") as string;
    const message = data.get("message") as string;

    const body = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      email && `Email: ${email}`,
      date && `Preferred date: ${date}`,
      time && `Preferred time: ${time}`,
      message && `Message: ${message}`,
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:diago@dishaplatinum.com?subject=${encodeURIComponent(
      "DIAGO Appointment Request"
    )}&body=${encodeURIComponent(body)}`;

    setStatus("sent");
    window.location.href = mailto;
  }

  return (
    <Section tone="cream" id="book-appointment">
      <Container>
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14 items-start">
          <Reveal>
            <Heading eyebrow="By Appointment" title="Book a private" accent="viewing" />
            <p className="mt-8 text-[1.0625rem] leading-[1.85] text-ink-soft max-w-md" style={{ fontFamily: "var(--font-serif)" }}>
              Share a few details and your preferred slot. We will confirm your appointment
              at the Mumbai showroom by phone or email within one business day.
            </p>
            <dl className="mt-10 space-y-4">
              <div>
                <dt className="text-gold-dark text-[10px] font-semibold tracking-[0.24em] uppercase">Address</dt>
                <dd className="mt-1 text-[15px] text-ink-soft" style={{ fontFamily: "var(--font-serif)" }}>
                  Dishaa Gold and Platinum, Mumbai
                </dd>
              </div>
              <div>
                <dt className="text-gold-dark text-[10px] font-semibold tracking-[0.24em] uppercase">Hours</dt>
                <dd className="mt-1 text-[15px] text-ink-soft" style={{ fontFamily: "var(--font-serif)" }}>
                  Monday – Saturday, 10:30 AM – 8:00 PM
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={130}>
            <form onSubmit={handleSubmit} className="relative bg-cream-light border border-gold/25 p-8 sm:p-10 lg:p-12">
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gold-dark" htmlFor="name">
                    Full Name
                  </label>
                  <input id="name" name="name" type="text" required className={`${inputCls} mt-2`} />
                </div>

                <div>
                  <label className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gold-dark" htmlFor="phone">
                    Phone
                  </label>
                  <input id="phone" name="phone" type="tel" required className={`${inputCls} mt-2`} />
                </div>

                <div>
                  <label className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gold-dark" htmlFor="email">
                    Email
                  </label>
                  <input id="email" name="email" type="email" className={`${inputCls} mt-2`} />
                </div>

                <div>
                  <label className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gold-dark" htmlFor="date">
                    Preferred Date
                  </label>
                  <input id="date" name="date" type="date" required className={`${inputCls} mt-2`} />
                </div>

                <div>
                  <label className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gold-dark" htmlFor="time">
                    Preferred Time
                  </label>
                  <select id="time" name="time" required className={`${inputCls} mt-2`}>
                    <option value="">Select a slot</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gold-dark" htmlFor="message">
                    Message (optional)
                  </label>
                  <textarea id="message" name="message" rows={3} className={`${inputCls} mt-2 resize-none`} />
                </div>
              </div>

              <button
                type="submit"
                className="group mt-9 inline-flex items-center gap-3 px-9 py-4 bg-burgundy text-cream text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-burgundy-dark transition-colors duration-300"
              >
                Request Appointment
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </button>

              {status === "sent" && (
                <p className="mt-5 text-[13px] text-ink-soft" style={{ fontFamily: "var(--font-serif)" }}>
                  Opening your email app to send this request to diago@dishaplatinum.com — if it
                  did not open, please email or call us directly.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ── Enquiry routes ─────────────────────────────────────────────────── */

function EnquiryRoutes() {
  const routes = [
    {
      t: "Retail Partnership",
      d: "Stock DIAGO at your showroom. We will share the catalogue, margins and supply terms.",
      cta: "Request partner details",
      href: "mailto:diago@dishaplatinum.com?subject=DIAGO%20retail%20partnership",
    },
    {
      t: "Private Appointment",
      d: "See the collection in person with a member of the team, by appointment.",
      cta: "Book a viewing",
      href: "#book-appointment",
    },
    {
      t: "Product & Certification",
      d: "Questions about a specific piece, diamond grading or hallmarking documentation.",
      cta: "Ask a question",
      href: "mailto:diago@dishaplatinum.com?subject=DIAGO%20product%20enquiry",
    },
  ];

  return (
    <Section tone="cream-light">
      <div className="absolute inset-0 grain-ink opacity-[0.025]" />
      <Container className="relative z-10">
        <Reveal>
          <Heading eyebrow="How Can We Help" title="Choose your" accent="enquiry" center className="max-w-xl mx-auto" />
        </Reveal>

        <div className="mt-10 grid gap-px bg-gold/20 md:grid-cols-3 border border-gold/20">
          {routes.map((r, i) => (
            <Reveal key={r.t} delay={i * 130}>
              <a href={r.href} className="group h-full bg-cream-light p-9 lg:p-11 flex flex-col">
                <h3 className="text-xl font-bold text-burgundy">{r.t}</h3>
                <span className="mt-5 block w-9 h-px bg-gold transition-all duration-500 group-hover:w-20" />
                <p className="mt-5 flex-1 text-[15px] leading-[1.8] text-ink-soft" style={{ fontFamily: "var(--font-serif)" }}>
                  {r.d}
                </p>
                <span className="mt-8 inline-flex items-center gap-3 text-burgundy text-[10px] font-bold tracking-[0.22em] uppercase group-hover:text-gold-dark transition-colors duration-300">
                  {r.cta}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ── Partner banner ─────────────────────────────────────────────────── */

function PartnerBanner() {
  return (
    <Section tone="burgundy">
      <div className="absolute inset-0 grain-gold opacity-[0.07]" />
      <Container className="relative z-10">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <Eyebrow light center>For Retailers</Eyebrow>
            <h2 className="mt-6 text-[2rem] sm:text-4xl lg:text-5xl font-bold leading-[1.12] text-cream">
              Making it reach India&apos;s top
              <span className="block mt-2 font-normal italic text-gold-light" style={{ fontFamily: "var(--font-serif)" }}>
                jewellery showrooms
              </span>
            </h2>
            <GoldRule light center className="mt-7" />
            <p className="mt-8 text-[1.0625rem] leading-[1.85] text-cream/85" style={{ fontFamily: "var(--font-serif)" }}>
              Partner with DIAGO to bring certified natural diamond jewellery to your counter —
              lightweight designs with real turnover potential, backed by exclusive distribution support.
            </p>
            <p className="mt-9 text-gold text-xl italic" style={{ fontFamily: "var(--font-serif)" }}>
              Your showroom is the next.
            </p>
            <a
              href="mailto:diago@dishaplatinum.com?subject=DIAGO%20retail%20partnership"
              className="group mt-10 inline-flex items-center gap-3 px-9 py-4 bg-gold text-burgundy-deep text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-gold-light transition-colors duration-300"
            >
              Become a Retail Partner
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in"
        accent="touch"
        intro="Retail partnerships, private viewings and product enquiries — handled directly by the DIAGO distribution team in Mumbai."
        image={withBase("/images/product-pendant-sets.webp")}
      />
      <Details />
      <AppointmentForm />
      <EnquiryRoutes />
      <PartnerBanner />
    </>
  );
}
