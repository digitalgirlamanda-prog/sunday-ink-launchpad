import { useEffect, useState } from "react";
import { useReducedMotion } from "./primitives";

export function Preloader() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setGone(true);
      return;
    }
    const t1 = setTimeout(() => setPhase(1), 420);
    const t2 = setTimeout(() => setPhase(2), 1180);
    const t3 = setTimeout(() => setGone(true), 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [reduced]);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className="surface-grain fixed inset-0 z-[100] flex items-center justify-center bg-ink-deep transition-opacity duration-700 [transition-timing-function:var(--ease-ink)]"
      style={{ opacity: phase === 2 ? 0 : 1 }}
    >
      <div className="relative flex flex-col items-center">
        <svg viewBox="0 0 400 120" className="w-[min(70vw,520px)]">
          <defs>
            <linearGradient id="pl-gold" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.62 0.098 72)" />
              <stop offset="45%" stopColor="oklch(0.93 0.08 92)" />
              <stop offset="100%" stopColor="oklch(0.68 0.1 76)" />
            </linearGradient>
          </defs>
          <path
            d="M10 96 C120 96 280 96 390 96"
            fill="none"
            stroke="url(#pl-gold)"
            strokeWidth="1.4"
            strokeDasharray="400"
            style={{ animation: "ink-draw 0.9s var(--ease-ink) forwards", ["--dash" as string]: "400" }}
          />
          <text
            x="200"
            y="80"
            textAnchor="middle"
            fill="url(#pl-gold)"
            fontFamily="var(--font-display)"
            fontStyle="italic"
            fontSize="96"
            opacity={phase >= 1 ? 1 : 0}
            style={{
              transition: "opacity 0.9s var(--ease-ink), transform 0.9s var(--ease-ink)",
            }}
          >
            &amp;
          </text>
        </svg>
        <p
          className="mt-6 text-[0.7rem] uppercase tracking-[0.55em] text-ivory transition-all duration-700 [transition-timing-function:var(--ease-ink)]"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            letterSpacing: phase >= 1 ? "0.55em" : "0.9em",
          }}
        >
          Sunday &amp; Ink
        </p>
      </div>
    </div>
  );
}