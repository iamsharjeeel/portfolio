import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between gap-3 px-4 sm:px-8 lg:px-14 py-4 sm:py-7 nav-blend">
      <span className="font-display font-extrabold text-[13px] sm:text-[15px] tracking-tight text-white whitespace-nowrap">
        SHARJEEL
      </span>
      <nav className="flex items-center gap-3 sm:gap-7 font-mono text-[11px] tracking-wider uppercase text-white">
        <a
          href="#work"
          className="opacity-60 hover:opacity-100 transition-opacity inline-flex items-center justify-center min-h-11 min-w-11 px-1"
        >
          Work
        </a>
        <a
          href="#stack"
          className="opacity-60 hover:opacity-100 transition-opacity inline-flex items-center justify-center min-h-11 min-w-11 px-1"
        >
          Stack
        </a>
        <a
          href="#contact"
          className="border border-white rounded-full px-3.5 sm:px-4 py-1.5 opacity-100 whitespace-nowrap inline-flex items-center min-h-11 sm:min-h-9"
        >
          Let&apos;s talk
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
