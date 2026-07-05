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
- `components/` — Hero, Work (horizontal pinned scroll), Philosophy, Results, Marquee, Stack, Contact, CustomCursor, CodePanel, SmoothScrollProvider
- `lib/content.ts` — hero rotating words + code snippets shown in the signature panel
- `lib/projects.ts` — the 3 featured projects (edit here to swap projects/links/stats)

## Things to customize before shipping
- [ ] Replace `#` placeholder links for LinkedIn, GitHub, and the NSEC project
- [ ] Swap the letter-only project visuals (`C` / `N` / `B`) for real screenshots — edit `ProjectCard.tsx`, replace the `parallax-layer` background with an `<Image>` 
- [ ] Confirm email: currently `iamsharjeeel@gmail.com`
- [ ] Add a favicon / OG image in `app/` if you want link previews to look right
