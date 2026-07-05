const TAGS = [
  "NEXT.JS",
  "TYPESCRIPT",
  "REACT",
  "TAILWIND",
  "GSAP",
  "FRAMER MOTION",
  "SUPABASE",
  "POSTGRES",
  "VERCEL",
  "NODE.JS",
  "META ADS",
  "META CAPI",
  "GOOGLE ADS",
  "GOHIGHLEVEL",
  "N8N",
  "CURSOR",
];

function Dot() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="3"
    >
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function MarqueeGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <span className="marquee-group" aria-hidden={ariaHidden}>
      {TAGS.map((tag, i) => (
        <span key={i} className="marquee-item">
          {tag}
          <Dot />
        </span>
      ))}
    </span>
  );
}

export default function Marquee() {
  return (
    <div className="marquee-strip py-9 bg-accent my-16 overflow-hidden whitespace-nowrap">
      <div className="marquee-track font-display font-black text-[clamp(28px,4.5vw,56px)] uppercase text-bg tracking-[-0.02em]">
        {/* two identical groups tile seamlessly: the track slides exactly one
            group width (-50%), so the second copy lands where the first was */}
        <MarqueeGroup />
        <MarqueeGroup ariaHidden />
      </div>
    </div>
  );
}
