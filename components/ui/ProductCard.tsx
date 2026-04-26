"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [hovering, setHovering] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addItem } = useCartStore();

  const handleAddToCart = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: `${product.id}-${size}`,
      productId: product.id,
      name: product.name,
      color: product.color,
      size,
      price: product.price,
      image: product.images[0] ?? "",
      quantity: 1,
      slug: product.slug,
    });
    setSelectedSize(size);
    setTimeout(() => setSelectedSize(null), 1200);
  };

  const tag = product.isBestseller ? "BESTSELLER" : product.isNew ? "NEW" : null;

  return (
    <Link href={`/product/${product.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{ position: "relative" }}
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            aspectRatio: "3/4",
            background: hovering ? "#eeeeee" : "#f4f4f4",
            border: `1px solid ${hovering ? "#cccccc" : "#e8e8e8"}`,
            overflow: "hidden",
            transition: "background 0.2s, border-color 0.2s",
          }}
        >
          {product.images[0] && (
            <Image
              src={product.images[0]}
              alt={`${product.name} ${product.color}`}
              fill
              priority={priority}
              style={{ objectFit: "cover", objectPosition: "50% 8%", transition: "transform 0.5s cubic-bezier(0.25,0,0,1)" }}
            />
          )}

          {/* Tag */}
          {tag && (
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                background: "#000",
                color: "#fff",
                fontSize: "0.55rem",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "4px 10px",
              }}
            >
              {tag}
            </div>
          )}

          {/* Quick-add size overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(26,26,26,0.93)",
              padding: "14px 12px",
              transform: hovering ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.28s cubic-bezier(0.25,0,0,1)",
            }}
          >
            <div style={{ display: "flex", gap: 6, justifyContent: "center", alignItems: "center" }}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleAddToCart(size, e)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    color: selectedSize === size ? "#000" : "#fff",
                    background: selectedSize === size ? "#fff" : "transparent",
                    border: "1px solid rgba(255,255,255,0.35)",
                    padding: "6px 10px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    minWidth: 36,
                  }}
                  onMouseEnter={(e) => {
                    if (selectedSize !== size) {
                      (e.currentTarget as HTMLButtonElement).style.background = "#fff";
                      (e.currentTarget as HTMLButtonElement).style.color = "#000";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedSize !== size) {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                    }
                  }}
                >
                  {size}
                </button>
              ))}
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                style={{
                  marginLeft: 4,
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ShoppingBag size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div style={{ marginTop: 16 }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#666",
              marginBottom: 4,
            }}
          >
            {product.category}
            {" · "}
            <span style={{ color: "#999" }}>{product.color}</span>
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.875rem",
              fontWeight: 400,
              color: "#000",
              marginBottom: 4,
            }}
          >
            {product.name}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#000",
              }}
            >
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "#ccc",
                  textDecoration: "line-through",
                }}
              >
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
