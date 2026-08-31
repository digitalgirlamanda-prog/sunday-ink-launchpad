import { MagneticLink, Reveal, SectionLabel } from "./primitives";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Essential",
    price: "$999",
    lead: "A serious first website, done properly.",
    turnaround: "Typical turnaround 7–10 business days, excluding client delays.",
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
    name: "Signature",
    price: "$1,499",
    badge: "Most popular",
    lead: "Everything in Essential, built to convert harder.",
    turnaround: "Typical turnaround 10–14 business days, excluding client delays.",
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
    name: "Premier",
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
    <section id="pricing" className="relative bg-ink px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[110rem]">
        <Reveal>
          <SectionLabel>Starting points</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.1rem,6.4vw,5.4rem)] leading-[0.92] text-ivory">
            CLEAR NUMBERS. <span className="italic text-gold-foil">No mystery invoices.</span>
          </h2>
        </Reveal>

        {/* Rate card — editorial bands, not a comparison table */}
        <div className="mt-14 border-t border-border">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <article
                className={cn(
                  "relative grid gap-x-10 gap-y-6 border-b border-border py-10 md:py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)_auto] lg:items-start",
                  t.badge && "bg-ink-raised/50 lg:px-8 lg:-mx-8",
                )}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-4">
                    <h3 className="font-display text-[clamp(2rem,4.6vw,3.6rem)] leading-none text-ivory">
                      {t.name}
                    </h3>
                    {t.badge && <span className="stamp text-gold">{t.badge}</span>}
                  </div>
                  <p className="mt-4 font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-none text-gold-foil">
                    {t.price}
                  </p>
                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {t.lead}
                  </p>
                </div>

                <div>
                  <p className="max-w-2xl text-sm leading-loose text-muted-foreground">
                    {t.features.map((f, fi) => (
                      <span key={f}>
                        <span className="text-ivory/85">{f}</span>
                        {fi < t.features.length - 1 && (
                          <span aria-hidden className="mx-2 text-oxblood-bright">
                            ·
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                  <p className="mt-5 text-[0.62rem] uppercase leading-relaxed tracking-[0.2em] text-muted-foreground/60">
                    {t.turnaround}
                  </p>
                </div>

                <div className="lg:pt-2">
                  <MagneticLink href="#start" variant={t.badge ? "gold" : "ghost"}>
                    Choose {t.name.toLowerCase()}
                  </MagneticLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <SectionLabel>Branding &amp; ongoing</SectionLabel>
            <ul className="mt-8 columns-1 gap-12 md:columns-2">
              {ADDONS.map(([name, price]) => (
                <li
                  key={name}
                  className="group mb-5 flex items-baseline gap-3 break-inside-avoid"
                >
                  <span className="font-display text-lg leading-snug text-ivory transition-colors duration-500 group-hover:text-gold md:text-xl">
                    {name}
                  </span>
                  <span aria-hidden className="flex-1 border-b border-dotted border-border" />
                  <span className="shrink-0 text-[0.68rem] uppercase tracking-[0.2em] text-gold">
                    {price}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Terms as a paper note */}
          <Reveal delay={120}>
            <aside
              className="paper-grain relative rotate-[-0.8deg] bg-paper p-7 text-ink md:p-10"
              style={{ boxShadow: "var(--shadow-paper)" }}
            >
              <SectionLabel tone="oxblood">How it works</SectionLabel>
              <p className="mt-6 font-display text-2xl leading-snug">
                50% deposit to begin. 50% before launch.
              </p>
              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-ink-soft">
                <li>Payment plans available where appropriate.</li>
                <li>
                  Third-party software, domain, hosting/subscriptions and premium integrations are
                  separate unless included in your proposal.
                </li>
                <li>Additional revisions outside your package are billed separately.</li>
              </ul>
              <span className="stamp absolute -right-2 -top-3 text-moss md:-right-4">
                No surprises
              </span>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
