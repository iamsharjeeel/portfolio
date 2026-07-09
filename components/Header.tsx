import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-100 nav-blend">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-14 py-3.5 sm:py-7">
        <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_1fr] items-center gap-x-3 gap-y-2">
          <span className="font-display font-extrabold text-[13px] sm:text-[15px] tracking-tight text-white whitespace-nowrap justify-self-start">
            SHARJEEL
          </span>

          <nav className="hidden sm:flex items-center justify-center gap-7 font-mono text-[11px] tracking-wider uppercase text-white">
            <a
              href="#work"
              className="opacity-60 hover:opacity-100 transition-opacity inline-flex items-center justify-center min-h-9 px-1"
            >
              Work
            </a>
            <a
              href="#stack"
              className="opacity-60 hover:opacity-100 transition-opacity inline-flex items-center justify-center min-h-9 px-1"
            >
              Stack
            </a>
          </nav>

          <div className="flex items-center justify-self-end gap-2.5 sm:gap-3">
            <nav className="flex sm:hidden items-center gap-1 font-mono text-[10px] tracking-wider uppercase text-white">
              <a
                href="#work"
                className="opacity-60 hover:opacity-100 transition-opacity inline-flex items-center justify-center min-h-11 px-2"
              >
                Work
              </a>
              <a
                href="#stack"
                className="opacity-60 hover:opacity-100 transition-opacity inline-flex items-center justify-center min-h-11 px-2"
              >
                Stack
              </a>
            </nav>
            <a
              href="#contact"
              className="border border-white rounded-full px-3 sm:px-4 py-1.5 text-white font-mono text-[10px] sm:text-[11px] tracking-wider uppercase whitespace-nowrap inline-flex items-center min-h-10 sm:min-h-9"
            >
              Let&apos;s talk
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
