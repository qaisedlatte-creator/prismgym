"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const { addItem, openCart } = useCartStore();
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
      image: product.images[0],
      size: selectedSize,
      color: product.colors[0],
      quantity: 1,
      slug: product.slug,
    });
    toast({ title: "Added to cart", description: `${product.name} · ${selectedSize}`, variant: "success" });
  };

  const isSoldOut = product.stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/product/${product.slug}`}
        className="group block bg-[#1a1a1a] rounded-sm overflow-hidden relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setSelectedSize(""); }}
      >
        {/* Image container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#111111]">
          <motion.div
            animate={{ scale: hovered ? 1.03 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Second image on hover */}
          {product.images[1] && (
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={product.images[1]}
                alt={`${product.name} alt view`}
                fill
                className="object-cover"
              />
            </motion.div>
          )}

          {/* Overlays */}
          {isSoldOut && (
            <div className="absolute inset-0 bg-[#0a0a0a]/70 flex items-center justify-center">
              <span className="text-white text-sm tracking-[0.3em] font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                SOLD OUT
              </span>
            </div>
          )}

          {product.isNew && !isSoldOut && (
            <div className="absolute top-3 left-3 bg-white text-[#0a0a0a] text-[10px] font-bold tracking-[0.2em] px-2 py-1">
              NEW
            </div>
          )}

          {/* Quick add on hover */}
          {!isSoldOut && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-[#0a0a0a]/90 p-3"
              initial={{ y: "100%" }}
              animate={{ y: hovered ? 0 : "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.preventDefault()}
            >
              <p className="text-[#888888] text-[10px] tracking-widest mb-2 uppercase">Quick Add</p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {product.sizes.slice(0, 6).map((size) => (
                  <button
                    key={size}
                    onClick={(e) => { e.preventDefault(); setSelectedSize(size); }}
                    className={`text-[10px] px-2 py-1 border tracking-wide transition-colors ${
                      selectedSize === size
                        ? "bg-white text-[#0a0a0a] border-white"
                        : "border-[#2e2e2e] text-[#888888] hover:border-white hover:text-white"
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
            </motion.div>
          )}
        </div>

        {/* Product info */}
        <div className="p-4">
          <p className="text-[#888888] text-[10px] tracking-[0.2em] uppercase mb-1">{product.category}</p>
          <h3
            className="text-white text-base tracking-wide leading-tight mb-2 group-hover:text-[#c0c0c0] transition-colors"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {product.name}
          </h3>
          <p className="text-white text-sm font-medium">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </motion.div>
  );
}
