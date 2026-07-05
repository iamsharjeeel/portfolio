import { builds } from "@/lib/builds";

export default function AlsoShipped() {
  return (
    <section id="builds" className="px-5 sm:px-8 lg:px-14 py-28 border-t border-line">
      <div className="flex justify-between items-baseline mb-12 gap-4 flex-wrap">
        <h2 className="font-display font-extrabold text-[clamp(28px,4vw,44px)] tracking-[-0.02em] uppercase">
          Also shipped
        </h2>
        <span className="font-mono text-xs text-text-faint">
          More builds, straight from GitHub
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
        {builds.map((b) => (
          <a
            key={b.name}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-bg p-6 sm:p-7 flex flex-col gap-3 min-h-[164px] transition-colors hover:bg-bg-raised"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-display font-bold text-[16px] tracking-[-0.01em] break-all">
                {b.name}
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-wider text-accent shrink-0">
                {b.lang}
              </span>
            </div>
            <p className="text-[13.5px] leading-relaxed text-text-dim flex-1">
              {b.desc}
            </p>
            <span className="font-mono text-[11px] uppercase tracking-wide text-text-faint group-hover:text-text transition-colors">
              GitHub ↗
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
