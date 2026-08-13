import Link from "next/link";

export type RelatedLink = {
  href: string;
  label: string;
  hint: string;
};

export default function RelatedLinks({
  heading,
  links,
}: {
  heading: string;
  links: RelatedLink[];
}) {
  return (
    <section className="px-5 sm:px-8 lg:px-14 py-16 border-t border-line">
      <h2 className="font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-[-0.02em] uppercase mb-8">
        {heading}
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
        {links.map((link) => (
          <li key={link.href} className="bg-bg">
            <Link
              href={link.href}
              className="block p-6 sm:p-7 h-full hover:bg-bg-raised transition-colors"
            >
              <span className="font-display font-bold text-[16px] tracking-[-0.01em]">
                {link.label}
              </span>
              <p className="mt-2 text-[13.5px] leading-relaxed text-text-dim">
                {link.hint}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
