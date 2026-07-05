"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { snippets } from "@/lib/content";

export default function CodePanel({ glowColor }: { glowColor: string }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [filename, setFilename] = useState(snippets[0].file);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    function typeSnippet(idx: number, initialDelay = 0) {
      const snippet = snippets[idx];
      setFilename(snippet.file);
      if (!body) return;
      body.innerHTML = "";
      snippet.lines.forEach((line, i) => {
        const div = document.createElement("div");
        div.className = "code-line";
        div.innerHTML = line;
        body.appendChild(div);
        gsap.to(div, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: initialDelay + i * 0.09,
          ease: "power1.out",
        });
      });
    }

    typeSnippet(0, 0.9);

    const interval = setInterval(() => {
      setSnippetIndex((prev) => {
        const next = (prev + 1) % snippets.length;
        gsap.to(body, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            typeSnippet(next, 0);
            gsap.to(body, { opacity: 1, duration: 0.3 });
          },
        });
        return next;
      });
    }, 6000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id="code-panel"
      className="code-panel absolute top-[6vh] md:top-[14vh] left-5 right-5 md:left-auto md:right-8 lg:right-14 w-auto md:w-[min(480px,42vw)] bg-bg-raised border border-line rounded-xl overflow-hidden font-mono text-[9px] md:text-[12.5px] leading-[1.6] md:leading-[1.7] transition-shadow duration-500"
      style={{ boxShadow: `0 40px 90px -20px ${glowColor}22` }}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line">
        <div className="w-[9px] h-[9px] rounded-full" style={{ background: "#FF5F57" }} />
        <div className="w-[9px] h-[9px] rounded-full" style={{ background: "#FEBC2E" }} />
        <div className="w-[9px] h-[9px] rounded-full" style={{ background: "#28C840" }} />
        <span className="ml-2 text-[11px] text-text-dim">{filename}</span>
      </div>
      <div ref={bodyRef} className="p-3.5 md:p-5 min-h-[180px] md:min-h-[280px] text-text-dim" />
    </div>
  );
}
