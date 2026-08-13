import SiteChrome from "@/components/SiteChrome";
import JsonLd from "@/components/seo/JsonLd";
import PageHeader from "@/components/seo/PageHeader";
import { GhlFormWidget } from "@/components/GhlWidget";
import {
  breadcrumbJsonLd,
  jsonLdGraph,
  personJsonLd,
  websiteJsonLd,
} from "@/lib/jsonld";
import Link from "next/link";
import { SITE_EMAIL, SOCIAL, buildMetadata, pages } from "@/lib/seo";

export const metadata = buildMetadata(pages.contact);

export default function ContactPage() {
  return (
    <SiteChrome>
      <JsonLd
        data={jsonLdGraph([
          personJsonLd(),
          websiteJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ])}
      />
      <main id="main">
        <PageHeader
          eyebrow="// Contact"
          title="Let's talk"
          lede="Got a build, a campaign, or both. Send a note — or book a time if you'd rather talk live."
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Contact" },
          ]}
          align="center"
        />
        <section className="px-5 sm:px-8 lg:px-14 py-16 text-center">
          <a
            href={`mailto:${SITE_EMAIL}`}
            className="font-display font-black tracking-[-0.04em] text-[clamp(22px,5vw,56px)] leading-none lowercase break-words hover:text-accent transition-colors"
          >
            {SITE_EMAIL}
          </a>
          <div className="mt-8 flex gap-x-7 font-mono text-xs uppercase tracking-wide text-text-dim justify-center">
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-11 border-b border-transparent hover:border-text hover:text-text transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-11 border-b border-transparent hover:border-text hover:text-text transition-colors"
            >
              GitHub
            </a>
            <Link
              href="/book"
              className="inline-flex items-center min-h-11 border-b border-transparent hover:border-text hover:text-text transition-colors"
            >
              Book a call
            </Link>
          </div>
          <GhlFormWidget />
        </section>
      </main>
    </SiteChrome>
  );
}
