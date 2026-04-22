"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { formatPrice, calculateShipping, FREE_SHIPPING_THRESHOLD } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();
  const shipping = calculateShipping(subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-[#0a0a0a] border-l border-[#2e2e2e] z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#2e2e2e]">
              <h2
                className="text-white text-xl tracking-widest"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                YOUR CART ({items.length})
              </h2>
              <button onClick={closeCart} className="text-[#888888] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* COD badge */}
            <div className="mx-6 mt-4 px-3 py-2 bg-[#1a1a1a] border border-[#2e2e2e] rounded-sm text-xs text-[#888888] tracking-wide">
              💵 COD Available · <span className="text-white">+₹100 extra</span>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} className="text-[#2e2e2e]" />
                  <p className="text-[#888888] text-sm tracking-wide">Your cart is empty</p>
                  <button
                    onClick={closeCart}
                    className="text-xs text-white underline underline-offset-4 tracking-widest hover:text-[#888888] transition-colors"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4">
                    <div className="relative w-20 h-24 bg-[#1a1a1a] rounded-sm overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="text-white text-sm font-medium hover:text-[#888888] transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId, item.size, item.color)}
                          className="text-[#888888] hover:text-white flex-shrink-0 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-[#888888] text-xs mt-1">
                        {item.size} · {item.color}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 border border-[#2e2e2e] rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                            className="p-1.5 text-[#888888] hover:text-white transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                            className="p-1.5 text-[#888888] hover:text-white transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-white text-sm font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#2e2e2e] space-y-4">
                {subtotal < FREE_SHIPPING_THRESHOLD && (
                  <p className="text-xs text-[#888888] text-center">
                    Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for <span className="text-white">FREE shipping</span>
                  </p>
                )}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#888888]">Subtotal</span>
                    <span className="text-white">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#888888]">Shipping</span>
                    <span className="text-white">
                      {shipping === 0 ? "FREE" : formatPrice(shipping)}
                    </span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full bg-white text-[#0a0a0a] text-center py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#c0c0c0] transition-colors rounded-sm"
                >
                  CHECKOUT — {formatPrice(subtotal + shipping)}
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block w-full text-center py-2 text-xs text-[#888888] hover:text-white transition-colors tracking-widest"
                >
                  VIEW FULL CART
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
