import { SectionLabel, useSectionProgress } from "./primitives";
import { InkStroke } from "./InkStroke";
import { cn } from "@/lib/utils";

type Statement = {
  lines: string[];
  /** index of the line that carries the Signal mark */
  mark?: number;
  kind?: "underline" | "circle" | "scribble";
  note: string;
};

const STATEMENTS: Statement[] = [
  {
    lines: ["WE DON'T BUILD", "\u201CJUST A WEBSITE.\u201D"],
    note: "001 — the premise",
  },
  {
    lines: ["WE BUILD THE THING", "THEY REMEMBER."],
    mark: 1,
    kind: "underline",
    note: "002 — memory over decoration",
  },
  {
    lines: ["THE THING THEY", "SEND TO SOMEONE ELSE."],
    note: "003 — the forward",
  },
  {
    lines: ["THE THING THAT MAKES", "YOUR COMPETITION", "LOOK A LITTLE BORING."],
    mark: 2,
    kind: "scribble",
    note: "004 — the gap",
  },
  {
    lines: ["RAW.", "REFINED.", "RECOGNIZABLE."],
    mark: 2,
    kind: "circle",
    note: "005 — the studio",
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
      <div ref={ref} className="relative h-[380vh] md:h-[460vh]">
        <div className="surface-grain sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-5 md:px-10">
          {/* Chapter numeral, cropped off the edge */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-[-3rem] top-1/2 hidden -translate-y-1/2 select-none font-display text-[26rem] leading-none md:block"
            style={{ WebkitTextStroke: "1px oklch(0.965 0.008 85 / 9%)", color: "transparent" }}
          >
            0{active + 1}
          </span>

          <div className="relative mx-auto w-full max-w-[110rem]">
            <div className="flex items-baseline justify-between gap-6">
              <SectionLabel>Manifesto</SectionLabel>
              <span className="annotation text-dust/60">{current.note}</span>
            </div>

            <div className="relative mt-10 h-[46vh] md:h-[52vh]">
              {STATEMENTS.map((s, i) => (
                <div
                  key={s.lines.join()}
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
                  <p className="font-display text-[clamp(2rem,7.6vw,7rem)] leading-[0.92] tracking-[-0.02em] text-ivory">
                    {s.lines.map((line, li) => (
                      <span
                        key={line}
                        className="relative block"
                        style={{ paddingLeft: `${li * 3}vw` }}
                      >
                        <span className={cn(li === s.mark && "relative inline-block")}>
                          {line}
                          {li === s.mark && i === active && (
                            <InkStroke
                              key={`${i}-mark`}
                              kind={s.kind ?? "underline"}
                              width={s.kind === "circle" ? 3 : 4}
                              delay={420}
                              className={cn(
                                "absolute left-[-3%] w-[106%]",
                                s.kind === "circle"
                                  ? "top-[-14%] h-[128%]"
                                  : "bottom-[-0.18em] h-[0.3em]",
                              )}
                            />
                          )}
                        </span>
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-2" aria-hidden>
              {STATEMENTS.map((s, i) => (
                <span
                  key={s.note}
                  className={cn(
                    "h-px flex-1 origin-left transition-all duration-700",
                    i <= active ? "bg-signal" : "bg-border",
                  )}
                />
              ))}
            </div>

            <p className="mt-8 max-w-xl text-sm leading-relaxed text-dust md:text-base">
              Good design gets admired. Great design gets remembered — and remembered businesses get
              chosen. Every decision here is made around the one action your business actually needs
              next.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
