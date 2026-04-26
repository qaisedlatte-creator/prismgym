"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function HeroStatic() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      style={{ position: "relative", height: "100dvh", minHeight: 600, overflow: "hidden", background: "#000" }}
    >
      {/* Full-bleed background */}
      <motion.div style={{ position: "absolute", inset: 0, scale: imageScale }}>
        <Image
          src="/products/compression_half_black.png"
          alt="PRISM INDIA"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "50% 0%", transform: "scale(1.08)", transformOrigin: "center top" }}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.95) 100%)"
      }} />

      {/* Main content — centered */}
      <motion.div
        style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center",
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
          paddingBottom: "8vh",
          y: textY,
        }}
      >
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 24 }}
        >
          <Image
            src="/logo-mark.png"
            alt="PRISM"
            width={110}
            height={110}
            priority
            style={{ width: "clamp(72px, 12vw, 110px)", height: "auto", filter: "invert(1)" }}
          />
        </motion.div>

        {/* PRISM INDIA heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(5rem, 22vw, 16rem)",
            lineHeight: 0.85,
            color: "#fff",
            letterSpacing: "0.04em",
            margin: 0,
          }}
        >
          PRISM
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(5rem, 22vw, 16rem)",
            lineHeight: 0.85,
            color: "transparent",
            WebkitTextStroke: "2px rgba(255,255,255,0.75)",
            letterSpacing: "0.04em",
            margin: 0,
            marginBottom: 28,
          }}
        >
          INDIA
        </motion.h1>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0, 0, 1] }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.62rem",
            fontWeight: 500,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            marginBottom: 32,
          }}
        >
          GYM WEAR · MADE IN INDIA · SS 2025
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.25, 0, 0, 1] }}
          style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}
        >
          <Link
            href="/catalog"
            style={{
              display: "inline-block", background: "#fff", color: "#000",
              padding: "14px 40px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", fontWeight: 500,
              letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none",
            }}
          >
            SHOP NOW
          </Link>
          <Link
            href="/about"
            style={{
              display: "inline-block", background: "transparent", color: "#fff",
              padding: "14px 40px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", fontWeight: 500,
              letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.45)",
            }}
          >
            OUR STORY
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", right: "clamp(1.5rem, 4vw, 3rem)", bottom: "clamp(2rem, 5vh, 4rem)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
      }}>
        <span style={{ writingMode: "vertical-rl", fontFamily: "'DM Sans', sans-serif", fontSize: "0.48rem", fontWeight: 500, letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
          SCROLL
        </span>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ width: 1, height: 48, background: "rgba(255,255,255,0.45)", transformOrigin: "top" }}
        />
      </div>
    </section>
  );
}
