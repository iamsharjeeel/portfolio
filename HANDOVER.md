# Handover

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
