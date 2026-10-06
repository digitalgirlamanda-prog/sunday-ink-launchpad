import { useEffect, useRef, useState } from "react";
import { MagneticLink, useReducedMotion } from "./primitives";
import knoll from "@/assets/work/knoll-desktop.webp";
import tiki from "@/assets/work/tiki-mobile.webp";
import harrys from "@/assets/work/harrys-desktop.webp";
import noahs from "@/assets/work/noahs-mid.webp";

const WORLDS = [
  { src: knoll, name: "Knoll House", type: "Destination" },
  { src: tiki, name: "Tiki Waikiki", type: "Hospitality" },
  { src: harrys, name: "Harry’s Lake House", type: "Direct booking" },
  { src: noahs, name: "Noah’s House", type: "Luxury stay" },
];

export function Hero() {
  const scene = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const [act, setAct] = useState(0);

  useEffect(() => {
    const el = scene.current;
    if (!el || reduced) return;
    let raf = 0;
    let lastAct = -1;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / travel));
      el.style.setProperty("--hero-p", p.toFixed(4));
      const nextAct = p < 0.18 ? 0 : p < 0.52 ? 1 : p < 0.84 ? 2 : 3;
      if (nextAct !== lastAct) {
        lastAct = nextAct;
        setAct(nextAct);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return (
    <section id="top" className="relative bg-ink">
      <div ref={scene} className="cinematic-hero relative h-[330svh] md:h-[390vh]">
        <div className="surface-grain sticky top-0 h-[100svh] overflow-hidden bg-ink">
          <div aria-hidden className="hero-worlds absolute inset-0">
            {WORLDS.map((world, index) => (
              <figure key={world.name} className={`hero-world hero-world-${index + 1}`}>
                <img src={world.src} alt="" width={index === 1 ? 640 : 1400} height={index === 1 ? 1385 : 972} decoding="async" />
                <figcaption>
                  <span>0{index + 1}</span> {world.type} / {world.name}
                </figcaption>
              </figure>
            ))}
          </div>

          <div aria-hidden className="hero-shutter absolute inset-0 bg-ink" />
          <span aria-hidden className="hero-depth-word absolute whitespace-nowrap font-sans font-semibold uppercase text-outline-ivory">
            WORLDS
          </span>

          <div className="relative z-10 mx-auto flex h-full w-full max-w-[110rem] flex-col px-5 pb-7 pt-24 md:px-10 md:pb-10 md:pt-28">
            <div className="hero-kicker flex items-center justify-between gap-6 text-[0.58rem] uppercase tracking-[0.34em] text-dust">
              <span>Sunday &amp; Ink / Studio</span>
              <span className="hidden text-right sm:block">One studio. Completely different worlds.</span>
            </div>

            <div className="hero-title-stage relative flex flex-1 items-center justify-center">
              <h1 className="sr-only">Sunday &amp; Ink — websites impossible to ignore</h1>
              <p className="hero-brand-lockup absolute text-center font-display text-[clamp(2.2rem,7vw,6.5rem)] leading-none text-ivory">
                SUNDAY <span className="italic text-signal">&amp;</span> INK
              </p>
              <div className="hero-statement absolute inset-x-0 top-1/2 -translate-y-1/2">
                <p className="hero-line-exist font-display text-[clamp(2.6rem,9.3vw,9rem)] leading-[0.84] text-ivory">
                  WEBSITES SHOULDN’T
                  <span className="block pl-[8vw] italic text-dust">JUST EXIST.</span>
                </p>
                <p className="hero-line-ignore mt-5 text-right font-display text-[clamp(2.5rem,9.3vw,9rem)] leading-[0.84] text-ivory">
                  THEY SHOULD BE
                  <span className="relative block text-signal">IMPOSSIBLE TO IGNORE.</span>
                </p>
              </div>
            </div>

            <div className="hero-footer grid items-end gap-5 border-t border-border pt-5 md:grid-cols-[1fr_auto]">
              <div>
                <p className="max-w-md text-sm leading-relaxed text-dust">
                  Custom websites and brand direction for businesses with something worth noticing.
                </p>
                <p className="mt-2 text-[0.56rem] uppercase tracking-[0.28em] text-dust/60">
                  Act 0{act + 1} / {act === 0 ? "The studio" : act === 1 ? "The premise" : act === 2 ? "The worlds" : "The invitation"}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <MagneticLink href="#work">Enter the work</MagneticLink>
                <MagneticLink href="#start" variant="ghost">Make me unmissable</MagneticLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}