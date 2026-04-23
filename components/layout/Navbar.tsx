"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, User, X, Menu } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useSession } from "next-auth/react";

const navLinks = [
  { href: "/catalog", label: "CATALOG" },
  { href: "/about", label: "ABOUT" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getItemCount, openCart } = useCartStore();
  const { data: session } = useSession();
  const itemCount = getItemCount();

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 32, // below announcement bar
          left: 0,
          right: 0,
          zIndex: 50,
          background: "transparent",
          borderBottom: "none",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 clamp(1rem, 4vw, 2.5rem)",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left — CATALOG link (desktop) + hamburger (mobile) */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 120 }}>
            {/* Mobile hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              style={{ color: "#fff", background: "none", border: "none", cursor: "pointer", padding: 4 }}
            >
              <Menu size={22} />
            </button>
            {/* Desktop catalog link */}
            <Link
              href="/catalog"
              className="hidden md:flex"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#fff",
                textDecoration: "none",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                opacity: 0.85,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
            >
              <Menu size={16} />
              CATALOG
            </Link>
          </div>

          {/* Center — Logo */}
          <Link
            href="/"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              src="/logo.svg"
              alt="PRISM INDIA"
              width={52}
              height={52}
              priority
              className="invert"
              style={{ height: 52, width: "auto" }}
            />
          </Link>

          {/* Right — icons */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 120, justifyContent: "flex-end" }}>
            <Link
              href={session ? "/account" : "/login"}
              className="hidden md:flex"
              style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.85)")}
            >
              <User size={18} />
            </Link>
            <button
              onClick={openCart}
              style={{
                position: "relative",
                color: "rgba(255,255,255,0.85)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                lineHeight: 1,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#fff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.85)")}
            >
              <ShoppingBag size={18} />
              {itemCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    background: "#fff",
                    color: "#0a0a0a",
                    fontSize: 9,
                    fontWeight: 700,
                    borderRadius: "50%",
                    width: 16,
                    height: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            style={{
              position: "fixed",
              inset: 0,
              background: "#0a0a0a",
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              padding: "2rem",
            }}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 48 }}>
              <Image src="/logo.svg" alt="PRISM" width={44} height={44} className="invert" style={{ height: 44, width: "auto" }} />
              <button onClick={() => setMobileOpen(false)} style={{ color: "#fff", background: "none", border: "none", cursor: "pointer" }}>
                <X size={24} />
              </button>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "3.5rem",
                      color: "#fff",
                      textDecoration: "none",
                      letterSpacing: "0.03em",
                      display: "block",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
                <Link
                  href={session ? "/account" : "/login"}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "3.5rem",
                    color: "#fff",
                    textDecoration: "none",
                    letterSpacing: "0.03em",
                    display: "block",
                  }}
                >
                  {session ? "ACCOUNT" : "LOGIN"}
                </Link>
              </motion.div>
            </nav>

            <div style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px solid #2a2a2a" }}>
              <p style={{ color: "#888", fontSize: "0.75rem", fontFamily: "Inter, sans-serif", letterSpacing: "0.15em" }}>
                @prismindia.in
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
