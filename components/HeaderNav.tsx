"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { trackEvent } from "@/lib/analytics";

const linkClass =
  "opacity-60 hover:opacity-100 transition-opacity inline-flex items-center justify-center min-h-9 px-1";
const mobileLinkClass =
  "opacity-60 hover:opacity-100 transition-opacity inline-flex items-center justify-center min-h-11 px-2";

export default function HeaderNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const workHref = isHome ? "#work" : "/work";
  const contactHref = isHome ? "#contact" : "/contact";

  return (
    <>
      <nav
        aria-label="Primary"
        className="hidden sm:flex items-center justify-center gap-7 font-mono text-[11px] tracking-wider uppercase text-white"
      >
        <Link href={workHref} className={linkClass}>
          Work
        </Link>
        {isHome ? (
          <a href="#stack" className={linkClass}>
            Stack
          </a>
        ) : (
          <Link href="/about" className={linkClass}>
            About
          </Link>
        )}
      </nav>
      <div className="flex items-center justify-self-end gap-2.5 sm:gap-3">
        <nav
          aria-label="Primary mobile"
          className="flex sm:hidden items-center gap-1 font-mono text-[10px] tracking-wider uppercase text-white"
        >
          <Link href={workHref} className={mobileLinkClass}>
            Work
          </Link>
          {isHome ? (
            <a href="#stack" className={mobileLinkClass}>
              Stack
            </a>
          ) : (
            <Link href="/about" className={mobileLinkClass}>
              About
            </Link>
          )}
        </nav>
        <Link
          href={contactHref}
          onClick={() => trackEvent("contact_cta_click", { location: "header" })}
          className="hidden sm:inline-flex border border-white rounded-full px-3 sm:px-4 py-1.5 text-white font-mono text-[10px] sm:text-[11px] tracking-wider uppercase whitespace-nowrap items-center min-h-10 sm:min-h-9"
        >
          Let&apos;s talk
        </Link>
        <Link
          href="/book"
          onClick={() => trackEvent("booking_cta_click", { location: "header" })}
          className="rounded-full px-3 sm:px-4 py-1.5 bg-accent text-bg font-mono text-[10px] sm:text-[11px] tracking-wider uppercase whitespace-nowrap inline-flex items-center min-h-10 sm:min-h-9"
        >
          Book
        </Link>
        <ThemeToggle />
      </div>
    </>
  );
}
