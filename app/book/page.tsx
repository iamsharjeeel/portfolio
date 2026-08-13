import SiteChrome from "@/components/SiteChrome";
import JsonLd from "@/components/seo/JsonLd";
import PageHeader from "@/components/seo/PageHeader";
import { GhlBookingWidget } from "@/components/GhlWidget";
import {
  breadcrumbJsonLd,
  jsonLdGraph,
  personJsonLd,
  websiteJsonLd,
} from "@/lib/jsonld";
import { SITE_EMAIL, buildMetadata, pages } from "@/lib/seo";

export const metadata = buildMetadata(pages.book);

export default function BookPage() {
  return (
    <SiteChrome>
      <JsonLd
        data={jsonLdGraph([
          personJsonLd(),
          websiteJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Book", path: "/book" },
          ]),
        ])}
      />
      <main id="main">
        <PageHeader
          eyebrow="// Book"
          title="Book a call"
          lede="Pick a time for a build, a campaign, or both. I'll confirm the slot and come prepared."
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Book" },
          ]}
          align="center"
        />
        <section className="px-5 sm:px-8 lg:px-14 py-16 text-center">
          <p className="max-w-[640px] mx-auto text-[15px] leading-relaxed text-text-dim">
            Prefer email first?{" "}
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="text-text border-b border-text"
            >
              {SITE_EMAIL}
            </a>
          </p>
          <GhlBookingWidget />
        </section>
      </main>
    </SiteChrome>
  );
}
