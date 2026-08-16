# SEO & Best-Practices Optimization Report — sharjeel.cc

**Prepared by:** Manus AI
**Date:** August 16, 2026
**Scope:** Full audit of sharjeel.cc (production build on Vercel) covering on-page SEO, technical SEO, structured data, metadata, accessibility, performance, and content strategy.
**How to use this report:** Hand `SEO-OPTIMIZATION-REPORT.md` to Cursor. Every fix below names the exact files to touch. Design, layout, and motion are explicitly **off-limits** — every change listed preserves the current visual and animation work.

---

## Verdict

sharjeel.cc ships with a genuinely strong technical SEO foundation — unique titles and descriptions on all 11 routes, matching canonicals, validated JSON-LD, sitemap/robots hygiene, www→apex redirects, a real 404, and a CI audit (`npm run seo:audit`) that passes. The real defects are: **(1)** 29 color-contrast failures + 1 label/name mismatch blocking accessibility (the only item a recruiter/hiring tool could grade against you), **(2)** incomplete head metadata (missing `twitter:image`, missing mobile icon set), **(3)** thin structured data (`CreativeWork` where `Article` belongs, no `Service` schema), and **(4)** 127KB of unused JavaScript dragging mobile LCP to 3.5s. Traffic data does not exist yet (site deployed 2026-08-13, no GSC/GA4), so the growth plan is in Part 4.

**Lighthouse (live, 2026-08-16):** SEO 100 · Best Practices 100 · Accessibility 96 · Performance 95 desktop / 80 mobile.

| Metric | Mobile | Desktop | Threshold |
|---|---|---|---|
| TTFB | 0.51s | 0.45s | < 0.8s good |
| FCP | 1.94s | 0.68s | < 1.8s good |
| LCP | 3.52s ⚠ | 0.74s | < 2.5s good |
| CLS | 0.0 ✅ | 0.0 ✅ | < 0.1 good |
| TBT | 205ms | 0ms | < 200ms good |
| Page weight | 372 KiB | — | JS 236KB, fonts ~78KB |

---

## Part 1 — What is already right (do not touch)

The audit confirmed the following on all 11 indexable routes, so none of this needs work:

- `lib/seo.ts` gives every route a unique title (≤ 60 chars) and description (120–160 chars); canonicals self-match; robots meta `index, follow`.
- `app/robots.ts` + `app/sitemap.ts`: `/api/` disallowed, sitemap declared, all URLs canonical, no localhost leaks.
- JSON-LD validates on every page: `Person` + `WebSite` graph with `sameAs` → LinkedIn/GitHub, plus per-page nodes (`ProfilePage`, `BreadcrumbList`, `CreativeWork`).
- Open Graph: absolute `og:image` (1200×630, with alt), `og:site_name`, `en_US`.
- www→apex 308 redirect, HSTS, real 404, no orphan routes (enforced by CI), single H1 per page, `lang="en"`.
- Fonts are self-hosted woff2 (~78KB total) — already optimal.

---

## Part 2 — Fixes (in priority order)

### Fix 1 — Accessibility: color contrast (highest impact, design-safe)

**What:** Lighthouse flags **29 contrast failures**, all in `.font-mono` elements against `--bg`. The offenders are `--text-faint` (`#4a4a47` on dark, `#9a9a94` on light) and `--text-dim` (`#8a8a85` on dark) used in the builds grid, stack cards, footer, code-panel comments, and small meta labels. The affected selectors: `section#builds > a.group > span.font-mono`, `section#stack > .stack-card > div.font-mono`, `footer > p.font-mono`, `footer > span`, `.code-line .cm`, hero code-panel spans, `.philosophy h2.font-mono`.

**Fix:** Raise the faint tokens minimally — dark: `--text-faint: #4a4a47` → `#555551` and `--text-dim: #8a8a85` → `#91918c` (light theme mirror). This clears the ~4.5:1 AA line for the mono body sizes while staying visually inside the same palette family. Files: `app/globals.css` (both theme blocks, lines ~8/19 and ~272). **Do not restyle; change only the token values.**

### Fix 2 — Accessibility: label/name mismatch

**What:** Lighthouse flags 1 element — `a.work-visual` (the work-card visual anchor) has visible label text that doesn't match its accessible name.

**Fix:** Add `aria-label={project name + " — view case study"}` to the visual anchor in `components/Work.tsx` (and mirror on `components/ProjectCard.tsx` if the same anchor exists there). While there: audit for any other icon-only controls (theme toggle, social icon links) and add matching `aria-label`s so X/Discord/LinkedIn icon links announce their destination.

### Fix 3 — Twitter cards: add explicit `twitter:image`

**What:** Every page emits `twitter:card`/`title`/`description` but **no `twitter:image`** meta (verified absent on all 11 routes). X usually falls back to `og:image`, but the explicit tag is best practice and guarantees the card image.

**Fix:** In `lib/seo.ts` `buildMetadata()`, add `images: [OG_IMAGE]` to the `twitter` block (it already exists in `openGraph`; the twitter block only sets card/title/description). One-line change.

### Fix 4 — Full favicon/icon set

**What:** Only `favicon.ico` + `icon.svg` exist. No `apple-touch-icon`, no `site.webmanifest`, no theme-color on light mode. iOS home-screen and PWA-ish surfaces get a blank icon.

**Fix:** Generate from existing `app/icon.svg` + brand accent: `apple-touch-icon.png` (180×180), `icon-192.png`, `icon-512.png`, `site.webmanifest` (name "Sharjeel", theme_color `#0A0A0A`, background `#0A0A0A`, display standalone), and a maskable icon. Add `<link rel="apple-touch-icon">` + `<link rel="manifest" href="/site.webmanifest">` to `app/layout.tsx`. Add `themeColor: ["#0A0A0A", "#FAFAF8"]` to the layout's `viewport` export so light-mode shows light status bars. Files: new files in `public/` + `app/layout.tsx`.

### Fix 5 — Structured data upgrades

**What:** Case-study pages use `CreativeWork` (generic) and service pages have no service schema. `Article` + `Service` types earn stronger rich-result/E-E-A-T signals.

**Fix:**
- `lib/jsonld.ts`: add `articleJsonLd({name, path, description})` → `@type: "Article"` with `author: {"@id": ".../#person"}`, `datePublished`, `headline`, `image: headshot`, `publisher: {"@id": ".../#website"}`; add `serviceJsonLd({name, path, description, areaServed: "World"})` → `@type: ["Service", "ProfessionalService"]` with `provider: {"@id": ".../#person"}`, `serviceType` matching the page's keywords (e.g., "Next.js development", "Meta ads management", "n8n automation").
- `app/work/*/page.tsx` (3 files): swap `creativeWorkJsonLd` → `articleJsonLd`, pass `datePublished` (use each project's real ship date — Cadence, NPI, NSEC).
- `app/services/*/page.tsx` (3 files): add `serviceJsonLd` into the existing graph nodes.
- Optional but recommended: add `FAQPage` JSON-LD (3–5 real Q&As) to `/work/npi-youth-program` — it has the strongest quantified proof and is the best rich-result candidate.

### Fix 6 — Performance: kill unused GSAP on non-scroll routes (surgical, motion-safe)

**What:** 127KB of unused JS (GSAP + legacy polyfill chunks) ships to every route. GSAP is only used by `SmoothScrollProvider`; Framer Motion chunks also load site-wide though only some pages animate.

**Fix:** In `components/SmoothScrollProvider.tsx` (or wherever GSAP is imported in `components/`), switch to a `next/dynamic` lazy import with `ssr: false` — GSAP only executes on the client after mount. Do **not** reduce animation counts, timings, or easing. This alone recovers most of the 127KB and should pull mobile LCP under ~3s. Files: the GSAP import site in components + optionally `next.config.ts` to keep defaults.

### Fix 7 — Content: H1s and titles carry keywords (cheap, big win)

**What:** Case-study H1s are bare names ("Cadence", "NSEC Baseball", "NPI Youth Program") with zero keyword signal; services page H1s are brand-voice, not query-voice.

**Fix:** Keep the visual hierarchy and typography, change only the copy:
- `/work/cadence`: H1 → "Cadence — multi-tenant HR portal" (meta title → "Cadence — HR portal built on Next.js & Supabase · Sharjeel")
- `/work/npi-youth-program`: H1 → "NPI Youth Program — Meta ads to membership funnel"; keep the 486-leads stat in the meta.
- `/work/nsec-baseball`: H1 → "NSEC Baseball — one-CTA booking landing page"
- `/services/full-stack-product`: H1 keep, but meta title → "Next.js & Supabase Developer — Product Engineering · Sharjeel"
- `/services/growth-paid-acquisition`: meta title → "GoHighLevel & Meta Ads Developer — Paid Acquisition · Sharjeel"
- `/services/systems-automation`: meta title → "n8n & GoHighLevel Automation Developer · Sharjeel"
Files: `lib/seo.ts` (page titles) + the 6 page.tsx H1 strings.

### Fix 8 — `og:image` extension + cache headers (optional, 10 minutes)

**What:** `og:image` resolves to `https://sharjeel.cc/opengraph-image` (no extension) — works, but some older crawlers want an extension; and HTML is served `max-age=0, must-revalidate` (fine for static, but assets are already fingerprinted so the HTML could safely use longer stale windows).

**Fix:** Leave as-is unless a crawler complaint appears; the current setup is valid. No action required.

---

## Part 3 — What NOT to change

To protect the design investment, the following are verified-correct and should be left alone: all Tailwind class usage and layout structure, all Framer/GSAP animation definitions, the theme system (`ThemeProvider` + CSS variables), the smooth-scroll provider's behavior (only its import method changes per Fix 6), the marquee/hero word-rotation timing, the reveal-mask classes, and the custom cursor. Performance improvements must never come at the cost of these.

---

## Part 4 — Growth plan (traffic: why nothing is measurable yet, and what unlocks it)

The site was deployed 2026-08-13. Similarweb's panel cannot estimate it (below its traffic floor), and GSC/GA4 are unconnected per HANDOVER.md — so **all traffic figures are currently zero by definition, not by failure**. The public SERP confirms indexation is healthy (sharjeel.cc → #1 with the correct snippet).

**The SERP problem to know about:** the bare query "Sharjeel" is polluted — Sharjeel Khan (Pakistani cricketer, Wikipedia + Cricinfo + X) and two other developers named Sharjeel outrank you on the head term. You will never own "Sharjeel" outright; you win `sharjeel + role` queries ("sharjeel developer") and non-branded stack queries. The entity-defense wiring (`sameAs` → LinkedIn/GitHub, consistent job-title metadata) is already correct.

**The content gap:** 11 pages (~11,500 words) covers brand-stage and decision-stage only; the awareness layer is empty. Comparable freelance portfolios that rank on long-tail stack queries run 25–60 indexed pages. Priority content builds:

| Rank | Build | Target queries | Files/routes |
|---|---|---|---|
| 1 | Retune 3 services pages to query-voice (Fix 7 titles) | gohighlevel developer, n8n automation developer, next.js developer hire | `lib/seo.ts` |
| 2 | New page: `/services/gohighlevel-developer` | gohighlevel developer, ghl snapshot builder | `app/services/gohighlevel-developer/page.tsx` + `lib/seo.ts` |
| 3 | New page: `/services/n8n-automation` | n8n automation, workflow automation freelancer | `app/services/n8n-automation/page.tsx` + `lib/seo.ts` |
| 4 | 2–3 launch posts (`/blog/...`) | how to set up CAPI, ghl vs zapier for local business, meta ads landing page | new `app/blog/` route group |
| 5 | Stack-combo page: Next.js + Meta Ads + GoHighLevel | next.js meta ads integration | `app/services/nextjs-meta-ads-ghl/page.tsx` |

**Manual steps only you can do (from HANDOVER.md, still pending):**
1. Add sharjeel.cc to [Google Search Console](https://search.google.com/search-console) and submit the sitemap.
2. Set `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID` in Vercel if you want analytics.
3. After 30 days of GSC data, re-run this audit — real click/impression data will replace every "not available" above.
4. Link-building: put sharjeel.cc in your GitHub bio, LinkedIn featured section, and ask NPI/NSEC/Cadence clients to credit you in their footers — those are your first 3–5 referring domains.

---

## Part 5 — Acceptance checklist for Cursor

After applying Fixes 1–7, verify:

```
npm run lint && npm run typecheck && npm run build
SEO_AUDIT_PORT=3000 npm run seo:audit   # must print "SEO audit passed"
```

Then re-run Lighthouse on preview: target ≥ 95 accessibility (was 96 with contrast failures), mobile performance ≥ 85 (was 80), unused-js audit should shrink by ~100KB. Visually diff the site — no layout, color, or motion change is acceptable.

---

## Data & references

All findings are from direct measurement on 2026-08-16: live crawl of all 11 routes, Lighthouse 12.8.2 (mobile + desktop), sitemap/robots inspection, and a public SERP snapshot. The audit scripts and raw data live alongside this report at `/home/ubuntu/audit/` in the Manus workspace; the four full companion reports (SEO audit, traffic, competitor analysis, content gap) were condensed into this document. Supporting charts: `output/assets/` in that same workspace directory (core web vitals, content mass by page type, click depth, mobile-vs-desktop scores).

[1]: https://sharjeel.cc "Live production site"
[2]: https://sharjeel.cc/sitemap.xml "Live sitemap (11 routes)"
[3]: https://github.com/iamsharjeeel/portfolio "Source repository"
