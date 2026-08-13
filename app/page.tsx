import SiteChrome from "@/components/SiteChrome";
import JsonLd from "@/components/seo/JsonLd";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Results from "@/components/Results";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Stack from "@/components/Stack";
import AlsoShipped from "@/components/AlsoShipped";
import Contact from "@/components/Contact";
import { jsonLdGraph, personJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { buildMetadata, pages } from "@/lib/seo";

export const metadata = buildMetadata(pages.home);

export default function Home() {
  return (
    <SiteChrome>
      <JsonLd data={jsonLdGraph([personJsonLd(), websiteJsonLd()])} />
      <main id="main">
        <Hero />
        <Philosophy />
        <Results />
        <Marquee />
        <Work />
        <Stack />
        <AlsoShipped />
        <Contact />
      </main>
    </SiteChrome>
  );
}
