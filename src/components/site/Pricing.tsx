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

const PROCESS = [
  ["01", "Choose your starting point", "Pick the package that fits the business you actually run — not the one you might run one day."],
  ["02", "We build the direction", "Type, imagery, voice and structure. You see a real page, not a moodboard."],
  ["03", "Refine the details", "Your revision rounds, used properly. We sweat the small type."],
  ["04", "Launch something unmistakable", "Domain, tracking, handover. Then it goes to work for you."],
];

export function Pricing() {
  return (
    <section id="pricing" className="relative bg-ink px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[110rem]">
        <Reveal>
          <SectionLabel>Starting points</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.1rem,6.4vw,5.4rem)] leading-[0.95] text-ivory">
            CLEAR NUMBERS. <span className="italic text-gold-foil">No mystery invoices.</span>
          </h2>
        </Reveal>

        {/* Rate card — editorial bands, not a comparison table */}
        <div className="mt-14 border-t border-border md:mt-20">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <article
                className={cn(
                  "relative grid gap-x-12 gap-y-8 border-b border-border py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)_auto] lg:items-start",
                  t.badge && "bg-ink-raised/40 lg:-mx-8 lg:px-8",
                )}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-4">
                    <h3 className="font-display text-[clamp(2.1rem,4.6vw,3.6rem)] leading-none text-ivory">
                      {t.name}
                    </h3>
                    {t.badge && <span className="stamp text-gold">{t.badge}</span>}
                  </div>
                  <p className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] leading-none text-gold-foil">
                    {t.price}
                  </p>
                  <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-muted-foreground">
                    {t.lead}
                  </p>
                </div>

                <div>
                  <ul className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
                    {t.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-baseline gap-3 border-b border-border/50 py-3 text-[0.9rem] leading-relaxed text-ivory/85"
                      >
                        <span aria-hidden className="h-px w-3 shrink-0 translate-y-[-0.3em] bg-gold/70" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-[0.62rem] uppercase leading-relaxed tracking-[0.2em] text-muted-foreground/70">
                    {t.turnaround}
                  </p>
                </div>

                <div className="lg:pt-3">
                  <MagneticLink href="#start" variant={t.badge ? "gold" : "ghost"}>
                    Choose {t.name.toLowerCase()}
                  </MagneticLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-24">
          <div>
            <SectionLabel>Branding &amp; ongoing</SectionLabel>
            <ul className="mt-8 columns-1 gap-12 md:columns-2">
              {ADDONS.map(([name, price]) => (
                <li
                  key={name}
                  className="group mb-6 flex items-baseline gap-3 break-inside-avoid"
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

          {/* How it works — the experience, as a paper note */}
          <Reveal delay={120}>
            <aside
              className="paper-grain relative rotate-[-0.8deg] bg-paper p-7 text-ink md:p-10"
              style={{ boxShadow: "var(--shadow-paper)" }}
            >
              <SectionLabel tone="oxblood">How it works</SectionLabel>
              <ol className="mt-8 space-y-7">
                {PROCESS.map(([n, title, body]) => (
                  <li key={n} className="grid grid-cols-[2.2rem_1fr] gap-x-4">
                    <span className="pt-1 text-[0.62rem] tracking-[0.28em] text-ink-soft/70">
                      {n}
                    </span>
                    <div>
                      <h4 className="font-display text-xl leading-tight md:text-2xl">{title}</h4>
                      <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-soft">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-9 border-t border-paper-line pt-5 text-[0.75rem] leading-relaxed text-ink-soft/80">
                Third-party software, domain, hosting/subscriptions and premium integrations are
                separate unless included in your proposal. Additional revisions outside your package
                are billed separately.
              </p>
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
