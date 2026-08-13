import Image from "next/image";
import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";
import JsonLd from "@/components/seo/JsonLd";
import PageHeader from "@/components/seo/PageHeader";
import CtaBand from "@/components/seo/CtaBand";
import RelatedLinks from "@/components/seo/RelatedLinks";
import {
  breadcrumbJsonLd,
  jsonLdGraph,
  personJsonLd,
  profilePageJsonLd,
  websiteJsonLd,
} from "@/lib/jsonld";
import { SITE_EMAIL, SOCIAL, buildMetadata, pages } from "@/lib/seo";

export const metadata = buildMetadata(pages.about);

const stack = [
  {
    label: "Frontend",
    tools: "Next.js, TypeScript, Tailwind, Framer Motion, GSAP, React",
  },
  {
    label: "Backend",
    tools: "Supabase, Postgres, Vercel, Node.js",
  },
  {
    label: "Growth",
    tools: "Meta Ads, Meta CAPI, GoHighLevel, Google Ads",
  },
  {
    label: "AI / Tooling",
    tools: "Claude Code, Cursor Composer, local Ollama, ChatGPT/Claude API",
  },
  {
    label: "Automation",
    tools: "n8n, GHL workflows, webhooks",
  },
];

export default function AboutPage() {
  return (
    <SiteChrome>
      <JsonLd
        data={jsonLdGraph([
          personJsonLd(),
          websiteJsonLd(),
          profilePageJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ])}
      />
      <main id="main">
        <PageHeader
          eyebrow="// About"
          title="One brain for the product and the pipeline"
          lede="I'm Sharjeel — a full-stack developer and growth engineer. I write the code and run the ads, so the product and the pipeline are never two different problems."
          crumbs={[
            { name: "Home", href: "/" },
            { name: "About" },
          ]}
        />

        <section className="px-5 sm:px-8 lg:px-14 py-20 border-b border-line">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] gap-10 md:gap-16 items-start">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg-raised">
              <Image
                src="/sharjeel-headshot.png"
                alt="Sharjeel, full-stack developer and growth engineer"
                fill
                sizes="(max-width: 768px) 90vw, 38vw"
                className="object-cover object-[center_12%] grayscale contrast-[1.06] brightness-[0.82] saturate-0"
              />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-6">
                Operating philosophy
              </h2>
              <p className="text-[17px] leading-relaxed text-text-dim">
                Most agencies split design, development, and ads into three
                handoffs — and the client pays for the gaps between them. I
                close that gap. Same person writing the Next.js component,
                wiring the GoHighLevel automation, and diagnosing why the Meta
                campaign went flat.
              </p>
              <p className="mt-5 text-[17px] leading-relaxed font-semibold">
                One brain, fewer handoffs, faster fixes.
              </p>
              <p className="mt-8 font-mono text-xs uppercase tracking-wider text-text-faint">
                Available for select projects
              </p>
            </div>
          </div>
        </section>

        <section className="px-5 sm:px-8 lg:px-14 py-20 border-b border-line">
          <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-10">
            What&apos;s actually under the hood
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-line border border-line">
            {stack.map((item) => (
              <div key={item.label} className="bg-bg p-7">
                <div className="font-mono text-[11px] text-text-faint uppercase tracking-wider mb-2.5">
                  {item.label}
                </div>
                <div className="text-[15px] leading-relaxed font-medium">
                  {item.tools}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 sm:px-8 lg:px-14 py-20">
          <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-6">
            How to reach me
          </h2>
          <p className="max-w-[520px] text-[15px] leading-relaxed text-text-dim mb-8">
            Email is the fastest path. LinkedIn and GitHub are public if you
            want to see the work before you write.
          </p>
          <div className="flex flex-wrap gap-x-7 gap-y-3 font-mono text-xs uppercase tracking-wide">
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="border-b border-text pb-1"
            >
              {SITE_EMAIL}
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-dim hover:text-text border-b border-transparent hover:border-text pb-1"
            >
              LinkedIn
            </a>
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-dim hover:text-text border-b border-transparent hover:border-text pb-1"
            >
              GitHub
            </a>
            <Link
              href="/contact"
              className="text-text-dim hover:text-text border-b border-transparent hover:border-text pb-1"
            >
              Project inquiry form
            </Link>
          </div>
        </section>

        <RelatedLinks
          heading="Where this shows up in the work"
          links={[
            {
              href: "/work",
              label: "Selected work",
              hint: "Cadence, NPI Youth Program, and NSEC Baseball.",
            },
            {
              href: "/services/full-stack-product",
              label: "Full-stack product engineering",
              hint: "Next.js, Supabase, and Vercel product builds.",
            },
            {
              href: "/services/growth-paid-acquisition",
              label: "Growth and paid acquisition",
              hint: "Meta, CAPI, and conversion landing pages.",
            },
          ]}
        />
        <CtaBand />
      </main>
    </SiteChrome>
  );
}
