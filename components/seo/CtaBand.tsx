import Link from "next/link";
import { SITE_EMAIL } from "@/lib/seo";

export default function CtaBand({
  eyebrow = "// Got a build, a campaign, or both",
}: {
  eyebrow?: string;
}) {
  return (
    <section className="px-5 sm:px-8 lg:px-14 py-20 border-t border-line">
      <p className="font-mono text-xs tracking-widest uppercase text-text-dim mb-6">
        {eyebrow}
      </p>
      <Link
        href="/contact"
        className="font-display font-black tracking-[-0.04em] text-[clamp(32px,6vw,72px)] leading-none hover:text-accent transition-colors inline-block"
      >
        Let&apos;s talk
      </Link>
      <div className="mt-6">
        <a
          href={`mailto:${SITE_EMAIL}`}
          className="font-mono text-xs uppercase tracking-wide text-text-dim hover:text-text transition-colors"
        >
          {SITE_EMAIL}
        </a>
      </div>
    </section>
  );
}
