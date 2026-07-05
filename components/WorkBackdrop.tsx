"use client";

import { useEffect, useRef } from "react";

// Wireframe icosahedron rendered as plain SVG lines, rotated in JS.
// Deliberately dependency-free: a full Three.js scene is overkill for
// one low-opacity background shape.

const PHI = (1 + Math.sqrt(5)) / 2;

const VERTS: [number, number, number][] = [
  [-1, PHI, 0],
  [1, PHI, 0],
  [-1, -PHI, 0],
  [1, -PHI, 0],
  [0, -1, PHI],
  [0, 1, PHI],
  [0, -1, -PHI],
  [0, 1, -PHI],
  [PHI, 0, -1],
  [PHI, 0, 1],
  [-PHI, 0, -1],
  [-PHI, 0, 1],
];

const EDGES: [number, number][] = [];
for (let i = 0; i < VERTS.length; i++) {
  for (let j = i + 1; j < VERTS.length; j++) {
    const dx = VERTS[i][0] - VERTS[j][0];
    const dy = VERTS[i][1] - VERTS[j][1];
    const dz = VERTS[i][2] - VERTS[j][2];
    // icosahedron edge length is 2 for these coordinates
    if (Math.abs(dx * dx + dy * dy + dz * dz - 4) < 0.001) {
      EDGES.push([i, j]);
    }
  }
}

export default function WorkBackdrop() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lines = Array.from(svg.querySelectorAll("line"));
    let raf = 0;
    let rotX = 0.4;
    let rotY = 0;
    let lastTime = performance.now();
    let lastScrollY = window.scrollY;
    let boost = 0;

    function frame(now: number) {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      // Subtle scroll reaction: spin faster while the page is scrolling
      // (which is also what drives the horizontal pin scrub).
      const scrollY = window.scrollY;
      const velocity = Math.abs(scrollY - lastScrollY) / Math.max(dt, 0.001);
      lastScrollY = scrollY;
      const targetBoost = Math.min(1.6, velocity * 0.0009);
      boost += (targetBoost - boost) * 0.08;

      const speed = 0.22 + boost;
      rotY += speed * dt;
      rotX += speed * 0.45 * dt;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projected = VERTS.map(([x, y, z]) => {
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        return [x1, y1, z2] as const;
      });

      EDGES.forEach(([a, b], i) => {
        const line = lines[i];
        const pa = projected[a];
        const pb = projected[b];
        line.setAttribute("x1", pa[0].toFixed(3));
        line.setAttribute("y1", pa[1].toFixed(3));
        line.setAttribute("x2", pb[0].toFixed(3));
        line.setAttribute("y2", pb[1].toFixed(3));
        // fade edges as they recede for a hint of depth
        const depth = (pa[2] + pb[2]) / 2;
        line.setAttribute(
          "stroke-opacity",
          (0.28 + depth * 0.12).toFixed(3)
        );
      });

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <svg
        ref={svgRef}
        viewBox="-2.6 -2.6 5.2 5.2"
        className="w-[min(52vw,560px)] h-[min(52vw,560px)] opacity-40"
        style={{ transform: "translateX(6%)" }}
      >
        {EDGES.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1="0"
            y1="0"
            x2="0"
            y2="0"
            stroke="var(--accent)"
            strokeWidth="0.014"
            strokeOpacity="0.3"
          />
        ))}
      </svg>
    </div>
  );
}
