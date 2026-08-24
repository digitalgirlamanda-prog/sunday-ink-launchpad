import { useCallback, useEffect, useRef, useState } from "react";
import { MagneticLink, Reveal, SectionLabel } from "./primitives";

function ListingSide() {
  return (
    <div className="h-full w-full bg-[oklch(0.96_0_0)] p-4 text-[oklch(0.42_0_0)] md:p-7">
      <div className="flex items-center justify-between border-b border-[oklch(0.86_0_0)] pb-3">
        <div className="h-3 w-24 bg-[oklch(0.82_0_0)]" />
        <div className="hidden gap-2 sm:flex">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-3 w-12 bg-[oklch(0.88_0_0)]" />
          ))}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="col-span-2 h-24 bg-[oklch(0.88_0_0)] md:h-36" />
        <div className="grid gap-2">
          <div className="h-11 bg-[oklch(0.9_0_0)] md:h-[4.25rem]" />
          <div className="h-11 bg-[oklch(0.9_0_0)] md:h-[4.25rem]" />
        </div>
      </div>
      <div className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-[oklch(0.35_0_0)]">
        Entire home • 3 bd • Sleeps 6
      </div>
      <div className="mt-1 h-2.5 w-1/2 bg-[oklch(0.88_0_0)]" />
      <div className="mt-4 flex items-center gap-2">
        <span className="bg-[oklch(0.55_0.16_20)] px-3 py-1.5 text-[9px] font-bold uppercase text-white">
          Reserve
        </span>
        <span className="text-[9px] text-[oklch(0.5_0_0)]">+ service fee at checkout</span>
      </div>
      <div className="mt-4 space-y-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-2 w-full bg-[oklch(0.91_0_0)]" />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2 opacity-70">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-8 bg-[oklch(0.92_0_0)]" />
        ))}
      </div>
      <p className="mt-3 text-[9px] uppercase tracking-widest text-[oklch(0.55_0_0)]">
        Similar stays nearby
      </p>
    </div>
  );
}

function BrandSide() {
  return (
    <div className="surface-grain relative h-full w-full overflow-hidden bg-ink-deep p-4 md:p-7">
      <span
        aria-hidden
        className="absolute -right-6 -top-12 select-none font-display text-[13rem] italic leading-none text-gold/10"
      >
        &amp;
      </span>
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="font-display text-xs tracking-[0.28em] text-ivory">THE LAKE HOUSE</div>
        <div className="hidden gap-4 text-[9px] uppercase tracking-[0.24em] text-muted-foreground sm:flex">
          <span>The house</span>
          <span>The lake</span>
          <span className="text-gold">Book direct</span>
        </div>
      </div>
      <p className="mt-6 font-display text-[clamp(1.3rem,4.4vw,3.1rem)] leading-[0.94] text-ivory">
        STAY WHERE THE <span className="italic text-gold-foil">water</span>
        <br />
        DOES THE TALKING.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="bg-gold px-4 py-2 text-[9px] uppercase tracking-[0.24em] text-ink">
          Check availability
        </span>
        <span className="border border-border px-4 py-2 text-[9px] uppercase tracking-[0.24em] text-ivory">
          No service fees
        </span>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-14 border border-border bg-ink-raised md:h-[4.5rem]"
            style={{ boxShadow: "var(--shadow-lift)" }}
          />
        ))}
      </div>
      <p className="mt-4 text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
        Direct reservations • Guest journey owned end to end
      </p>
    </div>
  );
}

const STAGES = ["Listing", "Brand", "Direct booking business"];

export function ListingToBrand() {
  const [pos, setPos] = useState(38);
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

  const stage = pos < 40 ? 0 : pos < 72 ? 1 : 2;

  return (
    <section id="transformation-direct" className="relative bg-ink px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[110rem]">
        <Reveal>
          <SectionLabel>The leap</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 max-w-5xl font-display text-[clamp(2rem,6vw,5rem)] leading-[0.92] text-ivory">
            LISTING <span className="text-muted-foreground">&rarr;</span> BRAND{" "}
            <span className="text-muted-foreground">&rarr;</span>{" "}
            <span className="italic text-gold-foil">direct booking business.</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            On a marketplace you are one tile among thousands, priced against the tile beside you.
            Drag to see the same property become something guests search for by name — with a
            booking experience you own.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <ol className="mt-10 flex flex-wrap gap-6">
            {STAGES.map((s, i) => (
              <li
                key={s}
                className={`text-[0.62rem] uppercase tracking-[0.3em] transition-colors duration-500 ${
                  i <= stage ? "text-gold" : "text-muted-foreground/50"
                }`}
              >
                <span className="mr-2 opacity-60">0{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={220}>
          <div
            ref={frameRef}
            className="relative mt-8 aspect-[4/5] w-full touch-pan-y select-none overflow-hidden border border-border sm:aspect-[16/10]"
            style={{ boxShadow: "var(--shadow-lift)" }}
          >
            <div className="absolute inset-0">
              <BrandSide />
            </div>
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <ListingSide />
            </div>

            <div
              className="absolute inset-y-0 z-10 w-px bg-gold"
              style={{ left: `${pos}%`, boxShadow: "0 0 24px 2px oklch(0.79 0.108 84 / 45%)" }}
            >
              <button
                type="button"
                role="slider"
                aria-label="Reveal the direct-booking brand"
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

            <span className="pointer-events-none absolute left-4 top-4 z-10 max-w-[45%] bg-ink-deep/70 px-3 py-1 text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
              Just another listing
            </span>
            <span className="pointer-events-none absolute right-4 top-4 z-10 max-w-[50%] bg-ink-deep/70 px-3 py-1 text-right text-[0.6rem] uppercase tracking-[0.28em] text-gold">
              A brand people remember
            </span>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            A brand people remember — and a booking experience you own. Demonstration only:
            fictional interfaces built for this comparison.
          </p>
          <MagneticLink href="#start" variant="ghost">
            Build my direct-booking brand
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
