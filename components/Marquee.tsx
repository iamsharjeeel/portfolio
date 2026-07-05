const TAGS = ["NEXT.JS", "META ADS", "GOHIGHLEVEL", "SUPABASE"];

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

export default function Marquee() {
  const items = [...TAGS, ...TAGS];

  return (
    <div className="marquee-strip py-9 bg-accent my-16 overflow-hidden whitespace-nowrap">
      <div className="marquee-track">
        <span className="font-display font-black text-[clamp(28px,4.5vw,56px)] uppercase text-bg tracking-[-0.02em] inline-flex items-center gap-10">
          {items.map((tag, i) => (
            <span key={i} className="inline-flex items-center gap-10">
              {tag}
              <Dot />
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
