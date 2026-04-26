"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Ruler } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import { useToast } from "@/components/ui/toaster";

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

const COLOR_MAP: Record<string, string> = {
  Black: "#1a1a1a",
  White: "#f0f0f0",
  Grey: "#888888",
  Gray: "#888888",
  Brown: "#7c5c3e",
  Charcoal: "#3a3a3a",
  Maroon: "#6B2737",
};

export function ProductCard({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [showSizes, setShowSizes] = useState(false);
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const hasImage = product.images?.length > 0 && product.images[0];
  const isSoldOut = product.stock === 0;
  const colorLabel = (product as any).color || product.colors[0] || "";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedSize) {
      setShowSizes(true);
      toast({ title: "Select a size", variant: "error" });
      return;
    }
    addItem({
      id: `${product.id}-${selectedSize}-${product.colors[0]}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "",
      size: selectedSize,
      color: product.colors[0],
      quantity: 1,
      slug: product.slug,
    });
    toast({ title: "Added to bag", description: `${product.name} · ${selectedSize}`, variant: "success" });
    setShowSizes(false);
    setSelectedSize("");
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block group"
      style={{ textDecoration: "none", display: "block" }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          aspectRatio: "3/4",
          background: "#f4f4f4",
          border: "1px solid #e8e8e8",
          overflow: "hidden",
          transition: "border-color 0.2s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#cccccc")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#e8e8e8")}
      >
        {hasImage ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            style={{ objectFit: "cover", objectPosition: "50% 5%", transform: "scale(1.12)", transformOrigin: "center top" }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f4f4f4",
            }}
          >
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "0.85rem",
                color: "#ccc",
                letterSpacing: "0.1em",
                textAlign: "center",
                padding: "0 1rem",
              }}
            >
              {product.name}
            </span>
          </div>
        )}

        {/* NEW badge */}
        {product.isNew && !isSoldOut && (
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "#000",
              color: "#fff",
              fontSize: "0.5rem",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "4px 10px",
            }}
          >
            NEW
          </div>
        )}

        {isSoldOut && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(255,255,255,0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#000", letterSpacing: "0.3em", fontSize: "0.85rem" }}>
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* Card info */}
      <div style={{ padding: "14px 0 0" }}>
        {/* Category */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.58rem",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#666",
            marginBottom: 4,
          }}
        >
          {product.category}
          {colorLabel && (
            <span style={{ color: "#999" }}> · {colorLabel}</span>
          )}
        </p>

        {/* Name */}
        <h3
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            fontWeight: 400,
            color: "#000",
            marginBottom: 6,
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </h3>

        {/* Price + color dots row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#000" }}>
            {formatPrice(product.price)}
          </span>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c}
                title={c}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: COLOR_MAP[c] || "#888",
                  border: c === "White" ? "1px solid #ccc" : "1px solid transparent",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Size selector — expands */}
        {!isSoldOut && (
          <div
            style={{
              overflow: "hidden",
              maxHeight: showSizes ? 96 : 0,
              transition: "max-height 0.25s cubic-bezier(0.25,0,0,1)",
            }}
            onClick={(e) => e.preventDefault()}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => { e.preventDefault(); setSelectedSize(size); }}
                  style={{
                    fontSize: "0.6rem",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    padding: "5px 10px",
                    border: selectedSize === size ? "1px solid #000" : "1px solid #e0e0e0",
                    background: selectedSize === size ? "#000" : "transparent",
                    color: selectedSize === size ? "#fff" : "#666",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              onClick={handleAddToCart}
              style={{
                width: "100%",
                padding: "10px 0",
                background: "#1a1a1a",
                color: "#fff",
                fontSize: "0.6rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontFamily: "'DM Sans', sans-serif",
                border: "none",
                cursor: "pointer",
                transition: "background 0.18s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#000")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#1a1a1a")}
            >
              ADD TO BAG
            </button>
          </div>
        )}

        {/* "Select a Size" toggle */}
        {!isSoldOut && (
          <button
            onClick={(e) => { e.preventDefault(); setShowSizes(!showSizes); }}
            style={{
              width: "100%",
              padding: "8px 0",
              background: "transparent",
              border: "1px solid #e0e0e0",
              color: "#888",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              transition: "border-color 0.18s, color 0.18s",
              marginTop: showSizes ? 0 : 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#1a1a1a";
              (e.currentTarget as HTMLButtonElement).style.color = "#000";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#e0e0e0";
              (e.currentTarget as HTMLButtonElement).style.color = "#888";
            }}
          >
            <Ruler size={10} />
            {showSizes ? "CLOSE" : "SELECT SIZE"}
          </button>
        )}
      </div>
    </Link>
  );
}
