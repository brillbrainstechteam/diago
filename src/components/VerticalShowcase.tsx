import Image from "next/image";

export type ShowcaseItem = {
  label: string;
  tagline: string;
  image: string;
};

/**
 * Compact vertical counterpart to ProductDeck's marquee — used where a full
 * width horizontal strip doesn't fit (e.g. the half-column beside banner
 * copy). Same seamless-loop technique, just translateY instead of translateX,
 * at a slow, luxurious pace. Cards lift on hover and the whole track pauses,
 * so a viewer can settle on any piece. Pure CSS (no client component needed).
 */
export default function VerticalShowcase({ items }: { items: ShowcaseItem[] }) {
  return (
    <div className="relative h-full min-h-[420px] overflow-hidden surface-burgundy">
      <div className="absolute inset-0 grain-gold opacity-[0.07]" />
      {/* Deeper top/bottom fades so cards emerge and dissolve rather than
          hard-cutting at the edges. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b from-burgundy-deep via-burgundy-deep/70 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-burgundy-deep via-burgundy-deep/70 to-transparent z-10" />

      <div className="marquee-track-v flex flex-col gap-5 p-6 sm:p-8 w-full">
        {[...items, ...items].map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="group/card shrink-0 flex items-center gap-5 bg-cream-light p-4 pr-6 border border-gold/20 shadow-[0_16px_32px_-24px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-gold/60 hover:shadow-[0_22px_44px_-20px_rgba(0,0,0,0.7)] hover:-translate-x-1"
          >
            {/* Gold spine + framed thumbnail */}
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
