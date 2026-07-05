"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const visualRef = useRef<HTMLAnchorElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const visual = visualRef.current;
    const btn = btnRef.current;
    if (!visual || !btn) return;
    const rect = visual.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: relX * 0.35,
      y: relY * 0.35,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
    });
  }

  function handleLeave() {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  }

  return (
    <div className="work-card grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center w-[82vw] md:w-[min(64vw,760px)] flex-shrink-0">
      <a
        ref={visualRef}
        href={project.href}
        {...(project.href !== "#"
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        aria-label={`${project.title} — ${project.linkLabel}`}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="aspect-[4/3] md:aspect-[4/5] rounded-2xl relative overflow-hidden flex items-center justify-center border border-line"
      >
        <div
          className="parallax-layer project-parallax"
          style={{ background: "linear-gradient(160deg,#1A1A1A,#0A0A0A)" }}
        >
          <Image
            src={project.image}
            alt={`${project.title} — live site screenshot`}
            fill
            sizes="(min-width: 768px) 35vw, 82vw"
            className="object-cover object-top"
          />
          {/* keeps the number label and magnetic button legible on light screenshots */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/45" />
        </div>
        <span className="font-mono text-[13px] text-white/75 absolute top-5 left-5 z-[2]">
          {project.num}
        </span>
        <div ref={btnRef} className="magnetic-btn">
          <span>View</span>
        </div>
      </a>
      <div className="pr-0 md:pr-5">
        <span className="font-mono text-[11px] tracking-wider uppercase text-accent mb-4 inline-block">
          {project.tag}
        </span>
        <h3 className="font-display font-extrabold text-[clamp(22px,2.6vw,32px)] tracking-[-0.02em] mb-3.5">
          {project.title}
        </h3>
        <p className="text-[14.5px] leading-relaxed text-text-dim mb-5">
          {project.desc}
        </p>
        <div className="flex gap-7 mb-5">
          {project.stats.map((s) => (
            <div key={s.label}>
              <b className="block font-display font-extrabold text-[22px]">
                {s.value}
              </b>
              <span className="font-mono text-[10.5px] text-text-faint uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs tracking-wide uppercase inline-flex items-center gap-2 min-h-11"
        >
          <span className="border-b border-text pb-1">{project.linkLabel}</span>
        </a>
      </div>
    </div>
  );
}
