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
Set in Vercel / `.env.local`:
```bash
RESEND_API_KEY=re_...
# optional after verifying domain:
CONTACT_FROM_EMAIL="Sharjeel <hello@sharjeel.cc>"
CONTACT_NOTIFY_TO=iamsharjeeel@gmail.com
# optional analytics — leave empty until you have real IDs
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=
# optional override; defaults to the production LeadConnector trigger
LEAD_WEBHOOK_URL=
```
`/contact` posts to `/api/contact` and `/book` posts to `/api/book`. Both send JSON to the LeadConnector webhook. Resend email is best-effort if `RESEND_API_KEY` is set.

## Structure
- `app/page.tsx` — homepage
- `app/about`, `app/work`, `app/work/*`, `app/services/*`, `app/contact`, `app/book` — indexable SEO routes
- `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`
- `app/api/contact/route.ts` — contact form → LeadConnector JSON + optional Resend
- `app/api/book/route.ts` — booking request → LeadConnector JSON + optional Resend
- `lib/lead-webhook.ts` — server-only webhook helper
- `lib/seo.ts` — canonical site URL, titles, descriptions
- `lib/contact-email.ts` — branded notification template
- `components/` — Hero, Work, Philosophy, Results, Marquee, Stack, AlsoShipped, Contact, ContactForm, CustomCursor, CodePanel, SmoothScrollProvider, ThemeProvider/ThemeToggle, WorkBackdrop, Header, Footer, SiteChrome
- `lib/content.ts` — hero rotating words + code snippets
- `lib/projects.ts` — featured projects
- `lib/builds.ts` — Also shipped grid
- `scripts/seo-audit.mjs` — CI SEO gate

## Manual after deploy
- Verify `sharjeel.cc` in Google Search Console and submit `/sitemap.xml`
- Add a real GA4/GTM ID only if you want analytics
- Set `RESEND_API_KEY` (verify sharjeel.cc for the custom from-address)
- In GHL, map inbound webhook keys: `name`, `email`, `phone`, `project`, `message` / `notes`, `date`, `time`, `timezone`, `type`
