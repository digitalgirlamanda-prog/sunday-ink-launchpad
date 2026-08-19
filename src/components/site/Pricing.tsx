import { Reveal, MagneticLink, SectionLabel } from "./primitives";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "ESSENTIAL",
    price: "$999",
    lead: "A serious first website, done properly.",
    turnaround: "Typical turnaround: 7–10 business days, excluding client delays.",
    features: [
      "Custom website design",
      "Up to 5 pages",
      "Mobile-responsive build",
      "Contact / lead form",
      "Social integration",
      "Foundational on-page SEO",
      "Analytics setup",
      "Domain connection",
      "SSL / security setup",
      "2 revision rounds",
      "Launch support",
    ],
  },
  {
    name: "SIGNATURE",
    price: "$1,499",
    badge: "Most popular",
    lead: "Everything in Essential, built to convert harder.",
    turnaround: "Typical turnaround: 10–14 business days, excluding client delays.",
    features: [
      "Up to 8 pages",
      "Elevated / custom design elements",
      "Conversion-focused structure",
      "Booking, payment or ecommerce integration where applicable",
      "Google Business integration",
      "Email / lead capture",
      "Expanded SEO foundations",
      "Enhanced interactions",
      "Analytics & conversion tracking",
      "3 revision rounds",
      "Priority launch support",
    ],
  },
  {
    name: "PREMIER",
    price: "From $2,499",
    lead: "Custom creative direction for a presence with more moving parts.",
    turnaround: "Custom quoted based on scope.",
    features: [
      "Up to 12 pages",
      "Custom creative direction",
      "Advanced integrations & functionality",
      "Custom forms and workflows",
      "Advanced conversion strategy",
      "Expanded SEO architecture",
      "Brand direction",
      "Launch campaign assets",
      "Priority development",
      "Strategy consultation",
      "3 revision rounds",
    ],
  },
];

const ADDONS = [
  ["Brand Starter", "$497"],
  ["Complete Brand Identity", "$997"],
  ["Brand + Website", "From $1,799"],
  ["Social Starter", "$297"],
  ["Social Management", "From $599/mo"],
  ["Website Care", "$79/mo"],
  ["Website Management", "$149/mo"],
  ["Vacation Rental Booking Management", "$149/mo"],
  ["Growth", "From $497/mo"],
];

export function Pricing() {
  return (
    <section id="pricing" className="relative bg-ink-deep px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[110rem]">
        <Reveal>
          <SectionLabel>Starting points</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.1rem,6.4vw,5.4rem)] leading-[0.92] text-ivory">
            CLEAR NUMBERS.{" "}
            <span className="italic text-gold-foil">No mystery invoices.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 90} className="h-full">
              <article
                className={cn(
                  "group relative flex h-full flex-col bg-ink p-7 transition-colors duration-500 md:p-10",
                  t.badge && "bg-ink-raised",
                )}
              >
                {t.badge ? (
                  <span className="absolute right-6 top-7 bg-gold px-3 py-1 text-[0.55rem] uppercase tracking-[0.3em] text-ink">
                    {t.badge}
                  </span>
                ) : null}
                <p className="text-[0.62rem] uppercase tracking-[0.34em] text-gold">{t.name}</p>
                <p className="mt-6 font-display text-[clamp(2.4rem,5vw,4rem)] leading-none text-ivory">
                  {t.price}
                </p>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {t.lead}
                </p>
                <ul className="mt-8 flex-1 space-y-3 border-t border-border pt-8">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm text-muted-foreground">
                      <span aria-hidden className="mt-[0.55em] h-px w-3 shrink-0 bg-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-[0.62rem] uppercase leading-relaxed tracking-[0.2em] text-muted-foreground/70">
                  {t.turnaround}
                </p>
                <div className="mt-7">
                  <MagneticLink href="#start" variant={t.badge ? "gold" : "ghost"}>
                    Choose {t.name.toLowerCase()}
                  </MagneticLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionLabel>Branding &amp; ongoing</SectionLabel>
            <ul className="mt-6 border-t border-border">
              {ADDONS.map(([name, price]) => (
                <li
                  key={name}
                  className="group flex items-baseline justify-between gap-6 border-b border-border py-4"
                >
                  <span className="font-display text-lg text-ivory transition-colors duration-500 group-hover:text-gold md:text-2xl">
                    {name}
                  </span>
                  <span className="shrink-0 text-[0.7rem] uppercase tracking-[0.24em] text-gold">
                    {price}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="border border-border bg-ink p-7 md:p-10">
            <SectionLabel>How it works</SectionLabel>
            <p className="mt-6 font-display text-2xl leading-snug text-ivory">
              50% deposit to begin. 50% before launch.
            </p>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <li>Payment plans available where appropriate.</li>
              <li>
                Third-party software, domain, hosting/subscriptions and premium integrations are
                separate unless included in your proposal.
              </li>
              <li>Additional revisions outside your package are billed separately.</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}