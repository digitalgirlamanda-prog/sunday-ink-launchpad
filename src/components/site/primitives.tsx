import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

export function useInView<T extends HTMLElement>(threshold = 0.08) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/** 0→1 progress of a tall wrapper scrolling through the viewport (for sticky scenes). */
export function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        setProgress(total > 0 ? Math.min(Math.max(-r.top / total, 0), 1) : 0);
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return { ref, progress };
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.05);
  return (
    <div ref={ref} className={className}>
      <div
        style={{ transitionDelay: `${delay}ms` }}
        className={cn("h-full reveal-mask", inView && "reveal-shown")}
      >
        {children}
      </div>
    </div>
  );
}

const LINK_VARIANTS = {
  gold: "bg-gold text-ink hover:bg-gold-bright",
  ghost: "border border-border text-ivory hover:border-gold hover:text-gold-bright",
  ink: "bg-ink text-ivory hover:bg-oxblood",
  "ghost-ink":
    "border border-[oklch(0.2_0.012_60/35%)] text-ink hover:border-oxblood hover:text-oxblood",
  oxblood: "bg-oxblood text-ivory hover:bg-oxblood-bright",
} as const;

/** Magnetic CTA with spring-ish easing; disabled for touch + reduced motion. */
export function MagneticLink({
  children,
  href,
  variant = "gold",
  className,
  target,
  onClick,
}: {
  children: ReactNode;
  href: string;
  variant?: keyof typeof LINK_VARIANTS;
  className?: string;
  target?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const reduced = useReducedMotion();

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || reduced || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.28;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.34;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={target === "_blank" ? "noreferrer" : undefined}
      onMouseMove={move}
      onMouseLeave={reset}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] transition-[transform,background-color,color,border-color] duration-500 [transition-timing-function:var(--ease-ink)] active:scale-[0.97]",
        LINK_VARIANTS[variant],
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="h-px w-6 origin-left scale-x-50 bg-current transition-transform duration-500 [transition-timing-function:var(--ease-ink)] group-hover:scale-x-100"
      />
    </a>
  );
}

const LABEL_TONES = {
  gold: "text-gold",
  oxblood: "text-oxblood",
  moss: "text-moss",
  ivory: "text-ivory",
} as const;

export function SectionLabel({
  children,
  tone = "gold",
}: {
  children: ReactNode;
  tone?: keyof typeof LABEL_TONES;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.42em]",
        LABEL_TONES[tone],
      )}
    >
      <span aria-hidden className="h-px w-8 bg-current opacity-70" />
      {children}
    </span>
  );
}

export function Ampersand({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("font-display italic text-gold-foil", className)}>
      &amp;
    </span>
  );
}
