import Link from "next/link";
import { SITE_EMAIL } from "@/lib/seo";

const workLinks = [
  { href: "/work/cadence", label: "Cadence case study" },
  { href: "/work/npi-youth-program", label: "NPI Youth Program case study" },
  { href: "/work/nsec-baseball", label: "NSEC Baseball case study" },
];

const serviceLinks = [
  { href: "/services/full-stack-product", label: "Full-stack product engineering" },
  { href: "/services/growth-paid-acquisition", label: "Growth and paid acquisition" },
  { href: "/services/systems-automation", label: "Systems and automation" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 sm:px-8 lg:px-14 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-faint mb-4">
            Work
          </p>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/work"
                className="text-[14px] text-text-dim hover:text-text transition-colors"
              >
                Selected work
              </Link>
            </li>
            {workLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[14px] text-text-dim hover:text-text transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-faint mb-4">
            Services
          </p>
          <ul className="flex flex-col gap-2">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[14px] text-text-dim hover:text-text transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-faint mb-4">
            Site
          </p>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/about"
                className="text-[14px] text-text-dim hover:text-text transition-colors"
              >
                About Sharjeel
              </Link>
            </li>
            <li>
              <Link
                href="/book"
                className="text-[14px] text-text-dim hover:text-text transition-colors"
              >
                Book a call
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-[14px] text-text-dim hover:text-text transition-colors"
              >
                Contact and project inquiry
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="text-[14px] text-text-dim hover:text-text transition-colors"
              >
                {SITE_EMAIL}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-faint mb-4">
            Elsewhere
          </p>
          <ul className="flex flex-col gap-2">
            <li>
              <a
                href="https://www.linkedin.com/in/iamsharjeeel/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-text-dim hover:text-text transition-colors"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/iamsharjeeel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-text-dim hover:text-text transition-colors"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between font-mono text-[11px] text-text-faint flex-wrap gap-2.5 pt-6 border-t border-line">
        <span>© 2026 Sharjeel</span>
        <span>Open for select projects</span>
      </div>
    </footer>
  );
}
