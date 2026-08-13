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

export const metadata = buildMetadata(pages.nsec);

export default function NsecPage() {
  return (
    <SiteChrome>
      <JsonLd
        data={jsonLdGraph([
          personJsonLd(),
          websiteJsonLd(),
          creativeWorkJsonLd({
            name: "NSEC Baseball",
            description: pages.nsec.description,
            path: pages.nsec.path,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: "NSEC Baseball", path: "/work/nsec-baseball" },
          ]),
        ])}
      />
      <main id="main">
        <PageHeader
          eyebrow="// Landing page · Conversion"
          title="NSEC Baseball"
          lede="A single-purpose landing page for NSEC baseball and softball lessons. One CTA, one job: book a free evaluation."
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Work", href: "/work" },
            { name: "NSEC Baseball" },
          ]}
        />

        <section className="px-5 sm:px-8 lg:px-14 py-16 border-b border-line max-w-3xl">
          <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-6">
            One CTA, on purpose
          </h2>
          <p className="text-[16px] leading-relaxed text-text-dim">
            The page does not try to be a full website. It exists to send paid
            traffic to a free evaluation. HitTrax is the differentiator on the
            page; the form is the only conversion.
          </p>
        </section>

        <section className="px-5 sm:px-8 lg:px-14 py-16 border-b border-line max-w-3xl">
          <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-6">
            Tracking into the CRM
          </h2>
          <p className="text-[16px] leading-relaxed text-text-dim">
            Meta Pixel and CAPI are wired straight into a GoHighLevel webhook.
            The ad account and the booking pipeline share the same event, not
            two tools guessing at each other.
          </p>
          <p className="mt-5 text-[16px] leading-relaxed text-text-dim">
            Stack on the page: Tailwind, deployed on Vercel.
          </p>
        </section>

        <section className="px-5 sm:px-8 lg:px-14 py-16 max-w-3xl">
          <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-6">
            Live page
          </h2>
          <a
            href="https://baseball-lessons-two.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wide border-b border-text pb-1"
          >
            Open the NSEC landing page
          </a>
        </section>

        <RelatedLinks
          heading="Related"
          links={[
            {
              href: "/services/growth-paid-acquisition",
              label: "Growth and paid acquisition",
              hint: "Landing pages built to take Meta traffic.",
            },
            {
              href: "/work/npi-youth-program",
              label: "NPI Youth Program",
              hint: "Same CAPI + GHL pattern at funnel scale.",
            },
            {
              href: "/contact",
              label: "Need a page with one job",
              hint: "Book, call, or apply — not a 12-link header.",
            },
          ]}
        />
        <CtaBand />
      </main>
    </SiteChrome>
  );
}
