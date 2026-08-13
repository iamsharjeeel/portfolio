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

export const metadata = buildMetadata(pages.growth);

export default function GrowthPage() {
  return (
    <SiteChrome>
      <JsonLd
        data={jsonLdGraph([
          personJsonLd(),
          websiteJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            {
              name: "Growth and paid acquisition",
              path: "/services/growth-paid-acquisition",
            },
          ]),
        ])}
      />
      <main id="main">
        <PageHeader
          eyebrow="// Growth"
          title="The ad account and the page are one system"
          lede="I run Meta (and Google) into pages I also build, with CAPI and GoHighLevel so the CRM sees the same event the ad platform does."
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Growth and paid acquisition" },
          ]}
        />

        <section className="px-5 sm:px-8 lg:px-14 py-16 border-b border-line max-w-3xl">
          <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-6">
            Why the handoff fails
          </h2>
          <p className="text-[16px] leading-relaxed text-text-dim">
            When media and the landing page are owned by different people, the
            Pixel is late, the form dumps into a spreadsheet, and nobody can
            say why a campaign went flat. I write the page, wire CAPI, and
            read the ad account.
          </p>
        </section>

        <section className="px-5 sm:px-8 lg:px-14 py-16 border-b border-line">
          <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-8">
            Tools in the growth stack
          </h2>
          <p className="text-[16px] leading-relaxed text-text-dim max-w-3xl mb-8">
            Meta Ads, Meta CAPI, GoHighLevel, Google Ads. Landing pages on
            Next.js or Tailwind, deployed on Vercel.
          </p>
        </section>

        <section className="px-5 sm:px-8 lg:px-14 py-16 border-b border-line">
          <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-8">
            Public examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line">
            <div className="bg-bg p-7">
              <h3 className="font-display font-bold text-[18px] mb-3">
                NPI Youth Program
              </h3>
              <p className="text-[14px] leading-relaxed text-text-dim">
                Meta campaign, landing page, GHL pipeline, CAPI. 486 leads,
                214 tours booked, 44% book rate, 42 members.
              </p>
            </div>
            <div className="bg-bg p-7">
              <h3 className="font-display font-bold text-[18px] mb-3">
                NSEC Baseball
              </h3>
              <p className="text-[14px] leading-relaxed text-text-dim">
                One CTA: book a free evaluation. Pixel + CAPI into a GHL
                webhook. HitTrax as the on-page differentiator.
              </p>
            </div>
            <div className="bg-bg p-7">
              <h3 className="font-display font-bold text-[18px] mb-3">
                Smart Lawn Care
              </h3>
              <p className="text-[14px] leading-relaxed text-text-dim">
                “Never Mow Again” landing page for Alert Lawn Care’s robotic
                mowing division, backed by ad campaigns and CRM management.
                $30K/mo revenue, as listed on this site.
              </p>
            </div>
          </div>
        </section>

        <RelatedLinks
          heading="Read the builds"
          links={[
            {
              href: "/work/npi-youth-program",
              label: "NPI Youth Program case study",
              hint: "The full-funnel numbers.",
            },
            {
              href: "/work/nsec-baseball",
              label: "NSEC Baseball case study",
              hint: "Single-purpose paid-traffic page.",
            },
            {
              href: "/contact",
              label: "Bring a campaign",
              hint: "Page, Pixel, and pipeline in one pass.",
            },
          ]}
        />
        <CtaBand />
      </main>
    </SiteChrome>
  );
}
