import { MagneticLink, Reveal } from "./primitives";
import { InkStroke } from "./InkStroke";

export function FinalCTA() {
  return (
    <section
      id="unmissable"
      className="surface-grain relative overflow-hidden bg-ink px-5 py-28 md:px-10 md:py-44"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[22rem] italic leading-none md:block"
        style={{ WebkitTextStroke: "1px oklch(0.965 0.008 85 / 6%)", color: "transparent" }}
      >
        &amp;
      </span>

      <div className="relative mx-auto max-w-[110rem]">
        <div className="flex items-baseline justify-between gap-6">
          <span className="text-[0.58rem] uppercase tracking-[0.42em] text-signal">
            End of issue
          </span>
          <span className="annotation text-dust/60">Looking like everybody else is expensive.</span>
        </div>

        <Reveal>
          <h2 className="mt-10 font-display text-[clamp(2.6rem,10vw,9rem)] leading-[0.86] tracking-[-0.02em] text-ivory">
            YOU&rsquo;VE SEEN
            <span className="block pl-[6vw]">WHAT FORGETTABLE</span>
            <span className="relative inline-block">
              LOOKS LIKE.
              <InkStroke
                kind="underline"
                width={5}
                delay={300}
                className="absolute bottom-[-0.16em] left-[-2%] h-[0.3em] w-[104%]"
              />
            </span>
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-10 font-display text-[clamp(1.8rem,6vw,5rem)] italic leading-[0.95] text-dust">
            Let&rsquo;s not do that.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-14 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
            <MagneticLink href="#start" className="px-10 py-5">
              Make my business unmissable
            </MagneticLink>
            <p className="max-w-sm text-[0.62rem] uppercase leading-relaxed tracking-[0.28em] text-dust/80">
              Sunday &amp; Ink — websites and brand experiences for businesses worth noticing.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
