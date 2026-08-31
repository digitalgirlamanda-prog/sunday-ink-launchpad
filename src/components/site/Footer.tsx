export function Footer() {
  return (
    <footer className="border-t border-border bg-ink-deep px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[110rem]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl tracking-[0.16em] text-ivory">SUNDAY</span>
              <span className="font-display text-3xl italic text-gold-foil">&amp;</span>
              <span className="font-display text-2xl tracking-[0.16em] text-ivory">INK</span>
            </div>
            <p className="mt-4 text-[0.65rem] uppercase tracking-[0.34em] text-gold">
              Websites. Brands. Beautifully built.
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A design studio for owner-led businesses that have outgrown templates — with a
              specialty in vacation rentals and direct booking.
            </p>
          </div>

          <nav aria-label="Services">
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground/70">
              Services
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["Web design", "#services"],
                ["Brand identity", "#services"],
                ["Digital growth", "#services"],
                ["Vacation rentals", "#specialty"],
                ["Pricing", "#pricing"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="rule-draw text-muted-foreground hover:text-ivory">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Work">
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground/70">
              Selected work
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["Knoll House", "https://knoll-house-atlas.lovable.app"],
                ["Tiki Waikiki", "https://tiki-waikiki-dream.lovable.app"],
                ["Harry's Lake House", "https://poconolakeescape.com"],
                ["Noah's House", "https://ethereal-web.lovable.app"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="rule-draw text-muted-foreground hover:text-ivory"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground/70">
              Connect
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href="#start" className="rule-draw text-muted-foreground hover:text-ivory">
                  Start a project
                </a>
              </li>
              <li>
                <span className="text-muted-foreground/60">Instagram — coming soon</span>
              </li>
              <li>
                <span className="text-muted-foreground/60">Facebook — coming soon</span>
              </li>
              <li>
                <span className="text-muted-foreground/60">Pinterest — coming soon</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground/70 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Sunday &amp; Ink. All rights reserved.</p>
          <p className="flex gap-6">
            <span>Privacy policy — coming soon</span>
            <span>Terms — coming soon</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
