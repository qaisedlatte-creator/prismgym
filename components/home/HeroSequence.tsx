"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const DESKTOP_FRAME_COUNT = 40;
const MOBILE_FRAME_COUNT = 40;

export function HeroSequence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [frameIndex, setFrameIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Preload first 5 frames on mount
  useEffect(() => {
    const folder = isMobile ? "mobile" : "desktop";
    for (let i = 1; i <= 5; i++) {
      const img = new window.Image();
      img.src = `/hero/${folder}/frame_${String(i).padStart(3, "0")}.jpg`;
    }
  }, [isMobile]);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / sectionHeight));
    const frameCount = isMobile ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT;
    const index = Math.min(Math.floor(progress * frameCount) + 1, frameCount);
    setFrameIndex(index);
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const folder = isMobile ? "mobile" : "desktop";
  const frameSrc = `/hero/${folder}/frame_${String(frameIndex).padStart(3, "0")}.jpg`;

  return (
    <section ref={sectionRef} style={{ height: "400vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <img
          src={frameSrc}
          alt="Prism India"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            opacity: frameIndex < 10 ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
            }}
          >
            SCROLL TO EXPLORE
          </p>
          <div
            style={{
              margin: "8px auto 0",
              width: "1px",
              height: "48px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
