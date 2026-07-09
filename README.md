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

## Contact form email
Set in Vercel / `.env.local`:
```bash
RESEND_API_KEY=re_...
# optional after verifying domain:
CONTACT_FROM_EMAIL="Sharjeel <hello@sharjeel.cc>"
CONTACT_NOTIFY_TO=iamsharjeeel@gmail.com
```
Form posts to `/api/contact` and sends a branded HTML notification.

## Structure
- `app/page.tsx` — composes all sections
- `app/api/contact/route.ts` — contact form → Resend HTML email
- `lib/contact-email.ts` — branded notification template
- `components/` — Hero, Work, Philosophy, Results, Marquee, Stack, AlsoShipped, Contact, ContactForm, CustomCursor, CodePanel, SmoothScrollProvider, ThemeProvider/ThemeToggle, WorkBackdrop, Header
- `lib/content.ts` — hero rotating words + code snippets
- `lib/projects.ts` — featured projects
- `lib/builds.ts` — Also shipped grid
- `components/ProjectVisual.tsx` — SVG line icons for project visuals

## Done
- [x] Light/dark theme toggle
- [x] Mobile header: centered shell, no squished nav row
- [x] Philosophy always-dark; headshot fills left column to text height
- [x] Work / Also shipped visual animations + theme-matched boxes
- [x] Contact form → branded HTML email to `iamsharjeeel@gmail.com` (Resend)
- [x] Contact email display: `hello@sharjeel.cc`
- [x] Results row/digit hover interactions

## Things to customize before shipping
- [ ] Set `RESEND_API_KEY` in Vercel (verify sharjeel.cc for custom from-address)
- [ ] Fill in real descriptions for `ReVox` and `my-automation-engine` in `lib/builds.ts`
- [ ] Add a favicon / OG image in `app/`
- [ ] Decide whether s1mplesolutions.cc gets promoted to a 4th flagship project
