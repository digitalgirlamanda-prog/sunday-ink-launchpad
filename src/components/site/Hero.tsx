import { useEffect, useRef, useState } from "react";
import { MagneticLink, useReducedMotion } from "./primitives";
import duskImg from "@/assets/specialty-dusk.jpg";

/**
 * Two-tone ink wash: oxblood pools + a gold pointer trail.
 * Canvas-rendered, capped, paused off-screen, ambient on touch.
 */
function InkWash() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const pointer = { x: w / 2, y: h / 2 };
    let interacted = false;
    const trail: { x: number; y: number; life: number; r: number; ox: boolean }[] = [];
    // Slow autonomous oxblood pools so the hero breathes even when idle
    const pools = [
      { cx: 0.18, cy: 0.32, r: 0.34, s: 0.7, ph: 0 },
      { cx: 0.72, cy: 0.7, r: 0.42, s: 0.5, ph: 2.1 },
      { cx: 0.48, cy: 0.18, r: 0.28, s: 0.9, ph: 4.4 },
    ];
    let t = 0;

    const onMove = (e: PointerEvent) => {
      interacted = true;
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    if (!coarse) window.addEventListener("pointermove", onMove, { passive: true });

    const io = new IntersectionObserver(([entry]) => {
      running = !!entry?.isIntersecting;
      if (running) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    function draw() {
      if (!running || !ctx) return;
      t += 0.008;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      // ambient pools — deep oxblood, barely-there
      for (const p of pools) {
        const px = w * (p.cx + 0.05 * Math.sin(t * p.s + p.ph));
        const py = h * (p.cy + 0.06 * Math.cos(t * p.s * 0.8 + p.ph));
        const rad = Math.max(120, Math.min(w, h) * p.r);
        const g = ctx.createRadialGradient(px, py, 0, px, py, rad);
        g.addColorStop(0, "rgba(132, 38, 32, 0.085)");
        g.addColorStop(0.55, "rgba(94, 26, 24, 0.045)");
        g.addColorStop(1, "rgba(94, 26, 24, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, rad, 0, Math.PI * 2);
        ctx.fill();
      }

      // pointer trail — gold ink
      if (coarse || !interacted) {
        pointer.x = w * (0.5 + 0.28 * Math.sin(t * 1.1));
        pointer.y = h * (0.42 + 0.26 * Math.cos(t * 0.83));
      }
      const baseR = coarse || !interacted ? 110 : 44;
      trail.push({
        x: pointer.x,
        y: pointer.y,
        life: 1,
        r: baseR + Math.sin(t * 6) * 9,
        ox: Math.sin(t * 3.2) > 0.55,
      });
      if (trail.length > 42) trail.shift();

      for (const p of trail) {
        p.life -= 0.022;
        if (p.life <= 0) continue;
        const rad = p.r * (0.35 + p.life);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad);
        const a = coarse || !interacted ? 0.024 : 0.085;
        if (p.ox) {
          g.addColorStop(0, `rgba(168, 62, 52, ${a * 0.9 * p.life})`);
          g.addColorStop(0.5, `rgba(120, 36, 30, ${a * 0.5 * p.life})`);
          g.addColorStop(1, "rgba(120, 36, 30, 0)");
        } else {
          g.addColorStop(0, `rgba(232, 196, 122, ${a * p.life})`);
          g.addColorStop(0.45, `rgba(198, 154, 74, ${a * 0.6 * p.life})`);
          g.addColorStop(1, "rgba(198, 154, 74, 0)");
        }
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

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

export function Hero() {
  const reduced = useReducedMotion();
  const hs = useHeroScroll(reduced);

  return (
    <section
      id="top"
      className="surface-grain relative flex min-h-[100svh] items-end overflow-hidden bg-ink pt-24 md:pt-28"
    >
      <div aria-hidden className="absolute inset-0" style={{ background: "var(--gradient-ink)" }} />
      <InkWash />

      {/* Living ampersand — photography lives inside the letterform */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[-10vw] top-[3vh] select-none font-display italic leading-none md:right-[-2vw] md:top-[-4vh]"
        style={{
          fontSize: "clamp(19rem, 52vw, 62rem)",
          backgroundImage: `linear-gradient(oklch(0.14 0.01 60 / 25%), oklch(0.14 0.01 60 / 25%)), url(${duskImg})`,
          backgroundSize: "cover",
          backgroundPosition: `50% ${42 + hs * 22}%`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          transform: `translate3d(0, ${hs * 9}vh, 0)`,
          animation: reduced ? undefined : "amp-breathe 16s ease-in-out infinite",
          opacity: 0.92,
        }}
      >
        &amp;
      </span>
      {/* Outlined echo for depth */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[-12vw] top-[6vh] select-none font-display italic leading-none md:right-[-4vw] md:top-[-1vh]"
        style={{
          fontSize: "clamp(19rem, 52vw, 62rem)",
          WebkitTextStroke: "1px oklch(0.79 0.108 84 / 22%)",
          color: "transparent",
          transform: `translate3d(0, ${hs * 14}vh, 0)`,
        }}
      >
        &amp;
      </span>

      <div className="relative z-10 mx-auto w-full max-w-[110rem] px-5 pb-12 md:px-10 md:pb-20">
        <p
          className="mb-7 text-[0.62rem] uppercase tracking-[0.5em] text-gold md:mb-10"
          style={{ animation: "hero-line 0.9s var(--ease-ink) 0.15s both" }}
        >
          Websites. Brands. Beautifully built.
        </p>

        <h1 className="font-display leading-[0.86] tracking-[-0.02em] text-ivory">
          {[
            { text: "YOUR BUSINESS", cls: "", rate: 0 },
            { text: "SHOULDN'T LOOK", cls: "", rate: 1 },
            { text: "LIKE EVERYONE", cls: "", rate: 2, outlineLast: true },
          ].map((line, i) => (
            <span key={line.text} className="block overflow-hidden">
              <span
                className="block text-[clamp(2.55rem,9.4vw,9.5rem)]"
                style={{
                  animation: `hero-line 1.1s var(--ease-ink) ${0.25 + i * 0.11}s both`,
                  transform: reduced ? undefined : `translate3d(${hs * (i + 1) * 1.4}vw, 0, 0)`,
                }}
              >
                {line.outlineLast ? (
                  <>
                    LIKE <span className="text-outline-ivory">EVERYONE</span>
                  </>
                ) : (
                  line.text
                )}
              </span>
            </span>
          ))}
          <span className="block overflow-hidden">
            <span
              className="block text-[clamp(2.55rem,9.4vw,9.5rem)] italic text-gold-foil"
              style={{
                animation: "hero-line 1.1s var(--ease-ink) 0.58s both",
                transform: reduced ? undefined : `translate3d(${hs * 5.6}vw, 0, 0)`,
              }}
            >
              ELSE&rsquo;S.
            </span>
          </span>
        </h1>

        <div
          className="mt-10 grid gap-10 border-t border-border pt-8 md:mt-14 md:grid-cols-[1.1fr_1fr] md:items-end"
          style={{
            animation: "hero-line 1s var(--ease-ink) 0.7s both",
            opacity: reduced ? 1 : 1 - hs * 0.9,
          }}
        >
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            We design high-converting websites and brands that make the right people stop, trust,
            click and buy.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row md:justify-end">
            <MagneticLink href="#start">Start your project</MagneticLink>
            <MagneticLink href="#work" variant="ghost">
              See our work
            </MagneticLink>
          </div>
        </div>

        <p className="mt-8 text-[0.65rem] uppercase tracking-[0.32em] text-muted-foreground">
          Custom websites <span className="text-oxblood-bright">•</span> Brand identity{" "}
          <span className="text-oxblood-bright">•</span> Conversion strategy
        </p>
      </div>
    </section>
  );
}
