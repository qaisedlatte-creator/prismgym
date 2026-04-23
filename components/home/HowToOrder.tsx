"use client";

import { motion } from "framer-motion";

const STEPS = [
  { num: "01", title: "BROWSE", desc: "Pick your product and colour from the catalog." },
  { num: "02", title: "SIZE UP", desc: "Select your size using our guide on each product page." },
  { num: "03", title: "CHECKOUT", desc: "Pay online via Razorpay or choose Cash on Delivery." },
  { num: "04", title: "DELIVERED", desc: "To your door in 5-7 business days across India." },
];

export function HowToOrder() {
  return (
    <section style={{ background: "#141414", padding: "80px 0", borderTop: "1px solid #2a2a2a" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", paddingInline: "clamp(1rem, 4vw, 3rem)" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 56 }}
        >
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", color: "#888", textTransform: "uppercase", marginBottom: 12 }}>
            STAGES OF WORK
          </p>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              color: "#fff",
              letterSpacing: "0.02em",
              lineHeight: 0.95,
            }}
          >
            HOW TO ORDER
          </h2>
        </motion.div>

        {/* Steps row */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              style={{
                padding: "0 24px 0 0",
                borderLeft: i > 0 ? "1px solid #2a2a2a" : "none",
                paddingLeft: i > 0 ? 24 : 0,
              }}
              className={i > 0 ? "border-l-0 md:border-l border-t md:border-t-0 pt-6 md:pt-0 border-[#2a2a2a]" : ""}
            >
              {/* Step number — giant, grey */}
              <p
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(3rem, 8vw, 5rem)",
                  lineHeight: 1,
                  color: "#2a2a2a",
                  letterSpacing: "0.02em",
                  marginBottom: 12,
                }}
              >
                {step.num}
              </p>
              <p
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.2rem",
                  letterSpacing: "0.08em",
                  color: "#fff",
                  marginBottom: 8,
                }}
              >
                {step.title}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "#888", lineHeight: 1.6 }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
