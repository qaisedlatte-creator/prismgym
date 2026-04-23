"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
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

export function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedSize) {
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
  };

  const hasImage = product.images && product.images.length > 0 && product.images[0];
  const isSoldOut = product.stock === 0;
  const colorLabel = (product as any).color || product.colors[0] || "";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setSelectedSize(""); }}
    >
      {/* Image — 4:5 portrait */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "4/5" }}
      >
        {hasImage ? (
          <>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              style={{
                transform: hovered ? "scale(1.04)" : "scale(1)",
                transition: "transform 400ms ease",
              }}
            />
            {/* Second image on hover */}
            {product.images[1] && (
              <Image
                src={product.images[1]}
                alt={`${product.name} view 2`}
                fill
                className="object-cover"
                style={{
                  opacity: hovered ? 1 : 0,
                  transition: "opacity 300ms ease",
                  position: "absolute",
                  inset: 0,
                }}
              />
            )}
          </>
        ) : (
          /* No-image placeholder */
          <div className="absolute inset-0 bg-[#111111] flex items-center justify-center">
            <span
              className="text-[#2a2a2a] text-center px-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.1em" }}
            >
              {product.name}
            </span>
          </div>
        )}

        {isSoldOut && (
          <div className="absolute inset-0 bg-[#0a0a0a]/70 flex items-center justify-center">
            <span className="text-white text-sm tracking-[0.3em]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              SOLD OUT
            </span>
          </div>
        )}

        {/* Quick add — slides up on hover */}
        {!isSoldOut && (
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#0a0a0a]/90 p-3"
            style={{
              transform: hovered ? "translateY(0)" : "translateY(100%)",
              transition: "transform 250ms ease",
            }}
            onClick={(e) => e.preventDefault()}
          >
            <div className="flex flex-wrap gap-1.5 mb-2">
              {product.sizes.slice(0, 5).map((size) => (
                <button
                  key={size}
                  onClick={(e) => { e.preventDefault(); setSelectedSize(size); }}
                  className={`text-[10px] px-2 py-1 border tracking-wide transition-colors ${
                    selectedSize === size
                      ? "bg-white text-[#0a0a0a] border-white"
                      : "border-[#2a2a2a] text-[#888888] hover:border-white hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              onClick={handleQuickAdd}
              className="w-full bg-white text-[#0a0a0a] text-[11px] font-bold tracking-[0.2em] py-2 hover:bg-[#c0c0c0] transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag size={12} />
              ADD TO CART
            </button>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="pt-3 pb-2">
        <h3
          className="text-white leading-tight mb-0.5"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem" }}
        >
          {product.name}
        </h3>
        {colorLabel && (
          <p className="text-[#888888] mb-0.5" style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}>
            {colorLabel}
          </p>
        )}
        <p className="text-white" style={{ fontSize: "0.9rem", fontFamily: "Inter, sans-serif" }}>
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
