"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function HeroStatic() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const prismY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const indiaY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: "92vh",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        borderBottom: "2px solid #000",
        paddingTop: 80,
        paddingBottom: 64,
      }}
    >
      {/* Subtle grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(#00000009 1px, transparent 1px), linear-gradient(90deg, #00000009 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          pointerEvents: "none",
        }}
      />

      {/* Logo watermark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <Image
          src="/logo.svg"
          alt=""
          width={520}
          height={520}
          aria-hidden
          style={{ opacity: 0.035, width: "min(520px, 70vw)", height: "auto" }}
        />
      </div>

      {/* PRISM */}
      <motion.div
        style={{ textAlign: "center", width: "100%", y: prismY }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(5rem, 28vw, 22rem)",
            lineHeight: 0.82,
            color: "#000",
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          PRISM
        </h1>
      </motion.div>

      {/* Hero product image */}
      <motion.div
        style={{
          width: "min(300px, 60vw)",
          aspectRatio: "3/4",
          position: "relative",
          margin: "16px 0",
          overflow: "hidden",
          scale: imageScale,
          opacity: imageOpacity,
        }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/products/compression_half_black.png"
          alt="PRISM INDIA Compression"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </motion.div>

      {/* INDIA — outline */}
      <motion.div
        style={{ textAlign: "center", width: "100%", y: indiaY }}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(5rem, 28vw, 22rem)",
            lineHeight: 0.82,
            color: "transparent",
            WebkitTextStroke: "2px rgba(0,0,0,0.85)",
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          INDIA
        </h1>
      </motion.div>

      {/* Tagline + CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0, 0, 1] }}
        style={{ textAlign: "center", marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.62rem",
            fontWeight: 500,
            letterSpacing: "0.32em",
            color: "#999",
            textTransform: "uppercase",
          }}
        >
          GYM WEAR · MADE IN INDIA · SS 2025
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/catalog"
            style={{
              display: "inline-block",
              background: "#1a1a1a",
              color: "#fff",
              padding: "15px 40px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.62rem",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#000")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#1a1a1a")}
          >
            SHOP NOW
          </Link>
          <Link
            href="/about"
            style={{
              display: "inline-block",
              background: "transparent",
              color: "#1a1a1a",
              padding: "15px 40px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.62rem",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: "1px solid #d0d0d0",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "#1a1a1a")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "#d0d0d0")}
          >
            OUR STORY
          </Link>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          right: "clamp(1.5rem, 4vw, 3rem)",
          bottom: 40,
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
            fontSize: "0.5rem",
            fontWeight: 500,
            letterSpacing: "0.3em",
            color: "#999",
            textTransform: "uppercase",
          }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          style={{
            width: 1,
            height: 48,
            background: "#000",
            transformOrigin: "top",
          }}
        />
      </div>
    </section>
  );
}
