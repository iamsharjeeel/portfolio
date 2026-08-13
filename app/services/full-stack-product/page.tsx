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

export const metadata = buildMetadata(pages.fullStack);

export default function FullStackPage() {
  return (
    <SiteChrome>
      <JsonLd
        data={jsonLdGraph([
          personJsonLd(),
          websiteJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Full-stack product", path: "/services/full-stack-product" },
          ]),
        ])}
      />
      <main id="main">
        <PageHeader
          eyebrow="// Full-stack"
          title="Product engineering, not page assembly"
          lede="I build the application: auth, roles, data, and the UI the operator actually uses. Cadence is the clearest public example."
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Full-stack product" },
          ]}
        />

        <section className="px-5 sm:px-8 lg:px-14 py-16 border-b border-line max-w-3xl">
          <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-6">
            The gap I refuse to leave
          </h2>
          <p className="text-[16px] leading-relaxed text-text-dim">
            A lot of “product work” stops at a marketing site. Operators still
            need timesheets, roles, payslips, tasks. I stay on the product
            until those pieces exist in production.
          </p>
        </section>

        <section className="px-5 sm:px-8 lg:px-14 py-16 border-b border-line">
          <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-8">
            Stack I actually ship with
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line">
            <div className="bg-bg p-7">
              <div className="font-mono text-[11px] text-text-faint uppercase tracking-wider mb-2.5">
                Frontend
              </div>
              <p className="text-[15px] leading-relaxed">
                Next.js, TypeScript, Tailwind, Framer Motion, GSAP, React
              </p>
            </div>
            <div className="bg-bg p-7">
              <div className="font-mono text-[11px] text-text-faint uppercase tracking-wider mb-2.5">
                Backend
              </div>
              <p className="text-[15px] leading-relaxed">
                Supabase, Postgres, Vercel, Node.js
              </p>
            </div>
          </div>
        </section>

        <section className="px-5 sm:px-8 lg:px-14 py-16 border-b border-line max-w-3xl">
          <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-6">
            Cadence
          </h2>
          <p className="text-[16px] leading-relaxed text-text-dim">
            Multi-tenant timesheet and HR portal built solo: role hierarchy,
            time entry, PDF payslips, leave management. Seven phases. Next.js
            14 App Router. Supabase. Shipped to production.
          </p>
        </section>

        <section className="px-5 sm:px-8 lg:px-14 py-16 max-w-3xl">
          <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-6">
            SimpleOps
          </h2>
          <p className="text-[16px] leading-relaxed text-text-dim">
            Task management under the Simple Solutions brand — “Ops,
            simplified.” Live at tasks.s1mplesolutions.cc. Own product, not a
            client mock.
          </p>
        </section>

        <RelatedLinks
          heading="See the work"
          links={[
            {
              href: "/work/cadence",
              label: "Cadence case study",
              hint: "The multi-tenant HR portal, in full.",
            },
            {
              href: "/services/systems-automation",
              label: "Systems and automation",
              hint: "When the product has to talk to the rest of the stack.",
            },
            {
              href: "/contact",
              label: "Start a product conversation",
              hint: "Portals, tenants, and the unglamorous admin UI.",
            },
          ]}
        />
        <CtaBand />
      </main>
    </SiteChrome>
  );
}
