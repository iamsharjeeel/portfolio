export type ProjectVisualKind =
  | "saas"
  | "growth"
  | "landing"
  | "product"
  | "tasks"
  | "lawn";

interface ProjectVisualProps {
  kind: ProjectVisualKind;
  size?: "lg" | "sm";
  className?: string;
}

const stroke = "currentColor";

export default function ProjectVisual({
  kind,
  size = "lg",
  className = "",
}: ProjectVisualProps) {
  const dim = size === "lg" ? "w-[min(52vw,220px)] h-[min(52vw,220px)]" : "w-16 h-16";

  return (
    <div
      className={`project-visual text-accent opacity-[0.28] ${dim} ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        className="w-full h-full"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {kind === "saas" && <SaasIcon />}
        {kind === "growth" && <GrowthIcon />}
        {kind === "landing" && <LandingIcon />}
        {kind === "product" && <ProductIcon />}
        {kind === "tasks" && <TasksIcon />}
        {kind === "lawn" && <LawnIcon />}
      </svg>
    </div>
  );
}

function SaasIcon() {
  return (
    <>
      <g className="pv-saas-clock" style={{ transformOrigin: "42px 42px" }}>
        <circle cx="42" cy="42" r="22" />
        <path className="pv-saas-hand-min" d="M42 42v-10" style={{ transformOrigin: "42px 42px" }} />
        <path className="pv-saas-hand-hr" d="M42 42h8" style={{ transformOrigin: "42px 42px" }} />
      </g>
      <g className="pv-saas-grid">
        <path d="M72 18h28v28H72z" />
        <path d="M72 34h28M86 18v28" />
        <path d="M18 72h22v22H18z" />
        <path d="M18 83h22M29 72v22" />
        <path d="M52 72h22v22H52z" />
        <path d="M52 83h22M63 72v22" />
        <path d="M86 72h16v16H86z" />
      </g>
    </>
  );
}

function GrowthIcon() {
  return (
    <>
      <path d="M18 92V28" />
      <path d="M18 92h84" />
      <rect className="pv-growth-bar pv-growth-bar-1" x="28" y="62" width="12" height="30" rx="1" />
      <rect className="pv-growth-bar pv-growth-bar-2" x="48" y="48" width="12" height="44" rx="1" />
      <rect className="pv-growth-bar pv-growth-bar-3" x="68" y="34" width="12" height="58" rx="1" />
      <path className="pv-growth-line" d="M28 70l22-18 18 10 24-32" />
      <circle className="pv-growth-dot pv-growth-dot-1" cx="28" cy="70" r="2.5" fill="currentColor" stroke="none" />
      <circle className="pv-growth-dot pv-growth-dot-2" cx="50" cy="52" r="2.5" fill="currentColor" stroke="none" />
      <circle className="pv-growth-dot pv-growth-dot-3" cx="68" cy="62" r="2.5" fill="currentColor" stroke="none" />
      <circle className="pv-growth-dot pv-growth-dot-4" cx="92" cy="30" r="2.5" fill="currentColor" stroke="none" />
    </>
  );
}

function LandingIcon() {
  return (
    <>
      <g className="pv-landing-diamond" style={{ transformOrigin: "60px 60px" }}>
        <path d="M60 22l32 18-32 58L28 40z" />
        <path d="M60 22v58M28 40h64" />
        <circle cx="60" cy="40" r="6" />
      </g>
      <g className="pv-landing-orbit">
        <path d="M60 16v6M60 86v6M16 60h6M98 60h6" />
      </g>
    </>
  );
}

function ProductIcon() {
  return (
    <>
      <circle className="pv-product-node pv-product-node-1" cx="60" cy="36" r="10" />
      <circle className="pv-product-node pv-product-node-2" cx="34" cy="78" r="10" />
      <circle className="pv-product-node pv-product-node-3" cx="86" cy="78" r="10" />
      <path className="pv-product-links" d="M60 46L38 70M60 46l22 24M44 78h32" />
      <circle className="pv-product-core" cx="60" cy="60" r="4" />
    </>
  );
}

function TasksIcon() {
  return (
    <>
      <path className="pv-tasks-row pv-tasks-row-1" d="M28 32h52" />
      <path className="pv-tasks-row pv-tasks-row-2" d="M28 52h52" />
      <path className="pv-tasks-row pv-tasks-row-3" d="M28 72h36" />
      <rect x="20" y="26" width="10" height="10" rx="2" />
      <rect x="20" y="46" width="10" height="10" rx="2" />
      <rect x="20" y="66" width="10" height="10" rx="2" />
      <path className="pv-tasks-check pv-tasks-check-1" d="M23 31l2 2 5-5" />
      <path className="pv-tasks-check pv-tasks-check-2" d="M23 51l2 2 5-5" />
    </>
  );
}

function LawnIcon() {
  return (
    <>
      <path d="M60 92V48" />
      <path className="pv-lawn-leaf pv-lawn-leaf-l" d="M60 48c-14-18-28-8-28 4s14 22 28 10" />
      <path className="pv-lawn-leaf pv-lawn-leaf-r" d="M60 48c14-18 28-8 28 4s-14 22-28 10" />
      <path d="M24 92h72" />
      <path className="pv-lawn-blades" d="M30 92v-8M50 92v-12M70 92v-6M90 92v-10" />
    </>
  );
}
