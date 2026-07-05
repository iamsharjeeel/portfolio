export type ProjectVisualKind =
  | "saas"
  | "growth"
  | "landing"
  | "product"
  | "tasks"
  | "lawn";

interface ProjectVisualProps {
  kind: ProjectVisualKind;
  /** flagship cards use a larger icon footprint */
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
      className={`text-accent opacity-[0.22] ${dim} ${className}`}
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

/** Clock face + calendar grid — timesheet / SaaS */
function SaasIcon() {
  return (
    <>
      <circle cx="42" cy="42" r="22" />
      <path d="M42 42v-10M42 42h8" />
      <path d="M72 18h28v28H72z" />
      <path d="M72 34h28M86 18v28" />
      <path d="M18 72h22v22H18z" />
      <path d="M18 83h22M29 72v22" />
      <path d="M52 72h22v22H52z" />
      <path d="M52 83h22M63 72v22" />
      <path d="M86 72h16v16H86z" />
    </>
  );
}

/** Upward trend + bar chart — growth / case study */
function GrowthIcon() {
  return (
    <>
      <path d="M18 92V28" />
      <path d="M18 92h84" />
      <rect x="28" y="62" width="12" height="30" rx="1" />
      <rect x="48" y="48" width="12" height="44" rx="1" />
      <rect x="68" y="34" width="12" height="58" rx="1" />
      <path d="M28 70l22-18 18 10 24-32" />
      <circle cx="28" cy="70" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="50" cy="52" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="68" cy="62" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="92" cy="30" r="2.5" fill="currentColor" stroke="none" />
    </>
  );
}

/** Diamond + orbit lines — sports / conversion landing */
function LandingIcon() {
  return (
    <>
      <path d="M60 22l32 18-32 58L28 40z" />
      <path d="M60 22v58M28 40h64" />
      <circle cx="60" cy="40" r="6" />
      <path d="M60 16v6M60 86v6M16 60h6M98 60h6" />
    </>
  );
}

/** Connected nodes — agency / product platform */
function ProductIcon() {
  return (
    <>
      <circle cx="60" cy="36" r="10" />
      <circle cx="34" cy="78" r="10" />
      <circle cx="86" cy="78" r="10" />
      <path d="M60 46L38 70M60 46l22 24M44 78h32" />
      <circle cx="60" cy="60" r="4" />
    </>
  );
}

/** Checklist + rows — task management */
function TasksIcon() {
  return (
    <>
      <path d="M28 32h52M28 52h52M28 72h36" />
      <rect x="20" y="26" width="10" height="10" rx="2" />
      <rect x="20" y="46" width="10" height="10" rx="2" />
      <rect x="20" y="66" width="10" height="10" rx="2" />
      <path d="M23 31l2 2 5-5M23 51l2 2 5-5" />
    </>
  );
}

/** Minimal leaf + grid — lawn / local service */
function LawnIcon() {
  return (
    <>
      <path d="M60 92V48" />
      <path d="M60 48c-14-18-28-8-28 4s14 22 28 10" />
      <path d="M60 48c14-18 28-8 28 4s-14 22-28 10" />
      <path d="M24 92h72" />
      <path d="M30 92v-8M50 92v-12M70 92v-6M90 92v-10" />
    </>
  );
}
