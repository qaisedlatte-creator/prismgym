"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, User, X, Menu } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useSession } from "next-auth/react";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/catalog?category=COMPRESSION", label: "COMPRESSIONS" },
  { href: "/catalog?category=VESTS", label: "VESTS" },
  { href: "/catalog", label: "SHOP ALL" },
  { href: "/about", label: "ABOUT" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getItemCount, openCart } = useCartStore();
  const { data: session } = useSession();
  const itemCount = getItemCount();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 36,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 64,
          background: scrolled ? "rgba(255,255,255,0.97)" : "#ffffff",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: "1px solid #e0e0e0",
          transition: "background 0.2s, box-shadow 0.2s",
          boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "0 clamp(1rem, 3vw, 2.5rem)",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: 24,
          }}
        >
          {/* LEFT — Logo + wordmark */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Mobile hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#000", marginRight: 12, display: "flex" }}
            >
              <Menu size={20} />
            </button>
            <Link
              href="/"
              style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}
            >
              <Image
                src="/logo-mark.png"
                alt="PRISM INDIA"
                width={32}
                height={32}
                priority
                style={{ height: 32, width: "auto", mixBlendMode: "multiply" }}
              />
              <span
                className="hidden sm:block"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.15rem",
                  letterSpacing: "0.22em",
                  color: "#000",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                PRISM INDIA
              </span>
            </Link>
          </div>

          {/* CENTER — Nav links (desktop only) */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: 28 }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.62rem",
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#999",
                  textDecoration: "none",
                  transition: "color 0.18s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#000")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#999")}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* RIGHT — Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: 18, justifyContent: "flex-end" }}>
            <button
              className="hidden md:flex"
              style={{ background: "none", border: "none", cursor: "pointer", color: "#888", display: "flex", transition: "color 0.18s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#000")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#888")}
            >
              <Search size={18} />
            </button>
            <Link
              href={session ? "/account" : "/login"}
              className="hidden md:flex"
              style={{ color: "#888", lineHeight: 1, transition: "color 0.18s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#000")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#888")}
            >
              <User size={18} />
            </Link>
            <button
              onClick={openCart}
              style={{
                position: "relative",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#000",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.62rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: 0,
              }}
            >
              <ShoppingBag size={18} />
              <span>{itemCount > 0 ? itemCount : "0"}</span>
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
              background: "#fff",
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              padding: "0 2rem 2rem",
            }}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.26, ease: [0.25, 0, 0, 1] }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, borderBottom: "1px solid #e8e8e8" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Image src="/logo-mark.png" alt="PRISM" width={28} height={28} style={{ height: 28, width: "auto", mixBlendMode: "multiply" }} />
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.22em", color: "#000" }}>
                  PRISM INDIA
                </span>
              </div>
              <button onClick={() => setMobileOpen(false)} style={{ color: "#000", background: "none", border: "none", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <nav style={{ display: "flex", flexDirection: "column", flex: 1, paddingTop: 16 }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{ borderBottom: "1px solid #f0f0f0" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "2.6rem",
                      color: "#000",
                      textDecoration: "none",
                      letterSpacing: "0.03em",
                      display: "block",
                      padding: "10px 0",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div style={{ display: "flex", gap: 20, paddingTop: 16, borderTop: "1px solid #f0f0f0" }}>
              <Link href={session ? "/account" : "/login"} onClick={() => setMobileOpen(false)}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", textDecoration: "none" }}>
                {session ? "ACCOUNT" : "LOGIN"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
