import { useEffect, useRef, useState } from "react";
import { Reveal, SectionLabel } from "./primitives";
import { cn } from "@/lib/utils";

const STATEMENTS = [
  { word: "Beautiful", tail: "gets attention." },
  { word: "Clear", tail: "earns trust." },
  { word: "Strategy", tail: "creates action." },
  { word: "We build", tail: "for all three." },
];

export function Manifesto() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const on = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(Math.max(-r.top / total, 0), 1) : 0;
      setProgress(p);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  const active = Math.min(STATEMENTS.length - 1, Math.floor(progress * STATEMENTS.length * 0.999));

  return (
    <section id="approach" className="relative bg-ink-deep">
      <div ref={wrapRef} className="relative h-[340vh] md:h-[400vh]">
        <div className="surface-grain sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-5 md:px-10">
          <div className="mx-auto w-full max-w-[110rem]">
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
                    <span className="italic text-gold-foil">{s.word}</span>
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
                    i <= active && "bg-gold",
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