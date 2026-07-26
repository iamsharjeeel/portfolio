"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import CodePanel from "./CodePanel";
import { heroAvailability, heroGlow } from "@/lib/content";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spans = headlineRef.current?.querySelectorAll("span[data-line]");
    // gsap.from (not fromTo with an opacity-0 class) so the copy and the CTAs
    // are painted in the HTML and stay visible if JS never runs.
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(eyebrowRef.current, { opacity: 0, y: 12, duration: 0.6 })
      .from(
        spans || [],
        { opacity: 0, y: "100%", duration: 0.9, stagger: 0.08 },
        "-=0.3"
      )
      .from(subRef.current, { opacity: 0, y: 14, duration: 0.6 }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="h-screen flex flex-col justify-end px-5 sm:px-8 lg:px-14 pb-16 relative"
    >
      <CodePanel glowColor={heroGlow} />

      <div
        ref={eyebrowRef}
        className="font-mono text-xs tracking-widest uppercase text-text-dim mb-5 flex gap-2.5 items-center"
      >
        <span className="w-[7px] h-[7px] rounded-full bg-accent-green inline-block pulse-dot" />
        {heroAvailability}
      </div>

      {/* Headline size is capped so the longest line clears the code panel. */}
      <h1
        ref={headlineRef}
        className="font-display font-black uppercase leading-[0.9] tracking-[-0.04em] text-[clamp(34px,5.1vw,95px)] flex flex-col items-start"
      >
        <span className="reveal-mask">
          <span data-line className="inline-block">
            I build the site
          </span>
        </span>
        <span className="reveal-mask">
          <span data-line className="inline-block">
            and run the ads
          </span>
        </span>
        <span className="reveal-mask">
          <span data-line className="inline-block">
            that <span className="text-accent">fill it.</span>
          </span>
        </span>
      </h1>

      <div ref={subRef} className="mt-8 sm:mt-10 flex flex-col gap-5 sm:gap-6">
        <p className="max-w-[620px] text-[17px] sm:text-[19px] leading-[1.5] text-text">
          Full-stack developer and growth engineer for local service businesses
          and SMB SaaS. One person shipping the Next.js build, the Meta
          campaign, and the CRM automation — so the product and the pipeline
          are never two different problems.
        </p>

        <p className="font-mono text-[12.5px] sm:text-[13.5px] text-text-dim">
          <span className="text-accent-green">486 leads</span>
          <span aria-hidden> → </span>
          <span className="text-accent-green">214 booked tours</span>
          <span aria-hidden> → </span>
          <span className="text-accent-green">42 members closed</span>
          <span className="text-text-faint"> · NPI Youth Program</span>
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="mailto:hello@sharjeel.cc?subject=Project%20enquiry"
            className="inline-flex items-center min-h-12 px-6 rounded-full bg-accent text-bg font-mono text-[12px] tracking-wider uppercase hover:opacity-90 transition-opacity"
          >
            Start a project →
          </a>
          <a
            href="#work"
            className="inline-flex items-center min-h-12 px-6 rounded-full border border-text/30 font-mono text-[12px] tracking-wider uppercase hover:border-text transition-colors"
          >
            See the work ↓
          </a>
        </div>
      </div>
    </section>
  );
}
