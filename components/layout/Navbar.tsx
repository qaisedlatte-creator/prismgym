"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, User, X, Menu } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useSession } from "next-auth/react";

const navLinks = [
  { href: "/catalog?category=COMPRESSION", label: "COMPRESSION" },
  { href: "/catalog?category=VESTS", label: "VESTS" },
  { href: "/catalog", label: "ALL PRODUCTS" },
  { href: "/about", label: "ABOUT" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getItemCount, openCart } = useCartStore();
  const { data: session } = useSession();
  const itemCount = getItemCount();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
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
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,1)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: "2px solid #000",
          transition: "background 0.2s, backdrop-filter 0.2s",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "0 clamp(1rem, 4vw, 3rem)",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left — desktop nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: 32, flex: 1 }}>
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#000", display: "flex", alignItems: "center" }}
            >
              <Menu size={20} />
            </button>
            <div className="hidden md:flex" style={{ gap: 32 }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#999",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#000")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#999")}
                >
                  {link.label}
                </Link>
              ))}
            </div>
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
              gap: 10,
              textDecoration: "none",
            }}
          >
            <Image
              src="/logo.svg"
              alt="PRISM INDIA"
              width={24}
              height={24}
              priority
              style={{ height: 24, width: "auto" }}
            />
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.1rem",
                letterSpacing: "0.22em",
                color: "#000",
                lineHeight: 1,
              }}
            >
              PRISM INDIA
            </span>
          </Link>

          {/* Right — icons */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, flex: 1, justifyContent: "flex-end" }}>
            <button
              className="hidden md:flex"
              style={{ background: "none", border: "none", cursor: "pointer", color: "#888", display: "flex", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#000")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#888")}
            >
              <Search size={18} />
            </button>
            <Link
              href={session ? "/account" : "/login"}
              className="hidden md:flex"
              style={{ color: "#888", lineHeight: 1, transition: "color 0.2s" }}
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
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              <ShoppingBag size={18} />
              <span>BAG ({itemCount})</span>
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
              padding: "2rem",
            }}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.28, ease: [0.25, 0, 0, 1] }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 56, borderBottom: "2px solid #000", paddingBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Image src="/logo.svg" alt="PRISM" width={24} height={24} style={{ height: 24, width: "auto" }} />
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.22em", color: "#000" }}>
                  PRISM INDIA
                </span>
              </div>
              <button onClick={() => setMobileOpen(false)} style={{ color: "#000", background: "none", border: "none", cursor: "pointer" }}>
                <X size={22} />
              </button>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, ease: [0.25, 0, 0, 1] }}
                  style={{ borderBottom: "1px solid #e8e8e8" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "3rem",
                      color: "#000",
                      textDecoration: "none",
                      letterSpacing: "0.03em",
                      display: "block",
                      padding: "12px 0",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div style={{ marginTop: "auto", display: "flex", gap: 16 }}>
              <Link
                href={session ? "/account" : "/login"}
                onClick={() => setMobileOpen(false)}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", textDecoration: "none" }}
              >
                {session ? "ACCOUNT" : "LOGIN"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
