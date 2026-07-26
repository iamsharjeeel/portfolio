import type { ProjectVisualKind } from "@/components/ProjectVisual";

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
  /** screenshot of the live site — takes precedence over `visual` */
  image?: string;
  imageAlt?: string;
  /** abstract icon treatment, used only when there is no screenshot */
  visual?: ProjectVisualKind;
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
    imageAlt:
      "Simple Solutions marketing site — \"The System Artists\" hero and booking flow.",
    visual: "product",
  },
  {
    name: "Smart Lawn Care",
    desc: "\"Never Mow Again\" — landing page for Alert Lawn Care's robotic mowing division, backed by ad campaigns and CRM management.",
    lang: "Landing page",
    href: "https://smart-lawn-care.vercel.app",
    linkLabel: "Live ↗",
    metric: "$30K/MO REVENUE",
    image: "/projects/smart-lawn-care.png",
    imageAlt:
      "Smart Lawn Care landing page — \"Never Mow Again\" robotic mowing offer.",
    visual: "lawn",
  },
  {
    name: "SimpleOps",
    desc: "\"Ops, simplified.\" Task management tool built for teams that get things done — own product under the Simple Solutions brand.",
    lang: "Product",
    href: "https://tasks.s1mplesolutions.cc",
    linkLabel: "Live ↗",
    image: "/projects/simpleops.png",
    imageAlt: "SimpleOps task management app — team task list view.",
    visual: "tasks",
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
];
