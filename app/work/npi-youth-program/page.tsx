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

export const metadata = buildMetadata(pages.npi);

export default function NpiPage() {
  return (
    <SiteChrome>
      <JsonLd
        data={jsonLdGraph([
          personJsonLd(),
          websiteJsonLd(),
          creativeWorkJsonLd({
            name: "NPI Youth Program",
            description: pages.npi.description,
            path: pages.npi.path,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: "NPI Youth Program", path: "/work/npi-youth-program" },
          ]),
        ])}
      />
      <main id="main">
        <PageHeader
          eyebrow="// Growth · Case study"
          title="NPI Youth Program"
          lede="A full-funnel build: Meta campaign, landing page, GoHighLevel pipeline, and CAPI tracking. The numbers below are the ones already published on this site."
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Work", href: "/work" },
            { name: "NPI Youth Program" },
          ]}
        />

        <section className="px-5 sm:px-8 lg:px-14 py-16 border-b border-line">
          <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-8">
            Verified outcomes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
            {[
              { value: "486", label: "Leads" },
              { value: "214", label: "Tours booked" },
              { value: "44%", label: "Book rate" },
              { value: "42", label: "Members closed" },
            ].map((stat) => (
              <div key={stat.label} className="bg-bg p-7">
                <b className="block font-display font-extrabold text-[32px] text-accent-green">
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
            The funnel
          </h2>
          <p className="text-[16px] leading-relaxed text-text-dim">
            NPI Youth Program needed more than a landing page. The build ran
            Meta ads into a dedicated page, then into a GoHighLevel pipeline
            with CAPI tracking so lead events were not just pixel-side.
          </p>
          <p className="mt-5 text-[16px] leading-relaxed text-text-dim">
            Lead to booked tour conversion is the middle of the system: 214
            tours booked from 486 leads is a 44% book rate. 42 members closed
            is the end of that same pipeline.
          </p>
        </section>

        <section className="px-5 sm:px-8 lg:px-14 py-16 max-w-3xl">
          <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-6">
            Interactive case study
          </h2>
          <p className="text-[16px] leading-relaxed text-text-dim mb-6">
            There is a standalone case study page with GSAP and a Three.js
            particle field — same story, different presentation.
          </p>
          <a
            href="https://casestudies-gamma.vercel.app/xovera-npi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wide border-b border-text pb-1"
          >
            Open the live NPI case study
          </a>
        </section>

        <RelatedLinks
          heading="Related"
          links={[
            {
              href: "/services/growth-paid-acquisition",
              label: "Growth and paid acquisition",
              hint: "Meta, CAPI, and the landing page that feeds the CRM.",
            },
            {
              href: "/work/nsec-baseball",
              label: "NSEC Baseball",
              hint: "Another paid-traffic page with Pixel + CAPI + GHL.",
            },
            {
              href: "/contact",
              label: "Talk about a funnel",
              hint: "Campaign, page, and pipeline as one build.",
            },
          ]}
        />
        <CtaBand eyebrow="// Ads and the page should be the same job" />
      </main>
    </SiteChrome>
  );
}
