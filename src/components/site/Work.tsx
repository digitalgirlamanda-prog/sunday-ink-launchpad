import { useEffect, useRef, type ReactNode } from "react";
import { MagneticLink, SectionLabel, useReducedMotion } from "./primitives";
import knollDesktop from "@/assets/work/knoll-desktop.webp";
import knollMid from "@/assets/work/knoll-mid.webp";
import knollMobile from "@/assets/work/knoll-mobile.webp";
import tikiDesktop from "@/assets/work/tiki-desktop.webp";
import tikiMid from "@/assets/work/tiki-mid.webp";
import tikiMobile from "@/assets/work/tiki-mobile.webp";
import harrysDesktop from "@/assets/work/harrys-desktop.webp";
import harrysMid from "@/assets/work/harrys-mid.webp";
import harrysMobile from "@/assets/work/harrys-mobile.webp";
import noahsDesktop from "@/assets/work/noahs-desktop.webp";
import noahsMid from "@/assets/work/noahs-mid.webp";
import noahsMobile from "@/assets/work/noahs-mobile.webp";

type Project = {
  index: string;
  name: string;
  place: string;
  kind: string;
  problem: string;
  change: string;
  url: string;
  world: string;
  images: [string, string, string];
};

const PROJECTS: Project[] = [
  { index: "01", name: "Knoll House", place: "Soldotna, Alaska", kind: "Vacation rental / destination brand", problem: "A striking modern home that read like every other listing.", change: "An editorial destination brand with a booking path that never disappears.", url: "https://knoll-house-atlas.lovable.app", world: "knoll", images: [knollDesktop, knollMid, knollMobile] },
  { index: "02", name: "Tiki Waikiki", place: "Honolulu, Hawaii", kind: "Extended stay / identity & voice", problem: "One condo among thousands of Waikiki search results.", change: "A playful identity with real voice — color and rhythm doing the work stock photography can’t.", url: "https://tiki-waikiki-dream.lovable.app", world: "tiki", images: [tikiDesktop, tikiMid, tikiMobile] },
  { index: "03", name: "Harry’s Lake House", place: "Poconos, Pennsylvania", kind: "Direct booking / live availability", problem: "A beloved lake house, invisible outside the marketplaces.", change: "A warm woodland brand and reservation flow the owners control end to end.", url: "https://poconolakeescape.com", world: "harrys", images: [harrysDesktop, harrysMid, harrysMobile] },
  { index: "04", name: "Noah’s House", place: "Miami, Florida", kind: "Luxury villa / repositioning", problem: "A villa priced like an experience, presented like a room.", change: "A cinematic, light-drenched world that repositions the stay as the trip itself.", url: "https://ethereal-web.lovable.app", world: "noahs", images: [noahsDesktop, noahsMid, noahsMobile] },
];

function ProjectScene({ project, children }: { project: Project; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = Math.max(1, r.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / total));
      el.style.setProperty("--project-p", p.toFixed(4));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, [reduced]);

  return (
    <article ref={ref} className={`project-universe project-${project.world} relative h-[190svh] md:h-[230vh]`}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="project-backdrop absolute inset-0" />
        <p aria-hidden className="project-ghost absolute whitespace-nowrap font-display">{project.name}</p>
        <div className="project-canvas absolute inset-0">{children}</div>
        <div className="project-copy absolute inset-x-0 bottom-0 z-20 mx-auto grid max-w-[110rem] gap-7 px-5 pb-8 md:px-10 md:pb-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className="project-eyebrow text-[0.58rem] uppercase tracking-[0.32em]">Case {project.index} / {project.place}</p>
            <h3 className="mt-3 font-display text-[clamp(2.8rem,8vw,8rem)] leading-[0.82]">{project.name}</h3>
            <p className="mt-4 text-[0.62rem] uppercase tracking-[0.24em] opacity-70">{project.kind}</p>
          </div>
          <div className="project-details max-w-xl lg:justify-self-end">
            <p className="text-sm leading-relaxed"><span className="mr-2 text-[0.56rem] uppercase tracking-[0.25em] opacity-55">Before</span>{project.problem}</p>
            <p className="mt-3 text-sm leading-relaxed"><span className="mr-2 text-[0.56rem] uppercase tracking-[0.25em] opacity-55">After</span>{project.change}</p>
            <div className="mt-5"><MagneticLink href={project.url} target="_blank" variant={project.world === "noahs" ? "ink" : "ghost"}>Enter this world</MagneticLink></div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="relative bg-ink">
      <div className="surface-grain flex min-h-[75svh] items-end overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pb-24">
        <div className="mx-auto w-full max-w-[110rem]">
          <SectionLabel>Selected work / four worlds</SectionLabel>
          <h2 className="mt-7 max-w-6xl font-display text-[clamp(2.5rem,8vw,8rem)] leading-[0.86] text-ivory">ONE STUDIO.<br /><span className="italic text-dust">NO HOUSE STYLE.</span></h2>
          <p className="mt-7 max-w-xl text-sm leading-relaxed text-dust md:text-base">Every project interrupts our world and becomes its own. Keep scrolling.</p>
        </div>
      </div>

      <ProjectScene project={PROJECTS[0]!}>
        <div className="project-frame project-frame-main"><img src={knollDesktop} alt="Knoll House editorial website" width="1400" height="972" loading="lazy" /></div>
        <div className="project-frame project-frame-mid"><img src={knollMid} alt="" width="1200" height="833" loading="lazy" /></div>
        <div className="project-frame project-frame-phone"><img src={knollMobile} alt="" width="640" height="1385" loading="lazy" /></div>
      </ProjectScene>
      <ProjectScene project={PROJECTS[1]!}>
        <div className="project-frame project-frame-main"><img src={tikiDesktop} alt="Tiki Waikiki colorful website" width="1400" height="972" loading="lazy" /></div>
        <div className="project-frame project-frame-mid"><img src={tikiMid} alt="" width="1200" height="833" loading="lazy" /></div>
        <div className="project-frame project-frame-phone"><img src={tikiMobile} alt="" width="640" height="1385" loading="lazy" /></div>
      </ProjectScene>
      <ProjectScene project={PROJECTS[2]!}>
        <div className="project-frame project-frame-main"><img src={harrysDesktop} alt="Harry's Lake House direct-booking website" width="1600" height="794" loading="lazy" /></div>
        <div className="project-frame project-frame-mid"><img src={harrysMid} alt="" width="1200" height="833" loading="lazy" /></div>
        <div className="project-frame project-frame-phone"><img src={harrysMobile} alt="" width="640" height="1385" loading="lazy" /></div>
      </ProjectScene>
      <ProjectScene project={PROJECTS[3]!}>
        <div className="project-frame project-frame-main"><img src={noahsDesktop} alt="Noah's House cinematic villa website" width="1400" height="972" loading="lazy" /></div>
        <div className="project-frame project-frame-mid"><img src={noahsMid} alt="" width="1200" height="833" loading="lazy" /></div>
        <div className="project-frame project-frame-phone"><img src={noahsMobile} alt="" width="640" height="1385" loading="lazy" /></div>
      </ProjectScene>

      <div className="paper-grain bg-paper px-5 py-24 text-ink md:px-10 md:py-32">
        <div className="mx-auto flex max-w-[110rem] flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <p className="max-w-3xl font-display text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.92]">Four visual languages. <span className="italic">Yours becomes the fifth.</span></p>
          <MagneticLink href="#start" variant="ink">Start a new world</MagneticLink>
        </div>
      </div>
    </section>
  );
}