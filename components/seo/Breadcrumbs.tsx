import Link from "next/link";

export type Crumb = {
  name: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-text-faint">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.name} className="inline-flex items-center gap-2">
              {index > 0 ? <span aria-hidden>/</span> : null}
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="hover:text-text transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <span className={last ? "text-text-dim" : undefined}>
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
