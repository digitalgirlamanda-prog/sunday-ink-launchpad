import { useInView } from "./primitives";
import { cn } from "@/lib/utils";

type Kind = "underline" | "strike" | "circle" | "scribble";

const PATHS: Record<Kind, { d: string; box: string; len: number }> = {
  underline: {
    d: "M4 24 C 90 8, 210 34, 330 16 C 430 2, 520 26, 596 12",
    box: "0 0 600 36",
    len: 640,
  },
  strike: {
    d: "M6 20 C 120 30, 240 6, 360 22 C 460 34, 540 10, 594 18",
    box: "0 0 600 36",
    len: 630,
  },
  circle: {
    d: "M300 8 C 120 8, 20 30, 22 58 C 24 88, 190 106, 320 102 C 470 97, 582 76, 574 48 C 567 24, 420 6, 250 12",
    box: "0 0 600 116",
    len: 1420,
  },
  scribble: {
    d: "M8 28 C 90 4, 150 44, 236 20 C 310 0, 356 40, 430 22 C 500 6, 546 36, 594 20",
    box: "0 0 600 44",
    len: 700,
  },
};

/**
 * Hand-drawn ink mark that draws itself when scrolled into view.
 * Imperfect geometry on purpose — this should not read as a UI border.
 */
export function InkStroke({
  kind = "underline",
  className,
  color = "var(--signal)",
  width = 3,
  delay = 0,
}: {
  kind?: Kind;
  className?: string;
  color?: string;
  width?: number;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.3);
  const p = PATHS[kind];

  return (
    <span ref={ref} aria-hidden className={cn("pointer-events-none block", className)}>
      <svg viewBox={p.box} preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <path
          d={p.d}
          fill="none"
          stroke={color}
          strokeWidth={width}
          strokeLinecap="round"
          style={{
            strokeDasharray: p.len,
            strokeDashoffset: inView ? 0 : p.len,
            transition: `stroke-dashoffset 1.15s var(--ease-ink) ${delay}ms`,
            filter: "url(#ink-rough)",
          }}
        />
      </svg>
    </span>
  );
}

/** Shared SVG filter that roughens every ink mark. Mount once, near the root. */
export function InkFilters() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <filter id="ink-rough">
        <feTurbulence type="fractalNoise" baseFrequency="0.035 0.09" numOctaves="2" seed="7" />
        <feDisplacementMap in="SourceGraphic" scale="3.2" />
      </filter>
    </svg>
  );
}
