import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Reveal, SectionLabel, useInView, useSectionProgress } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const TITLE = "Turn Your Preview Into Your Website — Sunday & Ink";
const DESCRIPTION =
  "You've seen the concept made for your business. For 24 hours, turn it into a real custom website for $699 instead of $999. One payment, no sales call.";

export const Route = createFileRoute("/preview")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PreviewOffer,
});

/* ------------------------------------------------------------------ */

function CTA({
  children,
  className,
  tone = "gold",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "gold" | "oxblood";
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate3d(${(e.clientX - (r.left + r.width / 2)) * 0.14}px, ${
      (e.clientY - (r.top + r.height / 2)) * 0.22
    }px, 0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };
  return (
    <a
      ref={ref}
      href="#checkout"
      onMouseMove={move}
      onMouseLeave={reset}
      className={cn(
        "group relative inline-flex w-full items-center justify-between gap-6 px-7 py-5 text-[0.7rem] font-medium uppercase tracking-[0.24em] transition-[transform,background-color,color] duration-500 [transition-timing-function:var(--ease-ink)] active:scale-[0.98] sm:w-auto sm:px-10",
        tone === "gold" ? "bg-gold text-ink hover:bg-gold-bright" : "bg-oxblood text-ivory hover:bg-oxblood-bright",
        className,
      )}
    >
      <span>{children}</span>
      <span aria-hidden className="transition-transform duration-500 [transition-timing-function:var(--ease-ink)] group-hover:translate-x-2">
        &rarr;
      </span>
    </a>
  );
}

function PriceBlock({ tone = "dark" }: { tone?: "dark" | "paper" }) {
  return (
    <div
      className={cn(
        "inline-flex flex-col gap-1 border-l pl-5",
        tone === "dark" ? "border-gold/50" : "border-oxblood/40",
      )}
    >
      <span
        className={cn(
          "text-[0.6rem] uppercase tracking-[0.34em]",
          tone === "dark" ? "text-gold" : "text-oxblood",
        )}
      >
        24-hour preview rate
      </span>
      <span className="flex items-baseline gap-4">
        <span
          className={cn(
            "font-display text-6xl leading-none md:text-7xl",
            tone === "dark" ? "text-ivory" : "text-ink",
          )}
        >
          $699
        </span>
        <span
          className={cn(
            "text-sm line-through",
            tone === "dark" ? "text-muted-foreground" : "text-ink-soft/70",
          )}
        >
          Normally $999
        </span>
      </span>
    </div>
  );
}

/* ------------------------------- HERO ----------------------------- */

function Hero() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const on = () => setT(Math.min(window.scrollY / 700, 1));
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <section className="surface-grain relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink px-5 pb-16 pt-28 md:px-10 md:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] top-[-10%] h-[60vh] w-[80vw] rounded-full opacity-40 blur-[90px] md:w-[45vw]"
        style={{ background: "var(--gradient-oxblood)", transform: `translateY(${t * -60}px)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-15%] left-[-10%] h-[40vh] w-[70vw] rounded-full opacity-25 blur-[110px] md:w-[38vw]"
        style={{ background: "var(--gradient-gold)", transform: `translateY(${t * 40}px)` }}
      />

      <div className="relative mx-auto w-full max-w-[86rem]">
        <SectionLabel>Your preview is just the beginning</SectionLabel>

        <h1 className="mt-8 font-display text-[clamp(2.6rem,10.5vw,8.5rem)] leading-[0.92] tracking-[-0.02em] text-ivory">
          <span className="block overflow-hidden">
            <span className="block [animation:hero-line_1.1s_var(--ease-ink)_both]">
              You can keep the screenshot.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="block italic text-gold-foil [animation:hero-line_1.1s_var(--ease-ink)_0.18s_both]">
              Or you can own the website.
            </span>
          </span>
        </h1>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal delay={120}>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              You&rsquo;ve already seen what your business could look like. Now we turn that concept
              into a real, custom website built around your business and designed to turn attention
              into action.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="flex flex-col items-start gap-8">
              <PriceBlock />
              <CTA>Turn my preview into my website</CTA>
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                One payment. No surprise design fees. No sales call required.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- WHAT'S NEXT -------------------------- */

const STEPS = [
  { n: "01", label: "Your preview", note: "The concept already made for you." },
  { n: "02", label: "Your content + business", note: "Services, photos, work, voice." },
  { n: "03", label: "Full custom build", note: "Designed and built page by page." },
  { n: "04", label: "Live website", note: "Domain connected. Doors open." },
];

function Next() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const active = Math.min(Math.floor(progress * 4.4), 3);

  return (
    <section ref={ref} className="paper-grain relative bg-paper text-ink">
      <div className="sticky top-0 flex min-h-[100svh] flex-col justify-center px-5 py-24 md:px-10">
        <div className="mx-auto w-full max-w-[80rem]">
          <SectionLabel tone="oxblood">What happens next</SectionLabel>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2rem,6.4vw,4.6rem)] leading-[0.98] tracking-[-0.015em]">
            We already did the imagining.{" "}
            <span className="italic text-oxblood">Now we make it real.</span>
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
            We take the concept you received and build it into your actual website using your
            services, work, photos, branding and customer journey.
          </p>

          <ol className="mt-12 grid gap-px border-t border-paper-line md:grid-cols-4 md:border-l">
            {STEPS.map((s, i) => {
              const on = i <= active;
              return (
                <li
                  key={s.n}
                  className={cn(
                    "relative border-b border-paper-line px-1 py-6 transition-all duration-700 [transition-timing-function:var(--ease-ink)] md:border-r md:px-5",
                    on ? "opacity-100" : "opacity-35",
                  )}
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-[2px] origin-left bg-oxblood transition-transform duration-700 [transition-timing-function:var(--ease-ink)]"
                    style={{ width: "100%", transform: `scaleX(${on ? 1 : 0})` }}
                  />
                  <span className="text-[0.6rem] tracking-[0.34em] text-oxblood">{s.n}</span>
                  <p className="mt-3 font-display text-2xl leading-tight md:text-3xl">{s.label}</p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-soft">{s.note}</p>
                </li>
              );
            })}
          </ol>

          <p className="mt-8 text-[0.66rem] uppercase tracking-[0.24em] text-ink-soft/80">
            Typical turnaround: 3&ndash;5 business days after receiving required content.
          </p>
        </div>
      </div>
      <div className="h-[180svh]" aria-hidden />
    </section>
  );
}

/* --------------------------- BEFORE / AFTER ------------------------ */

const WITHOUT = [
  "Customer finds you",
  "Scrolls",
  "Searches for pricing / services",
  "Sends a DM",
  "Waits",
  "Gets distracted",
  "Disappears",
];
const WITH = [
  "Customer finds you",
  "Sees your work",
  "Understands what you offer",
  "Knows what to do next",
  "Books, inquires or pays",
];

function Difference() {
  const [after, setAfter] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <section className="surface-grain relative bg-ink-deep px-5 py-24 md:px-10 md:py-36">
      <div ref={ref} className="mx-auto w-full max-w-[80rem]">
        <SectionLabel>The business difference</SectionLabel>
        <h2 className="mt-6 max-w-5xl font-display text-[clamp(2rem,6vw,4.6rem)] leading-[0.98] tracking-[-0.015em] text-ivory">
          Your website should do some of the selling{" "}
          <span className="italic text-gold-foil">before you ever answer the phone.</span>
        </h2>

        <div
          role="tablist"
          aria-label="Customer journey comparison"
          className="mt-12 inline-flex border border-border"
        >
          {[
            { k: false, l: "Without the right website" },
            { k: true, l: "With the right website" },
          ].map((o) => (
            <button
              key={String(o.k)}
              role="tab"
              aria-selected={after === o.k}
              onClick={() => setAfter(o.k)}
              className={cn(
                "px-4 py-3 text-[0.6rem] uppercase tracking-[0.2em] transition-colors duration-500 sm:px-6 sm:text-[0.66rem]",
                after === o.k
                  ? o.k
                    ? "bg-gold text-ink"
                    : "bg-oxblood text-ivory"
                  : "text-muted-foreground hover:text-ivory",
              )}
            >
              {o.l}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-3">
          {(after ? WITH : WITHOUT).map((step, i) => (
            <div
              key={`${String(after)}-${step}`}
              className="flex items-baseline gap-5 border-b border-border/60 pb-3"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(14px)",
                transition: `opacity .6s var(--ease-ink) ${i * 70}ms, transform .6s var(--ease-ink) ${i * 70}ms`,
              }}
            >
              <span
                className={cn(
                  "w-8 shrink-0 text-[0.6rem] tracking-[0.24em]",
                  after ? "text-gold" : "text-oxblood-bright",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "font-display text-[clamp(1.4rem,4.4vw,2.9rem)] leading-tight",
                  after ? "text-ivory" : "text-muted-foreground",
                  !after && i >= WITHOUT.length - 2 && "opacity-45",
                )}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ INCLUDED --------------------------- */

const INCLUDED = [
  "Custom desktop + mobile design",
  "Services / packages",
  "Portfolio / gallery",
  "Booking or inquiry flow where applicable",
  "Payment / deposit integration where applicable",
  "Contact forms",
  "Reviews / social proof",
  "Domain connection",
  "Basic SEO setup",
  "Mobile optimization",
];

function Included() {
  return (
    <section className="paper-grain relative bg-paper px-5 py-24 text-ink md:px-10 md:py-36">
      <div className="mx-auto w-full max-w-[80rem]">
        <SectionLabel tone="oxblood">What&rsquo;s included</SectionLabel>
        <h2 className="mt-6 max-w-3xl font-display text-[clamp(1.9rem,5.4vw,4rem)] leading-[1] tracking-[-0.015em]">
          Everything the build needs. <span className="italic text-oxblood">Nothing padded.</span>
        </h2>

        <ul className="mt-12 columns-1 gap-x-16 md:columns-2">
          {INCLUDED.map((item, i) => (
            <Reveal key={item} delay={i * 45}>
              <li className="group mb-0 flex break-inside-avoid items-baseline gap-5 border-b border-paper-line py-5">
                <span className="text-[0.58rem] tracking-[0.28em] text-oxblood/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl leading-snug transition-transform duration-500 [transition-timing-function:var(--ease-ink)] group-hover:translate-x-1 md:text-2xl">
                  {item}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------- OBJECTIONS -------------------------- */

function Objections() {
  const items = [
    {
      q: "\u201CI already have Instagram.\u201D",
      a: (
        <>
          <p className="font-display text-3xl italic text-gold-foil md:text-5xl">Good. Keep it.</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Instagram gets their attention. Your website gives that attention somewhere to go.
          </p>
        </>
      ),
    },
    {
      q: "\u201CDo I need a sales call?\u201D",
      a: (
        <>
          <p className="font-display text-3xl italic text-gold-foil md:text-5xl">No.</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            You&rsquo;ve seen our work. You&rsquo;ve seen your preview. You know the price. If
            you&rsquo;re ready, checkout takes about a minute.
          </p>
        </>
      ),
    },
  ];

  return (
    <section className="surface-grain relative bg-ink px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto w-full max-w-[80rem] space-y-20 md:space-y-32">
        {items.map((it) => (
          <Reveal key={it.q}>
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <h3 className="font-display text-[clamp(2.1rem,8vw,6rem)] leading-[0.95] tracking-[-0.02em] text-ivory">
                {it.q}
              </h3>
              <div className="border-l border-gold/40 pl-6">{it.a}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- CLOSE ----------------------------- */

function Close() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const [second, setSecond] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setSecond(true), 900);
    return () => clearTimeout(t);
  }, [inView]);

  const [sent, setSent] = useState(false);

  return (
    <section
      id="checkout"
      className="surface-grain relative overflow-hidden bg-ink-deep px-5 py-28 md:px-10 md:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] opacity-70"
        style={{ background: "var(--gradient-oxblood)", filter: "blur(80px)" }}
      />
      <div ref={ref} className="relative mx-auto w-full max-w-[80rem]">
        <h2 className="font-display text-[clamp(2.3rem,9.5vw,7.5rem)] leading-[0.92] tracking-[-0.02em] text-ivory">
          <span
            className="block transition-all duration-1000 [transition-timing-function:var(--ease-ink)]"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)" }}
          >
            YOU CAN KEEP THE SCREENSHOT.
          </span>
          <span
            className="mt-2 block italic text-gold-foil transition-all duration-1000 [transition-timing-function:var(--ease-ink)]"
            style={{ opacity: second ? 1 : 0, transform: second ? "none" : "translateY(28px)" }}
          >
            OR WE CAN BUILD THE DAMN THING.
          </span>
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="flex flex-col items-start gap-8">
            <PriceBlock />
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
              Preview pricing is available for 24 hours after preview delivery.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success("Received — your secure payment link is on its way.");
            }}
            className="border border-border bg-ink/60 p-6 backdrop-blur-sm md:p-8"
          >
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">
              Secure checkout &mdash; about a minute
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                { id: "name", label: "Your name", type: "text", auto: "name" },
                { id: "business", label: "Business name", type: "text", auto: "organization" },
                { id: "email", label: "Email", type: "email", auto: "email" },
                { id: "phone", label: "Phone", type: "tel", auto: "tel" },
              ].map((f) => (
                <label key={f.id} className="flex flex-col gap-2">
                  <span className="text-[0.58rem] uppercase tracking-[0.24em] text-muted-foreground">
                    {f.label}
                  </span>
                  <input
                    required={f.id !== "phone"}
                    id={f.id}
                    name={f.id}
                    type={f.type}
                    autoComplete={f.auto}
                    className="w-full border-b border-input bg-transparent pb-2 text-ivory outline-none transition-colors focus:border-gold"
                  />
                </label>
              ))}
            </div>
            <button
              type="submit"
              disabled={sent}
              className="group mt-8 inline-flex w-full items-center justify-between gap-6 bg-gold px-7 py-5 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-ink transition-colors duration-500 hover:bg-gold-bright disabled:opacity-60"
            >
              <span>{sent ? "Sent — check your inbox" : "Yes — build mine"}</span>
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-2">
                &rarr;
              </span>
            </button>
            <p className="mt-4 text-[0.62rem] leading-relaxed text-muted-foreground">
              One payment of $699. No surprise design fees. No sales call required.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- PAGE ----------------------------- */

function StickyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 1.2);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-ink-deep/90 px-4 py-3 backdrop-blur-xl transition-transform duration-700 [transition-timing-function:var(--ease-ink)] lg:hidden",
        show ? "translate-y-0" : "translate-y-full",
      )}
    >
      <a
        href="#checkout"
        className="flex items-center justify-between gap-4 bg-gold px-5 py-4 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-ink"
      >
        <span>Build mine &mdash; $699</span>
        <span aria-hidden>&rarr;</span>
      </a>
    </div>
  );
}

function PreviewOffer() {
  return (
    <main className="bg-ink">
      <Hero />
      <Next />
      <Difference />
      <Included />
      <Objections />
      <Close />
      <footer className="bg-ink px-5 py-10 text-center text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground md:px-10">
        Sunday &amp; Ink
      </footer>
      <StickyBar />
    </main>
  );
}
