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
        <span className="text-[0.62rem] uppercase tracking-[0.28em] text-ink-soft">{label}</span>
        <span className="font-display text-xl text-oxblood md:text-2xl">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-8 w-full cursor-ew-resize appearance-none bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxblood [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-oxblood [&::-moz-range-track]:h-px [&::-moz-range-track]:bg-[oklch(0.2_0.012_60/30%)] [&::-webkit-slider-runnable-track]:h-px [&::-webkit-slider-runnable-track]:bg-[oklch(0.2_0.012_60/30%)] [&::-webkit-slider-thumb]:mt-[-0.6rem] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-oxblood"
      />
    </label>
  );
}

function LedgerRow({
  label,
  value,
  negative,
}: {
  label: string;
  value: string;
  negative?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-2 text-sm">
      <span className="text-ink-soft">{label}</span>
      <span aria-hidden className="mx-1 flex-1 border-b border-dotted border-paper-line" />
      <span className={`tabular-nums ${negative ? "text-oxblood" : "text-ink"}`}>{value}</span>
    </div>
  );
}

function KeepLine({ pct, tone, animate }: { pct: number; tone: string; animate: boolean }) {
  return (
    <div aria-hidden className="mt-2 h-[3px] w-full bg-[oklch(0.2_0.012_60/10%)]">
      <div
        className="h-full transition-[width] duration-700 [transition-timing-function:var(--ease-ink)]"
        style={{ width: animate ? `${pct}%` : "0%", background: tone }}
      />
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
    <section
      id="math"
      className="paper-grain relative overflow-hidden bg-paper-shade px-5 py-24 text-ink md:px-10 md:py-36"
    >
      <div ref={ref} className="mx-auto max-w-[110rem]">
        <Reveal>
          <SectionLabel tone="oxblood">The math — an illustrative scenario</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.1rem,6.4vw,5.4rem)] leading-[0.92]">
            THE EXPENSIVE PART <span className="italic text-oxblood">isn&rsquo;t the website.</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">
            Marketplace and service fees are charged on every booking, for as long as you rely on
            them. Bookings taken on a channel you own carry card processing instead. Set your own
            assumptions below and read the ledger — it&rsquo;s a scenario you control, not a
            forecast we&rsquo;re making.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-24">
          <Reveal>
            <div className="flex flex-col gap-9">
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-moss">Your assumptions</p>
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
              <p className="max-w-sm text-[0.62rem] leading-relaxed tracking-[0.08em] text-ink-soft/70">
                Assumes the same gross revenue on both paths — in practice bookings rarely move
                across all at once. Fee structures, processing rates, taxes, marketing and operating
                costs vary by property and platform.
              </p>
              <div className="hidden lg:block">
                <MagneticLink href="#start" variant="ink">
                  Build my direct-booking brand
                </MagneticLink>
              </div>
            </div>
          </Reveal>

          {/* The receipt */}
          <Reveal delay={100}>
            <div className="relative mx-auto w-full max-w-[34rem]">
              <div
                className="paper-grain relative rotate-[0.6deg] bg-paper px-6 py-8 md:px-10 md:py-10"
                style={{ boxShadow: "var(--shadow-paper)" }}
              >
                <div className="border-b border-paper-line pb-4 text-center">
                  <p className="font-display text-sm tracking-[0.3em]">
                    SUNDAY <span className="italic text-oxblood">&amp;</span> INK
                  </p>
                  <p className="mt-1.5 text-[0.55rem] uppercase tracking-[0.32em] text-ink-soft">
                    Scenario ledger — one year of bookings
                  </p>
                </div>

                <div className="mt-6">
                  <p className="text-[0.6rem] uppercase tracking-[0.3em] text-ink-soft">
                    Path A — the marketplace
                  </p>
                  <div className="mt-3 space-y-2">
                    <LedgerRow label="Gross bookings" value={money(revenue)} />
                    <LedgerRow
                      label={`Platform & service fees (${platformFee}%)`}
                      value={`− ${money(platformCost)}`}
                      negative
                    />
                    <div className="flex items-baseline gap-2 pt-1 text-base">
                      <span className="font-display">You keep</span>
                      <span aria-hidden className="mx-1 flex-1 border-b border-paper-line" />
                      <span className="font-display tabular-nums">{money(platformRetained)}</span>
                    </div>
                    <KeepLine
                      pct={(platformRetained / revenue) * 100}
                      tone="oklch(0.34 0.014 60 / 55%)"
                      animate={inView}
                    />
                  </div>
                </div>

                <div className="mt-7">
                  <p className="text-[0.6rem] uppercase tracking-[0.3em] text-ink-soft">
                    Path B — your own channel
                  </p>
                  <div className="mt-3 space-y-2">
                    <LedgerRow label="Gross bookings" value={money(revenue)} />
                    <LedgerRow
                      label={`Card processing (${processing.toFixed(1)}%)`}
                      value={`− ${money(directCost)}`}
                      negative
                    />
                    <div className="flex items-baseline gap-2 pt-1 text-base">
                      <span className="font-display">You keep</span>
                      <span aria-hidden className="mx-1 flex-1 border-b border-paper-line" />
                      <span className="font-display tabular-nums">{money(directRetained)}</span>
                    </div>
                    <KeepLine pct={(directRetained / revenue) * 100} tone="var(--moss)" animate={inView} />
                  </div>
                </div>

                <div className="mt-8 border-t border-dashed border-paper-line pt-6 text-center">
                  <p className="text-[0.6rem] uppercase tracking-[0.34em] text-ink-soft">
                    The gap, in this scenario
                  </p>
                  <p
                    aria-live="polite"
                    className="mt-2 font-display text-[clamp(2.4rem,7vw,4.6rem)] leading-none text-oxblood tabular-nums"
                  >
                    {money(shownDiff)}
                  </p>
                  <p className="mt-1.5 text-[0.55rem] uppercase tracking-[0.3em] text-ink-soft">
                    per year · with your assumptions above
                  </p>
                </div>

                <span className="stamp absolute -right-2 top-6 text-oxblood/70 md:-right-4">
                  Illustrative only
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 lg:hidden">
          <MagneticLink href="#start" variant="ink">
            Build my direct-booking brand
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
