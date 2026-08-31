import { SectionLabel, useSectionProgress } from "./primitives";
import { cn } from "@/lib/utils";

const STATEMENTS = [
  {
    word: "Beautiful",
    tail: "gets attention.",
    accent: "text-gold-foil",
    tint: "oklch(0.79 0.108 84 / 7%)",
    bar: "bg-gold",
  },
  {
    word: "Clear",
    tail: "earns trust.",
    accent: "text-ivory [text-shadow:0_0_60px_oklch(0.955_0.014_85/35%)]",
    tint: "oklch(0.955 0.014 85 / 5%)",
    bar: "bg-ivory",
  },
  {
    word: "Strategy",
    tail: "creates action.",
    accent: "text-oxblood-bright",
    tint: "oklch(0.55 0.17 27 / 9%)",
    bar: "bg-oxblood-bright",
  },
  {
    word: "We build",
    tail: "for all three.",
    accent: "text-gold-foil",
    tint: "oklch(0.79 0.108 84 / 7%)",
    bar: "bg-gold",
  },
];

export function Manifesto() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const active = Math.min(
    STATEMENTS.length - 1,
    Math.floor(progress * STATEMENTS.length * 0.999),
  );
  const current = STATEMENTS[active]!;

  return (
    <section id="approach" className="relative bg-ink-deep">
      <div ref={ref} className="relative h-[340vh] md:h-[400vh]">
        <div className="surface-grain sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-5 md:px-10">
          {/* Selective color flood per statement */}
          <div
            aria-hidden
            className="absolute inset-0 transition-[background] duration-1000"
            style={{
              background: `radial-gradient(90rem 60rem at 30% 55%, ${current.tint}, transparent 70%)`,
            }}
          />
          {/* Giant chapter numeral */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-[-2rem] top-1/2 hidden -translate-y-1/2 select-none font-display text-[24rem] leading-none md:block"
            style={{ WebkitTextStroke: "1px oklch(0.955 0.014 85 / 10%)", color: "transparent" }}
          >
            0{active + 1}
          </span>

          <div className="relative mx-auto w-full max-w-[110rem]">
            <SectionLabel>Beautiful isn&rsquo;t the goal</SectionLabel>

            <div className="relative mt-10 h-[42vh] md:h-[46vh]">
              {STATEMENTS.map((s, i) => (
                <div
                  key={s.word}
                  aria-hidden={i !== active}
                  className={cn(
                    "absolute inset-0 flex flex-col justify-center transition-all duration-[900ms] [transition-timing-function:var(--ease-ink)]",
                    i === active
                      ? "translate-y-0 opacity-100 blur-0"
                      : i < active
                        ? "-translate-y-10 opacity-0 blur-[3px]"
                        : "translate-y-10 opacity-0 blur-[3px]",
                  )}
                >
                  <p className="font-display text-[clamp(2.6rem,10vw,9rem)] leading-[0.9] tracking-[-0.02em] text-ivory">
                    <span className={cn("italic", s.accent)}>{s.word}</span>
                    <br />
                    {s.tail}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-2" aria-hidden>
              {STATEMENTS.map((s, i) => (
                <span
                  key={s.word}
                  className={cn(
                    "h-px flex-1 origin-left bg-border transition-all duration-700",
                    i <= active && s.bar,
                  )}
                />
              ))}
            </div>

            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Every Sunday &amp; Ink project is structured around the visitor journey and the single
              action your business actually needs next — an inquiry, a call, a booking, a purchase,
              a reservation, an application. Design decisions follow that path, not the other way
              around.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
