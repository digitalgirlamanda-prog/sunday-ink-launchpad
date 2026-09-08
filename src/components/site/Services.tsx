import { useState } from "react";
import { MagneticLink, Reveal, SectionLabel } from "./primitives";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    id: "web",
    index: "01",
    title: "WEB",
    accent: "a custom site",
    line: "Sites people remember.",
    body: "Custom built around your customers, your work and the one action your business needs next. No template skins, no borrowed layouts.",
    points: [
      "Custom desktop and mobile design",
      "Conversion-aware page structure",
      "Booking, payment and inquiry flows",
      "SEO foundations and analytics",
    ],
  },
  {
    id: "redesign",
    index: "02",
    title: "REDESIGN",
    accent: "a redesign",
    line: "For sites that stopped working.",
    body: "We keep what earns its place, cut what doesn't, and rebuild the experience around the way people actually move through your business.",
    points: [
      "Structure and content audit",
      "Rebuilt journey and hierarchy",
      "Speed and mobile repair",
      "Migration with no lost traffic",
    ],
  },
  {
    id: "landing",
    index: "03",
    title: "LANDING",
    accent: "a landing page",
    line: "One page. One decision.",
    body: "Conversion-focused pages for a launch, an offer or a campaign — written and designed so the next step is obvious in seconds.",
    points: [
      "Single-goal page architecture",
      "Offer and proof sequencing",
      "Fast turnaround",
      "Built to measure",
    ],
  },
  {
    id: "brand",
    index: "04",
    title: "BRAND",
    accent: "brand direction",
    line: "Make the business feel like something.",
    body: "Logo, type, palette and the rules that hold it together — from your site to your signage, listings and everything people screenshot.",
    points: [
      "Logo and mark development",
      "Type, colour and layout system",
      "Guidelines your team can use",
      "Launch collateral",
    ],
  },
  {
    id: "content",
    index: "05",
    title: "CONTENT",
    accent: "content support",
    line: "Give people a reason to stop scrolling.",
    body: "Social assets, ongoing support and the small consistent work that keeps a presence alive after launch day.",
    points: [
      "Social templates and assets",
      "Ongoing posting support",
      "Photography direction",
      "Care plans",
    ],
  },
];

export function Services() {
  const [active, setActive] = useState("web");
  const current = SERVICES.find((s) => s.id === active) ?? SERVICES[0]!;

  return (
    <section id="services" className="paper-grain relative overflow-hidden bg-paper px-5 py-24 text-ink md:px-10 md:py-36">
      {/* Giant index numeral behind the content */}
      <span
        aria-hidden
        key={`num-${current.id}`}
        className="pointer-events-none absolute right-[-1rem] top-16 select-none font-display text-[16rem] leading-none md:right-6 md:top-10 md:text-[30rem] animate-in fade-in duration-700"
        style={{ WebkitTextStroke: "1px oklch(0.2 0.012 60 / 12%)", color: "transparent" }}
      >
        {current.index}
      </span>

      <div className="relative mx-auto max-w-[110rem]">
        <Reveal>
          <SectionLabel tone="oxblood">What we make</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.1rem,6.4vw,5.4rem)] leading-[0.92]">
            THREE WAYS WE MAKE YOU <span className="italic text-oxblood">unmistakable.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          {/* Oversized word list */}
          <div className="flex flex-col items-start gap-2 md:gap-4" role="tablist" aria-label="Services">
            {SERVICES.map((s) => {
              const isActive = s.id === active;
              return (
                <div key={s.id} className="w-full">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(s.id)}
                    className="group flex w-full items-baseline gap-4 text-left md:gap-6"
                  >
                    <span
                      className={cn(
                        "text-[0.62rem] tracking-[0.3em] transition-colors duration-500",
                        isActive ? "text-oxblood" : "text-ink-soft/40",
                      )}
                    >
                      {s.index}
                    </span>
                    <span
                      className={cn(
                        "font-display text-[clamp(2.1rem,7vw,5.6rem)] leading-[0.98] transition-all duration-700 [transition-timing-function:var(--ease-ink)]",
                        isActive
                          ? "translate-x-2 text-ink md:translate-x-4"
                          : "text-outline-ink group-hover:text-ink-soft/70 group-hover:[-webkit-text-stroke-width:0]",
                      )}
                    >
                      {s.title}
                    </span>
                  </button>
                  {/* Mobile: content recomposes under the selected word */}
                  <div
                    className={cn(
                      "grid overflow-hidden pl-8 transition-[grid-template-rows,opacity] duration-700 [transition-timing-function:var(--ease-ink)] lg:hidden",
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="min-h-0">
                      <ServiceBody s={s} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop: recomposing editorial panel */}
          <div className="relative hidden border-l border-oxblood/30 pl-10 lg:block xl:pl-16">
            <div key={current.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ServiceBody s={current} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceBody({ s }: { s: (typeof SERVICES)[number] }) {
  return (
    <div className="pb-6 pt-4 lg:pb-0 lg:pt-2">
      <p className="max-w-md font-display text-xl leading-snug md:text-3xl">{s.line}</p>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft md:text-base">{s.body}</p>
      <p className="mt-7 max-w-md text-sm leading-loose text-ink-soft">
        {s.points.map((pt, i) => (
          <span key={pt}>
            <span className="text-ink">{pt}</span>
            {i < s.points.length - 1 && <span aria-hidden className="mx-2 text-oxblood">·</span>}
          </span>
        ))}
      </p>
      <div className="mt-8">
        <MagneticLink href="#start" variant="ink">
          Discuss {s.accent}
        </MagneticLink>
      </div>
    </div>
  );
}
