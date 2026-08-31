import Image from "next/image";
import type { Piece } from "@/data/collections";

/**
 * A single catalogue piece in a gold display frame.
 *
 * The studio shots are alpha cut-outs of small objects, so a plain <img> in a
 * box reads as a stray sprite. The frame supplies the missing weight: a warm
 * plinth gradient for the piece to sit on, a halo behind it so rose gold has
 * something to separate from, and a mitred gold border with corner brackets
 * that echoes the frames used across the rest of the site.
 */
export default function PieceCard({
  piece,
  priority = false,
  sizes = "(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 22vw",
}: {
  piece: Piece;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className="group relative h-full flex flex-col">
      {/* Frame. The gold seam on top is the anchor; the rest of the border is
          a hairline so the metal in the photograph stays the brightest thing. */}
      <div className="relative overflow-hidden border border-gold/25 border-t-2 border-t-gold bg-gradient-to-b from-cream-light via-cream-light to-cream transition-all duration-500 group-hover:border-gold/55 shadow-[0_18px_38px_-28px_rgba(67,15,34,0.45)] group-hover:shadow-[0_26px_50px_-24px_rgba(67,15,34,0.5)]">
        {/* Corner brackets, drawn inside the frame so they never collide with
            a neighbouring card in a tight grid. */}
        <span className="pointer-events-none absolute top-2.5 left-2.5 w-5 h-5 border-t border-l border-gold/45 transition-colors duration-500 group-hover:border-gold z-20" />
        <span className="pointer-events-none absolute top-2.5 right-2.5 w-5 h-5 border-t border-r border-gold/45 transition-colors duration-500 group-hover:border-gold z-20" />
        <span className="pointer-events-none absolute bottom-2.5 left-2.5 w-5 h-5 border-b border-l border-gold/45 transition-colors duration-500 group-hover:border-gold z-20" />
        <span className="pointer-events-none absolute bottom-2.5 right-2.5 w-5 h-5 border-b border-r border-gold/45 transition-colors duration-500 group-hover:border-gold z-20" />

        <div className="relative aspect-square">
          {/* Halo behind the piece — brightest at the centre, so a rose-gold
              silhouette reads against the cream instead of dissolving into it. */}
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,var(--gold-pale)_0%,transparent_70%)] opacity-55 transition-opacity duration-500 group-hover:opacity-80" />

          <Image
            src={piece.image}
            alt={`${piece.name} — DIAGO ${piece.ref}`}
            fill
            priority={priority}
            sizes={sizes}
            className="relative object-contain p-7 sm:p-8 transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />

          {/* Inset rule, kept clear of the brackets. */}
          <span className="pointer-events-none absolute inset-5 border border-gold/15 transition-colors duration-500 group-hover:border-gold/30" />
        </div>

        {/* Reference code on a gold seam — the detail a retailer actually
            orders against, so it earns a permanent place rather than a hover. */}
        <figcaption className="relative border-t border-gold/20 px-4 py-3 text-center">
          <span className="block text-gold-dark text-[9px] font-semibold tracking-[0.26em] uppercase tabular-nums">
            {piece.ref}
          </span>
          <span
            className="mt-1.5 block text-burgundy text-[15px] leading-snug italic"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {piece.name}
          </span>
          <span className="mt-2 mx-auto block w-6 h-px bg-gold/45 transition-all duration-500 group-hover:w-12" />
          <span className="mt-2 block text-ink-soft text-[11.5px] leading-relaxed">
            {piece.note}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
