"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ChevronDown, X } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import { useToast } from "@/components/ui/toaster";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  isNew: boolean;
  category: string;
  stock: number;
  color?: string;
}

const SIZE_GUIDE = [
  { size: "S", chest: "88-92", waist: "72-76" },
  { size: "M", chest: "92-96", waist: "76-80" },
  { size: "L", chest: "96-100", waist: "80-84" },
  { size: "XL", chest: "100-106", waist: "84-90" },
];

export function ProductDetailClient({ product, related }: { product: Product; related: Product[] }) {
  const [selectedImage, setSelectedImage] = useState(0);
  // Auto-select the first size so ADD TO CART works immediately
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  // Only colours that have a matching image; if only 1 image keep just colour[0]
  const displayColors = product.colors.filter((_, i) => !!product.images[i]);
  const [selectedColor, setSelectedColor] = useState(displayColors[0] ?? product.colors[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [accordionOpen, setAccordionOpen] = useState<string | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const isSoldOut = product.stock === 0;
  const hasImages = product.images && product.images.length > 0 && product.images[0];

  const requireSize = () => {
    if (!selectedSize) {
      setSizeError(true);
      toast({ title: "Select a size first", variant: "error" });
      setTimeout(() => setSizeError(false), 2500);
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!requireSize()) return;
    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[selectedImage] || product.images[0] || "",
      size: selectedSize,
      color: selectedColor,
      quantity,
      slug: product.slug,
    });
    toast({
      title: "Added to cart!",
      description: `${product.name} · ${selectedSize} · ${selectedColor}`,
      variant: "success",
    });
  };

  const handleBuyNow = () => {
    if (!requireSize()) return;
    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[selectedImage] || product.images[0] || "",
      size: selectedSize,
      color: selectedColor,
      quantity,
      slug: product.slug,
    });
    window.location.href = "/checkout";
  };

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    const idx = product.colors.indexOf(color);
    if (idx !== -1 && product.images[idx]) {
      setSelectedImage(idx);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[#888888] text-xs tracking-wide mb-6">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-black transition-colors">Catalog</Link>
          <span>/</span>
          <span style={{ color: "#000" }}>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14">

          {/* ── Images ─────────────────────────────────────────── */}
          <div className="space-y-3">
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "4/5", background: "#f4f4f4" }}
            >
              {hasImages ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={product.images[selectedImage]}
                      alt={product.name}
                      fill
                      priority
                      style={{ objectFit: "cover", objectPosition: "center top" }}
                    />
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "1.5rem",
                      letterSpacing: "0.1em",
                      color: "#ccc",
                    }}
                  >
                    {product.name}
                  </span>
                </div>
              )}
              {product.isNew && (
                <div
                  className="absolute top-3 left-3 bg-black text-white"
                  style={{ fontSize: "0.5rem", fontWeight: 700, letterSpacing: "0.2em", padding: "4px 10px" }}
                >
                  NEW
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {hasImages && product.images.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative overflow-hidden border transition-colors ${
                      selectedImage === i ? "border-black" : "border-[#e8e8e8]"
                    }`}
                    style={{ width: 60, height: 72, flexShrink: 0 }}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ────────────────────────────────────── */}
          <div className="lg:pt-2">
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#888",
                marginBottom: 10,
              }}
            >
              {product.category}
            </p>
            <h1
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                lineHeight: 1,
                color: "#000",
                marginBottom: 12,
              }}
            >
              {product.name}
            </h1>

            <p style={{ fontSize: "1.4rem", fontWeight: 600, color: "#000", marginBottom: 6 }}>
              {formatPrice(product.price)}
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#aaa", marginBottom: 24 }}>
              COD available · ₹100 handling fee
            </p>

            {/* ── Colour selector (only if multiple colours with images) ── */}
            {displayColors.length > 1 && (
              <div style={{ marginBottom: 24 }}>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#000",
                    marginBottom: 10,
                    fontWeight: 500,
                  }}
                >
                  COLOUR: <span style={{ color: "#666" }}>{selectedColor}</span>
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {displayColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorClick(color)}
                      style={{
                        padding: "8px 18px",
                        fontSize: "0.72rem",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                        border: selectedColor === color ? "1.5px solid #000" : "1px solid #e0e0e0",
                        background: selectedColor === color ? "#000" : "#fff",
                        color: selectedColor === color ? "#fff" : "#555",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Size selector ───────────────────────────────────── */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: sizeError ? "#e53e3e" : "#000",
                    fontWeight: 500,
                    transition: "color 0.2s",
                  }}
                >
                  SIZE: <span style={{ color: sizeError ? "#e53e3e" : "#666" }}>{selectedSize || "SELECT"}</span>
                  {sizeError && (
                    <span style={{ marginLeft: 8, fontWeight: 600 }}>← select a size first</span>
                  )}
                </p>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  style={{
                    fontSize: "0.7rem",
                    color: "#888",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                    fontFamily: "'DM Sans', sans-serif",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  Size Guide
                </button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    disabled={isSoldOut}
                    style={{
                      width: 52,
                      padding: "10px 0",
                      fontSize: "0.72rem",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      border: selectedSize === size
                        ? "1.5px solid #000"
                        : sizeError
                          ? "1px solid #e53e3e"
                          : "1px solid #e0e0e0",
                      background: selectedSize === size ? "#000" : "#fff",
                      color: selectedSize === size ? "#fff" : sizeError ? "#e53e3e" : "#555",
                      cursor: isSoldOut ? "not-allowed" : "pointer",
                      opacity: isSoldOut ? 0.4 : 1,
                      transition: "all 0.15s",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Quantity ─────────────────────────────────────────── */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid #e0e0e0" }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: 44, height: 44, background: "none", border: "none",
                    cursor: "pointer", color: "#555", fontSize: "1.2rem",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    width: 44, textAlign: "center", fontSize: "0.9rem",
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: "#000",
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: 44, height: 44, background: "none", border: "none",
                    cursor: "pointer", color: "#555", fontSize: "1.2rem",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* ── CTAs ─────────────────────────────────────────────── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              <button
                onClick={handleAddToCart}
                disabled={isSoldOut}
                style={{
                  width: "100%",
                  background: isSoldOut ? "#aaa" : "#000",
                  color: "#fff",
                  border: "none",
                  padding: "16px 0",
                  fontSize: "0.72rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: isSoldOut ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <ShoppingBag size={15} />
                {isSoldOut ? "SOLD OUT" : "ADD TO CART"}
              </button>

              {!isSoldOut && (
                <button
                  onClick={handleBuyNow}
                  style={{
                    width: "100%",
                    background: "#fff",
                    color: "#000",
                    border: "1.5px solid #000",
                    padding: "16px 0",
                    fontSize: "0.72rem",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  BUY NOW
                </button>
              )}
            </div>

            {/* Shipping info */}
            <div
              style={{
                border: "1px solid #f0f0f0",
                padding: "14px 16px",
                marginBottom: 24,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {["🚚 Free shipping on orders above ₹999", "📦 Estimated delivery: 5-7 business days", "↩️ Easy returns within 7 days"].map((line) => (
                <p key={line} style={{ fontSize: "0.72rem", color: "#666", fontFamily: "'DM Sans', sans-serif" }}>
                  {line}
                </p>
              ))}
            </div>

            {/* ── Accordion ────────────────────────────────────────── */}
            {[
              { key: "description", title: "DESCRIPTION", content: product.description },
              { key: "care", title: "CARE INSTRUCTIONS", content: "Machine wash cold at 30°C. Do not tumble dry. Do not iron on print. Wash inside out." },
              { key: "fabric", title: "FABRIC & FIT", content: "88% Polyester, 12% Elastane. Four-way stretch. Quick-dry moisture wicking. Pre-shrunk." },
            ].map(({ key, title, content }) => (
              <div key={key} style={{ borderTop: "1px solid #f0f0f0" }}>
                <button
                  onClick={() => setAccordionOpen(accordionOpen === key ? null : key)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "0.85rem",
                      letterSpacing: "0.18em",
                      color: "#000",
                    }}
                  >
                    {title}
                  </span>
                  <ChevronDown
                    size={15}
                    color="#888"
                    style={{
                      transform: accordionOpen === key ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                      flexShrink: 0,
                    }}
                  />
                </button>
                {accordionOpen === key && (
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "#666",
                      fontFamily: "'DM Sans', sans-serif",
                      lineHeight: 1.7,
                      paddingBottom: 14,
                    }}
                  >
                    {content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(1.8rem, 5vw, 3rem)",
                color: "#000",
                marginBottom: 24,
              }}
            >
              YOU MIGHT ALSO LIKE
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Size Guide Modal ─────────────────────────────────────── */}
      <AnimatePresence>
        {sizeGuideOpen && (
          <>
            <motion.div
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 50 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSizeGuideOpen(false)}
            />
            <motion.div
              style={{
                position: "fixed",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                background: "#fff",
                border: "1px solid #e8e8e8",
                padding: 28,
                zIndex: 51,
                width: "calc(100% - 32px)",
                maxWidth: 400,
              }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", letterSpacing: "0.06em" }}>
                  SIZE GUIDE
                </h2>
                <button
                  onClick={() => setSizeGuideOpen(false)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#666" }}
                >
                  <X size={18} />
                </button>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #e8e8e8" }}>
                    {["Size", "Chest (cm)", "Waist (cm)"].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          fontSize: "0.6rem",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "#888",
                          paddingBottom: 10,
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SIZE_GUIDE.map((row) => (
                    <tr key={row.size} style={{ borderBottom: "1px solid #f4f4f4" }}>
                      <td
                        style={{
                          padding: "10px 0",
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: selectedSize === row.size ? 700 : 400,
                          color: selectedSize === row.size ? "#000" : "#555",
                          fontSize: "0.85rem",
                        }}
                      >
                        {row.size}
                      </td>
                      <td style={{ padding: "10px 0", color: "#666", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif" }}>
                        {row.chest}
                      </td>
                      <td style={{ padding: "10px 0", color: "#666", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif" }}>
                        {row.waist}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ marginTop: 16, fontSize: "0.68rem", color: "#aaa", fontFamily: "'DM Sans', sans-serif" }}>
                All measurements in centimetres. If between sizes, size up.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
