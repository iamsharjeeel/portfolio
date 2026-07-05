import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-5 sm:px-8 lg:px-14 py-7 nav-blend">
      <span className="font-display font-extrabold text-[15px] tracking-tight text-white">
        SHARJEEL
      </span>
      <nav className="flex items-center gap-7 font-mono text-[11px] tracking-wider uppercase text-white">
        <a href="#work" className="opacity-60 hover:opacity-100 transition-opacity">
          Work
        </a>
        <a href="#stack" className="opacity-60 hover:opacity-100 transition-opacity">
          Stack
        </a>
        <a
          href="#contact"
          className="border border-white rounded-full px-4 py-1.5 opacity-100"
        >
          Let&apos;s talk
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
