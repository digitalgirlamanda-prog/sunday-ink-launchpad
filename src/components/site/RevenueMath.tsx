import { useEffect, useRef, useState } from "react";
import { MagneticLink, Reveal, SectionLabel, useInView, useReducedMotion } from "./primitives";

const money = (n: number) =>
  `$${Math.round(n).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

function useCountUp(value: number) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      setShown(value);
      return;
    }
    const start = performance.now();
    const a = from.current;
    const step = (t: number) => {
      const p = Math.min((t - start) / 550, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setShown(a + (value - a) * e);
      if (p < 1) raf.current = requestAnimationFrame(step);
      else from.current = value;
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      from.current = value;
    };
  }, [value, reduced]);

  return shown;
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
          {label}
        </span>
        <span className="font-display text-xl text-gold-foil md:text-2xl">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-8 w-full cursor-ew-resize appearance-none bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-gold [&::-moz-range-track]:h-px [&::-moz-range-track]:bg-border [&::-webkit-slider-runnable-track]:h-px [&::-webkit-slider-runnable-track]:bg-border [&::-webkit-slider-thumb]:mt-[-0.6rem] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold"
      />
    </label>
  );
}

function Bar({
  title,
  gross,
  cost,
  costLabel,
  retained,
  tone,
  animate,
}: {
  title: string;
  gross: number;
  cost: number;
  costLabel: string;
  retained: number;
  tone: "muted" | "gold";
  animate: boolean;
}) {
  const costPct = gross > 0 ? (cost / gross) * 100 : 0;
  return (
    <div>
      <p className="text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">{title}</p>
      <p className="mt-3 font-display text-[clamp(1.8rem,5vw,3.4rem)] leading-none text-ivory">
        {money(retained)}
        <span className="ml-3 align-middle text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
          retained
        </span>
      </p>
      <div
        className="mt-4 flex h-12 w-full overflow-hidden border border-border bg-ink-deep md:h-14"
        role="img"
        aria-label={`${title}: gross ${money(gross)}, ${costLabel} ${money(cost)}, retained ${money(retained)}`}
      >
        <div
          className="h-full transition-[width] duration-700 [transition-timing-function:var(--ease-ink)]"
          style={{
            width: `${animate ? 100 - costPct : 0}%`,
            background:
              tone === "gold" ? "var(--gradient-gold)" : "oklch(0.42 0.012 68)",
          }}
        />
        <div
          className="h-full border-l border-ink-deep bg-[repeating-linear-gradient(135deg,oklch(0.55_0.16_25/45%)_0_6px,transparent_6px_12px)] transition-[width] duration-700 [transition-timing-function:var(--ease-ink)]"
          style={{ width: `${animate ? costPct : 0}%` }}
        />
      </div>
      <div className="mt-3 flex flex-wrap justify-between gap-x-6 gap-y-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
        <span>Gross {money(gross)}</span>
        <span>
          {costLabel} <span className="text-ivory">{money(cost)}</span>
        </span>
      </div>
    </div>
  );
}

export function RevenueMath() {
  const [revenue, setRevenue] = useState(60000);
  const [platformFee, setPlatformFee] = useState(15);
  const [processing, setProcessing] = useState(3);
  const { ref, inView } = useInView<HTMLDivElement>(0.12);

  const platformCost = (revenue * platformFee) / 100;
  const platformRetained = revenue - platformCost;
  const directCost = (revenue * processing) / 100;
  const directRetained = revenue - directCost;
  const difference = directRetained - platformRetained;

  const shownDiff = useCountUp(difference);

  return (
    <section id="math" className="relative bg-ink-deep px-5 py-24 md:px-10 md:py-36">
      <div ref={ref} className="mx-auto max-w-[110rem]">
        <Reveal>
          <SectionLabel>The math</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.1rem,6.4vw,5.4rem)] leading-[0.92] text-ivory">
            THE EXPENSIVE PART{" "}
            <span className="italic text-gold-foil">isn&rsquo;t the website.</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Marketplace and service fees are charged on every booking, every season, for as long as
            you rely on them. A direct-booking channel you own carries payment processing instead —
            and reduces how much of your business depends on someone else&rsquo;s platform. Move the
            controls to see how the picture changes for your property.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <div className="flex flex-col gap-9 border-l border-border pl-6 md:pl-8">
              <Slider
                label="Annual booking revenue"
                value={revenue}
                min={25000}
                max={500000}
                step={1000}
                onChange={setRevenue}
                display={money(revenue)}
              />
              <Slider
                label="Marketplace / service fee"
                value={platformFee}
                min={5}
                max={20}
                step={0.5}
                onChange={setPlatformFee}
                display={`${platformFee}%`}
              />
              <Slider
                label="Direct payment processing"
                value={processing}
                min={2.5}
                max={4}
                step={0.1}
                onChange={setProcessing}
                display={`${processing.toFixed(1)}%`}
              />
              <p className="text-[0.62rem] leading-relaxed tracking-[0.08em] text-muted-foreground/70">
                Illustrative comparison only. Marketplace fee structures, payment processing, taxes,
                marketing costs, and operating expenses vary by property and platform.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex flex-col gap-12">
              <Bar
                title="Marketplace / platform path"
                gross={revenue}
                cost={platformCost}
                costLabel="Estimated platform fees"
                retained={platformRetained}
                tone="muted"
                animate={inView}
              />
              <Bar
                title="Direct-booking path"
                gross={revenue}
                cost={directCost}
                costLabel="Estimated processing"
                retained={directRetained}
                tone="gold"
                animate={inView}
              />

              <div className="border-t border-border pt-8">
                <p className="text-[0.62rem] uppercase tracking-[0.32em] text-gold">
                  Potential difference
                </p>
                <p
                  aria-live="polite"
                  className="mt-3 font-display text-[clamp(2.6rem,10vw,7rem)] leading-[0.86] text-gold-foil"
                >
                  {money(shownDiff)}
                  <span className="ml-3 align-baseline font-sans text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground">
                    / year
                  </span>
                </p>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  Your website doesn&rsquo;t have to pay for itself once. It can become an asset you
                  own.
                </p>
                <div className="mt-8">
                  <MagneticLink href="#start">Build my direct-booking brand</MagneticLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
