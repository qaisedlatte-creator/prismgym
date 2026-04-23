"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { formatPrice, calculateShipping, FREE_SHIPPING_THRESHOLD } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const subtotal = getSubtotal();
  const shipping = calculateShipping(subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 80 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            style={{
              position: "fixed",
              right: 0,
              top: 0,
              height: "100%",
              width: "100%",
              maxWidth: 400,
              background: "#111111",
              zIndex: 90,
              display: "flex",
              flexDirection: "column",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px",
                borderBottom: "1px solid #2a2a2a",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.4rem",
                  letterSpacing: "0.08em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                YOUR CART ({items.length})
              </h2>
              <button
                onClick={closeCart}
                style={{ color: "#888", background: "none", border: "none", cursor: "pointer", lineHeight: 1 }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
              {items.length === 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    gap: 16,
                    textAlign: "center",
                  }}
                >
                  <ShoppingBag size={40} color="#2a2a2a" />
                  <p style={{ color: "#888", fontSize: "0.85rem", fontFamily: "Inter, sans-serif" }}>
                    Your cart is empty
                  </p>
                  <button
                    onClick={closeCart}
                    style={{
                      color: "#fff",
                      fontSize: "0.7rem",
                      fontFamily: "Inter, sans-serif",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textDecoration: "underline",
                      textUnderlineOffset: 4,
                    }}
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}-${item.color}`}
                      style={{ display: "flex", gap: 12, position: "relative" }}
                    >
                      {/* Thumbnail */}
                      <div
                        style={{
                          width: 64,
                          height: 64,
                          flexShrink: 0,
                          background: "#1a1a1a",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div style={{ width: "100%", height: "100%", background: "#2a2a2a" }} />
                        )}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div>
                            <p
                              style={{
                                color: "#fff",
                                fontSize: "0.8rem",
                                fontFamily: "Inter, sans-serif",
                                fontWeight: 500,
                                marginBottom: 2,
                                lineHeight: 1.3,
                              }}
                            >
                              {item.name}
                            </p>
                            <p style={{ color: "#888", fontSize: "0.7rem", fontFamily: "Inter, sans-serif" }}>
                              {item.size} · {item.color}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId, item.size, item.color)}
                            style={{
                              color: "#888",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "1rem",
                              lineHeight: 1,
                              padding: "0 0 0 8px",
                              flexShrink: 0,
                            }}
                          >
                            ×
                          </button>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                          {/* Qty controls */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0,
                              border: "1px solid #2a2a2a",
                            }}
                          >
                            <button
                              onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                              style={{
                                width: 28,
                                height: 28,
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#888",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Minus size={10} />
                            </button>
                            <span
                              style={{
                                width: 28,
                                textAlign: "center",
                                color: "#fff",
                                fontSize: "0.8rem",
                                fontFamily: "Inter, sans-serif",
                              }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                              style={{
                                width: 28,
                                height: 28,
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#888",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          <span style={{ color: "#fff", fontSize: "0.85rem", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{ padding: "0 24px 24px", borderTop: "1px solid #2a2a2a", paddingTop: 16 }}>
                {/* Promo code */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid #2a2a2a",
                    marginBottom: 16,
                    paddingBottom: 4,
                  }}
                >
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="PROMO CODE"
                    style={{
                      flex: 1,
                      background: "none",
                      border: "none",
                      color: "#fff",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.75rem",
                      letterSpacing: "0.12em",
                      outline: "none",
                      padding: "8px 0",
                    }}
                  />
                  <button
                    style={{
                      color: "#888",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1.1rem",
                      lineHeight: 1,
                      padding: "4px 0 4px 8px",
                    }}
                  >
                    →
                  </button>
                </div>

                {/* Subtotal */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <span style={{ color: "#888", fontSize: "0.75rem", fontFamily: "Inter, sans-serif", letterSpacing: "0.1em" }}>
                    SUBTOTAL
                  </span>
                  <span style={{ color: "#fff", fontSize: "0.9rem", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <span style={{ color: "#888", fontSize: "0.75rem", fontFamily: "Inter, sans-serif", letterSpacing: "0.1em" }}>
                    SHIPPING
                  </span>
                  <span style={{ color: "#fff", fontSize: "0.85rem", fontFamily: "Inter, sans-serif" }}>
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>

                {/* Checkout button */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  style={{
                    display: "block",
                    width: "100%",
                    background: "#ffffff",
                    color: "#0a0a0a",
                    textAlign: "center",
                    padding: "16px 0",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.1rem",
                    letterSpacing: "0.15em",
                    textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#e0e0e0")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#ffffff")}
                >
                  CHECKOUT → {formatPrice(subtotal + shipping)}
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
