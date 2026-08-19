import { useRef } from "react";
import { MagneticLink, Reveal, SectionLabel, useReducedMotion } from "./primitives";

const PROJECTS = [
  {
    name: "Knoll House",
    place: "Soldotna, Alaska",
    kind: "Vacation rental • Direct booking site",
    note: "A property brand and booking experience built to stand on its own, away from marketplace listings.",
    url: "https://knoll-house-atlas.lovable.app",
    tone: "linear-gradient(150deg, oklch(0.22 0.03 150), oklch(0.13 0.01 90))",
  },
  {
    name: "Brookhurst",
    place: "Waterfront residence",
    kind: "Hospitality • Escape-led storytelling",
    note: "A slow, image-led narrative site where the location does the selling and the booking path stays one tap away.",
    url: "https://lakehouse-direct-escape.lovable.app",
    tone: "linear-gradient(150deg, oklch(0.26 0.04 230), oklch(0.12 0.01 250))",
  },
  {
    name: "Sanctuary Digital",
    place: "Premium hospitality concept",
    kind: "Brand identity • Digital experience",
    note: "A gilded concept study exploring how far a hospitality brand can push atmosphere without losing clarity.",
    url: "https://gilded-gateway-luxe.lovable.app",
    tone: "linear-gradient(150deg, oklch(0.3 0.06 80), oklch(0.13 0.01 70))",
  },
];

function Tile({ p, i }: { p: (typeof PROJECTS)[number]; i: number }) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const reduced = useReducedMotion();

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -9;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 12;
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
  };
  const reset = () => {
    if (ref.current)
      ref.current.style.transform = "perspective(1200px) rotateX(0) rotateY(0) translateY(0)";
  };

  return (
    <Reveal delay={i * 100}>
      <a
        ref={ref}
        href={p.url}
        target="_blank"
        rel="noreferrer"
        onMouseMove={move}
        onMouseLeave={reset}
        className="group block border border-border bg-ink-raised transition-[transform,border-color,box-shadow] duration-500 [transition-timing-function:var(--ease-ink)] hover:border-gold/60"
        style={{ boxShadow: "var(--shadow-lift)" }}
      >
        <div
          className="relative aspect-[4/3] overflow-hidden"
          style={{ background: p.tone }}
          role="img"
          aria-label={`${p.name} — ${p.kind}. Screenshot placeholder.`}
        >
          <span
            aria-hidden
            className="absolute -right-6 bottom-[-3rem] select-none font-display text-[12rem] italic leading-none text-ivory/10 transition-transform duration-700 [transition-timing-function:var(--ease-ink)] group-hover:-translate-y-3"
          >
            &amp;
          </span>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
            <span className="font-display text-2xl text-ivory md:text-3xl">{p.name}</span>
            <span className="text-[0.6rem] uppercase tracking-[0.28em] text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              Open site &rarr;
            </span>
          </div>
        </div>
        <div className="p-5 md:p-7">
          <p className="text-[0.6rem] uppercase tracking-[0.28em] text-gold">{p.kind}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.note}</p>
          <p className="mt-4 text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground/70">
            {p.place}
          </p>
        </div>
      </a>
    </Reveal>
  );
}

export function Work() {
  return (
    <section id="work" className="relative bg-ink-deep px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[110rem]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionLabel>Selected work</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.1rem,6.4vw,5.4rem)] leading-[0.92] text-ivory">
                DIGITAL EXPERIENCES,{" "}
                <span className="italic text-gold-foil">built to be visited.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <MagneticLink href="#start" variant="ghost">
              Start something like this
            </MagneticLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
          {PROJECTS.map((p, i) => (
            <Tile key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}