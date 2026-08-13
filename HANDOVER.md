# Handover

## 2026-08-13 — GHL form/calendar layout

### What changed
- Removed CSS scale on the contact form so GHL can use its horizontal field layout.
- Calendar embed is wider again (`max-w-[1100px]`).
- `/contact` and `/book` headings are centered.

### Files touched
- `components/GhlWidget.tsx`, `components/seo/PageHeader.tsx`, `app/contact/page.tsx`, `app/book/page.tsx`, `app/globals.css`

## 2026-08-13 — Scale GHL widgets down

### What changed
- Form and calendar iframes keep their native size and are CSS-scaled so they look smaller without stretching the widget layout.

### Files touched
- `components/GhlWidget.tsx`, `app/globals.css`, `CHANGELOG.md`, `HANDOVER.md`

## 2026-08-13 — HighLevel form and calendar widgets

### What changed
- Homepage contact, `/contact`, and `/book` now embed HighLevel widgets.
- Contact form: `https://links.s1mplesolutions.cc/widget/form/Uz2HqJA1sQk9EC6LTcHV`
- Calendar: `https://links.s1mplesolutions.cc/widget/booking/6MeULKb9URhRkDsOtCPi`
- Removed custom forms, `/api/contact`, `/api/book`, webhook helper, and Resend email templates.
- Widget chrome matches the studio shell; inner colors must be set in GHL.

### Files touched
- `components/GhlWidget.tsx`, `components/Contact.tsx`
- `app/contact/page.tsx`, `app/book/page.tsx`
- Deleted: `components/ContactForm.tsx`, `components/BookingForm.tsx`, `app/api/contact/route.ts`, `app/api/book/route.ts`, `lib/lead-webhook.ts`, `lib/contact-email.ts`
- `.env.example`, `README.md`, `CHANGELOG.md`, `HANDOVER.md`

### Pending
- **Manual:** in GHL, theme the form and calendar (`#0A0A0A` / `#FF4D2E` / `#FAFAF8`) if you want a full brand match.

## 2026-08-13 — Branded booking page + LeadConnector webhook

### What changed
- `/book` branded scheduler (name, email, phone, project, date, time, timezone, notes).
- Nav **Book** button (primary) plus footer/CTA links.
- Contact form now requires phone.
- `/api/contact` and `/api/book` POST JSON to the LeadConnector webhook from the server. Resend is optional/best-effort.
- Form success no longer depends on `RESEND_API_KEY`.

### Files touched
- `lib/lead-webhook.ts`, `lib/contact-email.ts`, `lib/seo.ts`
- `app/book/page.tsx`, `app/api/book/route.ts`, `app/api/contact/route.ts`
- `components/BookingForm.tsx`, `components/ContactForm.tsx`, `components/HeaderNav.tsx`, `components/Footer.tsx`, `components/seo/CtaBand.tsx`
- `.env.example`, `README.md`, `CHANGELOG.md`, `HANDOVER.md`

### Pending
- **Manual:** in GHL, map webhook JSON keys (`name`, `email`, `phone`, `project`, `message`/`notes`, `date`, `time`, `timezone`, `type`).
- **Manual:** set `LEAD_WEBHOOK_URL` in Vercel only if you want to override the default trigger.
- **Manual:** `RESEND_API_KEY` still needed if you want email copies of submissions.

## 2026-08-13 — Portfolio SEO overhaul for sharjeel.cc

### What changed
- Central SEO config in `lib/seo.ts` (canonical `https://sharjeel.cc`, unique titles/descriptions).
- New indexable routes: `/about`, `/work`, `/work/cadence`, `/work/npi-youth-program`, `/work/nsec-baseball`, `/services/full-stack-product`, `/services/growth-paid-acquisition`, `/services/systems-automation`, `/contact`.
- Sitemap, robots, JSON-LD, OG image, real 404, www → apex redirects.
- Header/footer internal-link graph; homepage work cards and results link to on-site case studies.
- Optional GA4/GTM via env (no-ops when unset). Contact submit + header CTA events when IDs exist.
- `npm run seo:audit` + GitHub Actions CI (lint, typecheck, build, audit).

### Files touched
- `lib/seo.ts`, `lib/jsonld.ts`, `lib/analytics.ts`, `lib/projects.ts`
- `app/layout.tsx`, `app/page.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, `app/icon.svg`, `app/not-found.tsx`, `next.config.ts`, `vercel.json`
- `app/about/page.tsx`, `app/contact/page.tsx`, `app/work/**`, `app/services/**`
- `components/SiteChrome.tsx`, `components/Footer.tsx`, `components/Header.tsx`, `components/HeaderNav.tsx`, `components/Analytics.tsx`, `components/seo/*`
- `components/Contact.tsx`, `components/ContactForm.tsx`, `components/ProjectCard.tsx`, `components/Work.tsx`, `components/Philosophy.tsx`, `components/Results.tsx`, `components/Hero.tsx`, `components/SmoothScrollProvider.tsx`, `components/Marquee.tsx`
- `scripts/seo-audit.mjs`, `.github/workflows/ci.yml`, `package.json`, `.env.example`
- `README.md`, `CHANGELOG.md`, `HANDOVER.md`

### Pending
- **Manual:** Google Search Console for `sharjeel.cc` + submit sitemap.
- **Manual:** attach `sharjeel.cc` + `www` in Vercel; HTTPS; apex canonical.
- **Manual:** `RESEND_API_KEY` (and `CONTACT_FROM_EMAIL` after domain verify).
- **Manual:** real `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID` only if you want analytics.
- Optional: fill ReVox / my-automation-engine blurbs; promote s1mplesolutions to a 4th flagship.
- Do not invent extra case-study proof until you provide real facts/screenshots.
