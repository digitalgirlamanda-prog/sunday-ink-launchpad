import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal, SectionLabel } from "./primitives";

function WeakSite() {
  return (
    <div className="h-full w-full bg-[oklch(0.96_0_0)] p-4 text-[oklch(0.45_0_0)] md:p-8">
      <div className="flex items-center justify-between border-b border-[oklch(0.85_0_0)] pb-3">
        <div className="text-xs font-bold tracking-tight text-[oklch(0.35_0_0)]">
          BUSINESS NAME LLC
        </div>
        <div className="hidden gap-3 text-[9px] uppercase sm:flex">
          <span>Home</span>
          <span>About</span>
          <span>Services</span>
          <span>Contact</span>
        </div>
      </div>
      <div className="mt-5 h-24 w-full bg-[oklch(0.88_0_0)] md:h-40" />
      <div className="mt-4 h-3 w-2/3 bg-[oklch(0.86_0_0)]" />
      <div className="mt-2 h-3 w-1/2 bg-[oklch(0.88_0_0)]" />
      <div className="mt-4 inline-block bg-[oklch(0.6_0.12_240)] px-4 py-2 text-[9px] font-bold uppercase text-white">
        Learn more
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-14 bg-[oklch(0.9_0_0)] md:h-20" />
        ))}
      </div>
    </div>
  );
}

function StrongSite() {
  return (
    <div className="surface-grain relative h-full w-full overflow-hidden bg-ink-deep p-4 md:p-8">
      <span
        aria-hidden
        className="absolute -right-6 -top-10 select-none font-display text-[14rem] italic leading-none text-gold/10"
      >
        &amp;
      </span>
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="font-display text-xs tracking-[0.28em] text-ivory">THE MAKERS CO.</div>
        <div className="hidden gap-4 text-[9px] uppercase tracking-[0.24em] text-muted-foreground sm:flex">
          <span>Work</span>
          <span>Story</span>
          <span className="text-gold">Book</span>
        </div>
      </div>
      <p className="mt-6 font-display text-[clamp(1.4rem,4.6vw,3.4rem)] leading-[0.92] text-ivory">
        CRAFTED <span className="italic text-gold-foil">work</span>
        <br />
        WORTH THE WAIT.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="bg-gold px-4 py-2 text-[9px] uppercase tracking-[0.24em] text-ink">
          Request a quote
        </span>
        <span className="border border-border px-4 py-2 text-[9px] uppercase tracking-[0.24em] text-ivory">
          View projects
        </span>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-14 border border-border bg-ink-raised md:h-20"
            style={{ boxShadow: "var(--shadow-lift)" }}
          />
        ))}
      </div>
    </div>
  );
}

export function Transformation() {
  const [pos, setPos] = useState(42);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => dragging.current && setFromClientX(e.clientX);
    const up = () => (dragging.current = false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromClientX]);

  return (
    <section id="transformation" className="relative bg-ink px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[110rem]">
        <Reveal>
          <SectionLabel>The difference</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.1rem,6.4vw,5.4rem)] leading-[0.92] text-ivory">
            JUST ONLINE <span className="text-muted-foreground">&rarr;</span>{" "}
            <span className="italic text-gold-foil">impossible to ignore.</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Drag to see what changes when a business stops settling for a template. Same business,
            same offer — a completely different decision for the person on the other side of the
            screen.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div
            ref={frameRef}
            className="relative mt-12 aspect-[4/5] w-full touch-pan-y select-none overflow-hidden border border-border sm:aspect-[16/10]"
            style={{ boxShadow: "var(--shadow-lift)" }}
          >
            <div className="absolute inset-0">
              <StrongSite />
            </div>
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <WeakSite />
            </div>

            <div
              className="absolute inset-y-0 z-10 w-px bg-gold"
              style={{ left: `${pos}%`, boxShadow: "0 0 24px 2px oklch(0.79 0.108 84 / 45%)" }}
            >
              <button
                type="button"
                role="slider"
                aria-label="Reveal the redesign"
                aria-valuemin={4}
                aria-valuemax={96}
                aria-valuenow={Math.round(pos)}
                onPointerDown={(e) => {
                  dragging.current = true;
                  setFromClientX(e.clientX);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") setPos((v) => Math.max(4, v - 4));
                  if (e.key === "ArrowRight") setPos((v) => Math.min(96, v + 4));
                }}
                className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-gold bg-ink-deep text-gold"
              >
                <span className="font-display text-xl italic">&amp;</span>
              </button>
            </div>

            <span className="pointer-events-none absolute left-4 top-4 z-10 bg-ink-deep/70 px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
              Just online
            </span>
            <span className="pointer-events-none absolute right-4 top-4 z-10 bg-ink-deep/70 px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-gold">
              Impossible to ignore
            </span>
          </div>
        </Reveal>
        <p className="mt-4 text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
          Demonstration only — fictional brands, built for this comparison.
        </p>
      </div>
    </section>
  );
}