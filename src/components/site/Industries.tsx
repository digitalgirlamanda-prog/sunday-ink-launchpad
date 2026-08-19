import { Reveal, SectionLabel, useInView } from "./primitives";
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

export function Industries() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <section className="relative overflow-hidden bg-ink px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[110rem]">
        <Reveal>
          <SectionLabel>Who we build for</SectionLabel>
        </Reveal>

        <div ref={ref} className="mt-10">
          <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2 md:gap-x-10">
            {INDUSTRIES.map((item, i) => (
              <li key={item} className="overflow-hidden">
                <span
                  className={cn(
                    "block font-display text-[clamp(1.6rem,5.6vw,4.6rem)] leading-[1.05] transition-all duration-[900ms] [transition-timing-function:var(--ease-ink)]",
                    i % 3 === 1 ? "italic text-gold" : "text-ivory",
                    inView ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
                  )}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  {item}
                  <span aria-hidden className="ml-6 align-middle text-base text-gold/50">
                    {i < INDUSTRIES.length - 1 ? "/" : ""}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-12 max-w-2xl border-l border-gold pl-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Different businesses. Different audiences.{" "}
            <span className="text-ivory">Never the same website twice.</span>
          </p>
        </div>
      </div>
    </section>
  );
}