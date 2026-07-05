"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ResultRow {
  name: string;
  client: string;
  metricA: string;
  metricB: string;
}

const results: ResultRow[] = [
  {
    name: "Newtown Performance Institute",
    client: "Youth performance program — Meta ads + landing page",
    metricA: "486 LEADS",
    metricB: "42 MEMBERS CLOSED",
  },
  {
    name: "NPI Tour Pipeline",
    client: "Lead → booked tour conversion",
    metricA: "214 TOURS BOOKED",
    metricB: "44% BOOK RATE",
  },
  {
    name: "Cadence",
    client: "Multi-tenant HR / timesheet SaaS — built solo",
    metricA: "7 BUILD PHASES",
    metricB: "SHIPPED TO PROD",
  },
];

export default function Results() {
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const rows = rowsRef.current?.querySelectorAll(".result-row");
    if (!rows) return;
    const triggers: ScrollTrigger[] = [];
    rows.forEach((row) => {
      const tween = gsap.fromTo(
        row,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 88%" },
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section className="px-5 sm:px-8 lg:px-14 py-24 border-t border-line">
      <div className="flex justify-between items-baseline mb-12 gap-4 flex-wrap">
        <h2 className="font-display font-extrabold text-[clamp(28px,4vw,44px)] tracking-[-0.02em] uppercase">
          Real numbers
        </h2>
        <span className="font-mono text-xs text-text-faint">
          Verified client outcomes
        </span>
      </div>
      <div ref={rowsRef}>
        {results.map((r, i) => (
          <div
            key={r.name}
            className={`result-row grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-4 sm:gap-6 items-center py-6 border-t border-line ${
              i === results.length - 1 ? "border-b" : ""
            }`}
          >
            <div>
              <div className="text-[clamp(18px,2.2vw,26px)] font-semibold tracking-[-0.01em]">
                {r.name}
              </div>
              <div className="font-mono text-xs text-text-faint mt-1">
                {r.client}
              </div>
            </div>
            <div className="font-mono text-[13px] text-accent-green sm:text-right min-w-[140px]">
              {r.metricA}
            </div>
            <div className="font-mono text-[13px] text-accent-green sm:text-right min-w-[140px]">
              {r.metricB}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
