export interface Build {
  name: string;
  desc: string;
  lang: string;
  href: string;
  /** true when the repo had no README/description to pull from */
  unverified?: boolean;
}

// Descriptions sourced from each repo's actual README — no invented features.
export const builds: Build[] = [
  {
    name: "simple-solutions",
    desc: "Marketing site for Simple Solutions — The System Artists. React 19 + Vite + Tailwind, booking flow wired to Resend and a HighLevel webhook.",
    lang: "TypeScript",
    href: "https://github.com/iamsharjeeel/simple-solutions",
  },
  {
    name: "otomate",
    desc: "Studio-quality marketing site for Otomate — AI-powered business automation for SMBs. Next.js 14, Three.js, GSAP + ScrollTrigger.",
    lang: "TypeScript",
    href: "https://github.com/iamsharjeeel/otomate",
  },
  {
    name: "casestudies",
    desc: "Standalone case study pages for Voxility.ai, built in the same design language as the main marketing site.",
    lang: "TypeScript",
    href: "https://github.com/iamsharjeeel/casestudies",
  },
  {
    name: "baseball-lessons",
    desc: "Paid-traffic landing page for NSEC baseball & softball lessons. One CTA, Meta Pixel + CAPI, HitTrax as the differentiator.",
    lang: "TypeScript",
    href: "https://github.com/iamsharjeeel/baseball-lessons",
  },
  {
    name: "glimpse",
    desc: "Paste raw notes or freeform text — Glimpse structures them into clean visual cards you can export. Zero-dependency frontend + Gemini.",
    lang: "HTML",
    href: "https://github.com/iamsharjeeel/glimpse",
  },
  {
    name: "ad-images",
    desc: "XOVERA gym revenue calculator ad, built with Next.js.",
    lang: "CSS",
    href: "https://github.com/iamsharjeeel/ad-images",
  },
  {
    name: "loomless",
    desc: "Gemini-powered app scaffolded in Google AI Studio.",
    lang: "TypeScript",
    href: "https://github.com/iamsharjeeel/loomless",
  },
  {
    name: "ReVox",
    desc: "Explore on GitHub.",
    lang: "JavaScript",
    href: "https://github.com/iamsharjeeel/ReVox",
    unverified: true,
  },
  {
    name: "my-automation-engine",
    desc: "Explore on GitHub.",
    lang: "JavaScript",
    href: "https://github.com/iamsharjeeel/my-automation-engine",
    unverified: true,
  },
];
