# Handover

## 2026-07-09 — Philosophy headshot, Work visual motion, Contact cleanup, Results hover

### What changed
- Philosophy: always-dark section; headshot fills left column height matched to the text block (`object-cover` + edge fades into #0a0a0a).
- Work: SVG line icons inside project visual boxes now loop (clock hands, growth bars/line, landing orbit, product nodes, tasks checks, lawn sway).
- Contact: removed WhatsApp, Call, FaceTime links and the phone/FaceTime banner line; email set to `hello@sharjeel.cc`.
- Contact form: posts to `/api/contact` and emails a branded HTML notification to `iamsharjeeel@gmail.com` via Resend (`RESEND_API_KEY` required).
- Header: mobile layout no longer squashes — brand left, actions right, centered within max-width shell.
- Results: row hover wash + accent bar; metric digits count up and scale on hover (pointer devices only).
- Also shipped: visual icons sized to fill their boxes (~78%), higher opacity, theme-matched `bg-raised` + accent wash (no hardcoded dark greys).
- Work cards: theme-matched light/dark visual boxes (no hardcoded #1A1A1A); larger icons.
- Removed Pakistan / Newtown area mentions from Hero, Contact, projects, Results.

### Files touched
- `components/Philosophy.tsx`
- `components/ProjectVisual.tsx`
- `components/Contact.tsx`
- `components/ContactForm.tsx`
- `components/Header.tsx`
- `components/Results.tsx`
- `components/AlsoShipped.tsx`
- `app/api/contact/route.ts`
- `lib/contact-email.ts`
- `app/globals.css`
- `public/sharjeel-headshot.png` (added)
- `.env.example`
- `README.md`, `CHANGELOG.md`, `HANDOVER.md`

### Pending
- **Manual:** set `RESEND_API_KEY` in Vercel (and optionally `CONTACT_FROM_EMAIL` after verifying sharjeel.cc). Without it, form returns 503.
- Rebase/close stale draft PR #3 (hero headshot placement was wrong; this branch supersedes it for Philosophy).
- Optional: fill ReVox / my-automation-engine blurbs; favicon/OG; promote s1mplesolutions.
