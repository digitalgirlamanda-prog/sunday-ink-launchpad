import { useEffect, useRef } from "react";
import { MagneticLink, useReducedMotion } from "./primitives";

/** Liquid-gold pointer trail, canvas-rendered, capped and paused off-screen. */
function GoldInk() {
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
    const trail: { x: number; y: number; life: number; r: number }[] = [];
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
      if (coarse || !interacted) {
        // ambient autonomous motion on touch devices
        pointer.x = w * (0.5 + 0.28 * Math.sin(t * 1.1));
        pointer.y = h * (0.42 + 0.26 * Math.cos(t * 0.83));
      }
      const baseR = coarse || !interacted ? 120 : 46;
      trail.push({ x: pointer.x, y: pointer.y, life: 1, r: baseR + Math.sin(t * 6) * 10 });
      if (trail.length > 46) trail.shift();

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of trail) {
        p.life -= 0.021;
        if (p.life <= 0) continue;
        const rad = p.r * (0.35 + p.life);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad);
        const a = coarse || !interacted ? 0.028 : 0.1;
        g.addColorStop(0, `rgba(232, 196, 122, ${a * p.life})`);
        g.addColorStop(0.45, `rgba(198, 154, 74, ${a * 0.6 * p.life})`);
        g.addColorStop(1, "rgba(198, 154, 74, 0)");
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
      className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
    />
  );
}

export function Hero() {
  const lines = ["YOUR BUSINESS", "SHOULDN'T LOOK", "LIKE EVERYONE"];

  return (
    <section
      id="top"
      className="surface-grain relative flex min-h-[100svh] items-end overflow-hidden bg-ink pt-28"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "var(--gradient-ink)" }}
      />
      <GoldInk />

      <span
        aria-hidden
        className="pointer-events-none absolute right-[-6vw] top-[6vh] select-none font-display text-[46vw] italic leading-none text-gold/[0.09] md:right-[2vw] md:text-[34vw]"
        style={{ animation: "drift 18s ease-in-out infinite" }}
      >
        &amp;
      </span>

      <div className="relative z-10 mx-auto w-full max-w-[110rem] px-5 pb-14 md:px-10 md:pb-20">
        <p className="mb-8 text-[0.62rem] uppercase tracking-[0.5em] text-gold md:mb-12">
          Websites. Brands. Beautifully built.
        </p>

        <h1 className="font-display leading-[0.86] tracking-[-0.02em] text-ivory">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span
                className="block text-[clamp(2.4rem,9.2vw,9.5rem)]"
                style={{
                  animation: `hero-line 1.1s var(--ease-ink) ${0.25 + i * 0.12}s both`,
                }}
              >
                {line}
              </span>
            </span>
          ))}
          <span className="block overflow-hidden">
            <span
              className="block text-[clamp(2.4rem,9.2vw,9.5rem)] italic text-gold-foil"
              style={{ animation: "hero-line 1.1s var(--ease-ink) 0.61s both" }}
            >
              ELSE&rsquo;S.
            </span>
          </span>
        </h1>

        <div className="mt-10 grid gap-10 border-t border-border pt-8 md:mt-14 md:grid-cols-[1.1fr_1fr] md:items-end">
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
          Custom websites <span className="text-gold">•</span> Brand identity{" "}
          <span className="text-gold">•</span> Conversion strategy
        </p>
      </div>

      <style>{`@keyframes hero-line { from { transform: translateY(105%) rotate(2deg); } to { transform: translateY(0) rotate(0); } }`}</style>
    </section>
  );
}