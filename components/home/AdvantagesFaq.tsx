"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ADVANTAGES = [
  { icon: "🔥", title: "PERFORMANCE FABRIC", desc: "Moisture-wicking 4-way stretch built for peak output" },
  { icon: "⚡", title: "FREE SHIPPING ₹999+", desc: "Free delivery on all orders above ₹999" },
  { icon: "📦", title: "COD AVAILABLE", desc: "Cash on Delivery available nationwide (+₹100)" },
  { icon: "🔄", title: "7-DAY RETURNS", desc: "Easy returns within 7 days for unworn items" },
];

const FAQS = [
  { q: "What sizes do you offer?", a: "S, M and L across all products. Use our Size Guide on each product page for exact measurements." },
  { q: "How long does delivery take?", a: "5-7 business days across India. You will receive tracking details via email once your order is dispatched." },
  { q: "Is COD available?", a: "Yes. Cash on Delivery is available with an additional ₹100 convenience fee. Pay when the package arrives." },
  { q: "What is your return policy?", a: "7-day returns for unworn items with original tags intact. Contact us at @prismindia.in on Instagram to initiate a return." },
];

export function AdvantagesFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section style={{ background: "#111111", padding: "80px 0" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          paddingInline: "clamp(1rem, 4vw, 3rem)",
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start"
      >
        {/* Left — Advantages */}
        <div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", color: "#888", textTransform: "uppercase", marginBottom: 32 }}>
            OUR ADVANTAGES
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {ADVANTAGES.map((adv, i) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  display: "flex",
                  gap: 16,
                  padding: "20px",
                  background: "#141414",
                  border: "1px solid #2a2a2a",
                }}
              >
                <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{adv.icon}</span>
                <div>
                  <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", letterSpacing: "0.08em", color: "#fff", marginBottom: 4 }}>
                    {adv.title}
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "#888", lineHeight: 1.5 }}>
                    {adv.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — FAQ */}
        <div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", color: "#888", textTransform: "uppercase", marginBottom: 32 }}>
            ANSWERS TO FREQUENTLY ASKED QUESTIONS
          </p>
          <div>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderTop: "1px solid #2a2a2a" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: 12,
                  }}
                >
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#fff", fontWeight: 500, lineHeight: 1.4 }}>
                    {faq.q}
                  </span>
                  <span style={{ color: "#888", fontSize: "1.2rem", lineHeight: 1, flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: "hidden" }}
                    >
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: "#888", lineHeight: 1.7, paddingBottom: 20, paddingRight: 32 }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #2a2a2a" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
