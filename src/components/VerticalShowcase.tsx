import Image from "next/image";

export type ShowcaseItem = {
  label: string;
  tagline: string;
  image: string;
};

/**
 * Compact vertical counterpart to ProductDeck's marquee — used where a full
 * width horizontal strip doesn't fit (e.g. the half-column beside banner
 * copy). Same seamless-loop technique, just translateY instead of
 * translateX. Pure CSS (no client component needed).
 */
export default function VerticalShowcase({ items }: { items: ShowcaseItem[] }) {
  return (
    <div className="relative h-full overflow-hidden surface-burgundy">
      <div className="absolute inset-0 grain-gold opacity-[0.07]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 sm:h-28 bg-gradient-to-b from-burgundy-deep to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-burgundy-deep to-transparent z-10" />

      <div className="marquee-track-v flex flex-col gap-6 p-6 sm:p-8 w-full">
        {[...items, ...items].map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="shrink-0 flex items-center gap-4 bg-cream-light border border-gold/25 border-l-2 border-l-gold p-4"
          >
            <span className="relative w-16 h-16 shrink-0 overflow-hidden bg-cream">
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,var(--gold-pale)_0%,transparent_75%)] opacity-60" />
              <Image src={item.image} alt={item.label} fill sizes="64px" className="object-contain p-2" />
            </span>
            <span>
              <p className="text-gold-dark text-[9px] tracking-[0.2em] uppercase">{item.tagline}</p>
              <p className="mt-1 text-burgundy text-base font-normal italic" style={{ fontFamily: "var(--font-serif)" }}>
                {item.label}
              </p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
