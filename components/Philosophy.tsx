"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!textRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
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
      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="philosophy relative px-5 sm:px-8 lg:px-14 py-28 border-t overflow-hidden"
    >
      <div className="relative z-[1] grid grid-cols-1 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.35fr)] gap-10 md:gap-12 lg:gap-16 w-full md:items-stretch">
        <div className="flex flex-col gap-5 min-h-0">
          <div className="font-mono text-xs tracking-widest uppercase text-text-faint shrink-0">
            // Philosophy
          </div>
          <div
            ref={photoRef}
            className="philosophy-photo relative flex-1 w-full min-h-[280px] sm:min-h-[340px] md:min-h-0 opacity-0"
          >
            <Image
              src="/sharjeel-headshot.png"
              alt="Sharjeel"
              fill
              sizes="(max-width: 768px) 90vw, 42vw"
              priority={false}
              className="object-cover object-[center_12%] grayscale contrast-[1.06] brightness-[0.82] saturate-0"
            />
            <div className="philosophy-fade philosophy-fade-r" />
            <div className="philosophy-fade philosophy-fade-b" />
            <div className="philosophy-fade philosophy-fade-t" />
          </div>
        </div>
        <div
          ref={textRef}
          className="text-[clamp(24px,3.4vw,44px)] leading-[1.35] font-medium tracking-[-0.01em] self-center"
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
