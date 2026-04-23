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

const FILTER_PILLS = ["ALL", "VESTS", "COMPRESSION", "ACCESSORIES"];

export function CatalogClient({ products }: { products: Product[] }) {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filtered = useMemo(() => {
    if (activeFilter === "ALL") return products;
    return products.filter((p) => p.category.toUpperCase() === activeFilter);
  }, [products, activeFilter]);

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10">
          <motion.p
            className="text-[#888888] text-xs tracking-[0.3em] uppercase mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            PRISM INDIA
          </motion.p>
          <motion.h1
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.9 }}
            className="text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            ALL PRODUCTS
          </motion.h1>
        </div>

        {/* Pill filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {FILTER_PILLS.map((pill) => (
            <button
              key={pill}
              onClick={() => setActiveFilter(pill)}
              style={{
                background: activeFilter === pill ? "#ffffff" : "transparent",
                color: activeFilter === pill ? "#0a0a0a" : "#ffffff",
                border: "1px solid",
                borderColor: activeFilter === pill ? "#ffffff" : "#2a2a2a",
                borderRadius: "999px",
                padding: "6px 18px",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#888888] text-sm">No products in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
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
