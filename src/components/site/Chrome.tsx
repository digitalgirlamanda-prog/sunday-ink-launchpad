import { useEffect, useState } from "react";
import { MagneticLink } from "./primitives";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#approach", label: "Approach" },
  { href: "#transformation", label: "Transformation" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#pricing", label: "Pricing" },
];

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? h.scrollTop / max : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  return (
    <div aria-hidden className="fixed left-0 top-0 z-50 h-[2px] w-full">
      <div
        className="h-full origin-left"
        style={{
          transform: `scaleX(${p})`,
          background: "var(--gradient-gold)",
          filter: "blur(0.2px)",
          borderRadius: "0 999px 999px 0",
          transition: "transform 120ms linear",
        }}
      />
    </div>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-700 [transition-timing-function:var(--ease-ink)]",
        scrolled ? "bg-ink-deep/85 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-[110rem] items-center justify-between px-5 py-4 md:px-10 md:py-6">
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-display text-lg tracking-[0.16em] text-ivory md:text-xl">SUNDAY</span>
          <span className="font-display text-2xl italic text-gold-foil md:text-3xl">&amp;</span>
          <span className="font-display text-lg tracking-[0.16em] text-ivory md:text-xl">INK</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rule-draw text-[0.68rem] uppercase tracking-[0.26em] text-muted-foreground transition-colors hover:text-ivory"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <MagneticLink href="#start" className="px-6 py-3">
            Start your project
          </MagneticLink>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] border border-border lg:hidden"
        >
          <span
            className={cn(
              "h-px w-5 bg-gold transition-transform duration-500",
              open && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-px w-5 bg-gold transition-transform duration-500",
              open && "-translate-y-[3.5px] -rotate-45",
            )}
          />
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-ink-deep/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col px-6 py-4">
          {[...LINKS, { href: "#start", label: "Start your project" }].map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-4 font-display text-2xl text-ivory last:border-0"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}