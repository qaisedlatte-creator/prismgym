"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice, calculateShipping, FREE_SHIPPING_THRESHOLD, COD_FEE } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-28 flex flex-col items-center justify-center gap-6 px-4">
        <ShoppingBag size={64} className="text-[#2e2e2e]" />
        <h1
          className="text-white tracking-widest text-center"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem" }}
        >
          YOUR CART IS EMPTY
        </h1>
        <p className="text-[#888888] text-sm text-center max-w-xs">
          Looks like you haven't added anything yet. Go fill it up.
        </p>
        <Link
          href="/catalog"
          className="bg-white text-[#0a0a0a] px-10 py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#c0c0c0] transition-colors"
        >
          SHOP NOW
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h1
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.9 }}
          className="text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          YOUR CART
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* COD badge */}
            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2e2e2e] px-4 py-3 rounded-sm text-xs text-[#888888]">
              💵 COD Available · <span className="text-white font-medium">+₹100 extra</span> added at checkout
            </div>

            {items.map((item, i) => (
              <motion.div
                key={`${item.productId}-${item.size}-${item.color}`}
                className="flex gap-4 sm:gap-6 pb-6 border-b border-[#2e2e2e]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={`/product/${item.slug}`} className="relative w-24 h-32 bg-[#1a1a1a] rounded-sm overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <Link href={`/product/${item.slug}`} className="text-white font-medium hover:text-[#888888] transition-colors">
                      {item.name}
                    </Link>
                    <span className="text-white font-medium flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                  <p className="text-[#888888] text-sm mt-1">{item.size} · {item.color}</p>
                  <p className="text-[#888888] text-xs mt-0.5">{formatPrice(item.price)} each</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-[#2e2e2e] rounded-sm">
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                        className="p-2 text-[#888888] hover:text-white transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 text-white text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                        className="p-2 text-[#888888] hover:text-white transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.size, item.color)}
                      className="flex items-center gap-2 text-[#888888] hover:text-white text-xs transition-colors"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-sm p-6 sticky top-28">
              <h2
                className="text-white tracking-widest mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.25rem" }}
              >
                ORDER SUMMARY
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#888888]">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#888888]">Shipping</span>
                  <span className={shipping === 0 ? "text-white" : "text-white"}>
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                {subtotal < FREE_SHIPPING_THRESHOLD && (
                  <p className="text-[#888888] text-xs">
                    Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
                  </p>
                )}
                <div className="border-t border-[#2e2e2e] pt-4 flex justify-between">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-white font-medium text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full bg-white text-[#0a0a0a] py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#c0c0c0] transition-colors mb-3"
              >
                PROCEED TO CHECKOUT
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/catalog"
                className="block text-center text-[#888888] text-xs hover:text-white transition-colors tracking-widest py-2"
              >
                CONTINUE SHOPPING
              </Link>

              <div className="mt-6 pt-6 border-t border-[#2e2e2e] space-y-2">
                <p className="text-[#888888] text-xs">🔒 Secure checkout via Razorpay</p>
                <p className="text-[#888888] text-xs">💵 COD available · +₹100</p>
                <p className="text-[#888888] text-xs">🚚 Free shipping above ₹999</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
