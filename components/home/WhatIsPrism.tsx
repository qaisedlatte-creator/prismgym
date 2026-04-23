"use client";

import { motion } from "framer-motion";

const PILLARS = [
  {
    title: "PERFORMANCE FIRST",
    body: "Every fabric is chosen for its moisture-wicking, four-way stretch performance. Our compression tech isn't aesthetic — it maps your muscle groups and works with your body.",
  },
  {
    title: "STREET READY",
    body: "Our cuts are designed to walk out of the gym and onto the street without changing. Clean lines, dark colorways, minimal branding — built to be worn anywhere.",
  },
  {
    title: "BUILT TO LAST",
    body: "We don't do fast fashion. PRISM pieces are pre-shrunk, colourfast, and constructed to survive daily training sessions without losing shape or structure.",
  },
];

export function WhatIsPrism() {
  return (
    <section style={{ background: "#000000", padding: "80px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", paddingInline: "clamp(1rem, 4vw, 3rem)" }}>
        {/* Giant centered heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", color: "#888", textTransform: "uppercase", marginBottom: 16 }}>
            CUSTOM — WHAT IS IT?
          </p>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              lineHeight: 1,
              color: "#fff",
              letterSpacing: "0.02em",
            }}
          >
            WHAT IS PRISM?
          </h2>
        </motion.div>

        {/* 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{
                padding: "32px",
                borderLeft: i > 0 ? "1px solid #2a2a2a" : "none",
              }}
              className={i > 0 ? "border-l-0 md:border-l border-t md:border-t-0 border-[#2a2a2a]" : ""}
            >
              <h3
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.4rem",
                  letterSpacing: "0.08em",
                  color: "#fff",
                  marginBottom: 16,
                }}
              >
                {pillar.title}
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", lineHeight: 1.7, color: "#888" }}>
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
