import type { Metadata } from "next";

export const SITE_URL = "https://sharjeel.cc";
export const SITE_NAME = "Sharjeel";
export const SITE_TITLE =
  "Sharjeel — Full-stack developer and growth engineer";
export const SITE_DESCRIPTION =
  "Full-stack developer and growth engineer. I write the code and run the ads, so the product and the pipeline are never two different problems.";
export const SITE_EMAIL = "hello@sharjeel.cc";
export const SITE_JOB_TITLE = "Full-stack developer and growth engineer";

export const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/iamsharjeeel/",
  github: "https://github.com/iamsharjeeel",
} as const;

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  absoluteTitle?: string;
  index: boolean;
};

export const pages = {
  home: {
    path: "/",
    title: SITE_NAME,
    absoluteTitle: SITE_TITLE,
    description: SITE_DESCRIPTION,
    index: true,
  },
  about: {
    path: "/about",
    title: "About",
    description:
      "Sharjeel builds products and runs acquisition as one system — Next.js, Meta ads, and GoHighLevel — without splitting design, development, and media into separate handoffs.",
    index: true,
  },
  work: {
    path: "/work",
    title: "Selected work",
    description:
      "Shipped work: Cadence, a multi-tenant HR portal; NPI Youth Program's Meta-to-membership funnel; and a single-CTA landing page for NSEC baseball lessons.",
    index: true,
  },
  cadence: {
    path: "/work/cadence",
    title: "Cadence",
    description:
      "Cadence is a multi-tenant timesheet and HR portal built solo on Next.js 14 and Supabase — role hierarchy, time entry, PDF payslips, and leave management.",
    index: true,
  },
  npi: {
    path: "/work/npi-youth-program",
    title: "NPI Youth Program",
    description:
      "Full-funnel build for NPI Youth Program: Meta campaign, landing page, GoHighLevel pipeline, and CAPI tracking. 486 leads, 214 tours booked, 42 members.",
    index: true,
  },
  nsec: {
    path: "/work/nsec-baseball",
    title: "NSEC Baseball",
    description:
      "Single-purpose landing page for NSEC baseball and softball lessons. One CTA to book a free evaluation, with Meta Pixel and CAPI wired into a GoHighLevel webhook.",
    index: true,
  },
  fullStack: {
    path: "/services/full-stack-product",
    title: "Full-stack product engineering",
    description:
      "Product engineering with Next.js, TypeScript, Supabase, and Vercel — the same stack behind Cadence and SimpleOps.",
    index: true,
  },
  growth: {
    path: "/services/growth-paid-acquisition",
    title: "Growth and paid acquisition",
    description:
      "Paid acquisition and conversion pages: Meta ads, CAPI, GoHighLevel pipelines, and landing pages for NPI Youth Program, NSEC Baseball, and Smart Lawn Care.",
    index: true,
  },
  systems: {
    path: "/services/systems-automation",
    title: "Systems and automation",
    description:
      "Workflow automation and integrations — n8n, GoHighLevel, webhooks — including Simple Solutions and SimpleOps.",
    index: true,
  },
  contact: {
    path: "/contact",
    title: "Contact",
    description:
      "Start a project with Sharjeel. Email hello@sharjeel.cc or send a note about a build, a campaign, or both.",
    index: true,
  },
  book: {
    path: "/book",
    title: "Book a call",
    description:
      "Request a time with Sharjeel to talk through a product build, a paid campaign, or both.",
    index: true,
  },
} as const satisfies Record<string, SeoPage>;

export type PageKey = keyof typeof pages;

export const indexablePages: SeoPage[] = Object.values(pages).filter(
  (page) => page.index
);

export function absoluteUrl(path: string): string {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path}`;
}

export function displayTitle(page: SeoPage): string {
  return page.absoluteTitle ?? `${page.title} · ${SITE_NAME}`;
}

const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: SITE_TITLE,
} as const;

export function buildMetadata(page: SeoPage): Metadata {
  const url = absoluteUrl(page.path);
  const title = displayTitle(page);
  return {
    title: page.absoluteTitle
      ? { absolute: page.absoluteTitle }
      : page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: page.description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
      images: [OG_IMAGE.url],
    },
    robots: page.index
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}
