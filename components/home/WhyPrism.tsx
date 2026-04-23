"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const REASONS = [
  { title: "ENGINEERED FABRIC", body: "Moisture-wicking, four-way stretch built for peak output — not just aesthetics." },
  { title: "STREET-FIRST DESIGN", body: "Cuts that go from the gym floor to the street without compromise." },
  { title: "COMPRESSION THAT WORKS", body: "Actual muscle support mapped to your body. Not just tight clothing." },
  { title: "LIMITED DROPS", body: "Not mass produced. Not for everyone. Built for those who show up." },
  { title: "MADE IN INDIA", body: "Built here, worn everywhere. Supporting Indian manufacturing, always." },
];

export function WhyPrism() {
  return (
    <section style={{ background: "#0d0d0d", padding: "80px 0" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          paddingInline: "clamp(1rem, 4vw, 3rem)",
          display: "grid",
          gap: "clamp(2rem, 6vw, 6rem)",
          alignItems: "start",
        }}
        className="grid grid-cols-1 md:grid-cols-2"
      >
        {/* Left — heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          style={{ position: "sticky", top: 120 }}
        >
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", color: "#888", textTransform: "uppercase", marginBottom: 16 }}>
            WHY DO YOU NEED IT?
          </p>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              lineHeight: 0.9,
              color: "#fff",
              letterSpacing: "0.02em",
              marginBottom: 40,
            }}
          >
            WHY<br />PRISM?
          </h2>
          <Link
            href="/catalog"
            style={{
              display: "inline-block",
              background: "#fff",
              color: "#0a0a0a",
              padding: "14px 36px",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1rem",
              letterSpacing: "0.2em",
              textDecoration: "none",
            }}
          >
            SHOP THE DROP →
          </Link>
        </motion.div>

        {/* Right — bullet list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              style={{
                padding: "24px 0",
                borderTop: "1px solid #2a2a2a",
              }}
            >
              <p
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.1rem",
                  letterSpacing: "0.08em",
                  color: "#fff",
                  marginBottom: 6,
                }}
              >
                {reason.title}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.6, color: "#888" }}>
                {reason.body}
              </p>
            </motion.div>
          ))}
          <div style={{ borderTop: "1px solid #2a2a2a" }} />
        </div>
      </div>
    </section>
  );
}
