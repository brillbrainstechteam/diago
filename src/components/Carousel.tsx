"use client";

import { useRef, useState, useEffect, useCallback } from "react";

/**
 * Scroll-snap carousel. Slides are laid out by the caller via `slideClass`
 * (e.g. basis-full / basis-1/2 / basis-1/3) so one component serves the
 * product rail, the lifestyle rail and the quote rail.
 */
export default function Carousel({
  children,
  slideClass = "basis-full sm:basis-1/2 lg:basis-1/3",
  light = false,
  ariaLabel,
}: {
  children: React.ReactNode[];
  slideClass?: string;
  light?: boolean;
  ariaLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  // Recompute how many "pages" exist whenever the track resizes.
  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.firstElementChild as HTMLElement | null;
    if (!slide) return;
    const perView = Math.max(1, Math.round(el.clientWidth / slide.offsetWidth));
    setMaxIndex(Math.max(0, children.length - perView));
  }, [children.length]);

  useEffect(() => {
    measure();
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  // Keep the active dot in sync with manual swiping.
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.firstElementChild as HTMLElement | null;
    if (!slide) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    setIndex(Math.round(el.scrollLeft / (slide.offsetWidth + gap)));
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.firstElementChild as HTMLElement | null;
    if (!slide) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const clamped = Math.min(Math.max(i, 0), maxIndex);
    const left = clamped * (slide.offsetWidth + gap);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
    // Drive the indicator from the click rather than waiting for the scroll
    // event, so the dots stay correct even if smooth scrolling is unavailable.
    setIndex(clamped);
  };

  const arrow = light
    ? "border-cream/25 text-cream/85 hover:border-gold hover:text-gold"
    : "border-burgundy/25 text-burgundy hover:border-burgundy hover:bg-burgundy hover:text-cream";

  return (
    <div className="relative" role="region" aria-label={ariaLabel}>
      <div
        ref={trackRef}
        onScroll={onScroll}
        // snap-proximity, not snap-mandatory: mandatory snapping overrides
        // programmatic scrollTo, which would break the arrow and dot controls.
        // Scroll behaviour is set per-call in goTo, so no `scroll-smooth` here.
        className="no-scrollbar flex gap-6 lg:gap-8 overflow-x-auto snap-x snap-proximity pb-2"
      >
        {children.map((child, i) => (
          <div key={i} className={`shrink-0 snap-start ${slideClass}`}>
            {child}
          </div>
        ))}
      </div>

      {maxIndex > 0 && (
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous"
            className={`w-11 h-11 border flex items-center justify-center transition-all duration-300 disabled:opacity-25 disabled:pointer-events-none ${arrow}`}
          >
            &larr;
          </button>

          <div className="flex items-center gap-2.5">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-px transition-all duration-500 ${
                  i === index
                    ? light ? "w-10 bg-gold" : "w-10 bg-burgundy"
                    : light ? "w-5 bg-cream/25" : "w-5 bg-burgundy/25"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(index + 1)}
            disabled={index >= maxIndex}
            aria-label="Next"
            className={`w-11 h-11 border flex items-center justify-center transition-all duration-300 disabled:opacity-25 disabled:pointer-events-none ${arrow}`}
          >
            &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
