"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function HeroStatic() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        paddingTop: 96,
        paddingBottom: 64,
      }}
    >
      {/* Giant PRISM text — oversized, crops both sides */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: "center", overflow: "hidden", width: "100%" }}
      >
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(5rem, 28vw, 22rem)",
            lineHeight: 0.82,
            color: "#fff",
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          PRISM
        </h1>
      </motion.div>

      {/* Centered product image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "min(340px, 75vw)",
          aspectRatio: "3/4",
          position: "relative",
          margin: "24px 0",
          overflow: "hidden",
          background: "#111",
        }}
      >
        <Image
          src="/products/gymkha_performance_compression_black_1.jpeg"
          alt="PRISM INDIA"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* INDIA — outline text below image */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: "center", overflow: "hidden", width: "100%" }}
      >
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(5rem, 28vw, 22rem)",
            lineHeight: 0.82,
            color: "transparent",
            WebkitTextStroke: "2px rgba(255,255,255,0.25)",
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          INDIA
        </h1>
      </motion.div>

      {/* Tagline + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        style={{ textAlign: "center", marginTop: 32 }}
      >
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            color: "#888",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          STREETWEAR × GYM WEAR · MADE IN INDIA
        </p>
        <Link
          href="/catalog"
          style={{
            display: "inline-block",
            background: "#ffffff",
            color: "#0a0a0a",
            padding: "15px 56px",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.05rem",
            letterSpacing: "0.25em",
            textDecoration: "none",
          }}
        >
          SHOP NOW
        </Link>
      </motion.div>
    </section>
  );
}
