"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/products";

const FILTERS = ["ALL", "VESTS", "COMPRESSION", "ACCESSORIES"];

export function ProductGridSection({ products }: { products: Product[] }) {
  const [active, setActive] = useState("ALL");

  const filtered =
    active === "ALL" ? products : products.filter((p) => p.category.toUpperCase() === active);

  return (
    <section style={{ background: "#0a0a0a", padding: "64px 0 80px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", paddingInline: "clamp(1rem, 4vw, 3rem)" }}>
        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", color: "#888", textTransform: "uppercase", marginBottom: 8 }}>
            OUR PRODUCTS
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                lineHeight: 0.9,
                color: "#fff",
                letterSpacing: "0.02em",
              }}
            >
              Feel the Performance
            </h2>
            <Link
              href="/catalog"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                color: "#888",
                textDecoration: "none",
                paddingBottom: 4,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#888")}
            >
              ↳ Explore all Fits
            </Link>
          </div>

          {/* Filter pills */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                style={{
                  padding: "7px 18px",
                  borderRadius: 999,
                  border: "1px solid",
                  borderColor: active === f ? "#fff" : "#2a2a2a",
                  background: active === f ? "#fff" : "transparent",
                  color: active === f ? "#0a0a0a" : "#888",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Full-width CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            marginTop: 60,
            background: "#111111",
            border: "1px solid #2a2a2a",
            padding: "40px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.1 }}>
              FREE SHIPPING ABOVE ₹999
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: "#888", marginTop: 6 }}>
              COD available · Made in India 🇮🇳
            </p>
          </div>
          <Link
            href="/catalog"
            style={{
              display: "inline-block",
              background: "#fff",
              color: "#0a0a0a",
              padding: "14px 40px",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1rem",
              letterSpacing: "0.2em",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            SHOP NOW →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
