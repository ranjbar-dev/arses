# Arses — Studio Website

One-page portfolio/lead-gen site. Dark, motion-rich, bilingual (EN/FA + RTL).

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/ → Cloudflare Pages
```

## Where to fill in content

### Contact handles
Search `[TODO-handle]` and `[TODO-number]` in the codebase — they appear in:
- `src/components/Header.tsx` (Telegram CTA)
- `src/components/Hero.tsx`
- `src/components/Contact.tsx`
- `src/components/Footer.tsx`

Replace `https://t.me/[TODO-handle]` with your real Telegram link and `tel:[TODO-number]` with your phone.

### Copy + translations
All visible text lives in two files:
- `src/lib/i18n/en.ts` — English
- `src/lib/i18n/fa.ts` — Persian (Farsi)

Every placeholder is marked `[TODO]`. Find them with:
```bash
grep -r "\[TODO" src/lib/i18n/
```

### Portfolio / work items
`src/data/index.ts` — `workItems` array. The first item (`behkame`) is live. Add real projects or replace the three `placeholder: true` entries.

### Tech stack
`src/data/index.ts` — `techStack` array. Update with your actual tools.

### Stats
`src/lib/i18n/en.ts` and `fa.ts` — `whyUs.stats` array. Replace values and labels.

## Language persistence flag

`src/lib/i18n/context.tsx` line 8:
```ts
const PERSIST = true   // set false to reset to EN on every page load
```

## Deploy to Cloudflare Pages

1. Push to GitHub
2. In Cloudflare Pages: connect repo, build command `npm run build`, output `dist`
3. Done — `public/_redirects` handles SPA routing

## Motion / reduced-motion

All animations check `prefers-reduced-motion` via `useReducedMotion()` in `src/lib/motion/index.ts`. When active: Lenis smoothing off, no path-draw, no scroll-scrub, no parallax — final states render immediately.
