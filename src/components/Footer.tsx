import Image from "next/image";
import Link from "next/link";
import { withBase } from "@/lib/basePath";
import { categories } from "@/data/collections";

const footerCollections = ["rings", "bracelets", "chain-pendants", "earrings", "necklaces", "mangalsutras"]
  .map((slug) => categories.find((c) => c.slug === slug)!)
  .map((c) => ({
    label: c.name.replace(/^(Statement|Lightweight|Modern|Daily-Wear|Contemporary)\s/, ""),
    tagline: c.tagline,
    href: `/collections#${c.slug}`,
  }));

const nav = [
  { l: "Home", href: "/" },
  { l: "About", href: "/about" },
  { l: "Collections", href: "/collections" },
  { l: "Shop by Occasion", href: "/occasions" },
  { l: "Our Craft", href: "/craft" },
  { l: "Gifting", href: "/gifting" },
  { l: "Contact", href: "/contact" },
];

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/thediago09?igsh=MTh5bXZkbzV3Y3oxNA%3D%3D&utm_source=qr",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.35" cy="6.65" r="1.05" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61593246591561",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M15.5 8.5h-2a1.5 1.5 0 0 0-1.5 1.5v2h3.4l-.5 3H12v7h-3v-7H7v-3h2v-2.3C9 7.7 10.7 6 13.2 6h2.3v2.5Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCJvvisZdsdFvCA6kk_Y6T2w",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="12" rx="4" />
        <path d="M10.5 9.7v4.6l4-2.3-4-2.3Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative surface-burgundy text-cream overflow-hidden">
      {/* Cream wash behind the brand column so the logo has something to read
          against — its gold sits almost on top of the burgundy otherwise.
          From `sm` the brand is the left column, so the wash runs left to
          right across the footer. Below `sm` the columns stack and this would
          bleed into the link lists, whose type is cream; there the panel is
          attached to the brand column itself instead (see below), which keeps
          it tied to real content rather than to a percentage of a footer whose
          height moves with its contents.

          Both fade to `rgba(250,245,232,0)` — transparent cream — and never to
          the `transparent` keyword, which is `rgba(0,0,0,0)`. Fading to that
          drags the colour toward black as the alpha drops, and the midpoint
          comes out a grey smudge across the middle of the footer.

          The ramp is now opaque and spans the whole width rather than fading
          out to nothing part-way: cream, blush, dusty pink, dusty rose, mauve,
          wine, then burgundy deepening to its darkest only at the far edge.
          Ending the wash early left the remaining width sitting on one flat
          burgundy, which is what made it read as a band.

          Where it goes dark is set by the type it runs under, not by taste:
          the link headings are gold and the links cream, so the ground beneath
          the first of them has to be at least brand burgundy. Hence the light
          half of the ramp is spent before the lists begin, and everything
          after is a continuous darkening through the burgundies — which is
          still movement, just within a narrow range.

          Two ramps, because the cap on the brand copy is in rem while these
          stops are in per cent: the same measure is a third of the footer at
          760 and a quarter at 1440, and the link lists sit at 53% and 42%
          respectively. One curve cannot serve both.

          The vertical mask stops the wash above the copyright rules. Those
          lines are cream and sit at the far left, so across the full height
          the ramp was putting cream type on cream — they were invisible. */}
      <div className="hidden sm:block absolute inset-0 [mask-image:linear-gradient(180deg,#000_0%,#000_74%,transparent_80.5%)] [-webkit-mask-image:linear-gradient(180deg,#000_0%,#000_74%,transparent_80.5%)] bg-[linear-gradient(100deg,#FAF5E8_0%,#F7EFE7_10%,#F3E6DF_18%,#EDD8D5_25%,#E3C7C8_31%,#DBBBBF_34%,#CBA3AC_38%,#B98A9B_42%,#A67087_46%,#925A72_49%,#7B2040_52%,#781F3E_58%,#741D3C_65%,#6D1B39_72%,#661836_79%,#5C1533_85%,#501230_91%,#430F22_100%)] lg:bg-[linear-gradient(100deg,#FAF5E8_0%,#F8F1E9_7%,#F4E9E2_13%,#EFDDD9_19%,#E6CDCD_24%,#DBBBBF_27%,#C9A0AA_30%,#B58597_33%,#A26D84_35.5%,#8E5470_38%,#7B2040_40%,#781F3E_46%,#741D3C_53%,#6E1B39_60%,#681836_67%,#601634_74%,#571433_80%,#4E1230_86%,#48112B_92%,#430F22_100%)]" />
      <div className="absolute inset-0 grain-gold opacity-[0.06]" />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Mobile: 2 columns — brand full-width on top, the two link lists side
            by side, enquiries full-width below. sm keeps the 2×2, lg the 4-up. */}
        <div className="py-14 sm:py-16 lg:py-20 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[2.1fr_1fr_1fr_1.15fr]">
          <div className="relative col-span-2 sm:col-span-1">
            {/* Stacked-layout counterpart of the wash above: bled to the
                footer's edges and eased out inside the column's own height on
                the same shape, so the link lists below are never touched. */}
            <span className="sm:hidden pointer-events-none absolute -inset-x-6 -top-14 bottom-0 bg-cream" />
            {/* The fade is its own strip in the row gap rather than the tail of
                a gradient across the panel. Sized as a share of a panel whose
                height moves with the copy, the tagline kept landing near the
                zero end of the ramp — gold on burgundy. `top-full h-10` pins
                the fade to the 40px gap instead, so the column above it is
                always solid and the list below always clean. */}
            <span className="sm:hidden pointer-events-none absolute -inset-x-6 top-full h-10 bg-[linear-gradient(180deg,var(--cream)_0%,rgba(250,245,232,0.88)_18%,rgba(250,245,232,0.68)_38%,rgba(250,245,232,0.42)_58%,rgba(250,245,232,0.2)_76%,rgba(250,245,232,0.06)_90%,rgba(250,245,232,0)_100%)]" />
            <Image
              src={withBase("/images/logo.webp")}
              alt="DIAGO"
              width={221}
              height={100}
              className="relative h-14 lg:h-16 w-auto object-contain"
            />
            {/* Held to a short measure on purpose. Run to the column's full
                width it reached 32% across the footer, and the next column
                begins at 35% — which left the wash three points of width to
                fade across, far too little to do it without either veiling the
                Navigate list or stopping dead. A narrower measure buys the
                fade room, and reads better besides. The cap is in rem while
                the wash is in per cent, so the narrowest layout governs: at
                760 that same measure spans a far larger share of the footer
                than it does at 1440, and it is the 760 case the fade has to
                clear. Only from `sm` — below it the brand is the full-width
                top block with no adjacent column to protect. */}
            <p className="relative mt-6 sm:max-w-[13.5rem] text-ink-soft text-[15px] leading-relaxed" style={{ fontFamily: "var(--font-serif)" }}>
              Fine gold artistry paired with the authentic brilliance of certified natural diamonds.
            </p>
            <p className="relative mt-4 sm:max-w-[13.5rem] text-gold-dark text-sm italic" style={{ fontFamily: "var(--font-serif)" }}>
              Real Diamond, Real You.
            </p>
          </div>

          <div>
            <h4 className="text-gold text-[10px] font-bold tracking-[0.28em] uppercase mb-6">Navigate</h4>
            <ul className="space-y-3.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-cream/85 text-sm hover:text-gold transition-colors duration-300">
                    {item.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold text-[10px] font-bold tracking-[0.28em] uppercase mb-6">Collections</h4>
            <ul className="space-y-4">
              {footerCollections.map((c) => (
                <li key={c.label}>
                  <Link href={c.href} className="block text-cream/85 text-sm hover:text-gold transition-colors duration-300">
                    {c.label}
                  </Link>
                  <span className="hidden sm:block mt-0.5 text-cream/50 text-[11px] italic" style={{ fontFamily: "var(--font-serif)" }}>
                    {c.tagline}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-gold text-[10px] font-bold tracking-[0.28em] uppercase mb-6">Enquiries</h4>
            <a href="tel:+912268936666" className="block text-cream/85 text-sm hover:text-gold transition-colors duration-300">
              +91 22 6893 6666
            </a>
            <a href="mailto:diago@dishaplatinum.com" className="mt-2 block text-cream/85 text-sm hover:text-gold transition-colors duration-300">
              diago@dishaplatinum.com
            </a>

            <div className="flex gap-2.5 mt-7">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="w-9 h-9 border border-cream/15 flex items-center justify-center text-cream/85 hover:border-gold hover:text-gold transition-all duration-300"
                >
                  <span className="w-[18px] h-[18px]">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 py-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-cream/85 text-[11px] tracking-[0.14em] text-center sm:text-left">
            &copy; 2026 DIAGO. All rights reserved.
          </p>
          <p className="text-cream/85 text-[11px] tracking-[0.14em] text-center sm:text-right">
            Exclusive distribution by Dishaa Gold and Platinum
          </p>
        </div>

        <div className="border-t border-cream/10 py-4 text-center">
          <p className="text-cream/60 text-[10px] tracking-[0.14em]">
            Powered By{" "}
            <a
              href="https://www.brillbrainsconsultants.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors duration-300"
            >
              Brillbrains
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
