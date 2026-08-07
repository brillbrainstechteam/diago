"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

/* ── Layout ─────────────────────────────────────────────────────────── */

/**
 * The single source of truth for horizontal rhythm. Every section uses this,
 * so text can never end up flush against the viewport edge.
 */
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
  tone = "cream",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "cream" | "cream-light" | "burgundy" | "white";
}) {
  const tones = {
    cream: "bg-cream",
    "cream-light": "surface-cream",
    burgundy: "surface-burgundy",
    white: "bg-white",
  };
  return (
    <section id={id} className={`relative py-16 md:py-20 lg:py-24 ${tones[tone]} ${className}`}>
      {children}
    </section>
  );
}

/* ── Motion ─────────────────────────────────────────────────────────── */

export function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Type ───────────────────────────────────────────────────────────── */

export function Eyebrow({ children, light = false, center = false }: { children: React.ReactNode; light?: boolean; center?: boolean }) {
  return (
    <div className={`flex items-center gap-4 ${center ? "justify-center" : ""}`}>
      <span className={`block w-8 h-px ${light ? "bg-gold/60" : "bg-gold"}`} />
      <span className={`text-[10px] sm:text-[11px] font-semibold tracking-[0.35em] uppercase ${light ? "text-gold" : "text-gold-dark"}`}>
        {children}
      </span>
      {center && <span className={`block w-8 h-px ${light ? "bg-gold/60" : "bg-gold"}`} />}
    </div>
  );
}

export function GoldRule({ className = "", light = false, center = false }: { className?: string; light?: boolean; center?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${center ? "justify-center" : ""} ${className}`}>
      <span className={`block w-12 h-px ${light ? "bg-gold/40" : "bg-gold/70"}`} />
      <span className={`text-sm ${light ? "text-gold/90" : "text-gold"}`}>&#10022;</span>
      <span className={`block w-12 h-px ${light ? "bg-gold/40" : "bg-gold/70"}`} />
    </div>
  );
}

/**
 * Section heading. `accent` renders in the italic serif face so every
 * heading on the site shares one two-tone rhythm.
 */
export function Heading({
  eyebrow,
  title,
  accent,
  light = false,
  center = false,
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  light?: boolean;
  center?: boolean;
  as?: "h1" | "h2";
  className?: string;
}) {
  const size = Tag === "h1"
    ? "text-[2.5rem] sm:text-6xl lg:text-7xl"
    : "text-[2rem] sm:text-4xl lg:text-5xl";

  return (
    <div className={`${center ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <div className={center ? "flex justify-center mb-5" : "mb-5"}>
          <Eyebrow light={light} center={center}>{eyebrow}</Eyebrow>
        </div>
      )}
      <Tag className={`${size} font-bold leading-[1.08] ${light ? "text-cream" : "text-burgundy"}`}>
        {title}
        {accent && (
          <>
            {" "}
            <span className={`font-normal italic ${light ? "text-gold-light" : "text-gold-dark"}`} style={{ fontFamily: "var(--font-serif)" }}>
              {accent}
            </span>
          </>
        )}
      </Tag>
      <GoldRule light={light} center={center} className="mt-6" />
    </div>
  );
}

export function Prose({ children, light = false, className = "" }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <div
      className={`space-y-5 text-[1.0625rem] leading-[1.85] ${light ? "text-cream/85" : "text-ink-soft"} ${className}`}
      style={{ fontFamily: "var(--font-serif)" }}
    >
      {children}
    </div>
  );
}

/* ── Buttons ────────────────────────────────────────────────────────── */

type BtnProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "gold" | "outline" | "outline-light";
  className?: string;
};

const btnBase =
  "group inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-4 text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase transition-all duration-300";

const btnVariants = {
  solid: "bg-burgundy text-cream hover:bg-burgundy-dark",
  gold: "bg-gold text-burgundy-deep hover:bg-gold-light",
  outline: "border border-burgundy/40 text-burgundy hover:bg-burgundy hover:text-cream hover:border-burgundy",
  "outline-light": "border border-cream/30 text-cream hover:border-gold hover:text-gold",
};

export function Button({ href, children, variant = "solid", className = "" }: BtnProps) {
  const isAnchor = href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:");
  const cls = `${btnBase} ${btnVariants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
    </>
  );
  if (isAnchor) return <a href={href} className={cls}>{inner}</a>;
  // next/link is imported lazily by callers that need routing; plain anchor is
  // fine for static export and keeps this primitive dependency-free.
  return <a href={href} className={cls}>{inner}</a>;
}

/* ── Framed imagery ─────────────────────────────────────────────────── */

/**
 * Image inside a gold corner frame. `fit="contain"` is for product cut-outs
 * on white; `fit="cover"` for photography.
 */
export function FramedImage({
  src,
  alt,
  ratio = "4/5",
  fit = "cover",
  corners = true,
  inset = false,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  ratio?: string;
  fit?: "cover" | "contain";
  corners?: boolean;
  inset?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {corners && (
        <>
          <span className="pointer-events-none absolute -top-4 -left-4 w-20 h-20 border-t border-l border-gold/60 z-10" />
          <span className="pointer-events-none absolute -bottom-4 -right-4 w-20 h-20 border-b border-r border-gold/60 z-10" />
        </>
      )}
      <div
        className={`relative overflow-hidden ${inset ? "frame-inset" : ""} ${fit === "contain" ? "bg-white" : "bg-cream-dark"}`}
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={fit === "contain" ? "object-contain p-10" : "object-cover"}
        />
      </div>
    </div>
  );
}

/* ── Page header ────────────────────────────────────────────────────── */

/**
 * Inner-page banner. Padding accounts for the fixed navbar so the title is
 * never clipped behind it.
 */
export function PageHeader({
  eyebrow,
  title,
  accent,
  intro,
  image,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro: string;
  image?: string;
}) {
  return (
    <header className="relative surface-burgundy overflow-hidden pt-[calc(var(--nav-h)+2.25rem)] pb-14 md:pt-[calc(var(--nav-h)+3rem)] md:pb-16">
      <div className="absolute inset-0 grain-gold opacity-[0.07]" />
      {image && (
        <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block">
          <Image src={image} alt="" fill className="object-cover opacity-45" sizes="50vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--burgundy-dark)] via-[var(--burgundy-dark)]/50 to-transparent" />
        </div>
      )}
      <Container className="relative z-10">
        <div className="max-w-2xl">
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-[2.5rem] sm:text-6xl lg:text-[4.25rem] font-bold leading-[1.06] text-cream">
            {title}
            {accent && (
              <>
                {" "}
                <span className="font-normal italic text-gold-light" style={{ fontFamily: "var(--font-serif)" }}>
                  {accent}
                </span>
              </>
            )}
          </h1>
          <p className="mt-7 text-lg leading-[1.8] text-cream/85 max-w-xl" style={{ fontFamily: "var(--font-serif)" }}>
            {intro}
          </p>
          <GoldRule light className="mt-8" />
        </div>
      </Container>
    </header>
  );
}
