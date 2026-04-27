"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { formatPrice, calculateShipping, FREE_SHIPPING_THRESHOLD } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();
  const shipping = calculateShipping(subtotal);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 80 }}
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
              /* dvh adjusts as iOS toolbar shows/hides; fallback to 100% */
              height: "100dvh",
              width: "min(100vw, 400px)",
              background: "#111111",
              zIndex: 90,
              display: "flex",
              flexDirection: "column",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px",
                borderBottom: "1px solid #2a2a2a",
                flexShrink: 0,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.3rem",
                  letterSpacing: "0.08em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                YOUR CART ({items.length})
              </h2>
              <button
                onClick={closeCart}
                style={{
                  color: "#888",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  lineHeight: 1,
                  padding: 4,
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Free-shipping nudge */}
            {items.length > 0 && remaining > 0 && (
              <div
                style={{
                  background: "#1a1a1a",
                  borderBottom: "1px solid #2a2a2a",
                  padding: "8px 24px",
                  flexShrink: 0,
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.65rem",
                    color: "#888",
                    letterSpacing: "0.05em",
                  }}
                >
                  Add {formatPrice(remaining)} more for free shipping
                </p>
              </div>
            )}

            {/* Items — scrollable */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px", WebkitOverflowScrolling: "touch" }}>
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
                  <p style={{ color: "#555", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
                    Your cart is empty
                  </p>
                  <button
                    onClick={closeCart}
                    style={{
                      color: "#fff",
                      fontSize: "0.7rem",
                      fontFamily: "'DM Sans', sans-serif",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textDecoration: "underline",
                      textUnderlineOffset: 4,
                      WebkitTapHighlightColor: "transparent",
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
                      style={{ display: "flex", gap: 12 }}
                    >
                      {/* Thumbnail */}
                      <div
                        style={{
                          width: 64,
                          height: 76,
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
                          <div style={{ flex: 1, minWidth: 0, paddingRight: 8 }}>
                            <p
                              style={{
                                color: "#fff",
                                fontSize: "0.82rem",
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 500,
                                marginBottom: 2,
                                lineHeight: 1.3,
                              }}
                            >
                              {item.name}
                            </p>
                            <p style={{ color: "#666", fontSize: "0.7rem", fontFamily: "'DM Sans', sans-serif" }}>
                              {item.size} · {item.color}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId, item.size, item.color)}
                            style={{
                              color: "#555",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "1.1rem",
                              lineHeight: 1,
                              flexShrink: 0,
                              padding: 4,
                              WebkitTapHighlightColor: "transparent",
                            }}
                          >
                            ×
                          </button>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 10,
                          }}
                        >
                          {/* Qty controls */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              border: "1px solid #2a2a2a",
                            }}
                          >
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.size, item.color, item.quantity - 1)
                              }
                              style={{
                                width: 32,
                                height: 32,
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#888",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                WebkitTapHighlightColor: "transparent",
                              }}
                            >
                              <Minus size={10} />
                            </button>
                            <span
                              style={{
                                width: 28,
                                textAlign: "center",
                                color: "#fff",
                                fontSize: "0.82rem",
                                fontFamily: "'DM Sans', sans-serif",
                              }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.size, item.color, item.quantity + 1)
                              }
                              style={{
                                width: 32,
                                height: 32,
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#888",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                WebkitTapHighlightColor: "transparent",
                              }}
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          <span
                            style={{
                              color: "#fff",
                              fontSize: "0.88rem",
                              fontFamily: "'DM Sans', sans-serif",
                              fontWeight: 500,
                            }}
                          >
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer — always visible at bottom, safe-area aware */}
            {items.length > 0 && (
              <div
                style={{
                  flexShrink: 0,
                  borderTop: "1px solid #2a2a2a",
                  padding: "16px 24px",
                  paddingBottom: "max(20px, env(safe-area-inset-bottom, 20px))",
                  background: "#111111",
                }}
              >
                {/* Subtotal */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      color: "#888",
                      fontSize: "0.72rem",
                      fontFamily: "'DM Sans', sans-serif",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Subtotal
                  </span>
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "0.95rem",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                    }}
                  >
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
                  <span
                    style={{
                      color: "#888",
                      fontSize: "0.72rem",
                      fontFamily: "'DM Sans', sans-serif",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Shipping
                  </span>
                  <span style={{ color: "#888", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif" }}>
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  style={{
                    display: "block",
                    width: "100%",
                    background: "#ffffff",
                    color: "#000",
                    textAlign: "center",
                    padding: "16px 0",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.05rem",
                    letterSpacing: "0.14em",
                    textDecoration: "none",
                    WebkitTapHighlightColor: "transparent",
                    touchAction: "manipulation",
                  }}
                >
                  CHECKOUT — {formatPrice(subtotal + shipping)}
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
