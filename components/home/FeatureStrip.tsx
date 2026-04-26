"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    heading: "MADE IN INDIA",
    desc: "Crafted with Indian precision for the Indian athlete.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
    heading: "FREE SHIPPING",
    desc: "On all orders above ₹999. Pan-India delivery.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12l9-9 9 9" />
        <path d="M9 21V9h6v12" />
      </svg>
    ),
    heading: "EASY RETURNS",
    desc: "7-day hassle-free returns on all products.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    heading: "PREMIUM FABRIC",
    desc: "Four-way stretch. Moisture-wicking. Built to last.",
  },
];

export function FeatureStrip() {
  return (
    <div style={{ borderTop: "2px solid #000", borderBottom: "2px solid #000" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 3rem)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
          className="grid-cols-2 md:grid-cols-4"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.25, 0, 0, 1] }}
              style={{
                padding: "clamp(1.5rem, 3vw, 2rem) clamp(1rem, 2vw, 1.5rem)",
                borderRight: i < 3 ? "1px solid #e0e0e0" : "none",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ opacity: 0.6, lineHeight: 1 }}>{f.icon}</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#000" }}>
                {f.heading}
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 300, color: "#999", lineHeight: 1.5 }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
