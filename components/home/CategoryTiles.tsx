"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  {
    label: "COMPRESSION",
    name: "HALF SLEEVE",
    image: "/products/compression_half_white.png",
    href: "/catalog?category=COMPRESSION",
    span: 2,
  },
  {
    label: "COMPRESSION",
    name: "FULL SLEEVE",
    image: "/products/compression_full_white.png",
    href: "/catalog?category=COMPRESSION",
    span: 1,
  },
  {
    label: "VESTS",
    name: "RIBBED VEST",
    image: "/products/ribbed_vest_maroon.png",
    href: "/catalog?category=VESTS",
    span: 1,
  },
];

function CategoryTile({ cat, rowSpan = false, index = 0 }: { cat: typeof categories[0]; rowSpan?: boolean; index?: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0, 0, 1] }}
      style={{ gridRow: rowSpan ? "span 2" : "span 1" }}
    >
      <Link
        href={cat.href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block",
          position: "relative",
          height: "100%",
          minHeight: rowSpan ? 600 : 290,
          overflow: "hidden",
          background: "#f0f0f0",
          textDecoration: "none",
        }}
      >
        {/* Product image */}
        <Image
          src={cat.image}
          alt={cat.name}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.5s cubic-bezier(0.25,0,0,1)",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />

        {/* Logo watermark */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <Image src="/logo-mark.png" alt="" width={48} height={48} style={{ opacity: 0.07, width: 48, height: "auto" }} aria-hidden />
        </div>

        {/* Overlay gradient + text */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(255,255,255,0.97) 0%, transparent 50%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "clamp(1.2rem, 3vw, 1.8rem)",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.58rem",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: hovered ? "#000" : "#888",
              transition: "color 0.2s",
              marginBottom: 6,
            }}
          >
            {cat.label}
          </p>
          <p
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.75rem",
              color: "#000",
              letterSpacing: "0.04em",
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            {cat.name}
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.65rem",
              color: hovered ? "#000" : "#888",
              letterSpacing: "0.08em",
              transition: "color 0.2s",
            }}
          >
            SHOP NOW →
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export function CategoryTiles() {
  return (
    <section
      style={{
        background: "#fff",
        borderTop: "1px solid #e8e8e8",
        padding: "clamp(4rem, 8vw, 7.5rem) 0",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 3rem)" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0, 0, 1] }}
          style={{ marginBottom: 40 }}
        >
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "#666", marginBottom: 8 }}>
            EXPLORE
          </p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1, color: "#000" }}>
            SHOP BY CATEGORY
          </h2>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: 2,
            background: "#000",
          }}
        >
          <CategoryTile cat={categories[0]} rowSpan index={0} />
          <CategoryTile cat={categories[1]} index={1} />
          <CategoryTile cat={categories[2]} index={2} />
        </div>
      </div>
    </section>
  );
}
