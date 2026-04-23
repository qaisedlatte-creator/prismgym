"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/products";

export function BestSellers({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(1);
  const total = products.length;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardW = el.scrollWidth / total;
      setCurrent(Math.round(el.scrollLeft / cardW) + 1);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [total]);

  return (
    <section style={{ padding: "64px 0 32px", background: "#0a0a0a" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingInline: "clamp(1rem, 4vw, 3rem)",
          marginBottom: 24,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              color: "#888",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            TOP PICKS
          </p>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2rem, 6vw, 4rem)",
              color: "#fff",
              lineHeight: 1,
              letterSpacing: "0.03em",
            }}
          >
            BEST SELLERS
          </h2>
        </div>
        <Link
          href="/catalog"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: "0.75rem",
            color: "#888",
            fontFamily: "Inter, sans-serif",
            letterSpacing: "0.05em",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
        >
          ↳ Discover all items
        </Link>
      </div>

      {/* Horizontal scroll carousel */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: 12,
          overflowX: "scroll",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          paddingInline: "clamp(1rem, 4vw, 3rem)",
          paddingBottom: 8,
        }}
        className="hide-scrollbar"
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              flexShrink: 0,
              width: "clamp(220px, 60vw, 280px)",
              scrollSnapAlign: "start",
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Position counter */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 16,
          gap: 8,
          alignItems: "center",
        }}
      >
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#888" }}>
          {String(current).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
