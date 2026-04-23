"use client";

import { motion } from "framer-motion";

export function NewDropBanner() {
  return (
    <section
      style={{
        background: "#0a0a0a",
        padding: "80px clamp(1rem, 4vw, 3rem)",
        overflow: "hidden",
        borderTop: "1px solid #2a2a2a",
        borderBottom: "1px solid #2a2a2a",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}
      >
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", color: "#888", textTransform: "uppercase", marginBottom: 24 }}>
          GIFT / SPECIAL DROP
        </p>

        {/* Oversized banner text — partial crop on edges like VLOM */}
        <div style={{ overflow: "hidden", marginBottom: 32 }}>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.5rem, 14vw, 11rem)",
              lineHeight: 0.88,
              color: "#fff",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            NEW DROP
          </h2>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.5rem, 14vw, 11rem)",
              lineHeight: 0.88,
              color: "#2a2a2a",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            COMING SOON
          </h2>
        </div>

        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", color: "#888", lineHeight: 1.7, marginBottom: 32 }}>
          Follow <span style={{ color: "#fff" }}>@prismindia.in</span> to be the first to know.
        </p>

        <a
          href="https://instagram.com/prismindia.in"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            border: "1px solid #fff",
            color: "#fff",
            padding: "14px 36px",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "0.95rem",
            letterSpacing: "0.2em",
            textDecoration: "none",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#fff";
            (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
          </svg>
          FOLLOW ON INSTAGRAM
        </a>
      </motion.div>
    </section>
  );
}
