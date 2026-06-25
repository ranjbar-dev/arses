# Arses — Product Requirements Document

**Project:** Single-page brand & lead-generation website
**Domain:** `arses.it.com`
**Company:** Arses — web design, development & deployment studio
**Reference work:** behkame.com (built by Arses)
**Document status:** Approved design direction → ready for implementation
**Last updated:** 2026-06-25

---

## 1. Overview

Arses is a studio that designs, builds, and ships websites for clients. This project is a **single-page** website that acts as the studio's own storefront: it must look unmistakably professional and motion-rich so that prospective clients trust the work and reach out with project offers.

The page is **bilingual (English + Persian)** with full layout direction switching (LTR ↔ RTL), built on a dark, architectural visual identity derived from the Arses logo, and animation-heavy throughout. It uses no backend — conversion happens through direct Telegram and phone links.

## 2. Goals & success criteria

**Primary goal:** Convert a visiting prospect into an inbound contact via Telegram or phone.

**Success criteria:**
- A first-time visitor understands *what Arses does* within 5 seconds of landing.
- The page communicates senior-level craft through motion quality and polish (the site is itself a portfolio piece).
- Clear, frictionless path to contact, reachable from the hero and the closing section.
- Loads fast and stays smooth (60fps motion) on mid-range laptops and modern phones.
- Works correctly in both English (LTR) and Persian (RTL).

**Non-goals (out of scope):** blog/CMS, multi-page navigation, contact form with backend, e-commerce, authentication, dashboard.

## 3. Target audience

Prospective clients evaluating a studio to design and build their website — small businesses, startups, and founders. They are judging credibility primarily through *visual quality and proof of work*. Secondary audience: partners/agencies looking to subcontract.

## 4. Brand & visual identity

### 4.1 Logo
- Mark: angular geometric "A" monogram (nested chevron/peak forms) + `ARSES` wordmark.
- Provided assets: `Group 158.svg` (dark, fill `#001F20`, for light backgrounds) and `Group 157.svg` (white, for dark backgrounds). The site is dark, so **the white version is the primary on-page logo**.
- The monogram's line geometry is the central motion motif (see §6.1).

### 4.2 Color tokens
Dark, immersive theme. Base is the brand deep teal; Mint is the luminous accent for CTAs, glows, motion trails, and focus states.

| Token | Hex | Use |
|---|---|---|
| `--bg-deep` | `#001214` | Deepest background wells, section seams |
| `--bg-base` | `#001F20` | Primary page background (brand color) |
| `--surface-1` | `#062B2B` | Raised cards, panels |
| `--surface-2` | `#0A3A38` | Hover surfaces, elevated tiles |
| `--accent` | `#5EEAD4` | Primary accent — CTAs, glows, active states |
| `--accent-bright` | `#8FF3E2` | Accent hover / highlight peak |
| `--accent-deep` | `#2DD4BF` | Secondary accent, lines, underlines |
| `--on-accent` | `#001F20` | Text/icons placed on accent fills |
| `--text-primary` | `#EAF6F3` | Headings & primary body |
| `--text-secondary` | `#8FB3AE` | Sub-text, captions |
| `--text-faint` | `#557571` | Disabled, fine print, labels |
| `--border` | `rgba(94,234,212,0.12)` | Default hairline borders |
| `--border-strong` | `rgba(94,234,212,0.28)` | Hover/active borders |

Contrast: all text/background pairs must meet WCAG AA (4.5:1 body, 3:1 large). `--text-secondary` on `--bg-base` and accent-on-base both pass; verify any new pairing.

### 4.3 Typography
- **Display / headings (Latin):** Space Grotesk — geometric, technical, matches the angular mark.
- **Body (Latin):** Inter.
- **Persian (all text):** Vazirmatn (headings + body; it carries weight range well).
- **Mono accent:** JetBrains Mono — for tech labels, numeric counters, small eyebrow tags.
- Two-weight discipline per family (regular + medium/semibold). Avoid ultra-heavy weights except optional display headline.
- Persian text uses Vazirmatn at all weights and slightly increased line-height for legibility.

## 5. Bilingual / i18n & RTL requirements

- Language toggle (EN / FA) in the header and footer. Default language: **English**; remember the user's choice for the session (in-memory/state — no persistent storage needed, but a simple `localStorage` preference is acceptable in the real app build).
- Switching to Persian sets `dir="rtl"` on the document root and `lang="fa"`; English sets `dir="ltr"` / `lang="en"`.
- All layout must be **logical-property based** (`margin-inline`, `padding-inline`, `inset-inline`) so it mirrors cleanly. No hard-coded left/right that breaks RTL.
- Directional motion (e.g., entrance slides, marquee direction, timeline progression) must respect reading direction: animations that move "forward" go left→right in EN and right→left in FA.
- All copy lives in a translation dictionary (`en` / `fa` keys). Placeholder content (see §8) is provided in both languages as lorem-style stand-ins with clear TODO markers.
- Numerals: keep Latin digits for tech/stats by default; optionally Persian digits in FA mode (mark as a stretch item, not required for v1).

## 6. Creative direction — "Architectural Dark"

The entire page is an immersive `--bg-base` canvas. Mint accent is used **sparingly** — it should feel lit-from-within, not neon-saturated. Restraint is what keeps it premium. Generous negative space; large confident type; precise, intentional motion rather than constant movement.

### 6.1 Signature motion motif
The angular A-monogram is the hero of the load animation: its lines **draw themselves** and the peaks **assemble** into the finished mark (SVG path-drawing). The same chevron geometry recurs subtly as section dividers, hover indicators, and scroll-progress cues.

### 6.2 Motion principles
- Animate only `transform`, `opacity`, and `filter`. Never animate layout properties (width/height/margin/top/left).
- Motion supports comprehension; it never blocks reading or delays the CTA.
- Every animation has a `prefers-reduced-motion` fallback that renders the final state instantly (no path-draw, no parallax, no scroll-scrub — content simply appears).
- Default easing: custom cubic-bezier with a confident settle (e.g. `cubic-bezier(0.16, 1, 0.3, 1)`); springs for interactive/hover feedback.

## 7. Information architecture (page sections)

Single scrolling page. Each section below lists: purpose, content slots (placeholders), and motion spec.

### 7.1 Header (sticky, minimal)
- Slots: white A-monogram (small), `ARSES` wordmark, anchor links (Work · Process · Contact), EN/FA toggle, primary "Start a project" button (Telegram).
- Motion: condenses/blurs background on scroll; underline-draw on link hover; magnetic effect on the CTA button.

### 7.2 Hero
- Slots: animated A-monogram build; H1 headline `[TODO: value proposition]`; sub-headline `[TODO: one-line what/for-whom]`; primary CTA "Start a project" (Telegram) + secondary "See our work" (scroll anchor); ambient fog layer behind.
- Placeholder H1 (EN): "We design and build websites that win attention." / (FA): "ما وب‌سایت‌هایی می‌سازیم که دیده می‌شوند." *(placeholder — replace)*
- Motion: monogram path-draw + assemble on load; headline mask/clip reveal line by line; slow-drifting ambient fog (lightweight — CSS/canvas, not heavy WebGL); CTA buttons fade-rise with slight stagger.

### 7.3 What we do (Services)
- Three offerings as cards: **Design**, **Development**, **Deployment** (publish). Each card: icon (chevron-derived), title, 1–2 line description `[TODO]`.
- Motion: cards reveal on scroll with stagger; on hover, surface lifts to `--surface-2`, accent hairline draws around the border, icon performs a small chevron animation.

### 7.4 Tech we use
- Horizontal logo marquee / grid of technologies (mirrors behkame's "expert on these technologies"). Placeholder set: React, Next.js, Vue, Node, Laravel, Tailwind, TypeScript, Figma `[TODO: confirm real stack]`.
- Motion: continuous marquee (direction respects RTL/LTR); items desaturate→accent on hover; pauses on hover.

### 7.5 Selected work (Portfolio)
- Tiles for case studies. First tile = **behkame.com** (live link). Remaining 3–5 tiles are placeholders `[TODO: add real projects]`. Each tile: thumbnail/preview, project name, short tag, outbound link.
- Motion: tiles reveal on scroll-scrub; hover triggers a preview zoom + accent label slide-in + cursor changes to "View" (magnetic cursor). Respect RTL for tile entrance direction.

### 7.6 Process
- Five steps mirroring the studio's proven flow: **Initiation → Planning → Execution → Testing → Delivery**, each with a one-line description `[TODO]`.
- Motion: scroll-scrubbed timeline. A progress line (chevron-tipped) draws as the user scrolls; each step activates (accent fill, number/label emphasis) as it enters view. In FA, timeline progresses right→left.

### 7.7 Why Arses
- 3–4 animated stat counters `[TODO: real numbers]` (e.g., projects delivered, years, clients, avg. delivery time) + one short credibility line.
- Motion: numbers count up when scrolled into view; subtle accent underline draw.

### 7.8 Contact (closing CTA)
- The conversion moment. Large headline `[TODO]`, Telegram button (primary), phone link `tel:[TODO]`, optional Telegram handle text. No form.
- Motion: oversized kinetic headline reveal; accent glow pulse on the Telegram button (subtle, single emphasis — not looping aggressively); monogram echo in background.

### 7.9 Footer
- Slots: white logo, anchor links, EN/FA toggle, Telegram + phone, copyright `© Arses`, domain `arses.it.com`.
- Motion: minimal — fade-in on reveal.

## 8. Content & placeholder strategy

Build with placeholders; the client fills real copy later. Requirements:
- Every text slot has placeholder copy in **both EN and FA**, wrapped/marked as `[TODO]` in the translation dictionary so they're easy to find and replace.
- Portfolio: one real tile (behkame.com) + clearly-labeled placeholder tiles using neutral gradient/teal thumbnails.
- Stats and tech list use realistic-looking placeholders with `[TODO]` flags.
- No lorem ipsum in visible final copy that could ship by accident — use plausible English/Persian sentences marked as placeholders.

## 9. Interaction & animation system

- **Smooth scroll:** Lenis (RTL-aware configuration).
- **Component / gesture animation:** Motion (Framer Motion) — entrance reveals, hover/tap, stagger, layout.
- **Timeline / scroll-scrub / path-draw:** GSAP + ScrollTrigger (use `useGSAP` for React cleanup; `ease: "none"` for scrubbed timelines).
- **Magnetic cursor:** custom, enabled on pointer-fine devices only; disabled on touch.
- **Ambient fog:** lightweight CSS/canvas gradient drift (no full Three.js scene in v1; 3D is a future stretch item).
- **Reduced motion:** a single `prefers-reduced-motion` guard disables Lenis smoothing, scrub, path-draw, parallax, and marquee auto-scroll, rendering final states immediately.
- **Performance:** lazy-init heavy animations per-section via ScrollTrigger; `will-change` used sparingly and removed after animation; images lazy-loaded; marquee uses transform only.

## 10. Tech stack & architecture

- **Build:** Vite + React + TypeScript.
- **Styling:** Tailwind CSS with the color tokens from §4.2 mapped to CSS variables (so RTL + dark are clean).
- **Animation:** Motion + GSAP/ScrollTrigger + Lenis (per §9).
- **i18n:** lightweight setup (react-i18next or a simple typed context) with `en`/`fa` dictionaries and a `dir` switch.
- **Fonts:** self-hosted or Google Fonts — Space Grotesk, Inter, Vazirmatn, JetBrains Mono.
- **Structure:** component-per-section (`Hero`, `Services`, `TechMarquee`, `Work`, `Process`, `WhyUs`, `Contact`, `Header`, `Footer`), a `lib/i18n` module, a `lib/motion` module for shared variants/easings, and a `data/` module for placeholder content (services, tech, work, process, stats).
- **Deployment:** Cloudflare Pages (static).

## 11. Conversion / contact

- Telegram: primary CTA in header, hero, and contact section → `https://t.me/[TODO-handle]`.
- Phone: `tel:[TODO-number]` link in contact + footer.
- No backend, no form, no analytics dependency required for v1 (optional: add a privacy-friendly analytics snippet later).

## 12. Accessibility

- WCAG AA contrast across both themes/languages.
- Full keyboard navigation; visible accent focus rings on all interactive elements.
- `prefers-reduced-motion` honored everywhere (§9).
- Semantic landmarks (`header`, `main`, `section`, `footer`), proper heading order, `aria-label`s on icon-only buttons, `lang`/`dir` set correctly per language.
- Marquee and looping motion are decorative and `aria-hidden` where appropriate; they pause on hover/focus.

## 13. SEO, meta & performance budget

- Per-language `<title>` and meta description; `hreflang` for en/fa; Open Graph image using the monogram on the deep-teal base.
- Favicon/app icons from the monogram.
- Targets: Lighthouse Performance ≥ 90 on desktop; LCP < 2.5s; CLS < 0.1. Hero must reach a meaningful first paint before the full load animation completes.

## 14. Responsive design

Breakpoints: mobile `375px`, tablet `768px`, desktop `1024px`, wide `1440px`.
- Mobile: monogram animation simplifies; marquee speeds adjust; magnetic cursor + parallax disabled; timeline becomes vertical; CTAs are thumb-reachable.
- Test both EN and FA at every breakpoint.

## 15. Asset checklist (client to provide later)

- [ ] Real headline + sub-headline copy (EN/FA)
- [ ] Service descriptions ×3 (EN/FA)
- [ ] Confirmed technology list
- [ ] Portfolio projects: name, thumbnail, link, short tag (×3–5)
- [ ] Process step descriptions ×5 (EN/FA)
- [ ] Real stats/numbers
- [ ] Telegram handle + phone number
- [ ] OG/social share image preference

## 16. Future / stretch (explicitly not v1)

- True WebGL/Three.js 3D monogram hero.
- Persian numeral localization for stats.
- Lightweight analytics.
- Additional case-study detail overlays.

## 17. Open questions / TODO before build

- Confirm Telegram handle and phone number.
- Confirm the real technology list for §7.4.
- Confirm tone of voice for headline copy (bold/punchy vs. understated/premium).
- Confirm whether language preference should persist across visits (localStorage) or reset to EN each time.