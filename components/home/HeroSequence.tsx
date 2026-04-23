"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 40;

export function HeroSequence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas to pixel-perfect viewport size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Detect mobile once
    const isMobile = window.innerWidth < 768;
    const folder = isMobile ? "mobile" : "desktop";

    // Preload ALL frames — store in ref array so no React state
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    imagesRef.current = images;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = `/hero/${folder}/frame_${String(i + 1).padStart(3, "0")}.jpg`;
      img.onload = () => {
        images[i] = img;
        // Draw first frame the moment it loads
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
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    // object-fit: cover math
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.drawImage(img, sx, sy, sw, sh);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionH = sectionRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / sectionH));
      const index = Math.min(Math.floor(progress * FRAME_COUNT), FRAME_COUNT - 1);

      if (index !== currentFrameRef.current) {
        currentFrameRef.current = index;
        // Cancel pending frame and schedule a new one
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(index));
      }

      // Update scroll indicator opacity without React state
      if (indicatorRef.current) {
        indicatorRef.current.style.opacity = index < 8 ? "1" : "0";
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
        <canvas
          ref={canvasRef}
          style={{ display: "block", width: "100%", height: "100%" }}
        />
        <div
          ref={indicatorRef}
          style={{
            position: "absolute",
            bottom: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            opacity: 1,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
              marginBottom: 0,
            }}
          >
            SCROLL TO EXPLORE
          </p>
          <div
            style={{
              margin: "8px auto 0",
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
