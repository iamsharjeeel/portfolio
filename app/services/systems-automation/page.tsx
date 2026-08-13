import SiteChrome from "@/components/SiteChrome";
import JsonLd from "@/components/seo/JsonLd";
import PageHeader from "@/components/seo/PageHeader";
import CtaBand from "@/components/seo/CtaBand";
import RelatedLinks from "@/components/seo/RelatedLinks";
import {
  breadcrumbJsonLd,
  jsonLdGraph,
  personJsonLd,
  websiteJsonLd,
} from "@/lib/jsonld";
import { buildMetadata, pages } from "@/lib/seo";

export const metadata = buildMetadata(pages.systems);

export default function SystemsPage() {
  return (
    <SiteChrome>
      <JsonLd
        data={jsonLdGraph([
          personJsonLd(),
          websiteJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            {
              name: "Systems and automation",
              path: "/services/systems-automation",
            },
          ]),
        ])}
      />
      <main id="main">
        <PageHeader
          eyebrow="// Systems"
          title="Workflows that move data, not slides"
          lede="n8n, GoHighLevel workflows, and webhooks. The boring connective tissue between a form, a CRM, and the next human who has to act."
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Systems and automation" },
          ]}
        />

        <section className="px-5 sm:px-8 lg:px-14 py-16 border-b border-line max-w-3xl">
          <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-6">
            What I actually wire
          </h2>
          <p className="text-[16px] leading-relaxed text-text-dim">
            Lead events into GoHighLevel. Booking flows that notify a real
            inbox. Webhooks instead of CSV exports. I use n8n and GHL
            workflows when the job is orchestration, not another dashboard
            nobody opens.
          </p>
        </section>

        <section className="px-5 sm:px-8 lg:px-14 py-16 border-b border-line max-w-3xl">
          <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-6">
            Simple Solutions
          </h2>
          <p className="text-[16px] leading-relaxed text-text-dim">
            Own product at s1mplesolutions.cc — custom automated workflows and
            technical integrations for scaling businesses. React 19, Vite,
            Tailwind. Booking flow wired to Resend and a HighLevel webhook.
            Listed here at $13K MRR.
          </p>
        </section>

        <section className="px-5 sm:px-8 lg:px-14 py-16 max-w-3xl">
          <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-6">
            SimpleOps
          </h2>
          <p className="text-[16px] leading-relaxed text-text-dim">
            Task management for teams that need the work tracked after the
            automation fires. Live at tasks.s1mplesolutions.cc, under the same
            brand.
          </p>
        </section>

        <RelatedLinks
          heading="Nearby work"
          links={[
            {
              href: "/services/full-stack-product",
              label: "Full-stack product engineering",
              hint: "When the system needs its own UI.",
            },
            {
              href: "/services/growth-paid-acquisition",
              label: "Growth and paid acquisition",
              hint: "CAPI and GHL on the intake side.",
            },
            {
              href: "/work",
              label: "Selected work",
              hint: "Products and funnels already shipped.",
            },
          ]}
        />
        <CtaBand />
      </main>
    </SiteChrome>
  );
}
