import Link from "next/link";
import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <SiteChrome>
      <main
        id="main"
        className="min-h-[80vh] flex flex-col justify-center px-5 sm:px-8 lg:px-14 pt-32 pb-20"
      >
        <p className="font-mono text-xs tracking-widest uppercase text-text-faint mb-5">
          404
        </p>
        <h1 className="font-display font-black uppercase leading-[0.88] tracking-[-0.045em] text-[clamp(40px,7vw,96px)]">
          This page
          <br />
          isn&apos;t here
        </h1>
        <p className="mt-8 max-w-[480px] text-[15px] leading-relaxed text-text-dim">
          The URL doesn&apos;t match a page on sharjeel.cc. Try selected work,
          about, or send a note.
        </p>
        <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 font-mono text-xs uppercase tracking-wide">
          <Link href="/" className="border-b border-text pb-1">
            Back to homepage
          </Link>
          <Link
            href="/work"
            className="text-text-dim hover:text-text border-b border-transparent hover:border-text pb-1"
          >
            Selected work
          </Link>
          <Link
            href="/contact"
            className="text-text-dim hover:text-text border-b border-transparent hover:border-text pb-1"
          >
            Contact
          </Link>
        </div>
      </main>
    </SiteChrome>
  );
}
