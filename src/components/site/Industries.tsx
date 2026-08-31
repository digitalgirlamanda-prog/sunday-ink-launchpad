import { Reveal, SectionLabel, useReducedMotion } from "./primitives";
import { cn } from "@/lib/utils";

const INDUSTRIES = [
  "Vacation rentals",
  "Hospitality",
  "Contractors",
  "Restaurants",
  "Salons & beauty",
  "Photographers",
  "Professional services",
  "Local businesses",
  "Founder-led brands",
];

function Row({
  items,
  direction,
  outlined,
  duration,
}: {
  items: string[];
  direction: "left" | "right";
  outlined?: boolean;
  duration: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2 px-5 md:px-10">
        {items.map((item, i) => (
          <li
            key={item}
            className={cn(
              "font-display text-[clamp(1.5rem,4.6vw,3.8rem)] leading-[1.1]",
              outlined ? "text-outline-ivory italic" : i % 3 === 1 ? "italic text-gold" : "text-ivory",
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  const strip = (
    <>
      {items.map((item, i) => (
        <span
          key={item}
          className={cn(
            "font-display text-[clamp(1.9rem,5.4vw,4.6rem)] leading-[1.08]",
            outlined ? "text-outline-ivory italic" : i % 3 === 1 ? "italic text-gold" : "text-ivory",
          )}
        >
          {item}
          <span
            aria-hidden
            className={cn(
              "mx-5 align-middle font-display text-2xl italic md:mx-8",
              outlined ? "text-oxblood-bright/60" : "text-oxblood-bright",
            )}
          >
            &amp;
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div className="flex w-max [&:hover>*]:[animation-play-state:paused]" aria-hidden={outlined}>
      {[0, 1].map((n) => (
        <div
          key={n}
          className="flex w-max shrink-0 items-baseline whitespace-nowrap pr-8"
          style={{
            animation: `${direction === "left" ? "marquee-left" : "marquee-right"} ${duration}s linear infinite`,
          }}
        >
          {strip}
        </div>
      ))}
    </div>
  );
}

export function Industries() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-[110rem] px-5 md:px-10">
        <Reveal>
          <SectionLabel>Who we build for</SectionLabel>
        </Reveal>
      </div>

      <div className="mt-10 space-y-4 md:mt-14 md:space-y-6">
        <Row items={INDUSTRIES} direction="left" duration={64} />
        <Row items={[...INDUSTRIES.slice(4), ...INDUSTRIES.slice(0, 4)]} direction="right" outlined duration={78} />
      </div>

      <div className="mx-auto max-w-[110rem] px-5 md:px-10">
        <p className="mt-12 max-w-2xl border-l border-oxblood-bright pl-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Different businesses. Different audiences.{" "}
          <span className="text-ivory">Never the same website twice.</span>
        </p>
      </div>
    </section>
  );
}
