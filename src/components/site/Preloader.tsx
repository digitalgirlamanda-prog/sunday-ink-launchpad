import { useEffect, useState } from "react";
import { useReducedMotion } from "./primitives";

/** Micro brand reveal: ~650ms total, never blocks interaction. */
export function Preloader() {
  const reduced = useReducedMotion();
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setGone(true);
      return;
    }
    const t1 = setTimeout(() => setFading(true), 380);
    const t2 = setTimeout(() => setGone(true), 700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduced]);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-ink-deep transition-opacity duration-300 [transition-timing-function:var(--ease-ink)]"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <div className="flex items-baseline gap-3">
        <span className="font-display text-2xl tracking-[0.2em] text-ivory md:text-3xl">
          SUNDAY
        </span>
        <span
          className="font-display text-4xl italic text-gold-foil md:text-5xl"
          style={{ animation: "splatter-in 0.35s var(--ease-ink) both" }}
        >
          &amp;
        </span>
        <span className="font-display text-2xl tracking-[0.2em] text-ivory md:text-3xl">INK</span>
      </div>
    </div>
  );
}
