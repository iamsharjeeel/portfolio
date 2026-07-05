# Sharjeel — Personal Portfolio

Standalone personal portfolio. Next.js 14+ (App Router), TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis smooth scroll.

## Design system
- Dark studio aesthetic — near-black background (#0A0A0A), warm red-orange accent (#FF4D2E)
- Display/body: Inter (900 weight headlines, tight tracking)
- Mono: JetBrains Mono (labels, code, data)
- Signature element: live-typing code panel in the hero, color-synced to scroll-driven word rotation (CODE / ADS / SCALE / SYSTEMS)

## Run locally
```bash
npm install
npm run dev
```
Visit http://localhost:3000

## Build
```bash
npm run build
npm start
```

## Deploy to Vercel
```bash
npx vercel
```
or connect the repo in the Vercel dashboard — zero config needed, this is a standard Next.js app.

## Structure
- `app/page.tsx` — composes all sections
- `components/` — Hero, Work (horizontal pinned scroll), Philosophy, Results, Marquee, Stack, AlsoShipped, Contact, CustomCursor, CodePanel, SmoothScrollProvider, ThemeProvider/ThemeToggle, WorkBackdrop
- `lib/content.ts` — hero rotating words + code snippets shown in the signature panel
- `lib/projects.ts` — the 3 featured projects (edit here to swap projects/links/stats)
- `lib/builds.ts` — the "Also shipped" GitHub repo grid (descriptions pulled from each repo's README)

## Done
- [x] Light/dark theme toggle (persisted, pre-hydration script, GSAP-safe transitions)
- [x] Animated wireframe backdrop behind the Work heading card
- [x] Mobile-first pass, tested at 375 / 390 / 414 / 430 px: responsive header with ≥44px tap targets, compact hero code panel on tall phones, stacked Results metrics, tappable project visuals (magnetic button is desktop-only), custom cursor fully disabled on touch, no horizontal overflow anywhere
- [x] "Also shipped" section — compact grid of public GitHub repos (`lib/builds.ts`)
- [x] GitHub link in Contact points to github.com/iamsharjeeel

## Things to customize before shipping
- [ ] Replace `#` placeholder links for LinkedIn (Contact) and the NSEC project (`lib/projects.ts`)
- [ ] Fill in real descriptions for `ReVox` and `my-automation-engine` in `lib/builds.ts` (their repos have no README)
- [ ] Swap the letter-only project visuals (`C` / `N` / `B`) for real screenshots — edit `ProjectCard.tsx`, replace the `parallax-layer` background with an `<Image>` 
- [ ] Confirm email: currently `iamsharjeeel@gmail.com`
- [ ] Add a favicon / OG image in `app/` if you want link previews to look right
