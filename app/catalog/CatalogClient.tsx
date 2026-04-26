"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/product/ProductCard";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: string[];
  isNew: boolean;
  category: string;
  stock: number;
  color?: string;
}

const FILTER_PILLS = ["ALL", "VESTS", "COMPRESSION"];

export function CatalogClient({ products }: { products: Product[] }) {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filtered = useMemo(() => {
    if (activeFilter === "ALL") return products;
    return products.filter((p) => p.category.toUpperCase() === activeFilter);
  }, [products, activeFilter]);

  return (
    <div style={{ minHeight: "100vh", paddingTop: 100, paddingBottom: 80, background: "#fff" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 3rem)" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <motion.p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 500,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#888",
              marginBottom: 8,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            PRISM INDIA
          </motion.p>
          <motion.h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              lineHeight: 0.9,
              color: "#000",
              letterSpacing: "0.02em",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            ALL PRODUCTS
          </motion.h1>
        </div>

        {/* Pill filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {FILTER_PILLS.map((pill) => (
            <button
              key={pill}
              onClick={() => setActiveFilter(pill)}
              style={{
                background: activeFilter === pill ? "#000" : "transparent",
                color: activeFilter === pill ? "#fff" : "#000",
                border: `1px solid ${activeFilter === pill ? "#000" : "#d0d0d0"}`,
                borderRadius: 0,
                padding: "8px 20px",
                fontSize: "0.62rem",
                letterSpacing: "0.15em",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                cursor: "pointer",
                textTransform: "uppercase",
                transition: "all 0.18s",
              }}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", paddingTop: 80 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#999", fontSize: "0.9rem" }}>
              No products in this category.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "clamp(1.5rem, 3vw, 2rem) clamp(1rem, 2vw, 1.5rem)",
            }}
            className="grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.4, ease: [0.25, 0, 0, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
