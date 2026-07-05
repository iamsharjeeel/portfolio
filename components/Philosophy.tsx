"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Philosophy() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!textRef.current) return;
    const ctx = gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: textRef.current, start: "top 88%" },
      }
    );
    return () => {
      ctx.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section className="min-h-[80vh] flex items-center px-5 sm:px-8 lg:px-14 py-28 border-t border-line">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-6 md:gap-16 w-full">
        <div className="font-mono text-xs tracking-widest uppercase text-text-faint">
          // Philosophy
        </div>
        <div
          ref={textRef}
          className="text-[clamp(24px,3.4vw,44px)] leading-[1.35] font-medium tracking-[-0.01em]"
        >
          <span className="text-text-dim">
            Most agencies split design, dev, and ads into three handoffs — and
          </span>
          <span className="text-text font-bold">
            {" "}
            the client pays for the gaps between them.
          </span>
          <span className="text-text-dim">
            {" "}
            I close that gap. Same person writing the Next.js component, wiring
            the GHL automation, and diagnosing why the{" "}
          </span>
          <span className="text-text font-bold">Meta campaign</span>
          <span className="text-text-dim"> went flat. </span>
          <span className="text-text font-bold">
            One brain, fewer handoffs, faster fixes.
          </span>
        </div>
      </div>
    </section>
  );
}
