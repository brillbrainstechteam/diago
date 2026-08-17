import Image from "next/image";

export type ShowcaseItem = {
  label: string;
  tagline: string;
  image: string;
};

/**
 * Vertical auto-scrolling showcase — the counterpart to ProductDeck's marquee,
 * used in the half-column beside banner copy. It fills its (fixed-height,
 * clipping) parent absolutely, so the moving track never stretches the row.
 *
 * Seamless loop: the item list is rendered twice and the track translates by
 * exactly -50%. For that to land perfectly, spacing must be uniform across the
 * whole sequence — so each card carries an identical margin-bottom (NOT a flex
 * gap, and NO one-off track padding, either of which would misalign the wrap).
 * The caller must pass enough items that one copy is taller than the visible
 * window, otherwise a blank stretch would appear as the loop runs.
 */
export default function VerticalShowcase({ items }: { items: ShowcaseItem[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden surface-burgundy">
      <div className="absolute inset-0 grain-gold opacity-[0.07]" />
      {/* Top/bottom fades so cards emerge and dissolve rather than hard-cutting
          at the clip edges. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 sm:h-28 bg-gradient-to-b from-burgundy-deep via-burgundy-deep/70 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-burgundy-deep via-burgundy-deep/70 to-transparent z-10" />

      <div className="marquee-track-v flex flex-col px-6 sm:px-8 w-full">
        {[...items, ...items].map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="group/card mb-5 shrink-0 flex items-center gap-5 bg-cream-light p-4 pr-6 border border-gold/20 shadow-[0_16px_32px_-24px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-gold/60 hover:shadow-[0_22px_44px_-20px_rgba(0,0,0,0.7)] hover:-translate-x-1"
          >
            <span className="relative w-20 h-20 shrink-0 overflow-hidden bg-cream border-l-2 border-l-gold">
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,var(--gold-pale)_0%,transparent_75%)] opacity-70" />
              <Image
                src={item.image}
                alt={item.label}
                fill
                sizes="80px"
                className="object-contain p-2.5 transition-transform duration-700 ease-out group-hover/card:scale-110"
              />
            </span>
            <span className="min-w-0">
              <p className="text-gold-dark text-[9px] tracking-[0.22em] uppercase">{item.tagline}</p>
              <p className="mt-1.5 text-burgundy text-lg font-normal italic leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
                {item.label}
              </p>
              <span className="mt-2 block h-px w-6 bg-gold/50 transition-all duration-500 group-hover/card:w-12" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
