import { useEffect, useRef, useState } from "react";
import { MagneticLink, Reveal, SectionLabel, useReducedMotion } from "./primitives";

const PANELS = [
  {
    kicker: "Masked typography",
    title: "Words that arrive",
    body: "Type is composed, not dropped in. Reveals guide the eye to the line that matters most on the screen.",
  },
  {
    kicker: "Magnetic actions",
    title: "Buttons that lean in",
    body: "Calls to action respond to intent with restrained physics — noticeable, never in the way of a tap.",
  },
  {
    kicker: "Perspective depth",
    title: "Surfaces with weight",
    body: "Cards and imagery tilt with the pointer so the layout feels physical instead of flat.",
  },
  {
    kicker: "Ink transitions",
    title: "Sections that bleed",
    body: "Content changes like ink spreading across a page, so scrolling feels authored rather than paginated.",
  },
  {
    kicker: "Gold detailing",
    title: "Brushed accents",
    body: "Progress, underlines, and highlights are drawn like brush strokes — the brand shows up in the small moments.",
  },
];

export function Craft() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [x, setX] = useState(0);
  const reduced = useReducedMotion();
  const [horizontal, setHorizontal] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setHorizontal(mq.matches && !reduced);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [reduced]);

  useEffect(() => {
    if (!horizontal) {
      setX(0);
      return;
    }
    const on = () => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;
      const r = wrap.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(Math.max(-r.top / total, 0), 1) : 0;
      setX(p * Math.max(0, track.scrollWidth - window.innerWidth + 80));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [horizontal]);

  return (
    <section id="craft" className="surface-grain relative bg-ink">
      <div className="mx-auto max-w-[110rem] px-5 pt-24 md:px-10 md:pt-36">
        <Reveal>
          <SectionLabel>Proof through experience</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.1rem,6.4vw,5.4rem)] leading-[0.92] text-ivory">
            IF YOUR WEBSITE FEELS FORGETTABLE,{" "}
            <span className="italic text-gold-foil">your brand becomes forgettable.</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Everything you&rsquo;ve felt on this page is the same craft we build into client work —
            used deliberately, kept fast, and never placed between a visitor and the next step.
          </p>
        </Reveal>
      </div>

      <div ref={wrapRef} style={{ height: horizontal ? "260vh" : undefined }}>
        <div
          className={
            horizontal
              ? "sticky top-0 flex h-[100svh] items-center overflow-hidden"
              : "overflow-hidden py-14"
          }
        >
          <div
            ref={trackRef}
            className="flex gap-5 px-5 md:gap-8 md:px-10"
            style={{
              transform: horizontal ? `translate3d(${-x}px,0,0)` : undefined,
              flexDirection: horizontal ? "row" : undefined,
              willChange: "transform",
            }}
          >
            {!horizontal ? (
              <div className="grid w-full gap-5 md:grid-cols-2">
                {PANELS.map((p) => (
                  <Panel key={p.title} p={p} />
                ))}
              </div>
            ) : (
              PANELS.map((p) => (
                <div key={p.title} className="w-[min(34vw,30rem)] shrink-0">
                  <Panel p={p} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[110rem] px-5 pb-24 md:px-10 md:pb-36">
        <MagneticLink href="#start">Let&rsquo;s build yours</MagneticLink>
      </div>
    </section>
  );
}

function Panel({ p }: { p: (typeof PANELS)[number] }) {
  return (
    <Reveal className="h-full">
      <article className="group flex h-full flex-col justify-between border border-border bg-ink-raised p-7 transition-colors duration-500 hover:border-gold/60 md:p-10">
        <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">{p.kicker}</p>
        <div className="mt-16">
          <h3 className="font-display text-3xl leading-tight text-ivory md:text-4xl">{p.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
        </div>
        <span
          aria-hidden
          className="mt-8 block h-px w-full origin-left scale-x-[0.15] transition-transform duration-700 [transition-timing-function:var(--ease-ink)] group-hover:scale-x-100"
          style={{ background: "var(--gradient-gold)" }}
        />
      </article>
    </Reveal>
  );
}