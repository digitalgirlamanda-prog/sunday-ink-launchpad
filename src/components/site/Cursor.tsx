import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./primitives";

/**
 * Restrained pointer system: a small Signal marker that follows the cursor and
 * picks up a word (VIEW / OPEN / DRAG) from any [data-cursor] element it enters.
 * Fine pointers only — never touch, never reduced motion.
 */
export function Cursor() {
  const reduced = useReducedMotion();
  const dot = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState("");
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setOn(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      setLabel(el ? (el.getAttribute("data-cursor") ?? "") : "");
    };

    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (!on) return null;

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden lg:block"
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <div
          className="flex items-center justify-center rounded-full transition-all duration-300 [transition-timing-function:var(--ease-ink)]"
          style={{
            width: label ? 88 : 9,
            height: label ? 88 : 9,
            background: label ? "var(--signal)" : "var(--signal)",
            mixBlendMode: label ? "normal" : "difference",
          }}
        >
          <span
            className="font-sans text-[0.55rem] uppercase tracking-[0.28em] text-ink transition-opacity duration-200"
            style={{ opacity: label ? 1 : 0 }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
