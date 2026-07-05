export interface Build {
  name: string;
  desc: string;
  /** language or short category tag shown in the corner */
  lang: string;
  href: string;
  /** link label — defaults to "GitHub ↗" */
  linkLabel?: string;
  /** real business figure, stated plainly (same style as Results metrics) */
  metric?: string;
  /** screenshot in /public/projects */
  image?: string;
  /** true when the repo had no README/description to pull from */
  unverified?: boolean;
}

// Descriptions sourced from each repo's README or the live site — no invented features.
export const builds: Build[] = [
  {
    name: "Simple Solutions",
    desc: "Own product — \"The System Artists.\" Custom automated workflows and technical integrations for scaling businesses. React 19 + Vite + Tailwind, booking flow wired to Resend and a HighLevel webhook.",
    lang: "Product",
    href: "https://s1mplesolutions.cc",
    linkLabel: "Live ↗",
    metric: "$13K MRR",
    image: "/projects/s1mplesolutions.png",
  },
  {
    name: "Smart Lawn Care",
    desc: "\"Never Mow Again\" — landing page for Alert Lawn Care's robotic mowing division, backed by ad campaigns and CRM management.",
    lang: "Landing page",
    href: "https://smart-lawn-care.vercel.app",
    linkLabel: "Live ↗",
    metric: "$30K/MO REVENUE",
    image: "/projects/smart-lawn-care.png",
  },
  {
    name: "SimpleOps",
    desc: "\"Ops, simplified.\" Task management tool built for teams that get things done — own product under the Simple Solutions brand.",
    lang: "Product",
    href: "https://tasks.s1mplesolutions.cc",
    linkLabel: "Live ↗",
    image: "/projects/simpleops.png",
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
