"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CodePanel from "./CodePanel";
import { heroWords } from "@/lib/content";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const rotatorRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const [glowColor, setGlowColor] = useState(heroWords[0].c);
  const currentWordIdx = useRef(-1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    function setHeroWord(idx: number) {
      if (idx === currentWordIdx.current) return;
      currentWordIdx.current = idx;
      const item = heroWords[idx];
      const rotator = rotatorRef.current;
      if (!rotator) return;
      gsap.to(rotator, {
        opacity: 0,
        y: -14,
        duration: 0.25,
        onComplete: () => {
          rotator.textContent = item.w;
          rotator.style.color = item.c;
          setGlowColor(item.c);
          gsap.fromTo(
            rotator,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.3 }
          );
        },
      });
    }
    setHeroWord(0);

    const st = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      // Extra scroll room so four word states feel intentional, not rushed at exit
      end: "+=120%",
      scrub: 0.4,
      onUpdate: (self) => {
        const n = heroWords.length;
        const segment = 1 / n;
        // Centered buckets so the first word changes soon after scroll begins
        const idx = Math.min(
          n - 1,
          Math.floor((self.progress + segment * 0.5) / segment)
        );
        setHeroWord(idx);
      },
    });

    // load-in sequence
    const spans = headlineRef.current?.querySelectorAll("span[data-line]");
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      eyebrowRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
      .fromTo(
        spans || [],
        { opacity: 0, y: "100%" },
        { opacity: 1, y: "0%", duration: 0.9, stagger: 0.08 },
        "-=0.3"
      )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.5"
      );

    return () => {
      st.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="h-screen flex flex-col justify-end px-5 sm:px-8 lg:px-14 pb-16 relative"
    >
      <CodePanel glowColor={glowColor} />

      <div
        ref={eyebrowRef}
        className="font-mono text-xs tracking-widest uppercase text-text-dim mb-5 flex gap-2.5 items-center opacity-0"
      >
        <span className="w-[7px] h-[7px] rounded-full bg-accent-green inline-block pulse-dot" />
        Available for select projects
      </div>

      <h1
        ref={headlineRef}
        className="font-display font-black uppercase leading-[0.88] tracking-[-0.045em] text-[clamp(48px,10vw,148px)] flex flex-wrap gap-x-[22px]"
      >
        <span className="reveal-mask">
          <span data-line className="inline-block">
            BUILD.
          </span>
        </span>
        <span className="reveal-mask">
          <span data-line className="inline-block">
            DEPLOY.
          </span>
        </span>
        <br />
        <span className="reveal-mask">
          <span data-line className="inline-block text-accent">
            <span ref={rotatorRef}>SCALE.</span>
          </span>
        </span>
      </h1>

      <div
        ref={subRef}
        className="flex justify-between items-end mt-10 gap-10 flex-wrap opacity-0"
      >
        <p className="max-w-[420px] text-[15px] leading-relaxed text-text-dim">
          I&apos;m Sharjeel — a full-stack developer and growth engineer. I write
          the code and run the ads, so the product and the pipeline are never
          two different problems.
        </p>
        <div className="font-mono text-[11px] tracking-widest uppercase text-text-faint flex items-center gap-2.5">
          <div className="scroll-line" />
          Scroll
        </div>
      </div>
    </section>
  );
}
