# Portfolio Audit — sharjeel.cc

**Audited:** 2026-07-26 · **Commit:** `17476ee` · **Branch:** `claude/portfolio-audit-9ka56f`
**Method:** full source read, `next dev` + `next build`/`next start`, Playwright capture at 390 / 768 / 1440 / 1920 (14 scroll positions each), plus light theme, `prefers-reduced-motion`, JS-disabled, keyboard-only, and CDP perf runs against the **production** build.

Screenshots referenced below live in [`audit/screenshots/`](audit/screenshots/). No source files were modified.

---

## 0. TL;DR — the blunt version

This is a **well-built template with no argument in it.** The engineering is genuinely competent — GSAP is used correctly, CLS is a literal 0.0000, the theme system is clean, the contact API has a honeypot and validation. Somebody who knows what they're doing built this.

But it is not a portfolio that wins client work, for three reasons:

1. **You never show the work.** Three "projects," and not one of them displays a single pixel of the actual product. Every visual is a 300px abstract line icon at 55% opacity. Meanwhile there are **six real screenshots sitting in `public/projects/` that no component imports** (`cadence.png`, `npi-case-study.png`, `nsec-baseball.png`, `s1mplesolutions.png`, `simpleops.png`, `smart-lawn-care.png`). You shipped a portfolio with the portfolio removed. See `work-visuals-1440.jpg`.
2. **Your numbers are buried and unqualified.** "486 LEADS" appears at 13px in a low-contrast mono font, six screens down, with no spend, no timeframe, no cost-per-lead, no client name, no "before." A hiring manager scanning for 20 seconds sees zero proof.
3. **There is no path to hiring you.** The hero contains **zero clickable elements**. Not one. The only CTA above the fold is a 10px outlined pill in a `mix-blend-mode: difference` header that collides with body text on half the page.

Against the top tier — Rauno Freiberg, Emil Kowalski, Paco Coursey, Jordan Gilroy, Bruno Simon, Locomotive/Basement-tier studio sites — you're competitive on *build quality* and roughly 40% of the way there on *editorial confidence*. Where you lose badly: those sites either **show the artifact at full bleed** (Emil, Rauno) or **are the artifact** (Bruno). Yours does neither. It has the visual grammar of a studio site — grain overlay, custom cursor, smooth scroll, pinned horizontal gallery, rotating word — without the substance those devices are supposed to frame. Right now the chrome is louder than the content, and that reads as *stylish junior* rather than *senior operator*, which is the opposite of what your positioning ("I write the code and run the ads") deserves.

The good news: the fix is almost entirely content and 6–8 CSS/JSX changes. The hard part — a coherent point of view, real metrics, and a working codebase — is already done.

---

## 1. Repo map

### Stack
| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js **16.2.10**, App Router, Turbopack | `package.json:14` |
| React | 19.2.4 | |
| Styling | Tailwind **v4** via `@tailwindcss/postcss`, CSS-var `@theme inline` | `app/globals.css:37-50` |
| Animation | GSAP 3.15 + ScrollTrigger (13 import sites), Lenis 1.3.25 smooth scroll | |
| **Dead dep** | **`framer-motion` ^12.42.2 — imported by zero files** | `package.json:11` |
| Email | Resend 6.17 | `app/api/contact/route.ts` |
| Fonts | Inter (400–900) + JetBrains Mono (400–600) via `next/font/google` | `app/layout.tsx:6-16` |

### Routes
| Route | Type | Status |
|---|---|---|
| `/` | Static | The entire site — one page |
| `/api/contact` | Dynamic (node) | POST, honeypot + validation, 503 without `RESEND_API_KEY` |
| `/_not-found` | Static | **Next.js stock 404** — see P1-06 |
| `/robots.txt`, `/sitemap.xml` | — | **404 (do not exist)** |

### Section order (`app/page.tsx:19-28`)
`Hero → Philosophy → Results → Marquee → Work → Stack → AlsoShipped → Contact + footer`

Total document height: **9,674px @390 · 8,509 @768 · 8,319 @1440 · 8,128 @1920** (≈11 mobile screens).

### Components
| File | Renders | Client? |
|---|---|---|
| `Header.tsx` | Fixed nav, `mix-blend-mode: difference`, Work/Stack links, "Let's talk" pill, ThemeToggle | no |
| `Hero.tsx` | `h-screen` bottom-aligned; eyebrow, BUILD./DEPLOY./`<rotator>`, sub-paragraph, scroll cue | yes |
| `CodePanel.tsx` | Fake IDE, 3 snippets cycling every 6s, per-line GSAP fade | yes |
| `Philosophy.tsx` | Hardcoded-dark band; grayscale headshot + 44px manifesto | yes |
| `Results.tsx` | 3 metric rows, hover count-up | yes |
| `Marquee.tsx` | Rotated orange strip, 4 tags ×2, CSS marquee | no |
| `Work.tsx` | `h-screen` **pinned horizontal scrub** over 3 `ProjectCard`s + intro panel + progress bar | yes |
| `ProjectCard.tsx` | Visual box (abstract SVG) + tag/title/desc/3 stats/link, magnetic hover button | yes |
| `ProjectVisual.tsx` | 6 abstract animated line icons | no |
| `WorkBackdrop.tsx` | JS-rotated wireframe icosahedron, dynamic-imported, `ssr:false` | yes |
| `Stack.tsx` | 5 static tool cards | no |
| `AlsoShipped.tsx` | 11-card grid (3 with visuals, 8 without) | no |
| `Contact.tsx` | Giant mailto, LinkedIn/GitHub, `ContactForm`, footer | no |
| `ContactForm.tsx` | 4 fields + honeypot → `/api/contact` | yes |
| `CustomCursor.tsx` | Dot + lerped ring, `body { cursor: none }` | yes |
| `SmoothScrollProvider.tsx` | Lenis, `duration: 1.15` | yes |
| `ThemeProvider/Toggle.tsx` | localStorage dark/light | yes |

### Tokens
```
--bg #0a0a0a   --bg-raised #121212   --text #fafaf8
--text-dim #8a8a85   --text-faint #4a4a47
--accent #ff4d2e   --accent-green #3ecf8e   --accent-blue #4d8dff
--line rgba(250,250,248,0.09)
```
Light theme (`globals.css:15-22`) overrides **only** bg / bg-raised / text / text-dim / text-faint / line. **The three accents never change.** That is the root cause of P0-05.

**Spacing:** no scale. Section padding is hand-set per component — `py-24` (Results), `py-28` (Philosophy/Stack/AlsoShipped), `py-20` (Contact), `pb-16` (Hero), `my-16` (Marquee). Gutters are `px-5 sm:px-8 lg:px-14` in 6 places and `px-6` in Contact — inconsistent.
**Breakpoints:** Tailwind defaults (`sm:640 md:768 lg:1024 xl:1280`). Nothing above `xl`, which is why 1920 falls apart (P1-01).
**Container:** the header is capped at `max-w-[1400px]`; **no other section is capped.** At 1920 the nav sits inside a 1400px shell while content runs edge-to-edge — the two grids don't agree.

---

## 2. Design scores

| Dimension | Score | One-line verdict |
|---|---|---|
| First 3 seconds | **4/10** | Handsome. Says nothing actionable, offers nothing to click. |
| Typography | **6/10** | Headline is excellent. Everything below 15px fails contrast. |
| Layout & spacing | **5/10** | No spacing scale, no max-width, huge dead zones, content clipped at 768/1440. |
| Colour & depth | **4/10** | Two greys and an orange. Effectively flat. Light theme is broken. |
| Motion | **4/10** | Serves itself, not the content. Gates the copy behind JS. Ignores reduced-motion. |
| Project presentation | **3/10** | Zero product imagery. Real screenshots exist and are unused. |
| Detail work | **3/10** | Default favicon, default 404, no OG image, invisible focus rings. |
| Performance | **6/10** | CLS 0.0000 and 337KB wire — good. 680KB decoded JS and 3.5s mobile LCP — not. |
| Accessibility | **3/10** | 35 dark-mode / 69 light-mode contrast failures, unusable focus ring, reduced-motion no-op. |

### First 3 seconds — 4/10
`hero-1440.jpg`, `hero-1920.jpg`, `hero-390.jpg`

At 1440 the top **45% of the viewport is empty black**. At 1920 (`hero-1920.jpg`) it's worse — roughly **640px of nothing** between the header and the code panel, because `Hero.tsx:93` is `flex flex-col justify-end` with no vertical centring or max-height. The headline reads BUILD. DEPLOY. SCALE. — three verbs that describe every developer alive. The only line that actually positions you ("I write the code and run the ads") is 15px `text-dim` in the bottom-left corner, competing with a scroll cue. Who you do it *for* is never stated on the page. Neither is a result.

And there is **nothing to click** — I counted: `href` and `<button>` occurrences in `Hero.tsx` and `CodePanel.tsx` = **0**.

### Typography — 6/10
The `clamp(48px,10vw,148px)` black Inter headline at `-0.045em` is genuinely good and the strongest thing on the page. Below it, discipline collapses:
- **Ten distinct font sizes** in the 10–15px band (`10px, 10.5px, 11px, 12px, 12.5px, 13px, 13.5px, 14.5px, 15px, 16px`) with no logical steps.
- The Philosophy paragraph is `clamp(24px,3.4vw,44px)` — **44px body copy** at 1440 (`header-collide-1440.jpg`). It's a manifesto set at display size; at 390 it takes two and a half screens to read one sentence.
- Two `<h2>`-less sections: **Philosophy and the Hero sub-copy have no heading at all**, and Work's "SHIPPED / NOT JUST / SHIPPED-LOOKING" is a `<div>` (`Work.tsx:89`), not a heading. Document outline is `h1 → h2(Real numbers) → h3(project) → h2(Stack) → h2(Also shipped)` with the entire Work section unlabelled.
- Line length in Results client sub-labels is fine; the AlsoShipped card copy at `13.5px` over a 3-col grid is cramped.

### Layout — 5/10
`work-clipped-1440.jpg`, `work-clipped-768.jpg`, `marquee-deadspace-1440.jpg`

- **Content is clipped mid-card at 768 and 1440.** In `work-clipped-768.jpg` the Cadence description wraps to 8 lines in a ~190px column and the stat row reads "Next.js **14**" broken across two lines, "Supabas—" cut by the viewport edge. This is not "horizontal scroll reveals it later" — at the moment the card is centred, its text column is still half off-screen, because `ProjectCard.tsx:40` sizes the card at `w-[min(64vw,760px)]` but `Work.tsx:81` only left-pads the track. There is no centring offset.
- Measured dead zones at 1440: **~180px** below the last Results row before the marquee, **~200px** above and **~230px** below the marquee strip, **~220px top / ~230px bottom** of padding inside the pinned Work viewport (`work-visuals-1440.jpg`), **~250px** between the Stack grid and the AlsoShipped heading.
- **No section max-width.** At 1920 the Stack grid stretches to 1808px while the header stays at 1400px.
- The AlsoShipped grid renders **11 cards in a 3-col grid = one empty cell**, visible as a grey rectangle in light mode (`light-contact.jpg`) and a dead slot in dark (`filler-cards-1440.jpg`).
- Three cards have image boxes, eight don't → the grid has no rhythm; row heights jump from ~380px to ~164px.

### Colour and depth — 4/10
The dark theme has exactly **two surfaces**: `#0a0a0a` and `#121212`. That's a 1.1:1 luminance step — invisible in practice. Every card, panel, and section reads as the same plane. There are no elevation shadows (except one glow on the code panel), no border-weight hierarchy (every border is the same `rgba(250,250,248,0.09)`), and no tonal warm/cool split. The result is "flat black rectangle" rather than "layered dark UI." Compare against Linear or Vercel's own dark surfaces, which run 4–5 distinct elevations.

The accent is used once at scale (the marquee) and otherwise reduced to 55%-opacity line icons and 11px labels. It never lands on a button, because there are no buttons.

### Motion — 4/10
`hero-rotator-collide-1440.jpg`

- **The signature interaction is invisible.** The rotating word (`Hero.tsx:45-61`) is driven by a ScrollTrigger with `end: "+=120%"` on an unpinned `h-screen` hero. That means words 2, 3, and 4 only fire **while the hero is scrolling out of frame**. `hero-rotator-collide-1440.jpg` is the actual rendered state at word 3: "ADS." is clipped by the top of the viewport and **overlapping the "SHARJEEL" logo**. You built a four-state animation that a user will never see in a legible state.
- **Motion gates content.** `Hero.tsx:99` (eyebrow), `Hero.tsx:129` (sub-copy), `Philosophy.tsx:56` (photo), `Philosophy.tsx:72`'s parent, and `Results.tsx:145` (every row) all ship as `opacity-0` in the HTML and rely on GSAP to reveal them. See `nojs-hero.jpg`: with JS off, the hero is *just* "BUILD. DEPLOY. SCALE." — your name, your positioning line, and the code panel body are all gone. Same for the entire Results table and Philosophy copy further down.
- **Lenis makes every scroll feel laggy for the wrong reason** — `duration: 1.15` (`SmoothScrollProvider.tsx:17`) is long, and combined with the Work pin the user is scroll-locked for a full extra viewport-width of wheel travel before the page moves again.
- **The `CustomCursor` ring is stuck at (0,0) on load** — visible as a red arc in the top-left corner of *every* screenshot I took, until the mouse first moves.
- Measured **~39fps** during a scripted 3s scroll on desktop (unthrottled, production build).

### Project presentation — 3/10
`work-visuals-1440.jpg`, `work-390.jpg`

Three projects. Zero screenshots. Each `ProjectCard` renders a `ProjectVisual` — a 300px stroked SVG at `opacity: 0.55` (`ProjectVisual.tsx:18`) inside a 360×450 box. A clock icon stands in for a full HR SaaS. A bar chart stands in for a 486-lead campaign. A diamond stands in for a landing page.

**`public/projects/` contains `cadence.png`, `npi-case-study.png`, `nsec-baseball.png`, `s1mplesolutions.png`, `simpleops.png`, `smart-lawn-care.png` and `grep` finds zero references to any of them.** Git history says commit `7b7bb7c` deliberately replaced real screenshots with SVGs. That was the wrong call and it is the single biggest thing wrong with this site.

Skimmability: each card is one 4-line paragraph and three stats. There is no Problem / Role / Approach / Result structure anywhere. Nothing links to a longer case study except NPI.

### Detail work — 3/10
| Item | State | Evidence |
|---|---|---|
| Favicon | **Next.js default triangle** (`app/favicon.ico`, 25,931 bytes — byte-identical to create-next-app) | `favicon-default.jpg` |
| 404 | **Next.js stock page** — white, no nav, no brand, no way home | `404-default.jpg` |
| OG image | **None.** No `openGraph`, no `twitter`, no `metadataBase`, no `opengraph-image` | `app/layout.tsx:18-22` |
| robots / sitemap | **Both 404** | verified via curl |
| Focus rings | **None defined anywhere.** Browser default resolves to `outline: auto 1px rgb(16,16,16)` — black on `#0a0a0a` | measured on 18 tab stops |
| Hover states | Good — result rows, stack cards, magnetic button, card washes are all well done | |
| Empty states | Two "Explore on GitHub." filler cards + one empty grid cell | `filler-cards-1440.jpg` |
| Form success | "Sent — I'll get back to you." with no timeframe and no next step | `ContactForm.tsx:125` |
| Header collision | `mix-blend-difference` + no backdrop = nav sits *on top of* body text | `header-collide-390.jpg`, `header-collide-1440.jpg` |

### Performance — 6/10
Measured against `next build` + `next start`, Chromium, production:

| | Desktop 1440 | Mobile 390 (4× CPU, 1.6Mbps) |
|---|---|---|
| TTFB | 11ms | 13ms |
| FCP | 248ms | 832ms |
| **LCP** | 248ms | **3,464ms** ❌ |
| CLS | **0.0000** ✅ | **0.0000** ✅ |
| Wire transfer | 337 KB | 328 KB |
| **JS decoded** | **680 KB** | 680 KB |
| Requests | 14 | 14 |
| Scroll FPS | ~39 | ~50 |

- **680 KB of decoded JS (≈215 KB gzipped) for one static marketing page.** GSAP + ScrollTrigger + Lenis, plus `framer-motion` sitting in `package.json:11` **used by nothing**.
- **Mobile LCP of 3.46s** vs FCP of 832ms. That 2.6-second gap *is the GSAP intro*: the LCP element is the hero paragraph, which is `opacity-0` until the timeline in `Hero.tsx:65-82` runs after hydration. You are failing Core Web Vitals on purpose, for a fade.
- Fonts are fine — 2 files, 78 KB, both preloaded, `next/font` self-hosted. Good.
- `public/sharjeel-headshot.png` is **1.87 MB** source. `next/image` serves a 15 KB WebP, so users are fine, but the repo carries the weight and there's no `priority`/`placeholder` on it (`Philosophy.tsx:63`).
- Favicon is a **25 KB `.ico`** — larger than 3 of the JS chunks.

### Accessibility — 3/10
- **35 distinct contrast failures in dark mode**, all from `--text-faint: #4a4a47` at **2.11–2.23:1** (AA needs 4.5:1). This affects: every stat label, every mono eyebrow, all four form labels, both footer lines, "Verified client outcomes", "Scroll", "// Philosophy", "// Selected work", the project numbers, and both card link labels. It is a single-token bug with site-wide blast radius.
- **69 failures in light mode.** Worst: `--accent-green #3ecf8e` at **1.91:1** on `#fafaf8` — which means **every single number on the "Real numbers" section is illegible in light mode**, along with `$13K MRR` and `$30K/MO REVENUE`. The accents are never redefined for light (`globals.css:15-22`).
- **Focus ring is invisible.** `grep` finds no `focus-visible` rule in the codebase; the only focus styling is `focus:border-accent` on the four form inputs. Every one of the 29 link/button tab stops shows the UA default, computed as `rgb(16,16,16)` — black on black.
- **`prefers-reduced-motion` is a no-op for the animation that matters.** `globals.css:508-516` kills CSS `animation`/`transition` durations, but **GSAP is JavaScript** and ignores it entirely. Verified: with `reducedMotion: 'reduce'`, `scrollHeight` is **8319 — identical** to normal, `.pin-spacer` is still in the DOM, and `<html>` still carries the `lenis` class. The scroll hijack, the horizontal pin, the count-ups, and every reveal still run. Only `Results.tsx:53` and `WorkBackdrop.tsx:45` check the media query.
- **No skip link.** Keyboard users tab through 21 external project links before reaching the contact form (verified tab order below).
- **Alt text:** the headshot is `alt="Sharjeel"` (`Philosophy.tsx:60`) — a name, not a description. All decorative SVGs are correctly `aria-hidden`. Good.
- Mobile tap targets under 44px: `Work` (42×44) and `Let's talk` (91×**40**).
- `body { cursor: none }` (`globals.css:62`) — if JS fails, desktop users have **no cursor at all**.

Credit where due: `aria-hidden` on decorative SVG, `aria-label` on ThemeToggle and the card visual links, `rel="noopener noreferrer"` on every external link, real `<label>` wrapping on every form field, and a **0.0000 CLS**. Those are not accidents.

---

## 3. Content audit — the money part

### 3.1 What a hiring manager or agency owner still does not know

After reading every word on this page, twelve things remain unanswered — and each one is a reason not to email you:

1. **Who is this for?** "Clients" is the only audience word on the page. Local service businesses? SaaS founders? Agencies who need a white-label build? You have gyms, a lawn-care company, and a youth sports program in your work — that's a *very* clear ICP you refuse to name.
2. **Are you available, and for what?** "Available for select projects" and "Open for select projects" appear twice. Contract? Retainer? Full-time? Fractional?
3. **What does it cost?** No range, no minimum, no "projects typically start at."
4. **How long does it take?** No timeline anywhere.
5. **What is 486 leads worth?** No ad spend, no CPL, no timeframe, no ROAS, no "before." 486 leads over 3 years at $200 each is a bad campaign; over 3 months at $9 each is a great one. You've given the reader no way to tell.
6. **Who is NPI?** The best result on the site belongs to an unnamed acronym.
7. **What was your role?** "Built solo end to end" appears once, for Cadence. For NPI and NSEC, unclear.
8. **Where are you / what timezone?** Deliberately stripped (per `HANDOVER.md`). For remote client work this is a *question*, not a liability — silence reads as evasion.
9. **What's the process?** No discovery → build → launch → optimise. Agency owners buy process.
10. **Has anyone said you're good?** Zero testimonials. Zero client logos. Zero references.
11. **Can you work inside an existing team/codebase,** or is this greenfield-only?
12. **How many years?** No experience signal at all.

### 3.2 CTA path — counted

| | |
|---|---|
| Clicks from landing to a contact surface | **1** (header "Let's talk" → jumps to `#contact` at y=7366) |
| Clickable elements in the hero | **0** |
| CTA visible at every mobile screen height | **Yes** — but it's the same 91×40px, 10px-type, `mix-blend-difference` pill |
| Distinct CTAs on the page | **2** (header pill, `mailto:`) + the form |
| Booking / calendar link | **None** |
| Tab stops before reaching the contact form | **24** |

The mechanical count is fine. The *quality* is not: your entire conversion surface is one 10px outlined pill that inverts against whatever is behind it, plus a `mailto:` seven screens down. The email is set at `clamp(22px,6.4vw,96px)` — a 96px mailto link is a design flourish, not a conversion mechanism. A prospect who wants to hire you has to either open a mail client or scroll to the bottom of an 11-screen page.

There is also no **calendar link**, which for "growth engineer selling to SMB owners" is the single highest-leverage missing element. Your own case studies are about booking tours. Book your own tours.

### 3.3 Line-by-line copy teardown

| # | File:line | Current | Verdict | Rewrite |
|---|---|---|---|---|
| 1 | `Hero.tsx:101-102` | "Available for select projects" | Vague scarcity theatre. "Select" is what people say when they have no clients. | **"2 build slots open · August 2026"** |
| 2 | `Hero.tsx:110-124` | "BUILD. DEPLOY. SCALE." | Three verbs true of every developer since 2009. Zero differentiation. | See §3.4 |
| 3 | `lib/content.ts:62-67` | rotator: SCALE / CODE / ADS / SYSTEMS | Nobody sees words 2–4 (P0-02). Even if they did, single nouns don't sell. | Kill the rotator; put a real subhead there |
| 4 | `Hero.tsx:132-135` | "I'm Sharjeel — a full-stack developer and growth engineer. I write the code and run the ads, so the product and the pipeline are never two different problems." | **This is your best line on the entire site** and it's 15px, dimmed, bottom-left. | Promote to hero subhead at 18–20px `--text` |
| 5 | `Hero.tsx:138` | "Scroll" | Filler. You have 9,674px of page; they'll figure it out. | Replace with the primary CTA |
| 6 | `Philosophy.tsx:52` | "// Philosophy" | A comment-syntax label on a manifesto is 2019 dev-blog. | **"// Why one person, not three"** |
| 7 | `Philosophy.tsx:75-91` | "Most agencies split design, dev, and ads into three handoffs — and the client pays for the gaps between them…" | Argument is genuinely good. Execution is 44px and self-indulgent. | Cut ~40%, drop to 24–28px, add a proof line |
| 8 | `Results.tsx:135` | "Real numbers" | Weak. Every portfolio claims real numbers. | **"What the work returned"** |
| 9 | `Results.tsx:138` | "Verified client outcomes" | "Verified" by whom? Unbacked trust word. | **"Live campaigns · figures from client dashboards"** |
| 10 | `Results.tsx:17` | "Youth performance program — Meta ads + landing page" | Deliverables, not outcome. Missing spend/timeframe/CPL. | **"NPI Youth Program · $14K Meta spend, 90 days"** |
| 11 | `Results.tsx:30-31` | Cadence: "7 BUILD PHASES" / "SHIPPED TO PROD" | **Not a result.** Build phases are effort, not value. This row actively dilutes the two rows above it. | **"18 mo of paper timesheets → 0"** / **"~6 hrs/mo of admin removed"** |
| 12 | `Marquee.tsx:1` | NEXT.JS · META ADS · GOHIGHLEVEL · SUPABASE | Four tool names in 56px caps. Tools aren't positioning — and Stack already lists them. | Replace with outcomes: **486 LEADS · 42 MEMBERS CLOSED · $30K/MO · 44% BOOK RATE** |
| 13 | `Work.tsx:87` | "// Selected work — 03" | Fine, but "03" undersells — you have 11 more below. | **"// Three builds, start to finish"** |
| 14 | `Work.tsx:90-94` | "SHIPPED / NOT JUST / SHIPPED-LOOKING" | Best headline on the site after the hero. Keep. | Keep. Make it an `<h2>`. |
| 15 | `lib/projects.ts:25` | Cadence: "…dark UI with a warm gold accent." | Ends a case study on **paint colour**. | Rewrite — §3.5 |
| 16 | `lib/projects.ts:26-30` | "7 Build phases · Next.js 14 App router · Supabase Backend" | All three stats are inputs. Zero outcome. | Rewrite — §3.5 |
| 17 | `lib/projects.ts:39` | NPI: "…GSAP and a Three.js particle field." | You end the best case study on the site by bragging about a **particle effect**. | Rewrite — §3.5 |
| 18 | `lib/projects.ts:56-58` | NSEC: "1 CTA, on purpose · Vercel Deployed · Tailwind Styled" | "Deployed on Vercel" is not an achievement. "Tailwind" is not a result. | Rewrite — §3.5 |
| 19 | `Stack.tsx:32` | "What's actually under the hood" | Fine, low value. | **"Tools I'm fluent in, not just familiar with"** |
| 20 | `AlsoShipped.tsx:12` | "Products, client work, and builds" | Three synonyms. | **"Side products, client sites, and experiments"** |
| 21 | `lib/builds.ts:85,93` | ReVox / my-automation-engine: **"Explore on GitHub."** | Filler on a portfolio. Two cards that say *"I ran out of things to write."* | **Delete both cards** or write one real sentence each |
| 22 | `lib/builds.ts:41` | SimpleOps has **no metric** while its two siblings do | Inconsistent — reads as "this one didn't work" | Add a number or move it down |
| 23 | `Contact.tsx:11` | "// Got a build, a campaign, or both" | Actually good. Keep. | Keep |
| 24 | `Contact.tsx:41` | "Open for select projects" | Duplicate of the hero eyebrow, 11px, `#4a4a47`. | Make it specific and legible |
| 25 | `ContactForm.tsx:89` | placeholder "Build, campaign, or both" | Free-text where a `<select>` would qualify the lead **and** let you state budget bands. | Convert to select with budget tier |
| 26 | `ContactForm.tsx:102` | placeholder "What are you trying to ship?" | Good. Keep. | Keep |
| 27 | `ContactForm.tsx:125` | "Sent — I'll get back to you." | No timeframe, no next step. Dead end at the moment of highest intent. | **"Got it. I reply within one business day — usually same day. Want to skip ahead? [Book a 20-min call →]"** |
| 28 | `layout.tsx:19` | title "Sharjeel — Build. Deploy. Scale." | Zero keywords, zero positioning, zero result. | **"Sharjeel — Full-stack developer & growth engineer for service businesses"** |

### 3.4 Rewritten hero

**Recommended:**

> `2 build slots open · August 2026`
>
> # I BUILD THE SITE
> # AND RUN THE ADS
> # THAT FILL IT.
>
> Full-stack developer and growth engineer for local service businesses and SMB SaaS. One person shipping the Next.js build, the Meta campaign, and the CRM automation — so the product and the pipeline are never two different problems.
>
> **Last campaign: 486 leads → 214 booked tours → 42 members closed.**
>
> `[ Book a 20-min call → ]`   `[ See the work ↓ ]`

Why this works and the current one doesn't: it states the **what** (site + ads), the **who** (local service businesses, SMB SaaS), and the **result** (486 → 214 → 42) inside the first viewport, and it gives the reader two things to click. The current hero states a category and offers nothing.

**Alternates:**

- *Outcome-first:* **"486 LEADS. 42 MEMBERS. ONE PERSON."** / sub: "I build the funnel and run the traffic through it. Full-stack dev + Meta ads for service businesses that need both and want one invoice."
- *Pain-first:* **"YOUR DEV BLAMES THE ADS. / YOUR MEDIA BUYER BLAMES THE SITE. / I DO BOTH."** — sharpest, riskiest, most memorable. This is the one a top-tier studio would ship.
- *Keep the current structure, fix the payload:* **"BUILD. DEPLOY. / SCALE."** kept as-is, but with the eyebrow changed to `486 leads · 214 tours · 42 members closed — one client, 90 days` and a real CTA pair beneath the sub-copy.

### 3.5 Rewritten project intros

**Cadence — `lib/projects.ts:21-34`**
> **Tag:** `Product · SaaS · Solo build`
> **Intro:** "A services business was running payroll off shared spreadsheets and losing hours to reconciliation every month. I built Cadence solo in 7 phases: multi-tenant auth with role hierarchy, clock-in/out, generated-column hour totals in Postgres, PDF payslips, and leave approval flows. Next.js App Router on Supabase, shipped to production."
> **Stats:** `Spreadsheets → 0` (payroll source of truth) · `~6 hrs/mo` (admin removed) · `Solo` (design, DB, app, deploy)
> **Add:** a real screenshot — **`public/projects/cadence.png` already exists.**

**NPI Youth Program — `lib/projects.ts:35-48`**
> **Tag:** `Growth · Full funnel · Case study`
> **Intro:** "A youth performance program was buying leads it couldn't convert. I rebuilt the whole funnel: Meta campaign, landing page, GoHighLevel pipeline, and server-side CAPI so the pixel stopped losing conversions to iOS. 486 leads in, 214 booked tours, 42 paying members out — a 44% lead-to-tour rate."
> **Stats:** `486` leads · `44%` lead → booked tour · `42` members closed
> **Must add:** ad spend, cost per lead, and the timeframe. Without them these numbers are unfalsifiable and a sophisticated buyer will discount them to zero.
> **Screenshot:** `public/projects/npi-case-study.png` — unused.

**NSEC Baseball — `lib/projects.ts:49-62`**
> **Tag:** `Landing page · Paid traffic`
> **Intro:** "Paid traffic needs one job per page. This one books free evaluations — nothing else. HitTrax data as the differentiator above the fold, Meta Pixel plus server-side CAPI firing straight into the GHL webhook, so every booking is attributed and the campaign can actually optimise."
> **Stats:** replace the current three with real ones — page conversion rate, cost per booking, or bookings/month. If you don't have them, say **"Metrics with client"** rather than shipping "Tailwind · Styled."
> **Screenshot:** `public/projects/nsec-baseball.png` — unused.

### 3.6 Rewritten about / Philosophy

> `// Why one person instead of three`
>
> Most agencies split design, dev, and ads across three teams — **and the client pays for the gaps between them.** The site launches without the tracking. The campaign optimises toward the wrong event. Nobody owns the number.
>
> **I close that gap.** Same person writing the Next.js component, wiring the GHL automation, and diagnosing why the Meta campaign went flat. **One brain, fewer handoffs, faster fixes.**
>
> `Ten years of my own P&L depending on this working. Currently building at Voxility.ai.`

Set at 24–28px, not 44px. The last line is the trust signal the section is missing — **replace the bracketed text with something true about your background.**

### 3.7 Rewritten CTA section

> `// Got a build, a campaign, or both`
>
> # Tell me what's not converting.
>
> I reply within one business day. If it's a fit, you get a scoped plan and a number before you commit to anything.
>
> `[ Book a 20-min call → ]`   `hello@sharjeel.cc`
>
> **Typical engagements:** landing page + tracking from $X · full funnel build from $Y · ongoing campaign management from $Z/mo
> **Currently:** 2 build slots open for August · working with clients in US, UK, and AU timezones

The pricing line is optional but it is the single strongest qualifier you can add — it kills tyre-kickers and signals you've done this before. The timezone line answers the question your `HANDOVER.md` says you deliberately removed; stating it as *coverage* rather than *location* turns a liability into a feature.

### 3.8 Missing trust signals — ranked by impact

| Missing | Impact | Effort |
|---|---|---|
| **Client testimonials (2–3, named, with role)** | 🔴 Highest | Medium — you have to ask |
| **Ad spend / CPL / timeframe on every metric** | 🔴 Highest | Low — you already have the data |
| **Client logos or named clients** (NPI, XOVERA, Alert Lawn Care, NSEC) | 🔴 High | Low — get permission |
| **Booking link (Cal.com / Calendly)** | 🔴 High | 30 min |
| **A process section** (Discovery → Build → Launch → Optimise, with durations) | 🟠 High | Low |
| **Pricing bands or "projects start at"** | 🟠 High | Low |
| **Availability with a real date** | 🟠 Medium | Trivial |
| **Product screenshots** | 🔴 Highest | **Already on disk** |
| **A downloadable CV / résumé link** | 🟡 Medium (hiring managers specifically) | Low |
| **Years of experience** | 🟡 Medium | Trivial |
| **"What I don't do"** | 🟡 Medium — enormous credibility signal | Trivial |

---

## 4. Issues

### P0 — kills conversions

---
**P0-01 · Zero product imagery, and six real screenshots are sitting unused on disk**
📷 `work-visuals-1440.jpg`, `work-390.jpg`, `alsoshipped-1440.jpg`
**What's wrong:** Every project visual is an abstract SVG line icon at 55% opacity in a 360×450 box. No one can see any product you've built. `public/projects/{cadence,npi-case-study,nsec-baseball,s1mplesolutions,simpleops,smart-lawn-care}.png` exist and are referenced by **zero** files.
**Why it matters:** A portfolio's job is to show the work. A prospect cannot evaluate a clock icon. This is the difference between "might be good" and "obviously good."
**Fix:** Replace `<ProjectVisual>` with `next/image` of the real screenshot, `fill` + `object-cover object-top`, keeping the current wash as a hover overlay rather than the content. Keep the abstract icons only as a fallback for projects with no capture.
**Where:** `components/ProjectCard.tsx:54`, `components/AlsoShipped.tsx:27`, `lib/projects.ts` (add `image` field), `lib/builds.ts` (add `image` field)

---
**P0-02 · The hero has zero clickable elements, and the rotating word — the site's signature interaction — is never visible in a legible state**
📷 `hero-1440.jpg`, `hero-1920.jpg`, `hero-390.jpg`, `hero-rotator-collide-1440.jpg`
**What's wrong:** Two bugs, one section. (a) `grep` for `href|<button>` in `Hero.tsx` + `CodePanel.tsx` returns **0** — the first screen offers nothing to act on. (b) The word rotator is bound to a ScrollTrigger with `end: "+=120%"` on an *unpinned* hero, so words 2–4 only fire as the headline exits the viewport. At word 3 the text is clipped by the viewport top **and overlapping the SHARJEEL logo**.
**Why it matters:** The most-viewed screen on the site has no conversion affordance, and the one interaction meant to make it memorable renders as a collision.
**Fix:** Add a primary + secondary CTA pair below the sub-copy (replacing the "Scroll" cue). Either pin the hero for the duration of the rotation, or drive the rotator on a timer instead of scroll, or delete it and use the space for the positioning line.
**Where:** `components/Hero.tsx:45-61` (trigger), `components/Hero.tsx:127-140` (CTA slot), `lib/content.ts:62-67`

---
**P0-03 · The fixed header renders on top of body text at every breakpoint**
📷 `header-collide-390.jpg`, `header-collide-1440.jpg`, `hero-rotator-collide-1440.jpg`, `light-contact.jpg`
**What's wrong:** `Header.tsx:5` uses `nav-blend` → `mix-blend-mode: difference` (`globals.css:117-119`) with no backdrop, no scroll-state background, and hardcoded `text-white`. Over the 44px Philosophy copy, over the marquee, and over the AlsoShipped grid, the nav and the content occupy the same pixels. On mobile this is catastrophic — `header-collide-390.jpg` shows "SHARJEEL / WORK / STACK / LET'S TALK" printed straight through the philosophy paragraph.
**Why it matters:** It looks broken. Not stylised — broken. And it makes your only persistent CTA unreadable on roughly half the page.
**Fix:** Add a scroll-triggered `backdrop-blur-md bg-bg/80 border-b border-line` state once `scrollY > 40`, and drop `mix-blend-mode: difference` in favour of theme-aware `text-text`.
**Where:** `components/Header.tsx:5,8,12,28,42-47`, `app/globals.css:117-119`, `components/ThemeToggle.tsx:13`

---
**P0-04 · Core copy is invisible without JavaScript and is what makes mobile LCP 3.5s**
📷 `nojs-hero.jpg`
**What's wrong:** `Hero.tsx:99` (eyebrow), `Hero.tsx:129` (the positioning paragraph), `Philosophy.tsx:56`, and `Results.tsx:145` (every metric row) ship as `opacity-0` and depend on GSAP for reveal. With JS disabled the hero is *only* "BUILD. DEPLOY. SCALE." Measured mobile LCP = **3,464ms** against FCP of 832ms — the entire 2.6s delta is the intro timeline.
**Why it matters:** Your name, your positioning, and every metric on the site are gated behind a fade. It fails Core Web Vitals, it fails no-JS crawlers, and it means a slow phone shows a blank hero for three seconds.
**Fix:** Animate with a CSS class that is applied **only after** a `js-ready` flag on `<html>`, or use `@starting-style` / a CSS-only reveal so the content is visible by default and enhanced when JS lands. Never ship conversion copy at `opacity-0`.
**Where:** `components/Hero.tsx:99,129`, `components/Philosophy.tsx:56`, `components/Results.tsx:145`

---
**P0-05 · Light mode makes every metric on the site illegible**
📷 `light-marquee-broken.jpg`, `light-contact.jpg`
**What's wrong:** `globals.css:15-22` redefines bg/text/line for light mode but **never redefines `--accent`, `--accent-green`, or `--accent-blue`.** Measured in light mode: `#3ecf8e` on `#fafaf8` = **1.91:1**. That is every figure in Real numbers (486, 214, 42, 44%), plus `$13K MRR` and `$30K/MO REVENUE` — the highest-value content on the page. Separately, the marquee uses `text-bg` on `bg-accent` (`Marquee.tsx:24`), which flips to near-white on orange ≈ 2.2:1, and `Marquee.tsx:11` hardcodes `stroke="black"` so the dots stay black while the text goes white. **69 contrast failures total in light mode.**
**Why it matters:** Half your visitors may land in light mode. They will see a portfolio whose proof section is blank.
**Fix:** Add light-mode accent variants (`--accent-green: #0e8f57`, `--accent: #d93b1f`, `--accent-blue: #2563eb`) in the `[data-theme="light"]` block, and make the marquee foreground `currentColor` driven by a token rather than `text-bg`/hardcoded black.
**Where:** `app/globals.css:15-22`, `components/Marquee.tsx:11,24`

---
**P0-06 · No outcome data on two of three case studies; no problem statement or role on any**
📷 `work-clipped-1440.jpg`, `results-1440.jpg`
**What's wrong:** Cadence's three stats are "7 Build phases / Next.js 14 / Supabase" — inputs, not results. NSEC's are "1 CTA / Vercel / Tailwind." The Results row for Cadence reads "7 BUILD PHASES / SHIPPED TO PROD." Not one case study states the **problem**, the **role**, or the **before**. Even NPI's real numbers (486/214/42) have no spend, no CPL, and no timeframe.
**Why it matters:** Unqualified numbers get discounted to zero by anyone who buys media. "7 build phases" actively signals you had nothing better to report.
**Fix:** Restructure each project to `Problem → Role → What I built → Result`. Add spend/CPL/window to NPI. Replace Cadence and NSEC's vanity stats per §3.5. Where you genuinely lack a metric, write "Metrics with client" — that's more credible than "Tailwind · Styled."
**Where:** `lib/projects.ts:20-63`, `components/Results.tsx:14-33`, `components/ProjectCard.tsx:73-84`

---
**P0-07 · No trust signals of any kind**
**What's wrong:** Zero testimonials, zero named clients, zero logos, no process, no pricing hint, no booking link, no CV, no years-of-experience. The only social proof is your own claim.
**Why it matters:** For client work this is the highest-leverage gap on the page. Two named testimonials will out-convert every animation on this site combined.
**Fix:** Ship, in order: (1) a Cal.com link in the hero and contact section, (2) 2–3 named testimonials in a band between Results and Marquee, (3) client logos, (4) a 4-step process section with durations, (5) a "projects start at $X" line.
**Where:** new component + `app/page.tsx:19-28`, `components/Contact.tsx`

---

### P1 — looks amateur

---
**P1-01 · Massive dead zones; no max-width; hero is bottom-aligned so it collapses on tall screens**
📷 `hero-1920.jpg`, `marquee-deadspace-1440.jpg`, `work-visuals-1440.jpg`, `stack-1440.jpg`
**What's wrong:** `Hero.tsx:93` is `h-screen flex flex-col justify-end pb-16` — at 1920×1080 that leaves ~640px of empty black above the code panel. Measured dead space elsewhere at 1440: ~180px below Results, ~200/230px around the marquee, ~220/230px inside the pinned Work viewport, ~250px between Stack and Also Shipped. And **no section has a max-width** while the header is capped at `max-w-[1400px]`, so the nav grid and the content grid disagree above 1400px.
**Why it matters:** Empty space that isn't doing work reads as "unfinished," not "confident."
**Fix:** Give the hero a `min-h-[680px] max-h-[900px]` and centre rather than bottom-align above `lg`. Wrap all sections in a shared `max-w-[1400px] mx-auto`. Halve the marquee margins. Reduce Work's internal padding.
**Where:** `components/Hero.tsx:93`, `components/Marquee.tsx:22`, `components/Work.tsx:81`, `components/Header.tsx:6`, all seven `px-5 sm:px-8 lg:px-14` call sites

---
**P1-02 · Project card text is clipped mid-word at 768 and 1440**
📷 `work-clipped-768.jpg`, `work-clipped-1440.jpg`
**What's wrong:** `ProjectCard.tsx:40` sets `w-[min(64vw,760px)]` in a 2-col grid, and `Work.tsx:81` only left-pads the track — nothing centres the active card. At 768 the Cadence description wraps to 8 lines in a ~190px column, the stat row breaks "Next.js" / "14" onto two lines, and "Supabase" is cut off by the viewport edge. At 1440 the same card's description and third stat are still off-screen when it first enters.
**Why it matters:** A reader who stops scrolling for two seconds sees a broken card. Nobody trusts a broken card.
**Fix:** Stack the card to a single column below `lg` instead of `md`, give the stat row `flex-wrap` with a min-width, and offset the track so each card settles centred in the viewport.
**Where:** `components/ProjectCard.tsx:40,73-84`, `components/Work.tsx:33,81`

---
**P1-03 · Every mono label on the site fails WCAG AA (35 failures, 2.11–2.23:1)**
📷 `results-1440.jpg`, `contact-1440.jpg`, `stack-1440.jpg`
**What's wrong:** `--text-faint: #4a4a47` (`globals.css:8`) against `#0a0a0a` measures **2.11–2.23:1**; AA requires 4.5:1 at these sizes. It is applied to: all four form labels, all 9 project stat labels, every section eyebrow, both footer lines, "Verified client outcomes", "Scroll", the "01/03" numbers, and both card link labels.
**Why it matters:** It's not just compliance — it's that your form labels and your stat captions are the text carrying meaning, and users are squinting at them.
**Fix:** Raise `--text-faint` to **`#8a8a85`** (4.5:1+) and introduce a genuinely decorative `--text-ghost: #4a4a47` used only for non-informational marks.
**Where:** `app/globals.css:8,20`

---
**P1-04 · Focus rings are invisible — the site is unusable by keyboard**
**What's wrong:** No `:focus-visible` rule exists anywhere in the codebase. The UA default resolves to `outline: auto 1px rgb(16,16,16)` — black on `#0a0a0a`. Verified across all 18 sampled tab stops. There is also no skip link: keyboard users pass **24 stops** before the contact form.
**Fix:** Add a global `:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 2px; }` and a skip-to-content link as the first focusable element.
**Where:** `app/globals.css` (new rule), `app/page.tsx:18`

---
**P1-05 · `prefers-reduced-motion` is a no-op for everything that matters**
**What's wrong:** `globals.css:508-516` only zeroes CSS `animation-duration`/`transition-duration`. GSAP and Lenis are JavaScript and ignore it entirely. Verified with `reducedMotion: 'reduce'`: `scrollHeight` is **8319 — byte-identical to normal**, `.pin-spacer` is still in the DOM, `<html>` still carries the `lenis` class. The full scroll hijack, horizontal pin, hero timeline, and code-panel typing all still run. Only `Results.tsx:53` and `WorkBackdrop.tsx:45` check the query.
**Why it matters:** Scroll hijacking plus a horizontal pin is exactly the pattern that triggers vestibular symptoms. Declaring a reduced-motion block that doesn't work is worse than not having one.
**Fix:** Gate Lenis instantiation, the Work pin, and every `gsap.fromTo` behind a single `prefersReducedMotion` check; fall back to a vertical stacked Work grid and instant `gsap.set`.
**Where:** `components/SmoothScrollProvider.tsx:16`, `components/Work.tsx:35`, `components/Hero.tsx:65`, `components/Philosophy.tsx:17`, `components/Results.tsx:115`, `components/CodePanel.tsx:26`

---
**P1-06 · Default Next.js favicon, default Next.js 404, no OG image, no robots, no sitemap**
📷 `favicon-default.jpg`, `404-default.jpg`
**What's wrong:** `app/favicon.ico` is byte-identical to create-next-app's (25,931 bytes — the Vercel triangle). `/does-not-exist` renders Next's stock white 404 with no nav and no way home. `layout.tsx:18-22` has no `openGraph`, no `twitter`, no `metadataBase`, no `opengraph-image` — **every link you share to this site previews as a blank rectangle.** `/robots.txt` and `/sitemap.xml` both 404.
**Why it matters:** The favicon is the most-seen 16 pixels you own, and it currently advertises that you didn't finish. The missing OG image means every Slack/LinkedIn/Twitter share of your portfolio is a grey box.
**Fix:** Ship an `S`-monogram favicon in the accent, an `app/opengraph-image.tsx` (`ImageResponse`, 1200×630, headline + name + result), an `app/not-found.tsx` in-brand, plus `app/robots.ts` and `app/sitemap.ts`.
**Where:** `app/favicon.ico`, `app/layout.tsx:18-22`, new `app/not-found.tsx`, `app/opengraph-image.tsx`, `app/robots.ts`, `app/sitemap.ts`

---
**P1-07 · Filler cards and an empty grid cell in Also Shipped**
📷 `filler-cards-1440.jpg`, `light-contact.jpg`
**What's wrong:** `lib/builds.ts:85,93` — "ReVox" and "my-automation-engine" both read **"Explore on GitHub."** and carry an `unverified: true` flag you added yourself. 11 cards in a 3-col grid leaves one empty cell, rendered as a visible grey rectangle in light mode. Three cards have image boxes and eight don't, so row heights lurch between ~380px and ~164px.
**Why it matters:** Two cards that say "I have nothing to say about this" undo the credibility of the nine above them. Volume is not the flex; curation is.
**Fix:** Delete both `unverified` entries (or write one real sentence each), take the grid to 9 items, and either give every card a visual or none.
**Where:** `lib/builds.ts:83-96`, `components/AlsoShipped.tsx:15-29`

---
**P1-08 · The custom cursor is stuck at (0,0) on every page load and disappears entirely without JS**
📷 visible top-left in `hero-1440.jpg`, `hero-1920.jpg`, `nojs-hero.jpg`
**What's wrong:** `CustomCursor.tsx` SSRs both the dot and the ring at `top:0; left:0`, so a red arc sits in the top-left corner of every load until the first `mousemove`. Worse, `globals.css:62` sets `body { cursor: none }` unconditionally — if JS fails or is slow, a desktop user has **no pointer at all**.
**Fix:** Render the cursor elements only after the first `mousemove`, and move `cursor: none` onto a `.js-cursor-ready` class applied from the effect rather than the base stylesheet.
**Where:** `components/CustomCursor.tsx:67-72`, `app/globals.css:61-63`

---
**P1-09 · The 44px Philosophy paragraph is display type doing body-copy work**
📷 `header-collide-1440.jpg`, `light-philosophy.jpg`
**What's wrong:** `Philosophy.tsx:73` is `clamp(24px,3.4vw,44px)`. At 1440 that's 44px running ~9 lines. On mobile the single paragraph spans two and a half full screens. Combined with `py-28`, the section eats roughly 1.4 viewports to deliver two sentences.
**Fix:** Drop to `clamp(20px,2.2vw,30px)`, cut ~40% of the words (§3.6), and add the trust line the section is missing.
**Where:** `components/Philosophy.tsx:47,73-91`

---
**P1-10 · 680 KB of decoded JS, including a dependency imported by nothing**
**What's wrong:** Production build ships 680 KB decoded / ~215 KB wire of JS across 9 chunks for one static page. `framer-motion` (`package.json:11`) is in `dependencies` and imported by **zero** files. GSAP is imported in 13 places without any modular/tree-shaken entry. The 25 KB `.ico` is larger than three of the JS chunks.
**Fix:** `npm rm framer-motion`. Import GSAP core + ScrollTrigger only where used and lazy-load the Work pin below the fold. Ship a 2–4 KB favicon.
**Where:** `package.json:11`, all `gsap` import sites, `app/favicon.ico`

---

### P2 — polish

---
**P2-01 · 1–2px horizontal overflow at every breakpoint.** `document.documentElement.scrollWidth` exceeds `clientWidth` at all four widths (391/390, 769/768, 1442/1440, 1922/1920). Cause: the rotated `.marquee-strip` (`globals.css:137-139`) overflowing a container whose only guard is `overflow-x-hidden` on `<body>` — `<html>` is unclamped. **Fix:** `overflow-x: clip` on the marquee wrapper and on `html`. **Where:** `app/globals.css:56-59,137-139`, `components/Marquee.tsx:22`

**P2-02 · Two mobile tap targets under 44px.** `Work` nav link = 42×44, `Let's talk` pill = 91×**40**. **Where:** `components/Header.tsx:30-32,42-47`

**P2-03 · Anchor jumps are instant while the rest of the page is smooth-scrolled.** Clicking "Let's talk" teleports to y=7366 — Lenis' `anchors` option isn't enabled, so nav clicks feel disconnected from the site's own scroll physics. **Where:** `components/SmoothScrollProvider.tsx:16-22`

**P2-04 · The 1.87 MB source headshot has no `priority` and no `placeholder`.** `next/image` serves 15 KB so users are fine, but there's a visible pop-in on first reveal. **Where:** `components/Philosophy.tsx:58-65`, `public/sharjeel-headshot.png`

**P2-05 · Ten font sizes between 10px and 16px with no scale.** Collapse to four steps (11 / 13 / 15 / 17). **Where:** every component

**P2-06 · Document outline has holes.** The Work section's headline is a `<div>` (`Work.tsx:89`) and Philosophy has no heading. **Where:** `components/Work.tsx:89`, `components/Philosophy.tsx:49`

**P2-07 · `alt="Sharjeel"` is a name, not a description.** Use "Sharjeel, photographed in profile against a dark background." **Where:** `components/Philosophy.tsx:60`

**P2-08 · Only two surface elevations in the whole dark theme** (`#0a0a0a` / `#121212`, a 1.1:1 step). Add `#171717` and `#1e1e1e`, plus a second border weight, so cards read as layered. **Where:** `app/globals.css:3-13`

**P2-09 · Form success state dead-ends.** No timeframe, no next action at the point of highest intent. **Where:** `components/ContactForm.tsx:123-127`

**P2-10 · Project type is free text where a `<select>` would qualify the lead** and let you surface budget bands. **Where:** `components/ContactForm.tsx:86-90`

**P2-11 · `/api/contact` returns a raw 503 mentioning `RESEND_API_KEY` to the end user.** Leaks implementation detail and, if the key is ever unset in prod, silently kills every inbound lead with no alerting. Consider a `mailto:` fallback in the UI on 503. **Where:** `app/api/contact/route.ts:51-56`, `components/ContactForm.tsx:36-38`

**P2-12 · Code panel is 9px on mobile** (`CodePanel.tsx:60`) — unreadable, and it consumes the top 250px of the most valuable screen on the site.

**P2-13 · `SimpleOps` is the only Also Shipped product card without a metric,** sitting between two that have one. Reads as the failure. **Where:** `lib/builds.ts:39-46`

**P2-14 · Marquee content duplicates the Stack section.** Four tool names in 56px caps, listed again 1,500px later. Spend that band on outcomes. **Where:** `components/Marquee.tsx:1`

---

## 5. Ranked build order

**Wave 1 — half a day, ~80% of the conversion lift**
| # | Task | Issue | Effort |
|---|---|---|---|
| 1 | Wire the six existing screenshots into `ProjectCard` + `AlsoShipped` | P0-01 | 1–2h |
| 2 | Rewrite hero copy + add two CTAs (book a call / see the work) | P0-02, §3.4 | 1h |
| 3 | Header: scroll-triggered backdrop, drop `mix-blend-difference` | P0-03 | 30m |
| 4 | `--text-faint` → `#8a8a85`; add light-mode accent variants; fix marquee colours | P1-03, P0-05 | 30m |
| 5 | Global `:focus-visible` ring + skip link | P1-04 | 15m |
| 6 | Delete the two "Explore on GitHub." cards | P1-07 | 5m |
| 7 | `npm rm framer-motion` | P1-10 | 1m |

**Wave 2 — one day, credibility**
| # | Task | Issue |
|---|---|---|
| 8 | Restructure all three case studies to Problem → Role → Built → Result; add spend/CPL/timeframe to NPI; replace vanity stats | P0-06 |
| 9 | Add a Cal.com booking link in hero + contact | P0-07 |
| 10 | Add a testimonials band (2–3 named) between Results and Marquee | P0-07 |
| 11 | Un-gate copy from GSAP — CSS-first reveal, `js-ready` class | P0-04 |
| 12 | Real favicon + `opengraph-image.tsx` + `not-found.tsx` + robots + sitemap | P1-06 |

**Wave 3 — one day, craft**
| # | Task | Issue |
|---|---|---|
| 13 | Fix card clipping at 768/1440; centre the active card | P1-02 |
| 14 | Hero max-height + vertical centring; shared `max-w-[1400px]`; halve dead zones | P1-01 |
| 15 | Real `prefers-reduced-motion` path — gate Lenis, the pin, and all GSAP | P1-05 |
| 16 | Fix the word rotator (pin the hero, or make it time-based, or cut it) | P0-02b |
| 17 | Philosophy: 30px cap, 40% shorter, add trust line | P1-09 |
| 18 | Cursor: mount on first `mousemove`; move `cursor:none` behind a JS flag | P1-08 |

**Wave 4 — polish**
19. Add a 4-step Process section with durations · 20. Pricing bands in Contact · 21. `<select>` + budget on the form · 22. Form success → booking link · 23. Type scale to 4 steps · 24. Two more surface elevations · 25. Marquee → outcomes · 26. All P2 fixes

---

## 6. What's genuinely good — don't touch it

- **`0.0000` CLS at every breakpoint.** Rare, and it means the layout discipline is there when you apply it.
- **The hero headline itself.** `clamp(48px,10vw,148px)` black Inter at `-0.045em` is correctly set and reads beautifully at all four widths.
- **"SHIPPED / NOT JUST / SHIPPED-LOOKING."** Best line on the site. Keep it, promote it to an `<h2>`.
- **"I write the code and run the ads, so the product and the pipeline are never two different problems."** Your entire positioning in one sentence. Move it up.
- **The Philosophy argument.** "The client pays for the gaps between them" is a real insight, well phrased.
- **`WorkBackdrop.tsx`.** A dependency-free wireframe icosahedron with depth-faded edges and scroll-velocity coupling, with a comment explaining why it isn't Three.js. That's senior work.
- **`/api/contact`.** Honeypot, length bounds, email regex, `replyTo`, typed errors, `runtime: "nodejs"`. Clean.
- **Result row hover** — wash + accent bar + count-up, correctly gated to pointer devices and reduced-motion. The one place the motion budget was spent well.
- **Theme flash prevention** — the inline `localStorage` script in `<head>` and the `.theme-anim` class that scopes colour transitions so they can't leak into GSAP. Thoughtful.
- **`rel="noopener noreferrer"` on every external link, `aria-hidden` on every decorative SVG, real `<label>` wrapping.** Consistently applied.

---

## 7. Reproduce this audit

```bash
npm install
npm run build && npm run start -- --port 3200   # perf, no-JS, contrast
npm run dev  -- --port 3100                     # screenshots
```
Capture scripts used: `shoot.mjs` (4 widths × 14 scroll positions + light/reduced-motion/focus), `perf.mjs` (CDP throttled vitals), `perf2.mjs` (resource breakdown, no-JS, WCAG contrast walk), `interact.mjs` (anchors, tab order, tap targets, CTA-per-screen).
