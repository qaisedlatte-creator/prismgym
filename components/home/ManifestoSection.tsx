"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export function ManifestoSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      ref={ref}
      style={{
        background: "#1a1a1a",
        padding: "clamp(5rem, 10vw, 9rem) clamp(1rem, 4vw, 3rem)",
        textAlign: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      <motion.div style={{ y }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0, 0, 1] }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.6rem",
            fontWeight: 500,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            marginBottom: 24,
          }}
        >
          THE PRISM ETHOS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3.5rem, 9vw, 7rem)",
            lineHeight: 0.9,
            color: "#fff",
            letterSpacing: "0.02em",
            marginBottom: 8,
          }}
        >
          TRAIN HARD.
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3.5rem, 9vw, 7rem)",
            lineHeight: 0.9,
            color: "transparent",
            WebkitTextStroke: "2px rgba(255,255,255,0.7)",
            letterSpacing: "0.02em",
            marginBottom: 40,
          }}
        >
          LOOK HARDER.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.25, 0, 0, 1] }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9rem",
            fontWeight: 300,
            color: "rgba(255,255,255,0.55)",
            marginBottom: 48,
            letterSpacing: "0.04em",
          }}
        >
          Precision-built for the Indian athlete.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.36, ease: [0.25, 0, 0, 1] }}
        >
          <Link
            href="/catalog"
            style={{
              display: "inline-block",
              background: "#fff",
              color: "#1a1a1a",
              padding: "16px 48px",
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
            SHOP THE COLLECTION
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
