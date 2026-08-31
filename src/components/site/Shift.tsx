import { SectionLabel, useSectionProgress } from "./primitives";
import bakeryImg from "@/assets/shift-bakery.jpg";
import { cn } from "@/lib/utils";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (v: number) => 1 - Math.pow(1 - v, 3);
/** eased 0→1 as p moves from a to b */
const sm = (p: number, a: number, b: number) => easeOut(clamp01((p - a) / (b - a)));

const STAGES = [
  { n: "01", label: "Invisible", note: "A template doing its best — it could be anyone, anywhere." },
  { n: "02", label: "Considered", note: "Voice, typography and hierarchy arrive. It starts to sound like someone." },
  { n: "03", label: "Unmistakable", note: "Imagery, color and intent. Now it's a place — not a page." },
];

/** Stage 1 — the template. Deliberately flat. */
function GenericLayer({ o, y }: { o: number; y: number }) {
  return (
    <div
      aria-hidden={o < 0.5}
      className="absolute inset-0 flex flex-col p-5 md:p-10"
      style={{ opacity: o, transform: `translate3d(0, ${y}px, 0)`, pointerEvents: "none" }}
    >
      <div className="flex items-center justify-between border-b border-[oklch(0.85_0_0)] pb-3">
        <span className="text-[10px] font-bold text-[oklch(0.45_0_0)]">MARLOWS BAKERY LLC</span>
        <span className="hidden gap-3 text-[9px] uppercase text-[oklch(0.55_0_0)] sm:flex">
          <span>Home</span>
          <span>About</span>
          <span>Menu</span>
          <span>Contact</span>
        </span>
      </div>
      <div className="mt-5 flex h-20 items-center justify-center bg-[oklch(0.88_0_0)] md:h-32">
        <span className="text-[9px] text-[oklch(0.55_0_0)]">header-photo.jpg</span>
      </div>
      <p className="mt-4 text-center text-sm font-bold text-[oklch(0.4_0_0)] md:text-xl">
        Welcome To Our Website!
      </p>
      <div className="mx-auto mt-3 h-2.5 w-2/3 bg-[oklch(0.88_0_0)]" />
      <div className="mx-auto mt-2 h-2.5 w-1/2 bg-[oklch(0.9_0_0)]" />
      <div className="mt-5 flex justify-center">
        <span className="bg-[oklch(0.55_0.15_262)] px-4 py-2 text-[9px] font-bold uppercase text-white">
          Click here
        </span>
      </div>
      <div className="mt-auto grid grid-cols-3 gap-3 pt-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-10 bg-[oklch(0.9_0_0)] md:h-16" />
        ))}
      </div>
    </div>
  );
}

/** Stage 2 — considered. Same business finding its voice on paper. */
function ConsideredLayer({ o, y, s }: { o: number; y: number; s: number }) {
  return (
    <div
      aria-hidden={o < 0.5}
      className="absolute inset-0 flex flex-col p-5 md:p-10"
      style={{
        opacity: o,
        transform: `translate3d(0, ${y}px, 0) scale(${s})`,
        pointerEvents: "none",
      }}
    >
      <div className="flex items-center justify-between border-b border-paper-line pb-3">
        <span className="font-display text-xs tracking-[0.26em] text-ink">MARLOW &amp; CO.</span>
        <span className="hidden gap-4 text-[9px] uppercase tracking-[0.2em] text-ink-soft sm:flex">
          <span>Mornings</span>
          <span>Menu</span>
          <span>Find us</span>
        </span>
      </div>
      <p className="mt-6 max-w-[16ch] font-display text-2xl leading-[1.02] text-ink md:text-5xl">
        Baked before the town wakes.
      </p>
      <p className="mt-4 max-w-sm text-xs leading-relaxed text-ink-soft md:text-sm">
        Small-batch sourdough on Maple Row. Out of the oven at seven, gone by nine.
      </p>
      <span className="rule-draw mt-5 self-start text-[0.65rem] uppercase tracking-[0.24em] text-oxblood">
        Reserve a loaf &rarr;
      </span>
      <div className="mt-auto flex items-end gap-4 pt-4">
        <img
          src={bakeryImg}
          alt=""
          width={1280}
          height={960}
          loading="lazy"
          decoding="async"
          className="h-16 w-28 object-cover md:h-24 md:w-44"
          style={{ filter: "saturate(0.35) contrast(0.96)" }}
        />
        <span className="pb-1 text-[9px] uppercase tracking-[0.24em] text-ink-soft">
          The 6 a.m. bake
        </span>
      </div>
    </div>
  );
}

/** Stage 3 — unmistakable. Color floods, imagery arrives, intent everywhere. */
function BrandLayer({ o, y, s, img }: { o: number; y: number; s: number; img: number }) {
  return (
    <div
      aria-hidden={o < 0.5}
      className="absolute inset-0 overflow-hidden"
      style={{
        opacity: o,
        transform: `translate3d(0, ${y}px, 0) scale(${s})`,
        pointerEvents: "none",
      }}
    >
      {/* Photography floods the right */}
      <div
        className="absolute inset-y-0 right-0 w-[46%]"
        style={{ clipPath: `inset(0 0 0 ${(1 - img) * 100}%)` }}
      >
        <img
          src={bakeryImg}
          alt=""
          width={1280}
          height={960}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/25 to-transparent" />
      </div>

      <div className="relative flex h-full flex-col p-5 md:p-10">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="font-display text-xs tracking-[0.26em] text-ivory">
            MARLOW <span className="italic text-gold">&amp;</span> CO.
          </span>
          <span className="hidden items-center gap-4 text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:flex">
            <span>Mornings</span>
            <span>Menu</span>
            <span className="bg-gold px-2.5 py-1 tracking-[0.18em] text-ink">Reserve</span>
          </span>
        </div>
        <p className="mt-5 max-w-[13ch] font-display text-[clamp(1.7rem,4.8vw,4.1rem)] leading-[0.92] text-ivory md:mt-8">
          BAKED BEFORE THE TOWN <span className="italic text-gold-foil">wakes.</span>
        </p>
        <p className="mt-4 max-w-[24rem] text-xs leading-relaxed text-muted-foreground md:text-sm">
          Twenty-two loaves a morning, never more. Reserve by six — or take your chances at the
          counter.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="bg-gold px-4 py-2.5 text-[9px] uppercase tracking-[0.24em] text-ink">
            Reserve today&rsquo;s batch
          </span>
          <span className="hidden border border-border px-4 py-2.5 text-[9px] uppercase tracking-[0.24em] text-ivory sm:inline-block">
            The menu
          </span>
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
          <span>Family-run · Maple Row</span>
          <span className="text-gold">Open 7–12, Wed–Sun</span>
          <span className="stamp hidden text-oxblood-bright md:inline-block">Worth waking for</span>
        </div>
      </div>
    </div>
  );
}

export function Shift() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  // small dwell at both ends so the first and last states hold
  const p = clamp01((progress - 0.04) / 0.92);

  const outGeneric = sm(p, 0.16, 0.4);
  const inConsidered = sm(p, 0.18, 0.42);
  const outConsidered = sm(p, 0.56, 0.78);
  const inBrand = sm(p, 0.58, 0.8);
  const stage = p < 0.3 ? 0 : p < 0.69 ? 1 : 2;
  /** true once the oxblood flood is behind the copy — flip text to paper for contrast */
  const onFlood = inBrand > 0.55;

  const scrollToFrac = (frac: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + frac * total, behavior: "auto" });
  };

  return (
    <section id="shift" className="paper-grain relative bg-paper text-ink">
      <div ref={ref} className="relative h-[300vh] md:h-[340vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-5 pb-4 pt-24 md:px-10 md:pt-28">
          {/* Oxblood flood breaking out of the grid as the brand arrives */}
          <div
            aria-hidden
            className="absolute inset-y-[36%] right-0 w-[86%] origin-right md:top-[8%] md:bottom-[22%] md:w-[58%]"
            style={{
              background: "var(--gradient-oxblood)",
              transform: `scaleX(${inBrand}) rotate(-2deg) translateX(6%)`,
              opacity: inBrand * 0.92,
            }}
          />

          <div className="relative mx-auto w-full max-w-[76rem]">
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
              <div>
                <SectionLabel tone="oxblood">The Sunday &amp; Ink shift</SectionLabel>
                <h2 className="mt-3 font-display text-[clamp(1.9rem,5vw,4.2rem)] leading-[0.94]">
                  INVISIBLE <span aria-hidden className="text-ink-soft/50">&rarr;</span>{" "}
                  <span className="italic text-oxblood">unmistakable.</span>
                </h2>
              </div>
              <p
                className={cn(
                  "hidden max-w-xs pb-2 text-sm leading-relaxed transition-colors duration-700 lg:block",
                  onFlood ? "text-paper/90" : "text-ink-soft",
                )}
              >
                One business, taken through the process. Keep scrolling — or scrub — and watch what
                changes.
              </p>
            </div>

            {/* Stage rail */}
            <div className="mt-5 flex gap-2 md:mt-7 md:gap-3" role="tablist" aria-label="Transformation stages">
              {STAGES.map((s, i) => (
                <button
                  key={s.n}
                  type="button"
                  role="tab"
                  aria-selected={stage === i}
                  onClick={() => scrollToFrac(0.06 + (i / 2) * 0.88)}
                  className={cn(
                    "flex-1 border-t-2 pt-2 text-left transition-colors duration-500 md:flex-none md:min-w-[9rem]",
                    stage === i
                      ? "border-oxblood text-oxblood"
                      : "border-paper-line text-ink-soft/60 hover:text-ink-soft",
                  )}
                >
                  <span className="block text-[0.58rem] tracking-[0.3em]">{s.n}</span>
                  <span className="block text-[0.68rem] uppercase tracking-[0.22em] md:text-[0.72rem]">
                    {s.label}
                  </span>
                </button>
              ))}
            </div>

            {/* The page being transformed */}
            <div
              className="relative mt-4 h-[40svh] w-full overflow-hidden md:mt-6 md:h-[44svh]"
              style={{
                boxShadow: `0 ${18 + inBrand * 30}px ${50 + inBrand * 40}px -30px oklch(0.1 0.02 30 / ${0.35 + inBrand * 0.35})`,
              }}
            >
              {/* background temperature: template gray → paper → ink */}
              <div className="absolute inset-0 bg-[oklch(0.96_0_0)]" />
              <div
                className="absolute inset-0 bg-paper-shade"
                style={{ opacity: inConsidered }}
              />
              <div className="surface-grain absolute inset-0 bg-ink" style={{ opacity: inBrand }} />

              <GenericLayer o={1 - outGeneric} y={outGeneric * -18} />
              <ConsideredLayer
                o={inConsidered * (1 - outConsidered)}
                y={(1 - inConsidered) * 22 + outConsidered * -18}
                s={0.97 + inConsidered * 0.03}
              />
              <BrandLayer
                o={inBrand}
                y={(1 - inBrand) * 24}
                s={0.97 + inBrand * 0.03}
                img={sm(p, 0.66, 0.92)}
              />
            </div>

            {/* Scrub control */}
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 md:mt-5">
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={Math.round(p * 100)}
                onChange={(e) => scrollToFrac(0.04 + (Number(e.target.value) / 100) * 0.92)}
                aria-label="Scrub the transformation"
                className="h-8 w-full cursor-ew-resize appearance-none bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxblood sm:max-w-sm [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-oxblood [&::-moz-range-track]:h-px [&::-moz-range-track]:bg-[oklch(0.2_0.012_60/30%)] [&::-webkit-slider-runnable-track]:h-px [&::-webkit-slider-runnable-track]:bg-[oklch(0.2_0.012_60/30%)] [&::-webkit-slider-thumb]:mt-[-0.48rem] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-oxblood"
              />
              <p className="min-w-0 flex-1 text-[0.62rem] leading-relaxed tracking-[0.06em] text-ink-soft/80 md:text-[0.68rem]">
                {STAGES[stage]!.note}
              </p>
            </div>

            <p className="mt-3 text-[0.58rem] uppercase tracking-[0.26em] text-ink-soft/50">
              Marlow &amp; Co. is fictional — the process is the real thing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
