"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Piece } from "@/data/collections";
import Carousel from "@/components/Carousel";
import PieceCard from "@/components/PieceCard";

/** Track counts, written out because Tailwind only sees literal classes. */
const COLS: Record<number, string> = {
  1: "xl:grid-cols-[minmax(0,340px)]",
  2: "xl:grid-cols-[repeat(2,minmax(0,320px))]",
  3: "xl:grid-cols-[repeat(3,minmax(0,320px))]",
  4: "xl:grid-cols-[repeat(4,minmax(0,300px))]",
  5: "xl:grid-cols-[repeat(5,minmax(0,300px))]",
};

/**
 * A set of catalogue pieces, each openable full-screen.
 *
 * The studio shots are 1200px but render inside cards a fifth that size, so
 * the pave and setting work — the thing that actually sells the piece — is
 * invisible until you can enlarge it. Clicking a card opens the full frame;
 * arrows move through the set without closing.
 */
export default function PieceShowcase({
  pieces,
  label,
  className = "",
}: {
  pieces: Piece[];
  label: string;
  className?: string;
}) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const isOpen = openAt !== null;

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpenAt(null), []);
  const step = useCallback(
    (delta: number) => setOpenAt((i) => (i === null ? i : (i + delta + pieces.length) % pieces.length)),
    [pieces.length],
  );

  // The element that had focus before opening, so it can be restored on close
  // rather than dumping focus back at the top of the document.
  const returnFocus = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);

    // Lock the page behind the overlay. Compensating for the scrollbar keeps
    // the layout from jumping sideways as it disappears.
    const { body } = document;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
      // Hand focus back to the card that opened the overlay.
      returnFocus.current?.focus();
    };
  }, [isOpen, close, step]);

  const openPiece = (i: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    returnFocus.current = e.currentTarget;
    setOpenAt(i);
  };

  const tile = (p: Piece, i: number, sizes: string) => (
    <button
      key={p.ref}
      type="button"
      onClick={openPiece(i)}
      aria-label={`Enlarge ${p.name}, reference ${p.ref}`}
      // Capped so a long row still finishes promptly; the grid remounts on a
      // moment change, so this replays each time the edit switches.
      style={{ animationDelay: `${Math.min(i, 6) * 90}ms` }}
      className="animate-tile-in group/tile block w-full h-full text-left cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
    >
      <PieceCard piece={p} sizes={sizes} />
    </button>
  );

  // Bind the index alongside the piece: narrowing `openAt` on its own does not
  // survive into the JSX below, where the counter needs it.
  const active = openAt === null ? null : { piece: pieces[openAt], index: openAt };

  // Portalled so the overlay is a child of <body>. Rendered in place it was
  // landing thousands of pixels down the page: every gallery sits inside
  // <Reveal>, whose scroll animation sets `translate`, and a transformed or
  // translated ancestor becomes the containing block for `position: fixed`
  // descendants — so "fixed" resolved against that wrapper, not the viewport.
  const overlay = active && (
    <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.piece.name}, reference ${active.piece.ref}`}
          tabIndex={-1}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-burgundy-deep/92 backdrop-blur-sm animate-overlay-in focus:outline-none"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 flex items-center justify-center border border-cream/25 text-cream/85 hover:border-gold hover:text-gold transition-colors duration-300"
          >
            <span aria-hidden className="text-xl leading-none">&times;</span>
          </button>

          {pieces.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(-1); }}
                aria-label="Previous piece"
                className="absolute left-2 sm:left-6 w-11 h-11 flex items-center justify-center border border-cream/25 text-cream/85 hover:border-gold hover:text-gold transition-colors duration-300"
              >
                <span aria-hidden>&larr;</span>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(1); }}
                aria-label="Next piece"
                className="absolute right-2 sm:right-6 w-11 h-11 flex items-center justify-center border border-cream/25 text-cream/85 hover:border-gold hover:text-gold transition-colors duration-300"
              >
                <span aria-hidden>&rarr;</span>
              </button>
            </>
          )}

          {/* Stop clicks on the panel itself from reaching the backdrop. */}
          <figure
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col items-center max-h-full"
          >
            {/* The frame stays square and takes its side from whichever axis
                runs out first: the viewport width, a 760px ceiling, or the
                height left once the caption is accounted for (the 13rem). A
                flex-basis approach either overflowed the bottom or, with no
                width to resolve against, collapsed the box entirely. */}
            <div className="relative aspect-square w-[min(88vw,760px,calc(100vh-13rem))] shrink-0 bg-gradient-to-b from-cream-light to-cream border border-gold/30 border-t-2 border-t-gold shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)]">
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,var(--gold-pale)_0%,transparent_70%)] opacity-60" />
              <Image
                key={active.piece.ref}
                src={active.piece.image}
                alt={`${active.piece.name} — DIAGO ${active.piece.ref}`}
                fill
                sizes="(max-width: 768px) 88vw, 760px"
                className="relative object-contain p-8 sm:p-12"
                priority
              />
              <span className="pointer-events-none absolute inset-6 border border-gold/20" />
            </div>

            <figcaption className="mt-5 shrink-0 text-center">
              <span
                className="block text-cream text-xl sm:text-2xl italic"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {active.piece.name}
              </span>
              <span className="mt-2 block text-cream/70 text-sm">{active.piece.note}</span>
              {pieces.length > 1 && (
                <span className="mt-4 block text-cream/45 text-[10px] tracking-[0.24em] uppercase tabular-nums">
                  {active.index + 1} / {pieces.length}
                </span>
              )}
            </figcaption>
          </figure>
    </div>
  );

  return (
    <div className={className}>
      {/* One row, always. A range never splits into a ragged 3 + 2: the track
          count is fixed to the number of pieces, so the row stays even.
          Reading the setting work needs roughly 280px a card, which five of
          will not fit inside the 1240 text column — so from `xl` the grid
          steps outside it to a wider, viewport-centred block. Below that the
          swipeable rail takes over rather than cramming five into 200px. */}
      <div
        className={`hidden xl:grid gap-7 justify-center ${COLS[Math.min(pieces.length, 5)]} ${
          pieces.length >= 4 ? "w-[min(100vw-4rem,1560px)] max-w-none relative left-1/2 -translate-x-1/2" : ""
        }`}
      >
        {pieces.map((p, i) => tile(p, i, "300px"))}
      </div>

      <div className="xl:hidden">
        <Carousel ariaLabel={label} slideClass="basis-[70%] sm:basis-[42%] lg:basis-[30%]">
          {pieces.map((p, i) => tile(p, i, "(max-width: 640px) 70vw, (max-width: 1024px) 42vw, 30vw"))}
        </Carousel>
      </div>

      {/* `mounted` guards the portal: document.body does not exist during the
          static export's server render. */}
      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </div>
  );
}
