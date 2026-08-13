import Link from "next/link";
import HeaderNav from "./HeaderNav";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-100 nav-blend">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-bg focus:text-text focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase"
      >
        Skip to content
      </a>
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-14 py-3.5 sm:py-7">
        <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_1fr] items-center gap-x-3 gap-y-2">
          <Link
            href="/"
            className="font-display font-extrabold text-[13px] sm:text-[15px] tracking-tight text-white whitespace-nowrap justify-self-start"
          >
            SHARJEEL
          </Link>
          <HeaderNav />
        </div>
      </div>
    </header>
  );
}
