"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  return (
    <section style={{ background: "#111111", padding: "80px 0", overflow: "hidden" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          paddingInline: "clamp(1rem, 4vw, 3rem)",
          display: "grid",
          gap: "clamp(2rem, 6vw, 6rem)",
          alignItems: "center",
        }}
        className="grid grid-cols-1 md:grid-cols-2"
      >
        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", color: "#888", textTransform: "uppercase", marginBottom: 16 }}>
            ABOUT THE BRAND
          </p>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(4rem, 10vw, 9rem)",
              lineHeight: 0.85,
              color: "#fff",
              letterSpacing: "0.02em",
              marginBottom: 32,
            }}
          >
            PRISM<br />INDIA
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "#888", maxWidth: 420, marginBottom: 24 }}>
            Born in Kerala. Built for the iron. PRISM INDIA is performance gym wear
            designed for athletes who don&apos;t separate the gym from the street.
          </p>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.1em", color: "#fff" }}>
            CREATE YOUR OWN UNIQUE LOOK
          </p>
        </motion.div>

        {/* Right — product image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#1a1a1a" }}>
            <Image
              src="/products/full_sleeve_compression_tee_white_1.jpeg"
              alt="PRISM INDIA Performance Wear"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
