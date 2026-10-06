# Cinematic Sunday & Ink

## Goal
Turn the existing homepage into one continuous, high-impact studio journey while preserving its content, real portfolio links, conversion paths, accessibility, and core Ink/Paper/Dust palette.

## Experience sequence
1. **Opening act** — Replace the current text-first hero with a pinned cinematic sequence: quiet Sunday & Ink title, then oversized copy separating into “websites shouldn’t just exist / they should be impossible to ignore.” Real project fragments move through masks and establish four distinct visual worlds.
2. **Manifesto bridge** — Keep the existing large statements, but transition them from the hero as moving foreground/background type instead of a separate stacked chapter.
3. **Signature transformation** — Rebuild Invisible → Unmistakable as a full-viewport three-act takeover. The generic page fractures and peels away, the branded world expands beyond its frame, and the final word crosses the viewport. Keep the scrubber and keyboard controls.
4. **Portfolio universes** — Recompose the four real projects into a vertical-scroll-driven cinematic reel. Each project takes over the viewport with its own palette and composition; screenshots escape frames through crops, masks, overlapping device fragments, and depth movement. Every project keeps its external link and clear case-study copy.
5. **Editorial selling chapters** — Preserve services, specialty, revenue math, industries, craft, contact, and final CTA, but connect them with shared typography and image transitions. Keep interactive tools usable rather than forcing every section into a scroll effect.
6. **Pricing as editorial offer** — Preserve immediate package clarity while making Essential, Signature, and Premier feel like large creative editions with restrained separators, spatial typography, and subtle focus interactions.
7. **Mobile choreography** — Build separate narrow-screen compositions: shorter sticky scenes, vertical masks, stacked screenshot depth, oversized cropped type, no desktop-only horizontal assumptions, and no overflow.

## Technical approach
- Add a lightweight shared scroll-scene system using direct DOM transforms inside `requestAnimationFrame`, avoiding per-frame React state renders and heavy smooth-scroll hijacking.
- Reuse existing optimized WebP project posters; add the unused mid/mobile crops where they strengthen each world. No fake client imagery.
- Keep reduced-motion fallbacks in normal document flow, preserve focus order, and mark inactive visual layers appropriately.
- Use Signal only for rare active markers and transition flashes; portfolio worlds receive independent project-specific colors.
- Verify desktop and iPhone-width scenes, links, controls, overflow, runtime errors, and the preview build.
