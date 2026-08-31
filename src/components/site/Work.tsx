import { useRef, type ReactNode } from "react";
import { MagneticLink, Reveal, SectionLabel, useReducedMotion } from "./primitives";

import knollDesktop from "@/assets/work/knoll-desktop.webp";
import tikiDesktop from "@/assets/work/tiki-desktop.webp";
import tikiMobile from "@/assets/work/tiki-mobile.webp";
import harrysDesktop from "@/assets/work/harrys-desktop.webp";
import noahsDesktop from "@/assets/work/noahs-desktop.webp";
import noahsMid from "@/assets/work/noahs-mid.webp";
import noahsMobile from "@/assets/work/noahs-mobile.webp";

type Project = {
  index: string;
  name: string;
  kind: string;
  place: string;
  problem: string;
  change: string;
  url: string;
};

const KNOLL: Project = {
  index: "01",
  name: "Knoll House",
  kind: "Vacation rental · destination brand",
  place: "Soldotna, Alaska",
  problem: "A striking modern home that read like every other dark listing thumbnail.",
  change:
    "An editorial destination brand — place-first storytelling, plate-numbered photography, and a booking path that never disappears.",
  url: "https://knoll-house-atlas.lovable.app",
};

const TIKI: Project = {
  index: "02",
  name: "Tiki Waikiki",
  kind: "Extended-stay condo · identity & voice",
  place: "Honolulu, Hawaii",
  problem: "One condo among thousands of Waikiki search results.",
  change:
    "A playful typographic identity with real voice — color and rhythm doing the work stock photography can't.",
  url: "https://tiki-waikiki-dream.lovable.app",
};

const HARRYS: Project = {
  index: "03",
  name: "Harry's Lake House",
  kind: "Direct booking · live availability",
  place: "Poconos, Pennsylvania",
  problem: "A beloved family lake house, invisible outside the marketplaces.",
  change:
    "A warm woodland brand with live availability and a reservation flow the owners control end to end.",
  url: "https://poconolakeescape.com",
};

const NOAHS: Project = {
  index: "04",
  name: "Noah's House",
  kind: "Luxury villa · repositioning",
  place: "Miami, Florida",
  problem: "A villa priced like an experience, presented like a room.",
  change:
    "A cinematic, light-drenched presentation that repositions the stay as the trip itself.",
  url: "https://ethereal-web.lovable.app",
};

function Meta({ p, dark = true }: { p: Project; dark?: boolean }) {
  return (
    <div>
      <p
        className={
          dark
            ? "text-[0.6rem] uppercase tracking-[0.3em] text-gold"
            : "text-[0.6rem] uppercase tracking-[0.3em] text-oxblood"
        }
      >
        Case {p.index} — {p.place}
      </p>
      <h3
        className={`mt-4 font-display text-[clamp(2.2rem,6vw,5rem)] leading-[0.9] ${dark ? "text-ivory" : "text-ink"}`}
      >
        {p.name}
      </h3>
      <p
        className={`mt-3 text-[0.65rem] uppercase tracking-[0.26em] ${dark ? "text-muted-foreground" : "text-ink-soft"}`}
      >
        {p.kind}
      </p>
      <dl className="mt-7 max-w-md space-y-5 text-sm leading-relaxed">
        <div>
          <dt
            className={`text-[0.58rem] uppercase tracking-[0.3em] ${dark ? "text-oxblood-bright" : "text-oxblood"}`}
          >
            The problem
          </dt>
          <dd className={`mt-1.5 ${dark ? "text-muted-foreground" : "text-ink-soft"}`}>
            {p.problem}
          </dd>
        </div>
        <div>
          <dt
            className={`text-[0.58rem] uppercase tracking-[0.3em] ${dark ? "text-moss" : "text-moss"}`}
          >
            What changed
          </dt>
          <dd className={`mt-1.5 ${dark ? "text-muted-foreground" : "text-ink-soft"}`}>
            {p.change}
          </dd>
        </div>
      </dl>
      <div className="mt-8">
        <MagneticLink href={p.url} target="_blank" variant={dark ? "ghost" : "ghost-ink"}>
          View project
        </MagneticLink>
      </div>
    </div>
  );
}

/** Pointer-reactive perspective plane (desktop only). */
function TiltPlane({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 7;
    el.style.transform = `perspective(1600px) rotateX(${4 + rx}deg) rotateY(${-9 + ry}deg)`;
  };
  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(1600px) rotateX(4deg) rotateY(-9deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      className="transition-transform duration-300 [transition-timing-function:var(--ease-ink)]"
      style={{ transform: "perspective(1600px) rotateX(4deg) rotateY(-9deg)" }}
    >
      {children}
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="relative overflow-hidden bg-ink">
      {/* ——— Section opener ——— */}
      <div className="mx-auto max-w-[110rem] px-5 pt-24 md:px-10 md:pt-36">
        <Reveal>
          <SectionLabel>Selected work</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.1rem,6.4vw,5.4rem)] leading-[0.92] text-ivory">
            NOT TEMPLATES. NOT THEMES.{" "}
            <span className="italic text-gold-foil">your business, built around you.</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Different properties. Different audiences. Different visual languages — the portfolio
            itself is the proof. Never the same website twice.
          </p>
        </Reveal>
      </div>

      {/* ——— 01 Knoll House · tilted plane ——— */}
      <div className="mx-auto grid max-w-[110rem] items-center gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <Reveal>
          <Meta p={KNOLL} />
        </Reveal>
        <Reveal delay={120}>
          <a
            href={KNOLL.url}
            target="_blank"
            rel="noreferrer"
            aria-label="Open the Knoll House website in a new tab"
            className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-gold"
          >
            <TiltPlane>
              <div
                className="relative overflow-hidden border border-border bg-[linear-gradient(150deg,oklch(0.24_0.035_150),oklch(0.12_0.01_90))]"
                style={{ boxShadow: "var(--shadow-lift)" }}
              >
                <img
                  src={knollDesktop}
                  alt="Knoll House website — dark editorial hospitality design with oversized typography"
                  width={1400}
                  height={972}
                  fetchPriority="high"
                  decoding="async"
                  className="block h-auto w-full transition-transform duration-700 [transition-timing-function:var(--ease-ink)] group-hover:scale-[1.02]"
                />
              </div>
            </TiltPlane>
          </a>
        </Reveal>
      </div>

      {/* ——— 02 Tiki Waikiki · device composition on a teal flood ——— */}
      <div
        className="surface-grain relative overflow-hidden py-20 md:py-28"
        style={{ background: "linear-gradient(155deg, oklch(0.3 0.055 205), oklch(0.16 0.03 220))" }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute right-[-3rem] top-[-5rem] select-none font-display text-[24rem] italic leading-none text-ivory/[0.05]"
        >
          &amp;
        </span>
        <div className="relative mx-auto grid max-w-[110rem] items-center gap-12 px-5 md:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <a
              href={TIKI.url}
              target="_blank"
              rel="noreferrer"
              aria-label="Open the Tiki Waikiki website in a new tab"
              className="group relative mx-auto block w-full max-w-[34rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-gold"
            >
              {/* desktop fragment behind */}
              <div
                className="absolute left-0 top-6 w-[72%] rotate-[-3deg] overflow-hidden border border-ivory/15 opacity-80 transition-transform duration-700 [transition-timing-function:var(--ease-ink)] group-hover:rotate-[-4deg]"
                style={{ boxShadow: "var(--shadow-lift)" }}
              >
                <img
                  src={tikiDesktop}
                  alt=""
                  aria-hidden
                  width={1400}
                  height={972}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </div>
              {/* phone in front */}
              <div className="relative ml-auto w-[52%] max-w-[15rem] transition-transform duration-700 [transition-timing-function:var(--ease-ink)] group-hover:-translate-y-2 md:w-[46%]">
                <div
                  className="rounded-[2.2rem] border border-ivory/20 bg-ink-deep p-2"
                  style={{ boxShadow: "var(--shadow-lift)" }}
                >
                  <div className="relative overflow-hidden rounded-[1.7rem]">
                    <img
                      src={tikiMobile}
                      alt="Tiki Waikiki website on a phone — playful typographic identity"
                      width={640}
                      height={1385}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full"
                    />
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-1.5 h-1.5 w-16 -translate-x-1/2 rounded-full bg-ink-deep/90"
                    />
                  </div>
                </div>
              </div>
            </a>
          </Reveal>
          <Reveal delay={120} className="order-1 lg:order-2">
            <Meta p={TIKI} />
          </Reveal>
        </div>
      </div>

      {/* ——— 03 Harry's Lake House · full-bleed takeover ——— */}
      <div className="relative flex min-h-[88svh] items-end overflow-hidden md:min-h-[100svh]">
        <img
          src={harrysDesktop}
          alt="Harry's Lake House — warm cabin glowing among string lights in the Poconos woods"
          width={1600}
          height={794}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
        <div className="relative mx-auto w-full max-w-[110rem] px-5 pb-16 pt-40 md:px-10 md:pb-24">
          <Reveal>
            <div className="max-w-2xl">
              <span className="stamp bg-ink/50 text-gold-bright backdrop-blur-sm">Live direct booking</span>
              <div className="mt-6">
                <Meta p={HARRYS} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ——— 04 Noah's House · layered fragments on paper ——— */}
      <div className="paper-grain relative bg-paper py-20 text-ink md:py-28">
        <div className="mx-auto grid max-w-[110rem] items-center gap-12 px-5 md:px-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <Reveal>
            <Meta p={NOAHS} dark={false} />
          </Reveal>
          <Reveal delay={120}>
            <a
              href={NOAHS.url}
              target="_blank"
              rel="noreferrer"
              aria-label="Open the Noah's House website in a new tab"
              className="group relative mx-auto block w-full max-w-[40rem] pb-10 pr-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-oxblood md:pb-14"
            >
              <div
                className="relative overflow-hidden transition-transform duration-700 [transition-timing-function:var(--ease-ink)] group-hover:-translate-y-1"
                style={{ boxShadow: "var(--shadow-paper)" }}
              >
                <img
                  src={noahsDesktop}
                  alt="Noah's House website — light-drenched Miami villa presentation"
                  width={1400}
                  height={972}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </div>
              <div
                className="absolute -bottom-2 left-[-0.75rem] w-[46%] rotate-[-2.5deg] overflow-hidden border-4 border-paper transition-transform duration-700 [transition-timing-function:var(--ease-ink)] group-hover:rotate-[-3.5deg] md:left-[-2rem]"
                style={{ boxShadow: "var(--shadow-paper)" }}
              >
                <img
                  src={noahsMid}
                  alt=""
                  aria-hidden
                  width={1200}
                  height={833}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </div>
              <div
                className="absolute bottom-0 right-0 w-[24%] max-w-[9rem] rotate-3 overflow-hidden rounded-xl border-4 border-paper transition-transform duration-700 [transition-timing-function:var(--ease-ink)] group-hover:rotate-2"
                style={{ boxShadow: "var(--shadow-paper)" }}
              >
                <img
                  src={noahsMobile}
                  alt=""
                  aria-hidden
                  width={640}
                  height={1385}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </div>
            </a>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 flex max-w-[110rem] flex-col items-start gap-6 px-5 md:mt-24 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
            Four businesses, four completely different visual languages — and yours would be the
            fifth.
          </p>
          <MagneticLink href="#start" variant="ink">
            Start something like this
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
