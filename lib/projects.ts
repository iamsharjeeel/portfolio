export type ProjectVisualKind =
  | "saas"
  | "growth"
  | "landing"
  | "product"
  | "tasks"
  | "lawn";

export interface Project {
  num: string;
  tag: string;
  title: string;
  desc: string;
  stats: { value: string; label: string }[];
  linkLabel: string;
  href: string;
  visual: ProjectVisualKind;
}

export const projects: Project[] = [
  {
    num: "01 / 03",
    tag: "Product · SaaS",
    title: "Cadence",
    desc: "A premium multi-tenant timesheet and HR portal, built solo end to end. Role hierarchy, time entry, PDF payslips, leave management — dark UI with a warm gold accent.",
    stats: [
      { value: "7", label: "Build phases" },
      { value: "Next.js 14", label: "App router" },
      { value: "Supabase", label: "Backend" },
    ],
    linkLabel: "View live →",
    href: "https://cadence-eta-five.vercel.app",
    visual: "saas",
  },
  {
    num: "02 / 03",
    tag: "Growth · Case study",
    title: "NPI Youth Program",
    desc: "Full-funnel build for NPI Youth Program: Meta campaign, landing page, GHL pipeline, CAPI tracking. Interactive case study page with GSAP and a Three.js particle field.",
    stats: [
      { value: "486", label: "Leads" },
      { value: "214", label: "Tours booked" },
      { value: "42", label: "Members" },
    ],
    linkLabel: "View case study →",
    href: "https://casestudies-gamma.vercel.app/xovera-npi",
    visual: "growth",
  },
  {
    num: "03 / 03",
    tag: "Landing page · Conversion",
    title: "NSEC Baseball",
    desc: "Single-purpose landing page for NSEC baseball & softball lessons. One CTA, one job: book a free evaluation. Pixel + CAPI wired straight into the GHL webhook.",
    stats: [
      { value: "1", label: "CTA, on purpose" },
      { value: "Vercel", label: "Deployed" },
      { value: "Tailwind", label: "Styled" },
    ],
    linkLabel: "View project →",
    href: "https://baseball-lessons-two.vercel.app",
    visual: "landing",
  },
];
