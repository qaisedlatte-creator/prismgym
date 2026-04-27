"use client";

import { useState, useMemo } from "react";
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

export function CatalogClient({ products, initialCategory = "ALL" }: { products: Product[]; initialCategory?: string }) {
  const [activeFilter, setActiveFilter] = useState(initialCategory);

  const filtered = useMemo(() => {
    if (activeFilter === "ALL") return products;
    return products.filter((p) => p.category.toUpperCase() === activeFilter);
  }, [products, activeFilter]);

  return (
    <div style={{ minHeight: "100vh", paddingTop: 100, paddingBottom: 80, background: "#fff" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 3rem)" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 500,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#888",
              marginBottom: 8,
            }}
          >
            PRISM INDIA
          </p>
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              lineHeight: 0.9,
              color: "#000",
              letterSpacing: "0.02em",
            }}
          >
            ALL PRODUCTS
          </h1>
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
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-8 sm:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
