import { useEffect, useRef, useState } from "react";
import { MagneticLink, useReducedMotion } from "./primitives";
import { InkStroke } from "./InkStroke";
import duskImg from "@/assets/specialty-dusk.jpg";

/** 0→1 while the hero scrolls off the top of the viewport. */
function useHeroScroll(reduced: boolean) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setP(Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9)))),
      );
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
    };
  }, [reduced]);
  return p;
}

/** Normalised pointer position (-1 → 1) for independent layer drift. */
function usePointerParallax(reduced: boolean) {
  const [p, setP] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const on = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setP({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: (e.clientY / window.innerHeight) * 2 - 1,
        }),
      );
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", on);
    };
  }, [reduced]);
  return p;
}

export function Hero() {
  const reduced = useReducedMotion();
  const hs = useHeroScroll(reduced);
  const pp = usePointerParallax(reduced);
  const ref = useRef<HTMLElement | null>(null);

  const layer = (depth: number) => ({
    transform: `translate3d(${pp.x * depth}px, ${pp.y * depth * 0.6}px, 0)`,
    transition: "transform 700ms var(--ease-ink)",
  });

  return (
    <section
      ref={ref}
      id="top"
      className="surface-grain relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ink pb-8 pt-24 md:pb-12 md:pt-28"
    >
      <div aria-hidden className="absolute inset-0" style={{ background: "var(--gradient-ink)" }} />

      {/* Cropped photographic fragment — a strip, not a background */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-[14vh] hidden h-[62vh] w-[26vw] overflow-hidden md:block"
        style={{
          ...layer(-14),
          clipPath: "polygon(0 4%, 100% 0, 100% 96%, 0 100%)",
          opacity: 0.55 - hs * 0.35,
        }}
      >
        <img
          src={duskImg}
          alt=""
          className="scan-edge h-full w-full object-cover"
          style={{ transform: `translate3d(0, ${hs * -12}%, 0) scale(1.15)` }}
        />
      </div>

      {/* Living ampersand — photography lives inside the letterform */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[-14vw] top-[6vh] select-none font-display italic leading-none md:right-[6vw] md:top-[2vh]"
        style={{
          fontSize: "clamp(17rem, 44vw, 50rem)",
          backgroundImage: `linear-gradient(oklch(0.145 0 0 / 30%), oklch(0.145 0 0 / 30%)), url(${duskImg})`,
          backgroundSize: "cover",
          backgroundPosition: `50% ${42 + hs * 22}%`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          transform: `translate3d(${pp.x * 18}px, ${hs * 9}vh, 0)`,
          opacity: 0.5,
        }}
      >
        &amp;
      </span>

      {/* Editorial masthead line */}
      <div className="relative z-10 mx-auto flex w-full max-w-[110rem] items-start justify-between px-5 md:px-10">
        <p
          className="text-[0.58rem] uppercase tracking-[0.46em] text-dust"
          style={{ animation: "hero-line 0.9s var(--ease-ink) 0.15s both" }}
        >
          Vol. 01 — Studio issue
        </p>
        <p
          className="max-w-[9rem] text-right text-[0.58rem] uppercase leading-relaxed tracking-[0.28em] text-dust md:max-w-none"
          style={{ animation: "hero-line 0.9s var(--ease-ink) 0.22s both" }}
        >
          Remote studio <span className="text-signal">/</span> booked one project at a time
        </p>
      </div>

      {/* The type dominates */}
      <div className="relative z-10 mx-auto w-full max-w-[110rem] px-5 md:px-10">
        <h1 className="font-display leading-[0.82] tracking-[-0.025em] text-ivory">
          <span className="block overflow-hidden">
            <span
              className="relative inline-block text-[clamp(3rem,12.5vw,12rem)]"
              style={{
                animation: "hero-line 1.1s var(--ease-ink) 0.25s both",
                ...(reduced ? {} : layer(10)),
              }}
            >
              FORGET PRETTY.
              <InkStroke
                kind="strike"
                delay={900}
                width={5}
                className="absolute left-[-2%] top-[46%] h-[0.3em] w-[104%]"
              />
            </span>
          </span>
          <span className="block overflow-hidden pl-[6vw] md:pl-[14vw]">
            <span
              className="block text-[clamp(3rem,12.5vw,12rem)] italic"
              style={{
                animation: "hero-line 1.1s var(--ease-ink) 0.38s both",
                ...(reduced ? {} : layer(-16)),
              }}
            >
              BE
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="block text-[clamp(2.6rem,11.6vw,11.4rem)]"
              style={{
                animation: "hero-line 1.1s var(--ease-ink) 0.5s both",
                ...(reduced ? {} : layer(22)),
              }}
            >
              UNFORGETTABLE.
            </span>
          </span>
        </h1>

        {/* Annotation, set like a margin note */}
        <p
          className="annotation mt-6 max-w-xs -rotate-[1.2deg] pl-[2vw] md:mt-8 md:pl-[16vw]"
          style={{ animation: "hero-line 1s var(--ease-ink) 0.62s both" }}
        >
          Websites for businesses with something worth noticing.
        </p>
      </div>

      {/* Base line: offer + CTA + scroll tick */}
      <div
        className="relative z-10 mx-auto w-full max-w-[110rem] px-5 md:px-10"
        style={{ opacity: reduced ? 1 : 1 - hs * 0.85 }}
      >
        <div className="grid gap-8 border-t border-border pt-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="max-w-md text-sm leading-relaxed text-dust md:text-base">
              Custom websites and brand direction for small businesses. Built around your customers,
              your work and the one thing you need them to do next.
            </p>
            <p className="mt-5 text-[0.6rem] uppercase tracking-[0.34em] text-dust/80">
              Custom build <span className="text-signal">•</span> Mobile-first{" "}
              <span className="text-signal">•</span> Live in days, not months
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row md:justify-end">
            <MagneticLink href="#start">Make me unmissable</MagneticLink>
            <MagneticLink href="#work" variant="ghost">
              See what we build
            </MagneticLink>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <span aria-hidden className="relative h-10 w-px overflow-hidden bg-border">
            <span
              className="absolute inset-x-0 h-4 bg-signal"
              style={{ animation: reduced ? undefined : "scroll-tick 2.4s linear infinite" }}
            />
          </span>
          <span className="text-[0.55rem] uppercase tracking-[0.4em] text-dust/70">
            Scroll — the work starts here
          </span>
        </div>
      </div>
    </section>
  );
}
