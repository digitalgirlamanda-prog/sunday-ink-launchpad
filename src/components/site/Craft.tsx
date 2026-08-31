import { useRef } from "react";
import { MagneticLink, Reveal, SectionLabel, useReducedMotion } from "./primitives";

const ROWS = [
  {
    n: "01",
    title: "Typography that arrives",
    note: "Masked reveals guide the eye to the line that matters.",
  },
  {
    n: "02",
    title: "Actions that lean in",
    note: "Restrained physics on desktop, honest pressed states on touch.",
  },
  {
    n: "03",
    title: "Surfaces with weight",
    note: "Depth that follows the pointer — this line is doing it now.",
    tilt: true,
  },
  {
    n: "04",
    title: "Ink that spreads",
    note: "Hover this row and watch the color flood, not flash.",
    flood: true,
  },
  {
    n: "05",
    title: "Gold in the details",
    note: "Highlights drawn like brush strokes, spent sparingly.",
    foil: true,
  },
];

function Row({ r }: { r: (typeof ROWS)[number] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  const move = (e: React.MouseEvent) => {
    if (!r.tilt || reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -4;
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 2.5;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  };

  return (
    <Reveal>
      <div
        ref={ref}
        onMouseMove={move}
        onMouseLeave={reset}
        className={`group relative grid grid-cols-[2.6rem_1fr] items-baseline gap-x-3 border-b border-border py-6 transition-transform duration-300 md:grid-cols-[4rem_1fr_minmax(0,20rem)] md:gap-x-8 md:py-8 ${
          r.flood ? "overflow-hidden" : ""
        }`}
      >
        {r.flood && (
          <span
            aria-hidden
            className="absolute inset-0 -z-0 origin-left scale-x-0 transition-transform duration-700 [transition-timing-function:var(--ease-ink)] group-hover:scale-x-100"
            style={{ background: "var(--gradient-oxblood)", opacity: 0.55 }}
          />
        )}
        <span className="relative text-[0.62rem] tracking-[0.3em] text-oxblood-bright">{r.n}</span>
        <h3
          className={`relative font-display text-2xl leading-tight text-ivory md:text-4xl ${
            r.foil ? "group-hover:text-gold-foil" : ""
          }`}
        >
          {r.foil ? <span className="rule-draw cursor-default">{r.title}</span> : r.title}
        </h3>
        <p className="relative col-start-2 mt-2 max-w-md text-sm leading-relaxed text-muted-foreground md:col-start-3 md:mt-0 md:text-right">
          {r.note}
        </p>
      </div>
    </Reveal>
  );
}

export function Craft() {
  return (
    <section id="craft" className="surface-grain relative bg-ink-deep px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[110rem]">
        <Reveal>
          <SectionLabel>Proof through experience</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2rem,5.8vw,4.8rem)] leading-[0.92] text-ivory">
            EVERYTHING ON THIS PAGE{" "}
            <span className="italic text-gold-foil">is the portfolio.</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            The details you&rsquo;ve been feeling as you scroll are the same craft we build into
            client work — deliberate, fast, and never placed between a visitor and the next step.
          </p>
        </Reveal>

        <div className="mt-12 border-t border-border md:mt-16">
          {ROWS.map((r) => (
            <Row key={r.n} r={r} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            If your website feels forgettable, your brand becomes forgettable.
          </p>
          <MagneticLink href="#start">Let&rsquo;s build yours</MagneticLink>
        </div>
      </div>
    </section>
  );
}
