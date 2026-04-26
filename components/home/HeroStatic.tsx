"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function HeroStatic() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: "100dvh",
        minHeight: 600,
        overflow: "hidden",
        background: "#0a0a0a",
      }}
    >
      {/* Full-bleed background image */}
      <motion.div style={{ position: "absolute", inset: 0, scale: imageScale }}>
        <Image
          src="/products/compression_half_black.png"
          alt="PRISM INDIA"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
      </motion.div>

      {/* Gradient overlay — dark at bottom for text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.75) 75%, rgba(0,0,0,0.92) 100%)",
        }}
      />

      {/* Content — bottom left */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "0 clamp(1.5rem, 5vw, 4rem) clamp(2.5rem, 6vh, 4.5rem)",
          y: textY,
        }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0, 0, 1] }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.6rem",
            fontWeight: 500,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            marginBottom: 16,
          }}
        >
          GYM WEAR · MADE IN INDIA · SS 2025
        </motion.p>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(4.5rem, 14vw, 11rem)",
              lineHeight: 0.88,
              color: "#fff",
              letterSpacing: "0.02em",
              margin: 0,
            }}
          >
            BUILT
          </h1>
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(4.5rem, 14vw, 11rem)",
              lineHeight: 0.88,
              color: "transparent",
              WebkitTextStroke: "2px rgba(255,255,255,0.85)",
              letterSpacing: "0.02em",
              margin: 0,
            }}
          >
            DIFFERENT.
          </h1>
        </motion.div>

        {/* Sub + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0, 0, 1] }}
          style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 24 }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 300,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 340,
              lineHeight: 1.6,
            }}
          >
            Precision-built for the Indian athlete. Second-skin compression. Made in India.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/catalog"
              style={{
                display: "inline-block",
                background: "#fff",
                color: "#000",
                padding: "14px 40px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.62rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#f0f0f0";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#fff";
              }}
            >
              SHOP NOW
            </Link>
            <Link
              href="/about"
              style={{
                display: "inline-block",
                background: "transparent",
                color: "#fff",
                padding: "14px 40px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.62rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.4)",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.4)";
              }}
            >
              OUR STORY
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          right: "clamp(1.5rem, 4vw, 3rem)",
          bottom: "clamp(2.5rem, 6vh, 4.5rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            writingMode: "vertical-rl",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.48rem",
            fontWeight: 500,
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.45)",
            textTransform: "uppercase",
          }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          style={{ width: 1, height: 48, background: "rgba(255,255,255,0.5)", transformOrigin: "top" }}
        />
      </div>
    </section>
  );
}
