"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      style={{
        background: "#fff",
        borderTop: "1px solid #e8e8e8",
        padding: "clamp(4rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem)",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0, 0, 1] }}
        style={{ maxWidth: 540, margin: "0 auto" }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.6rem",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#666",
            marginBottom: 12,
          }}
        >
          JOIN THE MOVEMENT
        </p>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            color: "#000",
            lineHeight: 1,
            letterSpacing: "0.02em",
            marginBottom: 12,
          }}
        >
          GET EARLY ACCESS
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 300,
            color: "#999",
            marginBottom: 32,
            lineHeight: 1.6,
          }}
        >
          Be first to know about new drops, exclusive offers, and Prism news.
        </p>

        {submitted ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#000",
              padding: "16px",
              border: "1px solid #000",
            }}
          >
            YOU&apos;RE IN. WELCOME TO PRISM.
          </motion.p>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", maxWidth: 440, margin: "0 auto" }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                flex: 1,
                border: "1px solid #000",
                borderRight: "none",
                padding: "14px 16px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                color: "#000",
                background: "#fff",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                background: "#1a1a1a",
                color: "#fff",
                border: "none",
                padding: "14px 24px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.62rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#000")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#1a1a1a")}
            >
              SUBSCRIBE
            </button>
          </form>
        )}

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.65rem",
            color: "#ccc",
            marginTop: 16,
          }}
        >
          No spam. Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
}
