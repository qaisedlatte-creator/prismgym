"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const FRAME_COUNT = 40;

export function HeroSequence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const shopNowRef = useRef<HTMLDivElement>(null);
  const prismTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const isMobile = window.innerWidth < 768;
    const folder = isMobile ? "mobile" : "desktop";

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    imagesRef.current = images;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = `/hero/${folder}/frame_${String(i + 1).padStart(3, "0")}.jpg`;
      img.onload = () => {
        images[i] = img;
        if (i === 0) drawFrame(0);
      };
    }

    return () => window.removeEventListener("resize", resize);
  }, []);

  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const sw = img.naturalWidth * scale;
    const sh = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionH = sectionRef.current.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / sectionH));
      const index = Math.min(Math.floor(progress * FRAME_COUNT), FRAME_COUNT - 1);

      if (index !== currentFrameRef.current) {
        currentFrameRef.current = index;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(index));
      }

      // DOM mutations directly — zero React state overhead
      const showOverlay = index < 6;
      if (indicatorRef.current) indicatorRef.current.style.opacity = showOverlay ? "1" : "0";
      if (shopNowRef.current) shopNowRef.current.style.opacity = showOverlay ? "1" : "0";
      if (prismTextRef.current) {
        prismTextRef.current.style.opacity = index < 12 ? String(1 - index / 12) : "0";
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ height: "400vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {/* Canvas — frame sequence */}
        <canvas
          ref={canvasRef}
          style={{ display: "block", width: "100%", height: "100%" }}
        />

        {/* Giant PRISM text — oversized, bleeds off edges */}
        <div
          ref={prismTextRef}
          style={{
            position: "absolute",
            top: "8%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "140vw",
            textAlign: "center",
            pointerEvents: "none",
            transition: "opacity 0.15s ease",
          }}
        >
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(6rem, 22vw, 20rem)",
              lineHeight: 0.85,
              color: "rgba(255,255,255,0.92)",
              letterSpacing: "0.02em",
              display: "block",
              whiteSpace: "nowrap",
              textShadow: "0 4px 40px rgba(0,0,0,0.5)",
            }}
          >
            PRISM INDIA
          </span>
        </div>

        {/* SHOP NOW button */}
        <div
          ref={shopNowRef}
          style={{
            position: "absolute",
            bottom: "14%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            transition: "opacity 0.2s ease",
          }}
        >
          <Link
            href="/catalog"
            style={{
              display: "inline-block",
              background: "#ffffff",
              color: "#0a0a0a",
              padding: "14px 52px",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1rem",
              letterSpacing: "0.25em",
              textDecoration: "none",
              fontWeight: 400,
            }}
          >
            SHOP NOW
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          ref={indicatorRef}
          style={{
            position: "absolute",
            bottom: "6%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            transition: "opacity 0.2s ease",
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
            }}
          >
            SCROLL
          </p>
          <div
            style={{
              margin: "6px auto 0",
              width: "1px",
              height: "36px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
