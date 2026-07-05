"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Touch devices: skip all listeners/ticker work, not just the CSS hide.
    if (window.matchMedia("(hover: none)").matches) return;
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      if (cursor) {
        cursor.style.left = mx + "px";
        cursor.style.top = my + "px";
      }
    }
    window.addEventListener("mousemove", onMove);

    gsap.ticker.add(() => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ring) {
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
      }
    });

    function grow() {
      gsap.to(cursor, { width: 6, height: 6, duration: 0.25 });
      gsap.to(ring, { width: 54, height: 54, duration: 0.25 });
    }
    function shrink() {
      gsap.to(cursor, { width: 10, height: 10, duration: 0.25 });
      gsap.to(ring, { width: 36, height: 36, duration: 0.25 });
    }

    const hoverables = document.querySelectorAll(
      "a, button, .work-card, .result-row, [data-cursor-hover]"
    );
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}
