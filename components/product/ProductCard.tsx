"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bookmark, Ruler } from "lucide-react";
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
  White: "#f5f5f5",
  Grey: "#888888",
  Gray: "#888888",
  Brown: "#7c5c3e",
  Charcoal: "#3a3a3a",
};

export function ProductCard({ product }: { product: Product }) {
  const [imgIndex, setImgIndex] = useState(0);
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
    toast({ title: "Added to cart", description: `${product.name} · ${selectedSize}`, variant: "success" });
    setShowSizes(false);
    setSelectedSize("");
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block group"
      style={{ borderRadius: "16px", overflow: "hidden", background: "#111111" }}
    >
      {/* Image container */}
      <div className="relative" style={{ aspectRatio: "3/4" }}>
        {hasImage ? (
          <Image
            src={product.images[imgIndex] || product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            style={{ transition: "transform 400ms ease", transform: "scale(1)" }}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "#181818" }}
          >
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1rem",
                color: "#3a3a3a",
                letterSpacing: "0.1em",
                textAlign: "center",
                padding: "0 1rem",
              }}
            >
              {product.name}
            </span>
          </div>
        )}

        {/* Bookmark button */}
        <button
          onClick={(e) => e.preventDefault()}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "rgba(20,20,20,0.7)",
            border: "none",
            borderRadius: "8px",
            padding: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(4px)",
          }}
        >
          <Bookmark size={14} color="#ffffff" />
        </button>

        {/* NEW badge */}
        {product.isNew && !isSoldOut && (
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background: "#E8C547",
              color: "#0a0a0a",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              padding: "3px 8px",
              borderRadius: "4px",
            }}
          >
            NEW
          </div>
        )}

        {isSoldOut && (
          <div className="absolute inset-0 bg-[#0a0a0a]/70 flex items-center justify-center" style={{ borderRadius: "16px" }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#fff", letterSpacing: "0.3em" }}>SOLD OUT</span>
          </div>
        )}

        {/* Thumbnail swatches row — bottom of image */}
        {hasImage && product.images.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: 10,
              display: "flex",
              gap: 4,
            }}
            onClick={(e) => e.preventDefault()}
          >
            {product.images.slice(0, 3).map((img, i) => (
              <button
                key={i}
                onMouseEnter={() => setImgIndex(i)}
                onMouseLeave={() => setImgIndex(0)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  overflow: "hidden",
                  border: imgIndex === i ? "2px solid #fff" : "2px solid rgba(255,255,255,0.3)",
                  position: "relative",
                  flexShrink: 0,
                  padding: 0,
                  cursor: "pointer",
                  background: "#222",
                }}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Card info */}
      <div style={{ padding: "12px 12px 14px" }}>
        {/* Product name — gymkha yellow */}
        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "0.95rem",
            letterSpacing: "0.06em",
            color: "#E8C547",
            marginBottom: 4,
            lineHeight: 1.1,
          }}
        >
          {product.name}
        </h3>

        {/* Price row */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ color: "#fff", fontFamily: "Inter, sans-serif", fontSize: "0.85rem", fontWeight: 600 }}>
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Color dots + Size Guide row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {product.colors.map((c) => (
              <span
                key={c}
                title={c}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: COLOR_MAP[c] || "#888",
                  border: c === "White" ? "1px solid #555" : "none",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
            ))}
            {colorLabel && (
              <span style={{ color: "#888", fontSize: "0.7rem", fontFamily: "Inter, sans-serif" }}>
                {colorLabel}
              </span>
            )}
          </div>
          <span style={{ display: "flex", alignItems: "center", gap: 3, color: "#888", fontSize: "0.65rem", fontFamily: "Inter, sans-serif" }}>
            <Ruler size={10} />
            Size Guide
          </span>
        </div>

        {/* Size selector — appears on hover/click */}
        {!isSoldOut && (
          <div
            style={{
              marginTop: 10,
              overflow: "hidden",
              maxHeight: showSizes ? 80 : 0,
              transition: "max-height 0.25s ease",
            }}
            onClick={(e) => e.preventDefault()}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 6 }}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => { e.preventDefault(); setSelectedSize(size); }}
                  style={{
                    fontSize: "0.65rem",
                    padding: "3px 8px",
                    border: selectedSize === size ? "1px solid #fff" : "1px solid #333",
                    background: selectedSize === size ? "#fff" : "transparent",
                    color: selectedSize === size ? "#0a0a0a" : "#888",
                    borderRadius: 4,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    fontFamily: "Inter, sans-serif",
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
                padding: "7px 0",
                background: "#E8C547",
                color: "#0a0a0a",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                fontFamily: "Inter, sans-serif",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              ADD TO CART
            </button>
          </div>
        )}

        {/* "Select a Size" CTA — shows when sizes hidden */}
        {!isSoldOut && !showSizes && (
          <button
            onClick={(e) => { e.preventDefault(); setShowSizes(true); }}
            style={{
              marginTop: 10,
              width: "100%",
              padding: "7px 0",
              background: "transparent",
              border: "1px solid #2a2a2a",
              color: "#888",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              fontFamily: "Inter, sans-serif",
              borderRadius: 6,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#555";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#2a2a2a";
              (e.currentTarget as HTMLButtonElement).style.color = "#888";
            }}
          >
            Select a Size
          </button>
        )}
      </div>
    </Link>
  );
}
