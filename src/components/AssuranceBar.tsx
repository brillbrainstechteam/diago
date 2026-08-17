import { Container } from "@/components/ui";

const items = [
  {
    t: "Certified Purity",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M12 3 L20 6.5 V12 C20 16.5 16.5 20 12 21.5 C7.5 20 4 16.5 4 12 V6.5 Z" />
        <path d="M8.5 12 L11 14.5 L15.5 9.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    t: "Easy Exchange",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12a8 8 0 0 1 13.5-5.8L20 8.5" />
        <path d="M20 4v4.5h-4.5" />
        <path d="M20 12a8 8 0 0 1-13.5 5.8L4 15.5" />
        <path d="M4 20v-4.5h4.5" />
      </svg>
    ),
  },
  {
    t: "Free Lifetime Cleaning",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M12 3.5 C12 3.5 6.5 10 6.5 14.5 A5.5 5.5 0 0 0 17.5 14.5 C17.5 10 12 3.5 12 3.5 Z" />
      </svg>
    ),
  },
  {
    t: "Nationwide Partner Support",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M12 21.5 C12 21.5 5.5 15 5.5 9.5 a6.5 6.5 0 0 1 13 0 C18.5 15 12 21.5 12 21.5 Z" />
        <circle cx="12" cy="9.5" r="2.4" />
      </svg>
    ),
  },
];

/**
 * Sitewide trust bar, rendered once above the footer in the root layout —
 * consolidates the "DIAGO Assurance" trust message so it's the last thing a
 * visitor sees on every page rather than duplicated per-page.
 */
export default function AssuranceBar() {
  return (
    <section className="relative bg-cream-dark border-t-2 border-gold">
      <Container className="py-8 md:py-9">
        <div className="grid grid-cols-2 gap-y-6 md:grid-cols-4 md:gap-6">
          {items.map((item) => (
            <div key={item.t} className="flex items-center gap-3">
              <span className="w-8 h-8 shrink-0 text-gold-dark">{item.icon}</span>
              <span className="text-[12px] sm:text-[13px] font-semibold text-burgundy leading-tight">
                {item.t}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
