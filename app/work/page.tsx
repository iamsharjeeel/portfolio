import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";
import JsonLd from "@/components/seo/JsonLd";
import PageHeader from "@/components/seo/PageHeader";
import CtaBand from "@/components/seo/CtaBand";
import RelatedLinks from "@/components/seo/RelatedLinks";
import ProjectVisual from "@/components/ProjectVisual";
import { builds } from "@/lib/builds";
import { projects } from "@/lib/projects";
import {
  breadcrumbJsonLd,
  jsonLdGraph,
  personJsonLd,
  websiteJsonLd,
} from "@/lib/jsonld";
import { buildMetadata, pages } from "@/lib/seo";

export const metadata = buildMetadata(pages.work);

export default function WorkPage() {
  return (
    <SiteChrome>
      <JsonLd
        data={jsonLdGraph([
          personJsonLd(),
          websiteJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]),
        ])}
      />
      <main id="main">
        <PageHeader
          eyebrow="// Selected work — 03"
          title="Shipped, not just shipped-looking"
          lede="Three builds with public URLs and numbers that already live on this site. No invented case studies."
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Work" },
          ]}
        />

        <section className="px-5 sm:px-8 lg:px-14 py-16">
          <ul className="flex flex-col">
            {projects.map((project) => (
              <li
                key={project.title}
                className="grid grid-cols-1 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 md:gap-12 py-12 border-t border-line last:border-b"
              >
                <Link
                  href={project.caseStudyHref}
                  className="work-visual aspect-[4/3] rounded-2xl relative overflow-hidden flex items-center justify-center border border-line bg-bg-raised"
                  aria-label={`${project.title} case study`}
                >
                  <div className="work-visual-wash absolute inset-0 pointer-events-none" />
                  <ProjectVisual
                    kind={project.visual}
                    size="lg"
                    className="relative z-[1]"
                  />
                  <span className="font-mono text-[13px] text-text-faint absolute top-5 left-5 z-[2]">
                    {project.num}
                  </span>
                </Link>
                <div>
                  <span className="font-mono text-[11px] tracking-wider uppercase text-accent mb-4 inline-block">
                    {project.tag}
                  </span>
                  <h2 className="font-display font-extrabold text-[clamp(22px,2.6vw,32px)] tracking-[-0.02em] mb-3.5">
                    <Link href={project.caseStudyHref}>{project.title}</Link>
                  </h2>
                  <p className="text-[14.5px] leading-relaxed text-text-dim mb-5">
                    {project.desc}
                  </p>
                  <div className="flex gap-7 mb-5 flex-wrap">
                    {project.stats.map((stat) => (
                      <div key={stat.label}>
                        <b className="block font-display font-extrabold text-[22px]">
                          {stat.value}
                        </b>
                        <span className="font-mono text-[10.5px] text-text-faint uppercase">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wide">
                    <Link
                      href={project.caseStudyHref}
                      className="border-b border-text pb-1"
                    >
                      Read the {project.title} case study
                    </Link>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-dim hover:text-text border-b border-transparent hover:border-text pb-1"
                    >
                      {project.linkLabel}
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="px-5 sm:px-8 lg:px-14 py-20 border-t border-line">
          <div className="flex justify-between items-baseline mb-12 gap-4 flex-wrap">
            <h2 className="font-display font-extrabold text-[clamp(28px,4vw,44px)] tracking-[-0.02em] uppercase">
              Also shipped
            </h2>
            <span className="font-mono text-xs text-text-faint">
              Products, client work, and builds
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
            {builds.map((build) => (
              <a
                key={build.name}
                href={build.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-bg p-6 sm:p-7 flex flex-col gap-3 min-h-[164px] transition-colors hover:bg-bg-raised"
              >
                {build.visual ? (
                  <div className="also-visual relative flex items-center justify-center aspect-[16/10] rounded-lg border border-line mb-1 overflow-hidden bg-bg-raised">
                    <div className="also-visual-wash absolute inset-0 pointer-events-none" />
                    <ProjectVisual
                      kind={build.visual}
                      size="fill"
                      className="relative z-[1]"
                    />
                  </div>
                ) : null}
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display font-bold text-[16px] tracking-[-0.01em] break-all">
                    {build.name}
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-accent shrink-0">
                    {build.lang}
                  </span>
                </div>
                {build.metric ? (
                  <span className="font-mono text-[13px] text-accent-green">
                    {build.metric}
                  </span>
                ) : null}
                <p className="text-[13.5px] leading-relaxed text-text-dim flex-1">
                  {build.desc}
                </p>
                <span className="font-mono text-[11px] uppercase tracking-wide text-text-faint group-hover:text-text transition-colors">
                  {build.linkLabel ?? "GitHub ↗"}
                </span>
              </a>
            ))}
          </div>
        </section>

        <RelatedLinks
          heading="How this work was built"
          links={[
            {
              href: "/services/full-stack-product",
              label: "Full-stack product engineering",
              hint: "Cadence and SimpleOps sit here.",
            },
            {
              href: "/services/growth-paid-acquisition",
              label: "Growth and paid acquisition",
              hint: "NPI, NSEC, and Smart Lawn Care.",
            },
            {
              href: "/services/systems-automation",
              label: "Systems and automation",
              hint: "Simple Solutions, GoHighLevel, n8n.",
            },
          ]}
        />
        <CtaBand />
      </main>
    </SiteChrome>
  );
}
