import { useState } from "react";
import { MagneticLink, Reveal, SectionLabel } from "./primitives";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    id: "web",
    index: "01",
    title: "WEB DESIGN",
    line: "Custom websites built around the action your business needs.",
    body: "Structure, hierarchy, and copy flow designed around one visitor journey. Mobile-first, fast, and built so the next step is always obvious.",
    points: [
      "Custom design — no template skins",
      "Conversion-focused page structure",
      "Booking, payment and lead integrations",
      "SEO foundations and analytics setup",
    ],
  },
  {
    id: "brand",
    index: "02",
    title: "BRAND IDENTITY",
    line: "Visual systems people remember after they close the tab.",
    body: "Logo, type, palette, and the rules that keep everything consistent — from your site to your signage, listings, and social presence.",
    points: [
      "Logo and mark development",
      "Type, color, and layout system",
      "Brand guidelines your team can use",
      "Collateral and launch assets",
    ],
  },
  {
    id: "growth",
    index: "03",
    title: "DIGITAL GROWTH",
    line: "The work that continues after launch day.",
    body: "SEO foundations, social assets and management, ongoing optimization and support — so your presence keeps improving instead of aging out.",
    points: [
      "On-page SEO and content structure",
      "Social assets and management",
      "Analytics, tracking and iteration",
      "Care plans and ongoing support",
    ],
  },
];

export function Services() {
  const [open, setOpen] = useState("web");

  return (
    <section id="services" className="surface-grain relative bg-ink-deep px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[110rem]">
        <Reveal>
          <SectionLabel>What we make</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.1rem,6.4vw,5.4rem)] leading-[0.92] text-ivory">
            THREE WAYS WE MAKE YOU{" "}
            <span className="italic text-gold-foil">unmistakable.</span>
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-border">
          {SERVICES.map((s) => {
            const isOpen = open === s.id;
            return (
              <div key={s.id} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? "" : s.id)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center gap-5 py-7 text-left md:gap-10 md:py-10"
                >
                  <span className="font-sans text-[0.65rem] tracking-[0.3em] text-gold">
                    {s.index}
                  </span>
                  <span
                    className={cn(
                      "flex-1 font-display text-[clamp(1.7rem,5.4vw,4.2rem)] leading-none transition-colors duration-500",
                      isOpen ? "text-gold-foil" : "text-ivory group-hover:text-gold",
                    )}
                  >
                    {s.title}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "shrink-0 text-2xl text-gold transition-transform duration-500 [transition-timing-function:var(--ease-ink)]",
                      isOpen && "rotate-45",
                    )}
                  >
                    +
                  </span>
                </button>

                <div
                  className={cn(
                    "grid overflow-hidden transition-[grid-template-rows,opacity] duration-700 [transition-timing-function:var(--ease-ink)]",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="min-h-0">
                    <div className="grid gap-8 pb-10 md:grid-cols-[1.1fr_1fr] md:gap-16 md:pl-[4.5rem]">
                      <div>
                        <p className="font-display text-xl leading-snug text-ivory md:text-2xl">
                          {s.line}
                        </p>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                          {s.body}
                        </p>
                        <div className="mt-8">
                          <MagneticLink href="#start" variant="ghost">
                            Discuss this
                          </MagneticLink>
                        </div>
                      </div>
                      <ul className="space-y-3 border-l border-border pl-6">
                        {s.points.map((p) => (
                          <li
                            key={p}
                            className="flex gap-3 text-sm text-muted-foreground"
                          >
                            <span aria-hidden className="mt-[0.55em] h-px w-4 shrink-0 bg-gold" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Reveal delay={120}>
          <div className="mt-14 flex flex-col gap-8 border border-border bg-ink p-7 md:flex-row md:items-center md:justify-between md:p-12">
            <div className="max-w-2xl">
              <SectionLabel>Specialty</SectionLabel>
              <h3 className="mt-4 font-display text-3xl leading-tight text-ivory md:text-5xl">
                VACATION RENTALS &amp;{" "}
                <span className="italic text-gold-foil">direct booking.</span>
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A dedicated path for owners who want a property brand of their own instead of a
                marketplace listing: direct booking integration, property storytelling, guest-first
                structure, and the details that make a stay feel worth the rate.
              </p>
            </div>
            <MagneticLink href="#start">Rental owners start here</MagneticLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}