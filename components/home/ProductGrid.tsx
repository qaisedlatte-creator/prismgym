"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/products";

// SVG category icons
const VestIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6l3-3 6 4 6-4 3 3-4 4v10H7V10L3 6z" />
  </svg>
);
const ShirtIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z" />
  </svg>
);
const AccessoryIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M12 12h.01" />
    <path d="M8 12h.01" />
    <path d="M16 12h.01" />
  </svg>
);
const AllIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const FILTERS = [
  { key: "ALL", label: "All Fits", Icon: AllIcon },
  { key: "VESTS", label: "Vests", Icon: VestIcon },
  { key: "COMPRESSION", label: "Compression", Icon: ShirtIcon },
  { key: "ACCESSORIES", label: "Accessories", Icon: AccessoryIcon },
];

export function ProductGrid({ products }: { products: Product[] }) {
  const [active, setActive] = useState("ALL");

  const filtered = active === "ALL"
    ? products
    : products.filter((p) => p.category.toUpperCase() === active);

  return (
    <section style={{ padding: "64px 0 80px", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", paddingInline: "clamp(1rem, 4vw, 3rem)" }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              color: "#888",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            OUR PRODUCTS
          </p>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2rem, 6vw, 4rem)",
              color: "#fff",
              lineHeight: 1,
              letterSpacing: "0.02em",
              marginBottom: 24,
            }}
          >
            Feel the Performance
          </h2>

          {/* Icon filter pills */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            {FILTERS.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  borderRadius: "999px",
                  border: "1px solid",
                  borderColor: active === key ? "#fff" : "#2a2a2a",
                  background: active === key ? "#fff" : "transparent",
                  color: active === key ? "#0a0a0a" : "#888",
                  fontSize: "0.75rem",
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <Icon />
                {label}
              </button>
            ))}

            <Link
              href="/catalog"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                border: "1px solid #2a2a2a",
                borderRadius: "999px",
                color: "#888",
                fontSize: "0.75rem",
                fontFamily: "Inter, sans-serif",
                textDecoration: "none",
                transition: "all 0.2s ease",
                marginLeft: "auto",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#888";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2a2a2a";
              }}
            >
              ↳ Explore all Fits
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
