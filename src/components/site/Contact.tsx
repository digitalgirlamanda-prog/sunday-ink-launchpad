import { useState } from "react";
import { toast } from "sonner";
import { Reveal, SectionLabel } from "./primitives";

const NEEDS = [
  "Website",
  "Branding",
  "Website + Brand",
  "Vacation Rental Direct Booking",
  "Social",
  "Not sure",
];

const BUDGETS = [
  "Under $1,000",
  "$1,000 – $1,500",
  "$1,500 – $2,500",
  "$2,500 – $5,000",
  "$5,000+",
  "Not sure yet",
];

const fieldClass =
  "w-full border-0 border-b border-border bg-transparent px-0 py-3 text-ivory placeholder:text-muted-foreground/60 transition-colors duration-500 focus:border-gold focus:outline-none";

export function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    setTimeout(() => {
      setSending(false);
      toast.success(
        `Thanks${name ? `, ${name.split(" ")[0]}` : ""} — your project details are on their way.`,
        { description: "We reply personally, usually within one business day." },
      );
      e.currentTarget?.reset?.();
    }, 600);
  };

  return (
    <section id="start" className="surface-grain relative bg-ink px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-[110rem] gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div>
          <Reveal>
            <SectionLabel>Start your project</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 font-display text-[clamp(2.3rem,7vw,6rem)] leading-[0.9] text-ivory">
              LET&rsquo;S MAKE YOUR BUSINESS{" "}
              <span className="italic text-gold-foil">hard to forget.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              Tell us about the business and what you need it to do. We&rsquo;ll come back with a
              straight answer on scope, timeline and the right starting point.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <a
              href="#start"
              className="rule-draw mt-8 inline-block text-sm text-gold"
            >
              Not sure what you need? Tell us what isn&rsquo;t working.
            </a>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <form onSubmit={onSubmit} className="space-y-7 border border-border bg-ink-deep p-6 md:p-10">
            <div className="grid gap-7 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                  Name
                </label>
                <input id="name" name="name" required autoComplete="name" className={fieldClass} placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="business" className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                  Business name
                </label>
                <input id="business" name="business" required className={fieldClass} placeholder="Business name" />
              </div>
            </div>

            <div className="grid gap-7 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                  Email
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="you@business.com" />
              </div>
              <div>
                <label htmlFor="url" className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                  Website / social <span className="text-muted-foreground/60">(optional)</span>
                </label>
                <input id="url" name="url" className={fieldClass} placeholder="link" />
              </div>
            </div>

            <div className="grid gap-7 sm:grid-cols-2">
              <div>
                <label htmlFor="need" className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                  What do you need?
                </label>
                <select id="need" name="need" required defaultValue="" className={`${fieldClass} [&>option]:bg-ink`}>
                  <option value="" disabled>
                    Select one
                  </option>
                  {NEEDS.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                  Approximate budget
                </label>
                <select id="budget" name="budget" required defaultValue="" className={`${fieldClass} [&>option]:bg-ink`}>
                  <option value="" disabled>
                    Select a range
                  </option>
                  {BUDGETS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="details" className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                Project description
              </label>
              <textarea
                id="details"
                name="details"
                rows={4}
                required
                className={`${fieldClass} resize-none`}
                placeholder="What are you selling, who buys it, and what isn't working right now?"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="group w-full bg-gold px-8 py-5 text-[0.72rem] uppercase tracking-[0.32em] text-ink transition-colors duration-500 hover:bg-gold-bright disabled:opacity-60"
            >
              {sending ? "Sending…" : "Start my project"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}