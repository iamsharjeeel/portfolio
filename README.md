# Sharjeel — Personal Portfolio

Standalone personal portfolio for [sharjeel.cc](https://sharjeel.cc). Next.js App Router, TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis smooth scroll.

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

## SEO / quality
```bash
npm run lint
npm run typecheck
npm run build
npm run seo:audit
```

`seo:audit` starts the production server, crawls `sitemap.xml`, and fails on missing/duplicate titles, descriptions, canonicals, H1s, OG/Twitter tags, broken internal links, invalid JSON-LD, sitemap non-200s, accidental noindex, and localhost leaks.

## Deploy to Vercel
```bash
npx vercel
```
or connect the repo in the Vercel dashboard. Attach `sharjeel.cc` and `www.sharjeel.cc`; apex is canonical.

## Environment
Set in Vercel / `.env.local` only if you want analytics:
```bash
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=
```

Contact and booking use HighLevel widgets (`links.s1mplesolutions.cc`). Validation, spam protection, and rate limiting are GHL’s, not this app.

Production responses include CSP (`frame-src` / `script-src` for HighLevel + optional GA/GTM), `nosniff`, clickjacking protection, `Referrer-Policy`, and `Permissions-Policy`. Theme boot and Next/Tailwind need `'unsafe-inline'` for scripts/styles; production CSP does not allow `unsafe-eval`.

## Structure
- `app/page.tsx` — homepage
- `app/about`, `app/work`, `app/work/*`, `app/services/*`, `app/contact`, `app/book` — indexable SEO routes
- `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`
- `components/GhlWidget.tsx` — HighLevel contact form + booking calendar embeds
- `lib/seo.ts` — canonical site URL, titles, descriptions
- `components/` — Hero, Work, Philosophy, Results, Marquee, Stack, AlsoShipped, Contact, CustomCursor, CodePanel, SmoothScrollProvider, ThemeProvider/ThemeToggle, WorkBackdrop, Header, Footer, SiteChrome
- `lib/content.ts` — hero rotating words + code snippets
- `lib/projects.ts` — featured projects
- `lib/builds.ts` — Also shipped grid
- `scripts/seo-audit.mjs` — CI SEO gate

## Manual after deploy
- Verify `sharjeel.cc` in Google Search Console and submit `/sitemap.xml`
- Add a real GA4/GTM ID only if you want analytics
- In GHL form + calendar designers, set background `#0A0A0A`, accent `#FF4D2E`, text `#FAFAF8` if you want the widgets to match the site (iframe CSS cannot do this)
