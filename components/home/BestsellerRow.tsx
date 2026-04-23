"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/products";

export function BestsellerRow({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section style={{ background: "#1a1a1a", padding: "60px 0", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "stretch" }}>
        {/* Rotated "BESTSELLER" vertical text */}
        <div
          style={{
            flexShrink: 0,
            width: "clamp(40px, 5vw, 60px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: "clamp(0.5rem, 2vw, 1.5rem)",
          }}
        >
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(1.2rem, 3vw, 2rem)",
              letterSpacing: "0.15em",
              color: "#2a2a2a",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              whiteSpace: "nowrap",
            }}
          >
            BESTSELLER
          </span>
        </div>

        {/* Right: header + scroll row */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              paddingInline: "clamp(1rem, 3vw, 2rem)",
              marginBottom: 24,
            }}
          >
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", color: "#888", textTransform: "uppercase", marginBottom: 4 }}>
                TOP PICKS
              </p>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
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
                color: "#888",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
                textDecoration: "none",
                paddingBottom: 4,
              }}
            >
              VIEW MORE →
            </Link>
          </div>

          {/* Horizontal scroll row */}
          <div
            ref={scrollRef}
            style={{
              display: "flex",
              gap: 12,
              overflowX: "scroll",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              paddingInline: "clamp(1rem, 3vw, 2rem)",
              paddingBottom: 4,
            }}
            className="hide-scrollbar"
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                style={{
                  flexShrink: 0,
                  width: "clamp(160px, 40vw, 220px)",
                  scrollSnapAlign: "start",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                {/* Square image */}
                <div
                  style={{
                    aspectRatio: "1/1",
                    background: product.images[0] ? "#222" : product.colorHex,
                    position: "relative",
                    overflow: "hidden",
                    marginBottom: 10,
                  }}
                >
                  {product.images[0] && (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      style={{ transition: "transform 0.4s ease" }}
                    />
                  )}
                </div>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.9rem", letterSpacing: "0.05em", color: "#fff", marginBottom: 2 }}>
                  {product.name}
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#888" }}>
                  {formatPrice(product.price)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
