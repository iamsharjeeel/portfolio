"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/projects";

const WorkBackdrop = dynamic(() => import("./WorkBackdrop"), { ssr: false });

export default function Work() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const track = trackRef.current;
    const pin = pinRef.current;
    const progress = progressRef.current;
    if (!track || !pin || !progress) return;

    let st: ScrollTrigger | null = null;

    function init() {
      if (!track || !pin) return;
      if (st) st.kill();
      gsap.set(track, { x: 0 });

      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = Math.max(0, trackWidth - viewportWidth + 80);

      st = ScrollTrigger.create({
        trigger: pin,
        start: "top top",
        end: () => "+=" + scrollDistance,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(track, { x: -scrollDistance * self.progress });
          if (progress) {
            progress.style.width = self.progress * 100 + "%";
          }
          const layers = track.querySelectorAll(".project-parallax");
          layers.forEach((layer) => {
            gsap.set(layer, { x: scrollDistance * self.progress * 0.06 });
          });
        },
      });
    }

    // wait for fonts/layout to settle
    const t = setTimeout(() => {
      init();
      ScrollTrigger.refresh();
    }, 100);

    function onResize() {
      init();
      ScrollTrigger.refresh();
    }
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
      if (st) st.kill();
    };
  }, []);

  return (
    <section
      ref={pinRef}
      id="work"
      className="h-screen relative overflow-hidden border-t border-line"
    >
      <div className="h-full flex items-center pl-5 sm:pl-8 lg:pl-14">
        <div ref={trackRef} className="flex gap-[5vw] items-center will-change-transform">
          <div className="min-w-[80vw] md:min-w-[38vw] flex-shrink-0 relative">
            <WorkBackdrop />
            <div className="relative z-[1]">
              <div className="font-mono text-xs text-text-faint tracking-wider uppercase mb-4.5">
                // Selected work — 03
              </div>
              <div className="font-display font-black text-[clamp(38px,6.4vw,84px)] leading-[0.95] tracking-[-0.03em] uppercase">
                SHIPPED
                <br />
                NOT JUST
                <br />
                SHIPPED-LOOKING
              </div>
            </div>
          </div>

          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-10 left-5 sm:left-8 lg:left-14 right-5 sm:right-8 lg:right-14 h-px bg-line">
        <div ref={progressRef} className="h-full bg-accent w-0" />
      </div>
    </section>
  );
}
