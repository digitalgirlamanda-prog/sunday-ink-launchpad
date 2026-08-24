import { useEffect, useRef, useState } from "react";
import { MagneticLink, Reveal, SectionLabel, useReducedMotion } from "./primitives";
import { useInView } from "./primitives";

const PROJECTS = [
  {
    name: "Knoll House",
    place: "Soldotna, Alaska",
    kind: "Editorial hospitality • Destination storytelling",
    note: "A property brand built around place — the landscape carries the story, and the booking path never gets lost inside it.",
    url: "https://knoll-house-atlas.lovable.app",
    cta: "Explore the live build",
    tone: "linear-gradient(150deg, oklch(0.24 0.035 150), oklch(0.12 0.01 90))",
  },
  {
    name: "Tiki Waikiki",
    place: "Honolulu, Hawaii",
    kind: "Playful destination brand • Extended-stay hospitality",
    note: "A warm, characterful identity for longer stays — colour and voice doing the work that stock photography can't.",
    url: "https://tiki-waikiki-dream.lovable.app",
    cta: "Explore the live build",
    tone: "linear-gradient(150deg, oklch(0.32 0.07 40), oklch(0.13 0.015 30))",
  },
  {
    name: "Harry's Lake House",
    place: "Poconos, Pennsylvania",
    kind: "Direct booking • Live availability • Conversion system",
    note: "A working direct-booking system: live availability, a clear reservation path, and a brand that stands apart from the listing pages.",
    url: "https://poconolakeescape.com",
    cta: "Explore the live site",
    tone: "linear-gradient(150deg, oklch(0.26 0.04 230), oklch(0.12 0.01 250))",
  },
  {
    name: "Noah's House",
    place: "Miami, Florida",
    kind: "Luxury villa • Visual repositioning",
    note: "A repositioning study — the same property presented as an experience worth paying for rather than a room worth comparing.",
    url: "https://ethereal-web.lovable.app",
    cta: "Explore the concept",
    tone: "linear-gradient(150deg, oklch(0.3 0.06 80), oklch(0.13 0.01 70))",
  },
];

function Preview({ url, tone, name }: { url: string; tone: string; name: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setLoad(true), 220);
    return () => window.clearTimeout(t);
  }, [inView]);

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden" style={{ background: tone }}>
      <span
        aria-hidden
        className="absolute -right-8 bottom-[-4rem] select-none font-display text-[16rem] italic leading-none text-ivory/10"
      >
        &amp;
      </span>
      {load && (
        <iframe
          src={url}
          title={`Live preview of ${name}`}
          loading="lazy"
          tabIndex={-1}
          aria-hidden
          sandbox="allow-scripts allow-same-origin"
          className="pointer-events-none absolute left-0 top-0 origin-top-left border-0 opacity-0 transition-opacity duration-1000 [transition-timing-function:var(--ease-ink)]"
          style={{ width: "1440px", height: "1600px", transform: "scale(0.42)" }}
          onLoad={(e) => e.currentTarget.classList.replace("opacity-0", "opacity-100")}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-deep/85 via-ink-deep/10 to-transparent" />
    </div>
  );
}

function Tile({ p, i }: { p: (typeof PROJECTS)[number]; i: number }) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const reduced = useReducedMotion();

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
    el.style.transform = `perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
    el.style.boxShadow = "var(--shadow-lift), var(--shadow-gold)";
  };
  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1400px) rotateX(0) rotateY(0) translateY(0)";
    el.style.boxShadow = "var(--shadow-lift)";
  };

  return (
    <Reveal delay={(i % 2) * 90}>
      <a
        ref={ref}
        href={p.url}
        target="_blank"
        rel="noreferrer"
        onMouseMove={move}
        onMouseLeave={reset}
        className="group block h-full border border-border bg-ink-raised transition-[transform,border-color,box-shadow] duration-500 [transition-timing-function:var(--ease-ink)] hover:border-gold/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        style={{ boxShadow: "var(--shadow-lift)" }}
      >
        <div className="border-b border-border bg-ink-deep px-4 py-3">
          <div className="flex items-center gap-3">
            <span aria-hidden className="flex gap-1.5">
              {[0, 1, 2].map((d) => (
                <span key={d} className="h-2 w-2 rounded-full bg-ivory/15" />
              ))}
            </span>
            <span className="truncate text-[0.6rem] tracking-[0.18em] text-muted-foreground">
              {p.url.replace("https://", "")}
            </span>
          </div>
        </div>
        <div className="relative aspect-[16/11] overflow-hidden sm:aspect-[16/10]">
          <Preview url={p.url} tone={p.tone} name={p.name} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-7">
            <span className="font-display text-3xl text-ivory md:text-5xl">{p.name}</span>
            <span className="text-[0.6rem] uppercase tracking-[0.28em] text-gold">{p.place}</span>
          </div>
        </div>
        <div className="p-5 md:p-8">
          <p className="text-[0.6rem] uppercase tracking-[0.28em] text-gold">{p.kind}</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {p.note}
          </p>
          <span className="mt-6 inline-flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.28em] text-ivory transition-colors duration-500 group-hover:text-gold-bright">
            {p.cta} &rarr;
            <span
              aria-hidden
              className="h-px w-8 origin-left scale-x-50 bg-current transition-transform duration-500 [transition-timing-function:var(--ease-ink)] group-hover:scale-x-100"
            />
          </span>
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
              <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.1rem,6.4vw,5.4rem)] leading-[0.92] text-ivory">
                NOT TEMPLATES. NOT THEMES.{" "}
                <span className="italic text-gold-foil">your business, built around you.</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Different properties. Different audiences. Different visual languages. Never the
                same website twice.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <MagneticLink href="#start" variant="ghost">
              Start something like this
            </MagneticLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-10">
          {PROJECTS.map((p, i) => (
            <Tile key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
