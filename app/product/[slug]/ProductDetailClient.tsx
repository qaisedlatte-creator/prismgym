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
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [accordionOpen, setAccordionOpen] = useState<string | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const isSoldOut = product.stock === 0;
  const hasImages = product.images && product.images.length > 0 && product.images[0];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({ title: "Please select a size", variant: "error" });
      return;
    }
    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "",
      size: selectedSize,
      color: selectedColor,
      quantity,
      slug: product.slug,
    });
    toast({ title: "Added to cart!", description: `${product.name} · ${selectedSize} · ${selectedColor}`, variant: "success" });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast({ title: "Please select a size", variant: "error" });
      return;
    }
    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "",
      size: selectedSize,
      color: selectedColor,
      quantity,
      slug: product.slug,
    });
    window.location.href = "/checkout";
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[#888888] text-xs tracking-wide mb-8">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-black transition-colors">Catalog</Link>
          <span>/</span>
          <span style={{ color: "#000" }}>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative bg-[#111111] overflow-hidden" style={{ aspectRatio: "4/5" }}>
              {hasImages ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={product.images[selectedImage]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-[#2a2a2a] text-center px-8"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "0.1em" }}
                  >
                    {product.name}
                  </span>
                </div>
              )}
              {product.isNew && (
                <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold tracking-[0.2em] px-2 py-1">
                  NEW
                </div>
              )}
            </div>

            {hasImages && product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-16 h-20 overflow-hidden border transition-colors ${
                      selectedImage === i ? "border-black" : "border-[#e8e8e8] hover:border-[#888888]"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:pt-4">
            <p className="text-[#888888] text-xs tracking-[0.3em] uppercase mb-3">{product.category}</p>
            <h1
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 0.95 }}
              className="text-black mb-4"
            >
              {product.name}
            </h1>

            <p className="text-black text-2xl font-medium mb-4">{formatPrice(product.price)}</p>

            {/* COD Badge */}
            <div className="inline-flex items-center gap-2 border border-[#e8e8e8] px-3 py-1.5 text-xs text-white mb-8">
              Cash on Delivery · <span className="text-[#666]">+₹100</span>
            </div>

            {/* Color */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-black text-xs tracking-[0.2em] uppercase mb-3">
                  COLOR: <span className="text-[#666]">{selectedColor}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-xs border transition-colors ${
                        selectedColor === color
                          ? "bg-black text-white border-black"
                          : "border-[#e8e8e8] text-[#888888] hover:border-black hover:text-black"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-black text-xs tracking-[0.2em] uppercase">
                  SIZE: <span className="text-[#666]">{selectedSize || "Select"}</span>
                </p>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-[#888888] hover:text-black text-xs underline underline-offset-4 transition-colors"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    disabled={isSoldOut}
                    className={`w-14 py-2.5 text-xs border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-[#e8e8e8] text-[#888888] hover:border-black hover:text-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-[#e8e8e8]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-[#888888] hover:text-black transition-colors text-lg"
                >
                  −
                </button>
                <span className="px-4 text-[#000] font-medium min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-[#888888] hover:text-black transition-colors text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={isSoldOut}
                className="flex-1 bg-black text-white py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#c0c0c0] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={16} />
                {isSoldOut ? "SOLD OUT" : "ADD TO CART"}
              </button>
              {!isSoldOut && (
                <button
                  onClick={handleBuyNow}
                  className="flex-1 border border-black text-white py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-[#0a0a0a] transition-colors"
                >
                  BUY NOW
                </button>
              )}
            </div>

            {/* Shipping info */}
            <div className="border border-[#e8e8e8] p-4 space-y-2 mb-8 text-xs text-[#666]">
              <div>🚚 Free shipping on orders above ₹999</div>
              <div>📦 Estimated delivery: 5-7 business days</div>
              <div>↩️ Easy returns within 7 days</div>
            </div>

            {/* Accordion */}
            {[
              { key: "description", title: "DESCRIPTION", content: product.description },
              { key: "care", title: "CARE INSTRUCTIONS", content: "Machine wash cold at 30°C. Do not tumble dry. Do not iron on print. Wash inside out." },
              { key: "fabric", title: "FABRIC & FIT", content: "88% Polyester, 12% Elastane. Four-way stretch. Quick-dry moisture wicking. Pre-shrunk." },
            ].map(({ key, title, content }) => (
              <div key={key} className="border-t border-[#e8e8e8]">
                <button
                  onClick={() => setAccordionOpen(accordionOpen === key ? null : key)}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span
                    className="text-black text-xs tracking-[0.2em] uppercase"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {title}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-[#888888] transition-transform ${accordionOpen === key ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {accordionOpen === key && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="text-[#888888] text-sm leading-relaxed pb-4">{content}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1 }}
              className="text-black tracking-wide mb-8"
            >
              YOU MIGHT ALSO LIKE
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {sizeGuideOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSizeGuideOpen(false)}
            />
            <motion.div
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] border border-[#e8e8e8] p-8 z-50 w-full max-w-md mx-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2
                  className="text-black tracking-widest"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem" }}
                >
                  SIZE GUIDE
                </h2>
                <button onClick={() => setSizeGuideOpen(false)} className="text-[#888888] hover:text-black transition-colors">
                  <X size={20} />
                </button>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e8e8e8]">
                    <th className="text-left text-[#888888] text-xs tracking-[0.2em] pb-3 uppercase">Size</th>
                    <th className="text-left text-[#888888] text-xs tracking-[0.2em] pb-3 uppercase">Chest (cm)</th>
                    <th className="text-left text-[#888888] text-xs tracking-[0.2em] pb-3 uppercase">Waist (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_GUIDE.map((row) => (
                    <tr key={row.size} className="border-b border-[#111111]">
                      <td className={`py-3 font-medium ${selectedSize === row.size ? "text-white" : "text-[#666]"}`}>
                        {row.size}
                      </td>
                      <td className="py-3 text-[#666]">{row.chest}</td>
                      <td className="py-3 text-[#666]">{row.waist}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[#888888] text-xs mt-6">All measurements in centimetres. If between sizes, size up.</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
