const stack = [
  {
    label: "Frontend",
    tools: "Next.js, TypeScript, Tailwind, Framer Motion, GSAP, React",
  },
  {
    label: "Backend",
    tools: "Supabase, Postgres, Vercel, Node.js",
  },
  {
    label: "Growth",
    tools: "Meta Ads, Meta CAPI, GoHighLevel, Google Ads",
  },
  {
    label: "AI / Tooling",
    tools: "Claude Code, Cursor Composer, local Ollama, ChatGPT/Claude API",
  },
  {
    label: "Automation",
    tools: "n8n, GHL workflows, webhooks",
  },
];

export default function Stack() {
  return (
    <section id="stack" className="px-5 sm:px-8 lg:px-14 py-28 border-t border-line">
      <div className="flex justify-between items-baseline mb-12 gap-4 flex-wrap">
        <h2 className="font-display font-extrabold text-[clamp(28px,4vw,44px)] tracking-[-0.02em] uppercase">
          The stack
        </h2>
        <span className="font-mono text-xs text-text-faint">
          What&apos;s actually under the hood
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-line border border-line">
        {stack.map((s) => (
          <div key={s.label} className="stack-card bg-bg p-7">
            <div className="font-mono text-[11px] text-text-faint uppercase tracking-wider mb-2.5">
              {s.label}
            </div>
            <div className="text-[15px] leading-relaxed font-medium">
              {s.tools}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
