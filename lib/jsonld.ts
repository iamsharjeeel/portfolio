import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_JOB_TITLE,
  SITE_NAME,
  SITE_URL,
  SOCIAL,
  absoluteUrl,
} from "@/lib/seo";

type JsonLd = Record<string, unknown>;

export function personJsonLd(): JsonLd {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SITE_NAME,
    url: SITE_URL,
    email: SITE_EMAIL,
    jobTitle: SITE_JOB_TITLE,
    image: `${SITE_URL}/sharjeel-headshot.png`,
    sameAs: [SOCIAL.linkedin, SOCIAL.github],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#person` },
  };
}

export function profilePageJsonLd(): JsonLd {
  return {
    "@type": "ProfilePage",
    "@id": `${absoluteUrl("/about")}#profile`,
    url: absoluteUrl("/about"),
    name: "About Sharjeel",
    mainEntity: { "@id": `${SITE_URL}/#person` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function creativeWorkJsonLd(input: {
  name: string;
  description: string;
  path: string;
}): JsonLd {
  return {
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    author: { "@id": `${SITE_URL}/#person` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

export function jsonLdGraph(nodes: JsonLd[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
