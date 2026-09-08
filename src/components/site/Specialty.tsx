import { MagneticLink, Reveal, SectionLabel } from "./primitives";
import duskImg from "@/assets/specialty-dusk.jpg";
import roomImg from "@/assets/specialty-room.jpg";

/**
 * The vacation-rental specialty lane — an editorial destination spread,
 * not another CTA card.
 */
export function Specialty() {
  return (
    <section
      id="specialty"
      className="surface-grain relative overflow-hidden px-5 py-24 text-ivory md:px-10 md:py-36"
      style={{ background: "var(--gradient-oxblood)" }}
    >
      {/* faint oversized ampersand watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-[-6rem] top-[-8rem] select-none font-display text-[38rem] italic leading-none text-ivory/[0.045]"
      >
        &amp;
      </span>

      <div className="relative mx-auto grid max-w-[110rem] gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
        <div>
          <Reveal>
            <SectionLabel tone="ivory">Specialty — vacation rentals</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,6.2vw,5.2rem)] leading-[0.92]">
              A LISTING IS A ROOM.{" "}
              <span className="italic text-ivory">
                A brand is a place people{" "}
                <span className="signal-underline">return to.</span>
              </span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-7 max-w-xl text-sm leading-relaxed text-ivory/75 md:text-base">
              A dedicated lane for owners who want a property brand of their own instead of a
              marketplace tile: direct booking integration, property storytelling, guest-first
              structure, and the details that make a stay feel worth the rate.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-sm leading-loose text-ivory/70">
              <span className="text-ivory">Direct booking &amp; payments</span>
              <span aria-hidden className="mx-2 text-gold">·</span>
              <span className="text-ivory">Property storytelling</span>
              <span aria-hidden className="mx-2 text-gold">·</span>
              <span className="text-ivory">Guest-first structure</span>
              <span aria-hidden className="mx-2 text-gold">·</span>
              <span className="text-ivory">Season &amp; rate clarity</span>
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <MagneticLink href="#start">Rental owners start here</MagneticLink>
              <MagneticLink href="#math" variant="ghost">
                See the math
              </MagneticLink>
            </div>
          </Reveal>
        </div>

        {/* Collage: photography + a paper booking fragment */}
        <Reveal delay={160}>
          <div className="relative mx-auto w-full max-w-[38rem] pb-16 pr-4 md:pb-20">
            <div className="relative overflow-hidden" style={{ boxShadow: "var(--shadow-lift)" }}>
              <img
                src={duskImg}
                alt="Lakeside cabin glowing at dusk — the kind of stay guests search for by name"
                width={1600}
                height={1008}
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-cover"
                style={{ animation: "drift 22s ease-in-out infinite" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-oxblood-deep/50 via-transparent to-transparent" />
            </div>

            <img
              src={roomImg}
              alt="Warm boutique-stay interior detail"
              width={1024}
              height={1280}
              loading="lazy"
              decoding="async"
              className="absolute -bottom-2 left-[-0.5rem] w-[34%] rotate-[-3deg] border-4 border-paper object-cover md:left-[-2rem]"
              style={{ boxShadow: "var(--shadow-lift)" }}
            />

            {/* paper booking fragment */}
            <div
              className="paper-grain absolute bottom-4 right-0 w-[56%] rotate-2 bg-paper p-4 text-ink md:p-5"
              style={{ boxShadow: "var(--shadow-paper)" }}
            >
              <p className="text-[0.55rem] uppercase tracking-[0.3em] text-oxblood">Book direct</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[0.6rem] uppercase tracking-[0.14em] text-ink-soft">
                <span className="border-b border-paper-line pb-1.5">Check-in</span>
                <span className="border-b border-paper-line pb-1.5">Check-out</span>
              </div>
              <p className="mt-3 flex items-center justify-between gap-2">
                <span className="bg-ink px-3 py-1.5 text-[0.55rem] uppercase tracking-[0.22em] text-ivory">
                  Reserve
                </span>
                <span className="text-[0.55rem] uppercase tracking-[0.16em] text-moss">
                  No service fees
                </span>
              </p>
            </div>

            <span className="stamp absolute -top-4 right-6 bg-oxblood-deep/40 text-gold-bright backdrop-blur-sm">
              The specialty lane
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
