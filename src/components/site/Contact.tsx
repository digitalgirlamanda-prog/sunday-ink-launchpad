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
  "w-full border-0 border-b border-paper-line bg-transparent px-0 py-3 text-ink placeholder:text-ink-soft/50 transition-colors duration-500 focus:border-oxblood focus:outline-none";

export function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    setTimeout(() => {
      setSending(false);
      toast.success(
        `Thanks${name ? `, ${name.split(" ")[0]}` : ""} — your project details are on their way.`,
        { description: "We reply personally, usually within one business day." },
      );
      form.reset();
    }, 600);
  };

  return (
    <section id="start" className="surface-grain relative overflow-hidden bg-ink px-5 py-24 md:px-10 md:py-36">
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[-10rem] left-[-4rem] select-none font-display text-[32rem] italic leading-none text-gold/[0.05]"
      >
        &amp;
      </span>
      <div className="relative mx-auto grid max-w-[110rem] gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
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
            <a href="#start" className="rule-draw mt-8 inline-block text-sm text-gold">
              Not sure what you need? Tell us what isn&rsquo;t working.
            </a>
          </Reveal>
        </div>

        <Reveal delay={120}>
          {/* The brief sheet */}
          <div className="relative">
            <form
              onSubmit={onSubmit}
              className="paper-grain relative rotate-[-0.5deg] space-y-7 bg-paper p-6 text-ink md:p-10"
              style={{ boxShadow: "var(--shadow-paper)" }}
            >
              <p className="text-[0.55rem] uppercase tracking-[0.34em] text-ink-soft/60">
                Sunday &amp; Ink — project brief
              </p>
              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-[0.6rem] uppercase tracking-[0.3em] text-oxblood">
                    Name
                  </label>
                  <input id="name" name="name" required autoComplete="name" className={fieldClass} placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="business" className="text-[0.6rem] uppercase tracking-[0.3em] text-oxblood">
                    Business name
                  </label>
                  <input id="business" name="business" required className={fieldClass} placeholder="Business name" />
                </div>
              </div>

              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="text-[0.6rem] uppercase tracking-[0.3em] text-oxblood">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="you@business.com" />
                </div>
                <div>
                  <label htmlFor="url" className="text-[0.6rem] uppercase tracking-[0.3em] text-oxblood">
                    Website / social <span className="text-ink-soft/50">(optional)</span>
                  </label>
                  <input id="url" name="url" className={fieldClass} placeholder="link" />
                </div>
              </div>

              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor="need" className="text-[0.6rem] uppercase tracking-[0.3em] text-oxblood">
                    What do you need?
                  </label>
                  <select id="need" name="need" required defaultValue="" className={`${fieldClass} [&>option]:bg-paper`}>
                    <option value="" disabled>
                      Select one
                    </option>
                    {NEEDS.map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="text-[0.6rem] uppercase tracking-[0.3em] text-oxblood">
                    Approximate budget
                  </label>
                  <select id="budget" name="budget" required defaultValue="" className={`${fieldClass} [&>option]:bg-paper`}>
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
                <label htmlFor="details" className="text-[0.6rem] uppercase tracking-[0.3em] text-oxblood">
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
                className="w-full bg-ink px-8 py-5 text-[0.72rem] uppercase tracking-[0.32em] text-ivory transition-colors duration-500 hover:bg-oxblood active:scale-[0.99] disabled:opacity-60"
              >
                {sending ? "Sending…" : "Start my project"}
              </button>
            </form>
            <span className="stamp absolute -top-3 right-4 text-gold">New project</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
