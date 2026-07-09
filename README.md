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
- `lib/builds.ts` — the "Also shipped" grid (products, client work, public repos)
- `components/ProjectVisual.tsx` — shared SVG line icons for project card visuals

## Done
- [x] Light/dark theme toggle (persisted, pre-hydration script, GSAP-safe transitions)
- [x] Animated wireframe backdrop behind the Work heading card
- [x] Mobile-first pass, tested at 375 / 390 / 414 / 430 px: responsive header with ≥44px tap targets, compact hero code panel on tall phones, stacked Results metrics, tappable project visuals (magnetic button is desktop-only), custom cursor fully disabled on touch, no horizontal overflow anywhere — re-verified after the screenshot/content changes below
- [x] "Also shipped" section — grid of products, client work, and public repos (`lib/builds.ts`)
- [x] Project card visuals use consistent SVG line icons (`ProjectVisual.tsx`) — saas / growth / landing / product / tasks / lawn — not literal UI screenshots
- [x] Hero word rotation scroll mapping fixed (extended trigger distance + even bucket distribution)
- [x] Philosophy section: large grayscale headshot merged into the left background (fades into page bg)
- [x] Work project visual SVGs animate inside their boxes (clock hands, bars, orbit, etc.; respects reduced-motion)
- [x] Contact: LinkedIn + GitHub only (WhatsApp / Call / FaceTime banner removed)
- [x] Results rows: hover wash + accent bar; metric digits count up / scale on hover
- [x] URLs corrected: NPI case study → casestudies-gamma.vercel.app/xovera-npi, NSEC Baseball → baseball-lessons-two.vercel.app
- [x] GitHub link in Contact points to github.com/iamsharjeeel

## Things to customize before shipping
- [ ] Fill in real descriptions for `ReVox` and `my-automation-engine` in `lib/builds.ts` (their repos have no README)
- [ ] Confirm email: currently `iamsharjeeel@gmail.com`
- [ ] Add a favicon / OG image in `app/` if you want link previews to look right
- [ ] Decide whether s1mplesolutions.cc gets promoted to a 4th flagship project in `Work.tsx`
