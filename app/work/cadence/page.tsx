import SiteChrome from "@/components/SiteChrome";
import JsonLd from "@/components/seo/JsonLd";
import PageHeader from "@/components/seo/PageHeader";
import CtaBand from "@/components/seo/CtaBand";
import RelatedLinks from "@/components/seo/RelatedLinks";
import {
  breadcrumbJsonLd,
  creativeWorkJsonLd,
  jsonLdGraph,
  personJsonLd,
  websiteJsonLd,
} from "@/lib/jsonld";
import { buildMetadata, pages } from "@/lib/seo";

export const metadata = buildMetadata(pages.cadence);

export default function CadencePage() {
  return (
    <SiteChrome>
      <JsonLd
        data={jsonLdGraph([
          personJsonLd(),
          websiteJsonLd(),
          creativeWorkJsonLd({
            name: "Cadence",
            description: pages.cadence.description,
            path: pages.cadence.path,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: "Cadence", path: "/work/cadence" },
          ]),
        ])}
      />
      <main id="main">
        <PageHeader
          eyebrow="// Product · SaaS"
          title="Cadence"
          lede="A premium multi-tenant timesheet and HR portal, built solo end to end. Dark UI with a warm gold accent."
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Work", href: "/work" },
            { name: "Cadence" },
          ]}
        />

        <section className="px-5 sm:px-8 lg:px-14 py-16 border-b border-line">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "7", label: "Build phases" },
              { value: "Next.js 14", label: "App Router" },
              { value: "Supabase", label: "Backend" },
            ].map((stat) => (
              <div key={stat.label} className="border border-line p-6">
                <b className="block font-display font-extrabold text-[28px]">
                  {stat.value}
                </b>
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-faint">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 sm:px-8 lg:px-14 py-16 border-b border-line max-w-3xl">
          <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-6">
            What shipped
          </h2>
          <p className="text-[16px] leading-relaxed text-text-dim">
            Cadence is a multi-tenant product, not a brochure site. The build
            covers role hierarchy, time entry, PDF payslips, and leave
            management — the operational core of a timesheet and HR portal.
          </p>
          <p className="mt-5 text-[16px] leading-relaxed text-text-dim">
            It was built solo across seven phases on Next.js 14 App Router with
            Supabase as the backend, then shipped to production.
          </p>
        </section>

        <section className="px-5 sm:px-8 lg:px-14 py-16 max-w-3xl">
          <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-6">
            Live product
          </h2>
          <p className="text-[16px] leading-relaxed text-text-dim mb-6">
            The production app is public. This page is the on-site record; the
            live URL is the product itself.
          </p>
          <a
            href="https://cadence-eta-five.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wide border-b border-text pb-1"
          >
            Open Cadence
          </a>
        </section>

        <RelatedLinks
          heading="Related"
          links={[
            {
              href: "/services/full-stack-product",
              label: "Full-stack product engineering",
              hint: "How Cadence was built — Next.js, Supabase, Vercel.",
            },
            {
              href: "/work",
              label: "All selected work",
              hint: "NPI Youth Program and NSEC Baseball sit next to this.",
            },
            {
              href: "/contact",
              label: "Start a product build",
              hint: "If you need a portal, not another landing page.",
            },
          ]}
        />
        <CtaBand eyebrow="// Need a product, not a page" />
      </main>
    </SiteChrome>
  );
}
