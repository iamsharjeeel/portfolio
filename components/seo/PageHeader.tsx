import Breadcrumbs, { type Crumb } from "./Breadcrumbs";

export default function PageHeader({
  eyebrow,
  title,
  lede,
  crumbs,
  align = "start",
}: {
  eyebrow: string;
  title: string;
  lede: string;
  crumbs: Crumb[];
  align?: "start" | "center";
}) {
  const centered = align === "center";
  return (
    <header
      className={`px-5 sm:px-8 lg:px-14 pt-32 pb-16 border-b border-line ${
        centered ? "text-center" : ""
      }`}
    >
      <div className={centered ? "flex justify-center" : undefined}>
        <Breadcrumbs items={crumbs} />
      </div>
      <p className="font-mono text-xs tracking-widest uppercase text-text-faint mb-5">
        {eyebrow}
      </p>
      <h1 className="font-display font-black uppercase leading-[0.88] tracking-[-0.045em] text-[clamp(40px,7vw,96px)]">
        {title}
      </h1>
      <p
        className={`mt-8 max-w-[540px] text-[15px] leading-relaxed text-text-dim ${
          centered ? "mx-auto" : ""
        }`}
      >
        {lede}
      </p>
    </header>
  );
}
