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
          { opacity: 0, scale: 1.04 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
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
      className="relative min-h-[80vh] flex items-center px-5 sm:px-8 lg:px-14 py-28 border-t border-line overflow-hidden"
    >
      <div
        ref={photoRef}
        className="pointer-events-none absolute inset-y-0 left-0 w-full md:w-[58%] opacity-0"
        aria-hidden
      >
        <Image
          src="/sharjeel-headshot.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 58vw"
          priority={false}
          className="object-cover object-[center_18%] grayscale contrast-[1.05] brightness-[0.72] saturate-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/25 via-bg/55 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/50 via-transparent to-bg/90" />
        <div className="absolute inset-0 md:hidden bg-bg/55" />
      </div>

      <div className="relative z-[1] grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-10 md:gap-16 w-full">
        <div className="font-mono text-xs tracking-widest uppercase text-text-faint md:pt-2">
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
