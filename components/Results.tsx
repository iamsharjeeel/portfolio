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
    name: "NPI Youth Program",
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

function parseMetric(raw: string): { value: number | null; suffix: string; label: string } {
  const match = raw.match(/^(\d+)(%?)\s*(.*)$/);
  if (!match) {
    return { value: null, suffix: "", label: raw };
  }
  return {
    value: Number(match[1]),
    suffix: match[2] || "",
    label: match[3] || "",
  };
}

function Metric({ text }: { text: string }) {
  const digitRef = useRef<HTMLSpanElement>(null);
  const parsed = parseMetric(text);

  function animateIn() {
    if (!digitRef.current || parsed.value === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const el = digitRef.current;
    const target = parsed.value;
    const obj = { n: 0 };
    gsap.killTweensOf(obj);
    gsap.killTweensOf(el);
    gsap.to(obj, {
      n: target,
      duration: 0.55,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = String(Math.round(obj.n));
      },
    });
    gsap.fromTo(
      el,
      { scale: 1 },
      { scale: 1.12, duration: 0.22, yoyo: true, repeat: 1, ease: "power2.out" }
    );
  }

  function reset() {
    if (!digitRef.current || parsed.value === null) return;
    const el = digitRef.current;
    gsap.killTweensOf(el);
    el.textContent = String(parsed.value);
    gsap.set(el, { scale: 1 });
  }

  if (parsed.value === null) {
    return (
      <div className="result-metric font-mono text-[13px] text-accent-green sm:text-right sm:min-w-[140px]">
        {text}
      </div>
    );
  }

  return (
    <div
      className="result-metric font-mono text-[13px] text-accent-green sm:text-right sm:min-w-[140px] cursor-default select-none"
      onMouseEnter={animateIn}
      onMouseLeave={reset}
    >
      <span ref={digitRef} className="result-digit inline-block origin-center will-change-transform">
        {parsed.value}
      </span>
      {parsed.suffix}
      {parsed.label ? ` ${parsed.label}` : ""}
    </div>
  );
}

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
            className={`result-row group relative grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-4 sm:gap-6 items-center py-6 border-t border-line opacity-0 ${
              i === results.length - 1 ? "border-b" : ""
            }`}
          >
            <div className="result-row-bg absolute inset-x-[-1.25rem] sm:inset-x-[-2rem] lg:inset-x-[-3.5rem] inset-y-0 pointer-events-none" />
            <div className="result-row-accent absolute left-[-1.25rem] sm:left-[-2rem] lg:left-[-3.5rem] top-0 bottom-0 w-[2px] bg-accent scale-y-0 origin-center pointer-events-none" />
            <div className="relative z-[1]">
              <div className="result-name text-[clamp(18px,2.2vw,26px)] font-semibold tracking-[-0.01em] transition-colors duration-300">
                {r.name}
              </div>
              <div className="font-mono text-xs text-text-faint mt-1">
                {r.client}
              </div>
            </div>
            <div className="relative z-[1] flex flex-wrap gap-x-6 gap-y-1 sm:contents">
              <Metric text={r.metricA} />
              <Metric text={r.metricB} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
